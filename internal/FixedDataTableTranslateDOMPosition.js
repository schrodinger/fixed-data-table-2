'use strict';

var _translateDOMPositionXY = require('./translateDOMPositionXY');

var _translateDOMPositionXY2 = _interopRequireDefault(_translateDOMPositionXY);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FixedDataTableTranslateDOMPosition( /*object*/style, /*number*/x, /*number*/y) {
  var initialRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (initialRender) {
    style.left = x + 'px';
    style.top = y + 'px';
  } else {
    (0, _translateDOMPositionXY2.default)(style, x, y);
  }
} /**
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

module.exports = FixedDataTableTranslateDOMPosition;