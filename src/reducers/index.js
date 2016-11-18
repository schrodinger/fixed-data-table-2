/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reducers
 */

'use strict';

import columnStateReducer from 'columnStateReducer';
import { combineReducers } from 'redux';
import scroller from 'scroller';

const reducers = combineReducers({
  columnState: columnStateReducer,
  scroller
});

module.exports = reducers;
