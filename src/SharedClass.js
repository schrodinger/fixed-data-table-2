import { update } from 'lodash';
import { scrollToX } from './reducers/index.js';
import { bindActionCreators } from 'redux';
import AutoScrollExample from '../examples/AutoScrollExample.js';
import React from 'react';
import { element } from 'prop-types';

class Shared {
  constructor(forceUpdate) {
    this.forceUpdatetmp = forceUpdate;
    this.state = {
      scrollLeft: 0,
      storedWidths: null,
      scrollableColOffsetIntervalTree: null,
    };
    this.current = null;

    this.setRef = (element) => {
      this.current = element;
      this.current.getApi().subscribe(() => {
        const { scrollX, storedWidths, scrollableColOffsetIntervalTree } =
          this.current.getApi();
        const oldScrollX = this.state.scrollLeft;
        this.setScrollLeft(scrollX);
        this.setStoredWidths(storedWidths);
        this.setscrollableColOffsetIntervalTree(
          scrollableColOffsetIntervalTree
        );
        if (scrollX !== oldScrollX) {
          this.forceUpdatetmp();
        }
      });
    };
  }
  setScrollLeft(scrollLeft) {
    this.state.scrollLeft = scrollLeft;
  }
  setStoredWidths(storedWidths) {
    this.state.storedWidths = storedWidths;
  }
  setscrollableColOffsetIntervalTree(scrollableColOffsetIntervalTree) {
    this.state.scrollableColOffsetIntervalTree =
      scrollableColOffsetIntervalTree;
  }
}

export default Shared;
