/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollContentWidth
 */
import WidthHelper from 'FixedDataTableWidthHelper';
import columns from 'columns';
import { createSelector } from 'reselect';

/**
 * @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       flexGrow: number,
 *       width: number,
 *     },
 *   }>},
 *   width: number,
 * }} state
 * @return {number} The total width of all columns.
 */
export default createSelector([
  columns,
], columns => {
  const { allColumns } = columns;
  return WidthHelper.getTotalWidth(allColumns);
});
