/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnState
 */

'use strict';

import * as ActionTypes from 'ActionTypes'
import columnStateHelper from 'columnStateHelper'
import convertColumnElementsToData from 'convertColumnElementsToData';

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

function columnState(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE: {
      const { props } = action;
      const {
        columnGroups,
        elementTemplates,
        useGroupHeader,
      } = convertColumnElementsToData(props);

      return columnStateHelper.initialize(state, props, columnGroups, useGroupHeader, elementTemplates);
    }
    case ActionTypes.PROP_CHANGE: {
      const { newProps } = action;
      const {
        columnGroups,
        elementTemplates,
        useGroupHeader,
      } = convertColumnElementsToData(newProps);

      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props
      return columnStateHelper.initialize(state, newProps, columnGroups, useGroupHeader, elementTemplates);
    }
    case ActionTypes.COLUMN_RESIZE:
      const { resizeData } = action;
      return columnStateHelper.resizeColumn(state, resizeData);
    case ActionTypes.COLUMN_REORDER_START:
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
    case ActionTypes.SCROLL_TO_X:
      const { scrollX } = action;
      return Object.assign({}, state, {
        scrollX
      });
    default:
      return state;
  }
}

module.exports = columnState;
