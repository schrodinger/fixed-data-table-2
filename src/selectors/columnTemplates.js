/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnTemplates
 */
import columnWidths from 'columnWidths';
import forEach from 'lodash/forEach';
import shallowEqualSelector from 'shallowEqualSelector';

/**
 * @typedef {{
 *   props: !Object,
 *   template: ReactElement,
 * }}
 */
let cellDetails;

/**
 * @typedef {{
 *   cell: !Array.<cellDetails>,
 *   footer: !Array.<cellDetails>,
 *   header: !Array.<cellDetails>,
 * }}
 */
let columnDetails;

/**
 * Lists of cell templates & component props for
 * the fixed and scrollable columns and column groups
 *
 * @param {{
 *   columnGroupProps: !Array.<!Object>,
 *   columnProps: !Array.<!Object>,
 *   }>,
 * }} columnWidths
 * @param {{
 *   cell: !Array.<ReactElement>,
 *   footer: !Array.<ReactElement>,
 *   groupHeader !Array.<ReactElement>,
 *   header !Array.<ReactElement>,
 * }} elementTemplates
 * @return {{
 *   fixedColumnGroups: !Array.<cellDetails>,
 *   scrollableColumnGroups: !Array.<cellDetails>,
 *   fixedColumns: !Array.<columnDetails>,
 *   scrollableColumns: !Array.<columnDetails>,
 * }}
 */
function columnTemplates(columnWidths, elementTemplates) {
  const { columnGroupProps, columnProps } = columnWidths;

  // Ugly transforms to extract data into a row consumable format.
  // TODO (jordan) figure out if this can efficiently be merged with
  // the result of convertColumnElementsToData.
  const fixedColumnGroups = [];
  const scrollableColumnGroups = [];
  forEach(columnGroupProps, (columnGroup, index) => {
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
  forEach(columnProps, (column, index) => {
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
}

export default shallowEqualSelector([
  state => columnWidths(state),
  state => state.elementTemplates,
], columnTemplates);
