/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule bufferRowsCount
 */
import maxVisibleRowCount from 'maxVisibleRowCount';
import clamp from 'clamp';
import { createSelector } from 'reselect';

const MIN_BUFFER_ROWS = 3;
const MAX_BUFFER_ROWS = 6;

/**
 * @return {number} The number of rows to buffer both ahead and behind the viewport.
 *   In total we will buffer twice this number of rows (half ahead, and half behind).
 */
export default createSelector([
  state => state.bufferRowCount
  maxVisibleRowCount,
], (bufferRowCount, maxVisibleRowCount) => {
  if (bufferRowCount !== null) {
    return bufferRowCount;
  }

  return clamp(
    Math.floor(maxVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );
});
