/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnDetails
 */
import columnsSelector from 'columns';
import { createSelector } from 'reselect';
import forEach from 'lodash/forEach';

/**
 * @typedef {{
 *   props: !Object,
 *   template: ReactElement,
 * }}
 */
let cellTemplate;

/**
 * @typedef {{
 *   cell: !Array.<cellDetails>,
 *   footer: !Array.<cellDetails>,
 *   header: !Array.<cellDetails>,
 * }}
 */
let columnTemplates;

/**
 * @param {{
 *   columnGroups: !Array.<{
 *     columns: !Array.<{
 *       flexGrow: number,
 *       width: number
 *     }>,
 *   }>,
 *   elementTemplates: {
 *     cell: !Array.<ReactElement>,
 *     footer: !Array.<ReactElement>,
 *     groupHeader !Array.<ReactElement>,
 *     header !Array.<ReactElement>,
 *   },
 *   width: number,
 * }} state
 * @return {{
 *   fixedColumnGroups: !Array.<cellTemplate>,
 *   scrollableColumnGroups: !Array.<cellTemplate>,
 *   fixedColumns: !Array.<columnTemplates>,
 *   scrollableColumns: !Array.<columnTemplates>,
 * }} Lists of details for the fixed and scrollable columns and column groups
 */
export default createSelector([
  state => state.columnGroups,
  columnsSelector,
  state => state.elementTemplates,
], (columnGroups, columns, elementTemplates) => {
  const { allColumns } = columns;

  // Ugly transforms to extract data into a row consumable format.
  // TODO (jordan) figure out if this can efficiently be merged with the result of convertColumnElementsToData.
  const fixedColumnGroups = [];
  const scrollableColumnGroups = [];
  forEach(columnGroups, (columnGroup, index) => {
    const groupData = {
      props: columnGroup,
      template: elementTemplates.groupHeader[index],
    };
    if (columnGroup.fixed) {
      fixedColumnGroups.push(groupData);
    } else {
      scrollableColumnGroups.push(groupData);
    }
  });

  const fixedColumns = {
    cell: [],
    header: [],
    footer: [],
  };
  const scrollableColumns = {
    cell: [],
    header: [],
    footer: [],
  };
  forEach(allColumns, (column, index) => {
    let columnContainer = scrollableColumns;
    if (column.fixed) {
      columnContainer = fixedColumns;
    }

    columnContainer.cell.push({
      props: column,
      template: elementTemplates.cell[index],
    });
    columnContainer.header.push({
      props: column,
      template: elementTemplates.header[index],
    });
    columnContainer.footer.push({
      props: column,
      template: elementTemplates.footer[index],
    });
  });

  return {
    fixedColumnGroups,
    fixedColumns,
    scrollableColumnGroups,
    scrollableColumns,
  };
});
