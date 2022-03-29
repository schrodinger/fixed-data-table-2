/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule updateRowHeight
 */

'use strict';

/**
 * Update our cached row height for a specific index
 * based on the value from rowHeightGetter
 *
 * @param {!Object} state
 * @param {number} rowIdx
 * @return {number} The new row height
 */
export default function updateRowHeight(state, rowIdx) {
  const { storedHeights, rowOffsetIntervalTree, rowSettings } = state;
  const { rowHeightGetter, subRowHeightGetter } = rowSettings;

  const newHeight = rowHeightGetter(rowIdx) + subRowHeightGetter(rowIdx);
  const oldHeight = storedHeights.array[rowIdx];
  if (newHeight !== oldHeight) {
    rowOffsetIntervalTree.set(rowIdx, newHeight);
    storedHeights.array[rowIdx] = newHeight;
    state.scrollContentHeight += newHeight - oldHeight;
  }

  return storedHeights.array[rowIdx];
}
