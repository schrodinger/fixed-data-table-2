/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule tableHeights
 */

import shallowEqualSelector from '../helper/shallowEqualSelector';
import roughHeights from './roughHeights';
import scrollbarsVisible from './scrollbarsVisible';

/**
 * Compute the necessary heights for rendering parts of the table
 *
 * @param {{
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {number|undefined} ownerHeight
 * @param {number} reservedHeight
 * @param {number} scrollContentHeight
 * @param {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 * }} scrollbarsVisible
 * @param {boolean} useMaxHeight
 * @return {{
 *   bodyHeight: number,
 *   bodyOffsetTop: number,
 *   componentHeight: number,
 *   contentHeight: number,
 *   footOffsetTop: number,
 *   scrollbarXOffsetTop: number,
 *   scrollbarYHeight: number,
 *   visibleRowsHeight: number,
 * }}
 */
function tableHeights(elementHeights, ownerHeight, reservedHeight,
  scrollContentHeight, scrollbarsVisible, useMaxHeight, scrollbarXHeight) {
  const { availableHeight, scrollEnabledX } = scrollbarsVisible;
  let reservedWithScrollbar = reservedHeight;
  if (scrollEnabledX) {
    reservedWithScrollbar += scrollbarXHeight;
  }

  // If less content than space for rows (bodyHeight), then
  // we should shrink the space for rows to fit our row content (scrollContentHeight).
  const bodyHeight = Math.min(availableHeight, scrollContentHeight);

  // If using max height, component should only be sized to content.
  // Otherwise use all available height.
  const rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
  const componentHeight = rowContainerHeight + reservedWithScrollbar;

  // If we have an owner height and it's less than the component height,
  // adjust visible height so we show footer and scrollbar position at the bottom of owner.
  let visibleRowsHeight = rowContainerHeight;
  if (ownerHeight < componentHeight) {
    visibleRowsHeight = ownerHeight - reservedWithScrollbar;
  }

  // If using max height, virtual row container is scrollContentHeight, otherwise
  // it is the larger of that or the available height.
  const virtualRowContainerHeight = useMaxHeight ? scrollContentHeight :
    Math.max(scrollContentHeight, availableHeight);

  // contentHeight is the virtual rows height and reserved height,
  // or ownerHeight if that's larger
  let contentHeight = virtualRowContainerHeight + reservedWithScrollbar;
  if (ownerHeight) {
    contentHeight = Math.max(ownerHeight, contentHeight);
  }

  // Determine component offsets
  const { footerHeight, groupHeaderHeight, headerHeight } = elementHeights;
  const bodyOffsetTop = groupHeaderHeight + headerHeight;
  const footOffsetTop = bodyOffsetTop + visibleRowsHeight;
  const scrollbarXOffsetTop = footOffsetTop + footerHeight;
  const scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);

  return {
    bodyHeight,
    bodyOffsetTop,
    componentHeight,
    contentHeight,
    footOffsetTop,
    scrollbarXOffsetTop,
    scrollbarYHeight,
    visibleRowsHeight,
  };
}

export default shallowEqualSelector([
  state => state.elementHeights,
  state => state.tableSize.ownerHeight,
  state => roughHeights(state).reservedHeight,
  state => state.scrollContentHeight,
  scrollbarsVisible,
  state => state.tableSize.useMaxHeight,
  state => state.scrollbarXHeight
], tableHeights);
