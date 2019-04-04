/**
 * Copyright Schrodinger, LLC
 */

import React from 'react';
import ReactTouchHandler from '../src/ReactTouchHandler';
import sinon from 'sinon';
import { assert } from 'chai';
import { createRenderer, isElement } from 'react-addons-test-utils';

describe('ReactTouchHandler', function() {
  var clock, sandbox, requestAnimationFramePolyfillSpy;

  before(function () {
    clock = sinon.useFakeTimers();
    sandbox = sinon.sandbox.create();
  })

  after(function () {
    clock.restore();
  })

  beforeEach(function() {
    requestAnimationFramePolyfillSpy = sandbox.spy();
    ReactTouchHandler.__Rewire__('requestAnimationFramePolyfill', requestAnimationFramePolyfillSpy);
  });

  afterEach(function() {
    sandbox.restore();
    ReactTouchHandler.__ResetDependency__('requestAnimationFramePolyfill');
  });

  describe('onTouchStart', function() {
    var fakeEvent;
    beforeEach(function() {
      ReactTouchHandler.prototype._track = sandbox.spy();
      fakeEvent = {
        touches: [{
          pageX: 121,
          pageY: 312
        }],
        preventDefault: sandbox.spy(),
        stopPropagation: sandbox.spy()
      };
    });

    it('should stop event propagation if flag is true', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, true);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should not stop event propagation if flag is false', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, false);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should prevent default if flag is true', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, true, false);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.preventDefault.calledOnce);
    });

    it('should start new interval', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, false);
      reactTouchHandler.onTouchStart(fakeEvent);
      clock.tick(100);

      // --- Verify Expectations ---
      assert.isTrue(ReactTouchHandler.prototype._track.calledOnce);
    });
  });

  describe('onTouchEnd', function() {
    var fakeEvent, clearIntervalSpy;

    beforeEach(function() {
      clearIntervalSpy = sandbox.spy(global || window, 'clearInterval')
      fakeEvent = {
        touches: [{
          pageX: 121,
          pageY: 312
        }],
        preventDefault: sandbox.spy(),
        stopPropagation: sandbox.spy()
      };
    });

    afterEach(function() {

    });

    it('should stop event propagation if flag is true', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, true);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });


    it('should not stop event propagation if flag is false', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should prevent default if flag is true', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, true, false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.preventDefault.calledOnce);
    });

    it('should clear last interval', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(clearIntervalSpy.calledOnce);
    });

    it('Should start deceleration', function() {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false, false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(requestAnimationFramePolyfillSpy.calledOnce);
    });
  });
});
