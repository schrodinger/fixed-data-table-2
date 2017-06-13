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
import emptyFunction from 'emptyFunction';
import partition from 'lodash/partition';

var EMPTY_OBJECT = {};
var DRAG_SCROLL_SPEED = 15;
var DRAG_SCROLL_BUFFER = 100;

/**
 * Creates new state object when rowHeight or rowCount changes
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} oldState
 * @param {!Object} props
 * @param {!Object} columnGroups
 * @param {boolean} useGroupHeader
 * @return {!Object}
 */
function initialize(oldState, props, columnGroups, useGroupHeader, elementTemplates) {
  scrollX = oldState ? oldState.scrollX : 0;
  if (props.scrollLeft !== undefined) {
    scrollX = props.scrollLeft;
  }

  let groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

  let columnResizingData;
  if (props.isColumnResizing) {
    columnResizingData = oldState && oldState.columnResizingData;
  } else {
    columnResizingData = EMPTY_OBJECT;
  }

  const columns = FixedDataTableWidthHelper
    .adjustColumnGroupWidths(columnGroups, props.width);
  const [fixedColumns, scrollableColumns] = partition(columns, column => column.fixed);

  var lastScrollToColumn = oldState ? oldState.scrollToColumn : undefined;
  if (props.scrollToColumn !== null && props.scrollToColumn !== lastScrollToColumn) {
    // If selected column is a fixed column, don't scroll
    var fixedColumnsCount = fixedColumns.length;
    if (props.scrollToColumn >= fixedColumnsCount) {
      let totalFixedColumnsWidth = 0;
      for (let i = 0; i < fixedColumns.length; ++i) {
        totalFixedColumnsWidth += fixedColumns[i].width;
      }

      let scrollableColumnIndex = Math.min(
        props.scrollToColumn - fixedColumnsCount,
        scrollableColumns.length - 1,
      );

      var previousColumnsWidth = 0;
      for (let i = 0; i < scrollableColumnIndex; ++i) {
        previousColumnsWidth += scrollableColumns[i].width;
      }

      var availableScrollWidth = props.width - totalFixedColumnsWidth;
      var selectedColumnWidth = scrollableColumns[scrollableColumnIndex].width;
      var minAcceptableScrollPosition =
        previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

      if (scrollX < minAcceptableScrollPosition) {
        scrollX = minAcceptableScrollPosition;
      }

      if (scrollX > previousColumnsWidth) {
        scrollX = previousColumnsWidth;
      }
    }
  }

  var scrollContentWidth =
    FixedDataTableWidthHelper.getTotalWidth(columns);
  var horizontalScrollbarVisible = scrollContentWidth > props.width &&
    props.overflowX !== 'hidden' && props.showScrollbarX !== false;
  var maxScrollX = Math.max(0, scrollContentWidth - props.width);
  scrollX = Math.min(scrollX, maxScrollX);

  // isColumnResizing should be overwritten by value from props if avaailble
  var isColumnResizing = props.isColumnResizing !== undefined ?
    props.isColumnResizing : oldState && oldState.isColumnResizing;

  return Object.assign({}, oldState, {
    elementTemplates,
    columnGroups,
    columnResizingData,
    columns,
    groupHeaderHeight,
    isColumnResizing,
    maxScrollX,
    horizontalScrollbarVisible,
    scrollX,
    useGroupHeader: useGroupHeader,
    width: props.width
  });
};

/**
 * This is called when a cell that is in the header of a column has its
 * resizer knob clicked on. It displays the resizer and puts in the correct
 * location on the table.
 */
function resizeColumn(oldState, resizeData) {
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
  return Object.assign({}, oldState, {
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

function reorderColumn(oldState, reorderData) {
  let {
    columnKey,
    left,
    scrollStart,
    width
  } = reorderData;

  const isFixed = oldState.columns.some(function(column) {
    return column.columnKey === columnKey && column.fixed;
  });

  return Object.assign({}, oldState, {
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

function reorderColumnMove(oldState, deltaX) {
  var reorderingData = oldState.columnReorderingData;
  reorderingData.dragDistance = deltaX;
  reorderingData.columnBefore = undefined;
  reorderingData.columnAfter = undefined;

  var isFixedColumn = oldState.columnReorderingData.isFixed;
  var scrollX = oldState.scrollX;

  if (!isFixedColumn) {
    //Relative dragX position on scroll
    var dragX = reorderingData.originalLeft - reorderingData.scrollStart + reorderingData.dragDistance;

    var fixedColumnsWidth = oldState.columns
      .reduce((sum, column) => {
        if (column.fixed) {
          return sum + column.width;
        }
        return sum;
      }, 0);
    var relativeWidth = oldState.width - fixedColumnsWidth;

    //Scroll the table left or right if we drag near the edges of the table
    if (dragX > relativeWidth - DRAG_SCROLL_BUFFER) {
      scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, oldState.maxScrollX);
    } else if (dragX <= DRAG_SCROLL_BUFFER) {
      scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
    }

    reorderingData.dragDistance += oldState.scrollX - reorderingData.scrollStart;
  }

  return Object.assign({}, oldState, {
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
