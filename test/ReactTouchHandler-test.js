/**
 * Copyright Schrodinger, LLC
 */
import ReactTouchHandler from '../src/ReactTouchHandler';
import sinon from 'sinon';
import { assert } from 'chai';

describe('ReactTouchHandler', function () {
  var requestAnimationFramePolyfillSpy;

  beforeEach(function () {
    requestAnimationFramePolyfillSpy = sinon.spy();
    ReactTouchHandler.__Rewire__(
      'requestAnimationFramePolyfill',
      requestAnimationFramePolyfillSpy
    );
  });

  afterEach(function () {
    sinon.restore();
    ReactTouchHandler.__ResetDependency__('requestAnimationFramePolyfill');
  });

  describe('onTouchStart', function () {
    var fakeEvent;
    beforeEach(function () {
      ReactTouchHandler.prototype._track = sinon.spy();
      fakeEvent = {
        touches: [
          {
            pageX: 121,
            pageY: 312,
          },
        ],
        preventDefault: sinon.spy(),
        stopPropagation: sinon.spy(),
      };
    });

    it('should stop event propagation if flag is true', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        true
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should not stop event propagation if flag is false', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should prevent default if flag is true', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        true,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.preventDefault.calledOnce);
    });

    it('should start new interval', function () {
      const clock = sinon.useFakeTimers();

      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);
      clock.tick(100);

      // --- Verify Expectations ---
      assert.isTrue(ReactTouchHandler.prototype._track.calledOnce);
    });
  });

  describe('onTouchEnd', function () {
    var fakeEvent, clearIntervalSpy;

    beforeEach(function () {
      clearIntervalSpy = sinon.spy(global || window, 'clearInterval');
      fakeEvent = {
        touches: [
          {
            pageX: 121,
            pageY: 312,
          },
        ],
        preventDefault: sinon.spy(),
        stopPropagation: sinon.spy(),
      };
    });

    it('should stop event propagation if flag is true', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        true
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.stopPropagation.calledOnce);
    });

    it('should not stop event propagation if flag is false', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isFalse(fakeEvent.stopPropagation.called);
    });

    it('should prevent default if flag is true', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        true,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(fakeEvent.preventDefault.calledOnce);
    });

    it('should clear last interval', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(clearIntervalSpy.calledOnce);
    });

    it('Should start deceleration', function () {
      // --- Run Test ---
      var reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      assert.isTrue(requestAnimationFramePolyfillSpy.calledOnce);
    });
  });
});
