/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule nativeRequestAnimationFrame
 */

import globalThis from './globalThisPolyfill';

const nativeRequestAnimationFrame =
  globalThis.requestAnimationFrame ||
  globalThis.webkitRequestAnimationFrame ||
  globalThis.mozRequestAnimationFrame ||
  globalThis.oRequestAnimationFrame ||
  globalThis.msRequestAnimationFrame;

export default nativeRequestAnimationFrame;
