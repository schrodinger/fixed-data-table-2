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
import _ from 'lodash';
import inRange from 'lodash/inRange';

class FixedDataTableCellGroupImpl extends React.Component {
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
     * Function to change the scroll position by interacting
     * with the store.
     */
    scrollToX: PropTypes.func,

    /**
     * Whether the cells belongs to the fixed group
     */
    isFixed: PropTypes.bool.isRequired,

    /**
     * Type of the cell renderer to be used for each column in the cell group
     */
    template: PropTypes.oneOf(['cell', 'footer', 'header']).isRequired,
  };

  state = {
    /**
     * @deprecated
     * @type {Object<string, boolean>}
     */
    isCellRecyclableByColumnId: {},
  };

  constructor(props) {
    super(props);
    this._initialRender = true;
    this._staticCells = [];
  }

  componentDidMount() {
    this._initialRender = false;
  }

  /**
   * Returns Object consisting of keys and widths of the columns in the current cell group.
   *
   * // TODO (pradeep): This is currently broken until the API changes for column virtualization are merged in.
   * @returns {{keys: [], widths: []}}
   */
  getCellGroupWidth = () => {
    const { columns } = this.props;
    const cellGroupColumnWidths = {
      keys: [],
      widths: [],
    };
    let columnsToRender = this.props.columnsToRender || [];

    if (this.props.isHeader) {
      for (let i = 0; i < columnsToRender.length; i++) {
        let idx = columnsToRender[i];

        if (idx === undefined) {
          idx = this._staticCells[i] && this._staticCells[i].props.index;
        }

        const key = columns[idx].props.columnKey || 'cell_' + idx;
        cellGroupColumnWidths.keys.push(key);
        cellGroupColumnWidths.widths.push(columns[idx].props.width);
      }
    }
    return cellGroupColumnWidths;
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

      let columnProps = columns[columnIndex].props;

      // TODO (pradeep): Why check for columnProps ?
      let recyclable =
        columnProps &&
        _.get(
          this.state.isCellRecyclableByColumnId,
          [columnProps.columnKey],
          columnProps.allowCellsRecycling
        );

      this._staticCells[i] = this._renderCell(i, columnIndex);
    }

    var style = {
      height: props.height,
      position: 'absolute',
      width: props.contentWidth,
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
        {this._staticCells}
      </div>
    );
  }

  _renderCell = (/*number*/ key, /*number*/ columnIndex) /*object*/ => {
    const visible = inRange(
      columnIndex,
      this.props.firstViewportColumnIndex,
      this.props.endViewportColumnIndex
    );
    const columnProps = this.props.columns[columnIndex].props;
    const cellTemplate = this.props.columns[columnIndex].templates[
      this.props.template
    ];

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
        isScrolling={this.props.isScrolling}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isHeader={this.props.isHeader}
        align={columnProps.align}
        className={className}
        height={this.props.rowHeight}
        key={key}
        columnIndex={columnIndex}
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
        columnGroupWidth={this.props.contentWidth}
        pureRendering={pureRendering}
        isRTL={this.props.isRTL}
        visible={visible}
        isFixed={this.props.isFixed}
        scrollToX={this.props.scrollToX}
        toggleCellsRecycling={this.toggleCellsRecycling}
        getCellGroupWidth={this.getCellGroupWidth}
      />
    );
  };

  /**
   * @deprecated Added to have backward compatibility. This will be removed in future release.
   * @description If column reordering is happening and recycling is enabled,
   * when column moves out of the view, column gets destroyed while reordering.
   * Thus, we need to disabled cells recycling during reordering.
   *
   * @param {boolean} value
   * @param {string} columnKey
   */
  toggleCellsRecycling = (value, columnKey) => {
    // Only set in state, when value is false, means reordering has started
    if (!value) {
      this.setState({ isCellRecyclableByColumnId: { [columnKey]: value } });
    } else {
      this.setState({
        isCellRecyclableByColumnId: {},
      });
    }
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

    return (
      <div
        style={style}
        className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}
      >
        <FixedDataTableCellGroupImpl {...props} />
      </div>
    );
  }
}
export default FixedDataTableCellGroup;
