/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollState
 */

'use strict';

import IntegerBufferSet from 'IntegerBufferSet';
import * as ActionTypes from 'ActionTypes'
import isNil from 'lodash/isNil';
import {
  scrollBy,
  scrollEnd,
  scrollStart,
  scrollTo,
  scrollToRow,
  updateRowCount,
  updateRowHeights,
  updateViewHeight,
  updateVisibleRows
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

function scrollState(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      let { props } = action;
      state = updateRowCount(state, props);
      state = updateRowHeights(state, props);
      state = updateViewHeight(state, props);

      if (props.scrollTop) {
        state = scrollTo(state, props.scrollTop);
      }

      if (props.scrollToRow) {
        state = scrollToRow(state, props.scrollToRow);
      }


      state = updateVisibleRows(state);

      return state;

    case ActionTypes.PROP_CHANGE:
      let { newProps, oldProps } = action;

      if (newProps.scrollTop && newProps.scrollTop !== oldProps.scrollTop) {
        state = scrollTo(state, newProps.scrollTop);
        state = updateVisibleRows(state);
      }

      if (newProps.scrollToRow && newProps.scrollToRow !== oldProps.scrollToRow) {
        state = scrollToRow(state, newProps.scrollToRow);
        state = updateVisibleRows(state);
      }

      return state;
    case ActionTypes.SCROLL_DELTA_Y:
      let { deltaY } = action;

      var state = scrollBy(state, deltaY);
      state = updateVisibleRows(state);

      return state;

    case ActionTypes.SCROLL_END:

      var state = scrollEnd(state);
      state = updateVisibleRows(state);

      return state;

    case ActionTypes.SCROLL_START:

      var state = scrollStart(state);
      state = updateVisibleRows(state);

      return state;

    case ActionTypes.SCROLL_TO_Y:
      let { scrollY } = action;

      var state = scrollTo(state, scrollY);
      state = updateVisibleRows(state);

      return state;

    default:
      return state;
  }
}

module.exports = scrollState;
