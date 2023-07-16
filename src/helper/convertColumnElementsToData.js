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
import { CellGroupType } from '../enums/CellGroup';
import { transform } from 'lodash';

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

function getCellGroupType(element) {
  if (element?.props?.fixed) {
    return CellGroupType.FIXED;
  } else if (element?.props?.fixedRight) {
    return CellGroupType.FIXED_RIGHT;
  } else {
    return CellGroupType.SCROLLABLE;
  }
}

function getElementsContainer() {
  return {
    [CellGroupType.FIXED]: [],
    [CellGroupType.FIXED_RIGHT]: [],
    [CellGroupType.SCROLLABLE]: [],
  };
}

function getElementTemplates() {
  return {
    groupHeader: [],
    header: [],
    cell: [],
    footer: [],
  };
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

  const columnElements = getElementsContainer();
  const columnGroupElements = getElementsContainer();
  const elementTemplates = getElementTemplates();
  const useGroupHeader =
    children.length && children[0].type.__TableColumnGroup__;

  let columnIndex = 0;
  let columnGroupIndex = 0;

  if (useGroupHeader) {
    for (const columnGroupReactElement of children) {
      const cellGroupType = getCellGroupType(columnGroupReactElement);
      const columnGroupProps = _extractProps(columnGroupReactElement);
      columnGroupProps.index = columnGroupIndex;
      columnGroupElements[cellGroupType].push(columnGroupProps);
      elementTemplates.groupHeader.push(columnGroupReactElement.props.header);

      React.Children.forEach(
        columnGroupReactElement.props.children,
        (columnReactElement) => {
          const columnProps = _extractProps(columnReactElement);
          columnProps.index = columnIndex;
          columnProps.groupIdx = columnGroupIndex;
          columnElements[cellGroupType].push(columnProps);
          _extractTemplates(elementTemplates, columnReactElement);
          columnIndex++;
        }
      );

      columnGroupIndex++;
    }
  } else {
    for (const columnReactElement of children) {
      const cellGroupType = getCellGroupType(columnReactElement);
      const columnProps = _extractProps(columnReactElement);
      columnProps.index = columnIndex;
      columnElements[cellGroupType].push(columnProps);
      _extractTemplates(elementTemplates, columnReactElement);
      columnIndex++;
    }
  }

  return {
    columnGroupElements,
    columnElements,
    elementTemplates,
    useGroupHeader,
  };
}

export default convertColumnElementsToData;
