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
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {number} rowIdx
 * @return {number} The new row height
 */
export default function updateRowHeight(state, rowIdx) {
  const { storedHeights, rowOffsets, rowSettings } = state;
  const { rowHeightGetter, subRowHeightGetter } = rowSettings;

  const newHeight = rowHeightGetter(rowIdx) + subRowHeightGetter(rowIdx);
  const oldHeight = storedHeights[rowIdx];
  if (newHeight !== oldHeight) {
    rowOffsets.set(rowIdx, newHeight);
    storedHeights[rowIdx] = newHeight;
    state.scrollContentHeight += newHeight - oldHeight;
  }

  return storedHeights[rowIdx];
}
