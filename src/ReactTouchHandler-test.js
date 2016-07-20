/**
 * Copyright Schrodinger, LLC
 */

import React from 'react';
import ReactTouchHandler from './ReactTouchHandler';
import sinon from 'sinon';
import { assert } from 'chai';
import { createRenderer, isElement } from 'react-addons-test-utils';

describe('ReactTouchHandler', function() {
  var clock, sandbox, requestAnimationFramePolyfillSpy;

  before(function () {
    clock = sinon.useFakeTimers();
  })

  after(function () {
    clock.restore();
  })

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    requestAnimationFramePolyfillSpy = sandbox.spy();
    ReactTouchHandler.__Rewire__('requestAnimationFramePolyfill', requestAnimationFramePolyfillSpy);
  });
  
  afterEach(function() {
    sandbox.restore();
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
        stopPropagation: sandbox.spy()
      };
    });

    it('should stop event propagation if flag is true', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, true);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should stop event propagation if function returns true', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => true);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should not stop event propagation if flag is false', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should not stop event propagation if function returns false', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => false);
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should start new interval', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => false);
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
        stopPropagation: sandbox.spy()
      };
    });

    afterEach(function() {

    });

    it('should stop event propagation if flag is true', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, true);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should stop event propagation if function returns true', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => true);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should not stop event propagation if flag is false', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should not stop event propagation if function returns false', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should clear last interval', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(clearIntervalSpy.calledOnce);
    });

    it('Should start deceleration', function() {
      // --- Run Test --- 
      var reactTouchHandler = new ReactTouchHandler(() => {}, () => {}, () => {}, () => false);
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(requestAnimationFramePolyfillSpy.calledOnce);
    });
  });
});

