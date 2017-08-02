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
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';

function sumPropWidths(columns) {
  return reduce(columns, (accum, column) => accum + column.props.width, 0);
}

function getTotalWidth(columns) {
  return reduce(columns, (accum, column) => accum + column.width, 0);
}

function getTotalFlexGrow(columns) {
  return reduce(columns, (accum, column) => accum + (column.flexGrow || 0), 0);
}

function distributeFlexWidth(columns, flexWidth, flexGrow) {
  if (flexWidth <= 0) {
    return {
      columns: columns,
      width: getTotalWidth(columns),
    };
  }

  let remainingFlexWidth = flexWidth;
  let remainingFlexGrow = flexGrow;

  const columnWidths = [];
  let totalWidth = 0;
  forEach(columns, column => {
    if (!column.flexGrow) {
      totalWidth += column.width;
      columnWidths.push(column.width);
      return;
    }

    const columnFlexWidth = Math.floor(
      column.flexGrow / remainingFlexGrow * remainingFlexWidth);
    const newColumnWidth = Math.floor(column.width + columnFlexWidth);
    totalWidth += newColumnWidth;

    remainingFlexGrow -= column.flexGrow;
    remainingFlexWidth -= columnFlexWidth;

    columnWidths.push(newColumnWidth);
  });

  return {
    columnWidths,
    width: totalWidth,
  };
}

/**
 * @param  {!Array.<{
 *   columns: !Array.{
 *     flexGrow: number,
 *     width: number,
 *   },
 * }>} columnGroups
 * @param  {number} expectedWidth
 * @return {!Array.<{
 *   flexGrow: number,
 *   width: number,
 * }>}
 */
function adjustColumnGroupWidths(columnGroups, expectedWidth) {
  const allColumns = [];
  forEach(columnGroups, columnGroup => {
    Array.prototype.push.apply(allColumns, columnGroup.columns)
  });

  var remainingFlexGrow = getTotalFlexGrow(allColumns);
  if (remainingFlexGrow === 0) {
    return allColumns;
  }

  var columnsWidth = getTotalWidth(allColumns);
  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);
  forEach(columnGroups, columnGroup => {
    const currentColumns = columnGroup.columns;
    const columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
    const columnGroupFlexWidth = Math.floor(
      columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth);

    var newColumnSettings = distributeFlexWidth(
      currentColumns, columnGroupFlexWidth, columnGroupFlexGrow);
    remainingFlexGrow -= columnGroupFlexGrow;
    remainingFlexWidth -= columnGroupFlexWidth;

    columnGroup.width = newColumnSettings.width;
    forEach(newColumnSettings.columnWidths, (newWidth, index) => {
      currentColumns[index].width = newWidth;
    });
  });
  return allColumns;
}

var FixedDataTableWidthHelper = {
  sumPropWidths,
  getTotalWidth,
  adjustColumnGroupWidths,
};

module.exports = FixedDataTableWidthHelper;
