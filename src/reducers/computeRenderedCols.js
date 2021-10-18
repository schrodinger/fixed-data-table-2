/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule computeRenderedCols
 */

'use strict';

import merge from 'lodash/merge';
import clamp from 'lodash/clamp';

import roughHeightsSelector from '../selectors/roughHeights';
import scrollbarsVisibleSelector from '../selectors/scrollbarsVisible';
import tableHeightsSelector from '../selectors/tableHeights';
import { getColWidth } from './updateColWidth';
import convertColumnElementsToData from '../helper/convertColumnElementsToData';

/**
 * Returns data about the columns to render
 * columns is a map of colIndexes to render to their widths
 * firstColIndex & firstColOffset are calculated based on the lastIndex if
 * specified in scrollAnchor.
 * Otherwise, they are unchanged from the firstIndex & firstOffset scrollAnchor values.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {!Object} The updated state object
 */
export default function computeRenderedCols(state, scrollAnchor) {
  let colRange = calculateRenderedColRange(state, scrollAnchor);

  const { scrollContentWidth } = state;
  const {
    fixedColumnsCount,
    fixedRightColumnsCount,
    scrollableColumnsCount,
  } = state.columnSettings;
  const { bodyWidth } = tableHeightsSelector(state);

  const {
    columnsToRender: fixedColumnsToRender,
    columnOffsets: fixedColumnOffsets,
    columnGroupsToRender: fixedColumnGroupsToRender,
    columnGroupOffsets: fixedColumnGroupOffsets,
  } = computeRenderedFixedColumnsAndGroups(
    state,
    state.fixedColumns,
    state.fixedColumnGroups
  );

  const {
    columnsToRender: fixedRightColumnsToRender,
    columnOffsets: fixedRightColumnOffsets,
    columnGroupsToRender: fixedRightColumnGroupsToRender,
    columnGroupOffsets: fixedRightColumnGroupOffsets,
  } = computeRenderedFixedColumnsAndGroups(
    state,
    state.fixedRightColumns,
    state.fixedRightColumnGroups
  );

  const maxScrollX = scrollContentWidth - bodyWidth;
  let firstColumnOffset;

  // NOTE (jordan) This handles #115 where resizing the viewport may
  // leave only a subset of columns shown, but no scrollbar to scroll up to the first columns.
  if (maxScrollX === 0) {
    if (colRange.firstViewportIdx > 0) {
      colRange = calculateRenderedColRange(state, {
        firstOffset: 0,
        lastIndex: scrollableColumnsCount - 1,
      });
    }

    firstColumnOffset = 0;
  } else {
    firstColumnOffset = colRange.firstOffset;
  }

  const firstColumnIndex = colRange.firstViewportIdx;
  const endColumnIndex = colRange.endViewportIdx;

  computeRenderedColumnOffsets(state, colRange, state.scrolling);
  calculateRenderedColumnGroupRange(state, colRange);
  computeRenderedColumnGroups(state);

  // Now that the range of columns, their offsets, and positions are calculated, we can finally get the list of
  // virtualized columns and column groups.
  const { scrollableColumns, scrollableColumnGroups } = getVirtualizedColumns(
    state
  );

  let scrollX = 0;
  if (scrollableColumnsCount > 0) {
    scrollX =
      state.columnOffsets[colRange.firstViewportIdx] - firstColumnOffset;
  }

  scrollX = clamp(scrollX, 0, maxScrollX);

  return Object.assign(state, {
    firstColumnIndex,
    firstColumnOffset,
    fixedColumnsToRender,
    fixedColumnOffsets,
    fixedRightColumnsToRender,
    fixedRightColumnOffsets,
    fixedColumnGroupsToRender,
    fixedColumnGroupOffsets,
    fixedRightColumnGroupsToRender,
    fixedRightColumnGroupOffsets,
    endColumnIndex,
    maxScrollX,
    scrollX,
    scrollableColumns,
    scrollableColumnGroups,
  });
}

/**
 * Computes the buffer positions and offsets for fixed columns and fixed column groups.
 * We do this by iterating over all the fixed columns in order until it fills up the viewport.
 * We also calculate the column groups associated with these fixed columns along the way.
 *
 * @param state
 * @param columnsContainer
 * @param columnsGroupsContainer
 * @param columnGroupGetter
 * @returns {{columnsToRender: Array, columnOffsets: {}, columnGroupsToRender: Array, columnGroupOffsets: {}}}
 */
function computeRenderedFixedColumnsAndGroups(
  state,
  columnsContainer,
  columnsGroupsContainer
) {
  const tableWidth = state.tableSize.width;

  let widthUsed = 0;
  const columnsToRender = [];
  const columnGroupsToRender = [];
  const columnOffsets = {};
  const columnGroupOffsets = {};
  const columnGroupWidths = {};

  // iterate over the fixed columns
  for (var idx = 0; idx < _.size(columnsContainer); idx++) {
    // no need to calculate fixed columns past the viewport
    if (widthUsed > tableWidth) {
      break;
    }

    columnsToRender[idx] = idx;
    columnOffsets[idx] = widthUsed;
    const { width, columnGroupIndex } = columnsContainer[idx].props;

    // update column group widths and offsets along the way if they exist
    if (!_.isNil(columnGroupIndex)) {
      if (_.isNil(columnGroupOffsets[columnGroupIndex])) {
        columnGroupOffsets[columnGroupIndex] = widthUsed;
      }
      if (_.isNil(columnGroupsToRender[columnGroupIndex])) {
        columnGroupsToRender.push(columnGroupIndex);
      }

      columnGroupWidths[columnGroupIndex] =
        (columnGroupWidths[columnGroupIndex] || 0) + width;

      if (_.isNil(columnsGroupsContainer[columnGroupIndex])) {
        columnsGroupsContainer[columnGroupIndex] = convertColumnElementsToData(
          state.columnSettings.getColumnGroup(columnGroupIndex)
        );
      }
      columnsGroupsContainer[columnGroupIndex].props.width =
        columnGroupWidths[columnGroupIndex];
    }

    widthUsed += width;
  }

  return {
    columnsToRender,
    columnOffsets,
    columnGroupsToRender,
    columnGroupOffsets,
  };
}

/**
 * Calculates the range of column groups that are to be rendered.
 *
 * @param {!Object} state
 * @param {!{
 *   firstViewportIdx: number,
 *   endViewportIdx: number
 * }} colRange
 */
function calculateRenderedColumnGroupRange(state, colRange) {
  const { firstViewportIdx, endViewportIdx } = colRange;

  state.columnGroupRange = {
    firstViewportColumnGroupIndex: 0,
    endViewportColumnGroupIndex: 0,
  };

  if (state.columnSettings.scrollableColumnsCount === 0) {
    return;
  }

  const firstViewportColumnGroupIndex =
    state.storedScrollableColumns.object[firstViewportIdx].props
      .columnGroupIndex;

  const endViewportColumnGroupIndex =
    endViewportIdx === 0
      ? 1
      : state.storedScrollableColumns.object[endViewportIdx - 1].props
          .columnGroupIndex + 1;

  // column group doesn't exist
  if (_.isNil(firstViewportColumnGroupIndex)) {
    return;
  }

  state.firstViewportColumnGroupIndex = firstViewportColumnGroupIndex;
  state.endViewportColumnGroupIndex = endViewportColumnGroupIndex;
}

/**
 * Calculate the buffer positions and offsets for each column group in the visible viewport
 *
 * @param {!Object} state
 */
function computeRenderedColumnGroups(state) {
  const columnGroupsToRender = [];
  const columnGroupOffsets = {};

  for (
    let idx = state.firstViewportColumnGroupIndex;
    idx < state.endViewportColumnGroupIndex;
    idx++
  ) {
    const columnGroup = state.storedScrollableColumnGroups.object[idx];
    const { firstChildIdx, lastChildIdx } = columnGroup.props;

    columnGroupOffsets[idx] = state.colOffsetIntervalTree.sumUntil(
      firstChildIdx
    );
    state.storedScrollableColumnGroups.object[idx].props.width =
      state.colOffsetIntervalTree.sumUntil(lastChildIdx) -
      columnGroupOffsets[idx] +
      state.storedWidths.array[lastChildIdx];

    // Get position for the viewport col
    const colPosition = addColToBuffer(
      idx,
      state.colGroupBufferSet,
      state.firstViewportColumnGroupIndex,
      state.endViewportColumnGroupIndex,
      state.endViewportColumnGroupIndex - state.firstViewportColumnGroupIndex
    );
    columnGroupsToRender[colPosition] = idx;
  }

  state.columnGroupOffsets = columnGroupOffsets;
  state.columnGroupsToRender = columnGroupsToRender;
}

/**
 * Determine the range of columns to render (buffer and viewport)
 * The leading and trailing buffer is based on a fixed count,
 * while the viewport columns are based on their width and the viewport width
 * We use the scrollAnchor to determine what either the first or last col
 * will be, as well as the offset.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex?: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstOffset: number,
 *   firstViewportIdx: number,
 * }}
 * @private
 */
function calculateRenderedColRange(state, scrollAnchor) {
  const { bufferColCount, maxAvailableWidth } = roughHeightsSelector(state);

  const scrollableColumnsCount = state.columnSettings.scrollableColumnsCount;

  if (scrollableColumnsCount === 0) {
    return {
      endBufferIdx: 0,
      endViewportIdx: 0,
      firstBufferIdx: 0,
      firstOffset: 0,
      firstViewportIdx: 0,
    };
  }

  // If our first or last index is greater than our columnsCount,
  // treat it as if the last col is at the bottom of the viewport
  let { firstIndex, firstOffset, lastIndex } = scrollAnchor;

  if (
    firstIndex >= scrollableColumnsCount ||
    lastIndex >= scrollableColumnsCount
  ) {
    lastIndex = scrollableColumnsCount - 1;
  }

  // Walk the viewport until filled with columns
  // If lastIndex is set, walk backward so that col is the last in the viewport
  let step = 1;
  let startIdx = firstIndex;
  let totalWidth = firstOffset;
  if (lastIndex !== undefined) {
    step = -1;
    startIdx = lastIndex;
    totalWidth = 0;
  }

  // Loop to walk the viewport until we've touched enough columns to fill its width
  let colIdx = startIdx;
  let endIdx = colIdx;
  while (
    colIdx < scrollableColumnsCount &&
    colIdx >= 0 &&
    totalWidth < maxAvailableWidth
  ) {
    totalWidth += getColWidth(state, colIdx);
    endIdx = colIdx;
    colIdx += step;
  }

  /* Handle the case where columns have shrunk and there's not enough content
      between the start scroll anchor and the end of the table to fill the available space.
      In this case process earlier columns as needed and act as if we've scrolled to the last col.
    */

  let forceScrollToLastCol = false;
  if (
    totalWidth < maxAvailableWidth &&
    colIdx === scrollableColumnsCount &&
    lastIndex === undefined
  ) {
    forceScrollToLastCol = true;
    colIdx = firstIndex - 1;

    while (colIdx >= 0 && totalWidth < maxAvailableWidth) {
      totalWidth += getColWidth(state, colIdx);
      startIdx = colIdx;
      --colIdx;
    }
  }

  // Loop to walk the leading buffer
  let firstViewportIdx = Math.min(startIdx, endIdx);
  const firstBufferIdx = Math.max(firstViewportIdx - bufferColCount, 0);
  for (colIdx = firstBufferIdx; colIdx < firstViewportIdx; colIdx++) {
    getColWidth(state, colIdx);
  }

  // Loop to walk the trailing buffer
  const endViewportIdx = Math.max(startIdx, endIdx) + 1;
  const endBufferIdx = Math.min(
    endViewportIdx + bufferColCount,
    scrollableColumnsCount
  );
  for (colIdx = endViewportIdx; colIdx < endBufferIdx; colIdx++) {
    getColWidth(state, colIdx);
  }

  const { availableWidth } = scrollbarsVisibleSelector(state);
  if (lastIndex !== undefined || forceScrollToLastCol) {
    // Calculate offset needed to position last col at bottom of viewport
    // This should be negative and represent how far the first col needs to be offscreen
    // NOTE (jordan): The first offset should always be 0 when lastIndex is defined
    // since we don't currently support scrolling the last col into view with an offset.
    firstOffset = firstOffset + Math.min(availableWidth - totalWidth, 0);

    // Handle a case where the offset puts the first col fully offscreen
    // This can happen if availableWidth & maxAvailableWidth are different
    const { storedWidths } = state;
    if (-1 * firstOffset >= storedWidths.array[firstViewportIdx]) {
      firstViewportIdx += 1;
      firstOffset += storedWidths.array[firstViewportIdx];
    }
  }

  return {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstOffset,
    firstViewportIdx,
  };
}

/**
 * Walk the columns to render and compute the width offsets and
 * positions in the col buffer.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstViewportIdx: number,
 * }} colRange
 * @param {boolean} viewportOnly
 * @private
 */
function computeRenderedColumnOffsets(state, colRange, viewportOnly) {
  const { colBufferSet, colOffsetIntervalTree, storedWidths } = state;
  const {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstViewportIdx,
  } = colRange;

  const renderedColsCount = endBufferIdx - firstBufferIdx;
  if (renderedColsCount === 0) {
    state.columnOffsets = {};
    state.columnsToRender = [];
    return;
  }

  const startIdx = viewportOnly ? firstViewportIdx : firstBufferIdx;
  const endIdx = viewportOnly ? endViewportIdx : endBufferIdx;

  // output for this function
  const columnsToRender = []; // state.columns
  const columnOffsets = {}; // state.colOffsets

  // incremental way for calculating colOffset
  let runningOffset = colOffsetIntervalTree.sumUntil(startIdx);

  // compute col index and offsets for every columns inside the buffer
  for (let colIdx = startIdx; colIdx < endIdx; colIdx++) {
    columnOffsets[colIdx] = runningOffset;
    runningOffset += storedWidths.array[colIdx];

    // Update the offset for rendering the col

    // Get position for the viewport col
    const colPosition = addColToBuffer(
      colIdx,
      colBufferSet,
      startIdx,
      endIdx,
      renderedColsCount
    );
    columnsToRender[colPosition] = colIdx;
  }

  // now we modify the state with the newly calculated columns and offsets
  state.columnsToRender = columnsToRender;
  state.columnOffsets = columnOffsets;
}

/**
 * This returns the required slice of columns and column group objects.
 *
 * @param state
 * @returns {{scrollableColumns: Object.<ColumnDetails>, scrollableColumnGroups: Object.<ColumnDetails>}}
 */
function getVirtualizedColumns(state) {
  /**
   * NOTE (pradeep): We maintain a cache of `columnsToRender` which contains both the active list of columns in
   * the viewport and also columns from `colBufferSet` that no longer lie inside the viewport.
   * The cache allows us to keep the columns outside the viewport alive, preventing unmounts.
   */
  const cachedColumnsToRender = merge(
    [],
    state.cachedColumnsToRender.array,
    state.columnsToRender
  );
  const scrollableColumns = {};
  for (let colIdx of cachedColumnsToRender) {
    if (colIdx !== undefined) {
      scrollableColumns[colIdx] = state.storedScrollableColumns.object[colIdx];
    }
  }
  state.cachedColumnsToRender.array = cachedColumnsToRender;

  /**
   * NOTE (pradeep): We maintain a cache of `columnGroupsToRender` which contains both the active list of
   * column groups in the viewport and also column groups from `colBufferSet` that no longer lie inside the viewport.
   * The cache allows us to keep the columns outside the viewport alive, preventing unmounts.
   */
  const cachedColumnGroupsToRender = merge(
    [],
    state.cachedColumnGroupsToRender.array,
    state.columnGroupsToRender
  );
  const scrollableColumnGroups = {};
  for (let colIdx of cachedColumnGroupsToRender) {
    if (colIdx !== undefined) {
      scrollableColumnGroups[colIdx] =
        state.storedScrollableColumnGroups.object[colIdx];
    }
  }
  // TODO (pradeep): Figure out why freezing scrollableColumnGroups is necessary here.
  Object.freeze(scrollableColumnGroups);
  state.cachedColumnGroupsToRender.array = cachedColumnGroupsToRender;

  return {
    scrollableColumns,
    scrollableColumnGroups,
  };
}

/**
 * Add the col to the buffer set if it doesn't exist.
 * If addition isn't possible due to max buffer size, it'll replace an existing element outside the given range.
 *
 * @param {!number} colIdx
 * @param {!number} colBufferSet
 * @param {!number} startRange
 * @param {!number} endRange
 * @param {!number} maxBufferSize
 *
 * @return {?number} the position of the col after being added to the buffer set
 * @private
 */
function addColToBuffer(
  colIdx,
  colBufferSet,
  startRange,
  endRange,
  maxBufferSize
) {
  // Check if col already has a position in the buffer
  let colPosition = colBufferSet.getValuePosition(colIdx);

  // Request a position in the buffer through eviction of another col
  if (colPosition === null && colBufferSet.getSize() >= maxBufferSize) {
    colPosition = colBufferSet.replaceFurthestValuePosition(
      startRange,
      endRange - 1, // replaceFurthestValuePosition uses closed interval from startRange to endRange
      colIdx
    );
  }

  if (colPosition === null) {
    colPosition = colBufferSet.getNewPositionForValue(colIdx);
  }

  return colPosition;
}
