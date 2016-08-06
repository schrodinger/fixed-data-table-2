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

import PrefixIntervalTree from 'PrefixIntervalTree';
import clamp from 'clamp';

const BUFFER_ROWS = 5;
const NO_ROWS_SCROLL_RESULT = {
  rowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

function updateRowHeight(state, rowIndex) {
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

function updateHeightsInViewport(state, firstRowIndex, firstRowOffset) {
  var top = firstRowOffset;
  var index = firstRowIndex;
  while (top <= state.viewportHeight && index < state.rowsCount) {
    updateRowHeight(index);
    top += state.storedHeights[index];
    index++;
  }
}

function updateHeightsAboveViewport(state, firstRowIndex) {
  var index = firstRowIndex - 1;
  while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
    var delta = updateRowHeight(index);
    state.scrollY += delta;
    index--;
  }
}

function scrollBy(state, deltaY) {
  if (state.rowsCount === 0) {
    return Object.assign({}, state, NO_ROWS_SCROLL_RESULT);
  }

  let { rowOffsets, scrollY, rowsCount, storedHeights, scrollContentHeight, viewportHeight } = state;
  let firstRow = rowOffsets.greatestLowerBound(scrollY);
  firstRow = clamp(firstRow, 0, Math.max(rowsCount - 1, 0));
  let firstRowPosition = state.rowOffsets.sumUntil(firstRow);
  let rowIndex = firstRow;

  let rowHeightChange = updateRowHeight(state, rowIndex);
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
        updateRowHeight(state, rowIndex);
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
        let change = updateRowHeight(state, rowIndex);
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
  updateHeightsAboveViewport(firstRowIndex);

  //let maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);

  return Object.assign({}, state, {
    scrollY,
    firstRowIndex,
    firstRowOffset,
    scrollContentHeight,
    //maxScrollY,
  });
}

module.exports = {
  updateHeightsInViewport,
  scrollBy,
};
