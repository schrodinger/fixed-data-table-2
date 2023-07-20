/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import shallowEqualSelector from '../helper/shallowEqualSelector';
import tableHeights from '../selectors/tableHeights';

const getApiDataSelector = () =>
  shallowEqualSelector(
    [
      (state) => state.tableSize.height,
      (state) => state.elementHeights.groupHeaderHeight,
      (state) => state.scrollX,
      (state) => state.maxScrollX,
      (state) => tableHeights(state).availableScrollWidth,
      (state) => state.isRTL,
      (state) => state.storedWidths,
      (state) => state.scrollableColOffsetIntervalTree,
    ],
    (
      /*number*/ tableHeight,
      /*number*/ groupHeaderHeight,
      /*number*/ scrollX,
      /*number*/ maxScrollX,
      /*number*/ availableScrollWidth,
      /*boolean*/ isRTL,
      storedWidths,
      scrollableColOffsetIntervalTree
    ) => {
      return {
        tableHeight,
        groupHeaderHeight,
        scrollX,
        maxScrollX,
        availableScrollWidth,
        isRTL,
        storedWidths,
        scrollableColOffsetIntervalTree,
      };
    }
  );

export { getApiDataSelector };
