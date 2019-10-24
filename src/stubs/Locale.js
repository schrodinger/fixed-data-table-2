/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Locale
 */

"use strict";

// Hard code this for now.

function isRTL() {
  return document.documentElement.dir === "rtl";
};

function DIR_SIGN() {
  return isRTL() ? -1 : 1;
};

export default {
  isRTL,
  DIR_SIGN
};
