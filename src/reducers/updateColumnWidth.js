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
 * @param {number} columnIdy
 * @return {number} The new col width
 */
export default function updateColumnWidth(state, columnIdy) {
  const { scrollableColumns } = columnWidths(state);
  const { columnOffsetIntervalTree } = state;
  const newWidth = scrollableColumns[columnIdy].width;
  const oldWidth = columnOffsetIntervalTree.get(columnIdy);
  if (newWidth !== oldWidth) {
    columnOffsetIntervalTree.set(columnIdy, newWidth);
  }

  return newWidth;
}
