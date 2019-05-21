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
import React from 'react';
import cx from 'cx';
import emptyFunction from 'emptyFunction';
import joinClasses from 'joinClasses';
import inRange from 'lodash/inRange';

class FixedDataTableBufferedRows extends React.Component {
  static propTypes = {
    isScrolling: PropTypes.bool,
    firstViewportRowIndex: PropTypes.number.isRequired,
    endViewportRowIndex: PropTypes.number.isRequired,
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

    if (props.isScrolling) {
      // We are scrolling, so there's no need to display any rows which lie outside the viewport.
      // We still need to render them though, so as to not cause any mounts/unmounts.
      this._staticRowArray.forEach((row, i) => {
        const rowOutsideViewport = !this.isRowInsideViewport(row.props.index);
        if (rowOutsideViewport) {
          this._staticRowArray[i] = React.cloneElement(this._staticRowArray[i], {
            visible: false,
          });
        }
      });
    } else {
      this._staticRowArray.length = rowsToRender.length;
    }

    var baseOffsetTop = props.offsetTop - props.scrollTop;

    for (let i = 0; i < rowsToRender.length; i++) {
      const rowIndex = rowsToRender[i];

      // if the row doesn't exist in the buffer, assign a fake row to it.
      // this is so that we can get rid of unnecessary row mounts/unmounts
      if (rowIndex === undefined) {
        // if a previous row existed, let's just make use of that
        if (this._staticRowArray[i] === undefined) {
          this._staticRowArray[i] = this.getFakeRow(i);
        }
        continue;
      }

      const currentRowHeight = this.props.rowSettings.rowHeightGetter(rowIndex);
      const currentSubRowHeight = this.props.rowSettings.subRowHeightGetter(rowIndex);
      const rowOffsetTop = baseOffsetTop + props.rowOffsets[rowIndex];
      const rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : i;
      const hasBottomBorder = (rowIndex === props.rowSettings.rowsCount - 1) &&
        props.showLastRowBorder;
      const visible = this.isRowInsideViewport(rowIndex);

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
    }

    return <div>{this._staticRowArray}</div>;
  }

  getFakeRow(/*number*/key) /*object*/ {
    const props = this.props;
    return (
      <FixedDataTableRow
        key={key}
        isScrolling={props.isScrolling}
        index={key}
        width={props.width}
        height={0}
        offsetTop={0}
        scrollLeft={Math.round(props.scrollLeft)}
        visible={false}
        fake={true}
        fixedColumns={props.fixedColumns}
        fixedRightColumns={props.fixedRightColumns}
        scrollableColumns={props.scrollableColumns}
      />
    );
  }

  isRowInsideViewport(/*number*/rowIndex) {
    return inRange(rowIndex, this.props.firstViewportRowIndex, this.props.endViewportRowIndex);
  }
};

module.exports = FixedDataTableBufferedRows;
