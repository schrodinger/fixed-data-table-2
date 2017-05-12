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
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import FixedDataTableCell from 'FixedDataTableCell';

import cx from 'cx';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';

var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

var FixedDataTableCellGroupImpl = createReactClass({
  displayName: 'FixedDataTableCellGroupImpl',

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

    var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    //TODO move this recycle logic into main state
    
    // Calculates total width of all columns
    var contentWidth = this._getColumnsWidth(columns);
    //Offset of each column
    var positions = this._getColumnPositions(columns);

    //Array of column indexes to render
    var newColumns = this._getNewColumnsToRender(isColumnReordering, positions);

    //Include new columns in _columnsToRender
    this._updateColumnsToRender(this._columnsToRender, newColumns);

    //Populate _staticCellArray
    this._populateCellArray(contentWidth, isColumnReordering, positions);

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

  _getColumnPositions(columns) {
    var positions = new Array(columns.length);
    var currentPosition = 0;

    for (var i = 0; i < columns.length; i++) {
      var columnProps = columns[i].props;
      positions[i] = currentPosition;
      currentPosition += columnProps.width;
    }

    return positions;
  },

  _getNewColumnsToRender(isColumnReordering, positions) {
    var props = this.props;
    var columns = props.columns;

    //Columns that need to be shown
    var newColumnsToRender = new Array(props.maxVisibleColumns);
    //Used to add items to newColumnsToRender
    var arrayIndex = 0;

    for (var i = 0; i < columns.length; i++) {
      var currentPosition = positions[i];
      var columnProps = columns[i].props;
      var recycable = columnProps.allowCellsRecycling && !isColumnReordering;
      var visible = currentPosition - props.left <= props.width &&
                    currentPosition - props.left + columnProps.width >= 0;
      
      if (!recycable || visible) {
        newColumnsToRender[arrayIndex++] = i;
      }
    }

    return newColumnsToRender;
  },

  _updateColumnsToRender(oldColumns, newColumns) {
    var props = this.props;

    const newColumnsSet = new Set(newColumns);
    const oldColumnsSet = new Set(oldColumns);

    //Indexes that we can replace
    const indexes = [];

    //Find columns not longer being rendered
    for (var i = props.maxVisibleColumns - 1; i >= 0; i--) {
      var column = oldColumns[i];
      if (column == null || !newColumnsSet.has(column)) {
        indexes.push(i);
      }
    }

    //Find missing columns and replace unused columns
    newColumns.forEach((column) => {
      if (!oldColumnsSet.has(column)) {
        var index = indexes.pop();
        oldColumns[index] = column;
      }
    });

    //Clear out the unused columns
    indexes.forEach((index) => oldColumns[index] = null);
  },

  _populateCellArray(contentWidth, isColumnReordering, positions) {
    var props = this.props;
    var columns = props.columns;

    for (var i = 0; i < props.maxVisibleColumns; i++) {
      var columnToRender = this._columnsToRender[i];
      
      //No column to render at this index
      if (columnToRender == null) {
        //If we had a column, reuse it by setting visible to false
        if (this._staticCellArray[i]) {
          this._staticCellArray[i] = React.cloneElement(this._staticCellArray[i], {
            key: 'cell_' + i,
            visible: false,          
          });
        }
        continue;
      }

      var columnProps = columns[columnToRender].props;
      var currentPosition = positions[columnToRender];
      var key = 'cell_' + i;
      this._staticCellArray[i] = this._renderCell(
        props.rowIndex,
        props.rowHeight,
        columnProps,
        currentPosition,
        key,
        contentWidth,
        isColumnReordering,
      );
    }
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

var FixedDataTableCellGroup = createReactClass({
  displayName: 'FixedDataTableCellGroup',

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
