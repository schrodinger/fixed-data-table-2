/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule horizontalScrollbarVisible
 */
import { createSelector } from 'reselect';
import scrollContentWidth from 'scrollContentWidth';

/**
 * @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       flexGrow: number,
 *       width: number,
 *     },
 *   }>},
 *   overflowX: string,
 *   showScrollbarX: boolean,
 *   width: number,
 * }} state
 * @return {boolean} True if the horizontal scrollbar should be shown.
 */
export default createSelector([
  state => state.overflowX,
  state => state.showScrollbarX,
  scrollContentWidth,
  state => state.width,
], (overflowX, showScrollbarX, scrollContentWidth, width) => {
  const disableScrollbar = overflowX === 'hidden' || showScrollbarX === false;
  return scrollContentWidth > width && !disableScrollbar;
});
