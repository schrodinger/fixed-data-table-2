/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableEventHelper
 * @typechecks
 */

'use strict';

/**
 * Gets the horizontal and vertical coordinates from a mouse or touch event.
 */
function getCoordinatesFromEvent( /*object*/ event) /*object*/ {
    var x = 0;
    var y = 0;

    if ((!event.clientX || !event.clientY)) {
        if (event.touches && event.touches.length > 0) {
            var touch = event.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        }
    } else {
        x = event.clientX;
        y = event.clientY;
    }

    return { x, y };
}

var FixedDataTableEventHelper = {
    getCoordinatesFromEvent,
  };

module.exports = FixedDataTableEventHelper;
