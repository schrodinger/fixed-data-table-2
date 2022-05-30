/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import React from 'react';
import { getFixedDataTableApi } from './FixedDataTableApi';
import shallowEqualSelector from './helper/shallowEqualSelector';
import roughHeights from './selectors/roughHeights';

const FixedDataTableContext = React.createContext({});

/**
 * Factory to create FDT contexts.
 * This is required because we want to maintain seperate context instances per FDT table instances.
 */
const FixedDataTableContextFactory = function () {
  // NOTE (pradeep): We provide subscription functionality so that plugin consumers can listen for context value changes
  let subscribers = [];

  // Plugin Context's latest value
  let contextValue = null;

  /**
   * Add a subscriber that listens to context value changes.
   * @param {Function} subscriber
   * @returns
   */
  const subscribe = (subscriber) => {
    subscribers = subscribers.concat(subscriber);

    // return a method which can be called to remove the subscriber
    return () => {
      const subcriberIndex = subscribers.indexOf(subscriber);
      subscribers.splice(subcriberIndex, 1);
    };
  };

  return {
    /**
     * Memoizer for calculating plugin context value
     *
     * @param {Object} state
     */
    getValue: shallowEqualSelector(
      [
        (state) => state.maxScrollX,
        (state) => state.scrollX,
        (state) => state.tableSize.height,
        (state) => roughHeights(state).maxAvailableWidth,
        (state) => state.elementHeights.groupHeaderHeight,
        (state, actions) => getFixedDataTableApi(state, actions),
      ],
      (
        /*number*/ maxScrollX,
        /*number*/ scrollX,
        /*number*/ tableHeight,
        /*number*/ availableScrollWidth,
        /*number*/ groupHeaderHeight,
        fixedDataTableApi
      ) => {
        contextValue = {
          maxScrollX,
          scrollX,
          tableHeight,
          availableScrollWidth,
          groupHeaderExists: groupHeaderHeight > 0,
          ...fixedDataTableApi,
          subscribe,
        };

        return contextValue;
      }
    ),

    /**
     * Notify all subscribers with the latest context value
     */
    notify: () => {
      subscribers.forEach((subscriber) => subscriber(contextValue));
    },
  };
};

export { FixedDataTableContext, FixedDataTableContextFactory };
