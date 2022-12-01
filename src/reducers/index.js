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
    columnSettings: {
      defaultColumnWidth: 100,
      bufferColCount: undefined,
      columnsCount: 0,
      getColumn: () => {},
      getColumnGroup: () => {},
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
    scrollableColumnGroups: {}, // we use a sparse object to represent the currently required set of columns
    fixedColumns: [],
    fixedRightColumns: [],
    fixedColumnsCount: 0,
    fixedRightColumnsCount: 0,
    scrollableColumnsCount: 0,
    fixedColumnGroups: [],
    fixedRightColumnGroups: [],

    /*
     * Internal state only used by this file
     * NOTE (jordan) internal state is altered in place
     * so don't trust it for redux history or immutability checks
     * TODO (jordan) investigate if we want to move this to local or scoped state
     */
    rowBufferSet: new IntegerBufferSet(), // virtualized positions of rows
    colBufferSet: new IntegerBufferSet(), // virtualized positions of columns
    colGroupBufferSet: new IntegerBufferSet(), // virtualized positions of column groups
    storedHeights: new ArrayWrapper(), // heights of each row computed lazily
    storedWidths: new ObjectWrapper(), // widths of each column computed lazily
    storedScrollableColumns: new ObjectWrapper(), // virtualized column objects
    storedScrollableColumnGroups: new ObjectWrapper(), // virtualized column group objects
    rowOffsetIntervalTree: null, // PrefixIntervalTree to calculate offsets of columns efficiently
    scrollableColOffsetIntervalTree: null, // PrefixIntervalTree to calculate offsets of scrollable columns efficiently
    cachedColumnsToRender: new ArrayWrapper(), // cache of indexes of buffered columns
    cachedColumnGroupsToRender: new ArrayWrapper(), // cache of indexes of buffered column groups
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
      initializeFixedAndScrollableColumnsCount(state);
      initializeRowHeightsAndOffsets(state);
      initializeFixedColumnWidthsAndOffsets(state);
      initializeScrollableColumnWidthsAndOffsets(state);
      initializeFlexColumnWidths(state);
      const scrollAnchor = getScrollAnchor(state, props);
      const columnAnchor = getColumnAnchor(state, props);
      computeRenderedRows(state, scrollAnchor);
      computeRenderedCols(state, columnAnchor);
    },
    propChange(state, action) {
      const { newProps, oldProps } = action.payload;
      const oldState = _.clone(state);
      setStateFromProps(state, newProps);
      initializeFixedAndScrollableColumnsCount(state);

      if (
        oldProps.rowsCount !== newProps.rowsCount ||
        oldProps.rowHeight !== newProps.rowHeight ||
        oldProps.subRowHeight !== newProps.subRowHeight
      ) {
        initializeRowHeightsAndOffsets(state);
      }

      initializeFixedColumnWidthsAndOffsets(state);
      if (oldState.scrollableColumnsCount !== state.scrollableColumnsCount) {
        initializeScrollableColumnWidthsAndOffsets(state);
      }
      initializeFlexColumnWidths(state);

      if (oldProps.rowsCount !== newProps.rowsCount) {
        state.rowBufferSet = new IntegerBufferSet();
      }

      if (oldState.scrollableColumnsCount !== state.scrollableColumnsCount) {
        state.colBufferSet = new IntegerBufferSet();
      }

      const scrollAnchor = getScrollAnchor(state, newProps, oldProps);
      const columnAnchor = getColumnAnchor(state, newProps, oldProps);

      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, oldState)) {
        computeRenderedRows(state, scrollAnchor);
        computeRenderedCols(state, columnAnchor);
      } else if (scrollAnchor.changed) {
        computeRenderedRows(state, scrollAnchor);
      } else if (columnAnchor.changed) {
        computeRenderedCols(state, columnAnchor);
      }

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
      const columnAnchor = scrollToXAnchor(state, scrollX);
      computeRenderedCols(state, columnAnchor);
    },
  },
});

function initializeFixedAndScrollableColumnsCount(state) {
  const columnSettings = state.columnSettings;
  let fixedColumnsCount = 0;
  let fixedRightColumnsCount = 0;

  for (let idx = 0; idx < columnSettings.columnsCount; idx++) {
    if (columnSettings.getColumn(idx).fixed) {
      fixedColumnsCount++;
    } else {
      break;
    }
  }
  for (let idx = columnSettings.columnsCount - 1; idx >= 0; idx--) {
    if (columnSettings.getColumn(idx).fixedRight) {
      fixedRightColumnsCount++;
    } else {
      break;
    }
  }

  const scrollableColumnsCount =
    columnSettings.columnsCount - fixedColumnsCount - fixedRightColumnsCount;

  Object.assign(state, {
    fixedColumnsCount,
    fixedRightColumnsCount,
    scrollableColumnsCount,
  });
}

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
  Object.assign(state, {
    rowOffsetIntervalTree,
    scrollContentHeight,
    storedHeights,
  });
}

function initializeFixedColumnWidthsAndOffsets(state) {
  const { columnSettings, fixedColumnsCount, fixedRightColumnsCount } = state;
  const { columnsCount, getColumn } = columnSettings;
  let fixedColumnsWidth = 0;
  let fixedRightColumnsWidth = 0;
  const fixedColumns = [];
  const fixedRightColumns = [];

  for (let idx = 0; idx < fixedColumnsCount; idx++) {
    const columnData = convertColumnElementsToData(getColumn(idx));
    columnData.props.index = idx;
    fixedColumnsWidth += columnData.props.width;
    fixedColumns.push(columnData);
  }

  for (
    let idx = columnsCount - fixedRightColumnsCount;
    idx < columnsCount;
    idx++
  ) {
    const columnData = convertColumnElementsToData(getColumn(idx));
    columnData.props.index = idx;
    fixedRightColumnsWidth += columnData.props.width;
    fixedRightColumns.push(columnData);
  }
  const fixedContentWidth = fixedRightColumnsWidth + fixedColumnsWidth;

  Object.assign(state, {
    fixedColumnsWidth,
    fixedRightColumnsWidth,
    fixedContentWidth,
    fixedColumns,
    fixedRightColumns,
  });
}

function initializeScrollableColumnWidthsAndOffsets(state) {
  const { columnSettings, scrollableColumnsCount } = state;
  const defaultColumnWidth = columnSettings.defaultColumnWidth;
  const scrollContentWidth = scrollableColumnsCount * defaultColumnWidth;
  const scrollableColOffsetIntervalTree = PrefixIntervalTree.uniform(
    scrollableColumnsCount,
    defaultColumnWidth
  );
  const storedScrollableColumns = new ObjectWrapper();
  const storedWidths = new ArrayWrapper(scrollableColumnsCount);
  storedWidths.array.fill(defaultColumnWidth);

  Object.assign(state, {
    scrollableColOffsetIntervalTree,
    scrollContentWidth,
    storedWidths,
    scrollableColumns: {},
    storedScrollableColumns,
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
  state.propsRevision = state.propsRevision + 1;

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
  state.elementHeights.groupHeaderHeight =
    state.elementHeights.groupHeaderHeight || 0;

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

  state.columnSettings = Object.assign(
    {},
    state.columnSettings,
    pick(props, [
      'bufferColCount',
      'columnsCount',
      'getColumn',
      'getColumnGroup',
    ])
  );

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

  // NOTE (pradeep): Since props changed, we expect the user might pass in a different set of columns. So we reset the scrollable column cache
  state.storedScrollableColumns.object = {};
  state.storedScrollableColumnGroups.object = {};
}

const { reducer, actions } = slice;
export const { initialize, propChange, scrollEnd, scrollToX, scrollToY } =
  actions;
export default reducer;
