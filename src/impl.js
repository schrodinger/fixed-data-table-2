import { update } from 'lodash';
import { scrollToX } from './reducers/index.js';
import { bindActionCreators } from 'redux';
import AutoScrollExample from '../examples/AutoScrollExample.js';

const Shared = {
  scrollX: 0,
  display: 'none',
  tableLeft: 0,
  subscribers: [],
  storedWidths: [],
  isHover: false,
  firstIndex: 0,
  firstOffset: 0,
  setFirstIndex: (firstIndex) => {
    Shared.firstIndex = firstIndex;
  },
  setFirstOffset: (firstOffset) => {
    Shared.firstOffset = firstOffset;
  },
  setisHover: (isHover) => {
    // console.log(isHover)
    Shared.isHover = isHover;
  },
  setDisplay: (displayGiv) => {
    // console.log(displayGiv)
    Shared.display = displayGiv;
    // const autoScrollExample=new AutoScrollExample()
    // autoScrollExample.displayChange(displayGiv)
  },
  setTableLeft: (left) => {
    // console.log(left);
    Shared.tableLeft = left;
  },
  setStoredWidths: (storedWidths) => {
    // console.log(Shared.storedWidths)
    Shared.storedWidths = storedWidths;
    // for (let i = 0; i < Shared.subscribers.length; i++) {
    //     if (Shared.subscribers[i].getState().scrollX !== Shared.scrollX) {
    //       // console.log(Shared.scrollX)
    //       Shared.subscribers[i].dispatch(scrollToX(scrollX));
    //     }
    // }
  },
  setscrollX: (scrollX) => {
    // console.log(Shared.subscribers)
    Shared.scrollX = scrollX;
    // console.log(scrollX)
    for (let i = 0; i < Shared.subscribers.length; i++) {
      if (Shared.subscribers[i].getState().scrollX !== Shared.scrollX) {
        // console.log(Shared.scrollX)
        Shared.subscribers[i].dispatch(scrollToX(scrollX));
      }
    }
  },
};

export default Shared;
