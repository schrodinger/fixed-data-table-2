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
    'fixedRight',
    'groupIdx', // only used when column virtualization is turned on
    'maxWidth',
    'minWidth',
    'isReorderable',
    'isResizable',
    'pureRendering',
    'width',
  ]);
}

function _extractPropsFromData(column) {
  return _extractProps({ props: column });
}

function _extractTemplates(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
}

function _extractTemplatesFromData(elementTemplates, column) {
  return _extractTemplates(elementTemplates, { props: column });
}

function getDefaultElementTemplates() {
  return {
    cell: [],
    footer: [],
    groupHeader: [],
    header: [],
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
    invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__,
      'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />');

    children.push(child);
  });

  const elementTemplates = getDefaultElementTemplates();

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

/**
 *
 */
function collectPropsAndTemplatesFromColumnData(column, columnProps, elementTemplates) {
  columnProps.push(_extractPropsFromData(column));
  _extractTemplatesFromData(elementTemplates, column);
}

/**
 * Uses columnGetter to fetch column props and cell rendering templates
 *
 * @param {!function(number)} columnGetter
 * @param {!number} columnsCount
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   elementTemplates: !Object.<string, Array>,
 *   useGroupHeader: boolean,
 * }}
 */
function fetchColumnData(columnGetter, columnsCount) {
  let columnProps = [];
  let columnGroupProps = [];
  let columnsWithDefinedGroupIndex = 0;
  let columnGroups = [];

  const elementTemplates = getDefaultElementTemplates();

  // fetch column props and templates for each column
  for (let index = 0; index < columnsCount; index++) {
    collectPropsAndTemplatesFromColumnData(columnGetter({ index }), columnProps, elementTemplates);
  }

  // keep a map of group indexes which will be used to fetch the column groups
  forEach(columnProps, (column) => {
    const groupIndex = column.groupIdx;
    if (groupIndex !== undefined && groupIndex !== null) {
      columnGroups[groupIndex] = true;
      columnsWithDefinedGroupIndex++;
    }
  });

  // if group index was specified, it should be given for every column
  if (columnsWithDefinedGroupIndex > 0) {
    invariant(columnsWithDefinedGroupIndex === columnProps.length,
      'group index if specified must be given for every column');
  }

  // fetch the column groups
  for (let index = 0; index < Object.keys(columnGroups).length; index++) {
    columnGroups[index] = Object.assign({}, columnGetter({ index, group: true }, { index }));
  }

  // the column groups can be specified out of order, but our reducers/selectors require
  // it to be specified in order. So we'll sort it.
  columnGroups.sort((a, b) => a.index - b.index);

  // fetch column group props and templates for each column group
  for (let index = 0; index < columnGroups.length; index++) {
    columnGroupProps.push(_extractPropsFromData(columnGroups[index]));
    elementTemplates.groupHeader.push(columnGroups[index].header);
  }

  return {
    columnGroupProps,
    columnProps,
    elementTemplates,
    useGroupHeader: columnsWithDefinedGroupIndex > 0,
  };
}

function getColumnData({ allowColumnVirtualization, children, columnGetter, columnsCount }) {
  // use column getter API to get the column data
  if (allowColumnVirtualization && columnGetter) {
    return fetchColumnData(columnGetter, columnsCount);
  }

  // use legacy API (React Children) to get the column data
  return convertColumnElementsToData(children);
}

export default getColumnData;
