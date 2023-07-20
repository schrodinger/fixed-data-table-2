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
      scrollHover: 0,
      storedWidths: null,
      scrollableColOffsetIntervalTree: null,
    };
    // console.log(forceUpdate)
    this.current = null;

    this.setRef = (element) => {
      this.current = element;
      // console.log(this.current.getApi())
      this.current.getApi().subscribe(() => {
        // console.log(this.current.getApi())
        const {
          scrollX,
          scrollHover,
          storedWidths,
          scrollableColOffsetIntervalTree,
        } = this.current.getApi();
        //  console.log(storedWidhts)
        const oldScrollX = this.state.scrollLeft;
        this.setScrollLeft(scrollX);
        this.setScrollHover(scrollHover);
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
  setScrollHover(scrollHover) {
    this.state.scrollHover = scrollHover;
  }
  setStoredWidths(storedWidths) {
    this.state.storedWidths = storedWidths;
  }
  setscrollableColOffsetIntervalTree(scrollableColOffsetIntervalTree) {
    this.state.scrollableColOffsetIntervalTree =
      scrollableColOffsetIntervalTree;
  }
}
// const Shared = {
//   scrollX: 0,
//   display: 'none',
//   tableLeft: 0,
//   subscribers: [],
//   storedWidths: [],
//   isHover: false,
//   firstIndex: 0,
//   firstOffset: 0,
//   setFirstIndex: (firstIndex) => {
//     Shared.firstIndex = firstIndex;
//   },
//   setFirstOffset: (firstOffset) => {
//     Shared.firstOffset = firstOffset;
//   },
//   setisHover: (isHover) => {
//     // console.log(isHover)
//     Shared.isHover = isHover;
//     const autoScrollExample = new AutoScrollExample();
//     autoScrollExample.hoverChange(isHover);
//   },
//   setDisplay: (displayGiv) => {
//     // console.log(displayGiv)
//     Shared.display = displayGiv;
//     // const autoScrollExample=new AutoScrollExample()
//     // autoScrollExample.displayChange(displayGiv)
//   },
//   setTableLeft: (left) => {
//     // console.log(left);
//     Shared.tableLeft = left;
//   },
//   setStoredWidths: (storedWidths) => {
//     // console.log(Shared.storedWidths)
//     Shared.storedWidths = storedWidths;
//     // for (let i = 0; i < Shared.subscribers.length; i++) {
//     //     if (Shared.subscribers[i].getState().scrollX !== Shared.scrollX) {
//     //       // console.log(Shared.scrollX)
//     //       Shared.subscribers[i].dispatch(scrollToX(scrollX));
//     //     }
//     // }
//   },
//   setscrollX: (scrollX) => {
//     // console.log(Shared.subscribers)
//     Shared.scrollX = scrollX;
//     // console.log(scrollX)
//     for (let i = 0; i < Shared.subscribers.length; i++) {
//       if (Shared.subscribers[i].getState().scrollX !== Shared.scrollX) {
//         // console.log(Shared.scrollX)
//         Shared.subscribers[i].dispatch(scrollToX(scrollX));
//       }
//     }
//   },
// };

export default Shared;
