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

import React from 'react';
import PropTypes from 'prop-types';
import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';
import shallowEqual from './vendor_upstream/core/shallowEqual';
import FixedDataTableCellDefaultDeprecated from './FixedDataTableCellDefaultDeprecated';
import { polyfill as lifecycleCompatibilityPolyfill } from 'react-lifecycles-compat';
import ReorderCell from './plugins/ResizeReorder/ReorderCell';
import ResizeCell from './plugins/ResizeReorder/ResizeCell';
import { CellGroupType } from './enums/CellGroup';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

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

    columnIndex: PropTypes.number.isRequired,

    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
     * @deprecated
     *
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
    onColumnResizeEnd: PropTypes.func,

    /**
     * @deprecated
     *
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
    onColumnReorderEnd: PropTypes.func,

    /**
     * Whether these cells belong to the header/group-header
     */
    isHeader: PropTypes.bool,

    /**
     * Whether the cells belongs to the fixed group
     */
    cellGroupType: PropTypes.oneOf([
      CellGroupType.FIXED,
      CellGroupType.FIXED_RIGHT,
      CellGroupType.SCROLLABLE,
    ]),
  };
  // componentDidMount() {
  //   this._initialRender = false;
  // }
  shouldComponentUpdate(nextProps) {
    //   // we need to render the cell to hide/show it
    if (this.props.visible !== nextProps.visible) {
      return true;
    }

    // if cell is still not visible then no need to update
    if (!nextProps.visible) {
      return false;
    }

    //   // skip update for the same cell if we're scrolling
    if (
      nextProps.isScrolling &&
      // this.props.rowIndex === nextProps.rowIndex &&
      this.props.columnIndex === nextProps.columnIndex &&
      this.props.left1 === nextProps.left1
    ) {
      return false;
    }

    //   //Performance check not enabled
    if (!nextProps.pureRendering) {
      return true;
    }

    const { cell: oldCell, ...oldProps } = this.props;
    const { cell: newCell, ...newProps } = nextProps;

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
    left: 0,
    offsetLeft: 0,
    zIndex: 0,
  };

  render() /*object*/ {
    var {
      height,
      width,
      columnIndex,
      columnKey,
      isHeaderOrFooter,
      visible,
      zIndex,
      left1,
      // position,
      ...props
    } = this.props;
    // debugger
    var style = {
      height,
      // position:'absolute',
      width,
      zIndex,
      visibility: visible ? 'visible' : 'hidden',
    };

    // console.log(this._initialRender,"Hello")
    // if (this.props.isRTL) {
    //   style.right = props.left;
    // } else {
    //   style.left = props.left;
    // }
    FixedDataTableTranslateDOMPosition(
      style,
      this.props.offsetLeft - 1 * left1,
      0,
      this.props.initialRender,
      this.props.isRTL
    );

    // if (this.props.isRTL) {
    //   style.right =this.props.left+this.props.offsetLeft-left1;
    // } else {
    //   style.left = this.props.left+this.props.offsetLeft-left1;
    // }
    // var style = {
    //   height,
    //   width,
    //   visibility: visible ? 'visible' : 'hidden',
    // };
    // console.log(style, 'h1');
    if (this.props.isRTL) {
      style.right = props.left;
    } else {
      style.left = props.left;
    }
    // console.log('h2');
    // console.log('hh',props.rowIndex,columnIndex)
    // {console.log(props.lastChild,"hello")}
    var className = joinClasses(
      cx({
        'fixedDataTableCellLayout/main': true,
        'fixedDataTableCellLayout/lastChild': props.lastChild,
        'fixedDataTableCellLayout/alignRight': props.align === 'right',
        'fixedDataTableCellLayout/alignCenter': props.align === 'center',
        // 'public/fixedDataTableCell/alignRight': props.align === 'right', //archit
        'public/fixedDataTableCell/highlighted': props.highlighted,
        'public/fixedDataTableCell/main': true,
      }),
      props.className
    );

    var cellProps = {
      isHeader: this.props.isHeader,
      isGroupHeader: this.props.isGroupHeader,
      cellGroupType: this.props.cellGroupType,
      columnIndex: this.props.columnIndex,
      columnKey: this.props.columnKey,
      height: this.props.height,
      width: this.props.width,
      left: this.props.left,
    };

    if (props.rowIndex >= 0) {
      cellProps.rowIndex = props.rowIndex;
    }

    var content;
    if (
      this.props.isHeader &&
      (this.props.onColumnResizeEnd || this.props.onColumnReorderEnd)
    ) {
      // NOTE: Use plugins manually for backward compatibility. Will be removed in future release.
      if (this.props.onColumnResizeEnd && this.props.onColumnReorderEnd) {
        cellProps = {
          ...cellProps,
          minWidth: this.props.minWidth,
          maxWidth: this.props.maxWidth,
        };
        content = (
          <ReorderCell
            {...cellProps}
            onColumnReorderEnd={this.props.onColumnReorderEnd}
          >
            <ResizeCell onColumnResizeEnd={this.props.onColumnResizeEnd}>
              {props.cell}
            </ResizeCell>
          </ReorderCell>
        );
      } else if (this.props.onColumnReorderEnd) {
        content = (
          <ReorderCell
            {...cellProps}
            onColumnReorderEnd={this.props.onColumnReorderEnd}
          >
            {props.cell}
          </ReorderCell>
        );
      } else {
        cellProps = {
          ...cellProps,
          minWidth: this.props.minWidth,
          maxWidth: this.props.maxWidth,
        };
        content = (
          <ResizeCell
            {...cellProps}
            onColumnResizeEnd={this.props.onColumnResizeEnd}
          >
            {props.cell}
          </ResizeCell>
        );
      }
    } else if (React.isValidElement(props.cell)) {
      content = React.cloneElement(props.cell, cellProps);
    } else if (typeof props.cell === 'function') {
      content = props.cell(cellProps);
    } else {
      content = (
        <FixedDataTableCellDefaultDeprecated {...cellProps}>
          {props.cell}
        </FixedDataTableCellDefaultDeprecated>
      );
    }

    const role = isHeaderOrFooter ? 'columnheader' : 'gridcell';

    return (
      <div
        style={style}
        role={role}
        className={joinClasses(
          cx('fixedDataTableCellGroupLayout/cellGroup'),
          cx('fixedDataTableCellGroupLayout/cellGroupWrapper'),
          className
        )}
      >
        {content}
      </div>
    );
  }
}

export default lifecycleCompatibilityPolyfill(FixedDataTableCell);
