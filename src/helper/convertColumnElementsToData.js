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
import invariant from '../stubs/invariant';
import { CellGroupType } from '../enums/CellGroup';

// NOTE (pradeep): This can be simplified via _.pick()
// However, _.pick is much slower than the hand written version here.
function _extractProps(column) {
  const {
    align,
    allowCellsRecycling,
    cellClassName,
    columnKey,
    flexGrow,
    fixed,
    fixedRight,
    maxWidth,
    minWidth,
    isReorderable,
    isResizable,
    pureRendering,
    width,
  } = column.props;
  return {
    align,
    allowCellsRecycling,
    cellClassName,
    columnKey,
    flexGrow,
    fixed,
    fixedRight,
    maxWidth,
    minWidth,
    isReorderable,
    isResizable,
    pureRendering,
    width,
  };
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

function getEmptyElementsContainer() {
  return {
    [CellGroupType.FIXED]: [],
    [CellGroupType.SCROLLABLE]: [],
    [CellGroupType.FIXED_RIGHT]: [],
  };
}

function getEmptyTemplatesContainer() {
  return {
    groupHeader: [],
    header: [],
    cell: [],
    footer: [],
  };
}

function _sortByCellGroupType(reactElements) {
  const container = getEmptyElementsContainer();
  for (const element of reactElements) {
    const cellGroupType = getCellGroupType(element);
    container[cellGroupType].push(element);
  }
  const result = [];
  result.push.apply(result, container[CellGroupType.FIXED]);
  result.push.apply(result, container[CellGroupType.SCROLLABLE]);
  result.push.apply(result, container[CellGroupType.FIXED_RIGHT]);
  return result;
}

function _getElementIndex(elementsContainer, cellGroupType) {
  if (cellGroupType === CellGroupType.FIXED) {
    return elementsContainer[CellGroupType.FIXED].length;
  } else if (cellGroupType === CellGroupType.SCROLLABLE) {
    return (
      elementsContainer[CellGroupType.FIXED].length +
      elementsContainer[CellGroupType.SCROLLABLE].length
    );
  } else {
    return (
      elementsContainer[CellGroupType.FIXED].length +
      elementsContainer[CellGroupType.SCROLLABLE].length +
      elementsContainer[CellGroupType.FIXED_RIGHT].length
    );
  }
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

  const columnElements = getEmptyElementsContainer();
  const columnGroupElements = getEmptyElementsContainer();
  const elementTemplates = getEmptyTemplatesContainer();
  const useGroupHeader = children[0]?.type.__TableColumnGroup__ ?? false;

  if (useGroupHeader) {
    let columnIndex = 0;
    for (const columnGroupReactElement of _sortByCellGroupType(children)) {
      const cellGroupType = getCellGroupType(columnGroupReactElement);
      const columnGroupProps = _extractProps(columnGroupReactElement);
      columnGroupProps.index = _getElementIndex(
        columnGroupElements,
        cellGroupType
      );
      columnGroupElements[cellGroupType].push(columnGroupProps);
      elementTemplates.groupHeader.push(columnGroupReactElement.props.header);

      React.Children.forEach(
        columnGroupReactElement.props.children,
        (columnReactElement) => {
          const columnProps = _extractProps(columnReactElement);
          columnProps.index = columnIndex++;
          columnProps.groupIdx = columnGroupProps.index;
          columnElements[cellGroupType].push(columnProps);
          _extractTemplates(elementTemplates, columnReactElement);
        }
      );
    }
  } else {
    for (const columnReactElement of _sortByCellGroupType(children)) {
      const cellGroupType = getCellGroupType(columnReactElement);
      const columnProps = _extractProps(columnReactElement);
      columnProps.index = _getElementIndex(columnElements, cellGroupType);
      columnElements[cellGroupType].push(columnProps);
      _extractTemplates(elementTemplates, columnReactElement);
    }
  }

  return {
    columnGroupElements,
    columnElements,
    elementTemplates,
    useGroupHeader,
  };
}

export { getEmptyElementsContainer };
export default convertColumnElementsToData;
