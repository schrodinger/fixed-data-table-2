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

import FixedDataTableCellGroup from './FixedDataTableCellGroup';
import { CellGroupType } from './enums/CellGroup';
import Row from './hoc_components/FixedDataTableRowFunction';
import RowLegacy from './hoc_components/FixedDataTableRowLegacyFunction';

// .fixedDataTableLayout/header border-bottom-width
var HEADER_BORDER_BOTTOM_WIDTH = 1;

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */
class FixedDataTableRow extends React.Component {
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
     * Data for the scrollable columns visible in the viewport.
     */
    scrollableColumns: PropTypes.object.isRequired,

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
    zIndex: PropTypes.number,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

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
     * Type of the table cell renderer to be used for all columns in this row
     */
    template: PropTypes.oneOf(['cell', 'footer', 'header']).isRequired,
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

    // if these props haven't changed for the same row while scrolling, then skip update
    return !(
      nextProps.isScrolling &&
      this.props.index === nextProps.index &&
      this.props.offsetTop === nextProps.offsetTop &&
      this.props.scrollLeft === nextProps.scrollLeft
    );
  }

  render() /*object*/ {
    var subRowHeight = this.props.subRowHeight || 0;
    var fixedColumnsWidth = this.props.fixedColumnsWidth;
    var fixedRightColumnsWidth = this.props.fixedRightColumnsWidth;
    var scrollableColumnsWidth = this.props.scrollableColumnsWidth;
    var fixedColumns = (
      <FixedDataTableCellGroup
        key="fixed_cells"
        template={this.props.template}
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        left={0}
        width={fixedColumnsWidth}
        contentWidth={fixedColumnsWidth}
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
        columnsToRender={this.props.fixedColumnsToRender}
        columnOffsets={this.props.fixedColumnOffsets}
        firstViewportColumnIndex={0}
        endViewportColumnIndex={_.size(this.props.fixedColumns)}
        cellGroupType={CellGroupType.FIXED}
        shouldUseLegacyComponents={this.props.shouldUseLegacyComponents}
      />
    );
    var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
    var scrollbarOffset = this.props.showScrollbarY
      ? this.props.scrollbarYWidth
      : 0;
    var fixedRightColumns = (
      <FixedDataTableCellGroup
        key="fixed_right_cells"
        template={this.props.template}
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        offsetLeft={this.props.width - fixedRightColumnsWidth - scrollbarOffset}
        width={fixedRightColumnsWidth}
        contentWidth={fixedRightColumnsWidth}
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
        columnsToRender={this.props.fixedRightColumnsToRender}
        columnOffsets={this.props.fixedRightColumnOffsets}
        firstViewportColumnIndex={0}
        endViewportColumnIndex={_.size(this.props.fixedRightColumns)}
        cellGroupType={CellGroupType.FIXED_RIGHT}
        shouldUseLegacyComponents={this.props.shouldUseLegacyComponents}
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
        template={this.props.template}
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
        contentWidth={scrollableColumnsWidth}
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
        columnsToRender={this.props.columnsToRender}
        columnOffsets={this.props.columnOffsets}
        firstViewportColumnIndex={this.props.firstViewportColumnIndex}
        endViewportColumnIndex={this.props.endViewportColumnIndex}
        cellGroupType={CellGroupType.SCROLLABLE}
        shouldUseLegacyComponents={this.props.shouldUseLegacyComponents}
      />
    );
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
    const RowComponent = this.props.shouldUseLegacyComponents ? RowLegacy : Row;

    return (
      <RowComponent
        {...this.props}
        _initialRender={this._initialRender}
        _onClick={this._onClick}
        _onContextMenu={this._onContextMenu}
        _onDoubleClick={this._onDoubleClick}
        _onMouseDown={this._onMouseDown}
        _onMouseUp={this._onMouseUp}
        _onMouseEnter={this._onMouseEnter}
        _onMouseLeave={this._onMouseLeave}
        _onTouchStart={this._onTouchStart}
        _onTouchEnd={this._onTouchEnd}
        _onTouchMove={this._onTouchMove}
        fixedColumns={fixedColumns}
        scrollableColumns={scrollableColumns}
        columnsLeftShadow={columnsLeftShadow}
        fixedRightColumns={fixedRightColumns}
        fixedRightColumnsShadow={fixedRightColumnsShadow}
        scrollbarSpacer={scrollbarSpacer}
        rowExpanded={rowExpanded}
        rowExpandedStyle={rowExpandedStyle}
        columnsRightShadow={columnsRightShadow}
      />
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

export default FixedDataTableRow;
