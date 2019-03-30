/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableBufferedRows
 * @typechecks
 */

import FixedDataTableRow from 'FixedDataTableRow';
import PropTypes from 'prop-types';
import React from 'React';
import cx from 'cx';
import emptyFunction from 'emptyFunction';
import joinClasses from 'joinClasses';
import inRange from 'lodash/inRange';

class FixedDataTableBufferedRows extends React.Component {
  static propTypes = {
    isScrolling: PropTypes.bool,
    fixedColumns: PropTypes.array.isRequired,
    fixedRightColumns: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    offsetTop: PropTypes.number.isRequired,
    onRowClick: PropTypes.func,
    onRowContextMenu: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onRowMouseDown: PropTypes.func,
    onRowMouseUp: PropTypes.func,
    onRowMouseEnter: PropTypes.func,
    onRowMouseLeave: PropTypes.func,
    onRowTouchStart: PropTypes.func,
    onRowTouchEnd: PropTypes.func,
    onRowTouchMove: PropTypes.func,
    rowClassNameGetter: PropTypes.func,
    rowExpanded: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    rowOffsets: PropTypes.object.isRequired,
    rowKeyGetter: PropTypes.func,
    rowSettings: PropTypes.shape({
      rowHeightGetter: PropTypes.func,
      rowsCount: PropTypes.number.isRequired,
      subRowHeightGetter: PropTypes.func,
    }),
    rowsToRender: PropTypes.array.isRequired,
    scrollLeft: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    scrollableColumns: PropTypes.array.isRequired,
    showLastRowBorder: PropTypes.bool,
    showScrollbarY: PropTypes.bool,
    width: PropTypes.number.isRequired,
  }

  componentWillMount() {
    this._staticRowArray = [];
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  shouldComponentUpdate() /*boolean*/ {
    // Don't add PureRenderMixin to this component please.
    return true;
  }

  componentWillUnmount() {
    this._staticRowArray.length = 0;
  }

  render() /*object*/ {
    var props = this.props;
    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
    var rowsToRender = this.props.rowsToRender || [];

    if (!props.isScrolling) {
      this._staticRowArray.length = this.props.rowsToRender.length;
    } else {
      // we are scrolling, so don't display any rows which lie outside the viewport
      this._staticRowArray.forEach((row, i) => {
        const rowOutsideViewport = !inRange(row.props.index, this.props.firstRowIndex, this.props.endRowIndex);
        if (rowOutsideViewport) {
          this._staticRowArray[i] = React.cloneElement(this._staticRowArray[i], {
            visible: false,
          });
        }
      });
    }

    var baseOffsetTop = props.offsetTop - props.scrollTop;

    rowsToRender.forEach((rowIndex, i) => {
      const currentRowHeight = this.props.rowSettings.rowHeightGetter(rowIndex);
      const currentSubRowHeight = this.props.rowSettings.subRowHeightGetter(rowIndex);
      const rowOffsetTop = baseOffsetTop + props.rowOffsets[rowIndex];
      const rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : i;
      const hasBottomBorder = (rowIndex === props.rowSettings.rowsCount - 1) &&
        props.showLastRowBorder;
      const visible = inRange(rowIndex, this.props.firstRowIndex, this.props.endRowIndex);

      this._staticRowArray[i] =
        <FixedDataTableRow
          key={rowKey}
          isScrolling={props.isScrolling}
          index={rowIndex}
          width={props.width}
          height={currentRowHeight}
          subRowHeight={currentSubRowHeight}
          rowExpanded={props.rowExpanded}
          scrollLeft={Math.round(props.scrollLeft)}
          offsetTop={Math.round(rowOffsetTop)}
          visible={visible}
          fixedColumns={props.fixedColumns}
          fixedRightColumns={props.fixedRightColumns}
          scrollableColumns={props.scrollableColumns}
          onClick={props.onRowClick}
          onContextMenu={props.onRowContextMenu}
          onDoubleClick={props.onRowDoubleClick}
          onMouseDown={props.onRowMouseDown}
          onMouseUp={props.onRowMouseUp}
          onMouseEnter={props.onRowMouseEnter}
          onMouseLeave={props.onRowMouseLeave}
          onTouchStart={props.onRowTouchStart}
          onTouchEnd={props.onRowTouchEnd}
          onTouchMove={props.onRowTouchMove}
          showScrollbarY={props.showScrollbarY}
          className={joinClasses(
            rowClassNameGetter(rowIndex),
            cx('public/fixedDataTable/bodyRow'),
            cx({
              'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
              'public/fixedDataTable/hasBottomBorder': hasBottomBorder,
            })
          )}
        />;
    });

    return <div>{this._staticRowArray}</div>;
  }
};

module.exports = FixedDataTableBufferedRows;
