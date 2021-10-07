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

import clamp from 'lodash/clamp';

import roughHeightsSelector from '../selectors/roughHeights';
import scrollbarsVisibleSelector from '../selectors/scrollbarsVisible';
import tableHeightsSelector from '../selectors/tableHeights';
import updateColWidth from './updateColWidth';

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
  const newState = Object.assign({}, state);
  let colRange = calculateRenderedColRange(newState, scrollAnchor);

  const { scrollContentWidth } = newState;
  const scrollableColsCount = newState.scrollableColumns.cell.length;
  const { bodyWidth } = tableHeightsSelector(newState);
  computeRenderedFixedCols(newState, bodyWidth);
  computeRenderedFixedRightCols(newState, bodyWidth);
  const maxScrollX = scrollContentWidth - bodyWidth;
  let firstColumnOffset;

  // NOTE (jordan) This handles #115 where resizing the viewport may
  // leave only a subset of columns shown, but no scrollbar to scroll up to the first columns.
  if (maxScrollX === 0) {
    if (colRange.firstViewportIdx > 0) {
      colRange = calculateRenderedColRange(newState, {
        firstOffset: 0,
        lastIndex: scrollableColsCount - 1,
      });
    }

    firstColumnOffset = 0;
  } else {
    firstColumnOffset = colRange.firstOffset;
  }

  const firstColumnIndex = colRange.firstViewportIdx;
  const endColumnIndex = colRange.endViewportIdx;

  computeRenderedColumnOffsets(newState, colRange, state.scrolling);

  let scrollX = 0;
  if (scrollableColsCount > 0) {
    scrollX =
      newState.columnOffsets[colRange.firstViewportIdx] - firstColumnOffset;
  }

  scrollX = clamp(scrollX, 0, maxScrollX);

  return Object.assign(newState, {
    firstColumnIndex,
    firstColumnOffset,
    endColumnIndex,
    maxScrollX,
    scrollX,
  });
}
function computeRenderedFixedCols(state, bodyWidth) {
  var widthUsed = 0;
  var columns = [];
  var columnOffsets = {};

  if (!state.fixedColumns.cell) return;
  for (var idx = 0; idx < state.fixedColumns.cell.length; idx++) {
    columns[idx] = idx;
    columnOffsets[idx] = widthUsed;
    widthUsed += state.fixedColumns.cell[idx].props.width;
    if (widthUsed > bodyWidth) break;
  }

  state.fixedColumnsToRender = columns;
  state.fixedColumnOffsets = columnOffsets;
}
function computeRenderedFixedRightCols(state, bodyWidth) {
  var widthUsed = 0;
  var columns = [];
  var columnOffsets = {};

  if (!state.fixedRightColumns.cell) return;
  for (var idx = 0; idx < state.fixedRightColumns.cell.length; idx++) {
    columns[idx] = idx;
    columnOffsets[idx] = widthUsed;
    widthUsed += state.fixedRightColumns.cell[idx].props.width;
    if (widthUsed > bodyWidth) break;
  }
  state.fixedRightColumnsToRender = columns;
  state.fixedRightColumnOffsets = columnOffsets;
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

  const scrollableColsCount = state.scrollableColumns.cell.length;

  if (scrollableColsCount === 0) {
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

  if (firstIndex >= scrollableColsCount || lastIndex >= scrollableColsCount) {
    lastIndex = scrollableColsCount - 1;
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
    colIdx < scrollableColsCount &&
    colIdx >= 0 &&
    totalWidth < maxAvailableWidth
  ) {
    totalWidth += updateColWidth(state, colIdx);
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
    colIdx === scrollableColsCount &&
    lastIndex === undefined
  ) {
    forceScrollToLastCol = true;
    colIdx = firstIndex - 1;

    while (colIdx >= 0 && totalWidth < maxAvailableWidth) {
      totalWidth += updateColWidth(state, colIdx);
      startIdx = colIdx;
      --colIdx;
    }
  }

  // Loop to walk the leading buffer
  let firstViewportIdx = Math.min(startIdx, endIdx);
  const firstBufferIdx = Math.max(firstViewportIdx - bufferColCount, 0);
  for (colIdx = firstBufferIdx; colIdx < firstViewportIdx; colIdx++) {
    updateColWidth(state, colIdx);
  }

  // Loop to walk the trailing buffer
  const endViewportIdx = Math.max(startIdx, endIdx) + 1;
  const endBufferIdx = Math.min(
    endViewportIdx + bufferColCount,
    scrollableColsCount
  );
  for (colIdx = endViewportIdx; colIdx < endBufferIdx; colIdx++) {
    updateColWidth(state, colIdx);
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
    if (-1 * firstOffset >= storedWidths[firstViewportIdx]) {
      firstViewportIdx += 1;
      firstOffset += storedWidths[firstViewportIdx];
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
    runningOffset += storedWidths[colIdx];

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
