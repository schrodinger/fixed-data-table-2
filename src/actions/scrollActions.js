/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */

'use strict';

import { scrollActions } from "../reducers";

/**
 * Scrolls the table horizontally to position
 *
 * @param {number} scrollX
 */
export const scrollToX = scrollActions.scrollToX;

/**
 * Scrolls the table vertically to position
 *
 * @param {number} scrollY
 */
export const scrollToY = scrollActions.scrollToY;

/**
 * Fire when user starts scrolling
 */
// Todo: Not used anywhere
// export const startScroll = scrollActions.startScroll.

/**
 * Fire when user starts scrolling
 */
export const stopScroll = scrollActions.stopScroll;

