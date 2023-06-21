/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CellGroup
 * @typechecks
 */

/**
 * This determines how the cell group is fixed/non-fixed to the table.
 *
 * eg: All fixed columns/cells will be part of the 'fixed' cell group.
 * Similarly, all scrollable columns/cells in the grid will be part of the 'scrollable' cell group.
 *
 * @enum {string}
 */
const CellGroupType = {
  FIXED: 'fixed',
  FIXED_RIGHT: 'fixedRight',
  SCROLLABLE: 'scrollable',
};

export { CellGroupType };
