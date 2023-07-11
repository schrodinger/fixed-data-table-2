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

import PropTypes from 'prop-types';
import React from 'react';
import defaultTo from 'lodash/defaultTo';
import inRange from 'lodash/inRange';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import cx from './vendor_upstream/stubs/cx';
import emptyFunction from './vendor_upstream/core/emptyFunction';
import joinClasses from './vendor_upstream/core/joinClasses';

import FixedDataTableRow from './FixedDataTableRow';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

class FixedDataTableBufferedRows extends React.Component {
  static propTypes = {
    ariaRowIndexOffset: PropTypes.number,
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
    rowExpanded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    rowOffsets: PropTypes.object.isRequired,
    rowKeyGetter: PropTypes.func,
    rowSettings: PropTypes.shape({
      rowAttributesGetter: PropTypes.func,
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
    isRTL: PropTypes.bool,
  };

  constructor(props) {
    super(props);
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
    let { offsetTop, rowOffsets, scrollTop, isScrolling, rowsToRender } =
      this.props;
    rowsToRender = rowsToRender || [];

    if (isScrolling) {
      // allow static array to grow while scrolling
      this._staticRowArray.length = Math.max(
        this._staticRowArray.length,
        rowsToRender.length
      );
    } else {
      // when scrolling is done, static array can shrink to fit the buffer
      this._staticRowArray.length = rowsToRender.length;
    }

    /**
     * NOTE (pradeep): To increase vertical scrolling performance, we only translate the parent container.
     * This means, rows at a particular index won't need to be rerendered.
     *
     * But browsers have limits and are unable to translate the container past a limit (known here as bufferHeight).
     * To work around this, we wrap the translated amount over bufferHeight.
     *
     * For the container, the wrapped offset will be:
     *    const containerOffsetTop = offsetTop - (scrollTop % bufferHeight);
     *
     * Similarly, the row offset will also need to be wrapped:
     *    const rowOffsetTop = rowOffset - (Math.floor(scrollTop / bufferHeight) * bufferHeight);
     *
     * Therefore,
     *    (rowOffsetTop + containerOffsetTop)
     *      = offsetTop - (scrollTop % bufferHeight) + rowOffset - (Math.floor(scrollTop / bufferHeight) * bufferHeight)
     *      = offsetTop + rowOffset - scrollTop
     */
    const bufferHeight = 1000000;
    const containerOffsetTop = offsetTop - (scrollTop % bufferHeight);

    // render each row from the buffer into the static row array
    for (let i = 0; i < this._staticRowArray.length; i++) {
      // if the row doesn't exist in the buffer set, then take the previous one
      const rowIndex = defaultTo(
        rowsToRender[i],
        get(this._staticRowArray[i], ['props', 'index'])
      );
      if (
        isNil(rowIndex) ||
        !inRange(rowIndex, 0, this.props.rowSettings.rowsCount)
      ) {
        this._staticRowArray[i] = null;
        continue;
      }
      const rowOffsetTop =
        rowOffsets[rowIndex] -
        Math.floor(scrollTop / bufferHeight) * bufferHeight;

      this._staticRowArray[i] = this.renderRow({
        rowIndex,
        key: i,
        rowOffsetTop,
      });
    }

    // We translate all the rows together with a parent div. This saves a lot of renders.
    const style = { position: 'relative' };
    FixedDataTableTranslateDOMPosition(style, 0, containerOffsetTop, false);

    // NOTE (pradeep): Sort the rows by row index so that they appear with the right order in the DOM (see #221)
    const sortedRows = sortBy(this._staticRowArray, (row) =>
      get(row, 'props.ariaRowIndex', Infinity)
    );

    return <div style={style}>{sortedRows}</div>;
  }

  /**
   * @typedef RowProps
   * @prop {number} rowIndex
   * @prop {number} key
   * @prop {number} rowOffsetTop
   *
   * @param {RowProps} rowProps
   * @return {!Object}
   */
  renderRow({ rowIndex, key, rowOffsetTop }) /*object*/ {
    const props = this.props;
    const rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
    let rowProps = {};
    rowProps.height = this.props.rowSettings.rowHeightGetter(rowIndex);
    rowProps.subRowHeight = this.props.rowSettings.subRowHeightGetter(rowIndex);
    rowProps.offsetTop = rowOffsetTop;
    rowProps.key = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : key;
    rowProps.attributes =
      props.rowSettings.rowAttributesGetter &&
      props.rowSettings.rowAttributesGetter(rowIndex);

    const hasBottomBorder =
      rowIndex === props.rowSettings.rowsCount - 1 && props.showLastRowBorder;
    rowProps.className = joinClasses(
      rowClassNameGetter(rowIndex),
      cx('public/fixedDataTable/bodyRow'),
      cx({
        'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
        'public/fixedDataTable/hasBottomBorder': hasBottomBorder,
      })
    );

    const visible = inRange(
      rowIndex,
      this.props.firstViewportRowIndex,
      this.props.endViewportRowIndex
    );

    return (
      <FixedDataTableRow
        key={key}
        index={rowIndex}
        ariaRowIndex={rowIndex + props.ariaRowIndexOffset}
        isScrolling={props.isScrolling}
        width={props.width}
        rowExpanded={props.rowExpanded}
        scrollLeft={Math.round(props.scrollLeft)}
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
        scrollbarYWidth={props.scrollbarYWidth}
        isRTL={props.isRTL}
        visible={visible}
        {...rowProps}
      />
    );
  }
}
export default FixedDataTableBufferedRows;
