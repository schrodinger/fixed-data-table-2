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

import FixedDataTableWidthHelper from 'FixedDataTableWidthHelper';
import columnsSelector from 'columns';
import emptyFunction from 'emptyFunction';
import isNil from 'lodash/isNil';
import fixedColumnsWidthSelector from 'fixedColumnsWidth';
import scrollContentWidthSelector from 'scrollContentWidth';

const DRAG_SCROLL_SPEED = 15;
const DRAG_SCROLL_BUFFER = 100;

/**
 * Creates new state object when rowHeight or rowCount changes
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {Object} oldProps
 * @return {!Object}
 */
function initialize(state, props, oldProps) {
  const {
    scrollLeft,
    scrollToColumn,
  } = props;

  let {
    columnResizingData,
    isColumnResizing,
    scrollX,
    width,
  } = state;

  if (scrollLeft !== undefined) {
    scrollX = scrollLeft;
  }

  scrollX = scrollTo(state, props, oldProps.scrollToColumn, scrollX);
  const maxScrollX = Math.max(0, scrollContentWidthSelector(state) - width);
  scrollX = Math.min(scrollX, maxScrollX);

  // isColumnResizing should be overwritten by value from props if available
  isColumnResizing = props.isColumnResizing !== undefined ? props.isColumnResizing : isColumnResizing;
  columnResizingData = isColumnResizing ? columnResizingData : {};

  return Object.assign({}, state, {
    columnResizingData,
    isColumnResizing,
    maxScrollX,
    scrollX,
  });
};

/**
 * @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       flexGrow: number,
 *       width: number,
 *     },
 *   }>},
 *   width: number,
 * }} state
 * @param {{
 *   scrollToColumn: number,
 *   width: number,
 * }} props
 * @param {number} oldScrollToColumn
 * @param {number} scrollX
 * @return {number} The new scrollX
 */
function scrollTo(state, props, oldScrollToColumn, scrollX) {
  const {
    scrollToColumn,
    width,
  } = props;
  const {
    fixedColumns,
    scrollableColumns,
  } = columnsSelector(state);
  const fixedColumnsCount = fixedColumns.length;

  const scrollToUnchanged = scrollToColumn === oldScrollToColumn
  const selectedColumnFixed = scrollToColumn < fixedColumnsCount;
  if (isNil(scrollToColumn) || scrollToUnchanged || selectedColumnFixed) {
    return scrollX;
  }

  const clampedColumnIndex = Math.min(scrollToColumn - fixedColumnsCount,
    scrollableColumns.length - 1);

  // Compute the width of all columns to the left of the column
  let previousWidth = 0;
  for (let columnIdx = 0; columnIdx < clampedColumnIndex; ++columnIdx) {
    previousWidth += scrollableColumns[columnIdx].width;
  }

  // Compute the scroll position which sets the column on the right of the viewport
  const availableScrollWidth = width - fixedColumnsWidthSelector(state);
  const selectedColumnWidth = scrollableColumns[clampedColumnIndex].width;
  const minScrollPosition = previousWidth + selectedColumnWidth - availableScrollWidth;

  // Handle offscreen to the left
  if (scrollX < minScrollPosition) {
    return minScrollPosition;
  }

  // Handle offscreen to the right
  if (scrollX > previousWidth) {
    return previousWidth;
  }

  return scrollX;
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
  let {
    columnKey,
    left,
    scrollStart,
    width
  } = reorderData;

  const { allColumns } = columnsSelector(state);
  const isFixed = allColumns.some(function(column) {
    return column.columnKey === columnKey && column.fixed;
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
  const {
    isFixed,
    originalLeft,
    scrollStart,
  } = state.columnReorderingData;

  let {
    maxScrollX,
    scrollX,
    width,
  } = state;
  if (!isFixed) {
    // Relative dragX position on scroll
    const dragX = originalLeft - scrollStart + deltaX;

    const { allColumns } = columnsSelector(state);
    const fixedColumnsWidth = allColumns.reduce(
      (sum, column) => column.fixed ? sum + column.width : sum, 0);
    const relativeWidth = width - fixedColumnsWidth;

    // Scroll the table left or right if we drag near the edges of the table
    if (dragX > relativeWidth - DRAG_SCROLL_BUFFER) {
      scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
    } else if (dragX <= DRAG_SCROLL_BUFFER) {
      scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
    }

    deltaX += scrollX - scrollStart;
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
}
