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
import { computeVirtualizedElements, addElementToBuffer } from 'virtualizationHelper';
import { updateColumnWidth, updateColumnGroupWidth } from 'updateColumnWidth';

export default function computeRenderedColumns(state, columnAnchor) {
  // clone state
  const newState = Object.assign({}, state);
  
  // get buffer and viewport range
  const columnRange = calculateRenderedColumnRange(newState, columnAnchor);
  
  // update the offsets and buffer mapping
  computeRenderedColumnOffsets(newState, columnRange, newState.scrolling);

  // scrollX might have changed due to change in columns and offsets
  let scrollX = state.scrollX;
  if (columnRange.firstViewportCol !== columnRange.endViewportCol) {
    scrollX = newState.columnOffsets[columnRange.firstViewportCol] - newState.firstColumnOffset;
  }
  const { maxScrollX } = columnWidths(state);
  newState.maxScrollX = maxScrollX;
  newState.scrollX = clamp(scrollX, 0, maxScrollX);

  // for column groups, update buffer and viewport range, buffer mapping, and offsets
  calculateRenderedColumnGroups(newState, columnAnchor, columnRange);

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
 *   endBufferCol: number,
 *   endViewportCol: number,
 *   firstBufferCol: number,
 *   firstViewportCol: number,
 * }}
 * @private
 */
function calculateRenderedColumnRange(state, columnAnchor) {
  const bufferColumnCount = 0; // TODO (pradeep): calculate this similar to bufferRowCount
  const { availableScrollWidth, scrollableColumns } = columnWidths(state);
  const columnCount = scrollableColumns.length;

  if (availableScrollWidth === 0 || columnCount === 0) {
    return {
      endBufferCol: 0,
      endViewportCol: 0,
      firstBufferCol: 0,
      firstViewportCol: 0,
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
  let startIdx = firstIndex;
  let totalWidth = firstOffset;
  if (lastIndex !== undefined) {
    step = -1;
    startIdx = lastIndex;
    totalWidth = 0;
  }

  // Loop to walk the viewport until we've touched enough columns to fill its width
  let columnIdx = startIdx;
  let endIdx = columnIdx;
  while (columnIdx < columnCount && columnIdx >= 0 &&
      totalWidth < availableScrollWidth) {
    totalWidth += updateColumnWidth(state, columnIdx);
    endIdx = columnIdx;
    columnIdx += step;
  }

  // Loop to walk the leading buffer
  let firstViewportCol = Math.min(startIdx, endIdx);
  const firstBufferCol = Math.max(firstViewportCol - bufferColumnCount, 0);
  for (columnIdx = firstBufferCol; columnIdx < firstViewportCol; columnIdx++) {
    updateColumnWidth(state, columnIdx);
  }

  // Loop to walk the trailing buffer
  const endViewportCol = Math.max(startIdx, endIdx) + 1;
  const endBufferCol = Math.min(endViewportCol + bufferColumnCount, columnCount);
  for (columnIdx = endViewportCol; columnIdx < endBufferCol; columnIdx++) {
    updateColumnWidth(state, columnIdx);
  }

  // Calculate offset needed to position column at the end of viewport
  // This should be negative and represent how far the first column needs to be offscreen
  if (lastIndex !== undefined) {
    firstOffset = Math.min(availableScrollWidth - totalWidth, 0);
  }

  state.firstColumnIndex = firstViewportCol;
  state.endColumnIndex = endViewportCol;
  state.firstColumnOffset = firstOffset;

  return {
    endBufferCol,
    endViewportCol,
    firstBufferCol,
    firstViewportCol,
  };
}

/**
 * Determine the range amd offsets of column groups to be rendered (buffer and viewport)
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
 * @param {{
 *   endBufferCol: number,
 *   endViewportCol: number,
 *   firstBufferCol: number,
 *   firstViewportCol: number,
 * }} columnRange
 * @private
 */
function calculateRenderedColumnGroups(state, columnAnchor, columnRange) {
  const bufferColumnCount = 0; // TODO (pradeep): calculate this similar to bufferRowCount
  const { columnGroupBufferSet, columnOffsetIntervalTree } = state;

  const { availableScrollWidth, scrollableColumns, scrollableColumnGroups } = columnWidths(state);
  const columnCount = scrollableColumns.length;
  const columnGroupCount = scrollableColumnGroups.length;

  if (columnCount === 0 || columnGroupCount === 0) {
    state.firstColumnGroupIndex = 0;
    state.endColumnGroupIndex = 0;
    state.columnGroupsToRender = [];
    state.columnGroupOffsets = {};
    return;
  }

  // get first and last scrollable columns in the view port
  const startScrollableColumn = scrollableColumns[Math.max(0, columnRange.firstViewportCol)];
  const endScrollableColumn = scrollableColumns[Math.max(0, columnRange.endViewportCol - 1)];

  // now get the first and last scrollable group column's index in the view port
  const startIdx = startScrollableColumn.parentIdx;
  const endIdx = endScrollableColumn.parentIdx + 1;

  // output for this function
  const columns = []; // state.columnsToRender
  const columnOffsets = {}; // state.columnOffsets

  // update offsets for the columns
  let totalWidth = columnAnchor.firstOffset;
  for (let currentIdx = startIdx; currentIdx < endIdx; currentIdx++) {
    totalWidth += scrollableColumnGroups[currentIdx].width;

    // no need to calculate if viewport has been filled
    if (totalWidth >= availableScrollWidth) {
      break;
    }
  }

  const renderedColumnsCount = endIdx - startIdx + 2 * bufferColumnCount;

  // incremental way for calculating columnOffset
  let runningOffset = columnOffsetIntervalTree.sumUntil(scrollableColumnGroups[startIdx].firstChildIdx);

  // compute column index and offsets for every columns inside the viewport
  for (let columnIdx = startIdx; columnIdx < endIdx; columnIdx++) {
    // Update the offset for rendering the column
    columnOffsets[columnIdx] = runningOffset;
    runningOffset += scrollableColumnGroups[columnIdx].width;

    // Get position for the viewport column
    const columnPosition = addElementToBuffer(columnIdx, columnGroupBufferSet, startIdx, endIdx, renderedColumnsCount);
    columns[columnPosition] = columnIdx;
  }

  state.firstColumnGroupIndex = startIdx;
  state.endColumnGroupIndex = endIdx;
  state.columnGroupsToRender = columns;
  state.columnGroupOffsets = columnOffsets;
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
 *   endBufferCol: number,
 *   endViewportCol: number,
 *   firstBufferCol: number,
 *   firstViewportCol: number,
 * }} columnRange
 * @param {boolean} viewportOnly
 * @private
 */
function computeRenderedColumnOffsets(state, columnRange, viewportOnly) {
  const { columnBufferSet, columnOffsetIntervalTree } = state;
  const {
    endBufferCol,
    endViewportCol,
    firstBufferCol,
    firstViewportCol,
  } = columnRange;

  const renderedColumnsCount = endBufferCol - firstBufferCol;
  if (renderedColumnsCount === 0) {
    state.columnOffsets = {};
    state.columnsToRender = [];
    return;
  }

  const startIdx = viewportOnly ? firstViewportCol : firstBufferCol;
  const endIdx = viewportOnly ? endViewportCol : endBufferCol;

  const { elements, elementOffsets } = computeVirtualizedElements(
    columnBufferSet,
    columnOffsetIntervalTree,
    startIdx,
    endIdx,
    renderedColumnsCount
  );

  // now we modify the state with the newly calculated columns and offsets
  state.columnsToRender = elements;
  state.columnOffsets = elementOffsets;
}
