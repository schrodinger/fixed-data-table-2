/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableStore
 */

'use strict';

import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

export default {
  get: () => configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      // Todo(deshpsuy): Have to disable immutableCheck because state has circular JSON somewhere in it. Need to investigate it.
      immutableCheck: false,
      serializableCheck: false,
    }),
  }),
};
