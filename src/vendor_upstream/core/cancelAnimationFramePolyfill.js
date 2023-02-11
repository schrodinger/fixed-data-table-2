/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cancelAnimationFramePolyfill
 */

import globalThis from './globalThisPolyfill';

/**
 * Here is the native and polyfill version of cancelAnimationFrame.
 * Please don't use it directly and use cancelAnimationFrame module instead.
 */
const cancelAnimationFrame =
  globalThis.cancelAnimationFrame ||
  globalThis.webkitCancelAnimationFrame ||
  globalThis.mozCancelAnimationFrame ||
  globalThis.oCancelAnimationFrame ||
  globalThis.msCancelAnimationFrame ||
  globalThis.clearTimeout;

export default cancelAnimationFrame;
