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
import Scrollbar from 'Scrollbar';
import { createSelector } from 'reselect';
import minColWidth from 'minColWidth';

export const ScrollbarState = {
  HIDDEN: 'hidden',
  IF_VERTICAL_VISIBLE: 'if_vertical_visible',
  VISIBLE: 'visible',
};

/**
 * @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       width: number,
 *     },
 *   }>},
 *   overflowX: string,
 *   showScrollbarX: boolean,
 *   width: number,
 * }} state
 * @return {string} ScrollbarState representing the visibility of the horizontal scrollbar
 */
export default createSelector([
  state => state.overflowX,
  state => state.showScrollbarX,
  minColWidth,
  state => state.width,
], (overflowX, showScrollbarX, minColWidth, width) => {
  if (overflowX === 'hidden' || showScrollbarX === false) {
    return ScrollbarState.HIDDEN;
  } else if (minColWidth > width) {
    return ScrollbarState.VISIBLE;
  }

  const scrollbarSpace = Scrollbar.SIZE + Scrollbar.OFFSET;
  if (minColWidth > width - scrollbarSpace) {
    return ScrollbarState.IF_VERTICAL_VISIBLE;
  }
  return ScrollbarState.HIDDEN;
});
