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

const getApiDataSelector = () =>
  shallowEqualSelector(
    [
      (state) => state.tableSize.height,
      (state) => state.elementHeights.groupHeaderHeight,
      (state) => state.scrollX,
      (state) => state.maxScrollX,
      (state) => columnWidths(state).availableScrollWidth,
      (state) => state.isRTL,
    ],
    (
      /*number*/ tableHeight,
      /*number*/ groupHeaderHeight,
      /*number*/ scrollX,
      /*number*/ maxScrollX,
      /*number*/ availableScrollWidth,
      /*boolean*/ isRTL
    ) => {
      return {
        tableHeight,
        groupHeaderHeight,
        scrollX,
        maxScrollX,
        availableScrollWidth,
        isRTL,
      };
    }
  );

export { getApiDataSelector };
