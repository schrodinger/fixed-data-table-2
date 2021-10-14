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
import { getColWidth } from './updateColWidth';

/**
 * Get the anchor for scrolling.
 * This will either be the first col's index and an offset, or the last col's index.
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
export function getColumnAnchor(state, newProps, oldProps) {
  if (
    newProps.scrollToColumn !== undefined &&
    newProps.scrollToColumn !== null &&
    (!oldProps || newProps.scrollToColumn !== oldProps.scrollToColumn)
  ) {
    return scrollToColX(state, newProps.scrollToColumn);
  }

  if (
    newProps.scrollLeft !== undefined &&
    newProps.scrollLeft !== null &&
    (!oldProps || newProps.scrollLeft !== oldProps.scrollLeft)
  ) {
    return scrollToX(state, newProps.scrollLeft);
  }

  return {
    firstIndex: state.firstColumnIndex,
    firstOffset: state.firstColumnOffset,
    lastIndex: undefined,
    changed: false,
  };
}

/**
 * Scroll to a specific position in the grid
 *
 * @param {!Object} state
 * @param {number} scrollX
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
export function scrollToX(state, scrollX) {
  const { availableWidth } = scrollbarsVisibleSelector(state);
  const { colOffsetIntervalTree, columnSettings, scrollContentWidth } = state;
  const { scrollableColumnsCount } = columnSettings;

  if (scrollableColumnsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstColumnIndex !== 0 || state.firstColumnOffset !== 0,
    };
  }

  let firstIndex = 0;
  let firstOffset = 0;
  let lastIndex = undefined;
  if (scrollX <= 0) {
    // Use defaults (from above) to scroll to first col
  } else if (scrollX >= scrollContentWidth - availableWidth) {
    // Scroll to the last col
    firstIndex = undefined;
    lastIndex = scrollableColumnsCount - 1;
  } else {
    // Mark the col which will appear first in the viewport
    // We use this as our "marker" when scrolling even if updating colOffsets
    // leads to it not being different from the scrollX specified
    const newColIdx = colOffsetIntervalTree.greatestLowerBound(scrollX);
    firstIndex = clamp(newColIdx, 0, Math.max(scrollableColumnsCount - 1, 0));

    // Record how far into the first col we should scroll
    // firstOffset is a negative value representing how much larger scrollX is
    // than the scroll position of the first col in the viewport
    const firstColPosition = colOffsetIntervalTree.sumUntil(firstIndex);
    firstOffset = firstColPosition - scrollX;
  }

  return {
    firstIndex,
    firstOffset,
    lastIndex,
    // NOTE (jordan) This changed heuristic may give false positives,
    // but that's fine since it's used as a filter to computeRenderedCols
    changed: true,
  };
}

/**
 * Scroll a specified col into the viewport
 * If the col is before the viewport, it will become the first col in the viewport
 * If the col is after the viewport, it will become the last col in the viewport
 * If the col is in the viewport, do nothing
 *
 * @param {!Object} state
 * @param {number} colIndex
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 * @private
 */
function scrollToColX(state, colIndex) {
  const { availableWidth } = scrollbarsVisibleSelector(state);
  const {
    colOffsetIntervalTree,
    columnSettings,
    storedWidths,
    scrollX,
  } = state;
  const { scrollableColumnsCount } = columnSettings;

  if (scrollableColumnsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstColumnIndex !== 0 || state.firstColumnOffset !== 0,
    };
  }

  colIndex = clamp(colIndex, 0, Math.max(scrollableColumnsCount - 1, 0));
  getColWidth(state, colIndex);
  let colBegin = colOffsetIntervalTree.sumUntil(colIndex);
  let colEnd = colBegin + storedWidths.array[colIndex];

  let firstIndex = colIndex;
  let lastIndex = undefined;
  if (colBegin < scrollX) {
    // If before the viewport, set as the first col in the viewport
    // Uses defaults (from above)
  } else if (scrollX + availableWidth < colEnd) {
    // If after the viewport, set as the last col in the viewport
    firstIndex = undefined;
    lastIndex = colIndex;
  } else {
    // If already in the viewport, do nothing.
    return {
      firstIndex: state.firstColumnIndex,
      firstOffset: state.firstColumnOffset,
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
