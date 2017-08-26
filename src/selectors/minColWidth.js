/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule minColWidth
 */
import WidthHelper from 'FixedDataTableWidthHelper';
import { createSelector } from 'reselect';

/**
 * TODO (jordan) Check if this is cached incorrectly
 * Try creating an example with flex cols & add rows til a scrollbar appears
 *
 * @param {{
 *   columnGroups: {!Array.<{
 *     columns: !Array.{
 *       width: number,
 *     },
 *   }>},
 * }} state
 * @return {number} The minimum total width of all columns.
 *   This may be increased when we adjust for flex width.
 */
export default createSelector([
  state => state.columnGroups,
], columnGroups => {
  const allColumns = WidthHelper.getAllColumns(columnGroups);
  return WidthHelper.getTotalWidth(allColumns);
});
