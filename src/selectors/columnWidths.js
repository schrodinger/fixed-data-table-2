/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnWidths
 */
import { getTotalFlexGrow, getTotalWidth } from 'widthHelper';
import Scrollbar from 'Scrollbar';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import scrollbarsVisible from 'scrollbarsVisible';
import shallowEqualSelector from 'shallowEqualSelector';

/**
 * @typedef {{
 *   fixed: boolean,
 *   fixedRight: boolean,
 *   flexGrow: number,
 *   width: number,
 * }}
 */
let columnDefinition;

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {boolean} scrollEnabledY
 * @param {number} width
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   availableScrollWidth: number,
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */
function columnWidths(columnGroupProps, columnProps, scrollEnabledY, width) {
  const scrollbarSpace = scrollEnabledY ? Scrollbar.SIZE + Scrollbar.OFFSET : 0;
  const viewportWidth = width - scrollbarSpace;

  const {
    newColumnGroupProps,
    newColumnProps,
  } = flexWidths(columnGroupProps, columnProps, viewportWidth);
  const {
    fixedColumns,
    fixedRightColumns,
    scrollableColumns,
  } = groupColumns(newColumnProps);

  const availableScrollWidth = viewportWidth - getTotalWidth(fixedColumns);
  const maxScrollX = Math.max(0, getTotalWidth(newColumnProps) - viewportWidth);
  return {
    columnGroupProps: newColumnGroupProps,
    columnProps: newColumnProps,
    availableScrollWidth,
    fixedColumns,
    fixedRightColumns,
    scrollableColumns,
    maxScrollX,
  };
}

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {number} viewportWidth
 * @return {{
 *   newColumnGroupProps: !Array.<columnDefinition>,
 *   newColumnProps: !Array.<columnDefinition>
 * }}
 */
function flexWidths(columnGroupProps, columnProps, viewportWidth) {
  let remainingFlexGrow = getTotalFlexGrow(columnProps);
  if (remainingFlexGrow === 0) {
    return {
      newColumnGroupProps: columnGroupProps,
      newColumnProps: columnProps,
    };
  }

  const columnsWidth = getTotalWidth(columnProps);
  let remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);

  const newColumnProps = map(columnProps, column => {
    const { flexGrow } = column;
    if (!flexGrow) {
      return column;
    }

    const flexWidth = Math.floor(
      flexGrow * remainingFlexWidth / remainingFlexGrow);
    const newWidth = column.width + flexWidth;
    remainingFlexGrow -= flexGrow;
    remainingFlexWidth -= flexWidth;

    return Object.assign({}, column, { width: newWidth });
  });

  const columnGroupWidths = map(columnGroupProps, () => 0);
  forEach(newColumnProps, column => {
    if (column.groupIdx !== undefined) {
      columnGroupWidths[column.groupIdx] += column.width;
    }
  });

  let newColumnGroupProps = map(columnGroupProps, (columnGroup, idx) => {
    if (columnGroupWidths[idx] === columnGroup.width) {
      return columnGroup;
    }
    return Object.assign({}, columnGroup, { width: columnGroupWidths[idx] });
  });

  return {
    newColumnGroupProps,
    newColumnProps,
  };
}

/**
 * @param {!Array.<columnDefinition>} columnProps
 * @return {{
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>
 * }}
 */
function groupColumns(columnProps) {
  const fixedColumns = [];
  const fixedRightColumns = [];
  const scrollableColumns = [];

  forEach(columnProps, columnProp => {
    let container = scrollableColumns;
    if (columnProp.fixed) {
      container = fixedColumns;
    } else if (columnProp.fixedRight) {
      container = fixedRightColumns;
    }
    container.push(columnProp);
  });

  return {
    fixedColumns,
    fixedRightColumns,
    scrollableColumns,
  };
}

export default shallowEqualSelector([
  state => state.columnGroupProps,
  state => state.columnProps,
  state => scrollbarsVisible(state).scrollEnabledY,
  state => state.tableSize.width,
], columnWidths);
