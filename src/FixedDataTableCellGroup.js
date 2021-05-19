/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import cx from './vendor_upstream/stubs/cx';
import { sumPropWidths } from './helper/widthHelper';
import FixedDataTableCell from './FixedDataTableCell';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

class FixedDataTableCellGroupImpl extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    /**
     * Array of per column configuration properties.
     */
    columns: PropTypes.array.isRequired,

    isScrolling: PropTypes.bool,

    left: PropTypes.number,

    onColumnResize: PropTypes.func,

    onColumnReorder: PropTypes.func,
    onColumnReorderMove: PropTypes.func,
    onColumnReorderEnd: PropTypes.func,

    height: PropTypes.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: PropTypes.number,

    rowHeight: PropTypes.number.isRequired,

    rowIndex: PropTypes.number.isRequired,

    width: PropTypes.number.isRequired,

    zIndex: PropTypes.number.isRequired,

    touchEnabled: PropTypes.bool,

    isHeaderOrFooter: PropTypes.bool,

    isRTL: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  render() /*object*/ {
    var props = this.props;
    var columns = props.columns;
    var cells = new Array(columns.length);
    var contentWidth = sumPropWidths(columns);

    var isColumnReordering =
      props.isColumnReordering &&
      columns.reduce(function (acc, column) {
        return (
          acc || props.columnReorderingData.columnKey === column.props.columnKey
        );
      }, false);

    var currentPosition = 0;
    for (var i = 0, j = columns.length; i < j; i++) {
      var columnProps = columns[i].props;
      var cellTemplate = columns[i].template;
      var recyclable = columnProps.allowCellsRecycling && !isColumnReordering;
      if (
        !recyclable ||
        (currentPosition - props.left <= props.width &&
          currentPosition - props.left + columnProps.width >= 0)
      ) {
        var key = columnProps.columnKey || 'cell_' + i;
        cells[i] = this._renderCell(
          props.rowIndex,
          props.rowHeight,
          columnProps,
          cellTemplate,
          currentPosition,
          key,
          contentWidth,
          isColumnReordering
        );
      }
      currentPosition += columnProps.width;
    }
    var style = {
      height: props.height,
      position: 'absolute',
      width: contentWidth,
      zIndex: props.zIndex,
    };
    FixedDataTableTranslateDOMPosition(
      style,
      -1 * props.left,
      0,
      this._initialRender,
      this.props.isRTL
    );

    return (
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={style}
      >
        {cells}
      </div>
    );
  }

  _renderCell = (
    /*number*/ rowIndex,
    /*number*/ height,
    /*object*/ columnProps,
    /*object*/ cellTemplate,
    /*number*/ left,
    /*string*/ key,
    /*number*/ columnGroupWidth,
    /*boolean*/ isColumnReordering
  ) /*object*/ => {
    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var cellIsReorderable =
      columnProps.isReorderable &&
      this.props.onColumnReorder &&
      rowIndex === -1 &&
      columnGroupWidth !== columnProps.width;
    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

    var className = columnProps.cellClassName;
    var pureRendering = columnProps.pureRendering || false;

    return (
      <FixedDataTableCell
        isScrolling={this.props.isScrolling}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        align={columnProps.align}
        className={className}
        height={height}
        key={key}
        maxWidth={columnProps.maxWidth}
        minWidth={columnProps.minWidth}
        touchEnabled={this.props.touchEnabled}
        onColumnResize={onColumnResize}
        onColumnReorder={onColumnReorder}
        onColumnReorderMove={this.props.onColumnReorderMove}
        onColumnReorderEnd={this.props.onColumnReorderEnd}
        isColumnReordering={isColumnReordering}
        columnReorderingData={this.props.columnReorderingData}
        rowIndex={rowIndex}
        columnKey={columnProps.columnKey}
        width={columnProps.width}
        left={left}
        cell={cellTemplate}
        columnGroupWidth={columnGroupWidth}
        pureRendering={pureRendering}
        isRTL={this.props.isRTL}
      />
    );
  };
}

class FixedDataTableCellGroup extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    isScrolling: PropTypes.bool,
    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    offsetLeft: PropTypes.number,

    left: PropTypes.number,
    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(/*object*/ nextProps) /*boolean*/ {
    /// if offsets haven't changed for the same cell group while scrolling, then skip update
    return !(
      nextProps.isScrolling &&
      this.props.rowIndex === nextProps.rowIndex &&
      this.props.left === nextProps.left &&
      this.props.offsetLeft === nextProps.offsetLeft
    );
  }

  static defaultProps = /*object*/ {
    left: 0,
    offsetLeft: 0,
  };

  render() /*object*/ {
    var { offsetLeft, ...props } = this.props;

    var style = {
      height: props.cellGroupWrapperHeight || props.height,
      width: props.width,
    };

    if (this.props.isRTL) {
      style.right = offsetLeft;
    } else {
      style.left = offsetLeft;
    }

    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

    return (
      <div
        style={style}
        className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}
      >
        <FixedDataTableCellGroupImpl
          {...props}
          onColumnResize={onColumnResize}
        />
      </div>
    );
  }

  _onColumnResize = (
    /*number*/ left,
    /*number*/ width,
    /*?number*/ minWidth,
    /*?number*/ maxWidth,
    /*string|number*/ columnKey,
    /*object*/ event
  ) => {
    this.props.onColumnResize &&
      this.props.onColumnResize(
        this.props.offsetLeft,
        left - this.props.left + width,
        width,
        minWidth,
        maxWidth,
        columnKey,
        event
      );
  };
}
export default FixedDataTableCellGroup;
