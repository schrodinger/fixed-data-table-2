/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule widthHelper
 * @typechecks
 */

'use strict';

import reduce from 'lodash/reduce';

export function sumPropWidths(columns) {
  return reduce(columns, (accum, column) => accum + column.props.width, 0);
}

export function getTotalWidth(columns) {
  return reduce(columns, (accum, column) => accum + column.width, 0);
}

export function getTotalFlexGrow(columns) {
  return reduce(columns, (accum, column) => accum + (column.flexGrow || 0), 0);
}
