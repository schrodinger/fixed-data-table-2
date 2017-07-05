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

import { computeRenderedRows, scrollTo, scrollToRow } from 'scrollStateHelper';
import * as ActionTypes from 'ActionTypes'
import IntegerBufferSet from 'IntegerBufferSet';
import PrefixIntervalTree from 'PrefixIntervalTree';
import pick from 'lodash/pick';
import shallowEqual from 'shallowEqual';

/**
 * Input state set from props
 */
const DEFAULT_INPUT_STATE = {
  footerHeight: 0,
  groupHeaderHeight: 0,
  headerHeight: 0,
  height: 0,
  maxHeight: 0,
  rowHeight: 0,
  rowHeightGetter: () => 0,
  rowsCount: 0,
};

/**
 * Output state passed as props to the the rendered FixedDataTable
 * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
 */
const DEFAULT_OUTPUT_STATE = {
  firstRowIndex: 0,
  firstRowOffset: 0,
  rowHeights: {},
  rows: [], // rowsToRender
  scrollContentHeight: 0,
  scrollY: 0,
  maxScrollY: 0,
};

/**
 * Internal state only used by this file
 * NOTE (jordan) internal state is altered in place
 * so don't trust it for redux history or immutability checks
 * TODO (jordan) investigate if we want to move this to local or scoped state
 */
const DEFAULT_INTERNAL_STATE = {
  bufferSet: new IntegerBufferSet(),
  storedHeights: [],
  rowOffsets: null, // PrefixIntervalTree
};

const DEFAULT_STATE = Object.assign({},
  DEFAULT_INPUT_STATE,
  DEFAULT_OUTPUT_STATE,
  DEFAULT_INTERNAL_STATE);

function scrollState(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE: {
      const { props } = action;
      let newState = setStateFromProps(state, props);
      newState = initializeRowHeights(newState);
      const scrollAnchor = getScrollAnchor(state, props);
      return computeRenderedRows(newState, scrollAnchor);
    }
    case ActionTypes.PROP_CHANGE: {
      const { newProps, oldProps } = action;
      let newState = setStateFromProps(state, newProps);

      if (oldProps.rowsCount !== newProps.rowsCount ||
          oldProps.rowHeight !== newProps.rowHeight) {
        newState = initializeRowHeights(newState);
      }

      if (oldProps.rowsCount !== newProps.rowsCount) {
        // NOTE (jordan) bad practice to modify state directly, but okay since
        // we know setStateFromProps clones state internally
        newState.bufferSet = new IntegerBufferSet();
      }

      const scrollAnchor = getScrollAnchor(state, newProps, oldProps);

      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, newState) || scrollAnchor.changed) {
        newState = computeRenderedRows(newState, scrollAnchor);
      }

      return newState;
    }
    case ActionTypes.SCROLL_END: {
      return Object.assign({}, state, {
        scrolling: false,
      });
    }
    case ActionTypes.SCROLL_START: {
      return Object.assign({}, state, {
        scrolling: true,
      });
    }
    case ActionTypes.SCROLL_TO_Y: {
      let { scrollY } = action;

      const scrollAnchor = scrollTo(state, scrollY);
      return computeRenderedRows(state, scrollAnchor);
    }
    default: {
      return state;
    }
  }
}

/**
 * Get the anchor for scrolling.
 * This will either be the first row's index and an offset, or the last row's index.
 * We also pass a flag indicating if the anchor has changed from the state
 *
 * @param {!Object} state
 * @param {!Object} newProps
 * @param {!Object} oldProps
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 * @private
 */
function getScrollAnchor(state, newProps, oldProps) {
  if (newProps.scrollToRow !== undefined &&
      (!oldProps || newProps.scrollToRow !== oldProps.scrollToRow)) {
    return scrollToRow(state, newProps.scrollToRow);
  }

  if (newProps.scrollTop !== undefined &&
      (!oldProps || newProps.scrollTop !== oldProps.scrollTop)) {
    return scrollTo(state, newProps.scrollTop);
  }

  return {
    firstIndex: state.firstRowIndex,
    firstOffset: state.firstRowOffset,
    lastIndex: undefined,
    changed: false,
  }
}

/**
 * Initialize row heights (storedHeights) & offsets based on the default rowHeight
 *
 * @param {!Object} state
 * @private
 */
function initializeRowHeights(state) {
  const {
    rowHeight,
    rowsCount,
  } = state;

  const rowOffsets = PrefixIntervalTree.uniform(rowsCount, rowHeight);
  const scrollContentHeight = rowsCount * rowHeight;
  const storedHeights = new Array(rowsCount);
  for (let idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = rowHeight;
  }
  return Object.assign({}, state, {
    rowOffsets,
    scrollContentHeight,
    storedHeights,
  });
}

/**
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 * @private
 */
function setStateFromProps(state, props) {
  const propsToState = pick(props, [
    'footerHeight',
    'groupHeaderHeight',
    'headerHeight',
    'height',
    'maxHeight',
    'rowHeight',
    'rowHeightGetter',
    'rowsCount',
  ]);
  const rowHeight = props.rowHeight;
  return Object.assign({}, state, {
     rowHeightGetter: () => rowHeight,
  }, propsToState);
}

module.exports = scrollState;
