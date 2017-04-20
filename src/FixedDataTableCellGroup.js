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

import FixedDataTableHelper from 'FixedDataTableHelper';
import React from 'React';
import FixedDataTableCell from 'FixedDataTableCell';

import cx from 'cx';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';

var {PropTypes} = React;

var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

var FixedDataTableCellGroupImpl = React.createClass({

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {

    /**
     * Array of <FixedDataTableColumn />.
     */
    columns: PropTypes.array.isRequired,

    isScrolling: PropTypes.bool,

    left: PropTypes.number,

    onColumnResize: PropTypes.func,

    onColumnReorder: PropTypes.func,
    onColumnReorderMove: PropTypes.func,
    onColumnReorderEnd: PropTypes.func,

    maxVisibleColumns: PropTypes.number.isRequired,

    rowHeight: PropTypes.number.isRequired,

    rowIndex: PropTypes.number.isRequired,

    width: PropTypes.number.isRequired,

    zIndex: PropTypes.number.isRequired,
  },

  componentWillMount() {
    this._staticCellArray = [];
    this._columnsToRender = [];
    this._initialRender = true;
  },

  componentWillUnmount() {
    this._staticCellArray.length = 0;
    this._columnsToRender.length = 0;
  },

  componentDidMount() {
    this._initialRender = false;
  },

  render() /*object*/ {
    var props = this.props;
    var columns = props.columns;

    this._staticCellArray.length = props.maxVisibleColumns;
    this._columnsToRender.length = props.maxVisibleColumns;

    var contentWidth = this._getColumnsWidth(columns);

    var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    var currentPosition = 0;
    var count = 0;

    var newColumnsToRender = new Array(props.maxVisibleColumns);
    var positions = new Array(props.maxVisibleColumns);

    for (var i = 0; i < columns.length; i++) {
      var columnProps = columns[i].props;
      var recycable = columnProps.allowCellsRecycling && !isColumnReordering;
      if (!recycable || (
          currentPosition - props.left <= props.width &&
          currentPosition - props.left + columnProps.width >= 0)) {
        positions[i] = currentPosition;
        newColumnsToRender[count++] = i;
      }

      currentPosition += columnProps.width;
    }

    //TODO move this recycle logic into main state
    const newColumnsSet = new Set(newColumnsToRender);
    const oldColumnsSet = new Set(this._columnsToRender);
    const indexes = [];

    for (var i = props.maxVisibleColumns; i >= 0; i--) {
      var column = this._columnsToRender[i];
      if (!column || !newColumnsSet.has(column)) {
        indexes.push(i);
      }
    }

    newColumnsToRender.forEach((column) => {
      if (!oldColumnsSet.has(column)) {
        this._columnsToRender[indexes.pop()] = column;
      }
    });

    var cellCount = 0;
    this._columnsToRender.forEach((i) => {
      var columnProps = columns[i].props;
      var currentPosition = positions[i];
      var key = columnProps.columnKey || 'cell_' + i;
      this._staticCellArray[cellCount++] = this._renderCell(
        props.rowIndex,
        props.rowHeight,
        columnProps,
        currentPosition,
        key,
        contentWidth,
        isColumnReordering,
      );
    });

    while (cellCount < props.maxVisibleColumns) {
      if (!this._staticCellArray[cellCount]) {
        break;
      }

      this._staticCellArray[cellCount] = React.cloneElement(this._staticCellArray[cellCount], {
        visible: false,          
      });

      cellCount++;
    }

    var style = {
      height: props.height,
      position: 'absolute',
      width: contentWidth,
      zIndex: props.zIndex,
    };
    FixedDataTableTranslateDOMPosition(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

    return (
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={style}>
        {this._staticCellArray}
      </div>
    );
  },

  _renderCell(
    /*number*/ rowIndex,
    /*number*/ height,
    /*object*/ columnProps,
    /*number*/ left,
    /*string*/ key,
    /*number*/ columnGroupWidth,
    /*boolean*/ isColumnReordering,
  ) /*object*/ {

    var cellIsResizable = columnProps.isResizable &&
      this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var cellIsReorderable = columnProps.isReorderable && this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

    var className = columnProps.cellClassName;
    var pureRendering = columnProps.pureRendering || false;

    return (
      <FixedDataTableCell
        isScrolling={this.props.isScrolling}
        align={columnProps.align}
        className={className}
        height={height}
        key={key}
        maxWidth={columnProps.maxWidth}
        minWidth={columnProps.minWidth}
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
        cell={columnProps.cell}
        columnGroupWidth={columnGroupWidth}
        pureRendering={pureRendering}
        visible={true}
      />
    );
  },

  _getColumnsWidth(/*array*/ columns) /*number*/ {
    var width = 0;
    for (var i = 0; i < columns.length; ++i) {
      width += columns[i].props.width;
    }
    return width;
  },
});

var FixedDataTableCellGroup = React.createClass({

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {
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
  },

  shouldComponentUpdate(/*object*/ nextProps) /*boolean*/ {
    return (
      !nextProps.isScrolling ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.left !== nextProps.left
    );
  },

  getDefaultProps() /*object*/ {
    return {
      offsetLeft: 0,
    };
  },

  render() /*object*/ {
    var {offsetLeft, ...props} = this.props;

    var style = {
      height: props.height,
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
  },

  _onColumnResize(
    /*number*/ left,
    /*number*/ width,
    /*?number*/ minWidth,
    /*?number*/ maxWidth,
    /*string|number*/ columnKey,
    /*object*/ event
  ) {
    this.props.onColumnResize && this.props.onColumnResize(
      this.props.offsetLeft,
      left - this.props.left + width,
      width,
      minWidth,
      maxWidth,
      columnKey,
      event
    );
  },
});


module.exports = FixedDataTableCellGroup;
