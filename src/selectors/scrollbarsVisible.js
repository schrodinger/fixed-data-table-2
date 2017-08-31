/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollbarsVisible
 */
import { createSelector } from 'reselect';
import horizontalScrollbarVisible, { ScrollbarState } from 'horizontalScrollbarVisible';
import roughHeights from 'roughHeights';

/**
 * @param {{
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
 *   overflowY: string,
 *   scrollContentHeight: number,
 *   showScrollbarX: boolean,
 *   showScrollbarY: boolean,
 *   useGroupHeader: boolean,
 *   width: number,
 * }} state
 * @return {
 *   availableHeight: number,
 *   scrollsHorizontally: boolean,
 *   scrollsVertically: boolean,
 * } State regarding whether the scrollbars are visible and the availableHeight
 */
export default createSelector([
  horizontalScrollbarVisible,
  state => state.overflowY,
  roughHeights,
  state => state.scrollContentHeight,
  state => state.showScrollbarY,
], (horizontalScrollbarVisible, overflowY, roughHeights, scrollContentHeight,
    showScrollbarY) => {

  const {
    minAvailableHeight,
    maxAvailableHeight,
  } = roughHeights;
  const allowVerticalScrollbar = overflowY !== 'hidden' &&
    showScrollbarY !== false;

  let scrollsVertically = false;
  let scrollsHorizontally = false;
  if (horizontalScrollbarVisible === ScrollbarState.VISIBLE) {
    scrollsHorizontally = true;
  }
  if (allowVerticalScrollbar && scrollContentHeight > maxAvailableHeight) {
    scrollsVertically = true;
  }

  // Handle case where vertical scrollbar makes horizontal scrollbar necessary
  if (scrollsVertically &&
      horizontalScrollbarVisible === ScrollbarState.IF_VERTICAL_VISIBLE) {
    scrollsHorizontally = true;
  }

  let availableHeight = maxAvailableHeight;
  if (scrollsHorizontally) {
    availableHeight = minAvailableHeight;
  }

  return {
    availableHeight,
    scrollsHorizontally,
    scrollsVertically,
  }
});
