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

import ActionTypes from 'ActionTypes'
import scrollStateHelper from 'scrollStateHelper';

const DEFAULT_STATE = {
  firstRowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

function scrollStateReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.PROP_CHANGE:
      let { props } = action;

      if (props.rowsCount === state.rowsCount && props.rowHeight === state.rowHeight) {
        return state;
      }

      //TODO (asif) reinitalize when viewheight changes
      return scrollStateHelper.initialize(state, props);
    case ActionTypes.SCROLL_BY:
      let { deltaY } = action;
      state = scrollStateHelper.scrollBy(state, deltaY);
      return state;
    case ActionTypes.SCROLL_END:
      return scrollStateHelper.scrollEnd(state);
    case ActionTypes.SCROLL_START:
      return scrollStateHelper.scrollStart(state);
    case ActionTypes.SCROLL_TO:
      let { scrollPosition } = action;
      state = scrollStateHelper.scrollTo(state, scrollPosition);
      return state;
    default:
      return state;
  }
}

module.exports = scrollStateReducer;
