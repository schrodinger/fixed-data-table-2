/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */

'use strict';

/**
 * Scrolls the table horizontally to position
 *
 * @param {number} scrollX
 */
export { scrollToX } from '../reducers';

/**
 * Scrolls the table vertically to position
 *
 * @param {number} scrollY
 */
export { scrollToY } from '../reducers';

/**
 * Fire when user starts scrolling
 */
export { scrollEnd as stopScroll } from '../reducers';
