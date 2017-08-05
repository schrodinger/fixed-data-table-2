/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTable
 * @typechecks
 * @noflow
 */

/*eslint no-bitwise:1*/

import FixedDataTableBufferedRows from 'FixedDataTableBufferedRows';
import FixedDataTableColumnResizeHandle from 'FixedDataTableColumnResizeHandle';
import FixedDataTableRow from 'FixedDataTableRow';
import React from 'React';
import ReactComponentWithPureRenderMixin from 'ReactComponentWithPureRenderMixin';
import ReactTouchHandler from 'ReactTouchHandler';
import ReactWheelHandler from 'ReactWheelHandler';
import Scrollbar from 'Scrollbar';
import columnDetailsSelector from 'columnDetails';
import cx from 'cx';
import debounceCore from 'debounceCore';
import horizontalScrollbarVisibleSelector from 'horizontalScrollbarVisible';
import joinClasses from 'joinClasses';
import verticalHeightsSelector from 'verticalHeights';
import verticalLayoutSelector from 'verticalLayout';

const { PropTypes } = React;

/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */
const FixedDataTable = React.createClass({

  propTypes: {

    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: PropTypes.number.isRequired,

    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: PropTypes.number,

    /**
     * Class name to be passed into parent container
     */
    className: PropTypes.string,

    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: PropTypes.number,

    /**
     * Pixel height of table's owner, this is used in a managed scrolling
     * situation when you want to slide the table up from below the fold
     * without having to constantly update the height on every scroll tick.
     * Instead, vary this property on scroll. By using `ownerHeight`, we
     * over-render the table while making sure the footer and horizontal
     * scrollbar of the table are visible when the current space for the table
     * in view is smaller than the final, over-flowing height of table. It
     * allows us to avoid resizing and reflowing table when it is moving in the
     * view.
     *
     * This is used if `ownerHeight < height` (or `maxHeight`).
     */
    ownerHeight: PropTypes.number,

    overflowX: PropTypes.oneOf(['hidden', 'auto']),
    overflowY: PropTypes.oneOf(['hidden', 'auto']),

    /**
     * Boolean flag indicating of touch scrolling should be enabled
     * This feature is current in beta and may have bugs
     */
    touchScrollEnabled: PropTypes.bool,

    // TODO (jordan) Remove propType of showScrollbarX without losing documentation
    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: PropTypes.bool,
    showScrollbarY: PropTypes.bool,

    /**
     * Callback when horizontally scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onHorizontalScroll: PropTypes.func,

    /**
     * Callback when vertically scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onVerticalScroll: PropTypes.func,

    /**
     * Number of rows in the table.
     */
    rowsCount: PropTypes.number.isRequired,

    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: PropTypes.number.isRequired,

    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: PropTypes.func,

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: PropTypes.func,

    /**
     * If specified, `rowKeyGetter(index)` is called for each row and the
     * returned value overrides `key` for the particular row.
     */
    rowKeyGetter: PropTypes.func,

    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: PropTypes.number,

    /**
     * Pixel height of header.
     */
    headerHeight: PropTypes.number.isRequired,

    /**
     * Pixel height of footer.
     */
    footerHeight: PropTypes.number,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: PropTypes.number,

    // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation
    /**
     * Index of column to scroll to.
     */
    scrollToColumn: PropTypes.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: PropTypes.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: PropTypes.number,

    /**
     * Callback that is called when scrolling starts with current horizontal
     * and vertical scroll values.
     */
    onScrollStart: PropTypes.func,

    /**
     * Callback that is called when scrolling ends or stops with new horizontal
     * and vertical scroll values.
     */
    onScrollEnd: PropTypes.func,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopScrollPropagation: PropTypes.bool,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: PropTypes.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: PropTypes.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: PropTypes.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: PropTypes.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: PropTypes.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: PropTypes.func,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
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
     * Whether a column is currently being resized.
     */
    isColumnResizing: PropTypes.bool,

    /**
     * Whether columns are currently being reordered.
     */
    isColumnReordering: PropTypes.bool,

    // TODO (jordan) Remove propType of bufferRowCount without losing documentation
    /**
     * The number of rows outside the viewport to prerender. Defaults to roughly
     * half of the number of visible rows.
     */
    bufferRowCount: PropTypes.number,
  },

  getDefaultProps() /*object*/ {
    return {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
      showScrollbarY: true,
      touchScrollEnabled: false,
      stopScrollPropagation: false
    };
  },

  componentWillMount() {
    this._didScrollStop = debounceCore(this._didScrollStop, 200, this);

    this._wheelHandler = new ReactWheelHandler(
      this._onScroll,
      this._shouldHandleWheelX,
      this._shouldHandleWheelY,
      this.props.stopScrollPropagation
    );

    const touchEnabled = this.props.touchScrollEnabled === true;
    this._touchHandler = new ReactTouchHandler(
      this._onScroll,
      touchEnabled && this._shouldHandleWheelX,
      touchEnabled && this._shouldHandleWheelY,
      this.props.stopScrollPropagation
    );
  },

  _shouldHandleWheelX(/*number*/ delta) /*boolean*/ {
    const {
      maxScrollX,
      overflowX,
      scrollX,
    } = this.props;

    if (overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && scrollX > 0) ||
      (delta >= 0 && scrollX < maxScrollX)
    );
  },

  _shouldHandleWheelY(/*number*/ delta) /*boolean*/ {
    const {
      maxScrollY,
      overflowY,
      scrollY,
    } = this.props;

    if (overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && scrollY > 0) ||
      (delta >= 0 && scrollY < maxScrollY)
    );
  },

  _reportContentHeight() {
    const { contentHeight } = verticalHeightsSelector(this.props);
    const { onContentHeightChange } = this.props;

    if (contentHeight !== this._contentHeight && onContentHeightChange) {
      onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },

  componentDidMount() {
    this._reportContentHeight();
  },

  componentWillReceiveProps(/*object*/ nextProps) {
    const {
      ownerHeight,
      scrollLeft,
      scrollTop,
    } = this.props;

    // In the case of controlled scrolling, notify.
    if (ownerHeight !== nextProps.ownerHeight ||
        scrollTop !== nextProps.scrollTop ||
        scrollLeft !== nextProps.scrollLeft) {
      this._didScrollStart();
    }
    this._didScrollStop();
  },

  componentDidUpdate() {
    this._reportContentHeight();
  },

  render() /*object*/ {
    const {
      fixedColumnGroups,
      fixedColumns,
      scrollableColumnGroups,
      scrollableColumns,
    } = columnDetailsSelector(this.props);

    const {
      bodyHeight,
      componentHeight,
      footerHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeightsSelector(this.props);

    const {
      bodyOffsetTop,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
    } = verticalLayoutSelector(this.props);

    const {
      className,
      columnReorderingData,
      columnResizingData,
      isColumnReordering,
      isColumnResizing,
      maxScrollX,
      maxScrollY,
      onColumnReorderEndCallback,
      onColumnResizeEndCallback,
      overflowY,
      ownerHeight,
      scrollContentHeight,
      scrollX,
      scrollY,
      showScrollbarY,
      useGroupHeader,
      width,
    } = this.props;

    const horizontalScrollbarVisible = horizontalScrollbarVisibleSelector(this.props);

    const onColumnReorder = onColumnReorderEndCallback ? this._onColumnReorder : null;

    let groupHeader;
    if (useGroupHeader) {
      groupHeader = (
        <FixedDataTableRow
          key="group_header"
          isScrolling={this._isScrolling}
          className={joinClasses(
            cx('fixedDataTableLayout/header'),
            cx('public/fixedDataTable/header'),
          )}
          width={width}
          height={headerOffsetTop}
          index={0}
          zIndex={1}
          offsetTop={0}
          scrollLeft={scrollX}
          fixedColumns={fixedColumnGroups}
          scrollableColumns={scrollableColumnGroups}
          visible={true}
          onColumnResize={this._onColumnResize}
          onColumnReorder={onColumnReorder}
          onColumnReorderMove={this._onColumnReorderMove}
        />
      );
    }

    const showVerticalScrollbar = maxScrollY > 0 &&
      overflowY !== 'hidden' && showScrollbarY !== false;
    let verticalScrollbar;
    if (showVerticalScrollbar) {
      verticalScrollbar =
        <Scrollbar
          size={visibleRowsHeight}
          contentSize={scrollContentHeight}
          onScroll={this._onVerticalScroll}
          verticalTop={bodyOffsetTop}
          position={scrollY}
        />;
    }

    let horizontalScrollbar;
    if (horizontalScrollbarVisible) {
      horizontalScrollbar =
        <HorizontalScrollbar
          contentSize={width + maxScrollX}
          offset={rowsContainerHeight}
          onScroll={this._onHorizontalScroll}
          position={scrollX}
          size={width}
        />;
    }

    const dragKnob =
      <FixedDataTableColumnResizeHandle
        height={componentHeight}
        initialWidth={columnResizingData.width || 0}
        minWidth={columnResizingData.minWidth || 0}
        maxWidth={columnResizingData.maxWidth || Number.MAX_VALUE}
        visible={!!isColumnResizing}
        leftOffset={columnResizingData.left || 0}
        knobHeight={headerHeight}
        initialEvent={columnResizingData.initialEvent}
        onColumnResizeEnd={onColumnResizeEndCallback}
        columnKey={columnResizingData.key}
      />;

    let footer = null;
    if (footerHeight) {
      footer =
        <FixedDataTableRow
          key="footer"
          isScrolling={this._isScrolling}
          className={joinClasses(
            cx('fixedDataTableLayout/footer'),
            cx('public/fixedDataTable/footer'),
          )}
          width={width}
          height={footerHeight}
          index={-1}
          zIndex={1}
          offsetTop={footOffsetTop}
          visible={true}
          fixedColumns={fixedColumns.footer}
          scrollableColumns={scrollableColumns.footer}
          scrollLeft={scrollX}
        />;
    }

    const rows = this._renderRows(bodyOffsetTop, fixedColumns.cell,
      scrollableColumns.cell, bodyHeight);

    const header =
      <FixedDataTableRow
        key="header"
        isScrolling={this._isScrolling}
        className={joinClasses(
          cx('fixedDataTableLayout/header'),
          cx('public/fixedDataTable/header'),
        )}
        width={width}
        height={headerHeight}
        index={-1}
        zIndex={1}
        offsetTop={headerOffsetTop}
        scrollLeft={scrollX}
        visible={true}
        fixedColumns={fixedColumns.header}
        scrollableColumns={scrollableColumns.header}
        onColumnResize={this._onColumnResize}
        onColumnReorder={onColumnReorder}
        onColumnReorderMove={this._onColumnReorderMove}
        onColumnReorderEnd={this._onColumnReorderEnd}
        isColumnReordering={!!isColumnReordering}
        columnReorderingData={columnReorderingData}
      />;

    let topShadow;
    if (scrollY) {
      topShadow =
        <div
          className={joinClasses(
            cx('fixedDataTableLayout/topShadow'),
            cx('public/fixedDataTable/topShadow'),
          )}
          style={{top: bodyOffsetTop}}
        />;
    }

    // ownerScrollAvailable is true if the rows rendered will overflow the owner element
    // so we show a shadow in that case even if the FDT component can't scroll anymore
    const ownerScrollAvailable = ownerHeight && ownerHeight < componentHeight &&
      scrollContentHeight > visibleRowsHeight;
    let bottomShadow;
    if (ownerScrollAvailable || scrollY < maxScrollY) {
      bottomShadow =
        <div
          className={joinClasses(
            cx('fixedDataTableLayout/bottomShadow'),
            cx('public/fixedDataTable/bottomShadow'),
          )}
          style={{top: footOffsetTop}}
        />;
    }

    return (
      <div
        className={joinClasses(
          className,
          cx('fixedDataTableLayout/main'),
          cx('public/fixedDataTable/main'),
        )}
        onWheel={this._wheelHandler.onWheel}
        onTouchStart={this._touchHandler.onTouchStart}
        onTouchEnd={this._touchHandler.onTouchEnd}
        onTouchMove={this._touchHandler.onTouchMove}
        onTouchCancel={this._touchHandler.onTouchCancel}
        style={{
          height: componentHeight,
          width
        }}>
        <div
          className={cx('fixedDataTableLayout/rowsContainer')}
          style={{
            height: rowsContainerHeight,
            width
          }}>
          {dragKnob}
          {groupHeader}
          {header}
          {rows}
          {footer}
          {topShadow}
          {bottomShadow}
        </div>
        {verticalScrollbar}
        {horizontalScrollbar}
      </div>
    );
  },

  _renderRows(/*number*/ offsetTop, fixedCellTemplates, scrollableCellTemplates,
      bodyHeight) /*object*/ {
    const props = this.props;
    return (
      <FixedDataTableBufferedRows
        isScrolling={this._isScrolling}
        defaultRowHeight={props.rowHeight}
        firstRowIndex={props.firstRowIndex}
        firstRowOffset={props.firstRowOffset}
        fixedColumns={fixedCellTemplates}
        height={bodyHeight}
        offsetTop={offsetTop}
        onRowClick={props.onRowClick}
        onRowDoubleClick={props.onRowDoubleClick}
        onRowMouseDown={props.onRowMouseDown}
        onRowMouseEnter={props.onRowMouseEnter}
        onRowMouseLeave={props.onRowMouseLeave}
        rowClassNameGetter={props.rowClassNameGetter}
        rowsCount={props.rowsCount}
        rowHeightGetter={props.rowHeightGetter}
        rowKeyGetter={props.rowKeyGetter}
        scrollLeft={props.scrollX}
        scrollableColumns={scrollableCellTemplates}
        showLastRowBorder={true}
        width={props.width}
        rowsToRender={props.rows}
        rowHeights={props.rowHeights}
      />
    );
  },

  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize(
    /*number*/ combinedWidth,
    /*number*/ leftOffset,
    /*number*/ cellWidth,
    /*?number*/ cellMinWidth,
    /*?number*/ cellMaxWidth,
    /*number|string*/ columnKey,
    /*object*/ event
  ) {
    let clientX = event.clientX;
    let clientY = event.clientY;
    this.props.columnActions.resizeColumn({
      cellMinWidth,
      cellMaxWidth,
      cellWidth,
      columnKey,
      combinedWidth,
      clientX,
      clientY,
      leftOffset
    });
  },

  _onColumnReorder(/*string*/ columnKey, /*number*/ width, /*number*/ left, /*object*/ event) {
    this.props.columnActions.startColumnReorder({
      scrollStart: this.props.scrollX,
      columnKey,
      width,
      left
    });
  },

  _onColumnReorderMove(/*number*/ deltaX) {
    this.props.columnActions.moveColumnReorder(deltaX);
  },

  _onColumnReorderEnd(/*object*/ props, /*object*/ event) {
    const {
      columnActions,
      columnReorderingData: {
        cancelReorder,
        columnAfter,
        columnBefore,
        columnKey,
        scrollStart,
      },
      onColumnReorderEndCallback,
      onHorizontalScroll,
      scrollX,
    } = this.props;

    columnActions.stopColumnReorder();
    if (cancelReorder) {
      return;
    }

    onColumnReorderEndCallback({
      columnAfter,
      columnBefore,
      reorderColumn: columnKey,
    });

    if (scrollStart !== scrollX && onHorizontalScroll) {
      onHorizontalScroll(scrollX)
    };
  },

  _onScroll(/*number*/ deltaX, /*number*/ deltaY) {
    if (this.isMounted()) {
      const {
        maxScrollX,
        maxScrollY,
        onHorizontalScroll,
        onVerticalScroll,
        overflowX,
        overflowY,
        scrollActions,
        scrollX,
        scrollY,
      } = this.props;

      if (!this._isScrolling) {
        this._didScrollStart();
      }
      let x = scrollX;
      let y = scrollY;
      if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
        y += deltaY;
        y = y < 0 ? 0 : y;
        y = y > maxScrollY ? maxScrollY : y;

        //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state
        if (onVerticalScroll ? onVerticalScroll(y) : true) {
          scrollActions.scrollToY(y);
        }
      } else if (deltaX && overflowX !== 'hidden') {
        x += deltaX;
        x = x < 0 ? 0 : x;
        x = x > maxScrollX ? maxScrollX : x;

        //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
        if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
          scrollActions.scrollToX(x);
        }
      }

      this._didScrollStop();
    }
  },

  _onHorizontalScroll(/*number*/ scrollPos) {
    const {
      onHorizontalScroll,
      scrollActions,
      scrollX,
    } = this.props;

    if (this.isMounted() && scrollPos !== scrollX) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }

      if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
        scrollActions.scrollToX(scrollPos);
      }
      this._didScrollStop();
    }
  },

  _onVerticalScroll(/*number*/ scrollPos) {
    const {
      onHorizontalScroll,
      scrollActions,
      scrollY,
    } = this.props;

    if (this.isMounted() && scrollPos !== scrollY) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }

      if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
        scrollActions.scrollToY(scrollPos);
      }

      this._didScrollStop();
    }
  },

  _didScrollStart() {
    const {
      firstRowIndex,
      onScrollStart,
      scrollActions,
      scrollX,
      scrollY,
    } = this.props;

    if (this.isMounted() && !this._isScrolling) {
      this._isScrolling = true;
      scrollActions.startScroll();

      if (onScrollStart) {
        onScrollStart(scrollX, scrollY, firstRowIndex);
      }
    }
  },

  _didScrollStop() {
    const {
      firstRowIndex,
      onScrollEnd,
      scrollActions,
      scrollX,
      scrollY,
    } = this.props;

    if (this.isMounted() && this._isScrolling) {
      this._isScrolling = false;
      scrollActions.stopScroll();

      if (onScrollEnd) {
        onScrollEnd(scrollX, scrollY, firstRowIndex);
      }
    }
  },
});

const HorizontalScrollbar = React.createClass({
  mixins: [ReactComponentWithPureRenderMixin],
  propTypes: {
    contentSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  },

  componentWillMount() {
    this._initialRender = true;
  },

  componentDidMount() {
    this._initialRender = false;
  },

  render() /*object*/ {
    const {
      offset,
      size,
    } = this.props;

    const outerContainerStyle = {
      height: Scrollbar.SIZE,
      width: size,
    };
    const innerContainerStyle = {
      height: Scrollbar.SIZE,
      overflow: 'hidden',
      width: size,
      top: offset,
    };

    return (
      <div
        className={joinClasses(
          cx('public/fixedDataTable/horizontalScrollbar'),
        )}
        style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <Scrollbar
            {...this.props}
            isOpaque={true}
            orientation="horizontal"
            offset={undefined}
          />
        </div>
      </div>
    );
  },
});

module.exports = FixedDataTable;
