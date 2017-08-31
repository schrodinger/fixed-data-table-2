/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule groupHeaderHeight
 */
import { createSelector } from 'reselect';

/**
 * @param {{
 *   groupHeaderHeight: number,
 *   useGroupHeader: boolean,
 * }} state
 * @return {number} The computed height of the group header
 */
export default createSelector([
  state => state.groupHeaderHeight,
  state => state.useGroupHeader,
], (groupHeaderHeight, useGroupHeader) => {
  return useGroupHeader ? groupHeaderHeight : 0;
});
