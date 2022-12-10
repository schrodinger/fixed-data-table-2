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
import forEach from 'lodash/forEach';
import map from 'lodash/map';

import shallowEqualSelector from '../helper/shallowEqualSelector';
import { getTotalFlexGrow, getTotalWidth } from '../helper/widthHelper';
import scrollbarsVisible from './scrollbarsVisible';

/**
 * @typedef {{
 *   fixed: boolean,
 *   fixedRight: boolean,
 *   flexGrow: number,
 *   width: number,
 *   groupIdx?: number
 * }} columnDefinition
 */

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
function columnWidths(
  columnGroupProps,
  columnProps,
  scrollEnabledY,
  width,
  scrollbarYWidth
) {
  const scrollbarSpace = scrollEnabledY ? scrollbarYWidth : 0;
  const viewportWidth = width - scrollbarSpace;

  const { newColumnGroupProps, newColumnProps } = flexWidths(
    columnGroupProps,
    columnProps,
    viewportWidth
  );
  const {
    fixed: fixedColumns,
    fixedRight: fixedRightColumns,
    scrollable: scrollableColumns,
  } = groupElements(newColumnProps);
  const {
    fixed: fixedColumnGroups,
    fixedRight: fixedRightColumnGroups,
    scrollable: scrollableColumnGroups,
  } = groupElements(newColumnGroupProps);

  const availableScrollWidth =
    viewportWidth -
    getTotalWidth(fixedColumns) -
    getTotalWidth(fixedRightColumns);
  const maxScrollX = Math.max(0, getTotalWidth(newColumnProps) - viewportWidth);

  return {
    columnGroupProps: newColumnGroupProps,
    columnProps: newColumnProps,
    availableScrollWidth,
    fixedColumns,
    fixedRightColumns,
    scrollableColumns,
    fixedColumnGroups,
    fixedRightColumnGroups,
    scrollableColumnGroups,
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
  let newColumnProps = columnProps;
  let remainingFlexGrow = getTotalFlexGrow(columnProps);

  // if any column is a flex column, we'll need to calculate the widths for every column
  if (remainingFlexGrow !== 0) {
    const columnsWidth = getTotalWidth(columnProps);
    let remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);

    // calculate and set width for each column
    newColumnProps = map(columnProps, (column) => {
      const { flexGrow } = column;

      // if no flexGrow is specified, column defaults to original width
      if (!flexGrow) {
        return column;
      }

      const flexWidth = Math.floor(
        (flexGrow * remainingFlexWidth) / remainingFlexGrow
      );
      const newWidth = column.width + flexWidth;
      remainingFlexGrow -= flexGrow;
      remainingFlexWidth -= flexWidth;

      return Object.assign({}, column, { width: newWidth });
    });
  }

  // calculate width for each column group
  const columnGroupWidths = map(columnGroupProps, () => 0);
  forEach(newColumnProps, (column) => {
    if (column.groupIdx !== undefined) {
      columnGroupWidths[column.groupIdx] += column.width;
    }
  });

  // set the width for each column group
  const newColumnGroupProps = map(columnGroupProps, (columnGroup, idx) => {
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
 * @param {!Array.<columnDefinition>} elements
 * @return {{
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>
 * }}
 */
function groupElements(elements) {
  const fixed = { offset: 0, elements: [] };
  const fixedRight = { offset: 0, elements: [] };
  const scrollable = { offset: 0, elements: [] };

  forEach(elements, (element) => {
    let container = scrollable;
    if (element.fixed) {
      container = fixed;
    } else if (element.fixedRight) {
      container = fixedRight;
    }

    // add offset and index of element within group
    const newElement = {
      ...element,
      offset: container.offset,
    };

    container.offset += newElement.width;
    container.elements.push(newElement);
  });

  // Assign index to each column in same order they appear in table
  let index = 0;
  forEach(fixed.elements, (element) => {
    element.index = index;
    index += 1;
  });
  forEach(scrollable.elements, (element) => {
    element.index = index;
    index += 1;
  });
  forEach(fixedRight.elements, (element) => {
    element.index = index;
    index += 1;
  });

  return {
    fixed: fixed.elements,
    fixedRight: fixedRight.elements,
    scrollable: scrollable.elements,
  };
}

export default shallowEqualSelector(
  [
    (state) => state.columnGroupProps,
    (state) => state.columnProps,
    (state) => scrollbarsVisible(state).scrollEnabledY,
    (state) => state.tableSize.width,
    (state) => state.scrollbarYWidth,
  ],
  columnWidths
);
