/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertColumnElementsToData
 */

'use strict';

import React from 'React';
import forEach from 'lodash/forEach';
import invariant from 'invariant';
import map from 'lodash/map';
import pick from 'lodash/pick';

function _extractProps(column) {
  return pick(column.props, [
    'align',
    'allowCellsRecycling',
    'cellClassName',
    'columnKey',
    'flexGrow',
    'fixed',
    'maxWidth',
    'minWidth',
    'isReorderable',
    'isResizable',
    'width',
  ]);
};

function _extractTemplates(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
};

/**
 * Converts React column / column group elements into props and cell rendering templates
 */
function convertColumnElementsToData(props) {
  const children = [];
  React.Children.forEach(props.children, (child, index) => {
    if (child == null) {
      return;
    }
    invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__,
      'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />');

    children.push(child);
  });

  const elementTemplates = {
    cell: [],
    footer: [],
    groupHeader: [],
    header: [],
  };

  const hasGroupHeader = children.length && children[0].type.__TableColumnGroup__;
  if (hasGroupHeader) {
    const columnGroups = map(children, _extractProps);
    forEach(children, (columnGroupElement, index) => {
      elementTemplates.groupHeader.push(columnGroupElement.props.header);

      const columns = [];
      React.Children.forEach(columnGroupElement.props.children, (child) => {
        columns.push(_extractProps(child));
        _extractTemplates(elementTemplates, child);
      });
      columnGroups[index].columns = columns;
    });

    return {
      columnGroups,
      elementTemplates: elementTemplates,
      useGroupHeader: true,
    };
  }

  // Use a default column group
  const columns = [];
  forEach(children, (child) => {
    columns.push(_extractProps(child));
    _extractTemplates(elementTemplates, child);
  });
  return {
    columnGroups: [{
      columns: columns,
    }],
    elementTemplates: elementTemplates,
    useGroupHeader: false,
  };
};

module.exports = convertColumnElementsToData;
