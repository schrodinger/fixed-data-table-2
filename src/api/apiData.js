/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import columnWidths from '../selectors/columnWidths';
import shallowEqualSelector from '../helper/shallowEqualSelector';
import tableHeightsSelector from '../selectors/tableHeights';

const getApiDataSelector = () =>
  shallowEqualSelector(
    [
      (state) => state.tableSize.height,
      (state) =>
        (state.headerHeight ? state.headerHeight : 0) +
        (state.groupHeaderHeight ? state.groupHeaderHeight : 0) +
        tableHeightsSelector(state).visibleRowsHeight,
      (state) => state.elementHeights.groupHeaderHeight,
      (state) => state.scrollX,
      (state) => state.maxScrollX,
      (state) => columnWidths(state).availableScrollWidth,
      (state) => state.isRTL,
    ],
    (
      /*number*/ tableHeight,
      /*number*/ bodyAndHeaderHeight,
      /*number*/ groupHeaderHeight,
      /*number*/ scrollX,
      /*number*/ maxScrollX,
      /*number*/ availableScrollWidth,
      /*boolean*/ isRTL
    ) => {
      return {
        tableHeight,
        bodyAndHeaderHeight,
        groupHeaderHeight,
        scrollX,
        maxScrollX,
        availableScrollWidth,
        isRTL,
      };
    }
  );

export { getApiDataSelector };
