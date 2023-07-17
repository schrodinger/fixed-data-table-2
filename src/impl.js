import { update } from 'lodash';
import { scrollToX } from './reducers/index.js';
import { bindActionCreators } from 'redux';
import AutoScrollExample from '../examples/AutoScrollExample.js';

const Shared = {
  scrollX: 0,
  display: 'none',
  tableLeft: 0,
  subscribers: [],
  setDisplay: (displayGiv) => {
    // console.log(displayGiv)
    Shared.display = displayGiv;
    // const autoScrollExample=new AutoScrollExample()
    // autoScrollExample.displayChange(displayGiv)
  },
  setTableLeft: (left) => {
    console.log(left);
    Shared.tableLeft = left;
  },
  setscrollX: (scrollX) => {
    // console.log(Shared.subscribers)
    Shared.scrollX = scrollX;
    for (let i = 0; i < Shared.subscribers.length; i++) {
      if (Shared.subscribers[i].getState().scrollX !== Shared.scrollX) {
        Shared.subscribers[i].dispatch(scrollToX(scrollX));
      }
    }
  },
};

export default Shared;
