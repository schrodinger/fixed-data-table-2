/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReorderCell
 * @typechecks
 */

import React from 'react';
import joinClasses from '../../vendor_upstream/core/joinClasses';
import cx from '../../vendor_upstream/stubs/cx';
import FixedDataTableCellDefault from '../../FixedDataTableCellDefault';
import { PluginContext } from '../../Context';
import ReorderHandle from './ReorderHandle';
import _ from 'lodash';
import ResizeCell from './ResizeCell';
import PropTypes from 'prop-types';

const BORDER_WIDTH = 1;

class ReorderCell extends React.PureComponent {
  state = {
    isReordering: false,
    displacement: 0,
  };

  /**
   * @param {string} columnKey
   */
  onColumnReorderStart = (columnKey) => {
    this.setState({ isReordering: true });
    this.props.onColumnReorderStart(columnKey);
  };

  /**
   * @param {number} displacement
   */
  translateCell = (displacement) => {
    this.setState({ displacement });
  };

  /**
   * @param ev
   * @param {string} ev.columnBefore
   * @param {string} ev.columnAfter
   * @param {string} ev.reorderColumn
   */
  onColumnReorderEnd = (ev) => {
    this.setState({ isReordering: false, displacement: 0 });
    this.props.onColumnReorderEnd(ev);
  };

  render() {
    const {
      children,
      minWidth,
      maxWidth,
      onColumnReorderEnd,
      rowIndex,
      left,
      touchEnabled,
      isFixed,
      scrollToX,
      getCellGroupWidth,
      onColumnReorderStart,
      columnGroupWidth,
      ...props
    } = this.props;

    let className = joinClasses(
      cx({
        'public/fixedDataTableCell/resizeReorderCellContainer': true,
      }),
      props.className
    );

    const reorderClasses = joinClasses(
      className,
      cx({
        'public/fixedDataTableCell/hasReorderHandle': true,
        'public/fixedDataTableCell/reordering': this.state.isReordering,
      })
    );

    const DIR_SIGN = this.context.isRTL ? -1 : 1;

    let style = {
      height: props.height,
      width: props.width - BORDER_WIDTH,
      transform: `translateX(${
        this.state.displacement * DIR_SIGN
      }px) translateZ(0)`,
    };

    if (this.context.isRTL) {
      style.right = left;
    } else {
      style.left = left;
    }

    let content;
    if (React.isValidElement(children)) {
      if (children.type === ResizeCell) {
        content = React.cloneElement(children, {
          ...children.props,
          ...this.props,
        });
      } else content = React.cloneElement(children, props);
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
      <div className={reorderClasses} style={style}>
        <ReorderHandle
          {...this.props}
          translateCell={this.translateCell}
          onColumnReorderStart={this.onColumnReorderStart}
          touchEnabled={this.props.touchEnabled}
          height={this.props.height}
          isRTL={this.context.isRTL}
          columnKey={this.props.columnKey}
          left={this.props.left}
          onColumnReorderEndCallback={this.onColumnReorderEnd}
        />
        {content}
      </div>
    );
  }
}

ReorderCell.contextType = PluginContext;

ReorderCell.defaultProps = {
  onColumnReorderStart: _.noop,
};

ReorderCell.propTypes = {
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
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
   * The left offset in pixels of the cell.
   * Space between cell's left edge and left edge of table
   */
  left: PropTypes.number,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: PropTypes.bool,

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
   * The minimum width of the column.
   */
  minWidth: PropTypes.number,

  /**
   * The maximum width of the column.
   */
  maxWidth: PropTypes.number,

  /**
   * Callback function which is called when reordering starts
   * ```
   * function(columnKey: string)
   * ```
   */
  onColumnReorderStart: PropTypes.func,

  /**
   * Function to return cell group widths
   */
  getCellGroupWidth: PropTypes.func,

  /**
   * Callback function which is called when reordering ends
   * ```
   * function({columnBefore: string, columnAfter: string, reorderColumn: string})
   * ```
   */
  onColumnReorderEnd: PropTypes.func.isRequired,
};

export default ReorderCell;
