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
import { adjustColumnGroupWidths, getTotalWidth } from 'widthHelper';
import Scrollbar from 'Scrollbar';
import partition from 'lodash/partition';
import scrollbarsVisible from 'scrollbarsVisible';
import shallowEqualSelector from 'shallowEqualSelector';

/**
 * @typedef {{
 *   fixed: boolean,
 *   flexGrow: number,
 *   width: number
 * }}
 */
let columnDefinition;

/**
 * @param {!Array.<{
 *   columns: !Array.<columnDefinition>,
 * }>} columnGroups
 * @param {boolean} scrollEnabledY
 * @param {number} width
 * @return {{
 *   allColumns: !Array.<columnDefinition>,
 *   availableScrollWidth: number,
 *   fixedColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */
function columnWidths(columnGroups, scrollEnabledY, width) {
  const scrollbarSpace = scrollEnabledY ? Scrollbar.SIZE + Scrollbar.OFFSET : 0;
  const viewportWidth = width - scrollbarSpace;

  const allColumns = adjustColumnGroupWidths(columnGroups, viewportWidth);
  const [
    fixedColumns,
    scrollableColumns,
  ] = partition(allColumns, column => column.fixed);

  const availableScrollWidth = viewportWidth - getTotalWidth(fixedColumns);
  const maxScrollX = Math.max(0, getTotalWidth(allColumns) - viewportWidth);
  return {
    allColumns,
    availableScrollWidth,
    fixedColumns,
    scrollableColumns,
    maxScrollX,
  };
}

export default shallowEqualSelector([
  state => state.columnGroups,
  state => scrollbarsVisible(state).scrollEnabledY,
  state => state.tableSize.width,
], columnWidths);
