/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

import {
  COLUMN_REORDER_START,
  COLUMN_REORDER_END,
  COLUMN_REORDER_MOVE,
  COLUMN_RESIZE,
} from './ActionTypes';

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} deltaY
 */
export const startColumnReorder = (reorderData) => ({
  type: COLUMN_REORDER_START,
  reorderData,
});

/**
 * Stops column reordering
 */
export const stopColumnReorder = () => ({
  type: COLUMN_REORDER_END,
});

/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */
export const moveColumnReorder = (deltaX) => ({
  type: COLUMN_REORDER_MOVE,
  deltaX
});

/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */
export const resizeColumn = (resizeData) => ({
  type: COLUMN_RESIZE,
  resizeData,
});
