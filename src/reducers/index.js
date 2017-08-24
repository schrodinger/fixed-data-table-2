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

import { computeRenderedRows, scrollTo, scrollToRow } from 'scrollStateHelper';
import * as ActionTypes from 'ActionTypes'
import IntegerBufferSet from 'IntegerBufferSet';
import PrefixIntervalTree from 'PrefixIntervalTree';
import columnStateHelper from 'columnStateHelper'
import convertColumnElementsToData from 'convertColumnElementsToData';
import pick from 'lodash/pick';
import shallowEqual from 'shallowEqual';

/**
 * Input state set from props
 */
const DEFAULT_INPUT_STATE = {
  bufferRowCount: null,
  columnGroups: [],
  elementTemplates: {
    cell: [],
    footer: [],
    groupHeader: [],
    header: [],
  },
  footerHeight: 0,
  groupHeaderHeight: 0,
  headerHeight: 0,
  height: undefined,
  maxHeight: 0,
  rowHeight: 0,
  rowHeightGetter: () => 0,
  rowsCount: 0,
  subRowHeight: 0,
  subRowHeightGetter: () => 0,
  width: 0,
  useGroupHeader: false,
};

/**
 * Output state passed as props to the the rendered FixedDataTable
 * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
 */
const DEFAULT_OUTPUT_STATE = {
  columnReorderingData: {},
  columnResizingData: {},
  firstRowIndex: 0,
  firstRowOffset: 0,
  isColumnReordering: false,
  isColumnResizing: false,
  maxScrollX: 0,
  maxScrollY: 0,
  rowHeights: {},
  rows: [], // rowsToRender
  scrollContentHeight: 0,
  scrollX: 0,
  scrollY: 0,
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

function reducers(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE: {
      const { props } = action;

      let newState = setStateFromProps(state, props);
      newState = columnStateHelper.initialize(newState, props, {});
      newState = initializeRowHeights(newState);
      const scrollAnchor = getScrollAnchor(newState, props);
      return computeRenderedRows(newState, scrollAnchor);
    }
    case ActionTypes.PROP_CHANGE: {
      const { newProps, oldProps } = action;
      let newState = setStateFromProps(state, newProps);
      newState = columnStateHelper.initialize(newState, newProps, oldProps);

      if (oldProps.rowsCount !== newProps.rowsCount ||
          oldProps.rowHeight !== newProps.rowHeight ||
          oldProps.subRowHeight !== newProps.subRowHeight) {
        newState = initializeRowHeights(newState);
      }

      if (oldProps.rowsCount !== newProps.rowsCount) {
        // NOTE (jordan) bad practice to modify state directly, but okay since
        // we know setStateFromProps clones state internally
        newState.bufferSet = new IntegerBufferSet();
      }

      const scrollAnchor = getScrollAnchor(newState, newProps, oldProps);

      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, newState) || scrollAnchor.changed) {
        newState = computeRenderedRows(newState, scrollAnchor);
      }

      // TODO REDUX_MIGRATION solve w/ evil-diff
      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props
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
    case ActionTypes.COLUMN_RESIZE: {
      const { resizeData } = action;
      return columnStateHelper.resizeColumn(state, resizeData);
    }
    case ActionTypes.COLUMN_REORDER_START: {
      const { reorderData } = action;
      return columnStateHelper.reorderColumn(state, reorderData);
    }
    case ActionTypes.COLUMN_REORDER_END: {
      return Object.assign({}, state, {
        isColumnReordering: false,
        columnReorderingData: {}
      });
    }
    case ActionTypes.COLUMN_REORDER_MOVE: {
      const { deltaX } = action;
      return columnStateHelper.reorderColumnMove(state, deltaX);
    }
    case ActionTypes.SCROLL_TO_X: {
      const { scrollX } = action;
      return Object.assign({}, state, {
        scrollX,
      });
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
      newProps.scrollToRow !== null &&
      (!oldProps || newProps.scrollToRow !== oldProps.scrollToRow)) {
    return scrollToRow(state, newProps.scrollToRow);
  }

  if (newProps.scrollTop !== undefined &&
      newProps.scrollTop !== null &&
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
    subRowHeight,
  } = state;

  const defaultFullRowHeight = rowHeight + subRowHeight;
  const rowOffsets = PrefixIntervalTree.uniform(rowsCount, defaultFullRowHeight);
  const scrollContentHeight = rowsCount * defaultFullRowHeight;
  const storedHeights = new Array(rowsCount);
  for (let idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = defaultFullRowHeight;
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
    'bufferRowCount',
    'footerHeight',
    'groupHeaderHeight',
    'headerHeight',
    'height',
    'maxHeight',
    'overflowX',
    'ownerHeight',
    'rowHeight',
    'rowHeightGetter',
    'rowsCount',
    'showScrollbarX',
    'subRowHeight',
    'subRowHeightGetter',
    'width',
  ]);

  const {
    columnGroups,
    elementTemplates,
    useGroupHeader,
  } = convertColumnElementsToData(props);

  const { rowHeight, subRowHeight } = props;
  return Object.assign({}, state, {
    columnGroups,
    elementTemplates,
    rowHeightGetter: () => rowHeight,
    subRowHeightGetter: () => subRowHeight || 0,
    useGroupHeader
  }, propsToState);
}

module.exports = reducers;
