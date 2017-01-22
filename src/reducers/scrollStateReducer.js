/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollStateReducer
 */

'use strict';

import IntegerBufferSet from 'IntegerBufferSet';
import ActionTypes from 'ActionTypes'
import isNil from 'lodash/isnil';
import {
  scrollBy,
  scrollEnd,
  scrollStart,
  scrollTo,
  updateRowCount,
  updateRowHeights,
  updateViewHeight,
} from 'scrollStateHelper';

const DEFAULT_STATE = {
  rowsCount: 0,
  rowHeightGetter: () => 0,
  storedHeights: [],
  viewportHeight: 0,
  rowOffsets: null, //PrefixIntervalTree
  scrollContentHeight: 0,
  rowHeights: {},
  rows: [], //rowsToRender
  bufferSet: new IntegerBufferSet(),
    
  viewportRowsBegin: 0,
  viewportRowsEnd: 0,
  firstRowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

function scrollStateReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      let { props } = action;

      state = updateRowCount(state, props);
      state = updateRowHeights(state, props);
      state = updateViewHeight(state, props);

      return state;

    case ActionTypes.PROP_CHANGE:
      //let { props } = action;
      //TODO (asif)
      return state;

    case ActionTypes.SCROLL_BY:
      let { deltaY } = action;
      state = scrollBy(state, deltaY);
      return state;

    case ActionTypes.SCROLL_END:
      return scrollEnd(state);

    case ActionTypes.SCROLL_START:
      return scrollStart(state);

    case ActionTypes.SCROLL_TO:
      let { scrollPosition } = action;
      state = scrollTo(state, scrollPosition);
      return state;

    default:
      return state;
  }
}

module.exports = scrollStateReducer;
