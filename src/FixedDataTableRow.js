/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRow
 * @typechecks
 */

'use strict';

import PropTypes from 'prop-types';
import React from 'react';

import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';

import { sumPropWidths } from './helper/widthHelper';
import FixedDataTableCellGroup from './FixedDataTableCellGroup';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';
import { CellGroupType } from './enums/cellGroup';

// .fixedDataTableLayout/header border-bottom-width
var HEADER_BORDER_BOTTOM_WIDTH = 1;

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */
class FixedDataTableRowImpl extends React.Component {
  /**
   * The index of a row for which to fire the onMouseLeave event.
   */
  mouseLeaveIndex = null;

  static propTypes = {
    isScrolling: PropTypes.bool,

    /**
     * Array of data for the fixed columns.
     */
    fixedColumns: PropTypes.array.isRequired,

    /**
     * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
     */
    fixedRightColumns: PropTypes.array.isRequired,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: PropTypes.number,

    /**
     * Height of the content to be displayed below the row.
     */
    subRowHeight: PropTypes.number,

    /**
     * the row expanded.
     */
    rowExpanded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * The row index.
     */
    index: PropTypes.number.isRequired,

    /**
     * Array of data for the scrollable columns.
     */
    scrollableColumns: PropTypes.array.isRequired,

    /**
     * The distance between the left edge of the table and the leftmost portion
     * of the row currently visible in the table.
     */
    scrollLeft: PropTypes.number.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,

    /**
     * Fire when a row is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Fire when a contextual-menu is requested above a row.
     */
    onContextMenu: PropTypes.func,

    /**
     * Fire when a row is double clicked.
     */
    onDoubleClick: PropTypes.func,

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

    touchEnabled: PropTypes.bool,

    /**
     * Whether the row is part of the header or footer.
     */
    isHeaderOrFooter: PropTypes.bool,

    /**
     * The value of the aria-rowindex attribute.
     */
    ariaRowIndex: PropTypes.number,

    /**
     * Whether the grid should be in RTL mode
     */
    isRTL: PropTypes.bool,

    /**
     * DOM attributes to be applied to the row.
     */
    attributes: PropTypes.object,

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
     * Whether these cells belong to the header
     */
    isHeader: PropTypes.bool,

    /**
     * Whether these cells belong to the group-header
     */
    isGroupHeader: PropTypes.bool,

    /**
     * Function to change the scroll position by interacting with the store.
     */
    scrollToX: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    // only skip updates while scrolling
    if (!nextProps.isScrolling) {
      return true;
    }

    // if row is not visible then no need to render it
    // change in visibility is handled by the parent
    if (!nextProps.visible) {
      return false;
    }

    // Only update the row if scrolling leads to a change in horizontal offsets.
    // The vertical offset is taken care of by the wrapper
    return !(
      this.props.index === nextProps.index &&
      this.props.scrollLeft === nextProps.scrollLeft
    );
  }

  render() /*object*/ {
    var subRowHeight = this.props.subRowHeight || 0;
    var style = {
      width: this.props.width,
      height: this.props.height + subRowHeight,
    };
    var className = cx({
      'fixedDataTableRowLayout/main': true,
      'public/fixedDataTableRow/main': true,
      'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
      'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
      'public/fixedDataTableRow/even': this.props.index % 2 === 0,
    });
    var fixedColumnsWidth = sumPropWidths(this.props.fixedColumns);
    var fixedColumns = (
      <FixedDataTableCellGroup
        key="fixed_cells"
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        left={0}
        width={fixedColumnsWidth}
        zIndex={2}
        columns={this.props.fixedColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResizeEndCallback={this.props.onColumnResizeEndCallback}
        onColumnReorderEndCallback={this.props.onColumnReorderEndCallback}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isHeader={this.props.isHeader}
        isGroupHeader={this.props.isGroupHeader}
        isRTL={this.props.isRTL}
        cellGroupType={CellGroupType.FIXED}
      />
    );
    var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
    var fixedRightColumnsWidth = sumPropWidths(this.props.fixedRightColumns);
    var scrollbarOffset = this.props.showScrollbarY
      ? this.props.scrollbarYWidth
      : 0;
    var fixedRightColumns = (
      <FixedDataTableCellGroup
        key="fixed_right_cells"
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        offsetLeft={this.props.width - fixedRightColumnsWidth - scrollbarOffset}
        width={fixedRightColumnsWidth}
        zIndex={2}
        columns={this.props.fixedRightColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResizeEndCallback={this.props.onColumnResizeEndCallback}
        onColumnReorderEndCallback={this.props.onColumnReorderEndCallback}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isHeader={this.props.isHeader}
        isGroupHeader={this.props.isGroupHeader}
        isRTL={this.props.isRTL}
        cellGroupType={CellGroupType.FIXED_RIGHT}
      />
    );
    var fixedRightColumnsShadow = fixedRightColumnsWidth
      ? this._renderFixedRightColumnsShadow(
          this.props.width - fixedRightColumnsWidth - scrollbarOffset - 5
        )
      : null;
    var scrollableColumns = (
      <FixedDataTableCellGroup
        key="scrollable_cells"
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        align="right"
        left={this.props.scrollLeft}
        offsetLeft={fixedColumnsWidth}
        width={
          this.props.width -
          fixedColumnsWidth -
          fixedRightColumnsWidth -
          scrollbarOffset
        }
        zIndex={0}
        columns={this.props.scrollableColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResizeEndCallback={this.props.onColumnResizeEndCallback}
        onColumnReorderEndCallback={this.props.onColumnReorderEndCallback}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isHeader={this.props.isHeader}
        isGroupHeader={this.props.isGroupHeader}
        isRTL={this.props.isRTL}
        cellGroupType={CellGroupType.SCROLLABLE}
      />
    );
    var scrollableColumnsWidth = sumPropWidths(this.props.scrollableColumns);
    var columnsRightShadow = this._renderColumnsRightShadow(
      fixedColumnsWidth + scrollableColumnsWidth
    );
    var rowExpanded = this._getRowExpanded(subRowHeight);
    var rowExpandedStyle = {
      height: subRowHeight,
      top: this.props.height,
      width: this.props.width,
    };

    let scrollbarSpacer = null;
    if (this.props.showScrollbarY) {
      var spacerStyles = {
        width: scrollbarOffset,
        height: this.props.height,
        // Since the box-sizing = border-box the border on the table is included in the width
        // so we need to account for the left and right border
        left: this.props.isRTL ? 2 : this.props.width - scrollbarOffset - 2,
      };
      scrollbarSpacer = (
        <div
          style={spacerStyles}
          className={cx('public/fixedDataTable/scrollbarSpacer')}
        />
      );
    }

    return (
      <div
        className={joinClasses(className, this.props.className)}
        role={'row'}
        aria-rowindex={this.props.ariaRowIndex}
        {...this.props.attributes}
        onClick={this.props.onClick ? this._onClick : null}
        onContextMenu={this.props.onContextMenu ? this._onContextMenu : null}
        onDoubleClick={this.props.onDoubleClick ? this._onDoubleClick : null}
        onMouseDown={this.props.onMouseDown ? this._onMouseDown : null}
        onMouseUp={this.props.onMouseUp ? this._onMouseUp : null}
        onMouseEnter={
          this.props.onMouseEnter || this.props.onMouseLeave
            ? this._onMouseEnter
            : null
        }
        onMouseLeave={this.props.onMouseLeave ? this._onMouseLeave : null}
        onTouchStart={this.props.onTouchStart ? this._onTouchStart : null}
        onTouchEnd={this.props.onTouchEnd ? this._onTouchEnd : null}
        onTouchMove={this.props.onTouchMove ? this._onTouchMove : null}
        style={style}
      >
        <div className={cx('fixedDataTableRowLayout/body')}>
          {fixedColumns}
          {scrollableColumns}
          {columnsLeftShadow}
          {fixedRightColumns}
          {fixedRightColumnsShadow}
          {scrollbarSpacer}
        </div>
        {rowExpanded && (
          <div
            className={cx('fixedDataTableRowLayout/rowExpanded')}
            style={rowExpandedStyle}
          >
            {rowExpanded}
          </div>
        )}
        {columnsRightShadow}
      </div>
    );
  }

  _getRowExpanded = (/*number*/ subRowHeight) => /*?object*/ {
    if (this.props.rowExpanded) {
      var rowExpandedProps = {
        rowIndex: this.props.index,
        height: subRowHeight,
        width: this.props.width,
      };

      var rowExpanded;
      if (React.isValidElement(this.props.rowExpanded)) {
        rowExpanded = React.cloneElement(
          this.props.rowExpanded,
          rowExpandedProps
        );
      } else if (typeof this.props.rowExpanded === 'function') {
        rowExpanded = this.props.rowExpanded(rowExpandedProps);
      }

      return rowExpanded;
    }
  };

  _renderColumnsLeftShadow = (/*number*/ left) => /*?object*/ {
    var className = cx({
      'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
      'fixedDataTableRowLayout/columnsShadow': this.props.scrollLeft > 0,
      'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
      'public/fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0,
    });
    var dividerHeight = this.props.cellGroupWrapperHeight
      ? this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH
      : this.props.height;
    var style = {
      left: left,
      height: dividerHeight,
    };
    if (this.props.isRTL) {
      style.right = left;
      style.left = 'auto';
    }
    return <div className={className} style={style} />;
  };

  _renderFixedRightColumnsShadow = (/*number*/ left) => /*?object*/ {
    var className = cx(
      'fixedDataTableRowLayout/columnsShadow',
      'fixedDataTableRowLayout/columnsRightShadow',
      'fixedDataTableRowLayout/fixedColumnsDivider',
      'public/fixedDataTableRow/columnsShadow',
      'public/fixedDataTableRow/columnsRightShadow',
      'public/fixedDataTableRow/fixedColumnsDivider'
    );
    var style = {
      height: this.props.height,
      left: left,
    };
    if (this.props.isRTL) {
      style.right = left;
      style.left = 'auto';
    }
    return <div className={className} style={style} />;
  };

  _renderColumnsRightShadow = (/*number*/ totalWidth) => /*?object*/ {
    if (
      Math.ceil(this.props.scrollLeft + this.props.width) <
      Math.floor(totalWidth)
    ) {
      var className = cx(
        'fixedDataTableRowLayout/columnsShadow',
        'fixedDataTableRowLayout/columnsRightShadow',
        'public/fixedDataTableRow/columnsShadow',
        'public/fixedDataTableRow/columnsRightShadow'
      );
      var style = {
        height: this.props.height,
      };
      return <div className={className} style={style} />;
    }
  };

  _onClick = (/*object*/ event) => {
    this.props.onClick(event, this.props.index);
  };

  _onContextMenu = (/*object*/ event) => {
    this.props.onContextMenu(event, this.props.index);
  };

  _onDoubleClick = (/*object*/ event) => {
    this.props.onDoubleClick(event, this.props.index);
  };

  _onMouseUp = (/*object*/ event) => {
    this.props.onMouseUp(event, this.props.index);
  };

  _onMouseDown = (/*object*/ event) => {
    this.props.onMouseDown(event, this.props.index);
  };

  _onMouseEnter = (/*object*/ event) => {
    /**
     * This is necessary so that onMouseLeave is fired with the initial
     * row index since this row could be updated with a different index
     * when scrolling.
     */
    this.mouseLeaveIndex = this.props.index;
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event, this.props.index);
    }
  };

  _onMouseLeave = (/*object*/ event) => {
    if (this.mouseLeaveIndex === null) {
      this.mouseLeaveIndex = this.props.index;
    }
    this.props.onMouseLeave(event, this.mouseLeaveIndex);
    this.mouseLeaveIndex = null;
  };

  _onTouchStart = (/*object*/ event) => {
    this.props.onTouchStart(event, this.props.index);
  };

  _onTouchEnd = (/*object*/ event) => {
    this.props.onTouchEnd(event, this.props.index);
  };

  _onTouchMove = (/*object*/ event) => {
    this.props.onTouchMove(event, this.props.index);
  };
}

class FixedDataTableRow extends React.Component {
  static propTypes = {
    isScrolling: PropTypes.bool,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Pass false to hide the row via CSS
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  shouldComponentUpdate(nextProps) {
    // only skip updates while scrolling
    if (!nextProps.isScrolling) {
      return true;
    }

    // if row's visibility has changed, then update it
    if (this.props.visible !== nextProps.visible) {
      return true;
    }

    // if row is still not visible then no need to update
    if (!nextProps.visible) {
      return false;
    }

    // if offsets haven't changed for the same row while scrolling, then skip update
    return !(
      nextProps.isScrolling &&
      this.props.index === nextProps.index &&
      this.props.offsetTop === nextProps.offsetTop &&
      this.props.scrollLeft === nextProps.scrollLeft
    );
  }

  render() /*object*/ {
    const { offsetTop, zIndex, ...rowProps } = this.props;

    var style = {
      width: this.props.width,
      height: this.props.height,
      zIndex: zIndex ? zIndex : 0,
      visibility: rowProps.visible ? 'visible' : 'hidden',
    };
    FixedDataTableTranslateDOMPosition(
      style,
      0,
      offsetTop,
      this._initialRender,
      this.props.isRTL
    );

    return (
      <div style={style} className={cx('fixedDataTableRowLayout/rowWrapper')}>
        <FixedDataTableRowImpl {...rowProps} />
      </div>
    );
  }
}

export default FixedDataTableRow;
