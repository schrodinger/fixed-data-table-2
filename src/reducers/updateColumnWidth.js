/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule updateColumnWidth
 */

'use strict';

import columnWidths from 'columnWidths';

/**
 * Update our cached col width for a specific index
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {number} columnIdx
 * @return {number} The new col width
 */
function updateColumnWidth(state, columnIdx) {
  const { scrollableColumns } = columnWidths(state);
  const { columnOffsetIntervalTree } = state;
  const newWidth = scrollableColumns[columnIdx].width;
  const oldWidth = columnOffsetIntervalTree.get(columnIdx);
  if (newWidth !== oldWidth) {
    columnOffsetIntervalTree.set(columnIdx, newWidth);
    state.scrollContentWidth += newWidth - oldWidth;
  }

  return newWidth;
}

export { updateColumnWidth };