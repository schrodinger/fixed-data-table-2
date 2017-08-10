/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule verticalHeights
 */
import Scrollbar from 'Scrollbar';
import { createSelector } from 'reselect';
import horizontalScrollbarVisible from 'horizontalScrollbarVisible';

const BORDER_HEIGHT = 1;

/**
* @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       flexGrow: number,
 *       width: number,
 *     },
 *   }>},
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 *   height: ?number,
 *   maxHeight: ?number,
 *   overflowX: string,
 *   ownerHeight: number,
 *   showScrollbarX: boolean,
 *   useGroupHeader: boolean,
 *   width: number,
 * }} state
 * @return {{
 *   availableHeight: number,
 *   bodyHeight: number,
 *   componentHeight: number,
 *   contentHeight: number,
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 *   visibleRowsHeight: number,
 * }} The heights for parts of the table
 */
export default createSelector([
  state => state.footerHeight,
  state => state.groupHeaderHeight,
  state => state.headerHeight,
  state => state.height,
  horizontalScrollbarVisible,
  state => state.maxHeight,
  state => state.ownerHeight,
  state => state.scrollContentHeight,
  state => state.useGroupHeader,
], (footerHeight, groupHeaderHeight, headerHeight, height,
    horizontalScrollbarVisible, maxHeight, ownerHeight, scrollContentHeight,
    useGroupHeader) => {

  // Initialize & compute heights
  groupHeaderHeight = useGroupHeader ? groupHeaderHeight : 0;
  const scrollbarHeight = horizontalScrollbarVisible ? Scrollbar.SIZE : 0;
  const reservedHeight = footerHeight + headerHeight + groupHeaderHeight +
    scrollbarHeight + 2 * BORDER_HEIGHT;

  // Determine the height allowed for the component
  const useMaxHeight = height === undefined;
  const maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
  const availableHeight = Math.max(maxComponentHeight - reservedHeight, 0);

  // If less content than space for rows (bodyHeight), then
  // we should shrink the space for rows to fit our row content (scrollContentHeight).
  const bodyHeight = Math.min(availableHeight, scrollContentHeight);

  // If using max height, component should only be sized to content.
  // Otherwise use all available height.
  const rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
  const componentHeight = rowContainerHeight + reservedHeight;

  // If we have an owner height and it's less than the component height,
  // adjust visible height so we show footer and scrollbar position at the bottom of owner.
  let visibleRowsHeight = rowContainerHeight;
  if (ownerHeight < componentHeight) {
    visibleRowsHeight = ownerHeight - reservedHeight;
  }

  // If using max height, virtual row container is scrollContentHeight, otherwise
  // it is the larger of that or the available height.
  const virtualRowContainerHeight = useMaxHeight ? scrollContentHeight :
    Math.max(scrollContentHeight, availableHeight);

  // contentHeight is the virtual rows height and reserved height,
  // or ownerHeight if that's larger
  let contentHeight = virtualRowContainerHeight + reservedHeight;
  if (ownerHeight) {
    contentHeight = Math.max(ownerHeight, contentHeight);
  }

  return {
    availableHeight,
    bodyHeight,
    componentHeight,
    contentHeight,
    footerHeight,
    groupHeaderHeight,
    headerHeight,
    visibleRowsHeight,
  };
});
