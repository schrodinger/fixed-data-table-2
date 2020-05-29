/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResizeReorderCell
 * @typechecks
 */

import FixedDataTableCellDefault from 'FixedDataTableCellDefault';
import React from 'react';
import PropTypes from 'prop-types';
import ResizerKnob  from 'ResizerKnob';
import ReorderHandle from 'ReorderHandle';
import joinClasses from 'joinClasses';
import cx from 'cx';

const DRAG_SCROLL_SPEED = 15;
const DRAG_SCROLL_BUFFER = 100;

/**
 * A plugin that can make use of ResizerKnob and ReorderHandle to provide the 
 * resize and reorder functionality to the columns.
 * 
 * Pass this to the `header` prop of the `Column` to invoke resizer/reorder handle.
 * `onColumnResizeEndCallback` and `onColumnReorderEndCallback` activate the respective
 * functionality. Either one or both can be used together.
 * 
 */
class ResizeReorderCell extends React.PureComponent {

  static propTypes = {

    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * Optional prop that represents the rows index in the table.
     * For the 'cell' prop of a Column, this parameter will exist for any
     * cell in a row with a positive index.
     *
     * Below that entry point the user is welcome to consume or
     * pass the prop through at their discretion.
     */
    rowIndex: PropTypes.number,

    /**
     * The height of the table.
     */
    tableHeight: PropTypes.number,

    /**
     * The left offset in pixels of the cell.
     */
    left: PropTypes.number,

    /**
     * The left offset in pixels of the cell group.
     */
    cellGroupLeft: PropTypes.number,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,

    /**
     * availableScrollWidth returned from ColumnWidths.
     */
    availableScrollWidth: PropTypes.number,

    /**
     * Maximum horizontal scroll possible.
     */
    maxScrollX: PropTypes.number,

    /**
     * Function to change the scroll position by interacting
     * with the store.
     */
    scrollToX: PropTypes.func,

    /**
     * Whether the cells belongs to the fixed group
     */
    isFixed: PropTypes.bool,

    /**
     * Object consisting of keys and widths of the columns
     * in the current cell group.
     */
    cellGroupColumnWidths: PropTypes.object,

    /**
     * The minimum width of the column.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the column.
     */
    maxWidth: PropTypes.number,
  };

  initialState = {
    isColumnReordering: false,
    displacement: 0,
    reorderingDisplacement: 0
  }

  state = {...this.initialState}
  
  clearState = () => {
    this.setState(
      this.initialState
    );
  }

  startColumnReorder = (reorderData) => {
    let { columnKey, left, scrollStart, width } = reorderData;
    const isFixed = this.props.isFixed;
  
    this.updateState({
      isColumnReordering: true,
      columnReorderingData: {
        cancelReorder: false,
        dragDistance: 0,
        isFixed: isFixed,
        scrollStart: scrollStart,
        columnKey: columnKey,
        columnWidth: width,
        originalLeft: left,
        columnBefore: undefined,
        columnAfter: undefined
      }
    });
  }

  /**
   * TODO (sharma)
   *
   * scrollX gets updated while scrolling and reordering together.
   * This causes all the components to re-render from the FixedDataTable
   * to the ResizeReorder Cell and makes scrolling and reordering very slow.
   *
   * scrollX, maxScrollX, availableScrollWidth should be handled differently
   * to speed it up.
   *   */
  moveColumnReorder = (deltaX) => {
    const { isFixed, originalLeft, scrollStart } = this.state.columnReorderingData;
    let { maxScrollX, scrollX } = this.props;
    if (!isFixed) {
      // Relative dragX position on scroll
      const dragX = originalLeft - scrollStart + deltaX;
      const availableScrollWidth = this.props.availableScrollWidth;
      deltaX += scrollX - scrollStart;
  
      // Scroll the table left or right if we drag near the edges of the table
      if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
        scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
      } else if (dragX <= DRAG_SCROLL_BUFFER) {
        scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
      }
      this.props.scrollToX(scrollX);
    }
  
    // NOTE (jordan) Need to clone this object when use pureRendering
    var reorderingData = {...this.state.columnReorderingData}
    reorderingData.dragDistance = deltaX;
    reorderingData.columnBefore = undefined;
    reorderingData.columnAfter = undefined;
    this.updateState({
      columnReorderingData: reorderingData,
      isColumnReordering: true
    });
    
  }

  stopColumnReorder = () => {
    this.updateState({
      isColumnReordering: false,
      columnReorderingData: {}
    });
  }

  updateState = (stateChanges) => {
    var newState = {...stateChanges};
    if (!stateChanges.isColumnReordering) {
      newState.displacement = 0;
      this.setState(newState);
      return;
    }

    // get the full width of the column group
    const cellGroupWidth = this.props.cellGroupColumnWidths.widths.reduce((acc, elem) => acc+elem, 0);

    var left = this.props.left + this.state.displacement;
    
    var originalLeft = stateChanges.columnReorderingData.originalLeft;
    var reorderCellLeft = originalLeft + stateChanges.columnReorderingData.dragDistance;
    var farthestPossiblePoint = cellGroupWidth - stateChanges.columnReorderingData.columnWidth;

    // ensure the cell isn't being dragged out of the column group
    reorderCellLeft = Math.max(reorderCellLeft, 0);
    reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

    newState.displacement = reorderCellLeft - this.props.left;
    newState.isReorderingThisColumn = true;

    var index = this.props.cellGroupColumnWidths.keys.indexOf(this.props.columnKey);
    
    
    newState.columnReorderingData.columnBefore = this.props.cellGroupColumnWidths.keys[index-1];
    newState.columnReorderingData.columnAfter = this.props.cellGroupColumnWidths.keys[index+1];

    var localDisplacement = newState.displacement;
    if (localDisplacement>0) {
      for (var i=index+1,j=this.props.cellGroupColumnWidths.widths.length; i<j; i++) {
        var curWidth = this.props.cellGroupColumnWidths.widths[i]
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        }
        else {
          if (localDisplacement > curWidth/2) {
            newState.columnReorderingData.columnAfter = this.props.cellGroupColumnWidths.keys[i+1];
            newState.columnReorderingData.columnBefore = this.props.cellGroupColumnWidths.keys[i];
          }
          else {
            newState.columnReorderingData.columnAfter = this.props.cellGroupColumnWidths.keys[i];
            newState.columnReorderingData.columnBefore = (i-1 != index) ? this.props.cellGroupColumnWidths.keys[i-1] : this.props.cellGroupColumnWidths.keys[i-2];
          }
          break;
        }
      }
    }
    else if (localDisplacement<0) {
      localDisplacement=-localDisplacement
      for (var i=index-1; i>=0; i--) {
        var curWidth = this.props.cellGroupColumnWidths.widths[i]
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        }
        else {
          if (localDisplacement > curWidth/2) {
            newState.columnReorderingData.columnAfter = this.props.cellGroupColumnWidths.keys[i];
            newState.columnReorderingData.columnBefore = this.props.cellGroupColumnWidths.keys[i-1];
          }
          else {
            newState.columnReorderingData.columnBefore = this.props.cellGroupColumnWidths.keys[i];
            newState.columnReorderingData.columnAfter = (i+1 != index) ? this.props.cellGroupColumnWidths.keys[i+1] : this.props.cellGroupColumnWidths.keys[i+2];
          }
          break;
        }
      }
    }

    this.setState(newState);
  }


  render() {
    const {
      children,
      availableScrollWidth,
      maxScrollX,
      minWidth,
      maxWidth,
      onColumnResizeEndCallback,
      onColumnReorderEndCallback,
      rowIndex,
      left,
      cellGroupLeft,
      touchEnabled,
      isRTL,
      tableHeight,
      scrollX,
      isFixed,
      scrollToX,
      cellGroupColumnWidths,
      ...props} = this.props;
    var _columnResizerStyle = {
      height: props.height
    };

    var style = {
      height: props.height,
      width: props.width-1, // subtracting border width
      position: 'fixed',
      backgroundColor: '#f6f7f8',
      backgroundImage: 'linear-gradient(#fff, #efefef)',
      borderColor: '#d3d3d3',
      borderRightStyle: 'solid',
      borderRightWidth: '1px',
    };

    if (this.props.isRTL) {
      style.right = left;
    } else {
      style.left = left;
    }

    var className = joinClasses(
      cx({
        // '.public/fixedDataTableCell/main': true,
        'public/fixedDataTableCell/hasReorderHandle': !!onColumnReorderEndCallback,
        'public/fixedDataTableCell/reordering': this.state.isColumnReordering,
      }),
      props.className,
    );

    if (this.state.isColumnReordering) {
      const DIR_SIGN = this.props.isRTL ? -1 : 1;
      style.transform = `translateX(${this.state.displacement * DIR_SIGN}px) translateZ(0)`;
      style.zIndex = 2;
    }

    var columnReorderComponent;
    if (onColumnReorderEndCallback) { //header row
      columnReorderComponent = (
        <ReorderHandle
          columnKey={props.columnKey}
          touchEnabled={touchEnabled}
          height={props.height}
          width={props.width}
          isRTL={props.height}
          left={left}
          scrollX={scrollX}
          startColumnReorder={this.startColumnReorder}
          columnReorderingData={this.state.columnReorderingData}
          stopColumnReorder={this.stopColumnReorder}
          onColumnReorderEndCallback={onColumnReorderEndCallback}
          moveColumnReorder={this.moveColumnReorder}
          {...this.props}
        />
      );
    }

    var resizerComponent;
    if (onColumnResizeEndCallback) {
      resizerComponent = (
        <ResizerKnob
          columnResizerStyle={_columnResizerStyle}
          resizerLineHeight={tableHeight}
          onColumnResizeEnd={onColumnResizeEndCallback}
          left={left}
          width={props.width}
          minWidth={minWidth}
          maxWidth={maxWidth}
          columnKey={props.columnKey}
          cellGroupLeft={cellGroupLeft} 
          touchEnabled={touchEnabled}
          isRTL={isRTL} />);
    }

    var content;
    if (React.isValidElement(children)) {
      content = React.cloneElement(children, props);
    } else if (typeof children === 'function') {
      content = children(props);
    } else {
      content = (
        <FixedDataTableCellDefault {...props}>
          {children}
        </FixedDataTableCellDefault>
      );
    }

    return (
      <div className={className} style={style}>
        {columnReorderComponent}
        {resizerComponent}
        {content}
      </div>
    );
  }
}

export default ResizeReorderCell;
