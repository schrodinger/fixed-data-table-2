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

import FixedDataTableContainer from 'FixedDataTableContainer';
import FixedDataTableCellDefault from 'FixedDataTableCellDefault';
import FixedDataTableColumn from 'FixedDataTableColumn';
import FixedDataTableColumnGroup from 'FixedDataTableColumnGroup';

var FixedDataTableRoot = {
  Cell: FixedDataTableCellDefault,
  Column: FixedDataTableColumn,
  ColumnGroup: FixedDataTableColumnGroup,
  Table: FixedDataTableContainer,
};

FixedDataTableRoot.version = '0.7.12';
module.exports = FixedDataTableRoot;
