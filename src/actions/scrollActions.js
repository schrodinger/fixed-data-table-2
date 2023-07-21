/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */

'use strict';

import { bindActionCreators } from 'redux';
import { scrollToX, scrollToY, scrollEnd } from '../reducers';

const getScrollActions = (store, getProps) => {
  const scrollActions = bindActionCreators(
    {
      scrollToX,
      scrollToY,
      scrollEnd,
    },
    store.dispatch
  );

  /**
   * Scrolls the table horizontally to position
   *
   * @param {number} scrollX
   */
  const smartScrollToX = (scrollPos) => {
    const { scrollX, scrolling } = store.getState();

    if (scrollPos === scrollX) {
      return;
    }

    // This is a workaround to prevent content blurring. This happens when translate3d
    // is applied with non-rounded values to elements having text.
    var roundedScrollPos = Math.round(scrollPos);

    const { onHorizontalScroll } = getProps();
    if (onHorizontalScroll ? onHorizontalScroll(roundedScrollPos) : true) {
      scrollActions.scrollToX(roundedScrollPos);
    }
  };

  /**
   * Scrolls the table vertically to position
   *
   * @param {number} scrollY
   */
  const smartScrollToY = (scrollPos) => {
    const { scrollY } = store.getState();

    if (scrollPos === scrollY) {
      return;
    }

    const { onVerticalScroll } = getProps();
    if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
      scrollActions.scrollToY(scrollPos);
    }
  };

  return {
    scrollToX: smartScrollToX,
    scrollToY: smartScrollToY,
    stopScroll: scrollActions.scrollEnd,
  };
};

export { getScrollActions };
