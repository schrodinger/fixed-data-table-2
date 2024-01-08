/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollAnchor
 */

'use strict';

import clamp from '../vendor_upstream/core/clamp';

import scrollbarsVisibleSelector from '../selectors/scrollbarsVisible';
import updateRowHeight from './updateRowHeight';

/**
 * Get the anchor for scrolling.
 * This will either be the first row's index and an offset, or the last row's index.
 * We also pass a flag indicating if the anchor has changed from the state
 *
 * @param {!Object} state
 * @param {!Object} newProps
 * @param {!Object} [oldProps]
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
export function getScrollAnchor(state, newProps, oldProps) {
  if (
    newProps.scrollToRow !== undefined &&
    newProps.scrollToRow !== null &&
    (!oldProps || newProps.scrollToRow !== oldProps.scrollToRow)
  ) {
    return scrollToRow(state, newProps.scrollToRow);
  }

  if (
    newProps.scrollTop !== undefined &&
    newProps.scrollTop !== null &&
    (!oldProps || newProps.scrollTop !== oldProps.scrollTop)
  ) {
    return scrollTo(state, newProps.scrollTop);
  }

  return {
    firstIndex: state.firstRowIndex,
    firstOffset: state.firstRowOffset,
    lastIndex: undefined,
    changed: false,
  };
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
export function scrollTo(state, scrollY) {
  const { availableHeight } = scrollbarsVisibleSelector(state);
  const { rowSettings, scrollContentHeight } = state;
  const { rowOffsetIntervalTree } = state.getInternal();
  const { rowsCount } = rowSettings;

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
    // We use this as our "marker" when scrolling even if updating rowOffsets
    // leads to it not being different from the scrollY specified
    const newRowIdx = rowOffsetIntervalTree.greatestLowerBound(scrollY);
    firstIndex = clamp(newRowIdx, 0, Math.max(rowsCount - 1, 0));

    // Record how far into the first row we should scroll
    // firstOffset is a negative value representing how much larger scrollY is
    // than the scroll position of the first row in the viewport
    const firstRowPosition = rowOffsetIntervalTree.sumUntil(firstIndex);
    firstOffset = firstRowPosition - scrollY;
  }

  return {
    firstIndex,
    firstOffset,
    lastIndex,
    // NOTE (jordan) This changed heuristic may give false positives,
    // but that's fine since it's used as a filter to computeRenderedRows
    changed: true,
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
 * @private
 */
function scrollToRow(state, rowIndex) {
  const { availableHeight } = scrollbarsVisibleSelector(state);
  const { rowSettings, scrollY } = state;
  const { rowOffsetIntervalTree, storedHeights } = state.getInternal();
  const { rowsCount } = rowSettings;

  if (rowsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0,
    };
  }

  rowIndex = clamp(rowIndex, 0, Math.max(rowsCount - 1, 0));
  updateRowHeight(state, rowIndex);
  let rowBegin = rowOffsetIntervalTree.sumUntil(rowIndex);
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
