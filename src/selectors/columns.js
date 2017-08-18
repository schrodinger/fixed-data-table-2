/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columns
 */
import Scrollbar from 'Scrollbar';
import WidthHelper from 'FixedDataTableWidthHelper';
import availableViewportWidth from 'availableViewportWidth';
import { createSelector } from 'reselect';
import partition from 'lodash/partition';

/**
 * @typedef {{
 *   fixed: boolean,
 *   flexGrow: number,
 *   width: number
 * }}
 */
let columnDefinition;

/**
 * @param {{
 *   columnGroups: !Array.<{
 *     columns: !Array.<columnDefinition>,
 *   }>,
 *   width: number,
 * }} state
 * @return {{
 *   allColumns: !Array.<columnDefinition>,
 *   fixedColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 * }} A list of all the columns
 */
export default createSelector([
  state => state.columnGroups,
  availableViewportWidth,
], (columnGroups, availableViewportWidth) => {
  const allColumns = WidthHelper.adjustColumnGroupWidths(columnGroups, availableViewportWidth);
  const [fixedColumns, scrollableColumns] = partition(allColumns, column => column.fixed);
  return {
    allColumns,
    fixedColumns,
    scrollableColumns,
  };
});
