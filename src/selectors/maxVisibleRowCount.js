/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule maxVisibleRowCount
 */
import { createSelector } from 'reselect';
import verticalHeights from 'verticalHeights';

/**
 * @return {number} The maximum number of expected visible rows.
 *   Note this might be inaccurate if the default rowHeight is inaccurate,
 *   particularly if it's an overestimate.
 */
export default createSelector([
  state => state.rowHeight,
  state => state.subRowHeight,
  verticalHeights,
], (rowHeight, subRowHeight, verticalHeights) => {
  const defaultFullRowHeight = rowHeight + subRowHeight;
  return Math.ceil(verticalHeights.availableHeight / defaultFullRowHeight) + 1;
});
