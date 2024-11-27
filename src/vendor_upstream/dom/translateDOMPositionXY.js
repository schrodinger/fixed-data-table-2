/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule translateDOMPositionXY
 * @typechecks
 */

'use strict';

import BrowserSupportCore from './BrowserSupportCore';
import getVendorPrefixedName from '../core/getVendorPrefixedName';
import globalThis from '../core/globalThisPolyfill';

var TRANSFORM = getVendorPrefixedName('transform');
var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

var translateDOMPositionXY = (function () {
  if (BrowserSupportCore.hasCSSTransforms()) {
    const ua = globalThis.window
      ? globalThis.window.navigator.userAgent
      : 'UNKNOWN';
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
      return function (/*object*/ style, /*number*/ x, /*number*/ y) {
        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
      };
    } else {
      return function (/*object*/ style, /*number*/ x, /*number*/ y) {
        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
      };
    }
  } else {
    return function (/*object*/ style, /*number*/ x, /*number*/ y) {
      style.left = x + 'px';
      style.top = y + 'px';
    };
  }
})();

export default translateDOMPositionXY;
