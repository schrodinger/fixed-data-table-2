/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule updateColWidth
 */

'use strict';

import convertColumnElementsToData from '../helper/convertColumnElementsToData';
import isNil from 'lodash/isNil';
import min from 'lodash/min';
import max from 'lodash/max';

// TODO (pradeep): Rename this file to updateColumn

/**
 * Get's the column props for a specific index and also stores a cache of it
 *
 * @param {!Object} state
 * @param {number} colIdx
 * @return {!Object} the updated props of the column
 */
export function getColumn(state, colIdx) {
  // retrieve column directly from the cache if it already exists
  if (state.storedScrollableColumns.object[colIdx]) {
    return state.storedScrollableColumns.object[colIdx];
  }

  // if column doesn't exist in cache, then get the column from the user
  const columnProps = state.columnSettings.getScrollableColumn(colIdx);
  const column = convertColumnElementsToData(columnProps);

  // update column groups associated with the current column
  const { columnGroupIndex } = column.props;
  if (!isNil(columnGroupIndex)) {
    const columnGroupProps = state.columnSettings.getColumnGroup(
      columnGroupIndex
    );
    const columnGroup = convertColumnElementsToData(columnGroupProps);
    const storedColumnGroup =
      state.storedScrollableColumnGroups.object[columnGroupIndex];

    // update first and last child column indexes of the column group
    columnGroup.props.firstChildIdx = _.min([
      colIdx,
      _.get(storedColumnGroup, 'props.firstChildIdx'),
    ]);
    columnGroup.props.lastChildIdx = _.max([
      colIdx,
      _.get(storedColumnGroup, 'props.lastChildIdx'),
    ]);

    // cache the column group
    state.storedScrollableColumnGroups.object[columnGroupIndex] = columnGroup;
  }

  state.storedScrollableColumns.object[colIdx] = column;
  updateColWidth(state, colIdx, column.props.width);
  return column;
}

/**
 * Get and cache the width for a specific column
 *
 * @param {!Object} state
 * @param {number} colIdx
 * @return {number} The new col width
 */
export function getColWidth(state, colIdx) {
  return getColumn(state, colIdx).props.width;
}

/**
 * Update our cached width for a specific column
 *
 * @param {!Object} state
 * @param {number} colIdx
 * @param {number} newWidth
 * @return {number} The new col width
 */
export function updateColWidth(state, colIdx, newWidth) {
  state.storedScrollableColumns.object[colIdx].props.width = newWidth;
  state.colOffsetIntervalTree.set(colIdx, newWidth);
  state.scrollContentWidth += newWidth - state.storedWidths.array[colIdx];
  state.storedWidths.array[colIdx] = newWidth;
  return newWidth;
}
