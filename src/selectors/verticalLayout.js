/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule verticalLayout
 */
import { createSelector } from 'reselect';
import verticalHeightsSelector from 'verticalHeights';

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
 *   bodyOffsetTop: number,
 *   footOffsetTop: number,
 *   headerOffsetTop: number,
 *   rowsContainerHeight: number,
 * }} Details on the heights of the sections of the vertical layout
 */
export default createSelector([
  verticalHeightsSelector,
], (verticalHeights) => {

  let {
    footerHeight,
    groupHeaderHeight,
    headerHeight,
    visibleRowsHeight,
  } = verticalHeights;

  // Determine component offsets
  const headerOffsetTop = groupHeaderHeight;
  const bodyOffsetTop = headerOffsetTop + headerHeight;
  const footOffsetTop = bodyOffsetTop + visibleRowsHeight;
  const scrollbarXOffsetTop = footOffsetTop + footerHeight;

  return {
    bodyOffsetTop,
    footOffsetTop,
    headerOffsetTop,
    rowsContainerHeight: scrollbarXOffsetTop,
  };
});
