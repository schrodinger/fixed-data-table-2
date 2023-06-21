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

import FixedDataTableCell from './FixedDataTableCell';
import _ from 'lodash';
import inRange from 'lodash/inRange';
import CellGroup from './FixedDataCellGroupFunction';
import CellGroupLegacy from './FixedDataCellGroupLegacyFunction';

class FixedDataTableCellGroup extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    /**
     * Array/Object of per column configuration properties.
     */
    columns: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired,
    ]),

    isScrolling: PropTypes.bool,

    left: PropTypes.number,

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

    offsetLeft: PropTypes.number,

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
     * Type of the cell renderer to be used for each column in the cell group
     */
    template: PropTypes.oneOf(['cell', 'footer', 'header']).isRequired,
  };

  constructor(props) {
    super(props);
    this._initialRender = true;
    this._staticCells = [];
  }

  componentDidMount() {
    this._initialRender = false;
  }
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
    var props = this.props;
    var columns = props.columns;
    let columnsToRender = props.columnsToRender || [];

    if (props.isScrolling) {
      // allow static array to grow while scrolling
      this._staticCells.length = Math.max(
        this._staticCells.length,
        columnsToRender.length
      );
    } else {
      this._staticCells.length = columnsToRender.length;
    }

    for (let i = 0; i < this._staticCells.length; i++) {
      let columnIndex = columnsToRender[i];

      if (columnIndex === undefined) {
        // if the column index doesn't exist in the buffer set, then take the index from the previous render
        columnIndex =
          this._staticCells[i] && this._staticCells[i].props.columnIndex;
      }

      if (_.isNil(columns[columnIndex])) {
        this._staticCells[i] = null;
        continue;
      }

      this._staticCells[i] = this._renderCell(i, columnIndex);
    }

    // NOTE (pradeep): Sort the cells by column index so that they appear with the right order in the DOM (see #221)
    var sortedCells = _.sortBy(this._staticCells, (cell) =>
      _.get(cell, 'props.columnIndex', Infinity)
    );

    if (props.shouldUseLegacyComponents) {
      return (
        <CellGroupLegacy
          {...props}
          _initialRender={this._initialRender}
          sortedCells={sortedCells}
        />
      );
    } else {
      return (
        <CellGroup
          {...props}
          _initialRender={this._initialRender}
          sortedCells={sortedCells}
        />
      );
    }
  }

  _renderCell = (/*number*/ key, /*number*/ columnIndex) /*object*/ => {
    const visible = inRange(
      columnIndex,
      this.props.firstViewportColumnIndex,
      this.props.endViewportColumnIndex
    );
    const columnProps = this.props.columns[columnIndex].props;

    const cellTemplate =
      this.props.columns[columnIndex].templates[this.props.template];

    var className = columnProps.cellClassName;

    var pureRendering = columnProps.pureRendering || false;

    const onColumnReorderEndCallback = columnProps.isReorderable
      ? this.props.onColumnReorderEndCallback
      : null;
    const onColumnResizeEndCallback = columnProps.isResizable
      ? this.props.onColumnResizeEndCallback
      : null;

    return (
      <FixedDataTableCell
        columnIndex={columnIndex}
        isScrolling={this.props.isScrolling}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isHeader={this.props.isHeader}
        isGroupHeader={this.props.isGroupHeader}
        align={columnProps.align}
        className={className}
        height={this.props.rowHeight}
        key={key}
        maxWidth={columnProps.maxWidth}
        minWidth={columnProps.minWidth}
        touchEnabled={this.props.touchEnabled}
        onColumnResizeEnd={onColumnResizeEndCallback}
        onColumnReorderEnd={onColumnReorderEndCallback}
        rowIndex={this.props.rowIndex}
        columnKey={columnProps.columnKey}
        width={columnProps.width}
        left={this.props.columnOffsets[columnIndex]}
        cell={cellTemplate}
        pureRendering={pureRendering}
        isRTL={this.props.isRTL}
        visible={visible}
        cellGroupType={this.props.cellGroupType}
        shouldUseLegacyComponents={this.props.shouldUseLegacyComponents}
      />
    );
  };
}

export default FixedDataTableCellGroup;
