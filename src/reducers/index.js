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

import pick from 'lodash/pick';

import IntegerBufferSet from '../vendor_upstream/struct/IntegerBufferSet';
import PrefixIntervalTree from '../vendor_upstream/struct/PrefixIntervalTree';
import shallowEqual from '../vendor_upstream/core/shallowEqual';

import convertColumnElementsToData from '../helper/convertColumnElementsToData';
import { getScrollAnchor, scrollTo } from './scrollAnchor';
import { getColumnAnchor, scrollToX as scrollToXAnchor } from './columnAnchor';
import computeRenderedRows from './computeRenderedRows';
import Scrollbar from '../plugins/Scrollbar';
import { createSlice } from '@reduxjs/toolkit';
import computeRenderedCols from './computeRenderedCols';
import { initializeFlexColumnWidths } from './flexColumnWidths';
import clamp from 'lodash/clamp';

// NOTE (pradeep): Custom class objects are ignored by immer. (see https://immerjs.github.io/immer/complex-objects/)
// We wrap our non-user defined structures from "internal" state into these wrapper classes so that immer
// will skip it entirely while drafting the state.
// An example is `storedHeights`, which is a simple array of row heights typically containing millions of entries.
// Having this drafted by immer for every scroll reduces performance.
function ArrayWrapper(...args) {
  this.array = new Array(...args);
}
function ObjectWrapper(...args) {
  this.object = new Object(...args);
}

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
    rowSettings: {
      bufferRowCount: undefined,
      rowAttributesGetter: undefined,
      rowHeight: 0,
      rowHeightGetter: () => 0,
      rowsCount: 0,
      subRowHeight: 0,
      subRowHeightGetter: () => 0,
    },
    columnSettings: {
      defaultColumnWidth: 100,
      bufferColCount: undefined,
      fixedColumnsCount: 0,
      fixedRightColumnsCount: 0,
      scrollableColumnsCount: 0,
      getColumnGroup: () => {},
      getFixedColumn: () => {},
      getFixedRightColumn: () => {},
      getScrollableColumn: () => {},
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
      maxWidth: 0,
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
    firstColumnIndex: 0,
    firstColumnOffset: 0,
    maxScrollX: 0,
    maxScrollY: 0,
    rowOffsets: {},
    columnOffsets: {},
    columnGroupOffsets: {},
    fixedColumnOffsets: {},
    fixedRightColumnOffsets: {},
    rows: [], // rowsToRender - indexes of rows to be rendered
    columnsToRender: [], // indexes of columns to be rendered
    columnGroupsToRender: [],
    fixedColumnsToRender: [],
    fixedRightColumnsToRender: [],
    scrollContentHeight: 0,
    scrollContentWidth: 0,
    fixedColumnsWidth: 0,
    fixedRightColumnsWidth: 0,
    fixedContentWidth: 0,
    scrollX: 0,
    scrollbarXHeight: Scrollbar.SIZE,
    scrollY: 0,
    scrollbarYWidth: Scrollbar.SIZE,
    scrolling: false,
    scrollingX: false,
    scrollableColumns: {}, // we use a sparse object to represent the currently required set of columns
    fixedColumns: [],
    fixedRightColumns: [],

    /*
     * Internal state only used by this file
     * NOTE (jordan) internal state is altered in place
     * so don't trust it for redux history or immutability checks
     * TODO (jordan) investigate if we want to move this to local or scoped state
     */
    rowBufferSet: new IntegerBufferSet(), // virtualized positions of rows
    colBufferSet: new IntegerBufferSet(), // virtualized positions of columns
    storedHeights: new ArrayWrapper(), // heights of each row computed lazily
    storedWidths: new ObjectWrapper(), // widths of each column computed lazily
    storedScrollableColumns: new ObjectWrapper(), // virtualized column objects
    rowOffsetIntervalTree: null, // PrefixIntervalTree to calculate offsets of columns efficiently
    colOffsetIntervalTree: null, // PrefixIntervalTree to calculate offsets of columns efficiently
    cachedColumnsToRender: new ArrayWrapper(), // cache of indexes of buffered columns
  };
}

const slice = createSlice({
  name: 'FDT',
  initialState: getInitialState(),
  reducers: {
    initialize(state, action) {
      const props = action.payload;

      let newState = setStateFromProps(state, props);
      newState = initializeRowHeightsAndOffsets(newState);
      newState = initializeColWidthsAndOffsets(newState);
      initializeFlexColumnWidths(newState);
      const scrollAnchor = getScrollAnchor(newState, props);
      const columnAnchor = getColumnAnchor(newState, props);
      newState = computeRenderedRows(newState, scrollAnchor);
      newState = computeRenderedCols(newState, columnAnchor);
      return newState;
    },
    propChange(state, action) {
      const { newProps, oldProps } = action.payload;

      let newState = setStateFromProps(state, newProps);

      if (
        oldProps.rowsCount !== newProps.rowsCount ||
        oldProps.rowHeight !== newProps.rowHeight ||
        oldProps.subRowHeight !== newProps.subRowHeight
      ) {
        newState = initializeRowHeightsAndOffsets(newState);
      }

      // reset the scrollable column cache if there's a new scrollable column getter
      if (
        state.columnSettings.getScrollableColumn !==
        newState.columnSettings.getScrollableColumn
      ) {
        newState.storedScrollableColumns.object = {};
      }

      if (
        oldProps.fixedColumnsCount !== newProps.fixedColumnsCount ||
        oldProps.fixedRightColumnsCount !== newProps.fixedRightColumnsCount ||
        oldProps.scrollableColumnsCount !== newProps.scrollableColumnsCount
      ) {
        newState = initializeColWidthsAndOffsets(newState);
        initializeFlexColumnWidths(newState);
      }

      if (oldProps.rowsCount !== newProps.rowsCount) {
        // NOTE (jordan) bad practice to modify state directly, but okay since
        // we know setStateFromProps clones state internally
        newState.rowBufferSet = new IntegerBufferSet();
      }

      if (oldProps.scrollableColumnsCount !== newProps.scrollableColumnsCount) {
        newState.colBufferSet = new IntegerBufferSet();
      }

      const scrollAnchor = getScrollAnchor(newState, newProps, oldProps);
      const columnAnchor = getColumnAnchor(newState, newProps, oldProps);
      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, newState)) {
        newState = computeRenderedRows(newState, scrollAnchor);
        newState = computeRenderedCols(newState, columnAnchor);
      } else if (scrollAnchor.changed) {
        newState = computeRenderedRows(newState, scrollAnchor);
      } else if (columnAnchor.changed) {
        newState = computeRenderedCols(newState, columnAnchor);
      }

      // if scroll values have changed, then we're scrolling!
      if (
        newState.scrollX !== state.scrollX ||
        newState.scrollY !== state.scrollY
      ) {
        newState.scrolling = newState.scrolling || true;
      }

      // TODO REDUX_MIGRATION solve w/ evil-diff
      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props

      Object.assign(state, newState);
    },
    scrollEnd(state) {
      const newState = Object.assign({}, state, {
        scrolling: false,
      });
      const previousScrollAnchor = {
        firstIndex: state.firstRowIndex,
        firstOffset: state.firstRowOffset,
        lastIndex: state.lastIndex,
      };
      return computeRenderedRows(newState, previousScrollAnchor);
    },
    scrollToY(state, action) {
      let scrollY = action.payload;
      state.scrolling = true;
      const scrollAnchor = scrollTo(state, scrollY);
      Object.assign(state, computeRenderedRows(state, scrollAnchor));
    },
    scrollToX(state, action) {
      const scrollX = action.payload;
      state.scrolling = true;
      const columnAnchor = scrollToXAnchor(state, scrollX);
      Object.assign(state, computeRenderedCols(state, columnAnchor));
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
  const storedHeights = new ArrayWrapper(rowsCount);
  for (let idx = 0; idx < rowsCount; idx++) {
    storedHeights.array[idx] = defaultFullRowHeight;
  }
  return Object.assign({}, state, {
    rowOffsetIntervalTree,
    scrollContentHeight,
    storedHeights,
  });
}

function initializeColWidthsAndOffsets(state) {
  let { columnSettings } = state;
  let fixedColumnsWidth = 0;
  let fixedRightColumnsWidth = 0;
  const fixedColumns = new Array(columnSettings.fixedColumnsCount);
  const fixedRightColumns = new Array(columnSettings.fixedRightColumnsCount);
  const fixedColumnGroups = [];
  const fixedRightColumnGroups = [];

  for (let idx = 0; idx < fixedColumns.length; idx++) {
    fixedColumns[idx] = convertColumnElementsToData(
      columnSettings.getFixedColumn(idx)
    );
    fixedColumnsWidth += fixedColumns[idx].props.width;
  }

  for (let idx = 0; idx < fixedRightColumns.length; idx++) {
    fixedRightColumns[idx] = convertColumnElementsToData(
      columnSettings.getFixedRightColumn(idx)
    );
    fixedRightColumnsWidth += fixedRightColumns[idx].props.width;
  }
  const fixedContentWidth = fixedRightColumnsWidth + fixedColumnsWidth;

  const scrollContentWidth =
    columnSettings.scrollableColumnsCount * columnSettings.defaultColumnWidth;
  const colOffsetIntervalTree = PrefixIntervalTree.uniform(
    columnSettings.scrollableColumnsCount,
    columnSettings.defaultColumnWidth
  );
  const storedScrollableColumns = new ObjectWrapper();
  const storedWidths = new ArrayWrapper(columnSettings.scrollableColumnsCount);
  storedWidths.array.fill(columnSettings.defaultColumnWidth);
  return Object.assign({}, state, {
    colOffsetIntervalTree,
    scrollContentWidth,
    fixedColumnsWidth,
    fixedRightColumnsWidth,
    storedWidths,
    fixedContentWidth,
    fixedColumns,
    fixedRightColumns,
    scrollableColumns: {},
    storedScrollableColumns,
    fixedColumnGroups,
    fixedRightColumnGroups,
    scrollableColumnGroups: [],
  });
}

/**
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 * @private
 */
function setStateFromProps(state, props) {
  const newState = Object.assign({}, state);

  newState.elementHeights = Object.assign(
    {},
    newState.elementHeights,
    pick(props, [
      'cellGroupWrapperHeight',
      'footerHeight',
      'groupHeaderHeight',
      'headerHeight',
    ])
  );
  newState.elementHeights.groupHeaderHeight =
    newState.elementHeights.groupHeaderHeight || 0;

  newState.rowSettings = Object.assign(
    {},
    newState.rowSettings,
    pick(props, ['bufferRowCount', 'rowHeight', 'rowsCount', 'subRowHeight'])
  );
  const { rowHeight, subRowHeight } = newState.rowSettings;
  newState.rowSettings.rowHeightGetter =
    props.rowHeightGetter || (() => rowHeight);
  newState.rowSettings.subRowHeightGetter =
    props.subRowHeightGetter || (() => subRowHeight || 0);
  newState.rowSettings.rowAttributesGetter = props.rowAttributesGetter;

  newState.columnSettings = Object.assign(
    {},
    newState.columnSettings,
    pick(props, [
      'bufferColCount',
      'scrollableColumnsCount',
      'fixedColumnsCount',
      'fixedRightColumnsCount',
      'getScrollableColumn',
      'getFixedColumn',
      'getFixedRightColumn',
    ])
  );

  newState.scrollFlags = Object.assign(
    {},
    newState.scrollFlags,
    pick(props, ['overflowX', 'overflowY', 'showScrollbarX', 'showScrollbarY'])
  );

  newState.tableSize = Object.assign(
    {},
    newState.tableSize,
    pick(props, ['height', 'maxHeight', 'ownerHeight', 'width'])
  );
  newState.tableSize.useMaxHeight = newState.tableSize.height === undefined;

  newState.scrollbarXHeight = props.scrollbarXHeight;
  newState.scrollbarYWidth = props.scrollbarYWidth;

  return newState;
}

const { reducer, actions } = slice;
export const {
  initialize,
  propChange,
  scrollEnd,
  scrollToX,
  scrollToY,
} = actions;
export default reducer;
