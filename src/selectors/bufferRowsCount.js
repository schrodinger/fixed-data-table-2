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
import clamp from 'clamp';
import { createSelector } from 'reselect';
import roughHeights from 'roughHeights';

const MIN_BUFFER_ROWS = 3;
const MAX_BUFFER_ROWS = 6;

/**
 * @param {{
 *   bufferRowCount: ?number,
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       width: number,
 *     },
 *   }>},
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 *   height: ?number,
 *   maxHeight: ?number,
 *   overflowX: string,
 *   rowHeight: number,
 *   showScrollbarX: boolean,
 *   subRowHeight: number,
 *   useGroupHeader: boolean,
 *   width: number,
 * }} state
 * @return {number} The number of rows to buffer both ahead and behind the viewport.
 *   In total we will buffer twice this number of rows (half ahead, and half behind).
 */
export default createSelector([
  state => state.bufferRowCount,
  state => state.rowHeight,
  state => state.subRowHeight,
  roughHeights,
], (bufferRowCount, rowHeight, subRowHeight, { maxAvailableHeight }) => {
  if (bufferRowCount !== null) {
    return bufferRowCount;
  }

  const fullRowHeight = rowHeight + subRowHeight;
  const avgVisibleRowCount = Math.ceil(maxAvailableHeight / fullRowHeight) + 1;
  return clamp(
    Math.floor(avgVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );
});
