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

      const getCellGroupWidth = (cellGroupType = CellGroupType.SCROLLABLE) => {
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        return container.reduce((sum, column) => sum + column.width, 0);
      };

      const getColumn = (
        columnIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        return _getMinimalColumn(container[columnIndex]);
      };

      const getColumnCount = (cellGroupType = CellGroupType.SCROLLABLE) => {
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        return container.length;
      };

      const getColumnGroupCount = (
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const container =
          _getColumnGroupContainerByCellGroupType(cellGroupType);
        return container.length;
      };

      const getColumnGroup = (
        columnGroupIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const container =
          _getColumnGroupContainerByCellGroupType(cellGroupType);
        return _getMinimalColumnGroup(container[columnGroupIndex]);
      };

      const getColumnGroupByChild = (
        columnIndex,
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
        const container = _getColumnContainerByCellGroupType(cellGroupType);
        const groupIndex = get(container, [columnIndex, 'groupIdx']);
        const columnGroup = _getColumnGroupByAbsoluteIndex(groupIndex);
        return _getMinimalColumnGroup(columnGroup);
      };

      const _getColumnContainerByCellGroupType = (
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
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

      const _getColumnGroupContainerByCellGroupType = (
        cellGroupType = CellGroupType.SCROLLABLE
      ) => {
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
        const container =
          _getColumnGroupContainerByCellGroupType(cellGroupType);

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
