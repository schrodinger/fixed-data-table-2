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
import FixedDataTableScrollHelper from 'FixedDataTableScrollHelper';
import FixedDataTableWidthHelper from 'FixedDataTableWidthHelper';

import cx from 'cx';
import debounceCore from 'debounceCore';
import emptyFunction from 'emptyFunction';
import invariant from 'invariant';
import joinClasses from 'joinClasses';
import shallowEqual from 'shallowEqual';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';

var {PropTypes} = React;
var ReactChildren = React.Children;

var EMPTY_OBJECT = {};
var BORDER_HEIGHT = 1;
var HEADER = 'header';
var FOOTER = 'footer';
var CELL = 'cell';
var DRAG_SCROLL_SPEED = 15;
var DRAG_SCROLL_BUFFER = 100;

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
    var props = this.props;

    var viewportHeight =
      (props.height === undefined ? props.maxHeight : props.height) -
      (props.headerHeight || 0) -
      (props.footerHeight || 0) -
      (props.groupHeaderHeight || 0);
    this._scrollHelper = new FixedDataTableScrollHelper(
      props.rowsCount,
      props.rowHeight,
      viewportHeight,
      props.rowHeightGetter
    );

    this._didScrollStop = debounceCore(this._didScrollStop, 200, this);

    var touchEnabled = props.touchScrollEnabled === true;

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

    this.setState(this._calculateState(props));
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
    if (this.props.overflowY === 'hidden' || delta === 0) {
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
        this.props.scrollLeft !== nextProps.scrollLeft) {
      this._didScrollStart();
    }
    this._didScrollStop();

    this.setState(this._calculateState(nextProps, this.state));
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
          fixedColumns={state.groupHeaderFixedColumns}
          scrollableColumns={state.groupHeaderScrollableColumns}
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
          fixedColumns={state.footFixedColumns}
          scrollableColumns={state.footScrollableColumns}
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
        fixedColumns={state.headFixedColumns}
        scrollableColumns={state.headScrollableColumns}
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
        fixedColumns={state.bodyFixedColumns}
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
        scrollableColumns={state.bodyScrollableColumns}
        showLastRowBorder={true}
        width={state.width}
        rowPositionGetter={this._scrollHelper.getRowPosition}
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
    this.setState({
      isColumnResizing: true,
      columnResizingData: {
        left: leftOffset + combinedWidth - cellWidth,
        width: cellWidth,
        minWidth: cellMinWidth,
        maxWidth: cellMaxWidth,
        initialEvent: {
          clientX: event.clientX,
          clientY: event.clientY,
          preventDefault: emptyFunction
        },
        key: columnKey
      }
    });
  },

  _onColumnReorder(
    /*string*/ columnKey,
    /*number*/ width,
    /*number*/ left,
    /*object*/ event
  ) {
    // No native support in IE11 for find, findIndex, or includes, so using some.
    var isFixed = this.state.headFixedColumns.some(function(column) {
      return column.props.columnKey === columnKey;
    });

    this.setState({
      isColumnReordering: true,
      columnReorderingData: {
        dragDistance: 0,
        isFixed: isFixed,
        scrollStart: this.state.scrollX,
        columnKey: columnKey,
        columnWidth: width,
        originalLeft: left,
        columnsBefore: [],
        columnsAfter: []
      }
    });
  },

  _onColumnReorderMove(
    /*number*/ deltaX
  ) {
    var reorderingData = this.state.columnReorderingData;
    reorderingData.dragDistance = deltaX;
    reorderingData.columnBefore = undefined;
    reorderingData.columnAfter = undefined;

    var isFixedColumn = this.state.columnReorderingData.isFixed;
    var scrollX = this.state.scrollX;

    if (!isFixedColumn) {
      //Relative dragX position on scroll
      var dragX = reorderingData.originalLeft - reorderingData.scrollStart + reorderingData.dragDistance;

      var fixedColumnsWidth = this.state.bodyFixedColumns.reduce((sum, column) => sum + column.props.width, 0);
      var relativeWidth = this.props.width - fixedColumnsWidth;

      //Scroll the table left or right if we drag near the edges of the table
      if (dragX > relativeWidth - DRAG_SCROLL_BUFFER) {
        scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, this.state.maxScrollX);
      } else if (dragX <= DRAG_SCROLL_BUFFER) {
        scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
      }

      reorderingData.dragDistance += this.state.scrollX - reorderingData.scrollStart;
    }

    this.setState({
      scrollX: scrollX,
      columnReorderingData: reorderingData
    });
  },

  _onColumnReorderEnd(
    /*object*/ props,
    /*object*/ event
  ) {

    var columnBefore = this.state.columnReorderingData.columnBefore;
    var columnAfter = this.state.columnReorderingData.columnAfter;
    var reorderColumn = this.state.columnReorderingData.columnKey;
    var cancelReorder = this.state.columnReorderingData.cancelReorder;

    this.setState({
      isColumnReordering: false,
      columnReorderingData: {}
    });

    if (cancelReorder) {
      return
    }

    this.props.onColumnReorderEndCallback({
      columnBefore, columnAfter, reorderColumn
    });

    var onHorizontalScroll = this.props.onHorizontalScroll;
    if (this.state.columnReorderingData.scrollStart !== this.state.scrollX && onHorizontalScroll) {
      onHorizontalScroll(this.state.scrollX)
    };
  },

  _areColumnSettingsIdentical(
    oldColumns: Array,
    newColumns: Array
  ): boolean {
    if (oldColumns.length !== newColumns.length) {
      return false;
    }
    for (var index = 0; index < oldColumns.length; ++index) {
      if (!shallowEqual(
          oldColumns[index].props,
          newColumns[index].props
      )) {
        return false;
      }
    }
    return true;
  },

  _populateColumnsAndColumnData(
    columns: Array,
    columnGroups: ?Array,
    oldState: ?Object
  ): Object {
    var canReuseColumnSettings = false;
    var canReuseColumnGroupSettings = false;

    if (oldState && oldState.columns) {
      canReuseColumnSettings =
        this._areColumnSettingsIdentical(columns, oldState.columns);
    }
    if (oldState && oldState.columnGroups && columnGroups) {
      canReuseColumnGroupSettings =
        this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
    }

    var columnInfo = {};
    if (canReuseColumnSettings) {
      columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
      columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
      columnInfo.headFixedColumns = oldState.headFixedColumns;
      columnInfo.headScrollableColumns = oldState.headScrollableColumns;
      columnInfo.footFixedColumns = oldState.footFixedColumns;
      columnInfo.footScrollableColumns = oldState.footScrollableColumns;
    } else {
      var bodyColumnTypes = this._splitColumnTypes(columns);
      columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
      columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

      var headColumnTypes = this._splitColumnTypes(
        this._selectColumnElement(HEADER, columns)
      );
      columnInfo.headFixedColumns = headColumnTypes.fixed;
      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

      var footColumnTypes = this._splitColumnTypes(
        this._selectColumnElement(FOOTER, columns)
      );
      columnInfo.footFixedColumns = footColumnTypes.fixed;
      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
    }

    if (canReuseColumnGroupSettings) {
      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
      columnInfo.groupHeaderScrollableColumns =
        oldState.groupHeaderScrollableColumns;
    } else {
      if (columnGroups) {
        var groupHeaderColumnTypes = this._splitColumnTypes(
          this._selectColumnElement(HEADER, columnGroups)
        );
        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
        columnInfo.groupHeaderScrollableColumns =
          groupHeaderColumnTypes.scrollable;
      }
    }

    return columnInfo;
  },

  _calculateState(/*object*/ props, /*?object*/ oldState) /*object*/ {
    invariant(
      props.height !== undefined || props.maxHeight !== undefined,
      'You must set either a height or a maxHeight'
    );

    var children = [];
    ReactChildren.forEach(props.children, (child, index) => {
      if (child == null) {
        return;
      }
      invariant(
        child.type.__TableColumnGroup__ ||
        child.type.__TableColumn__,
        'child type should be <FixedDataTableColumn /> or ' +
        '<FixedDataTableColumnGroup />'
      );
      children.push(child);
    });

    var useGroupHeader = false;
    if (children.length && children[0].type.__TableColumnGroup__) {
      useGroupHeader = true;
    }

    var scrollState;
    var firstRowIndex = (oldState && oldState.firstRowIndex) || 0;
    var firstRowOffset = (oldState && oldState.firstRowOffset) || 0;
    var scrollY = oldState ? oldState.scrollY : 0;
    var scrollX = oldState ? oldState.scrollX : 0;

    var lastScrollLeft = oldState ? oldState.scrollLeft : 0;
    if (props.scrollLeft !== undefined && props.scrollLeft !== lastScrollLeft) {
      scrollX = props.scrollLeft;
    }

    var groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

    if (oldState && (props.rowsCount !== oldState.rowsCount || props.rowHeight !== oldState.rowHeight)) {
      // Number of rows changed, try to scroll to the row from before the
      // change
      var viewportHeight =
        (props.height === undefined ? props.maxHeight : props.height) -
        (props.headerHeight || 0) -
        (props.footerHeight || 0) -
        (props.groupHeaderHeight || 0);
      this._scrollHelper = new FixedDataTableScrollHelper(
        props.rowsCount,
        props.rowHeight,
        viewportHeight,
        props.rowHeightGetter
      );
      scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
      this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
    }

    var lastScrollToRow  = oldState ? oldState.scrollToRow : undefined;
    if (props.scrollToRow != null && props.scrollToRow !== lastScrollToRow) {
      scrollState = this._scrollHelper.scrollRowIntoView(props.scrollToRow);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    }

    var lastScrollTop = oldState ? oldState.scrollTop : undefined;
    if (props.scrollTop != null && props.scrollTop !== lastScrollTop) {
      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    }

    var columnResizingData;
    if (props.isColumnResizing) {
      columnResizingData = oldState && oldState.columnResizingData;
    } else {
      columnResizingData = EMPTY_OBJECT;
    }

    var columns;
    var columnGroups;

    if (useGroupHeader) {
      var columnGroupSettings =
        FixedDataTableWidthHelper.adjustColumnGroupWidths(
          children,
          props.width
      );
      columns = columnGroupSettings.columns;
      columnGroups = columnGroupSettings.columnGroups;
    } else {
      columns = FixedDataTableWidthHelper.adjustColumnWidths(
        children,
        props.width
      );
    }

    var columnInfo = this._populateColumnsAndColumnData(
      columns,
      columnGroups,
      oldState
    );

    var lastScrollToColumn = oldState ? oldState.scrollToColumn : undefined;
    if (props.scrollToColumn !== null && props.scrollToColumn !== lastScrollToColumn) {
      // If selected column is a fixed column, don't scroll
      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
      if (props.scrollToColumn >= fixedColumnsCount) {
        var totalFixedColumnsWidth = 0;
        var i, column;
        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
          column = columnInfo.bodyFixedColumns[i];
          totalFixedColumnsWidth += column.props.width;
        }

        var scrollableColumnIndex = Math.min(
          props.scrollToColumn - fixedColumnsCount,
          columnInfo.bodyScrollableColumns.length - 1,
        );

        var previousColumnsWidth = 0;
        for (i = 0; i < scrollableColumnIndex; ++i) {
          column = columnInfo.bodyScrollableColumns[i];
          previousColumnsWidth += column.props.width;
        }

        var availableScrollWidth = props.width - totalFixedColumnsWidth;
        var selectedColumnWidth = columnInfo.bodyScrollableColumns[
          scrollableColumnIndex
        ].props.width;
        var minAcceptableScrollPosition =
          previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

        if (scrollX < minAcceptableScrollPosition) {
          scrollX = minAcceptableScrollPosition;
        }

        if (scrollX > previousColumnsWidth) {
          scrollX = previousColumnsWidth;
        }
      }
    }

    var useMaxHeight = props.height === undefined;
    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
    var totalHeightReserved = props.footerHeight + props.headerHeight +
      groupHeaderHeight + 2 * BORDER_HEIGHT;
    var bodyHeight = height - totalHeightReserved;
    var scrollContentHeight = this._scrollHelper.getContentHeight();
    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
    var scrollContentWidth =
      FixedDataTableWidthHelper.getTotalWidth(columns);

    var horizontalScrollbarVisible = scrollContentWidth > props.width &&
      props.overflowX !== 'hidden' && props.showScrollbarX !== false;

    if (horizontalScrollbarVisible) {
      bodyHeight -= Scrollbar.SIZE;
      totalHeightNeeded += Scrollbar.SIZE;
      totalHeightReserved += Scrollbar.SIZE;
    }

    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
    scrollX = Math.min(scrollX, maxScrollX);
    scrollY = Math.min(scrollY, maxScrollY);

    if (!maxScrollY) {
      // no vertical scrollbar necessary, use the totals we tracked so we
      // can shrink-to-fit vertically
      if (useMaxHeight) {
        height = totalHeightNeeded;
      }
      bodyHeight = totalHeightNeeded - totalHeightReserved;
    }

    this._scrollHelper.setViewportHeight(bodyHeight);

    // This calculation is synonymous to Element.scrollTop
    var scrollTop = Math.abs(firstRowOffset - this._scrollHelper.getRowPosition(firstRowIndex));
    // This case can happen when the user is completely scrolled down and resizes the viewport to be taller vertically.
    // This is because we set the viewport height after having calculated the rows
    if (scrollTop !== scrollY) {
      scrollTop = maxScrollY;
      scrollState = this._scrollHelper.scrollTo(scrollTop);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    }

    // The order of elements in this object metters and bringing bodyHeight,
    // height or useGroupHeader to the top can break various features
    var newState = {
      isColumnResizing: oldState && oldState.isColumnResizing,
      // isColumnResizing should be overwritten by value from props if
      // avaialble

      ...columnInfo,
      ...props,

      columns,
      columnGroups,
      columnResizingData,
      firstRowIndex,
      firstRowOffset,
      horizontalScrollbarVisible,
      maxScrollX,
      maxScrollY,
      reservedHeight: totalHeightReserved,
      scrollContentHeight,
      scrollX,
      scrollY,
      // These properties may overwrite properties defined in
      // columnInfo and props
      bodyHeight,
      height,
      groupHeaderHeight,
      useGroupHeader,
    };

    return newState;
  },

  _selectColumnElement(/*string*/ type, /*array*/ columns) /*array*/ {
    var newColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      var column = columns[i];
      newColumns.push(React.cloneElement(
        column,
        {
          cell: type ?  column.props[type] : column.props[CELL]
        }
      ));
    }
    return newColumns;
  },

  _splitColumnTypes(/*array*/ columns) /*object*/ {
    var fixedColumns = [];
    var scrollableColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      if (columns[i].props.fixed) {
        fixedColumns.push(columns[i]);
      } else {
        scrollableColumns.push(columns[i]);
      }
    }
    return {
      fixed: fixedColumns,
      scrollable: scrollableColumns,
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
        var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
        var onVerticalScroll = this.props.onVerticalScroll;
        if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
          var maxScrollY = Math.max(
            0,
            scrollState.contentHeight - this.state.bodyHeight
          );
          this.setState({
            firstRowIndex: scrollState.index,
            firstRowOffset: scrollState.offset,
            scrollY: scrollState.position,
            scrollContentHeight: scrollState.contentHeight,
            maxScrollY: maxScrollY,
          });
        }
      } else if (deltaX && this.props.overflowX !== 'hidden') {
        x += deltaX;
        x = x < 0 ? 0 : x;
        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;

        //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
        var onHorizontalScroll = this.props.onHorizontalScroll;
        if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
          this.setState({
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
        this.setState({
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
      var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));

      var onVerticalScroll = this.props.onVerticalScroll;
      if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
        this.setState({
          firstRowIndex: scrollState.index,
          firstRowOffset: scrollState.offset,
          scrollY: scrollState.position,
          scrollContentHeight: scrollState.contentHeight,
        });
        this._didScrollStop();
      }
    }
  },

  _didScrollStart() {
    if (this.isMounted() && !this._isScrolling) {
      this._isScrolling = true;
      if (this.props.onScrollStart) {
        this.props.onScrollStart(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
      }
    }
  },

  _didScrollStop() {
    if (this.isMounted() && this._isScrolling) {
      this._isScrolling = false;
      this.setState({redraw: true});
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
