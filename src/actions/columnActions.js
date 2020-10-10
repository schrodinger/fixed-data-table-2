/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

import { columnActions } from "../reducers";

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} reorderData
 */
export const startColumnReorder = columnActions.startColumnReorder;

/**
 * Stops column reordering
 */
export const stopColumnReorder = columnActions.stopColumnReorder;

/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */
export const moveColumnReorder = columnActions.moveColumnReorder;

/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */
export const resizeColumn = columnActions.resizeColumn;
