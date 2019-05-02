/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule computeRenderedColumns
 */

'use strict';

import clamp from 'lodash/clamp';
import columnWidths from 'columnWidths';
import scrollbarsVisibleSelector from 'scrollbarsVisible';
import updateColumnWidth from 'updateColumnWidth';

export default function computeRenderedColumns(state, columnAnchor) {
  // clone state
  const newState = Object.assign({}, state);
  
  // get buffer and viewport range
  const columnRange = calculateRenderedColumnRange(newState, columnAnchor);
  
  // update the offsets and buffer mapping
  computeRenderedColumnOffsets(newState, columnRange, newState.scrolling);

  // scrollX might have changed due to change in columns and offsets
  const { scrollableColumns, maxScrollX } = columnWidths(state);
  let scrollX = 0;
  if (scrollableColumns.length > 0) {
    scrollX = newState.columnOffsets[columnRange.firstViewportIdy] - newState.firstColumnOffset;
  }
  newState.scrollX = clamp(scrollX, 0, maxScrollX);

  return newState;
}

/**
 * Determine the range of columns to render (buffer and viewport)
 * The leading and trailing buffer is based on a fixed count,
 * while the viewport columns are based on their width and the viewport width.
 * We use the columnAnchor to determine what either the first or last column
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
 * }} columnAnchor
 * @return {{
 *   endBufferIdy: number,
 *   endViewportIdy: number,
 *   firstBufferIdy: number,
 *   firstViewportIdy: number,
 * }}
 * @private
 */
function calculateRenderedColumnRange(state, columnAnchor) {
  const bufferColumnCount = 3; // TODO (pradeep): should we calculate this similar to bufferColumnCount ?
  const { availableScrollWidth, scrollableColumns } = columnWidths(state);
  const columnCount = scrollableColumns.length;

  if (columnCount === 0) {
    return {
      endBufferIdy: 0,
      endViewportIdy: 0,
      firstBufferIdy: 0,
      firstViewportIdy: 0,
    };
  }

  // If our first or last index is greater than our columnCount,
  // treat it as if the last column is at the end of the viewport
  let { firstIndex, firstOffset, lastIndex } = columnAnchor;
  if (firstIndex >= columnCount || lastIndex >= columnCount) {
    lastIndex = columnCount - 1;
  }

  // Walk the viewport until filled with columns
  // If lastIndex is set, walk backward so that column is the last in the viewport
  let step = 1;
  let startIdy = firstIndex;
  let totalWidth = firstOffset;
  if (lastIndex !== undefined) {
    step = -1;
    startIdy = lastIndex;
    totalWidth = 0;
  }

  // Loop to walk the viewport until we've touched enough columns to fill its width
  let columnIdy = startIdy;
  let endIdy = columnIdy;
  while (columnIdy < columnCount && columnIdy >= 0 &&
      totalWidth < availableScrollWidth) {
    totalWidth += updateColumnWidth(state, columnIdy);
    endIdy = columnIdy;
    columnIdy += step;
  }

  // Loop to walk the leading buffer
  let firstViewportIdy = Math.min(startIdy, endIdy);
  const firstBufferIdy = Math.max(firstViewportIdy - bufferColumnCount, 0);
  for (columnIdy = firstBufferIdy; columnIdy < firstViewportIdy; columnIdy++) {
    updateColumnWidth(state, columnIdy);
  }

  // Loop to walk the trailing buffer
  const endViewportIdy = Math.max(startIdy, endIdy) + 1;
  const endBufferIdy = Math.min(endViewportIdy + bufferColumnCount, columnCount);
  for (columnIdy = endViewportIdy; columnIdy < endBufferIdy; columnIdy++) {
    updateColumnWidth(state, columnIdy);
  }

  // Calculate offset needed to position column at the end of viewport
  // This should be negative and represent how far the first column needs to be offscreen
  if (lastIndex !== undefined) {
    firstOffset = Math.min(availableScrollWidth - totalWidth, 0);
  }

  state.firstColumnIndex = firstViewportIdy;
  state.endColumnIndex = endViewportIdy;
  state.firstColumnOffset = firstOffset;

  return {
    endBufferIdy,
    endViewportIdy,
    firstBufferIdy,
    firstViewportIdy,
  };
}

/**
 * Walk the columns to render and compute the width offsets and
 * positions in the column buffer.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   endBufferIdy: number,
 *   endViewportIdy: number,
 *   firstBufferIdy: number,
 *   firstViewportIdy: number,
 * }} columnRange
 * @param {boolean} viewportOnly
 * @private
 */
function computeRenderedColumnOffsets(state, columnRange, viewportOnly) {
  const { columnBufferSet, columnOffsetIntervalTree } = state;
  const {
    endBufferIdy,
    endViewportIdy,
    firstBufferIdy,
    firstViewportIdy,
  } = columnRange;

  const {
    fixedColumnOffsets,
    fixedRightColumnOffsets,
    columnGroupOffsets,
    fixedColumnGroupOffsets,
    fixedRightColumnGroupOffsets,
  } = columnWidths(state);

  // we are only doing calculations for scrollable columns
  state.columnGroupOffsets = columnGroupOffsets;
  state.fixedColumnOffsets = fixedColumnOffsets;
  state.fixedRightColumnOffsets = fixedRightColumnOffsets;
  state.fixedColumnGroupOffsets = fixedColumnGroupOffsets;
  state.fixedRightColumnGroupOffsets = fixedRightColumnGroupOffsets;

  const renderedColumnsCount = endBufferIdy - firstBufferIdy;
  if (renderedColumnsCount === 0) {
    state.columnOffsets = {};
    state.columnsToRender = [];
    return;
  }

  const startIdx = viewportOnly ? firstViewportIdy : firstBufferIdy;
  const endIdx = viewportOnly ? endViewportIdy : endBufferIdy;

  // output for this function
  const columns = []; // state.columnsToRender
  const columnOffsets = {}; // state.columnOffsets

  // incremental way for calculating columnOffset
  let runningOffset = columnOffsetIntervalTree.sumUntil(startIdx);

  // compute column index and offsets for every columns inside the buffer
  for (let columnIdy = startIdx; columnIdy < endIdx; columnIdy++) {

    // Update the offset for rendering the column
    columnOffsets[columnIdy] = runningOffset;
    runningOffset += columnOffsetIntervalTree.get(columnIdy);

    // Get position for the viewport column
    const columnPosition = addColumnToBuffer(columnIdy, columnBufferSet, startIdx, endIdx, renderedColumnsCount);
    columns[columnPosition] = columnIdy;
  }

  // now we modify the state with the newly calculated columns and offsets
  state.columnsToRender = columns;
  state.columnOffsets = columnOffsets;
}

/**
 * Add the column to the buffer set if it doesn't exist.
 * If addition isn't possible due to max buffer size, it'll replace an existing element outside the given range.
 *
 * @param {!number} columnIdy
 * @param {!number} columnBufferSet
 * @param {!number} startRange
 * @param {!number} endRange
 * @param {!number} maxBufferSize
 *
 * @return {?number} the position of the column after being added to the buffer set
 * @private
 */
function addColumnToBuffer(columnIdy, columnBufferSet, startRange, endRange, maxBufferSize) {
  // Check if column already has a position in the buffer
  let columnPosition = columnBufferSet.getValuePosition(columnIdy);

  // Request a position in the buffer through eviction of another column
  if (columnPosition === null && columnBufferSet.getSize() >= maxBufferSize)  {
    columnPosition = columnBufferSet.replaceFurthestValuePosition(
      startRange,
      endRange - 1, // replaceFurthestValuePosition uses closed interval from startRange to endRange
      columnIdy
    );
  }

  if (columnPosition === null) {
    columnPosition = columnBufferSet.getNewPositionForValue(columnIdy);
  }

  return columnPosition;
}
