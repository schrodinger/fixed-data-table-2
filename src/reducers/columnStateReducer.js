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
  columns: [],
  columnGroups: undefined,
  columnInfo: {
    bodyFixedColumns: [],
    bodyScrollableColumns: [],
    headFixedColumns: [],
    headScrollableColumns: [],
    footFixedColumns: [],
    footScrollableColumns: [],
    groupHeaderFixedColumns: [],
    groupHeaderScrollableColumns: [],
  },
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
    case ActionTypes.PROP_CHANGE:
    case ActionTypes.INITIALIZE:
      let { props } = action;

      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // if () {
      //   return state;
      // }

      return columnStateHelper.initialize(state, props);
    case ActionTypes.COLUMN_RESIZE:
      let { resizeData } = action;
      return columnStateHelper.resizeColumn(state, resizeData);
    case ActionTypes.COLUMN_REORDER:
      let { reorderData } = action;
      return columnStateHelper.reorderColumn(state, reorderData);
    case ActionTypes.COLUMN_REORDER_END:
      return Object.assign({}, state, {
        isColumnReordering: false,
        columnReorderingData: {}
      });
    case ActionTypes.COLUMN_REORDER_MOVE:
      let { deltaX } = action;
      return columnStateHelper.reorderColumnMove(state, deltaX);
    case ActionTypes.SCROLL_X:
      let { scrollX } = action;
      return Object.assign({}, state, {
        scrollX
      });
    default:
      return state;
  }
}

module.exports = columnStateReducer;
