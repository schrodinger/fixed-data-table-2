/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This class listens to events on the document and then updates a react
 * component through callbacks.
 * Please note that captureMouseMove must be called in
 * order to initialize listeners on mousemove and mouseup.
 * releaseMouseMove must be called to remove them. It is important to
 * call releaseMouseMoves since mousemove is expensive to listen to.
 *
 * @providesModule DOMMouseMoveTracker
 * @typechecks
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventListener = require('./EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _cancelAnimationFramePolyfill = require('./cancelAnimationFramePolyfill');

var _cancelAnimationFramePolyfill2 = _interopRequireDefault(_cancelAnimationFramePolyfill);

var _requestAnimationFramePolyfill = require('./requestAnimationFramePolyfill');

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMMouseMoveTracker = function () {
  /**
   * onMove is the callback that will be called on every mouse move.
   * onMoveEnd is called on mouse up when movement has ended.
   */
  function DOMMouseMoveTracker(
  /*function*/onMove,
  /*function*/onMoveEnd,
  /*DOMElement*/domNode) {
    _classCallCheck(this, DOMMouseMoveTracker);

    this._isDragging = false;
    this._animationFrameID = null;
    this._domNode = domNode;
    this._onMove = onMove;
    this._onMoveEnd = onMoveEnd;
    this._onMouseEnd = this._onMouseEnd.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._didMouseMove = this._didMouseMove.bind(this);
  }

  /**
   * This is to set up the listeners for listening to mouse move
   * and mouse up signaling the movement has ended. Please note that these
   * listeners are added at the document.body level. It takes in an event
   * in order to grab inital state.
   */


  _createClass(DOMMouseMoveTracker, [{
    key: 'captureMouseMoves',
    value: function captureMouseMoves( /*object*/event) {
      if (!this._eventMoveToken && !this._eventUpToken && !this._eventLeaveToken && !this._eventOutToken) {
        this._eventMoveToken = _EventListener2.default.listen(this._domNode, 'mousemove', this._onMouseMove);
        this._eventUpToken = _EventListener2.default.listen(this._domNode, 'mouseup', this._onMouseUp);
        this._eventLeaveToken = _EventListener2.default.listen(this._domNode, 'mouseleave', this._onMouseEnd);
        this._eventOutToken = _EventListener2.default.listen(this._domNode, 'mouseout', this.onMouseEnd);
      }

      if (!this._isDragging) {
        this._deltaX = 0;
        this._deltaY = 0;
        this._isDragging = true;
        this._x = event.clientX;
        this._y = event.clientY;
      }
      event.preventDefault();
    }

    /**
     * These releases all of the listeners on document.body.
     */

  }, {
    key: 'releaseMouseMoves',
    value: function releaseMouseMoves() {
      if (this._eventMoveToken && this._eventUpToken && this._eventLeaveToken && this._eventOutToken) {
        this._eventMoveToken.remove();
        this._eventMoveToken = null;
        this._eventUpToken.remove();
        this._eventUpToken = null;
        this._eventLeaveToken.remove();
        this._eventLeaveToken = null;
        this._eventOutToken.remove();
        this._eventOutToken = null;
      }

      if (this._animationFrameID !== null) {
        (0, _cancelAnimationFramePolyfill2.default)(this._animationFrameID);
        this._animationFrameID = null;
      }

      if (this._isDragging) {
        this._isDragging = false;
        this._x = null;
        this._y = null;
      }
    }

    /**
     * Returns whether or not if the mouse movement is being tracked.
     */

  }, {
    key: 'isDragging',
    value: function isDragging() /*boolean*/{
      return this._isDragging;
    }

    /**
     * Calls onMove passed into constructor and updates internal state.
     */

  }, {
    key: '_onMouseMove',
    value: function _onMouseMove( /*object*/event) {
      var x = event.clientX;
      var y = event.clientY;

      this._deltaX += x - this._x;
      this._deltaY += y - this._y;

      if (this._animationFrameID === null) {
        // The mouse may move faster then the animation frame does.
        // Use `requestAnimationFramePolyfill` to avoid over-updating.
        this._animationFrameID = (0, _requestAnimationFramePolyfill2.default)(this._didMouseMove);
      }

      this._x = x;
      this._y = y;
      event.preventDefault();
    }
  }, {
    key: '_didMouseMove',
    value: function _didMouseMove() {
      this._animationFrameID = null;
      this._onMove(this._deltaX, this._deltaY);
      this._deltaX = 0;
      this._deltaY = 0;
    }

    /**
     * Calls onMoveEnd passed into constructor and updates internal state.
     */

  }, {
    key: '_onMouseUp',
    value: function _onMouseUp() {
      if (this._animationFrameID) {
        this._didMouseMove();
      }
      this._onMoveEnd(false);
    }

    /**
     * Calls onMoveEnd passed into the constructor, updates internal state, and cancels the move.
     */

  }, {
    key: '_onMouseEnd',
    value: function _onMouseEnd() {
      this._onMoveEnd(true);
    }
  }]);

  return DOMMouseMoveTracker;
}();

module.exports = DOMMouseMoveTracker;