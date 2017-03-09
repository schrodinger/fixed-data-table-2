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

import React from 'React';
import ReactComponentWithPureRenderMixin from 'ReactComponentWithPureRenderMixin';
import ReactWheelHandler from 'ReactWheelHandler';
import ReactTouchHandler from 'ReactTouchHandler';
import Scrollbar from 'Scrollbar';
import FixedDataTableBufferedRows from 'FixedDataTableBufferedRows';
import FixedDataTableColumnResizeHandle from 'FixedDataTableColumnResizeHandle';
import FixedDataTableRow from 'FixedDataTableRow';
import FixedDataTableStore from 'FixedDataTableStore';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';
import ActionTypes from 'ActionTypes';
import convertColumnElementsToData from 'convertColumnElementsToData';

import cx from 'cx';
import debounceCore from 'debounceCore';
import forEach from 'lodash/forEach';
import invariant from 'invariant';
import joinClasses from 'joinClasses';

var {PropTypes} = React;

var BORDER_HEIGHT = 1;

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
var FixedDataTable = React.createClass({

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

    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: PropTypes.bool,
    showScrollbarY: PropTypes.bool,

    /**
     * Callback when horizontally scrolling the grid
     *
     * Return false to stop propagation
     */
    onHorizontalScroll: PropTypes.func,

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
  },

  getDefaultProps() /*object*/ {
    return {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
      showScrollbarX: true,
      showScrollbarY: true,
      touchScrollEnabled: false
    };
  },

  componentWillMount() {
    const props = this.props;

    const {
      columnGroups,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData(props);

    FixedDataTableStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props: props,
      columnData: columnGroups,
      useGroupHeader: useGroupHeader,
    });

    const viewportHeight =
      (props.height === undefined ? props.maxHeight : props.height) -
      (props.headerHeight || 0) -
      (props.footerHeight || 0) -
      (props.groupHeaderHeight || 0);

    this._didScrollStop = debounceCore(this._didScrollStop, 200, this);

    const touchEnabled = props.touchScrollEnabled === true;

    this._wheelHandler = new ReactWheelHandler(
      this._onScroll,
      this._shouldHandleWheelX,
      this._shouldHandleWheelY
    );
    this._touchHandler = new ReactTouchHandler(
      this._onScroll,
      touchEnabled && this._shouldHandleWheelX,
      touchEnabled && this._shouldHandleWheelY
    );

    const update = () => {
      const state = FixedDataTableStore.getState();
      const {
        firstRowIndex,
        firstRowOffset,
        rows,
        rowHeights,
        scrollContentHeight,
        scrollY,
      } = state.scrollState;

      const maxScrollY = Math.max(0, scrollContentHeight - this.state.bodyHeight);

      this.setState({
        firstRowIndex,
        firstRowOffset,
        maxScrollY,
        rows,
        rowHeights,
        scrollContentHeight,
        scrollY,
        ...state.columnState,
      });
    };
    FixedDataTableStore.subscribe(update);
    setTimeout(update);

    this.setState(this._calculateState(props, undefined, elementTemplates));
  },

  _shouldHandleWheelX(/*number*/ delta) /*boolean*/ {
    if (this.props.overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && this.state.scrollX > 0) ||
      (delta >= 0 && this.state.scrollX < this.state.maxScrollX)
    );
  },

  _shouldHandleWheelY(/*number*/ delta) /*boolean*/ {
    if (this.props.overflowY === 'hidden'|| delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && this.state.scrollY > 0) ||
      (delta >= 0 && this.state.scrollY < this.state.maxScrollY)
    );
  },

  _reportContentHeight() {
    var scrollContentHeight = this.state.scrollContentHeight;
    var reservedHeight = this.state.reservedHeight;
    var requiredHeight = scrollContentHeight + reservedHeight;
    var contentHeight;
    var useMaxHeight = this.props.height === undefined;
    if (useMaxHeight && this.props.maxHeight > requiredHeight) {
      contentHeight = requiredHeight;
    } else if (this.state.height > requiredHeight && this.props.ownerHeight) {
      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
    } else {
      contentHeight = this.state.height + this.state.maxScrollY;
    }
    if (contentHeight !== this._contentHeight &&
        this.props.onContentHeightChange) {
      this.props.onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },

  componentDidMount() {
    this._reportContentHeight();
  },

  componentWillReceiveProps(/*object*/ nextProps) {

    // If scrollLeft is unchanged, ignore it
    if (nextProps.scrollLeft === this.props.scrollLeft) {
      nextProps = Object.assign({}, nextProps);
      delete nextProps.scrollLeft;
    }

    const {
      columnGroups,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData(nextProps);

    FixedDataTableStore.dispatch({
      type: ActionTypes.PROP_CHANGE,
      props: nextProps,
      columnData: columnGroups,
      useGroupHeader: useGroupHeader,
    });

    var scrollToRow = nextProps.scrollToRow;
    if (scrollToRow !== undefined && scrollToRow !== null) {
      this._rowToScrollTo = scrollToRow;
    }
    var scrollToColumn = nextProps.scrollToColumn;
    if (scrollToColumn !== undefined && scrollToColumn !== null) {
      this._columnToScrollTo = scrollToColumn;
    }

    var newOverflowX = nextProps.overflowX;
    var newOverflowY = nextProps.overflowY;
    var touchEnabled = nextProps.touchScrollEnabled === true;

    if (newOverflowX !== this.props.overflowX ||
        newOverflowY !== this.props.overflowY) {
      this._wheelHandler = new ReactWheelHandler(
        this._onScroll,
        newOverflowX !== 'hidden', // Should handle horizontal scroll
        newOverflowY !== 'hidden' // Should handle vertical scroll
      );
      this._touchHandler = new ReactTouchHandler(
        this._onScroll,
        newOverflowX !== 'hidden' && touchEnabled, // Should handle horizontal scroll
        newOverflowY !== 'hidden' && touchEnabled // Should handle vertical scroll
      );
    }

    // In the case of controlled scrolling, notify.
    if (this.props.ownerHeight !== nextProps.ownerHeight ||
        this.props.scrollTop !== nextProps.scrollTop ||
        nextProps.scrollLeft !== undefined) {
      this._didScrollStart();
    }
    this._didScrollStop();

    this.setState(this._calculateState(nextProps, this.state, elementTemplates));
  },

  componentDidUpdate() {
    this._reportContentHeight();
  },

  render() /*object*/ {
    var state = this.state;
    var props = this.props;

    var onColumnReorder = props.onColumnReorderEndCallback ? this._onColumnReorder : null;

    var groupHeader;
    if (state.useGroupHeader) {
      groupHeader = (
        <FixedDataTableRow
          key="group_header"
          isScrolling={this._isScrolling}
          className={joinClasses(
            cx('fixedDataTableLayout/header'),
            cx('public/fixedDataTable/header'),
          )}
          width={state.width}
          height={state.groupHeaderHeight}
          index={0}
          zIndex={1}
          offsetTop={0}
          scrollLeft={state.scrollX}
          fixedColumns={state.fixedColumnGroups}
          scrollableColumns={state.scrollableColumnGroups}
          onColumnResize={this._onColumnResize}
          onColumnReorder={onColumnReorder}
          onColumnReorderMove={this._onColumnReorderMove}
        />
      );
    }

    var maxScrollY = this.state.maxScrollY;
    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden' && state.showScrollbarX !== false;
    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden' && state.showScrollbarY !== false;
    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
    var scrollbarYHeight = state.height - scrollbarXHeight -
        (2 * BORDER_HEIGHT) - state.footerHeight;

    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
    scrollbarYHeight -= bodyOffsetTop;
    var bottomSectionOffset = 0;
    var footOffsetTop = props.maxHeight != null
      ? bodyOffsetTop + state.bodyHeight
      : bodyOffsetTop + scrollbarYHeight;
    var rowsContainerHeight = footOffsetTop + state.footerHeight;

    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
      bottomSectionOffset = props.ownerHeight - state.height;

      footOffsetTop = Math.min(
        footOffsetTop,
        props.ownerHeight - state.footerHeight - scrollbarXHeight
      );

      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
    }

    var verticalScrollbar;
    if (showScrollbarY) {
      verticalScrollbar =
        <Scrollbar
          size={scrollbarYHeight}
          contentSize={scrollbarYHeight + maxScrollY}
          onScroll={this._onVerticalScroll}
          verticalTop={bodyOffsetTop}
          position={state.scrollY}
        />;
    }

    var horizontalScrollbar;
    if (showScrollbarX) {
      var scrollbarXWidth = state.width;
      horizontalScrollbar =
        <HorizontalScrollbar
          contentSize={scrollbarXWidth + state.maxScrollX}
          offset={bottomSectionOffset}
          onScroll={this._onHorizontalScroll}
          position={state.scrollX}
          size={scrollbarXWidth}
        />;
    }

    var dragKnob =
      <FixedDataTableColumnResizeHandle
        height={state.height}
        initialWidth={state.columnResizingData.width || 0}
        minWidth={state.columnResizingData.minWidth || 0}
        maxWidth={state.columnResizingData.maxWidth || Number.MAX_VALUE}
        visible={!!state.isColumnResizing}
        leftOffset={state.columnResizingData.left || 0}
        knobHeight={state.headerHeight}
        initialEvent={state.columnResizingData.initialEvent}
        onColumnResizeEnd={props.onColumnResizeEndCallback}
        columnKey={state.columnResizingData.key}
      />;

    var footer = null;
    if (state.footerHeight) {
      footer =
        <FixedDataTableRow
          key="footer"
          isScrolling={this._isScrolling}
          className={joinClasses(
            cx('fixedDataTableLayout/footer'),
            cx('public/fixedDataTable/footer'),
          )}
          width={state.width}
          height={state.footerHeight}
          index={-1}
          zIndex={1}
          offsetTop={footOffsetTop}
          fixedColumns={state.fixedColumns.footer}
          scrollableColumns={state.scrollableColumns.footer}
          scrollLeft={state.scrollX}
        />;
    }

    var rows = this._renderRows(bodyOffsetTop);

    var header =
      <FixedDataTableRow
        key="header"
        isScrolling={this._isScrolling}
        className={joinClasses(
          cx('fixedDataTableLayout/header'),
          cx('public/fixedDataTable/header'),
        )}
        width={state.width}
        height={state.headerHeight}
        index={-1}
        zIndex={1}
        offsetTop={headerOffsetTop}
        scrollLeft={state.scrollX}
        fixedColumns={state.fixedColumns.header}
        scrollableColumns={state.scrollableColumns.header}
        onColumnResize={this._onColumnResize}
        onColumnReorder={onColumnReorder}
        onColumnReorderMove={this._onColumnReorderMove}
        onColumnReorderEnd={this._onColumnReorderEnd}
        isColumnReordering={!!state.isColumnReordering}
        columnReorderingData={state.columnReorderingData}
      />;

    var topShadow;
    var bottomShadow;
    if (state.scrollY) {
      topShadow =
        <div
          className={joinClasses(
            cx('fixedDataTableLayout/topShadow'),
            cx('public/fixedDataTable/topShadow'),
          )}
          style={{top: bodyOffsetTop}}
        />;
    }

    if (
      (state.ownerHeight != null &&
        state.ownerHeight < state.height &&
        state.scrollContentHeight + state.reservedHeight > state.ownerHeight) ||
      state.scrollY < maxScrollY
    ) {
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
          this.state.className,
          cx('fixedDataTableLayout/main'),
          cx('public/fixedDataTable/main'),
        )}
        onWheel={this._wheelHandler.onWheel}
        onTouchStart={this._touchHandler.onTouchStart}
        onTouchEnd={this._touchHandler.onTouchEnd}
        onTouchMove={this._touchHandler.onTouchMove}
        onTouchCancel={this._touchHandler.onTouchCancel}
        style={{height: state.height, width: state.width}}>
        <div
          className={cx('fixedDataTableLayout/rowsContainer')}
          style={{height: rowsContainerHeight, width: state.width}}>
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

  _renderRows(/*number*/ offsetTop) /*object*/ {
    var state = this.state;

    return (
      <FixedDataTableBufferedRows
        isScrolling={this._isScrolling}
        defaultRowHeight={state.rowHeight}
        firstRowIndex={state.firstRowIndex}
        firstRowOffset={state.firstRowOffset}
        fixedColumns={state.fixedColumns.cell}
        height={state.bodyHeight}
        offsetTop={offsetTop}
        onRowClick={state.onRowClick}
        onRowDoubleClick={state.onRowDoubleClick}
        onRowMouseDown={state.onRowMouseDown}
        onRowMouseEnter={state.onRowMouseEnter}
        onRowMouseLeave={state.onRowMouseLeave}
        rowClassNameGetter={state.rowClassNameGetter}
        rowsCount={state.rowsCount}
        rowGetter={state.rowGetter}
        rowHeightGetter={state.rowHeightGetter}
        scrollLeft={state.scrollX}
        scrollableColumns={state.scrollableColumns.cell}
        showLastRowBorder={true}
        width={state.width}
        rowsToRender={state.rows}
        rowHeights={state.rowHeights}
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
    FixedDataTableStore.dispatch({
      type: ActionTypes.COLUMN_RESIZE,
      resizeData: {
        cellMinWidth,
        cellMaxWidth,
        cellWidth,
        columnKey,
        combinedWidth,
        clientX,
        clientY,
        leftOffset
      }
    });
  },

  _onColumnReorder(
    /*string*/ columnKey,
    /*number*/ width,
    /*number*/ left,
    /*object*/ event
  ) {
    FixedDataTableStore.dispatch({
      type: ActionTypes.COLUMN_REORDER,
      reorderData: {
        scrollStart: this.state.scrollX,
        columnKey,
        width,
        left
      }
    });
  },

  _onColumnReorderMove(
    /*number*/ deltaX
  ) {
    FixedDataTableStore.dispatch({
      type: ActionTypes.COLUMN_REORDER_MOVE,
      deltaX
    });
  },

  _onColumnReorderEnd(
    /*object*/ props,
    /*object*/ event
  ) {

    var columnBefore = this.state.columnReorderingData.columnBefore;
    var columnAfter = this.state.columnReorderingData.columnAfter;
    var reorderColumn = this.state.columnReorderingData.columnKey;

    FixedDataTableStore.dispatch({
      type: ActionTypes.COLUMN_REORDER_END,
    });
    this.props.onColumnReorderEndCallback({
      columnBefore, columnAfter, reorderColumn
    });

    var onHorizontalScroll = this.props.onHorizontalScroll;
    if (this.state.columnReorderingData.scrollStart !== this.state.scrollX && onHorizontalScroll) {
      onHorizontalScroll(this.state.scrollX)
    };
  },

  _calculateState(props, oldState, elementTemplates) {
    invariant(
      props.height !== undefined || props.maxHeight !== undefined,
      'You must set either a height or a maxHeight'
    );

    let state = FixedDataTableStore.getState();
    let {
      firstRowIndex,
      firstRowOffset,
      scrollY,
      scrollContentHeight
    } = state.scrollState;
    let {
      columns,
      columnGroups,
      columnReorderingData,
      columnResizingData,
      groupHeaderHeight,
      isColumnReordering,
      isColumnResizing,
      maxScrollX,
      horizontalScrollbarVisible,
      scrollX,
      useGroupHeader,
    } = state.columnState
    /* TODO
    if (props.scrollTop !== this.props.scrollTop) {
      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    }
    */

    var useMaxHeight = props.height === undefined;
    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
    var totalHeightReserved = props.footerHeight + props.headerHeight +
      groupHeaderHeight + 2 * BORDER_HEIGHT;
    var bodyHeight = height - totalHeightReserved;
    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;

    if (horizontalScrollbarVisible) {
      bodyHeight -= Scrollbar.SIZE;
      totalHeightNeeded += Scrollbar.SIZE;
      totalHeightReserved += Scrollbar.SIZE;
    }

    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
    scrollY = Math.min(scrollY, maxScrollY);

    if (!maxScrollY) {
      // no vertical scrollbar necessary, use the totals we tracked so we
      // can shrink-to-fit vertically
      if (useMaxHeight) {
        height = totalHeightNeeded;
      }
      bodyHeight = totalHeightNeeded - totalHeightReserved;
    }

    // Ugly transforms to extract data into a row consumable format.
    // TODO (jordan) figure out if this can efficiently be merged with the result of convertColumnElementsToData.
    // I think if I did that, I'd have to pass the elementTemplates into the reducer
    const fixedColumnGroups = [];
    const scrollableColumnGroups = [];
    forEach(columnGroups, (columnGroup, index) => {
      const groupData = {
        props: columnGroup,
        template: elementTemplates.groupHeader[index],
      };
      if (columnGroup.fixed) {
        fixedColumnGroups.push(groupData);
      } else {
        scrollableColumnGroups.push(groupData);
      }
    });

    const fixedColumns = {
      cell: [],
      header: [],
      footer: [],
    };
    const scrollableColumns = {
      cell: [],
      header: [],
      footer: [],
    };
    forEach(columns, (column, index) => {
      let columnContainer = scrollableColumns;
      if (column.fixed) {
        columnContainer = fixedColumns;
      }

      columnContainer.cell.push({
        props: column,
        template: elementTemplates.cell[index],
      });
      columnContainer.header.push({
        props: column,
        template: elementTemplates.header[index],
      });
      columnContainer.footer.push({
        props: column,
        template: elementTemplates.footer[index],
      });
    });

    //TODO
    //this._scrollHelper.setViewportHeight(bodyHeight);

    // The order of elements in this object metters and bringing bodyHeight,
    // height or useGroupHeader to the top can break various features
    return {
      ...props,
      fixedColumnGroups,
      scrollableColumnGroups,
      fixedColumns,
      scrollableColumns,
      columnResizingData,
      firstRowIndex,
      firstRowOffset,
      horizontalScrollbarVisible,
      isColumnResizing,
      maxScrollX,
      maxScrollY,
      reservedHeight: totalHeightReserved,
      scrollContentHeight,
      scrollX,
      scrollY,

      // These properties may overwrite properties defined in props
      bodyHeight,
      height,
      groupHeaderHeight,
      useGroupHeader,

      //TODO (asif) Move somewhere
      rowHeights: {},
      rows: []
    };
  },

  _onScroll(/*number*/ deltaX, /*number*/ deltaY) {
    if (this.isMounted()) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }
      var x = this.state.scrollX;
      if (Math.abs(deltaY) > Math.abs(deltaX) &&
          this.props.overflowY !== 'hidden') {
        FixedDataTableStore.dispatch({
          type: ActionTypes.SCROLL_BY,
          deltaY: deltaY,
        });
      } else if (deltaX && this.props.overflowX !== 'hidden') {
        x += deltaX;
        x = x < 0 ? 0 : x;
        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;

        //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
        var onHorizontalScroll = this.props.onHorizontalScroll;
        if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
          FixedDataTableStore.dispatch({
            type: ActionTypes.SCROLL_X,
            scrollX: x,
          });
        }
      }

      this._didScrollStop();
    }
  },


  _onHorizontalScroll(/*number*/ scrollPos) {
    if (this.isMounted() && scrollPos !== this.state.scrollX) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }
      var onHorizontalScroll = this.props.onHorizontalScroll;
      if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
        FixedDataTableStore.dispatch({
          type: ActionTypes.SCROLL_X,
          scrollX: scrollPos,
        });
      }
      this._didScrollStop();
    }
  },

  _onVerticalScroll(/*number*/ scrollPos) {
    if (this.isMounted() && scrollPos !== this.state.scrollY) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }

      FixedDataTableStore.dispatch({
        type: ActionTypes.SCROLL_TO,
        scrollPosition: scrollPos
      });

      this._didScrollStop();
    }
  },

  _didScrollStart() {
    if (this.isMounted() && !this._isScrolling) {
      this._isScrolling = true;

      FixedDataTableStore.dispatch({
        type: ActionTypes.SCROLL_START
      });

      if (this.props.onScrollStart) {
        this.props.onScrollStart(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
      }
    }
  },

  _didScrollStop() {
    if (this.isMounted() && this._isScrolling) {
      this._isScrolling = false;

      FixedDataTableStore.dispatch({
        type: ActionTypes.SCROLL_END
      });

      if (this.props.onScrollEnd) {
        this.props.onScrollEnd(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
      }
    }
  },
});

var HorizontalScrollbar = React.createClass({
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
    var outerContainerStyle = {
      height: Scrollbar.SIZE,
      width: this.props.size,
    };
    var innerContainerStyle = {
      height: Scrollbar.SIZE,
      position: 'absolute',
      overflow: 'hidden',
      width: this.props.size,
    };
    FixedDataTableTranslateDOMPosition(
      innerContainerStyle,
      0,
      this.props.offset,
      this._initialRender,
    );

    return (
      <div
        className={joinClasses(
          cx('fixedDataTableLayout/horizontalScrollbar'),
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
