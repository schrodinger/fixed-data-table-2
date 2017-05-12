/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableWidthHelper
 * @typechecks
 */

'use strict';

import React from 'React';

function getTotalWidth(/*array*/ columns) /*number*/ {
  var totalWidth = 0;
  for (var i = 0; i < columns.length; ++i) {
    totalWidth += columns[i].props.width;
  }
  return totalWidth;
}

function getMaxVisibleColumns(/*array*/ columns, /*number*/ width) /*number*/ {
  var maxColumns = 0;
  var currentWidth = 0;

  //NOTE (asif) We use the filter loop to update the width
  var scrollableColumns = columns.filter(function(column) {
    var fixed = column.props.fixed;
    if (fixed) {
      width -= column.props.width;
    }
    return !fixed;
  });

  //Columns that we can't recycle
  var nonRecyclable = 0;

  var first = 0;
  for (var i = 0; i < scrollableColumns.length; ++i) {
    var columnProps = scrollableColumns[i].props;
    var columnWidth = columnProps.width;
    var recycable = columnProps.allowCellsRecycling;

    if (recycable !== true) { 
      nonRecyclable++;
    }

    var firstColumnWidth = scrollableColumns[first].props.width;
    //Subtract firstColumnWidth because its always on screen
    while (currentWidth - firstColumnWidth - 1 > width) {
      currentWidth -= scrollableColumns[first++].props.width;
    }
    currentWidth += columnWidth;
    maxColumns = Math.max(maxColumns, i - first + 1);
  }

  //Max columns that will fit on screen
  return maxColumns + nonRecyclable;
}

function getTotalFlexGrow(/*array*/ columns) /*number*/ {
  var totalFlexGrow = 0;
  for (var i = 0; i < columns.length; ++i) {
    totalFlexGrow += columns[i].props.flexGrow || 0;
  }
  return totalFlexGrow;
}

function distributeFlexWidth(
  /*array*/ columns,
  /*number*/ flexWidth
) /*object*/ {
  if (flexWidth <= 0) {
    return {
      columns: columns,
      width: getTotalWidth(columns),
    };
  }
  var remainingFlexGrow = getTotalFlexGrow(columns);
  var remainingFlexWidth = flexWidth;
  var newColumns = [];
  var totalWidth = 0;
  for (var i = 0; i < columns.length; ++i) {
    var column = columns[i];
    if (!column.props.flexGrow) {
      totalWidth += column.props.width;
      newColumns.push(column);
      continue;
    }
    var columnFlexWidth = Math.floor(
      column.props.flexGrow / remainingFlexGrow * remainingFlexWidth
    );
    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
    totalWidth += newColumnWidth;

    remainingFlexGrow -= column.props.flexGrow;
    remainingFlexWidth -= columnFlexWidth;

    newColumns.push(React.cloneElement(
      column,
      {width: newColumnWidth}
    ));
  }

  return {
    columns: newColumns,
    width: totalWidth,
  };
}

function adjustColumnGroupWidths(
  /*array*/ columnGroups,
  /*number*/ expectedWidth
) /*object*/ {
  var allColumns = [];
  var i;
  for (i = 0; i < columnGroups.length; ++i) {
    React.Children.forEach(
      columnGroups[i].props.children,
      (column) => {
        allColumns.push(column);
      }
    );
  }
  var columnsWidth = getTotalWidth(allColumns);
  var remainingFlexGrow = getTotalFlexGrow(allColumns);
  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

  var newAllColumns = [];
  var newColumnGroups = [];

  for (i = 0; i < columnGroups.length; ++i) {
    var columnGroup = columnGroups[i];
    var currentColumns = [];

    React.Children.forEach(
      columnGroup.props.children,
      (column) => {
        currentColumns.push(column);
      }
    );

    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
    var columnGroupFlexWidth = Math.floor(
      columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth
    );

    var newColumnSettings = distributeFlexWidth(
      currentColumns,
      columnGroupFlexWidth
    );

    remainingFlexGrow -= columnGroupFlexGrow;
    remainingFlexWidth -= columnGroupFlexWidth;

    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
      newAllColumns.push(newColumnSettings.columns[j]);
    }

    newColumnGroups.push(React.cloneElement(
      columnGroup,
      {width: newColumnSettings.width}
    ));
  }

  return {
    columns: newAllColumns,
    columnGroups: newColumnGroups,
  };
}

function adjustColumnWidths(
  /*array*/ columns,
  /*number*/ expectedWidth
) /*array*/ {
  var columnsWidth = getTotalWidth(columns);
  if (columnsWidth < expectedWidth) {
    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
  }
  return columns;
}

var FixedDataTableWidthHelper = {
  getTotalWidth,
  getMaxVisibleColumns,
  getTotalFlexGrow,
  distributeFlexWidth,
  adjustColumnWidths,
  adjustColumnGroupWidths,
};

module.exports = FixedDataTableWidthHelper;
