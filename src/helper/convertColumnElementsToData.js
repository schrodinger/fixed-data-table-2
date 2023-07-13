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

import React from 'react';
import forEach from 'lodash/forEach';
import invariant from '../stubs/invariant';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';

function _extractProps(column) {
  return pick(column.props, [
    'align',
    'allowCellsRecycling',
    'cellClassName',
    'columnKey',
    'flexGrow',
    'fixed',
    'fixedRight',
    'maxWidth',
    'minWidth',
    'isReorderable',
    'isResizable',
    'pureRendering',
    'width',
  ]);
}

function _extractTemplates(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
}

function sortByCellGroupType(elements) {
  const unorderedColumnGroups = groupBy(elements, (child) => {
    if (child?.props?.fixed) {
      return 'fixed';
    } else if (child?.props?.fixedRight) {
      return 'fixedRight';
    } else {
      return 'scrollable';
    }
  });

  return Array.prototype.concat.call(
    unorderedColumnGroups.fixed || [],
    unorderedColumnGroups.scrollable || [],
    unorderedColumnGroups.fixedRight || []
  );
}

/**
 * Converts React column / column group elements into props and cell rendering templates
 */
function convertColumnElementsToData(childComponents) {
  const children = [];
  React.Children.forEach(childComponents, (child, index) => {
    if (child == null) {
      return;
    }
    invariant(
      child.type.__TableColumnGroup__ || child.type.__TableColumn__,
      'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />'
    );

    children.push(child);
  });

  const elementTemplates = {
    cell: [],
    footer: [],
    groupHeader: [],
    header: [],
  };

  const columnProps = [];
  const hasGroupHeader =
    children.length && children[0].type.__TableColumnGroup__;
  if (hasGroupHeader) {
    const columnGroupProps = [];
    sortByCellGroupType(children).forEach((columnGroupElement, index) => {
      const columnGroup = _extractProps(columnGroupElement);
      columnGroupProps.push(columnGroup);
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
  sortByCellGroupType(children).forEach((child) => {
    const column = _extractProps(child);
    columnProps.push(column);
    _extractTemplates(elementTemplates, child);
  });

  return {
    columnGroupProps: [],
    columnProps,
    elementTemplates,
    useGroupHeader: false,
  };
}

export default convertColumnElementsToData;
