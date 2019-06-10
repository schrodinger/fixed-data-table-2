/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnData
 */

'use strict';

import {
  extractPropsFromData,
  extractPropsFromElement,
  extractTemplatesFromData,
  extractTemplatesFromElement,
  getDefaultElementTemplates
} from 'convertColumnElementsToData';
import React from 'react';
import forEach from 'lodash/forEach';
import invariant from 'invariant';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import shallowEqualSelector from 'shallowEqualSelector';
import pick from 'lodash/pick';

/**
 * Converts React column / column group elements into props and cell rendering templates
 */
function convertColumnElementsToData(childComponents) {
  const children = [];
  React.Children.forEach(childComponents, (child) => {
    if (child == null) {
      return;
    }
    invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__,
      'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />');

    children.push(child);
  });

  const elementTemplates = getDefaultElementTemplates();

  const columnProps = [];
  const hasGroupHeader = children.length && children[0].type.__TableColumnGroup__;
  if (hasGroupHeader) {
    const columnGroupProps = map(children, extractPropsFromElement);
    forEach(children, (columnGroupElement, index) => {
      elementTemplates.groupHeader.push(columnGroupElement.props.header);

      React.Children.forEach(columnGroupElement.props.children, (child) => {
        const column = extractPropsFromElement(child);
        column.groupIdx = index;
        columnProps.push(column);
        extractTemplatesFromElement(elementTemplates, child);
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
    columnProps.push(extractPropsFromElement(child));
    extractTemplatesFromElement(elementTemplates, child);
  });
  return {
    columnGroupProps: [],
    columnProps,
    elementTemplates,
    useGroupHeader: false,
  };
}

function fixColumnPropsWithColumnGroupProps(columnProps, columnGroupProps) {
  const columnGroups = [];
  let columnsWithDefinedGroupIndex = 0;

  forEach(columnProps, ({ groupIdx }) => {
    if (groupIdx !== undefined && groupIdx !== null) {
      columnGroups[groupIdx] = true;
      columnsWithDefinedGroupIndex++;
    }
  });

  invariant(columnGroups.length === (columnGroupProps || []).length,
    'column group data must fully and only contain every column groups');

  invariant(columnsWithDefinedGroupIndex === columnProps.length,
    'group index if specified must be given for every column');

  forEach(columnProps, (columnProp) => {
    columnProp.fixed = columnGroupProps[columnProp.groupIdx].fixed;
    columnProp.fixedRight = columnGroupProps[columnProp.groupIdx].fixedRight;
  });
}

/**
 * Uses columnData to extract column props and cell rendering templates
 *
 * @param {!Array.<columnDefinition>} columnData
 * @param {!Array.<columnDefinition>} columnGroupData
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   elementTemplates: !Object.<string, Array>,
 *   useGroupHeader: boolean,
 * }}
 */
function getColumnPropsFromData(columnData, columnGroupData) {
  const columnProps = extractPropsFromData(columnData);
  const columnGroupProps = extractPropsFromData(columnGroupData);

  const elementTemplates = extractTemplatesFromData(columnData, columnGroupData);

  fixColumnPropsWithColumnGroupProps(columnProps, columnGroupProps);

  return {
    columnGroupProps,
    columnProps,
    elementTemplates,
    useGroupHeader: columnGroupProps.length > 0,
  };
}

function getColumnData(allowColumnVirtualization, columnData, columnGroupData, childComponents) {
  // use columnData to directly get the column data
  if (allowColumnVirtualization) {
    return getColumnPropsFromData(columnData, columnGroupData);
  }

  // use legacy API (React Children) to get the column data
  return convertColumnElementsToData(childComponents);
}

export default shallowEqualSelector([
    props => props.allowColumnVirtualization,
    props => props.columnData,
    props => props.columnGroupData,
    props => props.children,
], getColumnData)
