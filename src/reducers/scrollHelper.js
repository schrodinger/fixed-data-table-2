/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollHelper
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
function _caculateViewportHeight(props) {
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
function _updateRowsWithBuffer(state) {
  let { bufferRowsCount, viewportRowsBegin, viewportRowsEnd, rowsCount } = state;
  let remainingBufferRows = 2 * bufferRowsCount;
  let bufferRowIndex = Math.max(viewportRowsBegin - bufferRowsCount, 0);
  while (bufferRowIndex < viewportRowsBegin) {
    _addRowToBuffer(
      state,
      bufferRowIndex,
      viewportRowsBegin,
      viewportRowsEnd - 1
    );
    bufferRowIndex++;
    remainingBufferRows--;
  }
  bufferRowIndex = viewportRowsEnd;
  while (bufferRowIndex < rowsCount && remainingBufferRows > 0) {
    _addRowToBuffer(
      state,
      bufferRowIndex,
      viewportRowsBegin,
      viewportRowsEnd - 1
    );
    bufferRowIndex++;
    remainingBufferRows--;
  }
}

/**
 * @param {!Object} state
 * @private
 */
function _updateRows(state) {
  let { firstRowIndex, firstRowOffset, maxVisibleRowCount, rowsCount, viewportHeight, rowHeightGetter } = state;

  let top = firstRowOffset;
  let totalHeight = top;
  let rowIndex = firstRowIndex;
  let endIndex = Math.min(firstRowIndex + maxVisibleRowCount, rowsCount);

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
}

/**
 * Creates new state object when rowHeight or rowCount changes
 *
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 */
function initailize(state, props) {
  var viewportHeight = _caculateViewportHeight(props);
  let { rowsCount, rowHeight, rowHeightGetter } = props;
  let maxVisibleRowCount = Math.ceil(viewportHeight / rowHeight) + 1;
  let bufferRowsCount = clamp(
    Math.floor(maxVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );

  let storedHeights = new Array(rowsCount);
  for (var i = 0; i < rowsCount; i++) {
    storedHeights[i] = rowHeight;
  }

  state = Object.assign({}, state, {
    rowHeight,
    rowsCount,
    storedHeights,
    viewportHeight,
    rowHeightGetter: rowHeightGetter ?  rowHeightGetter : () => rowHeight,
    rowOffsets: PrefixIntervalTree.uniform(rowsCount, rowHeight),
    scrollContentHeight: rowsCount * rowHeight,
    maxVisibleRowCount,
    bufferRowsCount,
    bufferSet: new IntegerBufferSet(),
    viewportRowsBegin: 0,
    viewportRowsEnd: 0,
    rows: [],
    rowHeights: {}
  });

  _updateRows(state);
  _recalculateRowHeights(state);

  return state;
}

/**
 * Updates row heights for rows above current view port
 *
 * @param {!Object} state
 * @param {number} firstRowIndex
 */
function scrollBy(state, deltaY) {
  if (state.rowsCount === 0) {
    return Object.assign({}, state, NO_ROWS_SCROLL_RESULT);
  }

  let { rowOffsets, scrollY, rowsCount, storedHeights, scrollContentHeight, viewportHeight } = state;
  let firstRow = rowOffsets.greatestLowerBound(scrollY);
  firstRow = clamp(firstRow, 0, Math.max(rowsCount - 1, 0));
  let firstRowPosition = state.rowOffsets.sumUntil(firstRow);
  let rowIndex = firstRow;

  let rowHeightChange = _updateRowHeight(state, rowIndex);
  if (firstRowPosition !== 0) {
    scrollY += rowHeightChange;
  }

  let visibleRowHeight = storedHeights[rowIndex] - (scrollY - firstRowPosition);

  if (deltaY >= 0) {
    while (deltaY > 0 && rowIndex < rowsCount) {
      if (deltaY < visibleRowHeight) {
        scrollY += deltaY;
        deltaY = 0;
      } else {
        deltaY -= visibleRowHeight;
        scrollY += visibleRowHeight;
        rowIndex++;
      }
      if (rowIndex < rowsCount) {
        _updateRowHeight(state, rowIndex);
        visibleRowHeight = storedHeights[rowIndex];
      }
    }
  } else if (deltaY < 0) {
    deltaY = -deltaY;
    let invisibleRowHeight = storedHeights[rowIndex] - visibleRowHeight;

    while (deltaY > 0 && rowIndex >= 0) {
      if (deltaY < invisibleRowHeight) {
        scrollY -= deltaY;
        deltaY = 0;
      } else {
        scrollY -= invisibleRowHeight;
        deltaY -= invisibleRowHeight;
        rowIndex--;
      }
      if (rowIndex >= 0) {
        let change = _updateRowHeight(state, rowIndex);
        invisibleRowHeight = storedHeights[rowIndex];
        scrollY += change;
      }
    }
  }

  let maxPosition = scrollContentHeight - viewportHeight;
  scrollY = clamp(scrollY, 0, maxPosition);
  let firstRowIndex = rowOffsets.greatestLowerBound(scrollY);
  firstRowIndex = clamp(firstRowIndex, 0, Math.max(rowsCount - 1, 0));
  firstRowPosition = rowOffsets.sumUntil(firstRowIndex);
  let firstRowOffset = firstRowPosition - scrollY;

  updateHeightsInViewport(state, firstRowIndex, firstRowOffset);
  _updateHeightsAboveViewport(firstRowIndex);

  //TODO (asif) Uncomment this line when bodyHeight is included in state
  //let maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);

  _updateRows(state);
  _recalculateRowHeights(state);


  return Object.assign({}, state, {
    scrollY,
    firstRowIndex,
    firstRowOffset,
    scrollContentHeight,
    //maxScrollY,
  });
}

/**
 * Updates rowHeights for visible rows
 *
 * @param {!Object} state
 * @param {number} firstRowIndex
 * @param {number} firstRowOffset
 */
function updateHeightsInViewport(state, firstRowIndex, firstRowOffset) {
  let { rowsCount, viewportHeight, storedHeights } = state;
  var top = firstRowOffset;
  var index = firstRowIndex;
  while (top <= viewportHeight && index < rowsCount) {
    _updateRowHeight(state, index);
    top += storedHeights[index];
    index++;
  }
}

/**
 * @param {!Object} state
 * @return {!Object}
 */
function scrollEnd(state) {
  _updateRowsWithBuffer(state);
  return Object.assign({}, state, {
    scrolling: false
  });
};

/**
 * @param {!Object} state
 * @return {!Object}
 */
function scrollStart(state) {
  return Object.assign({}, state, {
    scrolling: true
  });
};

/**
 * @param {!Object} state
 * @return {!Object}
 */
function scrollTo(state, scrollPosition) {
  let { scrollContentHeight, rowsCount, scrollY, viewportHeight, rowOffsets } = state;

  if (rowsCount === 0) {
    return Object.assign({}, state, NO_ROWS_SCROLL_RESULT);
  }

  if (scrollPosition <= 0) {
    // If scrollPosition less than or equal to 0 first row should be fully visible
    // on top
    scrollY = 0;
    _updateHeightsInViewport(0, 0);

    return Object.assign({}, state, {
      firstRowIndex: 0,
      firstRowOffset: 0,
      scrollY: scrollY,
      scrollContentHeight: scrollContentHeight,
    });
  } else if (scrollPosition >= scrollContentHeight - viewportHeight) {
    // If scrollPosition is equal to or greater than max scroll value, we need
    // to make sure to have bottom border of last row visible.
    var rowIndex = rowsCount - 1;
    scrollPosition = _getRowAtEndPosition(state, rowIndex);
  }
  scrollY = scrollPosition;

  var firstRowIndex = rowOffsets.greatestLowerBound(scrollPosition);
  firstRowIndex = clamp(firstRowIndex, 0, Math.max(rowsCount - 1, 0));
  var firstRowPosition = rowOffsets.sumUntil(firstRowIndex);
  var firstRowOffset = firstRowPosition - scrollPosition;

  _updateHeightsInViewport(firstRowIndex, firstRowOffset);
  _updateHeightsAboveViewport(firstRowIndex);

  _updateRows(state);
  _recalculateRowHeights(state);

  return Object.assign({}, state, {
    firstRowIndex: firstRowIndex,
    firstRowOffset: firstRowOffset,
    scrollY: scrollY,
    scrollContentHeight: scrollContentHeight,
  });
};

module.exports = {
  initailize,
  updateHeightsInViewport,
  scrollBy,
  scrollEnd,
  scrollStart,
  scrollTo,
}
