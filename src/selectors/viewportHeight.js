/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule viewportHeight
 */
import { createSelector } from 'reselect';

/**
 * TODO (jordan) Handle horizontalScrollbarVisible
 *
 * @return {number} The height of the viewport for displaying rows.
 */
export default createSelector([
  state => state.footerHeight,
  state => state.groupHeaderHeight,
  state => state.headerHeight,
  state => state.height,
  state => state.maxHeight,
], (footerHeight, groupHeaderHeight, headerHeight, height, maxHeight) => {
  const componentHeight = (height === undefined ? maxHeight : height);
  return componentHeight - headerHeight - footerHeight - groupHeaderHeight;
})
