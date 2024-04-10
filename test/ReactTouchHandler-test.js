/**
 * Copyright Schrodinger, LLC
 */
import { expect, jest } from '@jest/globals';
import ReactTouchHandler from '../src/ReactTouchHandler';
import * as requestAnimationFrame from '../src/vendor_upstream/core/requestAnimationFramePolyfill';

describe('ReactTouchHandler', function () {
  let mockRequestAnimationFramePolyfill;

  beforeEach(function () {
    // NOTE (pradeep): Call the callback passed to `setInterval` immediately.
    // This simplifies the tests by making them behave synchronous.
    jest
      .spyOn(globalThis, 'setInterval')
      .mockImplementation((callback) => callback());

    mockRequestAnimationFramePolyfill = jest
      .spyOn(requestAnimationFrame, 'default')
      .mockImplementation(() => undefined);
  });

  afterEach(function () {
    jest.restoreAllMocks();
  });

  describe('onTouchStart', function () {
    let fakeEvent;
    beforeEach(function () {
      ReactTouchHandler.prototype._track = jest.spyOn(
        ReactTouchHandler.prototype,
        '_track'
      );
      fakeEvent = {
        touches: [
          {
            pageX: 121,
            pageY: 312,
          },
        ],
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
    });

    it('should stop event propagation if flag is true', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        true
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.stopPropagation).toBeCalledTimes(1);
    });

    it('should not stop event propagation if flag is false', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.stopPropagation).not.toBeCalled();
    });

    // NOTE (pradeep): this ensures that mouse events like clicks still fire
    it('should not prevent default even if the flag is true', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        true,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.preventDefault).not.toBeCalledTimes(1);
    });

    it('should start new interval', function (done) {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchStart(fakeEvent);

      // --- Verify Expectations ---
      setTimeout(() => {
        expect(ReactTouchHandler.prototype._track).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('onTouchEnd', function () {
    let fakeEvent, clearIntervalSpy;

    beforeEach(function () {
      clearIntervalSpy = jest.spyOn(globalThis, 'clearInterval');
      fakeEvent = {
        touches: [
          {
            pageX: 121,
            pageY: 312,
          },
        ],
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
    });

    it('should stop event propagation if flag is true', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        true
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.stopPropagation).toBeCalledTimes(1);
    });

    it('should not stop event propagation if flag is false', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.stopPropagation).not.toBeCalledTimes(1);
    });

    // NOTE (pradeep): this ensures that mouse events like clicks still fire
    it('should not prevent default even if flag is true', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        true,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      expect(fakeEvent.preventDefault).not.toBeCalledTimes(1);
    });

    it('should clear last interval', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      expect(clearIntervalSpy).toBeCalledTimes(1);
    });

    it('Should start deceleration', function () {
      // --- Run Test ---
      const reactTouchHandler = new ReactTouchHandler(
        () => {},
        () => {},
        () => {},
        false,
        false
      );
      reactTouchHandler.onTouchEnd(fakeEvent);

      // --- Verify Expectations ---
      expect(mockRequestAnimationFramePolyfill).toBeCalledTimes(1);
    });
  });
});
