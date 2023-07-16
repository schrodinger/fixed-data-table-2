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

import { createSelector } from 'reselect';

const emptyArray = [];
const emptyObject = {};

export const sumPropWidths = createSelector(
  (columns) => columns || emptyArray,
  (columns) => {
    return columns.reduce((accum, column) => accum + column.props.width, 0);
  },
  {
    memoizeOptions: {
      maxSize: 6,
    },
  }
);

export const getTotalWidth = createSelector(
  (columns) => columns || emptyArray,
  (columns) => {
    return columns.reduce((accum, column) => accum + column.width, 0);
  },
  {
    memoizeOptions: {
      maxSize: 6,
    },
  }
);

export function getTotalWidthContainer(container) {
  return (
    getTotalWidth(container.fixed) +
    getTotalWidth(container.fixedRight) +
    getTotalWidth(container.scrollable)
  );
}

export const getTotalFlexGrow = createSelector(
  (container) => container || emptyObject,
  (container) => {
    const columns = Array.prototype.concat.call(
      container.fixed,
      container.scrollable,
      container.fixedRight
    );

    let flexGrow = 0;
    for (const column of columns) {
      flexGrow += column.flexGrow || 0;
    }
    return flexGrow;
  },
  {
    memoizeOptions: {
      maxSize: 6,
    },
  }
);
