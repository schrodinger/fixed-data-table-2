/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule computeRenderedRows
 */

'use strict';

import clamp from 'lodash/clamp';
import updateRowHeight from 'updateRowHeight';
import roughHeightsSelector from 'roughHeights';
import scrollbarsVisibleSelector from 'scrollbarsVisible';
import tableHeightsSelector from 'tableHeights';

/**
 * Returns data about the rows to render
 * rows is a map of rowIndexes to render to their heights
 * firstRowIndex & firstRowOffset are calculated based on the lastIndex if
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
export default function computeRenderedRows(state, scrollAnchor) {
  const newState = Object.assign({}, state);
  let rowRange = calculateRenderedRowRange(newState, scrollAnchor);

  const { rowSettings, scrollContentHeight } = newState;
  const { rowsCount } = rowSettings;
  const { bodyHeight } = tableHeightsSelector(newState);
  const maxScrollY = scrollContentHeight - bodyHeight;

  // NOTE (jordan) This handles #115 where resizing the viewport may
  // leave only a subset of rows shown, but no scrollbar to scroll up to the first rows.
  if (maxScrollY === 0) {
    if (rowRange.firstViewportIdx > 0) {
      rowRange = calculateRenderedRowRange(newState, {
        firstOffset: 0,
        lastIndex: rowsCount - 1,
      });
    }

    newState.firstRowOffset = 0;
  }

  computeRenderedRowOffsets(newState, rowRange, state.scrolling);

  let scrollY = 0;
  if (rowsCount > 0) {
    scrollY = newState.rowOffsets[rowRange.firstViewportIdx] - newState.firstRowOffset;
  }
  scrollY = clamp(scrollY, 0, maxScrollY);

  return Object.assign(newState, {
    maxScrollY,
    scrollY,
  });
}

/**
 * Determine the range of rows to render (buffer and viewport)
 * The leading and trailing buffer is based on a fixed count,
 * while the viewport rows are based on their height and the viewport height
 * We use the scrollAnchor to determine what either the first or last row
 * will be, as well as the offset.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstViewportIdx: number,
 * }}
 * @private
 */
function calculateRenderedRowRange(state, scrollAnchor) {
  const { bufferRowCount, maxAvailableHeight } = roughHeightsSelector(state);
  const rowsCount = state.rowSettings.rowsCount;

  if (rowsCount === 0) {
    return {
      endBufferIdx: 0,
      endViewportIdx: 0,
      firstBufferIdx: 0,
      firstViewportIdx: 0,
    };
  }


  // If our first or last index is greater than our rowsCount,
  // treat it as if the last row is at the bottom of the viewport
  let { firstIndex, firstOffset, lastIndex } = scrollAnchor;
  if (firstIndex >= rowsCount || lastIndex >= rowsCount) {
    lastIndex = rowsCount - 1;
  }

  // Walk the viewport until filled with rows
  // If lastIndex is set, walk backward so that row is the last in the viewport
  let step = 1;
  let startIdx = firstIndex;
  let totalHeight = firstOffset;
  if (lastIndex !== undefined) {
    step = -1;
    startIdx = lastIndex;
    totalHeight = 0;
  }

  // Loop to walk the viewport until we've touched enough rows to fill its height
  let rowIdx = startIdx;
  let endIdx = rowIdx;
  while (rowIdx < rowsCount && rowIdx >= 0 &&
      totalHeight < maxAvailableHeight) {
    totalHeight += updateRowHeight(state, rowIdx);
    endIdx = rowIdx;
    rowIdx += step;
  }

  // Loop to walk the leading buffer
  let firstViewportIdx = Math.min(startIdx, endIdx);
  const firstBufferIdx = Math.max(firstViewportIdx - bufferRowCount, 0);
  for (rowIdx = firstBufferIdx; rowIdx < firstViewportIdx; rowIdx++) {
    updateRowHeight(state, rowIdx);
  }

  // Loop to walk the trailing buffer
  const endViewportIdx = Math.max(startIdx, endIdx) + 1;
  const endBufferIdx = Math.min(endViewportIdx + bufferRowCount, rowsCount);
  for (rowIdx = endViewportIdx; rowIdx < endBufferIdx; rowIdx++) {
    updateRowHeight(state, rowIdx);
  }

  const { availableHeight } = scrollbarsVisibleSelector(state);
  if (lastIndex !== undefined) {
    // Calculate offset needed to position last row at bottom of viewport
    // This should be negative and represent how far the first row needs to be offscreen
    firstOffset = Math.min(availableHeight - totalHeight, 0);

    // Handle a case where the offset puts the first row fully offscreen
    // This can happen if availableHeight & maxAvailableHeight are different
    const { storedHeights } = state;
    if (-1 * firstOffset >= storedHeights[firstViewportIdx]) {
      firstViewportIdx += 1;
      firstOffset += storedHeights[firstViewportIdx];
    }
  }

  state.firstRowIndex = firstViewportIdx;
  state.endRowIndex = endViewportIdx;
  state.firstRowOffset = firstOffset;
  return {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstViewportIdx,
  };
}

/**
 * Walk the rows to render and compute the height offsets and
 * positions in the row buffer.
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
 * }} rowRange
 * @param {boolean} viewportOnly
 * @private
 */
function computeRenderedRowOffsets(state, rowRange, viewportOnly) {
  const { rowBufferSet, rowOffsetIntervalTree, storedHeights } = state;
  const {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstViewportIdx,
  } = rowRange;

  const renderedRowsCount = endBufferIdx - firstBufferIdx;
  if (renderedRowsCount === 0) {
    state.rowOffsets = {};
    state.rows = [];
    return;
  }

  const startIdx = viewportOnly ? firstViewportIdx : firstBufferIdx;
  const endIdx = viewportOnly ? endViewportIdx : endBufferIdx;

  // output for this function
  const rows = []; // state.rows
  const rowOffsets = {}; // state.rowOffsets

  // incremental way for calculating rowOffset
  let runningOffset = rowOffsetIntervalTree.sumUntil(startIdx);

  // compute row index and offsets for every rows inside the buffer
  for (let rowIdx = startIdx; rowIdx < endIdx; rowIdx++) {

    // Update the offset for rendering the row
    rowOffsets[rowIdx] = runningOffset;
    runningOffset += storedHeights[rowIdx];

    // Get position for the viewport row
    const rowPosition = addRowToBuffer(rowIdx, rowBufferSet, startIdx, endIdx, renderedRowsCount);
    rows[rowPosition] = rowIdx;
  }

  // now we modify the state with the newly calculated rows and offsets
  state.rows = rows;
  state.rowOffsets = rowOffsets;
}

/**
 * Add the row to the buffer set if it doesn't exist.
 * If addition isn't possible due to max buffer size, it'll replace an existing element outside the given range.
 *
 * @param {!number} rowIdx
 * @param {!number} rowBufferSet
 * @param {!number} startRange
 * @param {!number} endRange
 * @param {!number} maxBufferSize
 *
 * @return {?number} the position of the row after being added to the buffer set
 * @private
 */
function addRowToBuffer(rowIdx, rowBufferSet, startRange, endRange, maxBufferSize) {
  // Check if row already has a position in the buffer
  let rowPosition = rowBufferSet.getValuePosition(rowIdx);

  // Request a position in the buffer through eviction of another row
  if (rowPosition === null && rowBufferSet.getSize() >= maxBufferSize)  {
    rowPosition = rowBufferSet.replaceFurthestValuePosition(
      startRange,
      endRange - 1, // replaceFurthestValuePosition uses closed interval from startRange to endRange
      rowIdx
    );
  }

  if (rowPosition === null) {
    rowPosition = rowBufferSet.getNewPositionForValue(rowIdx);
  }

  return rowPosition;
}
