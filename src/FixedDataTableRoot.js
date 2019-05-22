/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRoot
 */

'use strict';

const FixedDataTableContainer = require('FixedDataTableContainer').default;
const FixedDataTableCellDefault  = require('FixedDataTableCellDefault').default;
const FixedDataTableColumn = require('FixedDataTableColumn').default;
const FixedDataTableColumnGroup = require('FixedDataTableColumnGroup').default;

var FixedDataTableRoot = {
  Cell: FixedDataTableCellDefault,
  Column: FixedDataTableColumn,
  ColumnGroup: FixedDataTableColumnGroup,
  Table: FixedDataTableContainer,
};

FixedDataTableRoot.version = '1.0.0-beta.17';
module.exports = FixedDataTableRoot;
