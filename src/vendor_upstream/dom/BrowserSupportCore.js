/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BrowserSupportCore
 */

import getVendorPrefixedName from '../core/getVendorPrefixedName';

const BrowserSupportCore = {
  /**
   * @return {bool} True if browser supports css animations.
   */
  hasCSSAnimations() {
    return !!getVendorPrefixedName('animationName');
  },

  /**
   * @return {bool} True if browser supports css transforms.
   */
  hasCSSTransforms() {
    return !!getVendorPrefixedName('transform');
  },

  /**
   * @return {bool} True if browser supports css 3d transforms.
   */
  hasCSS3DTransforms() {
    return !!getVendorPrefixedName('perspective');
  },

  /**
   * @return {bool} True if browser supports css transitions.
   */
  hasCSSTransitions() {
    return !!getVendorPrefixedName('transition');
  },
};

export default BrowserSupportCore;
