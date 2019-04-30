/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableHelper
 * @typechecks
 */

'use strict';

var _Locale = require('./Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _FixedDataTableColumnGroup = require('./FixedDataTableColumnGroup');

var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

var _FixedDataTableColumn = require('./FixedDataTableColumn');

var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DIR_SIGN = _Locale2.default.isRTL() ? -1 : +1;
// A cell up to 5px outside of the visible area will still be considered visible
var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

function renderToString(value) /*string*/{
  if (value === null || value === undefined) {
    return '';
  } else {
    return String(value);
  }
}

/**
 * Helper method to execute a callback against all columns given the children
 * of a table.
 * @param {?object|array} children
 *    Children of a table.
 * @param {function} callback
 *    Function to excecute for each column. It is passed the column.
 */
function forEachColumn(children, callback) {
  _React2.default.Children.forEach(children, function (child) {
    if (child.type === _FixedDataTableColumnGroup2.default) {
      forEachColumn(child.props.children, callback);
    } else if (child.type === _FixedDataTableColumn2.default) {
      callback(child);
    }
  });
}

/**
 * Helper method to map columns to new columns. This takes into account column
 * groups and will generate a new column group if its columns change.
 * @param {?object|array} children
 *    Children of a table.
 * @param {function} callback
 *    Function to excecute for each column. It is passed the column and should
 *    return a result column.
 */
function mapColumns(children, callback) {
  var newChildren = [];
  _React2.default.Children.forEach(children, function (originalChild) {
    var newChild = originalChild;

    // The child is either a column group or a column. If it is a column group
    // we need to iterate over its columns and then potentially generate a
    // new column group
    if (originalChild.type === _FixedDataTableColumnGroup2.default) {
      var haveColumnsChanged = false;
      var newColumns = [];

      forEachColumn(originalChild.props.children, function (originalcolumn) {
        var newColumn = callback(originalcolumn);
        if (newColumn !== originalcolumn) {
          haveColumnsChanged = true;
        }
        newColumns.push(newColumn);
      });

      // If the column groups columns have changed clone the group and supply
      // new children
      if (haveColumnsChanged) {
        newChild = _React2.default.cloneElement(originalChild, {
          children: newColumns
        });
      }
    } else if (originalChild.type === _FixedDataTableColumn2.default) {
      newChild = callback(originalChild);
    }

    newChildren.push(newChild);
  });

  return newChildren;
}

var FixedDataTableHelper = {
  DIR_SIGN: DIR_SIGN,
  CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
  renderToString: renderToString,
  forEachColumn: forEachColumn,
  mapColumns: mapColumns
};

module.exports = FixedDataTableHelper;