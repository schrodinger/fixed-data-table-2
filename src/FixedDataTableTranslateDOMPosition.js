/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableTranslateDOMPosition
 * @typechecks
 */

import BrowserSupportCore from 'BrowserSupportCore';
import translateDOMPositionXY from 'translateDOMPositionXY';
import Locale from 'Locale';

function FixedDataTableTranslateDOMPosition(/*object*/ style, /*number*/ x, /*number*/ y, /*boolean*/ initialRender = false) {
  if (style.display === 'none') {
    return;
  }
  if (initialRender) {
    style.left = x + 'px';
    style.top = y + 'px';
  } else {
    if (BrowserSupportCore.hasCSSTransforms() && Locale.isRTL()) {
      x *= Locale.DIR_SIGN();
    }

    translateDOMPositionXY(style, x, y);
  }

  if (Locale.isRTL()) {
    style.right = style.left;
    style.left = 'auto';
  }

}

export default FixedDataTableTranslateDOMPosition;
