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

import Table from './FixedDataTableContainer';
import Cell from './FixedDataTableCellDefaultDeprecated';
import DataCell from './FixedDataTableCellDefault';
import Column from './FixedDataTableColumn';
import ColumnGroup from './FixedDataTableColumnGroup';
import { PluginContext } from './Context';
import ResizeCell from './plugins/ResizeReorder/ResizeCell';
import ReorderCell from './plugins/ResizeReorder/ReorderCell';

const version = '2.0.0-beta.3';

const Plugins = {
  PluginContext,
  ResizeCell,
  ReorderCell,
};

export { Cell, Column, ColumnGroup, DataCell, Table, Plugins, version };
