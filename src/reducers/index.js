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

import clone from 'lodash/clone';
import pick from 'lodash/pick';

import IntegerBufferSet from '../vendor_upstream/struct/IntegerBufferSet';
import PrefixIntervalTree from '../vendor_upstream/struct/PrefixIntervalTree';
import shallowEqual from '../vendor_upstream/core/shallowEqual';

import convertColumnElementsToData from '../helper/convertColumnElementsToData';
import { getScrollAnchor, scrollTo } from './scrollAnchor';
import columnStateHelper from './columnStateHelper';
import computeRenderedRows from './computeRenderedRows';
import Scrollbar from '../plugins/Scrollbar';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Returns the default initial state for the redux store.
 * This must be a brand new, independent object for each table instance
 * or issues may occur due to multiple tables sharing data.
 *
 * @return {!Object}
 */
function getInitialState() {
  return {
    /*
     * Input state set from props
     */
    columnProps: [],
    columnGroupProps: [],
    elementTemplates: {
      cell: [],
      footer: [],
      groupHeader: [],
      header: [],
    },
    elementHeights: {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
    },
    propsRevision: null,
    rowSettings: {
      bufferRowCount: undefined,
      rowAttributesGetter: undefined,
      rowHeight: 0,
      rowHeightGetter: () => 0,
      rowsCount: 0,
      subRowHeight: 0,
      subRowHeightGetter: () => 0,
    },
    scrollFlags: {
      overflowX: 'auto',
      overflowY: 'auto',
      showScrollbarX: true,
      showScrollbarY: true,
    },
    tableSize: {
      height: undefined,
      maxHeight: 0,
      ownerHeight: undefined,
      useMaxHeight: false,
      width: 0,
    },

    /*
     * Output state passed as props to the the rendered FixedDataTable
     * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
     */
    firstRowIndex: 0,
    firstRowOffset: 0,
    maxScrollX: 0,
    maxScrollY: 0,
    rowOffsets: {},
    rows: [], // rowsToRender
    scrollContentHeight: 0,
    scrollX: 0,
    scrollbarXHeight: Scrollbar.SIZE,
    scrollY: 0,
    scrollbarYWidth: Scrollbar.SIZE,
    scrolling: false,

    /*
     * Internal state only used by this file
     * NOTE (jordan) internal state is altered in place
     * so don't trust it for redux history or immutability checks
     * TODO (jordan) investigate if we want to move this to local or scoped state
     */
    rowBufferSet: new IntegerBufferSet(),
    storedHeights: [],
    rowOffsetIntervalTree: null, // PrefixIntervalTree
  };
}

const slice = createSlice({
  name: 'FDT',
  /*
   * NOTE (pradeep, wcjordan): The initial state will be populated through the `initialize` reducer.
   * We can't preset the state using the `initialState` field because we need a brand new, independent object
   * for each table instance, or issues may occur due to multiple tables sharing data (see #369 for an example)
   */
  initialState: {},
  reducers: {
    initialize(state, action) {
      const props = action.payload;

      Object.assign(state, getInitialState());
      setStateFromProps(state, props);
      initializeRowHeightsAndOffsets(state);
      const scrollAnchor = getScrollAnchor(state, props);
      computeRenderedRows(state, scrollAnchor);
      columnStateHelper.initialize(state, props, {});
    },
    propChange(state, action) {
      const { newProps, oldProps } = action.payload;
      const oldState = clone(state);
      setStateFromProps(state, newProps);

      if (
        oldProps.rowsCount !== newProps.rowsCount ||
        oldProps.rowHeight !== newProps.rowHeight ||
        oldProps.subRowHeight !== newProps.subRowHeight
      ) {
        initializeRowHeightsAndOffsets(state);
      }

      if (oldProps.rowsCount !== newProps.rowsCount) {
        state.rowBufferSet = new IntegerBufferSet();
      }

      const scrollAnchor = getScrollAnchor(state, newProps, oldProps);

      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, oldState) || scrollAnchor.changed) {
        computeRenderedRows(state, scrollAnchor);
      }

      columnStateHelper.initialize(state, newProps, oldProps);

      // if scroll values have changed, then we're scrolling!
      if (
        state.scrollX !== oldState.scrollX ||
        state.scrollY !== oldState.scrollY
      ) {
        state.scrolling = state.scrolling || true;
      }

      // TODO REDUX_MIGRATION solve w/ evil-diff
      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props
    },
    scrollEnd(state) {
      state.scrolling = false;
      const previousScrollAnchor = {
        firstIndex: state.firstRowIndex,
        firstOffset: state.firstRowOffset,
        lastIndex: state.lastIndex,
      };
      computeRenderedRows(state, previousScrollAnchor);
    },
    scrollToY(state, action) {
      const scrollY = action.payload;
      state.scrolling = true;
      const scrollAnchor = scrollTo(state, scrollY);
      computeRenderedRows(state, scrollAnchor);
    },
    scrollToX(state, action) {
      const scrollX = action.payload;
      state.scrolling = true;
      state.scrollX = scrollX;
    },
  },
});

/**
 * Initialize row heights (storedHeights) & offsets based on the default rowHeight
 *
 * @param {!Object} state
 * @private
 */
function initializeRowHeightsAndOffsets(state) {
  const { rowHeight, rowsCount, subRowHeight } = state.rowSettings;
  const defaultFullRowHeight = rowHeight + subRowHeight;
  const rowOffsetIntervalTree = PrefixIntervalTree.uniform(
    rowsCount,
    defaultFullRowHeight
  );
  const scrollContentHeight = rowsCount * defaultFullRowHeight;
  const storedHeights = new Array(rowsCount);
  for (let idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = defaultFullRowHeight;
  }
  Object.assign(state, {
    rowOffsetIntervalTree,
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
  const { columnGroupProps, columnProps, elementTemplates, useGroupHeader } =
    convertColumnElementsToData(props.children);

  Object.assign(state, {
    columnGroupProps,
    columnProps,
    elementTemplates,
    propsRevision: state.propsRevision + 1,
  });

  state.elementHeights = Object.assign(
    {},
    state.elementHeights,
    pick(props, [
      'cellGroupWrapperHeight',
      'footerHeight',
      'groupHeaderHeight',
      'headerHeight',
    ])
  );
  if (!useGroupHeader) {
    state.elementHeights.groupHeaderHeight = 0;
  }

  state.rowSettings = Object.assign(
    {},
    state.rowSettings,
    pick(props, ['bufferRowCount', 'rowHeight', 'rowsCount', 'subRowHeight'])
  );
  const { rowHeight, subRowHeight } = state.rowSettings;
  state.rowSettings.rowHeightGetter =
    props.rowHeightGetter || (() => rowHeight);
  state.rowSettings.subRowHeightGetter =
    props.subRowHeightGetter || (() => subRowHeight || 0);
  state.rowSettings.rowAttributesGetter = props.rowAttributesGetter;

  state.scrollFlags = Object.assign(
    {},
    state.scrollFlags,
    pick(props, ['overflowX', 'overflowY', 'showScrollbarX', 'showScrollbarY'])
  );

  state.tableSize = Object.assign(
    {},
    state.tableSize,
    pick(props, ['height', 'maxHeight', 'ownerHeight', 'width'])
  );
  state.tableSize.useMaxHeight = state.tableSize.height === undefined;

  state.scrollbarXHeight = props.scrollbarXHeight;
  state.scrollbarYWidth = props.scrollbarYWidth;
}

const { reducer, actions } = slice;
export const { initialize, propChange, scrollEnd, scrollToX, scrollToY } =
  actions;
export default reducer;
