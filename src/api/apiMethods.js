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
import columnCounts from '../selectors/columnCounts';
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
        scrollableColOffsetIntervalTree,
        fixedColumnOffsets,
        fixedColumnGroupOffsets,
        fixedRightColumnOffsets,
        fixedRightColumnGroupOffsets,
        storedScrollableColumns,
        storedScrollableColumnGroups,
      } = state;

      const {
        fixedColumnsCount,
        fixedRightColumnsCount,
        scrollableColumnsCount,
      } = columnCounts(state);

      const _getCellGroupTypeFromColumnIndex = (columnIndex) => {
        if (
          columnIndex < 0 ||
          columnIndex >= columnSettings.columnsCount ||
          !Number.isInteger(columnIndex)
        ) {
          throw `columnIndex must be an integer between 0 and ${
            columnSettings.columnsCount - 1
          } inclusive`;
        }

        if (columnIndex >= 0 && columnIndex < fixedColumnsCount) {
          return CellGroupType.FIXED;
        }

        if (
          columnIndex >= fixedColumnsCount &&
          columnIndex < fixedColumnsCount + scrollableColumnsCount
        ) {
          return CellGroupType.SCROLLABLE;
        }

        return CellGroupType.FIXED_RIGHT;
      };

      const _getCellGroupTypeFromColumnGroupIndex = (columnGroupIndex) => {
        const lastFixedColumGroupIndex = _getColumn(
          fixedColumnsCount - 1,
          CellGroupType.FIXED
        ).props.columnGroupIndex;
        const lastScrollableColumnGroupIndex = _getColumn(
          scrollableColumnsCount - 1,
          CellGroupType.SCROLLABLE
        ).props.columnGroupIndex;
        const lastFixedRightColumnGroupIndex = _getColumn(
          fixedRightColumnsCount - 1,
          CellGroupType.FIXED_RIGHT
        ).props.columnGroupIndex;

        if (
          columnGroupIndex < 0 ||
          columnGroupIndex > lastFixedRightColumnGroupIndex ||
          !Number.isInteger(columnGroupIndex)
        ) {
          throw `columnGroupIndex must be an integer between 0 and ${lastFixedRightColumnGroupIndex} inclusive`;
        }

        if (
          columnGroupIndex >= 0 &&
          columnGroupIndex <= lastFixedColumGroupIndex
        ) {
          return CellGroupType.FIXED;
        }

        if (
          columnGroupIndex > lastFixedColumGroupIndex &&
          columnGroupIndex <= lastScrollableColumnGroupIndex
        ) {
          return CellGroupType.SCROLLABLE;
        }

        return CellGroupType.FIXED_RIGHT;
      };

      const _getColumnLocalIndex = (columnIndex, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return columnIndex;
        } else if (cellGroupType === CellGroupType.SCROLLABLE) {
          return columnIndex - fixedColumnsCount;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return columnIndex - fixedColumnsCount - scrollableColumnsCount;
        }
      };

      const _getColumnOffset = (localColumnIndex, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnOffsets[localColumnIndex];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnOffsets[localColumnIndex];
        } else {
          return scrollableColOffsetIntervalTree.sumTo(localColumnIndex);
        }
      };

      const getCellGroupWidth = (cellGroupType = CellGroupType.SCROLLABLE) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnsWidth;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnsWidth;
        } else if (cellGroupType === CellGroupType.SCROLLABLE) {
          return scrollContentWidth;
        }
      };

      const _getColumn = (localColumnIndex, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumns[localColumnIndex];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumns[localColumnIndex];
        } else if (cellGroupType === CellGroupType.SCROLLABLE) {
          return _getScrollableColumn(localColumnIndex);
        }
      };

      const _getScrollableColumn = (localColumnIndex) => {
        let column = storedScrollableColumns.object[localColumnIndex];

        // if no column exists in the cache, then fetch the column from the user
        if (!column) {
          column = convertColumnElementsToData(
            columnSettings.getColumn(localColumnIndex + fixedColumnsCount)
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
            columnSettings.getColumnGroup(columnGroupIndex)
          );

          // we also need to figure out the children of the column group to accurately determine the start and end child indexes, as well as the supposed total width of the column group
          let firstChildIndex;
          let lastChildIndex;
          // NOTE (pradeep): This runs at O(N). Consider another approach, like a binary search to atleast make this run at O(log N).
          for (let i = 0; i < scrollableColumnsCount; i++) {
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
            scrollableColOffsetIntervalTree.sumTo(
              columnGroup.props.lastChildIdx
            ) -
            scrollableColOffsetIntervalTree.sumUntil(
              columnGroup.props.firstChildIdx
            );
        }

        return columnGroup;
      };

      const getColumn = (columnIndex) => {
        const cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);
        const localColumnIndex = _getColumnLocalIndex(
          columnIndex,
          cellGroupType
        );
        const column = _getColumn(localColumnIndex, cellGroupType);
        const offset = _getColumnOffset(localColumnIndex, cellGroupType);
        return _getMinimalColumn(column, offset);
      };

      const getColumnCount = (cellGroupType = null) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnsCount;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnsCount;
        } else if (cellGroupType == CellGroupType.SCROLLABLE) {
          return scrollableColumnsCount;
        } else {
          return columnSettings.columnsCount;
        }
      };

      const _getScrollableColumnGroupsCount = () => {
        if (scrollableColumnsCount === 0) {
          return 0;
        }
        const lastScrollableColumn = _getScrollableColumn(
          scrollableColumnsCount - 1
        );
        const firstScrollableColumn = _getScrollableColumn(0);

        return (
          lastScrollableColumn.props.columnGroupIndex -
          firstScrollableColumn.props.columnGroupIndex +
          1
        );
      };

      const getColumnGroupCount = (cellGroupType = null) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnGroups.length;
        }
        if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnGroups.length;
        }
        const scrollableColumnGroupsCount = _getScrollableColumnGroupsCount();
        if (cellGroupType === CellGroupType.SCROLLABLE) {
          return scrollableColumnGroupsCount;
        }

        // if cellGroupType is not given return total column groups.
        return (
          scrollableColumnGroupsCount +
          fixedColumnGroups.length +
          fixedRightColumnGroups.length
        );
      };

      const _getScrollableColumnGroupOffset = (columnGroup) => {
        // offset of column group is same as offset of its first child column
        return scrollableColOffsetIntervalTree.sumUntil(
          columnGroup.props.firstChildIdx
        );
      };

      const _getColumnGroup = (columnGroupIndex, cellGroupType) => {
        let columnGroup;
        let offset = 0;

        if (cellGroupType === CellGroupType.FIXED) {
          columnGroup = fixedColumnGroups[columnGroupIndex];
          offset = fixedColumnGroupOffsets[columnGroupIndex];
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          const localColumnGroupIndex =
            columnGroupIndex -
            getColumnGroupCount(CellGroupType.FIXED) -
            getColumnGroupCount(CellGroupType.SCROLLABLE);
          columnGroup = fixedRightColumnGroups[localColumnGroupIndex];
          offset = fixedRightColumnGroupOffsets[localColumnGroupIndex];
        } else {
          columnGroup = _getScrollableColumnGroup(columnGroupIndex);
          offset = _getScrollableColumnGroupOffset(columnGroup);
        }

        return _getMinimalColumnGroup(columnGroup, offset);
      };

      const getColumnGroup = (columnGroupIndex) => {
        const cellGroupType =
          _getCellGroupTypeFromColumnGroupIndex(columnGroupIndex);
        return _getColumnGroup(columnGroupIndex, cellGroupType);
      };

      const getColumnGroupByChild = (columnIndex) => {
        const cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);
        const localColumnIndex = _getColumnLocalIndex(
          columnIndex,
          cellGroupType
        );
        const column = _getColumn(localColumnIndex, cellGroupType);
        const columnGroupIndex = column.props.columnGroupIndex;
        return _getColumnGroup(columnGroupIndex, cellGroupType);
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

      const _getColumnAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        let column, columnOffset;
        if (cellGroupType === CellGroupType.FIXED) {
          const { element } = _getElementAtOffset(fixedColumns, offset);
          columnOffset =
            fixedColumnOffsets[
              _getColumnLocalIndex(element.props.index, CellGroupType.FIXED)
            ];
          column = element;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          const { element } = _getElementAtOffset(fixedRightColumns, offset);
          columnOffset =
            fixedRightColumnOffsets[
              _getColumnLocalIndex(
                element.props.index,
                CellGroupType.FIXED_RIGHT
              )
            ];
          column = element;
        } else {
          const localIndex = _.clamp(
            scrollableColOffsetIntervalTree.greatestLowerBound(offset),
            0,
            scrollableColumnsCount - 1
          );
          column = _getScrollableColumn(localIndex);
          columnOffset = scrollableColOffsetIntervalTree.sumUntil(localIndex);
        }
        return { column, columnOffset };
      };

      const getColumnAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const { column, columnOffset } = _getColumnAtOffset(
          offset,
          cellGroupType
        );
        return {
          column: _.isNil(column)
            ? column
            : _getMinimalColumn(column, columnOffset),
          distanceFromOffset: offset - columnOffset,
        };
      };

      const getColumnGroupAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const { column } = _getColumnAtOffset(offset, cellGroupType);
        if (_.isNil(column)) {
          return { columnGroup: null, distanceFromOffset: null };
        }
        const columnGroup = _getColumnGroup(
          column.props.columnGroupIndex,
          cellGroupType
        );
        return {
          columnGroup,
          distanceFromOffset: offset - columnGroup.offset,
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
