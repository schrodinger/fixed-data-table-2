/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule roughHeights
 */
import Scrollbar from 'Scrollbar';
import { createSelector } from 'reselect';
import groupHeaderHeight from 'groupHeaderHeight';
import horizontalScrollbarVisible, { ScrollbarState } from 'horizontalScrollbarVisible';

const BORDER_HEIGHT = 1;

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
 *   showScrollbarX: boolean,
 *   useGroupHeader: boolean,
 *   width: number,
 * }} state
 * @return {{
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   reservedHeight: number,
 *   useMaxHeight: boolean,
 * }} The width available for rendering cells.
 */
export default createSelector([
  state => state.footerHeight,
  groupHeaderHeight,
  state => state.headerHeight,
  state => state.height,
  horizontalScrollbarVisible,
  state => state.maxHeight,
], (footerHeight, groupHeaderHeight, headerHeight, height,
    horizontalScrollbarVisible, maxHeight) => {
  const reservedHeight = footerHeight + headerHeight + groupHeaderHeight +
    2 * BORDER_HEIGHT;

  const useMaxHeight = height === undefined;
  const maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
  const roughAvailableHeight = maxComponentHeight - reservedHeight;

  let minAvailableHeight = roughAvailableHeight;
  let maxAvailableHeight = roughAvailableHeight;
  switch (horizontalScrollbarVisible) {
    case ScrollbarState.VISIBLE: {
      minAvailableHeight -= Scrollbar.SIZE;
      maxAvailableHeight -= Scrollbar.SIZE;
      break;
    }
    case ScrollbarState.IF_VERTICAL_VISIBLE: {
      minAvailableHeight -= Scrollbar.SIZE;
      break;
    }
  }

  return {
    minAvailableHeight: Math.max(minAvailableHeight, 0),
    maxAvailableHeight: Math.max(maxAvailableHeight, 0),
    reservedHeight,
    useMaxHeight,
  };
});
