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

import clamp from '../vendor_upstream/core/clamp';

import shallowEqualSelector from '../helper/shallowEqualSelector';

const BORDER_HEIGHT = 1;
const MIN_BUFFER_ROWS = 3;
const MAX_BUFFER_ROWS = 6;
const MIN_BUFFER_COLS = 1;
const MAX_BUFFER_COLS = 2;
export const ScrollbarState = {
  HIDDEN: 'hidden',
  JOINT_SCROLLBARS: 'JOINT_SCROLLBARS',
  VISIBLE: 'visible',
};

/**
 * Calculate the available height for the viewport.
 * Since we aren't 100% sure of whether scrollbars are visible
 * at this point, we compute a max & min viewport height.
 *
 * maxAvailableHeight is the largest it could be, while
 * minAvailableHeight is the smallest.
 * We also compute how large it is based on
 * the current scrollContentHeight in scrollbarsVisible.
 *
 * bufferRowCount is the number of rows to buffer both ahead and behind the viewport.
 * In total we will buffer twice this number of rows (half ahead, and half behind).
 *
 * reservedHeight is the height reserved for headers and footers.
 *
 * scrollStateX is the state of the horizontal scrollbar.
 * HIDDEN & VISIBLE are self explanatory, but
 * JOINT_SCROLLBARS mean the horizontal scroll will be shown if and
 * only if the vertical scrollbar is shown.
 *
 * @param {!Array.<{
 *   width: number,
 * }>} columnProps
 * @param {{
 *   cellGroupWrapperHeight: number,
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {{
 *   height: ?number,
 *   maxHeight: ?number,
 *   useMaxHeight: boolean,
 *   width: number,
 * }} tableSize
 * @return {{
 *   bufferRowsCount: number,
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   reservedHeight: number,
 *   scrollStateX: ScrollbarState,
 * }}
 */
function roughHeights(
  elementHeights,
  rowSettings,
  scrollFlags,
  tableSize,
  scrollbarXHeight,
  scrollbarYWidth,
  columnSettings,
  fixedContentWidth,
  scrollContentWidth,
  scrollContentHeight
) {
  const {
    cellGroupWrapperHeight,
    footerHeight,
    headerHeight,
    groupHeaderHeight,
  } = elementHeights;
  // we don't need border height to be added to the table if we are using cellGroupWrapperHeight
  const borderHeight = cellGroupWrapperHeight ? 0 : 2 * BORDER_HEIGHT;
  const reservedHeight =
    footerHeight + headerHeight + groupHeaderHeight + borderHeight;

  const { height, maxHeight, useMaxHeight, width } = tableSize;
  const maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
  const roughAvailableHeight = maxComponentHeight - reservedHeight;
  const roughAvailableWidth = Math.max(0, width - fixedContentWidth);

  const scrollStateX = getScrollStateX(
    scrollFlags,
    width,
    scrollbarYWidth,
    fixedContentWidth,
    scrollContentWidth
  );

  /*
   * Early estimates of how much height we have to show rows.
   * We won't know which one is real until we know about horizontal scrollbar which
   * requires knowing about vertical scrollbar as well and that
   * requires scrollContentHeight which
   * requires us to have handled scrollTo / scrollToRow...
   */
  let minAvailableHeight = roughAvailableHeight;
  let maxAvailableHeight = roughAvailableHeight;
  let minAvailableWidth = roughAvailableWidth;
  let maxAvailableWidth = roughAvailableWidth;
  switch (scrollStateX) {
    case ScrollbarState.VISIBLE: {
      minAvailableHeight -= scrollbarXHeight;
      maxAvailableHeight -= scrollbarXHeight;
      break;
    }
    case ScrollbarState.JOINT_SCROLLBARS: {
      minAvailableHeight -= scrollbarXHeight;
      break;
    }
  }

  const scrollStateY = getScrollStateY(
    scrollFlags,
    roughAvailableHeight,
    scrollbarXHeight,
    scrollContentHeight
  );

  switch (scrollStateY) {
    case ScrollbarState.VISIBLE: {
      minAvailableWidth -= scrollbarYWidth;
      maxAvailableWidth -= scrollbarYWidth;
      break;
    }
    case ScrollbarState.JOINT_SCROLLBARS: {
      minAvailableWidth -= scrollbarYWidth;
      break;
    }
  }

  return {
    bufferRowCount: getBufferRowCount(maxAvailableHeight, rowSettings),
    minAvailableHeight: Math.max(minAvailableHeight, 0),
    maxAvailableHeight: Math.max(maxAvailableHeight, 0),
    reservedHeight,
    scrollStateX,
    bufferColCount: getBufferColCount(maxAvailableWidth, columnSettings),
    minAvailableWidth: Math.max(minAvailableWidth, 0),
    maxAvailableWidth: Math.max(maxAvailableWidth, 0),
  };
}

/**
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {number} width
 * @param {number} scrollbarYWidth
 * @param {number} fixedContentWidth
 * @param {number} scrollContentWidth
 * @return {ScrollbarState}
 */
function getScrollStateX(
  scrollFlags,
  width,
  scrollbarYWidth,
  fixedContentWidth,
  scrollContentWidth
) {
  const { overflowX, showScrollbarX } = scrollFlags;

  var minColWidth = scrollContentWidth + fixedContentWidth;

  if (overflowX === 'hidden' || showScrollbarX === false) {
    return ScrollbarState.HIDDEN;
  } else if (minColWidth > width) {
    return ScrollbarState.VISIBLE;
  }

  if (minColWidth > width - scrollbarYWidth) {
    return ScrollbarState.JOINT_SCROLLBARS;
  }
  return ScrollbarState.HIDDEN;
}

/**
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {number} height
 * @param {number} scrollbarXHeight
 * @param {number} scrollContentHeight
 * @return {ScrollbarState}
 */
function getScrollStateY(
  scrollFlags,
  height,
  scrollbarXHeight,
  scrollContentHeight
) {
  const { overflowY, showScrollbarY } = scrollFlags;

  if (overflowY === 'hidden' || showScrollbarY === false) {
    return ScrollbarState.HIDDEN;
  } else if (scrollContentHeight > height) {
    return ScrollbarState.VISIBLE;
  }

  if (scrollContentHeight > height - scrollbarXHeight) {
    return ScrollbarState.JOINT_SCROLLBARS;
  }

  return ScrollbarState.HIDDEN;
}

/**
 * @param {number} maxAvailableHeight
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @return {number}
 */
function getBufferRowCount(maxAvailableHeight, rowSettings) {
  const { bufferRowCount, rowHeight, subRowHeight } = rowSettings;
  if (bufferRowCount !== undefined) {
    return bufferRowCount;
  }

  const fullRowHeight = rowHeight + subRowHeight;
  const avgVisibleRowCount = Math.ceil(maxAvailableHeight / fullRowHeight) + 1;
  return clamp(
    Math.floor(avgVisibleRowCount / 2),
    MIN_BUFFER_ROWS,
    MAX_BUFFER_ROWS
  );
}

function getBufferColCount(maxAvailableWidth, columnSettings) {
  const { bufferColCount, defaultColumnWidth } = columnSettings;
  if (bufferColCount !== undefined) {
    return bufferColCount;
  }

  const avgVisibleColCount =
    Math.ceil(maxAvailableWidth / defaultColumnWidth) + 1;
  return clamp(
    Math.floor(avgVisibleColCount / 2),
    MIN_BUFFER_COLS,
    MAX_BUFFER_COLS
  );
}

export default shallowEqualSelector(
  [
    (state) => state.elementHeights,
    (state) => state.rowSettings,
    (state) => state.scrollFlags,
    (state) => state.tableSize,
    (state) => state.scrollbarXHeight,
    (state) => state.scrollbarYWidth,
    (state) => state.columnSettings,
    (state) => state.fixedContentWidth,
    (state) => state.scrollContentWidth,
    (state) => state.scrollContentHeight,
  ],
  roughHeights
);
