/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnsCount
 */

'use strict';

/**
 * @param {Object} state
 * @returns {Number}
 */
export default function columnCounts(state) {
  const { columnSettings, fixedColumns, fixedRightColumns } = state;
  return {
    fixedColumnsCount: fixedColumns.length,
    fixedRightColumnsCount: fixedRightColumns.length,
    scrollableColumnsCount:
      columnSettings.columnsCount -
      fixedColumns.length -
      fixedRightColumns.length,
  };
}
