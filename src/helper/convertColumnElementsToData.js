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

import forEach from 'lodash/forEach';
import map from 'lodash/map';
import pick from 'lodash/pick';

function _extractProps(props) {
  return pick(props, [
    'align',
    'allowCellsRecycling',
    'cellClassName',
    'columnKey',
    'flexGrow',
    'fixed',
    'fixedRight',
    'groupIdx', // NOTE (pradeep): only used when column virtualization is turned on
    'maxWidth',
    'minWidth',
    'isReorderable',
    'isResizable',
    'pureRendering',
    'width',
  ]);
}

function getDefaultElementTemplates() {
  return {
    cell: [],
    footer: [],
    groupHeader: [],
    header: [],
  };
}

function extractPropsFromElement(column) {
  return _extractProps(column.props);
}

function extractPropsFromData(columnsData) {
  return map(columnsData, _extractProps);
}

function extractTemplatesFromElement(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
}

function _extractTemplateFromData(elementTemplates, columnData) {
  elementTemplates.cell.push(columnData.cell);
  elementTemplates.footer.push(columnData.footer);
  elementTemplates.header.push(columnData.header);
}

function extractTemplatesFromData(columnsData, columnGroupsData) {
  const elementTemplates = getDefaultElementTemplates();
  forEach(columnsData, _extractTemplateFromData.bind(null, elementTemplates));
  forEach(columnGroupsData, (columnGroupData) => elementTemplates.groupHeader.push(columnGroupData.header));
  return elementTemplates;
}

export {
  extractPropsFromData,
  extractPropsFromElement,
  extractTemplatesFromData,
  extractTemplatesFromElement,
  getDefaultElementTemplates,
};
