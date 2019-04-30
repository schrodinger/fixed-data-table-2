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

var _FixedDataTable = require('./FixedDataTable');

var _FixedDataTable2 = _interopRequireDefault(_FixedDataTable);

var _FixedDataTableCellDefault = require('./FixedDataTableCellDefault');

var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

var _FixedDataTableColumn = require('./FixedDataTableColumn');

var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

var _FixedDataTableColumnGroup = require('./FixedDataTableColumnGroup');

var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedDataTableRoot = {
  Cell: _FixedDataTableCellDefault2.default,
  Column: _FixedDataTableColumn2.default,
  ColumnGroup: _FixedDataTableColumnGroup2.default,
  Table: _FixedDataTable2.default
};

FixedDataTableRoot.version = '0.8.3';
module.exports = FixedDataTableRoot;