/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cssVar
 * @typechecks
 */

'use strict';

// If you change these, you'll need to restart the dev server for it to take effect.
const CSS_VARS = {
  '--scrollbar-face-active-color': '#7d7d7d',
  '--scrollbar-face-color': '#c2c2c2',
  '--scrollbar-face-margin': '4px',
  '--scrollbar-face-radius': '6px',
  '--scrollbar-size': '15px',
  '--scrollbar-track-color': '#fff',
  '--border-color': '#d3d3d3',
  '--fbui-white': '#fff',
  '--fbui-desktop-background-light': '#f6f7f8',
};

/**
 * @param {string} name
 */
function cssVar(name) {
  if (CSS_VARS.hasOwnProperty(name)) {
    return CSS_VARS[name];
  }

  throw new Error(
    'cssVar' + '("' + name + '"): Unexpected class transformation.'
  );
}

cssVar.CSS_VARS = CSS_VARS;

export default cssVar;
