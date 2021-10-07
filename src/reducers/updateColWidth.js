/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule updateColWidth
 */

'use strict';

/**
 * Update our cached col width for a specific index
 * based on the value from colWidthGetter
 *
 * @param {!Object} state
 * @param {number} colIdx
 * @return {number} The new col width
 */
export default function updateColWidth(state, colIdx) {
  const oldWidth = state.storedWidths[colIdx];
  const newWidth = state.scrollableColumns.cell[colIdx].props.width;
  if (newWidth !== oldWidth) {
    state.colOffsetIntervalTree.set(colIdx, newWidth);
    state.storedWidths[colIdx] = newWidth;
    state.scrollContentWidth += newWidth - oldWidth;
  }
  return state.storedWidths[colIdx];
}
