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
import groupHeaderHeight from 'groupHeaderHeight';
import roughHeights from 'roughHeights';
import scrollbarsVisible from 'scrollbarsVisible';
import { createSelector } from 'reselect';

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
 *   ownerHeight: number,
 *   scrollContentHeight: number,
 *   showScrollbarX: boolean,
 *   showScrollbarY: boolean,
 *   useGroupHeader: boolean,
 *   width: number,
 * }} state
 * @return {{
 *   bodyHeight: number,
 *   bodyOffsetTop: number,
 *   componentHeight: number,
 *   contentHeight: number,
 *   footOffsetTop: number,
 *   headerOffsetTop: number,
 *   rowsContainerHeight: number,
 *   visibleRowsHeight: number,
 * }} The heights for parts of the table
 */
export default createSelector([
  state => state.footerHeight,
  groupHeaderHeight,
  state => state.headerHeight,
  roughHeights,
  state => state.ownerHeight,
  state => state.scrollContentHeight,
  scrollbarsVisible,
], (footerHeight, groupHeaderHeight, headerHeight, roughHeights,
    ownerHeight, scrollContentHeight, scrollbarsVisible) => {
  const { reservedHeight, useMaxHeight } = roughHeights;
  const { availableHeight, scrollsHorizontally } = scrollbarsVisible;

  let reservedWScrollbar = reservedHeight;
  if (scrollsHorizontally) {
    reservedWScrollbar += Scrollbar.SIZE;
  }

  // If less content than space for rows (bodyHeight), then
  // we should shrink the space for rows to fit our row content (scrollContentHeight).
  const bodyHeight = Math.min(availableHeight, scrollContentHeight);

  // If using max height, component should only be sized to content.
  // Otherwise use all available height.
  const rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
  const componentHeight = rowContainerHeight + reservedWScrollbar;

  // If we have an owner height and it's less than the component height,
  // adjust visible height so we show footer and scrollbar position at the bottom of owner.
  let visibleRowsHeight = rowContainerHeight;
  if (ownerHeight < componentHeight) {
    visibleRowsHeight = ownerHeight - reservedWScrollbar;
  }

  // If using max height, virtual row container is scrollContentHeight, otherwise
  // it is the larger of that or the available height.
  const virtualRowContainerHeight = useMaxHeight ? scrollContentHeight :
    Math.max(scrollContentHeight, availableHeight);

  // contentHeight is the virtual rows height and reserved height,
  // or ownerHeight if that's larger
  let contentHeight = virtualRowContainerHeight + reservedWScrollbar;
  if (ownerHeight) {
    contentHeight = Math.max(ownerHeight, contentHeight);
  }

  // Determine component offsets
  const headerOffsetTop = groupHeaderHeight;
  const bodyOffsetTop = headerOffsetTop + headerHeight;
  const footOffsetTop = bodyOffsetTop + visibleRowsHeight;
  const scrollbarXOffsetTop = footOffsetTop + footerHeight;

  return {
    bodyHeight,
    bodyOffsetTop,
    componentHeight,
    contentHeight,
    footOffsetTop,
    headerOffsetTop,
    rowsContainerHeight: scrollbarXOffsetTop,
    visibleRowsHeight,
  };
});
