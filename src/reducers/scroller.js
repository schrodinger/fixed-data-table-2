/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scroller
 */

'use strict';

import ActionTypes from 'ActionTypes'
import scrollHelper from './scrollHelper';

const DEFAULT_STATE = {
  firstRowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

function scroller(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.PROP_CHANGE:
      let { props } = action;

      if (props.rowsCount === state.rowsCount && props.rowHeight === state.rowHeight) {
        return state;
      }

      //TODO (asif) reinitalize when viewheight changes
      return scrollHelper.initialize(state, props);
    case ActionTypes.SCROLL_BY:
      let { deltaY } = action;
      state = scrollHelper.scrollBy(state, deltaY);
      return state;
    case ActionTypes.SCROLL_END:
      return scrollHelper.scrollEnd(state);
    case ActionTypes.SCROLL_START:
      return scrollHelper.scrollStart(state);
    case ActionTypes.SCROLL_TO:
      let { scrollPosition } = action;
      state = scrollHelper.scrollTo(state, scrollPosition);
      return state;
    default:
      return state;
  }
}

module.exports = scroller;
