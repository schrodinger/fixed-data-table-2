/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */

'use strict';

import { bindActionCreators } from 'redux';
import { scrollToX, scrollToY, scrollEnd, scrollToHover } from '../reducers';

const getScrollActions = (store, getProps) => {
  const scrollActions = bindActionCreators(
    {
      scrollToX,
      scrollToY,
      scrollToHover,
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
      // console.log(roundedScrollPos,tableNumber)
      scrollActions.scrollToX(roundedScrollPos);
      // scrollActions.scrollToX({scrollPos:roundedScrollPos,tableNumber:tableNumber});
    }
  };
  const smartScrollToHover = (scrollPos) => {
    // console.log(scrollPos)
    const { scrollHover, scrolling } = store.getState();

    if (scrollPos === scrollHover) {
      return;
    }

    // This is a workaround to prevent content blurring. This happens when translate3d
    // is applied with non-rounded values to elements having text.
    var roundedScrollPos = Math.round(scrollPos);

    // const { onHorizontalScroll } = getProps();
    // if (onHorizontalScroll ? onHorizontalScroll(roundedScrollPos) : true) {
    // console.log(roundedScrollPos,tableNumber)
    scrollActions.scrollToHover(roundedScrollPos);
    // scrollActions.scrollToX({scrollPos:roundedScrollPos,tableNumber:tableNumber});
    // }
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
    scrollToHover: smartScrollToHover,
    stopScroll: scrollActions.scrollEnd,
  };
};

export { getScrollActions };
