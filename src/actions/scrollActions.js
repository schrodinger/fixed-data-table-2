/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */

'use strict';

import {
  SCROLL_END,
  SCROLL_START,
  SCROLL_TO_X,
  SCROLL_TO_Y,
  SCROLL_DELTA_Y,
} from './ActionTypes';

/**
 * Scrolls the table vertically by delta
 *
 * @param {number} deltaY
 */
export const scrollDeltaY = (deltaY) => ({
  type: SCROLL_DELTA_Y,
  deltaY,
});

/**
 * Scrolls the table horizontally to position
 *
 * @param {number} deltaY
 */
export const scrollToX = (scrollX) => ({
  type: SCROLL_TO_X,
  scrollX,
});

/**
 * Scrolls the table vertically to position
 *
 * @param {number} deltaY
 */
export const scrollToY = (scrollY) => ({
  type: SCROLL_TO_Y,
  scrollY,
});

/**
 * Fire when user starts scrolling
 */
export const startScroll = () => ({
  type: SCROLL_START,
});

/**
 * Fire when user starts scrolling
 */
export const stopScroll = () => ({
  type: SCROLL_END,
});
