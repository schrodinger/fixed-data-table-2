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
import FixedDataTableColumnReorderHandle from './FixedDataTableColumnReorderHandle';
import { polyfill as lifecycleCompatibilityPolyfill } from 'react-lifecycles-compat';

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
     * Callback for when resizer knob (in FixedDataTableCell) is clicked
     * to initialize resizing. Please note this is only on the cells
     * in the header.
     * @param number combinedWidth
     * @param number left
     * @param number width
     * @param number minWidth
     * @param number maxWidth
     * @param number|string columnKey
     * @param object event
     */
    onColumnResize: PropTypes.func,
    onColumnReorder: PropTypes.func,

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
     * Whether this cell is visible (i.e, inside the viewport) or not.
     */
    isVisible: PropTypes.bool.isRequired,
  };

  state = {
    isReorderingThisColumn: false,
    displacement: 0,
    reorderingDisplacement: 0,
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.isScrolling &&
      this.props.rowIndex === nextProps.rowIndex &&
      this.props.isVisible === nextProps.isVisible
    ) {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    var left = nextProps.left + prevState.displacement;

    var newState = {
      isReorderingThisColumn: false,
    };

    if (!nextProps.isColumnReordering) {
      newState.displacement = 0;
      return newState;
    }

    var originalLeft = nextProps.columnReorderingData.originalLeft;
    var reorderCellLeft =
      originalLeft + nextProps.columnReorderingData.dragDistance;
    var farthestPossiblePoint =
      nextProps.columnGroupWidth - nextProps.columnReorderingData.columnWidth;

    // ensure the cell isn't being dragged out of the column group
    reorderCellLeft = Math.max(reorderCellLeft, 0);
    reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

    // check if current cell belongs to the column that's being reordered
    if (nextProps.columnKey === nextProps.columnReorderingData.columnKey) {
      newState.displacement = reorderCellLeft - nextProps.left;
      newState.isReorderingThisColumn = true;
      return newState;
    }

    var reorderCellRight =
      reorderCellLeft + nextProps.columnReorderingData.columnWidth;
    var reorderCellCenter =
      reorderCellLeft + nextProps.columnReorderingData.columnWidth / 2;
    var centerOfThisColumn = left + nextProps.width / 2;

    var cellIsBeforeOneBeingDragged = reorderCellCenter > centerOfThisColumn;
    var cellWasOriginallyBeforeOneBeingDragged = originalLeft > nextProps.left;
    var changedPosition = false;

    if (cellIsBeforeOneBeingDragged) {
      if (reorderCellLeft < centerOfThisColumn) {
        changedPosition = true;
        if (cellWasOriginallyBeforeOneBeingDragged) {
          newState.displacement = nextProps.columnReorderingData.columnWidth;
        } else {
          newState.displacement = 0;
        }
      }
    } else {
      if (reorderCellRight > centerOfThisColumn) {
        changedPosition = true;
        if (cellWasOriginallyBeforeOneBeingDragged) {
          newState.displacement = 0;
        } else {
          newState.displacement =
            nextProps.columnReorderingData.columnWidth * -1;
        }
      }
    }

    if (changedPosition) {
      if (cellIsBeforeOneBeingDragged) {
        if (!nextProps.columnReorderingData.columnAfter) {
          nextProps.columnReorderingData.columnAfter = nextProps.columnKey;
        }
      } else {
        nextProps.columnReorderingData.columnBefore = nextProps.columnKey;
      }
    } else if (cellIsBeforeOneBeingDragged) {
      nextProps.columnReorderingData.columnBefore = nextProps.columnKey;
    } else if (!nextProps.columnReorderingData.columnAfter) {
      nextProps.columnReorderingData.columnAfter = nextProps.columnKey;
    }

    return newState;
  }

  static defaultProps = /*object*/ {
    align: 'left',
    highlighted: false,
  };

  render() /*object*/ {
    var { height, width, isVisible, columnKey, isHeaderOrFooter, ...props } =
      this.props;

    var style = {
      height,
      width,
    };

    if (this.props.isRTL) {
      style.right = props.left;
    } else {
      style.left = props.left;
    }

    if (this.state.isReorderingThisColumn) {
      const DIR_SIGN = this.props.isRTL ? -1 : 1;
      style.transform = `translateX(${
        this.state.displacement * DIR_SIGN
      }px) translateZ(0)`;
      style.zIndex = 1;
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
        'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
        'public/fixedDataTableCell/reordering':
          this.state.isReorderingThisColumn,
      }),
      props.className
    );

    var columnResizerComponent;
    if (props.onColumnResize) {
      var columnResizerStyle = {
        height,
      };
      columnResizerComponent = (
        <div
          className={cx('fixedDataTableCellLayout/columnResizerContainer')}
          style={columnResizerStyle}
          onMouseDown={this._onColumnResizerMouseDown}
          onTouchStart={
            this.props.touchEnabled ? this._onColumnResizerMouseDown : null
          }
          onTouchEnd={this.props.touchEnabled ? this._suppressEvent : null}
          onTouchMove={this.props.touchEnabled ? this._suppressEvent : null}
        >
          <div
            className={joinClasses(
              cx('fixedDataTableCellLayout/columnResizerKnob'),
              cx('public/fixedDataTableCell/columnResizerKnob')
            )}
            style={columnResizerStyle}
          />
        </div>
      );
    }

    var columnReorderComponent;
    if (props.onColumnReorder) {
      //header row
      columnReorderComponent = (
        <FixedDataTableColumnReorderHandle
          columnKey={this.columnKey}
          touchEnabled={this.props.touchEnabled}
          onMouseDown={this._onColumnReorderMouseDown}
          onTouchStart={this._onColumnReorderMouseDown}
          height={height}
          {...this.props}
        />
      );
    }

    var cellProps = {
      columnKey,
      height,
      width,
      isVisible,
    };

    if (props.rowIndex >= 0) {
      cellProps.rowIndex = props.rowIndex;
    }

    var content;
    if (React.isValidElement(props.cell)) {
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
        {columnResizerComponent}
        {columnReorderComponent}
        {content}
      </div>
    );
  }

  _onColumnResizerMouseDown = (/*object*/ event) => {
    this.props.onColumnResize(
      this.props.left,
      this.props.width,
      this.props.minWidth,
      this.props.maxWidth,
      this.props.columnKey,
      event
    );
    /**
     * This prevents the rows from moving around when we resize the
     * headers on touch devices.
     */
    if (this.props.touchEnabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  _onColumnReorderMouseDown = (/*object*/ event) => {
    this.props.onColumnReorder(
      this.props.columnKey,
      this.props.width,
      this.props.left,
      event
    );
  };

  _suppressEvent = (/*object*/ event) => {
    event.preventDefault();
    event.stopPropagation();
  };
}

export default lifecycleCompatibilityPolyfill(FixedDataTableCell);
