/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import { getApiDataSelector } from './apiData';
import { getApiMethodsSelector } from './apiMethods';
import shallowEqualSelector from '../helper/shallowEqualSelector';

/**
 * Factory to create a wrapper which exposes the API.
 * This is required because we want to maintain seperate API instances per FDT table instances, so as to facilitate caching and subscription per instance.
 */
const createApi = function () {
  // NOTE (pradeep): We provide subscription functionality so that plugin consumers can listen for API value changes
  let subscribers = [];

  // Keep track of the latest computed API values
  let apiValue = null;

  /**
   * Method to add a subscriber that listens to api value changes.
   * @param {Function} subscriber
   * @returns {Function}
   */
  const subscribe = (subscriber) => {
    subscribers = subscribers.concat(subscriber);

    // return a method which can be called to remove the subscriber
    return () => {
      const subcriberIndex = subscribers.indexOf(subscriber);
      subscribers.splice(subcriberIndex, 1);
    };
  };

  const getApiData = getApiDataSelector();
  const getApiMethods = getApiMethodsSelector();

  return {
    /**
     * Memoizer for calculating api value
     *
     * @param {Object} state
     */
    getValue: shallowEqualSelector(
      [
        (state) => getApiData(state),
        (state, actions) => getApiMethods(state, actions),
      ],
      (apiData, apiMethods) => {
        apiValue = {
          ...apiData,
          ...apiMethods,
          subscribe,
        };

        return apiValue;
      }
    ),

    /**
     * Notify all subscribers with the latest API value
     */
    notify: () => {
      subscribers.forEach((subscriber) => subscriber(apiValue));
    },
  };
};

export { createApi };
