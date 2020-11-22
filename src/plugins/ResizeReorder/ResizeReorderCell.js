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
import ResizerKnob from 'ResizerKnob';
import ReorderHandle from 'ReorderHandle';
import joinClasses from 'joinClasses';
import cx from 'cx';

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
     * Space between cell's left edge and left edge of table
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
  };

  state = { ...this.initialState };

  updateReorderingData = (obj) => {
    this.setState(obj);
  };

  clearState = () => {
    this.setState(
      this.initialState
    );
  };


  renderReorderHandle = () => {
    if (!this.props.onColumnReorderEndCallback)
      return null;

    return (
      <ReorderHandle
        touchEnabled={this.props.touchEnabled}
        height={this.props.height}
        isRTL={this.props.isRTL}
        columnKey={this.props.columnKey}
        scrollX={this.props.scrollX}
        left={this.props.left}
        onColumnReorderEndCallback={this.props.onColumnReorderEndCallback}
        updateParentReorderingData={this.updateReorderingData}
        {...this.props}
      />
    );
  };

  renderResizerKnob = () => {
    if (!this.props.onColumnResizeEndCallback)
      return null;

    return (
      <ResizerKnob
        height={this.props.height}
        resizerLineHeight={this.props.tableHeight}
        onColumnResizeEnd={this.props.onColumnResizeEndCallback}
        left={this.props.left}
        width={this.props.width}
        minWidth={this.props.minWidth}
        maxWidth={this.props.maxWidth}
        columnKey={this.props.columnKey}
        cellGroupLeft={this.props.cellGroupLeft}
        touchEnabled={this.props.touchEnabled}
        isRTL={this.props.isRTL} />
    );
  };


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
      ...props
    } = this.props;

    let style = {
      height: props.height,
      width: props.width - 1, // subtracting border width
    };

    if (this.props.isRTL) {
      style.right = left;
    } else {
      style.left = left;
    }

    let className = joinClasses(
      cx({
        // '.public/fixedDataTableCell/main': true,
        'public/fixedDataTableCell/hasReorderHandle': !!onColumnReorderEndCallback,
        'public/fixedDataTableCell/reordering': this.state.isColumnReordering,
        'resize-reorder-cell-container': true
      }),
      props.className,
    );

    if (this.state.isColumnReordering) {
      const DIR_SIGN = this.props.isRTL ? -1 : 1;
      style.transform = `translateX(${this.state.displacement * DIR_SIGN}px) translateZ(0)`;
      style.zIndex = 2;
    }

    let content;
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
        {this.renderReorderHandle()}
        {this.renderResizerKnob()}
        {content}
      </div>
    );
  }
}

export default ResizeReorderCell;
