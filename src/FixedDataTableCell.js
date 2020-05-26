/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCell
 * @typechecks
 */

import FixedDataTableCellDefault from 'FixedDataTableCellDefault';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'cx';
import joinClasses from 'joinClasses';
import shallowEqual from 'shallowEqual';
import { polyfill as lifecycleCompatibilityPolyfill } from 'react-lifecycles-compat';
import ResizeReorderCell from 'ResizeReorderCell'

class FixedDataTableCell extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    isScrolling: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    highlighted: PropTypes.bool,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number.isRequired,

    cell: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),

    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * The row index that will be passed to `cellRenderer` to render.
     */
    rowIndex: PropTypes.number.isRequired,

    /**
     * The left offset in pixels of the cell.
     */
    left: PropTypes.number,

    /**
     * Flag for enhanced performance check
     */
    pureRendering: PropTypes.bool,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * Whether the cell group is part of the header or footer
     */
    isHeaderOrFooter: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,

    /**
     * The height of the table.
     */
    tableHeight: PropTypes.number,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Only for backward compatibility.
     * 
     * Required if the isResizable property is true on any column.
     *
     * ```
     * function(
     *   newColumnWidth: number,
     *   columnKey: string,
     * )
     * ```
     */
    onColumnResizeEndCallback: PropTypes.func,

    /**
     * Callback that is called when reordering has been completed
     * and columns need to be updated.
     *
     * ```
     * function(
     *   event {
     *     columnBefore: string|undefined, // the column before the new location of this one
     *     columnAfter: string|undefined,  // the column after the new location of this one
     *     reorderColumn: string,          // the column key that was just reordered
     *   }
     * )
     * ```
     */
    onColumnReorderEndCallback: PropTypes.func,

    /**
     * Whether these cells belong to the header/group-header
     */
    isHeader: PropTypes.bool,

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
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
      return false;
    }

    //Performance check not enabled
    if (!nextProps.pureRendering) {
      return true;
    }

    const { cell: oldCell, isScrolling: oldIsScrolling, ...oldProps } = this.props;
    const { cell: newCell, isScrolling: newIsScrolling, ...newProps } = nextProps;

    if (!shallowEqual(oldProps, newProps)) {
      return true;
    }

    if (!oldCell || !newCell || oldCell.type !== newCell.type) {
      return true;
    }

    if (!shallowEqual(oldCell.props, newCell.props)) {
      return true;
    }

    return false;
  }

  static defaultProps = /*object*/ {
    align: 'left',
    highlighted: false,
  }

  render() /*object*/ {

    var { height, width, columnKey, isHeaderOrFooter, ...props } = this.props;

    var style = {
      height,
      width,
      overflow: 'visible',
    };

    if (this.props.isRTL) {
      style.right = props.left;
    } else {
      style.left = props.left;
    }

    var className = joinClasses(
      cx({
        'fixedDataTableCellLayout/main': true,
        'fixedDataTableCellLayout/lastChild': props.lastChild,
        'fixedDataTableCellLayout/alignRight': props.align === 'right',
        'fixedDataTableCellLayout/alignCenter': props.align === 'center',
        'public/fixedDataTableCell/alignRight': props.align === 'right',
        'public/fixedDataTableCell/highlighted': props.highlighted,
        'public/fixedDataTableCell/main': true,
      }),
      props.className,
    );

    var cellProps = {
      columnKey,
      height,
      width,
    };
    if (this.props.isHeader) {
      cellProps = {
        ...cellProps,
        tableHeight: this.props.tableHeight,
        left: this.props.left,
        cellGroupLeft: this.props.cellGroupLeft,
        touchEnabled: this.props.touchEnabled,
        isRTL: this.props.isRTL,
        scrollX: this.props.scrollX,
        isFixed: this.props.isFixed,
        availableScrollWidth: this.props.availableScrollWidth,
        maxScrollX: this.props.maxScrollX,
        cellGroupColumnWidths: this.props.cellGroupColumnWidths,
        scrollToX: this.props.scrollToX,
      };
    }

    if (props.rowIndex >= 0) {
      cellProps.rowIndex = props.rowIndex;
    }

    var content;
    if (this.props.isHeader && (this.props.onColumnResizeEndCallback || this.props.onColumnReorderEndCallback)) {
      content = (
        <ResizeReorderCell 
          {...cellProps} 
          onColumnResizeEndCallback={this.props.onColumnResizeEndCallback}
          onColumnReorderEndCallback={this.props.onColumnReorderEndCallback}>
          {props.cell}
        </ResizeReorderCell>);
    } else if (React.isValidElement(props.cell)) {
      content = React.cloneElement(props.cell, cellProps);
    } else if (typeof props.cell === 'function') {
      content = props.cell(cellProps);
    } else {
      content = (
        <FixedDataTableCellDefault
          {...cellProps}>
          {props.cell}
        </FixedDataTableCellDefault>
      );
    }

    const role = isHeaderOrFooter ? 'columnheader' : 'gridcell';

    return (
      <div className={className} style={style} role={role}>
        {content}
      </div>
    );
  }

  _onColumnReorderMouseDown = (/*object*/ event) => {
    this.props.onColumnReorder(
      this.props.columnKey,
      this.props.width,
      this.props.left,
      event
    );
  }
  
}

export default lifecycleCompatibilityPolyfill(FixedDataTableCell);
