/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} reorderData
 */
export { columnReorderStart as startColumnReorder } from '../reducers'

/**
 * Stops column reordering
 */
export { columnReorderEnd as stopColumnReorder } from '../reducers'

/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */
export { columnReorderMove as moveColumnReorder } from '../reducers'

/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */
export { columnResize as resizeColumn } from '../reducers'
