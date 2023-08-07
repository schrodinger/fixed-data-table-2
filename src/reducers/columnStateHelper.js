/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnStateHelper
 */

'use strict';

import isNil from 'lodash/isNil';
import clamp from 'lodash/clamp';

import columnWidths from '../selectors/columnWidths';

/**
 * Initialize scrollX state
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {Object} oldProps
 * @return {!Object}
 */
function initialize(state, props, oldProps) {
  const { scrollLeft, scrollToColumn } = props;
  let { scrollX } = state;

  if (
    scrollLeft !== undefined &&
    (!oldProps || scrollLeft !== oldProps.scrollLeft)
  ) {
    scrollX = scrollLeft;
  }

  scrollX = scrollTo(state, props, oldProps.scrollToColumn, scrollX);

  const { maxScrollX } = columnWidths(state);
  scrollX = clamp(scrollX, 0, maxScrollX);

  Object.assign(state, {
    maxScrollX,
    scrollX,
  });
}

/**
 * @param {!Object} state
 * @param {{
 *   scrollToColumn: number,
 *   width: number,
 * }} props
 * @param {number} oldScrollToColumn
 * @param {number} scrollX
 * @return {number} The new scrollX
 */
function scrollTo(state, props, oldScrollToColumn, scrollX) {
  const { scrollToColumn } = props;
  if (isNil(scrollToColumn)) {
    return scrollX;
  }

  const { availableScrollWidth, fixedColumns, scrollableColumns } =
    columnWidths(state);
  const fixedColumnsCount = fixedColumns.length;
  const scrollableColumnsCount = scrollableColumns.length;

  const noScrollableColumns = scrollableColumnsCount === 0;
  const scrollToUnchanged = scrollToColumn === oldScrollToColumn;
  const selectedColumnFixed = scrollToColumn < fixedColumnsCount;
  const selectedColumnFixedRight =
    scrollToColumn >= fixedColumnsCount + scrollableColumnsCount;
  if (
    scrollToUnchanged ||
    selectedColumnFixed ||
    selectedColumnFixedRight ||
    noScrollableColumns
  ) {
    return scrollX;
  }

  // Convert column index (0 indexed) to scrollable index (0 indexed)
  // and clamp to max scrollable index
  const clampedColumnIndex = Math.min(
    scrollToColumn - fixedColumnsCount,
    scrollableColumns.length - 1
  );

  // Compute the width of all columns to the left of the column
  let previousWidth = 0;
  for (let columnIdx = 0; columnIdx < clampedColumnIndex; ++columnIdx) {
    previousWidth += scrollableColumns[columnIdx].width;
  }

  // Get width of specified column
  const selectedColumnWidth = scrollableColumns[clampedColumnIndex].width;

  // Compute the scroll position which sets the column on the right of the viewport
  // Must scroll at least far enough for end of column (previousWidth + selectedColumnWidth)
  // to be in viewport.
  const minScrollPosition =
    previousWidth + selectedColumnWidth - availableScrollWidth;

  // Handle offscreen to the left
  // If scrolled less than minimum amount, scroll to minimum amount
  // so column on right of viewport
  if (scrollX < minScrollPosition) {
    return minScrollPosition;
  }

  // Handle offscreen to the right
  // If scrolled more than previous columns, at least part of column will be offscreen to left
  // Scroll so column is flush with left edge of viewport
  if (scrollX > previousWidth) {
    return previousWidth;
  }

  return scrollX;
}

export default {
  initialize,
};
