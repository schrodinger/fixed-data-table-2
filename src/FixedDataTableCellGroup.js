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

import FixedDataTableCell from 'FixedDataTableCell';
import FixedDataTableHelper from 'FixedDataTableHelper';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'cx';
import { sumPropWidths } from 'widthHelper';

var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

class FixedDataTableCellGroupImpl extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    /**
     * Only columns within the viewport will be considered for rendering.
     */
    allowColumnVirtualization: PropTypes.bool,

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
  }

  componentWillMount() {
    this._initialRender = true;
    this._staticCellArray = [];
  }

  componentDidMount() {
    this._initialRender = false;
  }

  render() /*object*/ {
    const props = this.props;
    const columns = props.columns;
    const columnGroupWidth = sumPropWidths(columns);

    const isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    // get list of cells
    this._staticCellArray = this._computeVirtualizedCells({ columnGroupWidth, isColumnReordering });
    const nonVirtualizedCells = this._computeNonVirtualizedCells({ columnGroupWidth, isColumnReordering });

    const style = {
      height: props.height,
      position: 'absolute',
      width: columnGroupWidth,
      zIndex: props.zIndex,
    };

    FixedDataTableTranslateDOMPosition(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

    return (
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={style}
      >
        {this._staticCellArray}
        {nonVirtualizedCells}
      </div>
    );
  }

  /**
   * Return list of cells only present in the view port.
   * Uses this._staticCellArray and columnsToRender to maintain buffer positions, thus
   * minimizing cell mounts/unmounts.
   * Offsets for the cells are calculated by the reducer.
   */
  _computeVirtualizedCells = ({
    /*number*/columnGroupWidth,
    /*boolean*/isColumnReordering,
  }) => {
    const { allowColumnVirtualization, columnsToRender, columnOffsets, isScrolling } = this.props;

    if (!columnsToRender || !allowColumnVirtualization) {
      return [];
    }

    const virtualizedCells = [];
    if (isScrolling) {
      virtualizedCells.length = Math.max(this._staticCellArray.length, columnsToRender.length);
    } else {
      // this is done so that only cells inside the buffer are considered for vertical scrolling
      virtualizedCells.length = columnsToRender.length;
    }

    // render each cell
    for (let staticIndex = 0; staticIndex < virtualizedCells.length; staticIndex++) {
      let columnIndex = columnsToRender[staticIndex];

      // if cell at this static index no longer exists, then just update the old one if it exists
      if (columnIndex === undefined) {
        columnIndex = this._staticCellArray[staticIndex] && this._staticCellArray[staticIndex].props.columnIndex;
      }

      virtualizedCells[staticIndex] = this._renderCell({
        columnIndex,
        staticIndex,
        columnGroupWidth,
        isColumnReordering,
        currentPosition: columnOffsets[columnIndex],
      });
    }

    return virtualizedCells;
  };

  /**
   * Return list of cells. Cells with allowCellsRecycling are skipped if they are
   * not present within the view port.
   * We calculates offset for each cell and cell position depends only on the column key,
   * hence horizontal scrolls can result in mounts/unmounts if allowCellsRecycling is on.
   */
  _computeNonVirtualizedCells = ({
    /*number*/columnGroupWidth,
    /*boolean*/isColumnReordering,
  }) => {
    const { allowColumnVirtualization, columns } = this.props;

    // no need to compute non-virtualized cells if column virtualization is turned on
    if (allowColumnVirtualization) {
      return [];
    }

    const nonVirtualizedCells = [];
    let currentPosition = 0;

    // render each cell
    for (let i = 0; i < columns.length; i++) {
      nonVirtualizedCells[i] = this._renderCell({
        columnIndex: i,
        staticIndex: i,
        columnGroupWidth,
        currentPosition,
        isColumnReordering,
        recycle: columns[i].props.allowCellsRecycling,
      });

      // calculate offset for next cell
      currentPosition += columns[i].props.width;
    }
    return nonVirtualizedCells;
  };

  _renderCell = ({
      columnIndex,
      staticIndex,
      columnGroupWidth,
      currentPosition,
      isColumnReordering,
      recycle,
    }) /*object*/ => {
    if (columnIndex === undefined) {
      return undefined;
    }

    const props = this.props;
    const { columns, left, rowIndex } = props;

    const columnProps = columns[columnIndex].props;
    const cellTemplate = columns[columnIndex].template;

    const visible = currentPosition - left <= props.width &&
      currentPosition - left + columnProps.width >= 0;

    // if cell is recyclable then no need to render it into the DOM when it's not visible
    if (recycle && !isColumnReordering && !visible) {
      return undefined;
    }

    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var cellIsReorderable = columnProps.isReorderable && this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

    var className = columnProps.cellClassName;
    var pureRendering = columnProps.pureRendering || false;

    return (
      <FixedDataTableCell
        isScrolling={props.isScrolling}
        align={columnProps.align}
        className={className}
        height={props.rowHeight}
        columnIndex={columnIndex}
        key={staticIndex}
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
        columnKey={columnProps.columnKey || columnIndex}
        width={columnProps.width}
        left={currentPosition}
        cell={cellTemplate}
        columnGroupWidth={columnGroupWidth}
        pureRendering={pureRendering}
        visible={visible}
      />
    );
  }
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
  }

  shouldComponentUpdate(/*object*/ nextProps) /*boolean*/ {
    return (
      !nextProps.isScrolling ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.left !== nextProps.left
    );
  }

  static defaultProps = /*object*/ {
    left: 0,
    offsetLeft: 0,
  }

  render() /*object*/ {
    var {offsetLeft, ...props} = this.props;

    var style = {
      height: props.cellGroupWrapperHeight || props.height,
      width: props.width
    };

    if (DIR_SIGN === 1) {
      style.left = offsetLeft;
    } else {
      style.right = offsetLeft;
    }

    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

    return (
      <div
        style={style}
        className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}>
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
    this.props.onColumnResize && this.props.onColumnResize(
      this.props.offsetLeft,
      left - this.props.left + width,
      width,
      minWidth,
      maxWidth,
      columnKey,
      event
    );
  }
};


module.exports = FixedDataTableCellGroup;
