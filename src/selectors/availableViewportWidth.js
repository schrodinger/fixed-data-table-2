/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule availableViewportWidth
 */
import Scrollbar from 'Scrollbar';
import { createSelector } from 'reselect';

/**
 * @param {{
 *   width: number,
 * }} state
 * @return {number} The width available for rendering cells.
 */
export default createSelector([
  state => state.width,
], width => {
  return width - Scrollbar.SIZE - Scrollbar.OFFSET;
});
