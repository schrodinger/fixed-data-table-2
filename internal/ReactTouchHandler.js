/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that handles touch events and calls provided touch
 * callback with correct frame rate.
 * Deceleration logic based on http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
 *
 * @providesModule ReactTouchHandler
 * @typechecks
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emptyFunction = require('./emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _requestAnimationFramePolyfill = require('./requestAnimationFramePolyfill');

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOVE_AMPLITUDE = 1.6;
var DECELERATION_AMPLITUDE = 1.6;
var DECELERATION_FACTOR = 325;
var TRACKER_TIMEOUT = 100;

var ReactTouchHandler = function () {
  /**
   * onTouchScroll is the callback that will be called with right frame rate if
   * any touch events happened
   * onTouchScroll should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  function ReactTouchHandler(
  /*function*/onTouchScroll,
  /*boolean|function*/handleScrollX,
  /*boolean|function*/handleScrollY,
  /*?boolean|?function*/stopPropagation) {
    _classCallCheck(this, ReactTouchHandler);

    // The animation frame id for the drag scroll
    this._dragAnimationId = null;

    // The interval id for tracking the drag velocity
    this._trackerId = null;

    // Used to track the drag scroll delta while waiting for an animation frame
    this._deltaX = 0;
    this._deltaY = 0;

    // The last touch we processed while dragging.  Used to compute the delta and velocity above
    this._lastTouchX = 0;
    this._lastTouchY = 0;

    // Used to track a moving average of the scroll velocity while dragging
    this._velocityX = 0;
    this._velocityY = 0;

    // An accummulated drag scroll delta used to calculate velocity
    this._accumulatedDeltaX = 0;
    this._accumulatedDeltaY = 0;

    // Timestamp from the last interval frame we used to track velocity
    this._lastFrameTimestamp = Date.now();

    // Timestamp from the last animation frame we used to autoscroll after drag stop
    this._autoScrollTimestamp = Date.now();

    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    // TODO (jordan) Is configuring this necessary
    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._stopPropagation = stopPropagation;
    this._onTouchScrollCallback = onTouchScroll;

    this._didTouchMove = this._didTouchMove.bind(this);
    this._track = this._track.bind(this);
    this._autoScroll = this._autoScroll.bind(this);
    this._startAutoScroll = this._startAutoScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
  }

  _createClass(ReactTouchHandler, [{
    key: 'onTouchStart',
    value: function onTouchStart( /*object*/event) {
      // Start tracking drag delta for scrolling
      this._lastTouchX = event.touches[0].pageX;
      this._lastTouchY = event.touches[0].pageY;

      // Reset our velocity and intermediate data used to compute velocity
      this._velocityX = 0;
      this._velocityY = 0;
      this._accumulatedDeltaX = 0;
      this._accumulatedDeltaY = 0;
      this._lastFrameTimestamp = Date.now();

      // Setup interval for tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = setInterval(this._track, TRACKER_TIMEOUT);

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd( /*object*/event) {

      // Stop tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = null;

      // Initialize decelerating autoscroll on drag stop
      (0, _requestAnimationFramePolyfill2.default)(this._startAutoScroll);

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchCancel',
    value: function onTouchCancel( /*object*/event) {

      // Stop tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = null;

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove( /*object*/event) {
      var moveX = event.touches[0].pageX;
      var moveY = event.touches[0].pageY;

      // Compute delta scrolled since last drag
      // Mobile, scrolling is inverted
      this._deltaX = MOVE_AMPLITUDE * (this._lastTouchX - moveX);
      this._deltaY = MOVE_AMPLITUDE * (this._lastTouchY - moveY);

      var handleScrollX = this._handleScrollX(this._deltaX, this._deltaY);
      var handleScrollY = this._handleScrollY(this._deltaY, this._deltaX);
      if (!handleScrollX && !handleScrollY) {
        return;
      }

      // If we can handle scroll update last touch for computing delta
      if (handleScrollX) {
        this._lastTouchX = moveX;
      } else {
        this._deltaX = 0;
      }
      if (handleScrollY) {
        this._lastTouchY = moveY;
      } else {
        this._deltaY = 0;
      }

      event.preventDefault();

      // Ensure minimum delta magnitude is met to avoid jitter
      var changed = false;
      if (Math.abs(this._deltaX) > 2 || Math.abs(this._deltaY) > 2) {
        if (this._stopPropagation()) {
          event.stopPropagation();
        }
        changed = true;
      }

      // Request animation frame to trigger scroll of computed delta
      if (changed === true && this._dragAnimationId === null) {
        this._dragAnimationId = (0, _requestAnimationFramePolyfill2.default)(this._didTouchMove);
      }
    }

    /**
     * Fire scroll callback based on computed drag delta.
     * Also track accummulated delta so we can calculate velocity
     */

  }, {
    key: '_didTouchMove',
    value: function _didTouchMove() {
      this._dragAnimationId = null;

      this._onTouchScrollCallback(this._deltaX, this._deltaY);
      this._accumulatedDeltaX += this._deltaX;
      this._accumulatedDeltaY += this._deltaY;
      this._deltaX = 0;
      this._deltaY = 0;
    }

    /**
     * Compute velocity based on a weighted average of drag over last 100 ms and
     * previous velocity.  Combining into a moving average results in a smoother scroll.
     */

  }, {
    key: '_track',
    value: function _track() {
      var now = Date.now();
      var elapsed = now - this._lastFrameTimestamp;
      var oldVelocityX = this._velocityX;
      var oldVelocityY = this._velocityY;

      // We compute velocity using a weighted average of the current velocity and the previous velocity
      // If the previous velocity is 0, put the full weight on the last 100 ms
      var weight = 0.8;
      if (elapsed < TRACKER_TIMEOUT) {
        weight *= elapsed / TRACKER_TIMEOUT;
      }
      if (oldVelocityX === 0 && oldVelocityY === 0) {
        weight = 1;
      }

      // Formula for computing weighted average of velocity
      this._velocityX = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaX / (1 + elapsed));
      if (weight < 1) {
        this._velocityX += (1 - weight) * oldVelocityX;
      }

      this._velocityY = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaY / (1 + elapsed));
      if (weight < 1) {
        this._velocityY += (1 - weight) * oldVelocityY;
      }

      this._accumulatedDeltaX = 0;
      this._accumulatedDeltaY = 0;
      this._lastFrameTimestamp = now;
    }

    /**
     * To kick off deceleration / momentum scrolling,
     * handle any scrolling from a drag which was waiting for an animation frame
     * Then update our velocity
     * Finally start the momentum scrolling handler (autoScroll)
     */

  }, {
    key: '_startAutoScroll',
    value: function _startAutoScroll() {
      this._autoScrollTimestamp = Date.now();
      if (this._deltaX > 0 || this.deltaY > 0) {
        this._didTouchMove();
      }
      this._track();
      this._autoScroll();
    }

    /**
     * Compute a scroll delta with an exponential decay based on time elapsed since drag was released.
     * This is called recursively on animation frames until the delta is below a threshold (5 pixels)
     */

  }, {
    key: '_autoScroll',
    value: function _autoScroll() {
      var elapsed = Date.now() - this._autoScrollTimestamp;
      var factor = DECELERATION_AMPLITUDE * Math.exp(-elapsed / DECELERATION_FACTOR);
      var deltaX = factor * this._velocityX;
      var deltaY = factor * this._velocityY;

      if (Math.abs(deltaX) <= 5 || !this._handleScrollX(deltaX, deltaY)) {
        deltaX = 0;
      }
      if (Math.abs(deltaY) <= 5 || !this._handleScrollY(deltaY, deltaX)) {
        deltaY = 0;
      }

      if (deltaX !== 0 || deltaY !== 0) {
        this._onTouchScrollCallback(deltaX, deltaY);
        (0, _requestAnimationFramePolyfill2.default)(this._autoScroll);
      }
    }
  }]);

  return ReactTouchHandler;
}();

module.exports = ReactTouchHandler;