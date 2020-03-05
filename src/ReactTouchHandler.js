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

import emptyFunction from './vendor_upstream/core/emptyFunction';
import requestAnimationFramePolyfill from './vendor_upstream/core/requestAnimationFramePolyfill';

var MOVE_AMPLITUDE = 1.6;
var DECELERATION_AMPLITUDE = 1.6;
var DECELERATION_FACTOR = 325;
var TRACKER_TIMEOUT = 100;

class ReactTouchHandler {
  /**
   * onTouchScroll is the callback that will be called with right frame rate if
   * any touch events happened
   * onTouchScroll should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  constructor(
    /*function*/ onTouchScroll,
    /*boolean|function*/ handleScrollX,
    /*boolean|function*/ handleScrollY,
    /*?boolean*/ preventDefault,
    /*?boolean*/ stopPropagation
  ) {

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
      handleScrollX = handleScrollX ?
        emptyFunction.thatReturnsTrue :
        emptyFunction.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ?
        emptyFunction.thatReturnsTrue :
        emptyFunction.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._preventDefault = preventDefault;
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

  onTouchStart(/*object*/ event) {
    if (this._preventDefault) {
      event.preventDefault();
    }

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

    if (this._stopPropagation) {
      event.stopPropagation();
    }
  }

  onTouchEnd(/*object*/ event) {
    if (this._preventDefault) {
      event.preventDefault();
    }

    // Stop tracking velocity
    clearInterval(this._trackerId);
    this._trackerId = null;

    // Initialize decelerating autoscroll on drag stop
    requestAnimationFramePolyfill(this._startAutoScroll);

    if (this._stopPropagation) {
      event.stopPropagation();
    }
  }

  onTouchCancel(/*object*/ event) {

    // Stop tracking velocity
    clearInterval(this._trackerId);
    this._trackerId = null;

    if (this._stopPropagation) {
      event.stopPropagation();
    }
  }

  onTouchMove(/*object*/ event) {
    if (this._preventDefault) {
      event.preventDefault();
    }

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

    // The event will result in a scroll to the table, so there's no need to also let the parent containers scroll
    if (!event.defaultPrevented) {
      event.preventDefault();
    }

    // Ensure minimum delta magnitude is met to avoid jitter
    var changed = false;
    if (Math.abs(this._deltaX) > 2 || Math.abs(this._deltaY) > 2) {
      if (this._stopPropagation) {
        event.stopPropagation();
      }
      changed = true;
    }

    // Request animation frame to trigger scroll of computed delta
    if (changed === true && this._dragAnimationId === null) {
      this._dragAnimationId = requestAnimationFramePolyfill(this._didTouchMove);
    }
  }

  /**
   * Fire scroll callback based on computed drag delta.
   * Also track accummulated delta so we can calculate velocity
   */
  _didTouchMove() {
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
  _track() {
    var now = Date.now();
    var elapsed = now - this._lastFrameTimestamp;
    var oldVelocityX = this._velocityX;
    var oldVelocityY = this._velocityY;

    // We compute velocity using a weighted average of the current velocity and the previous velocity
    // If the previous velocity is 0, put the full weight on the last 100 ms
    var weight = 0.8;
    if (elapsed < TRACKER_TIMEOUT) {
      weight *= (elapsed / TRACKER_TIMEOUT);
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
  _startAutoScroll() {
    this._autoScrollTimestamp = Date.now();
    if (this._deltaX > 0 || this.deltaY > 0) {
      this._didTouchMove()
    }
    this._track();
    this._autoScroll();
  }

  /**
   * Compute a scroll delta with an exponential decay based on time elapsed since drag was released.
   * This is called recursively on animation frames until the delta is below a threshold (5 pixels)
   */
  _autoScroll() {
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
      requestAnimationFramePolyfill(this._autoScroll);
    }
  }
}

export default ReactTouchHandler;
