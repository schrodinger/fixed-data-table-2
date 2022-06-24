/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import _ from 'lodash';
import convertColumnElementsToData from '../helper/convertColumnElementsToData';
import shallowEqualSelector from '../helper/shallowEqualSelector';
import { CellGroupType } from '../enums/CellGroup';

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
const getApiMethodsSelector = () =>
  shallowEqualSelector(
    [
      (state, actions) => state,
      (state, actions) => actions,
      () => Math.random(), // TODO (pradeep)
    ],
    (/*object*/ state, /*object*/ actions) => {
      const {
        columnSettings,
        fixedColumnsWidth,
        fixedRightColumnsWidth,
        scrollContentWidth,
        fixedColumns,
        fixedColumnGroups,
        fixedRightColumns,
        fixedRightColumnGroups,
        colOffsetIntervalTree,
        fixedColumnOffsets,
        fixedColumnGroupOffsets,
        fixedRightColumnOffsets,
        fixedRightColumnGroupOffsets,
        storedScrollableColumns,
        storedScrollableColumnGroups,
      } = state;

      const getColumnOffset = (index, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          fixedColumnOffsets[index];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          fixedRightColumnOffsets[index];
        } else {
          return colOffsetIntervalTree.sumTo(index);
        }
      };

      const getCellGroupWidth = (cellGroupType = CellGroupType.SCROLLABLE) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnsWidth;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnsWidth;
        } else {
          return scrollContentWidth;
        }
      };

      const _getColumn = (
        columnIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumns[columnIndex];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumns[columnIndex];
        } else {
          return _getScrollableColumn(columnIndex);
        }
      };

      const _getScrollableColumn = (columnIndex) => {
        let column = storedScrollableColumns.object[columnIndex];

        // if no column exists in the cache, then fetch the column from the user
        if (!column) {
          column = convertColumnElementsToData(
            columnSettings.getScrollableColumn(columnIndex)
          );

          // we don't store the column to the cache because our functions should be pure
          // this also means that we need to keep FDT's default width for the column
          column.props.width = columnSettings.defaultColumnWidth;
        }

        return column;
      };

      const _getScrollableColumnGroup = (columnGroupIndex) => {
        // TODO (pradeep): Clone deep might cause performance issues
        let columnGroup = storedScrollableColumnGroups.object[columnGroupIndex];

        // if no column group exists in the cache, then fetch the column group from the user
        if (!columnGroup) {
          columnGroup = convertColumnElementsToData(
            columnSettings.getScrollableColumnGroup(columnGroupIndex)
          );

          // we also need to figure out the children of the column group to accurately determine the start and end child indexes, as well as the supposed total width of the column group
          let firstChildIndex;
          let lastChildIndex;
          // NOTE (pradeep): This runs at O(N). Consider another approach, like a binary search to atleast make this run at O(log N).
          for (let i = 0; i < columnSettings.scrollableColumnsCount; i++) {
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
            colOffsetIntervalTree.sumTo(columnGroup.props.lastChildIdx) -
            colOffsetIntervalTree.sumUntil(columnGroup.props.firstChildIdx);
        }

        return columnGroup;
      };

      const getColumn = (
        columnIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const column = _getColumn(columnIndex, cellGroupType);
        const offset = getColumnOffset(columnIndex, cellGroupType);
        return _getMinimalColumn(column, offset);
      };

      const getColumnCount = (cellGroupType = CellGroupType.SCROLLABLE) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return columnSettings.fixedColumnsCount;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return columnSettings.fixedRightColumnsCount;
        } else {
          return columnSettings.scrollableColumnsCount;
        }
      };

      const getColumnGroupCount = (
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnGroups.length;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnGroups.length;
        } else {
          // the parent column group of the last scrollable column will also be the last scrollable column group
          const lastColumn = _getScrollableColumn(
            columnSettings.scrollableColumnsCount - 1
          );
          return lastColumn.props.columnGroupIndex + 1;
        }
      };

      const _getScrollableColumnGroupOffset = (columnGroup) => {
        // offset of column group is same as offset of its first child column
        return colOffsetIntervalTree.sumUntil(columnGroup.props.firstChildIdx);
      };

      const getColumnGroup = (
        columnGroupIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        let columnGroup;
        let offset = 0;

        if (cellGroupType === CellGroupType.FIXED) {
          columnGroup = fixedColumnGroups[columnGroupIndex];
          offset = fixedColumnGroupOffsets[columnGroupIndex];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          columnGroup = fixedRightColumnGroups[columnGroupIndex];
          offset = fixedRightColumnGroupOffsets[columnGroupIndex];
        } else {
          columnGroup = _getScrollableColumnGroup(columnGroupIndex);
          offset = _getScrollableColumnGroupOffset(columnGroup);
        }

        return _getMinimalColumnGroup(columnGroup, offset);
      };

      const getColumnGroupByChild = (
        columnIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const column = _getColumn(columnIndex, cellGroupType);
        const columnGroupIndex = column.props.columnGroupIndex;
        return getColumnGroup(columnGroupIndex, cellGroupType);
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

      const getColumnAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        let column, columnOffset;
        if (cellGroupType === CellGroupType.FIXED) {
          const { element } = _getElementAtOffset(fixedColumns, offset);
          columnOffset = fixedColumnOffsets[element.props.index];
          column = element;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          const { element } = _getElementAtOffset(fixedRightColumns, offset);
          columnOffset = fixedRightColumnOffsets[element.props.index];
          column = element;
        } else {
          let index = colOffsetIntervalTree.greatestLowerBound(offset);
          index = _.clamp(index, 0, columnSettings.scrollableColumnsCount - 1);
          column = _getScrollableColumn(index);
          columnOffset = colOffsetIntervalTree.sumUntil(index);
        }

        if (column) {
          column = _getMinimalColumn(column, columnOffset);
        }

        return {
          column,
          distanceFromOffset: offset - columnOffset,
        };
      };

      const getColumnGroupAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        let columnGroup, distanceFromOffset, columnGroupOffset;
        if (cellGroupType === CellGroupType.FIXED) {
          const { element } = _getElementAtOffset(fixedColumns, offset);
          columnGroupOffset = fixedColumnOffsets[element.props.index];
          columnGroup = element;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          const { element } = _getElementAtOffset(fixedRightColumns, offset);
          columnGroupOffset = fixedRightColumnOffsets[element.props.index];
          columnGroup = element;
        } else {
          // figure out the column at given offset
          let columnIndex = colOffsetIntervalTree.greatestLowerBound(offset);
          columnIndex = _.clamp(
            columnIndex,
            0,
            columnSettings.scrollableColumnsCount - 1
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
        /** get element */
        getColumn,
        getColumnGroup,
        getColumnGroupByChild,

        /** get element at offset */
        getColumnAtOffset,
        getColumnGroupAtOffset,

        /** get cell group width */
        getCellGroupWidth,

        /** get count */
        getColumnCount,
        getColumnGroupCount,

        /** actions */
        scrollToX,
      };
    }
  );

export { getApiMethodsSelector };
