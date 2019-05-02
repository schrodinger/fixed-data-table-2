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
import React from 'React';
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
    const columnsToRender = props.columnsToRender;
    const columns = props.columns;
    const columnGroupWidth = sumPropWidths(columns);

    const isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    if (this.props.isScrolling) {
      // We are scrolling, so there's no need to display any cells which lie outside the viewport.
      // We still need to render them though, so as to not cause any unmounts. So we'll set visible
      // as false to everyone in _staticCellArray (which also hides previously rendered cells)
      // later on, we'll update the visibility for cells inside the viewport
      this._staticCellArray.forEach((cell, i) => {
        this._staticCellArray[i] = React.cloneElement(this._staticCellArray[i], { visible: false });
      });
    } else {
      // reset the static cell array if scrolling is stopped
      // this is done so that only cells inside the buffer are considered for vertical scrolling
      this._staticCellArray = [];
    }

    for (let i = 0; i < columns.length; i++) {
      let columnIndex = columnsToRender === undefined ? i : columnsToRender[i];

      // if columnIndex doesn't exist, it means that the cell isn't visible or that it doesn't exist at all
      // so for these cells then we can safely skip rendering if they are recyclable
      if (columnIndex === undefined) {
        if (columns[i].props.allowCellsRecycling === undefined) {
          continue;
        } else {
          columnIndex = i;
        }
      }

      this._staticCellArray[i] = this._renderCell({
        columnIndex,
        columnGroupWidth,
        isColumnReordering,
      });
    }

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
      </div>
    );
  }

  _renderCell = ({
      columnIndex,
      columnGroupWidth,
      isColumnReordering,
    }) /*object*/ => {
    const props = this.props;
    const { columns, columnOffsets, left, rowIndex } = props;

    const columnProps = columns[columnIndex].props;
    const cellTemplate = columns[columnIndex].template;
    const key = columnProps.columnKey || 'cell_' + columnIndex;

    const currentPosition = columnOffsets[columnIndex];
    const visible = currentPosition - left <= props.width &&
      currentPosition - left + columnProps.width >= 0;

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
