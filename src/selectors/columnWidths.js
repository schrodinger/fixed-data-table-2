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
import shallowEqualSelector from '../helper/shallowEqualSelector';
import {
  getTotalFlexGrow,
  getTotalWidth,
  getTotalWidthContainer,
} from '../helper/widthHelper';
import scrollbarsVisible from './scrollbarsVisible';
import concat from 'lodash/concat';
import { getEmptyElementsContainer } from '../helper/convertColumnElementsToData';

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
 *   fixedColumnGroups: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   fixedRightColumnGroups: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   scrollableColumnGroups: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */
function columnWidths(
  columnGroupElements,
  columnElements,
  scrollEnabledY,
  width,
  scrollbarYWidth
) {
  const scrollbarSpace = scrollEnabledY ? scrollbarYWidth : 0;
  const viewportWidth = width - scrollbarSpace;

  const {
    columnGroupElements: columnGroupElementsWithFlex,
    columnElements: columnElementsWithFlex,
  } = flexWidths(columnGroupElements, columnElements, viewportWidth);
  const {
    fixed: fixedColumns,
    fixedRight: fixedRightColumns,
    scrollable: scrollableColumns,
  } = groupElementsByCellGroup(columnElementsWithFlex);
  const {
    fixed: fixedColumnGroups,
    fixedRight: fixedRightColumnGroups,
    scrollable: scrollableColumnGroups,
  } = groupElementsByCellGroup(columnGroupElementsWithFlex);

  const fixedColumnsTotalWidth = getTotalWidth(fixedColumns);
  const fixedRightColumnsTotalWidth = getTotalWidth(fixedRightColumns);
  const scrollableColumnsTotalWidth = getTotalWidth(scrollableColumns);
  const availableScrollWidth =
    viewportWidth - fixedColumnsTotalWidth - fixedRightColumnsTotalWidth;
  const maxScrollX = Math.max(
    0,
    fixedColumnsTotalWidth +
      fixedRightColumnsTotalWidth +
      scrollableColumnsTotalWidth -
      viewportWidth
  );

  return {
    columnGroupProps: concat(
      fixedColumnGroups,
      scrollableColumnGroups,
      fixedRightColumnGroups
    ),
    columnProps: concat(fixedColumns, scrollableColumns, fixedRightColumns),
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
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>
 * }}
 */
function flexWidths(columnGroupElements, columnElements, viewportWidth) {
  const columnGroupElementsWithFlex = getEmptyElementsContainer();
  const columnElementsWithFlex = getEmptyElementsContainer();
  const columnsWidth = getTotalWidthContainer(columnElements);

  let remainingFlexGrow = getTotalFlexGrow(columnElements);
  let remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);

  const columnGroupWidths = [];
  // calculate widths and offsets for each column based on flex
  for (const cellGroupType in columnElements) {
    const columnProps = columnElements[cellGroupType];
    let offset = 0;
    let columnIndex = 0;
    for (const column of columnProps) {
      const flexGrow = column.flexGrow || 0;

      let flexWidth = 0;
      if (flexGrow) {
        flexWidth = Math.floor(
          (flexGrow * remainingFlexWidth) / remainingFlexGrow
        );
      }
      const width = column.width + flexWidth;
      remainingFlexGrow -= flexGrow;
      remainingFlexWidth -= flexWidth;

      const newColumn = Object.assign({}, column, { width, offset });
      offset += width;
      columnGroupWidths[column.groupIdx] =
        width + (columnGroupWidths[column.groupIdx] || 0);
      columnElementsWithFlex[cellGroupType][columnIndex] = newColumn;
      columnIndex++;
    }
  }

  // calculate widths and offsets for each column group
  for (const cellGroupType in columnGroupElements) {
    const columnGroupProps = columnGroupElements[cellGroupType];
    let offset = 0;
    let index = 0;
    for (const columnGroup of columnGroupProps) {
      const width = columnGroupWidths[columnGroup.index];
      const newColumnGroup = Object.assign({}, columnGroup, { width, offset });
      offset += width;
      columnGroupElementsWithFlex[cellGroupType][index] = newColumnGroup;
      index++;
    }
  }

  return {
    columnGroupElements: columnGroupElementsWithFlex,
    columnElements: columnElementsWithFlex,
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
function groupElementsByCellGroup(elements) {
  return {
    fixed: elements.fixed,
    fixedRight: elements.fixedRight,
    scrollable: elements.scrollable,
  };
}

export default shallowEqualSelector(
  [
    (state) => state.columnGroupElements,
    (state) => state.columnElements,
    (state) => scrollbarsVisible(state).scrollEnabledY,
    (state) => state.tableSize.width,
    (state) => state.scrollbarYWidth,
  ],
  columnWidths
);
