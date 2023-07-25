import FixedDataTableStore from './FixedDataTableStore';
import tableHeightsSelector from './selectors/tableHeights';
import _ from 'lodash';
import inRange from 'lodash/inRange';

import { initialize, propChange, scrollToY, scrollToX } from './reducers';
import { getScrollActions } from './actions/scrollActions';
import Scrollbar from './plugins/Scrollbar';

class Headless {
  constructor(props) {
    // console.log(props)
    this.reduxStore = FixedDataTableStore.get();
    this.scrollActions = getScrollActions(this.reduxStore, () => props);

    this.reduxStore.dispatch(initialize(props));
  }
  getRows(scrollToptmp) {
    // console.log(scrollToptmp)
    this.reduxStore.dispatch(scrollToY(scrollToptmp));
    let currentState = this.reduxStore.getState();
    // console.log(currentState)

    return {
      rows: currentState.rows,
      rowOffsets: currentState.rowOffsets,
    };
    // console.log(currentState)
    // let _staticRowArray = [];
    // const {
    //     bodyHeight,
    //     bodyOffsetTop,
    //     componentHeight,
    //     footOffsetTop,
    //     scrollbarXOffsetTop,
    //     visibleRowsHeight,
    // } = tableHeightsSelector(currentState);
    // let offsetTop = bodyOffsetTop
    // let { rowOffsets, scrollTop, isScrolling, rows } = currentState;
    // let rowsToRender = rows || [];

    // if (isScrolling) {
    //     _staticRowArray.length = Math.max(
    //         _staticRowArray.length,
    //         rowsToRender.length
    //     );
    // } else {
    //     _staticRowArray.length = rowsToRender.length;
    // }

    // const bufferHeight = 1000000;
    // const containerOffsetTop = offsetTop - (scrollTop % bufferHeight);

    // for (let i = 0; i < _staticRowArray.length; i++) {
    //     let rowIndex = rowsToRender[i];
    //     if (rowIndex === undefined) {
    //         rowIndex =
    //             _staticRowArray[i] && _staticRowArray[i].currentState.index;
    //         if (rowIndex === undefined) {
    //             _staticRowArray[i] = null;
    //         }
    //     }
    //     const rowOffsetTop =
    //         rowOffsets[rowIndex] -
    //         Math.floor(scrollTop / bufferHeight) * bufferHeight;

    //     _staticRowArray[i] = ({
    //         rowIndex,
    //         key: i,
    //         rowOffsetTop,
    //     });
    // }
    // // console.log(_staticRowArray)
    // return _staticRowArray
  }
  getColumns(scrollLeft) {
    this.reduxStore.dispatch(scrollToX(scrollLeft));
    let currentState = this.reduxStore.getState();
    return currentState.columnsToRender;
    //     let _staticCells=[];
    //     var columns = currentState.scrollableColumns;
    //     let columnsToRender = currentState.columnsToRender || [];

    //     if (currentState.isScrolling) {
    //         // allow static array to grow while scrolling
    //         _staticCells.length = Math.max(
    //             _staticCells.length,
    //             columnsToRender.length
    //         );
    //     } else {
    //         _staticCells.length = columnsToRender.length;
    //     }

    //     for (let i = 0; i < _staticCells.length; i++) {
    //         let columnIndex = columnsToRender[i];

    //         if (columnIndex === undefined) {
    //             columnIndex =
    //                 _staticCells[i] && _staticCells[i].currentState.columnIndex;
    //         }

    //         if (_.isNil(columns[columnIndex])) {
    //             _staticCells[i] = null;
    //             continue;
    //         }

    //         _staticCells[i] =({
    //             key:i,
    //             columnIndex
    //         });
    //     }
    //     return _staticCells
  }
  prepareRow(rowIndex, scrollToptmp) {
    let rowView;
    let currentState = this.reduxStore.getState();
    // console.log(currentState)
    const visible = inRange(
      rowIndex,
      currentState.firstRowIndex,
      currentState.endRowIndex
    );

    rowView = {
      style: {
        height: currentState.storedHeights.array[rowIndex],
        rowIndex,
        top: scrollToptmp,
        left: 0,
        display: visible ? 'block' : 'none',
      },
    };
    return rowView;
  }
}
export default Headless;
