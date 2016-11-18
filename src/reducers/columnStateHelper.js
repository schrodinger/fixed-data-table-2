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
import React from 'React';
import emptyFunction from 'emptyFunction';
import invariant from 'invariant';
import shallowEqual from 'shallowEqual';

var EMPTY_OBJECT = {};
var HEADER = 'header';
var FOOTER = 'footer';
var CELL = 'cell';
var DRAG_SCROLL_SPEED = 15;
var DRAG_SCROLL_BUFFER = 100;

function _selectColumnElement(type: string, columns: Array): Array {
  var newColumns = [];
  for (var i = 0; i < columns.length; ++i) {
    var column = columns[i];
    newColumns.push(React.cloneElement(
      column,
      {
        cell: type ?  column.props[type] : column.props[CELL]
      }
    ));
  }
  return newColumns;
};

function _splitColumnTypes(columns: Array): Object {
  var fixedColumns = [];
  var scrollableColumns = [];
  for (var i = 0; i < columns.length; ++i) {
    if (columns[i].props.fixed) {
      fixedColumns.push(columns[i]);
    } else {
      scrollableColumns.push(columns[i]);
    }
  }
  return {
    fixed: fixedColumns,
    scrollable: scrollableColumns,
  };
};

function _areColumnSettingsIdentical(
  oldColumns: Array,
  newColumns: Array
): boolean {
  if (oldColumns.length !== newColumns.length) {
    return false;
  }
  for (var index = 0; index < oldColumns.length; ++index) {
    if (!shallowEqual(
        oldColumns[index].props,
        newColumns[index].props
    )) {
      return false;
    }
  }
  return true;
};

function _populateColumnsAndColumnData(
  columns: Array,
  columnGroups: ?Array,
  oldState: ?Object
): Object {
  var canReuseColumnSettings = false;
  var canReuseColumnGroupSettings = false;

  if (oldState && oldState.columns) {
    canReuseColumnSettings =
      _areColumnSettingsIdentical(columns, oldState.columns);
  }
  if (oldState && oldState.columnGroups && columnGroups) {
    canReuseColumnGroupSettings =
      _areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
  }

  var columnInfo = {};
  if (canReuseColumnSettings) {
    columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
    columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
    columnInfo.headFixedColumns = oldState.headFixedColumns;
    columnInfo.headScrollableColumns = oldState.headScrollableColumns;
    columnInfo.footFixedColumns = oldState.footFixedColumns;
    columnInfo.footScrollableColumns = oldState.footScrollableColumns;
  } else {
    var bodyColumnTypes = _splitColumnTypes(columns);
    columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
    columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

    var headColumnTypes = _splitColumnTypes(
      _selectColumnElement(HEADER, columns)
    );
    columnInfo.headFixedColumns = headColumnTypes.fixed;
    columnInfo.headScrollableColumns = headColumnTypes.scrollable;

    var footColumnTypes = _splitColumnTypes(
      _selectColumnElement(FOOTER, columns)
    );
    columnInfo.footFixedColumns = footColumnTypes.fixed;
    columnInfo.footScrollableColumns = footColumnTypes.scrollable;
  }

  if (canReuseColumnGroupSettings) {
    columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
    columnInfo.groupHeaderScrollableColumns =
      oldState.groupHeaderScrollableColumns;
  } else {
    if (columnGroups) {
      var groupHeaderColumnTypes = _splitColumnTypes(
        _selectColumnElement(HEADER, columnGroups)
      );
      columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
      columnInfo.groupHeaderScrollableColumns =
        groupHeaderColumnTypes.scrollable;
    }
  }

  return columnInfo;
};

function _getChildren(props) {
  var children = [];
  React.Children.forEach(props.children, (child, index) => {
    if (child == null) {
      return;
    }
    invariant(
      child.type.__TableColumnGroup__ ||
      child.type.__TableColumn__,
      'child type should be <FixedDataTableColumn /> or ' +
      '<FixedDataTableColumnGroup />'
    );
    children.push(child);
  });
  return children;
};

/**
 * Creates new state object when rowHeight or rowCount changes
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} oldState
 * @param {!Object} props
 * @return {!Object}
 */
function initialize(oldState, props) {
  var children = _getChildren(props);
  var useGroupHeader = false;
  if (children.length && children[0].type.__TableColumnGroup__) {
    useGroupHeader = true;
  }

  scrollX = oldState ? oldState.scrollX : 0;
  if (props.scrollLeft !== undefined) {
    scrollX = props.scrollLeft;
  }

  var groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

  var columnResizingData;
  if (props.isColumnResizing) {
    columnResizingData = oldState && oldState.columnResizingData;
  } else {
    columnResizingData = EMPTY_OBJECT;
  }

  var columns;
  var columnGroups;

  if (useGroupHeader) {
    var columnGroupSettings =
      FixedDataTableWidthHelper.adjustColumnGroupWidths(
        children,
        props.width
    );
    columns = columnGroupSettings.columns;
    columnGroups = columnGroupSettings.columnGroups;
  } else {
    columns = FixedDataTableWidthHelper.adjustColumnWidths(
      children,
      props.width
    );
  }

  var columnInfo = _populateColumnsAndColumnData(
    columns,
    columnGroups,
    oldState
  );

  var lastScrollToColumn = oldState ? oldState.scrollToColumn : undefined;
  if (props.scrollToColumn !== null && props.scrollToColumn !== lastScrollToColumn) {
    // If selected column is a fixed column, don't scroll
    var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
    if (props.scrollToColumn >= fixedColumnsCount) {
      var totalFixedColumnsWidth = 0;
      var i, column;
      for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
        column = columnInfo.bodyFixedColumns[i];
        totalFixedColumnsWidth += column.props.width;
      }

      var scrollableColumnIndex = Math.min(
        props.scrollToColumn - fixedColumnsCount,
        columnInfo.bodyScrollableColumns.length - 1,
      );

      var previousColumnsWidth = 0;
      for (i = 0; i < scrollableColumnIndex; ++i) {
        column = columnInfo.bodyScrollableColumns[i];
        previousColumnsWidth += column.props.width;
      }

      var availableScrollWidth = props.width - totalFixedColumnsWidth;
      var selectedColumnWidth = columnInfo.bodyScrollableColumns[
        scrollableColumnIndex
      ].props.width;
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
    columns,
    columnGroups,
    columnInfo,
    columnResizingData,
    groupHeaderHeight,
    isColumnResizing,
    maxScrollX,
    horizontalScrollbarVisible,
    scrollX,
    useGroupHeader,
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

  var isFixed = !!oldState.columnInfo.headFixedColumns.find(function(column) {
    return column.props.columnKey === columnKey;
  });

  return Object.assign({}, oldState, {
    isColumnReordering: true,
    columnReorderingData: {
      dragDistance: 0,
      isFixed: isFixed,
      scrollStart: scrollStart,
      columnKey: columnKey,
      columnWidth: width,
      originalLeft: left,
      columnsBefore: [],
      columnsAfter: []
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

    var fixedColumnsWidth = oldState.columnInfo.bodyFixedColumns
      .reduce((sum, column) => sum + column.props.width, 0);
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
