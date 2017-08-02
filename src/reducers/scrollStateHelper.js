/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollStateHelper
 */

'use strict';

import bufferRowsCountSelector from 'bufferRowsCount';
import clamp from 'clamp';
import verticalHeightsSelector from 'verticalHeights';

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
function computeRenderedRows(state, scrollAnchor) {
  const newState = Object.assign({}, state);
  const rowRange = calculateRenderedRowRange(newState, scrollAnchor);
  computeRenderedRowOffsets(newState, rowRange);

  let {
    firstRowIndex,
    firstRowOffset,
    rowHeights,
    rowsCount,
    scrollContentHeight,
    scrollY,
  } = newState;

  const { bodyHeight } = verticalHeightsSelector(newState);
  const maxScrollY = scrollContentHeight - bodyHeight;

  if (rowsCount === 0) {
    scrollY = 0;
  } else {
    scrollY = rowHeights[firstRowIndex] - firstRowOffset;
  }
  scrollY = Math.min(scrollY, maxScrollY);
  return Object.assign(newState, {
    maxScrollY,
    scrollY,
  });
}

/**
 * Scroll to a specific position in the grid
 *
 * @param {!Object} state
 * @param {number} scrollY
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function scrollTo(state, scrollY) {
  const { availableHeight } = verticalHeightsSelector(state);
  const {
    rowOffsets,
    rowsCount,
    scrollContentHeight,
  } = state;

  if (rowsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0,
    };
  }

  let firstIndex = 0;
  let firstOffset = 0;
  let lastIndex = undefined;
  if (scrollY <= 0) {
    // Use defaults (from above) to scroll to first row
  } else if (scrollY >= scrollContentHeight - availableHeight) {
    // Scroll to the last row
    firstIndex = undefined;
    lastIndex = rowsCount - 1;
  } else {
    // Mark the row which will appear first in the viewport
    // We use this as our "marker" when scrolling even if updating rowHeights
    // leads to it not being different from the scrollY specified
    const newRowIdx = rowOffsets.greatestLowerBound(scrollY);
    firstIndex = clamp(newRowIdx, 0, Math.max(rowsCount - 1, 0));

    // Record how far into the first row we should scroll
    // firstOffset is a negative value representing how much larger scrollY is
    // than the scroll position of the first row in the viewport
    const firstRowPosition = rowOffsets.sumUntil(firstIndex);
    firstOffset = firstRowPosition - scrollY;
  }

  return {
    firstIndex,
    firstOffset,
    lastIndex,
    // NOTE (jordan) This changed heuristic may give false positives,
    // but that's fine since it's used as a filter to computeRenderedRows
    changed: scrollY !== 0,
  };
}

/**
 * Scroll a specified row into the viewport
 * If the row is before the viewport, it will become the first row in the viewport
 * If the row is after the viewport, it will become the last row in the viewport
 * If the row is in the viewport, do nothing
 *
 * @param {!Object} state
 * @param {number} rowIndex
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function scrollToRow(state, rowIndex) {
  const { availableHeight } = verticalHeightsSelector(state);
  const {
    rowOffsets,
    rowsCount,
    storedHeights,
    scrollY,
  } = state;

  if (rowsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0,
    };
  }

  rowIndex = clamp(rowIndex, 0, Math.max(rowsCount - 1, 0));
  let rowBegin = rowOffsets.sumUntil(rowIndex);
  let rowEnd = rowBegin + storedHeights[rowIndex];

  let firstIndex = rowIndex;
  let lastIndex = undefined;
  if (rowBegin < scrollY) {
    // If before the viewport, set as the first row in the viewport
    // Uses defaults (from above)
  } else if (scrollY + availableHeight < rowEnd) {
    // If after the viewport, set as the last row in the viewport
    firstIndex = undefined;
    lastIndex = rowIndex;
  } else {
    // If already in the viewport, do nothing.
    return {
      firstIndex: state.firstRowIndex,
      firstOffset: state.firstRowOffset,
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
  const bufferRowsCount = bufferRowsCountSelector(state);
  const { availableHeight } = verticalHeightsSelector(state);
  const rowsCount = state.rowsCount;

  if (rowsCount === 0) {
    return {
      endBufferIdx: 0,
      endViewportIdx: 0,
      firstBufferIdx: 0,
      firstViewportIdx: 0,
    };
  }

  let {
    firstIndex,
    firstOffset,
    lastIndex,
  } = scrollAnchor;

  // If our first or last index is greater than our rowsCount,
  // treat it as if the last row is at the bottom of the viewport
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
  while (totalHeight < availableHeight && rowIdx < rowsCount && rowIdx >= 0) {
    totalHeight += updateRowHeight(state, rowIdx);
    endIdx = rowIdx;
    rowIdx += step;
  }

  let firstRowOffset = firstOffset;
  if (lastIndex !== undefined) {
    // Calculate offset needed to position last row at bottom of viewport
    // This should be negative and represent how far the first row needs to be offscreen
    firstRowOffset = Math.min(availableHeight - totalHeight, 0);
  }

  // Loop to walk the leading buffer
  const firstViewportIdx = Math.min(startIdx, endIdx);
  const firstBufferIdx = Math.max(firstViewportIdx - bufferRowsCount, 0);
  for (rowIdx = firstBufferIdx; rowIdx < firstViewportIdx; rowIdx++) {
    updateRowHeight(state, rowIdx);
  }

  // Loop to walk the trailing buffer
  const endViewportIdx = Math.max(startIdx, endIdx) + 1;
  const endBufferIdx = Math.min(endViewportIdx + bufferRowsCount, rowsCount);
  for (rowIdx = endViewportIdx; rowIdx < endBufferIdx; rowIdx++) {
    updateRowHeight(state, rowIdx);
  }

  state.firstRowIndex = firstViewportIdx;
  state.firstRowOffset = firstRowOffset;

  return {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstViewportIdx,
  };
}

/**
 * Walk the rows to render and compute the
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
 * @private
 */
function computeRenderedRowOffsets(state, rowRange) {
  const {
    bufferSet,
    rowOffsets,
    storedHeights,
  } = state;
  const {
    endBufferIdx,
    endViewportIdx,
    firstBufferIdx,
    firstViewportIdx,
  } = rowRange;

  const renderedRowsCount = endBufferIdx - firstBufferIdx;
  if (renderedRowsCount === 0) {
    state.rowHeights = {};
    state.rows = [];
    return;
  }

  const bufferMapping = []; // state.rows
  const rowOffsetsCache = {}; // state.rowHeights
  let runningOffset = rowOffsets.sumUntil(firstBufferIdx);
  for (let rowIdx = firstBufferIdx; rowIdx < endBufferIdx; rowIdx++) {

    // Update the offset for rendering the row
    rowOffsetsCache[rowIdx] = runningOffset;
    runningOffset += storedHeights[rowIdx];

    // Check if row already has a position in the buffer
    let rowPosition = bufferSet.getValuePosition(rowIdx);

    // Request a position in the buffer through eviction of another row
    if (rowPosition === null && bufferSet.getSize() >= renderedRowsCount) {
      rowPosition = bufferSet.replaceFurthestValuePosition(
        firstViewportIdx,
        endViewportIdx - 1,
        rowIdx
      );
    }

    // If we can't reuse any existing position, create a new one
    if (rowPosition === null) {
      rowPosition = bufferSet.getNewPositionForValue(rowIdx);
    }

    bufferMapping[rowPosition] = rowIdx;
  }

  state.rowHeights = rowOffsetsCache;
  state.rows = bufferMapping;
}

/**
 * Update our cached row height for a specific index
 * based on the value from rowHeightGetter
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {number} rowIdx
 * @return {number} The new row height
 * @private
 */
function updateRowHeight(state, rowIdx) {
  const {
    storedHeights,
    rowOffsets,
    rowHeightGetter,
  } = state;

  const newHeight = rowHeightGetter(rowIdx);
  const oldHeight = storedHeights[rowIdx];
  if (newHeight !== oldHeight) {
    rowOffsets.set(rowIdx, newHeight);
    storedHeights[rowIdx] = newHeight;
    state.scrollContentHeight += newHeight - oldHeight;
  }

  return storedHeights[rowIdx];
}

module.exports = {
  computeRenderedRows,
  scrollTo,
  scrollToRow,
};
