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
     * Function to change the scroll position by interacting
     * with the store.
     */
    scrollToX: PropTypes.func,

    /**
     * Whether the cells belongs to the fixed group
     */
    isFixed: PropTypes.bool,

    /**
     * Function which returns object consisting of keys and widths of the columns
     * in the current cell group.
     */
    getCellGroupWidth: PropTypes.func.isRequired,

    /**
     * @deprecated
     * Functions which toggles cells recycling for a cell
     */
    toggleCellsRecycling: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
      return false;
    }

    //Performance check not enabled
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
  };

  render() /*object*/ {
    var { height, width, columnKey, isHeaderOrFooter, ...props } = this.props;

    var style = {
      height,
      width,
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
      props.className
    );

    var cellProps = {
      columnKey,
      height,
      width,
    };
    if (this.props.isHeader) {
      cellProps = {
        ...cellProps,
        left: this.props.left,
        isFixed: this.props.isFixed,
        scrollToX: this.props.scrollToX,
        getCellGroupWidth: this.props.getCellGroupWidth,
        columnGroupWidth: this.props.columnGroupWidth,
      };
    }

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
        content = (
          <ReorderCell
            {...cellProps}
            onColumnReorderStart={(/*string*/ columnKey) => {
              this.props.toggleCellsRecycling(false, columnKey);
            }}
            onColumnReorderEnd={(/*object*/ val) => {
              this.props.toggleCellsRecycling(true);
              this.props.onColumnReorderEnd(val);
            }}
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
            onColumnReorderStart={(/*string*/ columnKey) => {
              this.props.toggleCellsRecycling(false, columnKey);
            }}
            onColumnReorderEnd={(/*object*/ val) => {
              this.props.toggleCellsRecycling(true);
              this.props.onColumnReorderEnd(val);
            }}
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
      <div className={className} style={style} role={role}>
        {content}
      </div>
    );
  }
}

export default lifecycleCompatibilityPolyfill(FixedDataTableCell);
