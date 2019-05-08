/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnStateHelper
 */

'use strict';

import clamp from 'lodash/clamp';
import columnWidths from 'columnWidths';
import emptyFunction from 'emptyFunction';
import isNil from 'lodash/isNil';
import { updateColumnWidth } from 'updateColumnWidth';

const DRAG_SCROLL_SPEED = 15;
const DRAG_SCROLL_BUFFER = 100;

/**
 * Initialize scrollX state
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {Object} oldProps
 * @return {!Object}
 */
function initialize(state, props, oldProps) {
  let { columnResizingData, isColumnResizing, scrollX } = state;

  const columnAnchor = getColumnAnchor(state, props, oldProps);

  const { maxScrollX } = columnWidths(state);
  scrollX = clamp(scrollX, 0, maxScrollX);

  // isColumnResizing should be overwritten by value from props if available
  isColumnResizing = props.isColumnResizing !== undefined ? props.isColumnResizing : isColumnResizing;
  columnResizingData = isColumnResizing ? columnResizingData : {};

  return Object.assign({}, state, {
    columnAnchor,
    columnResizingData,
    isColumnResizing,
    maxScrollX,
    scrollX,
  });
}

/**
 * Get the anchor for scrolling.
 * This will either be the first columns's index and an offset, or the last columns's index.
 * We also pass a flag indicating if the anchor has changed from the state
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {!Object} oldProps
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function getColumnAnchor(state, props, oldProps) {
  // if scrollToColumn changed
  if (props.scrollToColumn !== undefined &&
    props.scrollToColumn !== null &&
    (!oldProps || props.scrollToColumn !== oldProps.scrollToColumn)
  ) {
    return scrollToColumn(state, props.scrollToColumn);
  }

  // if scrollLeft changed
  if (
    props.scrollLeft !== undefined &&
    props.scrollLeft !== null &&
    (!oldProps || props.scrollLeft !== oldProps.scrollLeft)
  ) {
    return scrollToPos(state, props.scrollLeft);
  }

  // no change in column anchor
  return {
    firstIndex: state.firstColumnIndex,
    firstOffset: state.firstColumnOffset,
    lastIndex: undefined,
    changed: false,
  };
}

/**
 * @param {!Object} state
 * @param {number} scrollToColumn
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function scrollToColumn(state, scrollToColumn) {
  const {
    availableScrollWidth,
    fixedColumns,
    scrollableColumns,
  } = columnWidths(state);

  const { scrollX, columnOffsetIntervalTree } = state;

  const selectedColumnFixed = scrollToColumn < fixedColumns.length;
  const selectedColumnFixedRight = scrollToColumn >= fixedColumns.length + scrollableColumns.length;

  // if target column is fixed, then don't do anything
  if (selectedColumnFixed || selectedColumnFixedRight) {
    return {
      firstIndex: state.firstColumnIndex,
      firstOffset: state.firstColumnOffset,
      lastIndex: undefined,
      changed: false,
    }
  }

  // convert to scrollable column index where 0 denotes first scrollable column
  const clampedColumnIndex = Math.min(scrollToColumn - fixedColumns.length, scrollableColumns.length - 1);
  const columnBeginX = columnOffsetIntervalTree.sumUntil(clampedColumnIndex);
  const columnEndX = columnBeginX + updateColumnWidth(state, clampedColumnIndex);

  let firstIndex = clampedColumnIndex;
  let lastIndex = undefined;
  if (columnBeginX < scrollX) {
    // If column starts before the viewport, set as the first column in the viewport
    // Uses defaults (from above)
  } else if (scrollX < columnEndX - availableScrollWidth) {
    // If after the viewport, set as the last column in the viewport
    firstIndex = undefined;
    lastIndex = clampedColumnIndex;
  } else {
    // If already in the viewport, do nothing.
    return {
      firstIndex: state.firstColumnIndex,
      firstOffset: state.firstColumnOffset,
      lastIndex: undefined,
      changed: false,
    };
  }

  return {
    firstIndex,
    firstOffset: 0,
    lastIndex,
    changed: true,
  };
}

/**
 * Scroll to a specific position in the grid
 *
 * @param {!Object} state
 * @param {number} scrollX
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: number
 * }}
 */
function scrollToPos(state, scrollX) {
  const {
    maxScrollX,
    scrollableColumns,
  } = columnWidths(state);

  const {
    columnOffsetIntervalTree,
  } = state;

  const columnsCount = scrollableColumns.length;

  // scroll to the last column
  if (scrollX >= maxScrollX) {
    return {
      firstIndex: undefined,
      firstOffset: 0,
      lastIndex: columnsCount - 1,
      changed: true,
    }
  } else if (scrollX > 0) {
    // Mark the column which will appear first in the viewport
    // We use this as our "marker" when scrolling even if updating columnOffsets
    // leads to it being different from the scrollX specified
    const newColumnIdx = columnOffsetIntervalTree.greatestLowerBound(scrollX);
    const firstIndex = clamp(newColumnIdx, 0, Math.max(columnsCount - 1, 0));

    // Record how far into the first column we should scroll
    // firstOffset is a negative value representing how much larger scrollX is
    // than the scroll position of the first column in the viewport
    const firstColumnPosition = columnOffsetIntervalTree.sumUntil(firstIndex);
    const firstOffset = firstColumnPosition - scrollX;

    return {
      firstIndex,
      firstOffset,
      lastIndex: undefined,
      changed: true,
    }
  }

  // scroll to the first column
  return {
    firstIndex: 0,
    firstOffset: 0,
    lastIndex: undefined,
    changed: true,
  };
}

/**
 * This is called when a cell that is in the header of a column has its
 * resizer knob clicked on. It displays the resizer and puts in the correct
 * location on the table.
 */
function resizeColumn(state, resizeData) {
  let {
    cellMinWidth,
    cellMaxWidth,
    cellWidth,
    columnKey,
    combinedWidth,
    clientX,
    clientY,
    leftOffset
  } = resizeData;
  return Object.assign({}, state, {
    isColumnResizing: true,
    columnResizingData: {
      left: leftOffset + combinedWidth - cellWidth,
      width: cellWidth,
      minWidth: cellMinWidth,
      maxWidth: cellMaxWidth,
      initialEvent: {
        clientX: clientX,
        clientY: clientY,
        preventDefault: emptyFunction
      },
      key: columnKey
    }
  });
};

function reorderColumn(state, reorderData) {
  let { columnKey, left, scrollStart, width } = reorderData;
  const { fixedColumns } = columnWidths(state);
  const isFixed = fixedColumns.some(function(column) {
    return column.columnKey === columnKey;
  });

  return Object.assign({}, state, {
    isColumnReordering: true,
    columnReorderingData: {
      cancelReorder: false,
      dragDistance: 0,
      isFixed: isFixed,
      scrollStart: scrollStart,
      columnKey: columnKey,
      columnWidth: width,
      originalLeft: left,
      columnBefore: undefined,
      columnAfter: undefined
    }
  });
};

function reorderColumnMove(state, deltaX) {
  const { isFixed, originalLeft, scrollStart } = state.columnReorderingData;
  let { maxScrollX, scrollX } = state;
  if (!isFixed) {
    // Relative dragX position on scroll
    const dragX = originalLeft - scrollStart + deltaX;
    const { availableScrollWidth } = columnWidths(state);
    deltaX += scrollX - scrollStart;

    // Scroll the table left or right if we drag near the edges of the table
    if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
      scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
    } else if (dragX <= DRAG_SCROLL_BUFFER) {
      scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
    }
  }

  // NOTE (jordan) Need to clone this object when use pureRendering
  const reorderingData = Object.assign({}, state.columnReorderingData, {
    dragDistance: deltaX,
    columnBefore: undefined,
    columnAfter: undefined,
  });

  return Object.assign({}, state, {
    scrollX: scrollX,
    columnReorderingData: reorderingData
  });
};

module.exports = {
  initialize,
  reorderColumn,
  reorderColumnMove,
  resizeColumn,
  scrollToPos,
};
