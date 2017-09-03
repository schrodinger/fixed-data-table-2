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
function convertColumnElementsToData(childComponents) {
  const children = [];
  React.Children.forEach(childComponents, (child, index) => {
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

  const columnProps = [];
  const hasGroupHeader = children.length && children[0].type.__TableColumnGroup__;
  if (hasGroupHeader) {
    const columnGroupProps = map(children, _extractProps);
    forEach(children, (columnGroupElement, index) => {
      elementTemplates.groupHeader.push(columnGroupElement.props.header);

      React.Children.forEach(columnGroupElement.props.children, (child) => {
        const column = _extractProps(child);
        column.groupIdx = index;
        columnProps.push(column);
        _extractTemplates(elementTemplates, child);
      });
    });

    return {
      columnGroupProps,
      columnProps,
      elementTemplates,
      useGroupHeader: true,
    };
  }

  // Use a default column group
  forEach(children, (child) => {
    columnProps.push(_extractProps(child));
    _extractTemplates(elementTemplates, child);
  });
  return {
    columnGroupProps: [],
    columnProps,
    elementTemplates,
    useGroupHeader: false,
  };
};

export default convertColumnElementsToData;
