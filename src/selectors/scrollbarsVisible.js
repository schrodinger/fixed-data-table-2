/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollbarsVisible
 */

import shallowEqualSelector from '../helper/shallowEqualSelector';
import roughHeights, { ScrollbarState } from './roughHeights';

/**
 * State regarding which scrollbars will be shown.
 * Also includes the actual availableHeight which depends on the scrollbars.
 *
 * @param {{
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   scrollStateX: ScrollbarState,
 * }} roughHeights
 * @param {number} scrollContentHeight,
 * @param {{
 *   overflowY: string,
 *   showScrollbarY: boolean,
 * }} scrollFlags
 * @return {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 *   scrollEnabledY: boolean,
 * }}
 */
function scrollbarsVisible(roughHeights, scrollContentHeight, scrollFlags) {
  const { overflowY, showScrollbarY } = scrollFlags;
  const allowScrollbarY = overflowY !== 'hidden' &&
    showScrollbarY !== false;

  const { minAvailableHeight, maxAvailableHeight, scrollStateX } = roughHeights;
  let scrollEnabledY = false;
  let scrollEnabledX = false;
  if (scrollStateX === ScrollbarState.VISIBLE) {
    scrollEnabledX = true;
  }
  if (allowScrollbarY && scrollContentHeight > maxAvailableHeight) {
    scrollEnabledY = true;
  }

  // Handle case where vertical scrollbar makes horizontal scrollbar necessary
  if (scrollEnabledY && scrollStateX === ScrollbarState.JOINT_SCROLLBARS) {
    scrollEnabledX = true;
  }

  let availableHeight = maxAvailableHeight;
  if (scrollEnabledX) {
    availableHeight = minAvailableHeight;
  }

  return {
    availableHeight,
    scrollEnabledX,
    scrollEnabledY,
  }
}

export default shallowEqualSelector([
  roughHeights,
  state => state.scrollContentHeight,
  state => state.scrollFlags,
], scrollbarsVisible);
