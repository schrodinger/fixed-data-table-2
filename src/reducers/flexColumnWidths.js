/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule flexColumnWidths
 */

'use strict';

import columnCounts from '../selectors/columnCounts';
import scrollbarsVisibleSelector from '../selectors/scrollbarsVisible';
import {
  getScrollableColumn,
  updateScrollableColumnWidth,
} from './updateScrollableColumn';

/**
 * @param state
 * @param props
 */
export function initializeFlexColumnWidths(state) {
  const { scrollEnabledY } = scrollbarsVisibleSelector(state);
  const tableWidth = state.tableSize.width;
  const scrollbarSpace = scrollEnabledY ? state.scrollbarYWidth : 0;
  const { scrollableColumnsCount } = columnCounts(state);
  let availableWidth = tableWidth - scrollbarSpace - state.fixedContentWidth;

  let flexTotal = 0;

  for (let column of [...state.fixedColumns, ...state.fixedRightColumns]) {
    flexTotal += column.props.flexGrow || 0;
  }

  // iterate scrollable columns until they fill up the available space
  let idx = 0;
  while (availableWidth > 0 && idx < scrollableColumnsCount) {
    const column = getScrollableColumn(state, idx);
    availableWidth -= column.props.width;
    flexTotal += column.props.flexGrow || 0;
    idx++;
  }

  // check if there's free space left to fill up flex widths
  if (availableWidth <= 0 && idx < scrollableColumnsCount) {
    return;
  }

  // generic function to update given set of columns with new width based on their flex grow.
  const updateFlexWidths = (columns, columnUpdater) => {
    _.forEach(columns, (column, columnIndex) => {
      const { flexGrow, width } = column.props;

      // if no flexGrow is specified, column defaults to the original width
      if (!flexGrow) {
        return;
      }

      const flexWidth = Math.floor((flexGrow * availableWidth) / flexTotal);

      const newWidth = width + flexWidth;
      flexTotal -= flexGrow;
      availableWidth -= flexWidth;

      columnUpdater(column, _.toNumber(columnIndex), newWidth);
    });
  };

  // update columns with new width based on their flexGrow
  // NOTE (pradeep): Notice that we're iterating for every scrollable column. This is totally fine since we ensured that
  // the total scrollable columns are all within the viewport (otherwise we wouldn't need to fill up flex widths here)
  updateFlexWidths(
    state.storedScrollableColumns.object,
    (column, columnIndex, newWidth) => {
      updateScrollableColumnWidth(state, columnIndex, newWidth);
    }
  );

  updateFlexWidths(state.fixedColumns, (column, columnIndex, newWidth) => {
    const oldWidth = column.props.width;
    column.props.width = newWidth;
    state.fixedColumnsWidth += newWidth - oldWidth;
  });

  updateFlexWidths(state.fixedRightColumns, (column, columnIndex, newWidth) => {
    const oldWidth = column.props.width;
    column.props.width = newWidth;
    state.fixedRightColumnsWidth += newWidth - oldWidth;
  });
}
