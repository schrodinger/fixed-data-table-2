/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import _, { first } from 'lodash';
import convertColumnElementsToData from './helper/convertColumnElementsToData';

/**
 * Minimal data of a column that we expose through our APIs
 */
const _getMinimalColumn = (column, offset) => ({
  offset: offset,
  width: column.props.width,
  index: column.props.index,
  columnKey: column.props.columnKey,
});

/**
 * Minimal data of a column group that we expose through our APIs
 */
const _getMinimalColumnGroup = (columnGroup, offset) => ({
  offset: offset,
  width: columnGroup.props.width,
  index: columnGroup.props.index,
  columnKey: columnGroup.props.columnKey,
});

/**
 * Return all exposed APIs
 *
 * @param {!Object} state
 * @param {!Object} api
 * @returns
 */
const getFixedDataTableApi = function (state, actions) {
  const {
    fixedColumnsWidth,
    fixedRightColumnsWidth,
    scrollContentWidth,
    fixedColumns,
    fixedRightColumns,
    scrollableColumns,
    fixedColumnGroups,
    fixedRightColumnGroups,
    fixedColumnOffsets,
    fixedRightColumnOffsets,
    colOffsetIntervalTree,
    scrollableColumnGroups,
    columnGroupProps,
  } = state;

  const getColumnOffset = (index, cellGroupType) => {
    if (cellGroupType === 'fixed') {
      state.fixedColumnOffsets[index];
    } else if (cellGroupType === 'fixedRight') {
      state.fixedRightColumnOffsets[index];
    } else {
      return colOffsetIntervalTree.sumTo(index);
    }
  };

  const getCellGroupWidth = (cellGroupType = 'scrollable') => {
    if (cellGroupType === 'fixed') {
      return fixedColumnsWidth;
    } else if (cellGroupType === 'fixedRight') {
      return fixedRightColumnsWidth;
    } else {
      return scrollContentWidth;
    }
  };

  const _getColumn = (columnIndex, cellGroupType = 'scrollable') => {
    if (cellGroupType === 'fixed') {
      return fixedColumns[columnIndex];
    } else if (cellGroupType === 'fixedRight') {
      return fixedRightColumns[columnIndex];
    } else {
      return _getScrollableColumn(columnIndex);
    }
  };

  const _getScrollableColumn = (columnIndex) => {
    let column = state.storedScrollableColumns.object[columnIndex];

    // if no column exists in the cache, then fetch the column from the user
    if (!column) {
      column = convertColumnElementsToData(
        state.columnSettings.getScrollableColumn(columnIndex)
      );

      // we don't store the column to the cache because our functions should be pure
      // this also means that we need to keep FDT's default width for the column
      column.props.width = state.columnSettings.defaultColumnWidth;
    }

    return column;
  };

  const _getScrollableColumnGroup = (columnGroupIndex) => {
    // TODO (pradeep): Clone deep might cause performance issues
    let columnGroup =
      state.storedScrollableColumnGroups.object[columnGroupIndex];

    // if no column group exists in the cache, then fetch the column group from the user
    if (!columnGroup) {
      columnGroup = convertColumnElementsToData(
        state.columnSettings.getColumnGroup(columnGroupIndex)
      );

      // we also need to figure out the children of the column group to accurately determine the start and end child indexes, as well as the supposed total width of the column group
      let firstChildIndex;
      let lastChildIndex;
      // NOTE (pradeep): This runs at O(N). Consider another approach, like a binary search to atleast make this run at O(log N).
      for (let i = 0; i < state.columnSettings.scrollableColumnsCount; i++) {
        const column = _getScrollableColumn(i);
        if (column.props.columnGroupIndex === columnGroupIndex) {
          firstChildIndex = _.min([i, firstChildIndex]);
          lastChildIndex = _.max([i, lastChildIndex]);
        }
      }

      columnGroup.props.firstChildIdx = firstChildIndex;
      columnGroup.props.lastChildIdx = lastChildIndex;
      columnGroup.props.index = columnGroupIndex;

      columnGroup.props.width =
        state.colOffsetIntervalTree.sumTo(columnGroup.props.lastChildIdx) -
        state.colOffsetIntervalTree.sumUntil(columnGroup.props.firstChildIdx);
    }

    return columnGroup;
  };

  const getColumn = (columnIndex, cellGroupType = 'scrollable') => {
    const column = _getColumn(columnIndex, cellGroupType);
    const offset = getColumnOffset(columnIndex, cellGroupType);
    return _getMinimalColumn(column, offset);
  };

  const getColumnCount = (cellGroupType = 'scrollable') => {
    if (cellGroupType === 'fixed') {
      return state.columnSettings.fixedColumnsCount;
    } else if (cellGroupType === 'fixedRight') {
      return state.columnSettings.fixedRightColumnsCount;
    } else {
      return state.columnSettings.scrollableColumnsCount;
    }
  };

  const getColumnGroupCount = (cellGroupType = 'scrollable') => {
    if (cellGroupType === 'fixed') {
      return state.fixedColumnGroups.length;
    } else if (cellGroupType === 'fixedRight') {
      return state.fixedRightColumnGroups.length;
    } else {
      // the parent column group of the last scrollable column will also be the last scrollable column group
      const lastColumn = _getScrollableColumn(
        state.columnSettings.scrollableColumnsCount - 1
      );
      return lastColumn.props.columnGroupIndex + 1;
    }
  };

  const _getScrollableColumnGroupOffset = (columnGroup) => {
    // offset of column group is same as offset of its first child column
    return state.colOffsetIntervalTree.sumUntil(
      columnGroup.props.firstChildIdx
    );
  };

  const getColumnGroup = (columnGroupIndex, cellGroupType = 'scrollable') => {
    let columnGroup;
    let offset = 0;

    if (cellGroupType === 'fixed') {
      columnGroup = state.fixedColumnGroups[columnGroupIndex];
      offset = state.fixedColumnGroupOffsets[columnGroupIndex];
    } else if (cellGroupType === 'fixedRight') {
      columnGroup = state.fixedRightColumnGroups[columnGroupIndex];
      offset = state.fixedRightColumnGroupOffsets[columnGroupIndex];
    } else {
      // offset index such that index of 0 is the first scrollable column group
      const fixedColumnGroupsCount = _.size(state.fixedColumnGroups);
      columnGroup = _getScrollableColumnGroup(
        columnGroupIndex + fixedColumnGroupsCount
      );
      offset = _getScrollableColumnGroupOffset(columnGroup);
    }

    return _getMinimalColumnGroup(columnGroup, offset);
  };

  const getColumnGroupByChild = (columnIndex, cellGroupType = 'scrollable') => {
    const column = _getColumn(columnIndex, cellGroupType);
    const columnGroupIndex = column.props.columnGroupIndex;
    let localColumnGroupIndex = columnGroupIndex;
    if (cellGroupType === 'scrollable') {
      localColumnGroupIndex -= _.size(state.fixedColumnGroups);
    } else if (cellGroupType === 'fixedRight') {
      localColumnGroupIndex -=
        _.size(state.fixedColumnGroups) + _.size(state.fixedRightColumnGroups);
    }
    return getColumnGroup(localColumnGroupIndex, cellGroupType);
  };

  const _getElementAtOffset = (container, offset) => {
    if (container.length === 0) {
      return {
        element: null,
        distanceFromOffset: null,
      };
    }

    let currentOffset = 0;
    let index = 0;
    while (index !== container.length) {
      if (currentOffset > offset) {
        break;
      }
      currentOffset += container[index].props.width;
      index++;
    }

    index = _.clamp(index - 1, 0, container.length - 1);

    return {
      element: container[index],
      distanceFromOffset:
        container[index].props.width - (currentOffset - offset),
    };
  };

  const getColumnAtOffset = (offset, cellGroupType = 'scrollable') => {
    let column, columnOffset;
    if (cellGroupType === 'fixed') {
      const { element } = _getElementAtOffset(state.fixedColumns, offset);
      columnOffset = state.fixedColumnOffsets[element.props.index];
      column = element;
    } else if (cellGroupType === 'fixedRight') {
      const { element } = _getElementAtOffset(state.fixedRightColumns, offset);
      columnOffset = state.fixedRightColumnOffsets[element.props.index];
      column = element;
    } else {
      let index = state.colOffsetIntervalTree.greatestLowerBound(offset);
      index = _.clamp(
        index,
        0,
        state.columnSettings.scrollableColumnsCount - 1
      );
      column = _getScrollableColumn(index);
      columnOffset = state.colOffsetIntervalTree.sumUntil(index);
    }

    if (column) {
      column = _getMinimalColumn(column, columnOffset);
    }

    return {
      column,
      distanceFromOffset: offset - columnOffset,
    };
  };

  const getColumnGroupAtOffset = (offset, cellGroupType = 'scrollable') => {
    let columnGroup, distanceFromOffset, columnGroupOffset;
    if (cellGroupType === 'fixed') {
      const { element } = _getElementAtOffset(state.fixedColumns, offset);
      columnGroupOffset = state.fixedColumnOffsets[element.props.index];
      columnGroup = element;
    } else if (cellGroupType === 'fixedRight') {
      const { element } = _getElementAtOffset(state.fixedRightColumns, offset);
      columnGroupOffset = state.fixedRightColumnOffsets[element.props.index];
      columnGroup = element;
    } else {
      // figure out the column at given offset
      let columnIndex = state.colOffsetIntervalTree.greatestLowerBound(offset);
      columnIndex = _.clamp(
        columnIndex,
        0,
        state.columnSettings.scrollableColumnsCount - 1
      );
      const column = _getScrollableColumn(columnIndex);

      // get the parent column group of the column
      const { columnGroupIndex } = column.props;
      columnGroup = _getScrollableColumnGroup(columnGroupIndex);
      columnGroupOffset = _getScrollableColumnGroupOffset(columnGroup);
    }

    return {
      columnGroup: _getMinimalColumnGroup(columnGroup, columnGroupOffset),
      distanceFromOffset: offset - columnGroupOffset,
    };
  };

  const scrollToX = actions.scrollToX;

  return {
    /** state queries */
    getColumn,
    getColumnCount,
    getColumnGroup,
    getColumnGroupCount,
    getColumnGroupByChild,
    getCellGroupWidth,
    getColumnAtOffset,
    getColumnGroupAtOffset,

    /** actions */
    scrollToX,
  };
};

export { getFixedDataTableApi };
