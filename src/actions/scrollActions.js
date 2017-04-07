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

import * as scrollStateHelper from 'scrollStateHelper';

export const UPDATE_VISIBLE_ROWS = 'UPDATE_VISIBLE_ROWS';
export const UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION';

/**
 * Scrolls the table vertically by delta
 *
 * @param {number} deltaY
 */
export const scrollDeltaY = (deltaY) => {
  return (dispatch, getState) => {
    const { scrollState: state } = getState();

    //TODO (asif) Make scrollBy not have sideeffects
    const { 
      firstRowIndex,
      firstRowOffset,
      scrollContentHeight,
      scrollY,
    } = scrollStateHelper.scrollBy(state, deltaY);

    dispatch({
      type: UPDATE_SCROLL_POSITION,
      firstRowIndex,
      firstRowOffset,
      scrollContentHeight,
      scrollY,
    });
    dispatch(updateVisibleRows());
  };
};

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
export const startScroll = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SCROLL_START,
    })
    dispatch(updateVisibleRows());
  };
};

/**
 * Fire when user starts scrolling
 */
export const stopScroll = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SCROLL_END,
    })
    dispatch(updateVisibleRows());
  };
};

const updateVisibleRows = () => {
  return (dispatch, getState) => {
    const { scrollState } = getState();
    const { rows } = scrollStateHelper.updateVisibleRows(scrollState);
    dispatch({
      type: UPDATE_VISIBLE_ROWS,
      rows,
    });
  };
};
