/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule config
 */
import shallowEqualSelector from 'shallowEqualSelector';

const DEFAULT_CONFIG = {
  keyboardConfig: {
    scrollAmplitude: 25,
  },
  // react touch handler already provides the default values
  touchConfig: {},
  // react wheel handler already provides the default values
  wheelConfig: {},
};

/**
 * Compute the necessary heights for rendering parts of the table
 *
 * @param {{
 *   keyboardScollAmplitude: number,
 *   touchAmplitude: number,
 *   touchDecelaration: number,
 *   touchDecelarationFactor: number,
 *   touchTimeout: number,
 *   wheelPixelAmplitude: number,
 *   wheelLineAmplitude: number,
 *   wheelPageAmplitude: number
 * }} config
 * @return {{
 *   keyboardConfig: {
 *     scrollAmplitude: number
 *   },
 *   touchConfig: {
 *     MOVE_AMPLITUDE: number,
 *     DECELERATION_AMPLITUDE: number,
 *     DECELERATION_FACTOR: number,
 *     TRACKER_TIMEOUT: number
 *   },
 *   wheelConfig: {
 *     PIXEL_STEP: number,
 *     LINE_HEIGHT: number,
 *     PAGE_HEIGHT: number
 *   }
 * }}
 */
function config(config) {
  const touchConfig = {
    MOVE_AMPLITUDE: config.touchAmplitude,
    DECELERATION_AMPLITUDE: config.touchDecelaration,
    DECELERATION_FACTOR: config.touchDecelarationFactor,
    TRACKER_TIMEOUT: config.touchTimeout,
  };

  const keyboardConfig = {
    scrollAmplitude: config.keyboardScollAmplitude,
  };

  const wheelConfig = {
    PIXEL_STEP: config.wheelPixelAmplitude,
    LINE_HEIGHT: config.wheelLineAmplitude,
    PAGE_HEIGHT: config.wheelPageAmplitude,
  };

  return _.merge({}, DEFAULT_CONFIG, {
    keyboardConfig,
    touchConfig,
    wheelConfig,
  });
}

export default shallowEqualSelector(state.config, config);
