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

import IntegerBufferSet from 'IntegerBufferSet';
import PrefixIntervalTree from 'PrefixIntervalTree';
import clamp from 'clamp';

const MIN_BUFFER_ROWS = 3;
const MAX_BUFFER_ROWS = 6;
const BUFFER_ROWS = 5;
const NO_ROWS_SCROLL_RESULT = {
  rowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

/**
 * Modifies state with updated scrollHeights and returns total height change
 *
 * @param {!Object} state
 * @param {number} rowIndex
 * @return {number}
 * @private
 */
function _updateRowHeight(state, rowIndex) {
  if (rowIndex < 0 || rowIndex >= state.rowsCount) {
    return 0;
  }
  var newHeight = state.rowHeightGetter(rowIndex);
  if (newHeight !== state.storedHeights[rowIndex]) {
    var change = newHeight - state.storedHeights[rowIndex];
    state.rowOffsets.set(rowIndex, newHeight);
    state.storedHeights[rowIndex] = newHeight;
    state.scrollContentHeight += change;
    return change;
  }
  return 0;
}

/**
 * @param {!Object} state
 * @param {number} firstRowIndex
 * @param {number} firstRowOffset
 * @private
 */
function _updateHeightsInViewport(state, firstRowIndex, firstRowOffset) {
  let { rowsCount, storedHeights, viewportHeight } = state;

  // NOTE (jordan) firstRowOffset is a negative value representing how much of the first row is off screen
  var top = firstRowOffset;
  var index = firstRowIndex;
  while (top <= viewportHeight && index < rowsCount) {
    _updateRowHeight(state, index);
    top += storedHeights[index];
    index++;
  }
}

/**
 * Updates row heights for rows above current view port
 *
 * @param {!Object} state
 * @param {number} firstRowIndex
 * @private
 */
function _updateHeightsAboveViewport(state, firstRowIndex) {
  var index = firstRowIndex - 1;
  while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
    var delta = _updateRowHeight(state, index);
    state.scrollY += delta;
    index--;
  }
}

/**
 * @param {!Object} props
 * @return {number}
 * @private
 */
function _calculateViewportHeight(props) {
  return (props.height === undefined ? props.maxHeight : props.height) -
    (props.headerHeight || 0) -
    (props.footerHeight || 0) -
    (props.groupHeaderHeight || 0);
};

/**
 * @param {!Object} state
 * @param {number}
 * @return {number}
 * @private
 */
function _getRowAtEndPosition(state, rowIndex) {
  let { storedHeights, viewportHeight, rowOffsets } = state;
  // We need to update enough rows above the selected one to be sure that when
  // we scroll to selected position all rows between first shown and selected
  // one have most recent heights computed and will not resize
  // NOTE (jordan) We don't need to update leading buffered rows here because
  // _updateHeightsAboveViewport updates scrollY accordingly
  _updateRowHeight(state, rowIndex);
  var currentRowIndex = rowIndex;
  var top = storedHeights[currentRowIndex];
  while (top < viewportHeight && currentRowIndex >= 0) {
    currentRowIndex--;
    if (currentRowIndex >= 0) {
      _updateRowHeight(state, currentRowIndex);
      top += storedHeights[currentRowIndex];
    }
  }
  var position = rowOffsets.sumTo(rowIndex) - viewportHeight;
  if (position < 0) {
    position = 0;
  }
  return position;
};

/**
 * @param {!Object} stte
 * @param {number} rowIndex
 * @param {number} firstViewportRowIndex
 * @param {number} lastViewportRowIndex
 */
function _addRowToBuffer(state, rowIndex, firstViewportRowIndex, lastViewportRowIndex) {
  let { bufferSet, bufferRowsCount, rows } = state;
  var rowPosition = bufferSet.getValuePosition(rowIndex);
  var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
  var allowedRowsCount = viewportRowsCount + bufferRowsCount * 2;

  if (rowPosition === null && bufferSet.getSize() >= allowedRowsCount) {
    rowPosition = bufferSet.replaceFurthestValuePosition(
      firstViewportRowIndex,
      lastViewportRowIndex,
      rowIndex
    );
  }

  if (rowPosition === null) {
    // We can't reuse any of existing positions for this row. We have to
    // create new position
    rowPosition = bufferSet.getNewPositionForValue(rowIndex);
    rows[rowPosition] = rowIndex;
  } else {
    // This row already is in the table with rowPosition position or it
    // can replace row that is in that position
    rows[rowPosition] = rowIndex;
  }
};

/**
 * @param {!Object} state
 * @private
 */
function _updateRows(state) {
  let {
    firstRowIndex,
    firstRowOffset,
    maxVisibleRowCount,
    rowsCount,
    viewportHeight,
    rowHeightGetter,
    bufferRowsCount
  } = state;

  let totalHeight = firstRowOffset;
  //let rowIndex = firstRowIndex;
  let rowIndex = Math.max(firstRowIndex - bufferRowsCount, 0);
  let endIndex = Math.min(firstRowIndex + maxVisibleRowCount + bufferRowsCount, rowsCount);

  state.viewportRowsBegin = firstRowIndex;
  while (rowIndex < endIndex || (totalHeight < viewportHeight && rowIndex < rowsCount)) {
    _addRowToBuffer(
      state,
      rowIndex,
      firstRowIndex,
      endIndex - 1
    );
    totalHeight += rowHeightGetter(rowIndex);
    ++rowIndex;
    // Store index after the last viewport row as end, to be able to
    // distinguish when there are no rows rendered in viewport
    state.viewportRowsEnd = rowIndex;
  }

  return state;
};

/**
 * @param {!Object} state
 * @private
 */
function _recalculateRowHeights(state) {
  let { rows, rowHeights, rowOffsets } = state;
  state.rowHeights = {};

  //Sort the rows, we slice first to avoid changing original
  let sortedRowsToRender = rows.slice().sort((a, b) => a - b);
  sortedRowsToRender.forEach((rowIndex) => {
    _updateRowHeight(state, rowIndex);
    state.rowHeights[rowIndex] = rowOffsets.sumUntil(rowIndex);
  });

  return state;
}

/**
 * @param {!Object} state
 * @param {number} rowHeights
 * @param {function(number) : number=} rowHeightGetter
 * @return {!Object}
 */
export function updateRowHeights(state, {
  rowHeight,
  rowHeightGetter = () => rowHeight
}) {

  state.rowHeight = rowHeight;
  state.rowHeightGetter = rowHeightGetter;
  state.rowOffsets = PrefixIntervalTree.uniform(state.rowsCount, rowHeight);
  state.scrollContentHeight = state.rowsCount * rowHeight;

  state.maxVisibleRowCount = Math.ceil(state.viewportHeight / rowHeight) + 1;
  state.bufferRowsCount = clamp(
    Math.floor(state.maxVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );

  state.storedHeights = new Array(state.rowsCount);
  for (var i = 0; i < state.rowsCount; i++) {
    state.storedHeights[i] = rowHeight;
  }

  return state;
}

/**
 * @param {!Object} state
 * @param {number} rowsCount
 * @return {!Object}
 */
export function updateRowCount(state, { rowsCount }) {
  state.rowsCount = rowsCount;
  state.scrollContentHeight = rowsCount * state.rowHeight;
  state.rowOffsets = PrefixIntervalTree.uniform(rowsCount, state.rowHeight);
  state.storedHeights = new Array(rowsCount);
  for (var i = 0; i < rowsCount; i++) {
    state.storedHeights[i] = state.rowHeight;
  }

  state.rows = [];
  state.bufferSet = new IntegerBufferSet();

  return state;
}

export function updateViewHeight(state, {
  height,
  maxHeight,
  headerHeight = 0,
  footerHeight = 0,
  groupHeaderHeight = 0
}) {
  state.viewportHeight = (height === undefined ? maxHeight : height) -
    headerHeight - footerHeight - groupHeaderHeight;
  state.maxVisibleRowCount = Math.ceil(state.viewportHeight / state.rowHeight) + 1;
  state.bufferRowsCount = clamp(Math.floor(state.maxVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );

  return state;
}

/**
 * @param {!Object} state
 * @param {number} scrollPosition
 * @return {!Object}
 */
export function scrollTo(state, scrollPosition) {
  let { scrollContentHeight, rowsCount, viewportHeight, rowOffsets } = state;

  if (rowsCount === 0) {
    return { ...state, ...NO_ROWS_SCROLL_RESULT };
  }

  if (scrollPosition <= 0) {
    // If scrollPosition less than or equal to 0 first row should be fully visible
    // on top
    scrollY = 0;
    _updateHeightsInViewport(state, 0, 0);

    return Object.assign({}, state, {
      firstRowIndex: 0,
      firstRowOffset: 0,
      scrollY: scrollY,
    });
  } else if (scrollPosition >= scrollContentHeight - viewportHeight) {
    // If scrollPosition is equal to or greater than max scroll value, we need
    // to make sure to have bottom border of last row visible.
    var rowIndex = rowsCount - 1;
    scrollPosition = _getRowAtEndPosition(state, rowIndex);
  }

  let firstRowIndex = rowOffsets.greatestLowerBound(scrollPosition);
  firstRowIndex = clamp(firstRowIndex, 0, Math.max(rowsCount - 1, 0));
  const firstRowPosition = rowOffsets.sumUntil(firstRowIndex);
  const firstRowOffset = firstRowPosition - scrollPosition;

  _updateHeightsInViewport(state, firstRowIndex, firstRowOffset);
  _updateHeightsAboveViewport(state, firstRowIndex);

  return Object.assign({}, state, {
    firstRowIndex,
    firstRowOffset,
    scrollY: scrollPosition,
  });
};

/**
 * @param {!Object} state
 * @param {number} rowIndex
 * @return {!Object}
 */
export function scrollToRow(state, rowIndex) {
  let {
    rowsCount,
    rowOffsets,
    storedHeights,
    scrollY,
    viewportHeight,
  } = state;

  rowIndex = clamp(rowIndex, 0, Math.max(rowsCount - 1, 0));
  var rowBegin = rowOffsets.sumUntil(rowIndex);
  var rowEnd = rowBegin + storedHeights[rowIndex];
  if (rowBegin < scrollY) {
    return scrollTo(state, rowBegin);
  } else if (scrollY + viewportHeight < rowEnd) {
    var position = _getRowAtEndPosition(state, rowIndex);
    return scrollTo(state, position);
  }
};

/**
 * @param {!Object} state
 * @return {!Object}
 */
export function scrollEnd(state) {
  return Object.assign({}, state, {
    scrolling: false
  });
};

/**
 * @param {!Object} state
 * @return {!Object}
 */
export function scrollStart(state) {
  return Object.assign({}, state, {
    scrolling: true
  });
};

/**
 * @param {!Object} state
 * @return {!Object}
 */
export function updateVisibleRows(state) {
  state = _updateRows(state);
  state = _recalculateRowHeights(state);
  return state;
}
