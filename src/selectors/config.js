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
import defaultsDeep from 'lodash/defaultsDeep';
import shallowEqualSelector from 'shallowEqualSelector';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';
import set from 'lodash/set';

const DEFAULT_CONFIG = {
  keyboardConfig: {
    scrollAmplitude: 25,
  },
  // react touch handler already provides some of the default values
  touchConfig: {
    threshold: (t) => Math.round(t) === 0,
    DECELERATION_THRESHOLD: 5,
  },
  // react wheel handler already provides some of the default values
  wheelConfig: {
    baseFactor: 1,
    threshold: (t) => Math.round(t) === 0,
  },
};

/**
 * Compute the necessary heights for rendering parts of the table
 *
 * @param {{
 *   keyboardScrollAmplitude: number,
 *   touchAmplitude: number,
 *   touchDeceleration: number,
 *   touchDecelerationFactor: number,
 *   touchDecelerationThreshold: number,
 *   touchThreshold: number|function(threshold: number),
 *   touchTimeout: number,
 *   wheelBaseFactor: number,
 *   wheelLineAmplitude: number,
 *   wheelPageAmplitude: number
 *   wheelPixelAmplitude: number,
 *   wheelThreshold: number
 * }} config
 * @return {{
 *   keyboardConfig: {
 *     scrollAmplitude: number
 *   },
 *   touchConfig: {
 *     MOVE_AMPLITUDE: number,
 *     DECELERATION_AMPLITUDE: number,
 *     DECELERATION_FACTOR: number,
 *     DECELERATION_THRESHOLD: number,
 *     TRACKER_TIMEOUT: number,
 *     threshold: number
 *   },
 *   wheelConfig: {
 *     LINE_HEIGHT: number,
 *     PAGE_HEIGHT: number,
 *     PIXEL_STEP: number,
 *     baseFactor: number,
 *     threshold: number
 *   }
 * }}
 */
function getConfig(config) {
  const touchConfig = {
    MOVE_AMPLITUDE: config.touchAmplitude,
    DECELERATION_AMPLITUDE: config.touchDeceleration,
    DECELERATION_FACTOR: config.touchDecelerationFactor,
    DECELERATION_THRESHOLD: config.touchDecelerationThreshold,
    TRACKER_TIMEOUT: config.touchTimeout,
    threshold: config.touchThreshold,
  };

  const keyboardConfig = {
    scrollAmplitude: config.keyboardScrollAmplitude,
  };

  const wheelConfig = {
    PIXEL_STEP: config.wheelPixelAmplitude,
    LINE_HEIGHT: config.wheelLineAmplitude,
    PAGE_HEIGHT: config.wheelPageAmplitude,
    baseFactor: config.wheelBaseFactor,
    threshold: config.wheelThreshold,
  };

  const configMap = defaultsDeep({
    keyboardConfig,
    touchConfig,
    wheelConfig,
  }, DEFAULT_CONFIG);

  // NOTE: this only works for the first level of properties in the argument, and they must be objects.
  const removeUndefinedProps = (obj) => reduce(obj, (result, value, key) =>
    set(result, [key], omitBy(value, isUndefined)), {});

  return removeUndefinedProps(configMap);
}

export default shallowEqualSelector([(state) => state.config], getConfig);
