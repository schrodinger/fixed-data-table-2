/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnStateReducer
 */

'use strict';

import ActionTypes from 'ActionTypes'
import columnStateHelper from 'columnStateHelper'

const DEFAULT_STATE = {
  columnGroups: [],
  columns: [],
  isColumnReordering: false,
  columnReorderingData: {},
  isColumnResizing: false,
  columnResizingData: {},
  groupHeaderHeight: 0,
  maxScrollX: 0,
  horizontalScrollbarVisible: false,
  scrollX: 0,
  useGroupHeader: false,
};

function columnStateReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      let { props, columnData, useGroupHeader } = action;
      return columnStateHelper.initialize(state, props, columnData, useGroupHeader);
    case ActionTypes.PROP_CHANGE:
      const { newProps, columnData, useGroupHeader } = action;

      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props
      return columnStateHelper.initialize(state, newProps, columnData, useGroupHeader);
>>>>>>> upstream/v0.8.0-beta
    case ActionTypes.COLUMN_RESIZE:
      const { resizeData } = action;
      return columnStateHelper.resizeColumn(state, resizeData);
    case ActionTypes.COLUMN_REORDER:
      const { reorderData } = action;
      return columnStateHelper.reorderColumn(state, reorderData);
    case ActionTypes.COLUMN_REORDER_END:
      return Object.assign({}, state, {
        isColumnReordering: false,
        columnReorderingData: {}
      });
    case ActionTypes.COLUMN_REORDER_MOVE:
      const { deltaX } = action;
      return columnStateHelper.reorderColumnMove(state, deltaX);
    case ActionTypes.SCROLL_X:
      const { scrollX } = action;
      return Object.assign({}, state, {
        scrollX
      });
    default:
      return state;
  }
}

module.exports = columnStateReducer;
