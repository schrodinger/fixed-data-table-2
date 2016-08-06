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
import PrefixIntervalTree from 'PrefixIntervalTree';
import scrollHelper from './scrollHelper';

const DEFAULT_STATE = {
  firstRowIndex: 0,
  firstRowOffset: 0,
  scrollY: 0,
  scrollContentHeight: 0,
  maxScrollY: 0
};

const NO_ROWS_SCROLL_RESULT = {
  rowIndex: 0,
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

      var viewportHeight =
        (props.height === undefined ? props.maxHeight : props.height) -
        (props.headerHeight || 0) -
        (props.footerHeight || 0) -
        (props.groupHeaderHeight || 0);

      let { rowsCount, rowHeight, rowHeightGetter, viewportHeight } = props;

      let storedHeights = new Array(rowsCount);
      for (var i = 0; i < rowsCount; i++) {
        storedHeights[i] = rowHeight;
      }

      let newState = Object.assign({}, state, {
        rowOffsets: PrefixIntervalTree.uniform(rowsCount, rowHeight),
        storedHeights: storedHeights,
        rowsCount: rowsCount,
        position: 0,
        scrollContentHeight: rowsCount * rowHeight,
        rowHeight: rowHeight,
        rowHeightGetter: rowHeightGetter ?  rowHeightGetter : () => rowHeight,
        viewportHeight: viewportHeight,
      });

      scrollHelper.updateHeightsInViewport(newState, 0, 0);

      return newState;
    case ActionTypes.VERTICAL_SCROLL: 
      let { deltaY } = action;
      return scrollHelper.scrollBy(state, deltaY);
    default:
      return state;
  }
}

module.exports = scroller;
