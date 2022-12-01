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

import _ from 'lodash';
import convertColumnElementsToData from '../helper/convertColumnElementsToData';

/**
 * Get's the scrollable column props for a specific index and also stores a cache of it
 *
 * @param {!Object} state
 * @param {number} localColIdx index of the column in relation to the scrollable columns set
 * @return {!Object} the updated props of the column
 */
export function getScrollableColumn(state, localColIdx) {
  // retrieve column directly from the cache if it already exists
  if (state.storedScrollableColumns.object[localColIdx]) {
    return state.storedScrollableColumns.object[localColIdx];
  }

  // index of the column in relation to the whole table.
  const colIdx = localColIdx + state.fixedColumnsCount;

  // if column doesn't exist in cache, then get the column from the user
  const columnProps = state.columnSettings.getColumn(colIdx);
  const column = convertColumnElementsToData(columnProps);
  column.props.index = colIdx;

  // update column groups associated with the current column
  const { columnGroupIndex } = column.props;
  if (!_.isNil(columnGroupIndex)) {
    const columnGroupProps =
      state.columnSettings.getColumnGroup(columnGroupIndex);
    const columnGroup = convertColumnElementsToData(columnGroupProps);
    const storedColumnGroup =
      state.storedScrollableColumnGroups.object[columnGroupIndex];

    // update first and last child column indexes of the column group
    columnGroup.props.firstChildIdx = _.min([
      localColIdx,
      _.get(storedColumnGroup, 'props.firstChildIdx'),
    ]);
    columnGroup.props.lastChildIdx = _.max([
      localColIdx,
      _.get(storedColumnGroup, 'props.lastChildIdx'),
    ]);

    columnGroup.props.index = columnGroupIndex;

    // cache the column group
    state.storedScrollableColumnGroups.object[columnGroupIndex] = columnGroup;
  }

  state.storedScrollableColumns.object[localColIdx] = column;
  updateScrollableColumnWidth(state, localColIdx, column.props.width);
  return column;
}

/**
 * Get and cache the width for a specific scrollable column
 *
 * @param {!Object} state
 * @param {number} localColIdx index of the column in relation to the scrollable columns set
 * @return {number} The new col width
 */
export function getScrollableColumnWidth(state, localColIdx) {
  return getScrollableColumn(state, localColIdx).props.width;
}

/**
 * Update our cached width for a specific scrollable column
 *
 * @param {!Object} state
 * @param {number} localColIdx index of the column in relation to the scrollable columns set
 * @param {number} newWidth
 * @return {number} The new col width
 */
export function updateScrollableColumnWidth(state, localColIdx, newWidth) {
  state.storedScrollableColumns.object[localColIdx].props.width = newWidth;
  state.scrollableColOffsetIntervalTree.set(localColIdx, newWidth);
  state.scrollContentWidth += newWidth - state.storedWidths.array[localColIdx];
  state.storedWidths.array[localColIdx] = newWidth;

  return newWidth;
}
