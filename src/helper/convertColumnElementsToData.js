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
import pick from 'lodash/pick';

export function extractProps(columnProps) {
  return pick(columnProps, [
    'align',
    'allowCellsRecycling',
    'cellClassName',
    'columnKey',
    'columnGroupIndex',
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

/**
 * @param {Object} columnProps
 * @returns {CellTemplates}
 */
export function extractTemplates(columnProps) {
  return pick(columnProps, ['cell', 'footer', 'header']);
}

/**
 * @typedef {{
 *   props: !Object,
 *   templates: CellTemplates,
 * }}
 */
let ColumnDetails;

/**
 * @typedef {{
 *   cell: React.ReactElement,
 *   footer: React.ReactElement,
 *   header: React.ReactElement,
 * }}
 */
let CellTemplates;

/**
 * Converts React column / column group elements into props and cell rendering templates
 * @param {!Object} columnProps
 * @returns {!ColumnDetails}
 */
const convertColumnElementsToData = (columnProps) => {
  return {
    props: extractProps(columnProps),
    templates: extractTemplates(columnProps),
  };
};

export default convertColumnElementsToData;
