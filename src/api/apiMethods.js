/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import clamp from 'lodash/clamp';
import get from 'lodash/get';
import inRange from 'lodash/inRange';
import isNil from 'lodash/isNil';
import size from 'lodash/size';
import columnWidths from '../selectors/columnWidths';
import shallowEqualSelector from '../helper/shallowEqualSelector';
import { CellGroupType } from '../enums/CellGroup';

/**
 * Minimal data of a column that we expose through our APIs
 */
const _getMinimalColumn = (column) => ({
  offset: column.offset,
  width: column.width,
  index: column.index,
  columnKey: column.columnKey,
});

/**
 * Minimal data of a column group that we expose through our APIs
 */
const _getMinimalColumnGroup = (columnGroup) => ({
  offset: columnGroup.offset,
  width: columnGroup.width,
  index: columnGroup.index,
  columnKey: columnGroup.columnKey,
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
    [(state) => columnWidths(state), (state, actions) => actions],
    (/*object*/ columnWidths, /*object*/ actions) => {
      const {
        fixedColumns,
        fixedRightColumns,
        scrollableColumns,
        fixedColumnGroups,
        fixedRightColumnGroups,
        scrollableColumnGroups,
      } = columnWidths;

      const validateColumnIndex = (columnIndex) => {
        const totalColumns =
          fixedColumns.length +
          scrollableColumns.length +
          fixedRightColumns.length;

        if (
          columnIndex < 0 ||
          columnIndex >= totalColumns ||
          !Number.isInteger(columnIndex)
        ) {
          throw `columnIndex must be an integer between 0 and ${
            totalColumns - 1
          } inclusive`;
        }
      };

      const validateColumnGroupIndex = (columnGroupIndex) => {
        const totalColumnGroups =
          fixedColumnGroups.length +
          scrollableColumnGroups.length +
          fixedRightColumnGroups.length;

        if (
          columnGroupIndex < 0 ||
          columnGroupIndex >= totalColumnGroups ||
          !Number.isInteger(columnGroupIndex)
        ) {
          throw `columnGroupIndex must be an integer between 0 and ${
            totalColumnGroups - 1
          } inclusive`;
        }
      };

      const validateCellGroupType = (cellGroupType, allowNil = false) => {
        if (allowNil && isNil(cellGroupType)) {
          return;
        }
        if (
          cellGroupType !== CellGroupType.FIXED &&
          cellGroupType !== CellGroupType.FIXED_RIGHT &&
          cellGroupType !== CellGroupType.SCROLLABLE
        ) {
          throw 'Invalid CellGroupType';
        }
      };

      const _getCellGroupTypeFromColumnIndex = (columnIndex) => {
        if (columnIndex < fixedColumns.length) {
          return CellGroupType.FIXED;
        }

        if (columnIndex < fixedColumns.length + scrollableColumns.length) {
          return CellGroupType.SCROLLABLE;
        }

        return CellGroupType.FIXED_RIGHT;
      };

      const _getCellGroupTypeFromColumnGroupIndex = (columnGroupIndex) => {
        if (columnGroupIndex < fixedColumnGroups.length) {
          return CellGroupType.FIXED;
        }

        if (
          columnGroupIndex <
          fixedColumnGroups.length + scrollableColumnGroups.length
        ) {
          return CellGroupType.SCROLLABLE;
        }

        return CellGroupType.FIXED_RIGHT;
      };

      const _getLocalColumnIndex = (columnIndex, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return columnIndex;
        }
        if (cellGroupType === CellGroupType.SCROLLABLE) {
          return columnIndex - fixedColumns.length;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return columnIndex - fixedColumns.length - scrollableColumns.length;
        }
      };

      const _getLocalColumnGroupIndex = (columnGroupIndex, cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return columnGroupIndex;
        }
        if (cellGroupType === CellGroupType.SCROLLABLE) {
          return columnGroupIndex - fixedColumnGroups.length;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return (
            columnGroupIndex -
            fixedColumnGroups.length -
            scrollableColumnGroups.length
          );
        }
      };

      const getCellGroupWidth = (cellGroupType = CellGroupType.SCROLLABLE) => {
        validateCellGroupType(cellGroupType);
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        return container.reduce((sum, column) => sum + column.width, 0);
      };

      const _getColumn = (columnIndex, cellGroupType) => {
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        const localColumnIndex = _getLocalColumnIndex(
          columnIndex,
          cellGroupType
        );
        return container[localColumnIndex];
      };

      const getColumn = (columnIndex) => {
        validateColumnIndex(columnIndex);
        const cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);
        const column = _getColumn(columnIndex, cellGroupType);
        return _getMinimalColumn(column);
      };

      const getColumnCount = (cellGroupType = null) => {
        validateCellGroupType(cellGroupType, true);
        if (isNil(cellGroupType)) {
          return (
            fixedColumns.length +
            scrollableColumns.length +
            fixedRightColumns.length
          );
        }
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        return container.length;
      };

      const getColumnGroupCount = (cellGroupType = null) => {
        validateCellGroupType(cellGroupType, true);
        if (isNil(cellGroupType)) {
          return (
            fixedColumnGroups.length +
            scrollableColumnGroups.length +
            fixedRightColumnGroups.length
          );
        }
        const container = _getColumnGroupContainerByCellGroupType(
          cellGroupType
        );
        return container.length;
      };

      const _getColumnGroup = (columnGroupIndex, cellGroupType) => {
        const container = _getColumnGroupContainerByCellGroupType(
          cellGroupType
        );
        const localColumnGroupIndex = _getLocalColumnGroupIndex(
          columnGroupIndex,
          cellGroupType
        );
        return _getMinimalColumnGroup(container[localColumnGroupIndex]);
      };

      const getColumnGroup = (columnGroupIndex) => {
        validateColumnGroupIndex(columnGroupIndex);
        const cellGroupType = _getCellGroupTypeFromColumnGroupIndex(
          columnGroupIndex
        );
        return _getColumnGroup(columnGroupIndex, cellGroupType);
      };

      const getColumnGroupByChild = (columnIndex) => {
        validateColumnIndex(columnIndex);
        const cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);
        const groupIndex = _getColumn(columnIndex, cellGroupType).groupIdx;
        const columnGroup = _getColumnGroupByAbsoluteIndex(groupIndex);
        return _getMinimalColumnGroup(columnGroup);
      };

      const _getColumnContainerByCellGroupType = (cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumns;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumns;
        } else if (cellGroupType === CellGroupType.SCROLLABLE) {
          return scrollableColumns;
        } else {
          throw 'Invalid cell group type';
        }
      };

      const _getColumnGroupContainerByCellGroupType = (cellGroupType) => {
        if (cellGroupType === CellGroupType.FIXED) {
          return fixedColumnGroups;
        } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
          return fixedRightColumnGroups;
        } else if (cellGroupType === CellGroupType.SCROLLABLE) {
          return scrollableColumnGroups;
        } else {
          throw 'Invalid cell group type';
        }
      };

      const _getColumnGroupByAbsoluteIndex = (absoluteIndex) => {
        let fixedCount = size(fixedColumnGroups);
        let scrollableCount = size(scrollableColumnGroups);
        let fixedRightCount = size(fixedRightColumnGroups);
        if (inRange(absoluteIndex, 0, fixedCount)) {
          return fixedColumnGroups[absoluteIndex];
        } else if (
          inRange(absoluteIndex, fixedCount, fixedCount + scrollableCount)
        ) {
          return scrollableColumnGroups[absoluteIndex - fixedCount];
        } else if (
          inRange(
            absoluteIndex,
            fixedCount + scrollableCount,
            fixedCount + scrollableCount + fixedRightCount
          )
        ) {
          return fixedRightColumnGroups[
            absoluteIndex - fixedCount - scrollableCount
          ];
        } else {
          throw 'Invalid absolute column group index';
        }
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
          currentOffset += container[index].width;
          index++;
        }

        index = clamp(index - 1, 0, container.length - 1);

        return {
          element: container[index],
          distanceFromOffset: container[index].width - (currentOffset - offset),
        };
      };

      const getColumnAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        validateCellGroupType(cellGroupType);
        const container = _getColumnContainerByCellGroupType(cellGroupType);

        let { element, distanceFromOffset } = _getElementAtOffset(
          container,
          offset
        );

        if (element) {
          element = _getMinimalColumnGroup(element);
        }

        return {
          column: element,
          distanceFromOffset,
        };
      };

      const getColumnGroupAtOffset = (
        offset,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        validateCellGroupType(cellGroupType);
        const container = _getColumnGroupContainerByCellGroupType(
          cellGroupType
        );

        let { element, distanceFromOffset } = _getElementAtOffset(
          container,
          offset
        );

        if (element) {
          element = _getMinimalColumnGroup(element);
        }

        return {
          columnGroup: element,
          distanceFromOffset,
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
