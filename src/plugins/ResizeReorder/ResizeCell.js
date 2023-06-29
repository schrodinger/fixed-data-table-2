/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResizeCell
 * @typechecks
 */

import React from 'react';
import ResizerKnob from './ResizerKnob';
import FixedDataTableCellDefault from '../../FixedDataTableCellDefault';
import { FixedDataTableContext } from '../../FixedDataTableContext';
import PropTypes from 'prop-types';

const BORDER_WIDTH = 1;

class ResizeCell extends React.PureComponent {
  render() {
    const {
      children,
      minWidth,
      maxWidth,
      onColumnResizeEnd,
      rowIndex,
      touchEnabled,
      cellGroupType,
      onColumnReorderStart,
      ...props
    } = this.props;

    let style = {
      height: this.props.height,
      width: this.props.width - BORDER_WIDTH,
    };

    if (this.context.isRTL) {
      style.right = this.props.left;
    } else {
      style.left = this.props.left;
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
      <>
        <ResizerKnob
          height={this.props.height}
          resizerLineHeight={this.context.tableHeight}
          onColumnResizeEnd={this.props.onColumnResizeEnd}
          onColumnReorderEnd={this.props.onColumnReorderEnd}
          shouldUseLegacyComponents={this.props.shouldUseLegacyComponents}
          width={this.props.width}
          minWidth={this.props.minWidth}
          maxWidth={this.props.maxWidth}
          columnKey={this.props.columnKey}
          touchEnabled={this.props.touchEnabled}
          isRTL={this.context.isRTL}
          left={this.props.left}
        />
        {content}
      </>
    );
  }
}

ResizeCell.contextType = FixedDataTableContext;

ResizeCell.propTypes = {
  /**
   * Optional prop that if specified on the `Column` will be passed to the
   * cell. It can be used to uniquely identify which column is the cell is in.
   */
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The minimum width of the column.
   */
  minWidth: PropTypes.number,

  /**
   * The maximum width of the column.
   */
  maxWidth: PropTypes.number,

  /**
   * Outer width of the cell.
   */
  width: PropTypes.number,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: PropTypes.bool,

  /**
   * True if FDT has right to left orientation
   */
  isRTL: PropTypes.bool,

  /**
   * Callback function which is called when reordering ends
   *
   * ```
   * function(newWidth: number, columnKey: string)
   * ```
   */
  onColumnResizeEnd: PropTypes.func.isRequired,

  /**
   * Outer height of the cell.
   */
  height: PropTypes.number,
};

export default ResizeCell;
