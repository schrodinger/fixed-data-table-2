'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _ReactWheelHandler = require('./ReactWheelHandler');

var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

var _ReactTouchHandler = require('./ReactTouchHandler');

var _ReactTouchHandler2 = _interopRequireDefault(_ReactTouchHandler);

var _Scrollbar = require('./Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _FixedDataTableBufferedRows = require('./FixedDataTableBufferedRows');

var _FixedDataTableBufferedRows2 = _interopRequireDefault(_FixedDataTableBufferedRows);

var _FixedDataTableColumnResizeHandle = require('./FixedDataTableColumnResizeHandle');

var _FixedDataTableColumnResizeHandle2 = _interopRequireDefault(_FixedDataTableColumnResizeHandle);

var _FixedDataTableRow = require('./FixedDataTableRow');

var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

var _FixedDataTableScrollHelper = require('./FixedDataTableScrollHelper');

var _FixedDataTableScrollHelper2 = _interopRequireDefault(_FixedDataTableScrollHelper);

var _FixedDataTableWidthHelper = require('./FixedDataTableWidthHelper');

var _FixedDataTableWidthHelper2 = _interopRequireDefault(_FixedDataTableWidthHelper);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _debounceCore = require('./debounceCore');

var _debounceCore2 = _interopRequireDefault(_debounceCore);

var _emptyFunction = require('./emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _invariant = require('./invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _joinClasses = require('./joinClasses');

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _FixedDataTableTranslateDOMPosition = require('./FixedDataTableTranslateDOMPosition');

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactChildren = _React2.default.Children;

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
var FixedDataTable = (0, _createReactClass2.default)({
  displayName: 'FixedDataTable',

  propTypes: {

    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: _propTypes2.default.number.isRequired,

    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: _propTypes2.default.number,

    /**
     * Class name to be passed into parent container
     */
    className: _propTypes2.default.string,

    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: _propTypes2.default.number,

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
    ownerHeight: _propTypes2.default.number,

    overflowX: _propTypes2.default.oneOf(['hidden', 'auto']),
    overflowY: _propTypes2.default.oneOf(['hidden', 'auto']),

    /**
     * Boolean flag indicating of touch scrolling should be enabled
     * This feature is current in beta and may have bugs
     */
    touchScrollEnabled: _propTypes2.default.bool,

    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: _propTypes2.default.bool,
    showScrollbarY: _propTypes2.default.bool,

    /**
     * Callback when horizontally scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onHorizontalScroll: _propTypes2.default.func,

    /**
     * Callback when vertically scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onVerticalScroll: _propTypes2.default.func,

    /**
     * Number of rows in the table.
     */
    rowsCount: _propTypes2.default.number.isRequired,

    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: _propTypes2.default.number.isRequired,

    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: _propTypes2.default.func,

    /**
     * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
     * different value.  Defaults to 0 and no sub-row being displayed.
     */
    subRowHeight: _propTypes2.default.number,

    /**
     * If specified, `subRowHeightGetter(index)` is called for each row and the
     * returned value overrides `subRowHeight` for particular row.
     */
    subRowHeightGetter: _propTypes2.default.func,

    /**
     * The row expanded for table row.
     * This can either be a React element, or a function that generates
     * a React Element. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   rowIndex; number // (the row index)
     *   height: number // (supplied from the Table or rowHeightGetter)
     *   width: number // (supplied from the Table)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: _propTypes2.default.func,

    /**
     * If specified, `rowKeyGetter(index)` is called for each row and the
     * returned value overrides `key` for the particular row.
     */
    rowKeyGetter: _propTypes2.default.func,

    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: _propTypes2.default.number,

    /**
     * Pixel height of header.
     */
    headerHeight: _propTypes2.default.number.isRequired,

    /**
     * Pixel height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     * Default is headerHeight and groupHeaderHeight.
     *
     * This can be used with CSS to make a header cell span both the group & normal header row.
     * Setting this to a value larger than height will cause the content to
     * overflow the height. This is useful when adding a 2nd table as the group
     * header and vertically merging the 2 headers when a column is not part
     * of a group. Here are the necessary CSS changes:
     *
     * Both headers:
     *  - cellGroupWrapper needs overflow-x: hidden and pointer-events: none
     *  - cellGroup needs pointer-events: auto to reenable them on child els
     * Group header:
     *  - Layout/main needs overflow: visible and a higher z-index
     *  - CellLayout/main needs overflow-y: visible
     *  - cellGroup needs overflow: visible
     */
    cellGroupWrapperHeight: _propTypes2.default.number,

    /**
     * Pixel height of footer.
     */
    footerHeight: _propTypes2.default.number,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: _propTypes2.default.number,

    /**
     * Index of column to scroll to.
     */
    scrollToColumn: _propTypes2.default.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: _propTypes2.default.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: _propTypes2.default.number,

    /**
     * Callback that is called when scrolling starts with current horizontal
     * and vertical scroll values.
     */
    onScrollStart: _propTypes2.default.func,

    /**
     * Callback that is called when scrolling ends or stops with new horizontal
     * and vertical scroll values.
     */
    onScrollEnd: _propTypes2.default.func,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopScrollPropagation: _propTypes2.default.bool,

    /**
     * If enabled onScrollEnd will be called only after state update -- fixes
     * a bug (see #226) where wrong values are reported.
     */
    fixOnScrollEnd: _propTypes2.default.bool,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: _propTypes2.default.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: _propTypes2.default.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-up event happens on a row.
     */
    onRowMouseUp: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: _propTypes2.default.func,

    /**
     * Callback that is called when a touch-start event happens on a row.
     */
    onRowTouchStart: _propTypes2.default.func,

    /**
     * Callback that is called when a touch-end event happens on a row.
     */
    onRowTouchEnd: _propTypes2.default.func,

    /**
     * Callback that is called when a touch-move event happens on a row.
     */
    onRowTouchMove: _propTypes2.default.func,

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
    onColumnResizeEndCallback: _propTypes2.default.func,

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
    onColumnReorderEndCallback: _propTypes2.default.func,

    /**
     * Whether a column is currently being resized.
     */
    isColumnResizing: _propTypes2.default.bool,

    /**
     * Whether columns are currently being reordered.
     */
    isColumnReordering: _propTypes2.default.bool,

    /**
     * The number of rows outside the viewport to prerender. Defaults to roughly
     * half of the number of visible rows.
     */
    bufferRowCount: _propTypes2.default.number
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
      showScrollbarX: true,
      showScrollbarY: true,
      touchScrollEnabled: false,
      stopScrollPropagation: false
    };
  },
  componentWillMount: function componentWillMount() {
    var props = this.props;

    var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
    this._scrollHelper = new _FixedDataTableScrollHelper2.default(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter, props.subRowHeight, props.subRowHeightGetter);

    this._didScrollStop = (0, _debounceCore2.default)(this._didScrollStopSync, 200, this);

    this._wheelHandler = new _ReactWheelHandler2.default(this._onScroll, this._shouldHandleWheelX, this._shouldHandleWheelY, props.stopScrollPropagation);
    this._touchHandler = new _ReactTouchHandler2.default(this._onScroll, this._shouldHandleTouchX, this._shouldHandleTouchY, props.stopScrollPropagation);

    this.setState(this._calculateState(props));
  },
  componentWillUnmount: function componentWillUnmount() {
    this._wheelHandler = null;
    this._touchHandler = null;

    // Cancel any pending debounced scroll handling and handle immediately.
    this._didScrollStop.reset();
    this._didScrollStopSync();
  },
  _shouldHandleTouchX: function _shouldHandleTouchX( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelX(delta);
  },
  _shouldHandleTouchY: function _shouldHandleTouchY( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelY(delta);
  },
  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
    if (this.props.overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && this.state.scrollX > 0 || delta >= 0 && this.state.scrollX < this.state.maxScrollX;
  },
  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
    if (this.props.overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && this.state.scrollY > 0 || delta >= 0 && this.state.scrollY < this.state.maxScrollY;
  },
  _reportContentHeight: function _reportContentHeight() {
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
    if (contentHeight !== this._contentHeight && this.props.onContentHeightChange) {
      this.props.onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },
  componentDidMount: function componentDidMount() {
    this._reportContentHeight();
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
    var newOverflowX = nextProps.overflowX;
    var newOverflowY = nextProps.overflowY;

    // In the case of controlled scrolling, notify.
    if (this.props.ownerHeight !== nextProps.ownerHeight || this.props.scrollTop !== nextProps.scrollTop || this.props.scrollLeft !== nextProps.scrollLeft) {
      this._didScrollStart();
    }

    // call didScrollStop only after state has been updated
    if (this.props.fixOnScrollEnd) {
      this.setState(this._calculateState(nextProps, this.state), this._didScrollStop);
      return;
    }

    // Cancel any pending debounced scroll handling and handle immediately.
    this._didScrollStop.reset();
    this._didScrollStopSync();

    this.setState(this._calculateState(nextProps, this.state));
  },
  componentDidUpdate: function componentDidUpdate() {
    this._reportContentHeight();
  },
  render: function render() /*object*/{
    var state = this.state;
    var props = this.props;

    var onColumnReorder = props.onColumnReorderEndCallback ? this._onColumnReorder : null;

    var groupHeader;
    if (state.useGroupHeader) {
      groupHeader = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'group_header',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
        width: state.width,
        height: state.groupHeaderHeight,
        cellGroupWrapperHeight: state.cellGroupWrapperHeight,
        index: 0,
        zIndex: 1,
        offsetTop: 0,
        scrollLeft: state.scrollX,
        fixedColumns: state.groupHeaderFixedColumns,
        scrollableColumns: state.groupHeaderScrollableColumns,
        onColumnResize: this._onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: this._onColumnReorderMove
      });
    }

    var maxScrollY = this.state.maxScrollY;
    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden' && state.showScrollbarX !== false;
    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden' && state.showScrollbarY !== false;
    var scrollbarXHeight = showScrollbarX ? _Scrollbar2.default.SIZE : 0;
    var scrollbarYHeight = state.height - scrollbarXHeight - 2 * BORDER_HEIGHT - state.footerHeight;

    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
    scrollbarYHeight -= bodyOffsetTop;
    var bottomSectionOffset = 0;
    var footOffsetTop = props.maxHeight != null ? bodyOffsetTop + state.bodyHeight : bodyOffsetTop + scrollbarYHeight;
    var rowsContainerHeight = footOffsetTop + state.footerHeight;

    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
      bottomSectionOffset = props.ownerHeight - state.height;

      footOffsetTop = Math.min(footOffsetTop, props.ownerHeight - state.footerHeight - scrollbarXHeight);

      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
    }

    var verticalScrollbar;
    if (showScrollbarY) {
      verticalScrollbar = _React2.default.createElement(_Scrollbar2.default, {
        size: scrollbarYHeight,
        contentSize: scrollbarYHeight + maxScrollY,
        onScroll: this._onVerticalScroll,
        verticalTop: bodyOffsetTop,
        position: state.scrollY
      });
    }

    var horizontalScrollbar;
    if (showScrollbarX) {
      var scrollbarXWidth = state.width;
      horizontalScrollbar = _React2.default.createElement(HorizontalScrollbar, {
        contentSize: scrollbarXWidth + state.maxScrollX,
        offset: bottomSectionOffset,
        onScroll: this._onHorizontalScroll,
        position: state.scrollX,
        size: scrollbarXWidth
      });
    }

    var dragKnob = _React2.default.createElement(_FixedDataTableColumnResizeHandle2.default, {
      height: state.height,
      initialWidth: state.columnResizingData.width || 0,
      minWidth: state.columnResizingData.minWidth || 0,
      maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
      visible: !!state.isColumnResizing,
      leftOffset: state.columnResizingData.left || 0,
      knobHeight: state.headerHeight,
      initialEvent: state.columnResizingData.initialEvent,
      onColumnResizeEnd: props.onColumnResizeEndCallback,
      columnKey: state.columnResizingData.key
    });

    var footer = null;
    if (state.footerHeight) {
      footer = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'footer',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/footer'), (0, _cx2.default)('public/fixedDataTable/footer')),
        width: state.width,
        height: state.footerHeight,
        index: -1,
        zIndex: 1,
        offsetTop: footOffsetTop,
        fixedColumns: state.footFixedColumns,
        scrollableColumns: state.footScrollableColumns,
        scrollLeft: state.scrollX
      });
    }

    var rows = this._renderRows(bodyOffsetTop);

    var header = _React2.default.createElement(_FixedDataTableRow2.default, {
      key: 'header',
      isScrolling: this._isScrolling,
      className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
      width: state.width,
      height: state.headerHeight,
      cellGroupWrapperHeight: state.cellGroupWrapperHeight,
      index: -1,
      zIndex: 1,
      offsetTop: headerOffsetTop,
      scrollLeft: state.scrollX,
      fixedColumns: state.headFixedColumns,
      scrollableColumns: state.headScrollableColumns,
      onColumnResize: this._onColumnResize,
      onColumnReorder: onColumnReorder,
      onColumnReorderMove: this._onColumnReorderMove,
      onColumnReorderEnd: this._onColumnReorderEnd,
      isColumnReordering: !!state.isColumnReordering,
      columnReorderingData: state.columnReorderingData
    });

    var topShadow;
    var bottomShadow;
    if (state.scrollY) {
      topShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/topShadow'), (0, _cx2.default)('public/fixedDataTable/topShadow')),
        style: { top: bodyOffsetTop }
      });
    }

    if (state.ownerHeight != null && state.ownerHeight < state.height && state.scrollContentHeight + state.reservedHeight > state.ownerHeight || state.scrollY < maxScrollY) {
      bottomShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/bottomShadow'), (0, _cx2.default)('public/fixedDataTable/bottomShadow')),
        style: { top: footOffsetTop }
      });
    }

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)(this.state.className, (0, _cx2.default)('fixedDataTableLayout/main'), (0, _cx2.default)('public/fixedDataTable/main')),
        onWheel: this._wheelHandler.onWheel,
        onTouchStart: this._touchHandler.onTouchStart,
        onTouchEnd: this._touchHandler.onTouchEnd,
        onTouchMove: this._touchHandler.onTouchMove,
        onTouchCancel: this._touchHandler.onTouchCancel,
        style: { height: state.height, width: state.width } },
      _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)('fixedDataTableLayout/rowsContainer'),
          style: { height: rowsContainerHeight, width: state.width } },
        dragKnob,
        groupHeader,
        header,
        rows,
        footer,
        topShadow,
        bottomShadow
      ),
      verticalScrollbar,
      horizontalScrollbar
    );
  },
  _renderRows: function _renderRows( /*number*/offsetTop) /*object*/{
    var state = this.state;

    return _React2.default.createElement(_FixedDataTableBufferedRows2.default, {
      isScrolling: this._isScrolling,
      defaultRowHeight: state.rowHeight,
      firstRowIndex: state.firstRowIndex,
      firstRowOffset: state.firstRowOffset,
      fixedColumns: state.bodyFixedColumns,
      height: state.bodyHeight,
      offsetTop: offsetTop,
      onRowClick: state.onRowClick,
      onRowDoubleClick: state.onRowDoubleClick,
      onRowMouseDown: state.onRowMouseDown,
      onRowMouseUp: state.onRowMouseUp,
      onRowMouseEnter: state.onRowMouseEnter,
      onRowMouseLeave: state.onRowMouseLeave,
      onRowTouchStart: state.touchScrollEnabled ? state.onRowTouchStart : null,
      onRowTouchEnd: state.touchScrollEnabled ? state.onRowTouchEnd : null,
      onRowTouchMove: state.touchScrollEnabled ? state.onRowTouchMove : null,
      rowClassNameGetter: state.rowClassNameGetter,
      rowsCount: state.rowsCount,
      rowGetter: state.rowGetter,
      rowHeightGetter: state.rowHeightGetter,
      subRowHeight: state.subRowHeight,
      subRowHeightGetter: state.subRowHeightGetter,
      rowExpanded: state.rowExpanded,
      rowKeyGetter: state.rowKeyGetter,
      scrollLeft: state.scrollX,
      scrollableColumns: state.bodyScrollableColumns,
      showLastRowBorder: true,
      width: state.width,
      rowPositionGetter: this._scrollHelper.getRowPosition,
      bufferRowCount: this.state.bufferRowCount
    });
  },


  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize: function _onColumnResize(
  /*number*/combinedWidth,
  /*number*/leftOffset,
  /*number*/cellWidth,
  /*?number*/cellMinWidth,
  /*?number*/cellMaxWidth,
  /*number|string*/columnKey,
  /*object*/event) {
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
          preventDefault: _emptyFunction2.default
        },
        key: columnKey
      }
    });
  },
  _onColumnReorder: function _onColumnReorder(
  /*string*/columnKey,
  /*number*/width,
  /*number*/left,
  /*object*/event) {
    // No native support in IE11 for find, findIndex, or includes, so using some.
    var isFixed = this.state.headFixedColumns.some(function (column) {
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
  _onColumnReorderMove: function _onColumnReorderMove(
  /*number*/deltaX) {
    //NOTE Need to clone this object when use pureRendering
    var reorderingData = _extends({}, this.state.columnReorderingData);
    reorderingData.dragDistance = deltaX;
    reorderingData.columnBefore = undefined;
    reorderingData.columnAfter = undefined;

    var isFixedColumn = this.state.columnReorderingData.isFixed;
    var scrollX = this.state.scrollX;

    if (!isFixedColumn) {
      //Relative dragX position on scroll
      var dragX = reorderingData.originalLeft - reorderingData.scrollStart + reorderingData.dragDistance;

      var fixedColumnsWidth = this.state.bodyFixedColumns.reduce(function (sum, column) {
        return sum + column.props.width;
      }, 0);
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
  _onColumnReorderEnd: function _onColumnReorderEnd(
  /*object*/props,
  /*object*/event) {

    var columnBefore = this.state.columnReorderingData.columnBefore;
    var columnAfter = this.state.columnReorderingData.columnAfter;
    var reorderColumn = this.state.columnReorderingData.columnKey;
    var cancelReorder = this.state.columnReorderingData.cancelReorder;

    this.setState({
      isColumnReordering: false,
      columnReorderingData: {}
    });

    if (cancelReorder) {
      return;
    }

    this.props.onColumnReorderEndCallback({
      columnBefore: columnBefore, columnAfter: columnAfter, reorderColumn: reorderColumn
    });

    var onHorizontalScroll = this.props.onHorizontalScroll;
    if (this.state.columnReorderingData.scrollStart !== this.state.scrollX && onHorizontalScroll) {
      onHorizontalScroll(this.state.scrollX);
    };
  },
  _areColumnSettingsIdentical: function _areColumnSettingsIdentical(oldColumns, newColumns) {
    if (oldColumns.length !== newColumns.length) {
      return false;
    }
    for (var index = 0; index < oldColumns.length; ++index) {
      if (!(0, _shallowEqual2.default)(oldColumns[index].props, newColumns[index].props)) {
        return false;
      }
    }
    return true;
  },
  _populateColumnsAndColumnData: function _populateColumnsAndColumnData(columns, columnGroups, oldState) {
    var canReuseColumnSettings = false;
    var canReuseColumnGroupSettings = false;

    if (oldState && oldState.columns) {
      canReuseColumnSettings = this._areColumnSettingsIdentical(columns, oldState.columns);
    }
    if (oldState && oldState.columnGroups && columnGroups) {
      canReuseColumnGroupSettings = this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
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

      var headColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columns));
      columnInfo.headFixedColumns = headColumnTypes.fixed;
      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

      var footColumnTypes = this._splitColumnTypes(this._selectColumnElement(FOOTER, columns));
      columnInfo.footFixedColumns = footColumnTypes.fixed;
      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
    }

    if (canReuseColumnGroupSettings) {
      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
      columnInfo.groupHeaderScrollableColumns = oldState.groupHeaderScrollableColumns;
    } else {
      if (columnGroups) {
        var groupHeaderColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columnGroups));
        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
        columnInfo.groupHeaderScrollableColumns = groupHeaderColumnTypes.scrollable;
      }
    }

    return columnInfo;
  },
  _calculateState: function _calculateState( /*object*/props, /*?object*/oldState) /*object*/{
    (0, _invariant2.default)(props.height !== undefined || props.maxHeight !== undefined, 'You must set either a height or a maxHeight');

    var children = [];
    ReactChildren.forEach(props.children, function (child, index) {
      if (child == null) {
        return;
      }
      (0, _invariant2.default)(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or ' + '<FixedDataTableColumnGroup />');
      children.push(child);
    });

    var scrollState;
    var firstRowIndex = oldState && oldState.firstRowIndex || 0;
    var firstRowOffset = oldState && oldState.firstRowOffset || 0;
    var scrollY = oldState ? oldState.scrollY : 0;
    var scrollX = oldState ? oldState.scrollX : 0;

    var lastScrollLeft = oldState ? oldState.scrollLeft : 0;
    if (props.scrollLeft !== undefined && props.scrollLeft !== lastScrollLeft) {
      scrollX = props.scrollLeft;
    }

    if (oldState && (props.rowsCount !== oldState.rowsCount || props.rowHeight !== oldState.rowHeight || props.height !== oldState.height)) {
      // Number of rows changed, try to scroll to the row from before the
      // change
      var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);

      var oldViewportHeight = this._scrollHelper._viewportHeight;

      this._scrollHelper = new _FixedDataTableScrollHelper2.default(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter, props.subRowHeight, props.subRowHeightGetter);
      scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    } else if (oldState) {
      if (props.rowHeightGetter !== oldState.rowHeightGetter) {
        this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
      }
      if (props.subRowHeightGetter !== oldState.subRowHeightGetter) {
        this._scrollHelper.setSubRowHeightGetter(props.subRowHeightGetter);
      }
    }

    // Figure out if the vertical scrollbar will be visible first, 
    // because it will determine the width of the table
    var useGroupHeader = false;
    var groupHeaderHeight = 0;

    if (children.length && children[0].type.__TableColumnGroup__) {
      useGroupHeader = true;
      groupHeaderHeight = props.groupHeaderHeight;
    }

    var useMaxHeight = props.height === undefined;
    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
    var totalHeightReserved = props.footerHeight + props.headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;
    var bodyHeight = height - totalHeightReserved;
    var scrollContentHeight = this._scrollHelper.getContentHeight();
    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);

    // If vertical scrollbar is necessary, adjust the table width to give it room
    var adjustedWidth = props.width;
    if (maxScrollY) {
      adjustedWidth = adjustedWidth - _Scrollbar2.default.SIZE - 1;
    }

    var lastScrollToRow = oldState ? oldState.scrollToRow : undefined;
    if (props.scrollToRow != null && (props.scrollToRow !== lastScrollToRow || viewportHeight !== oldViewportHeight)) {
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
      var columnGroupSettings = _FixedDataTableWidthHelper2.default.adjustColumnGroupWidths(children, adjustedWidth);
      columns = columnGroupSettings.columns;
      columnGroups = columnGroupSettings.columnGroups;
    } else {
      columns = _FixedDataTableWidthHelper2.default.adjustColumnWidths(children, adjustedWidth);
    }

    var columnInfo = this._populateColumnsAndColumnData(columns, columnGroups, oldState);

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

        // Convert column index (0 indexed) to scrollable index (0 indexed)
        // and clamp to max scrollable index
        var scrollableColumnIndex = Math.min(props.scrollToColumn - fixedColumnsCount, columnInfo.bodyScrollableColumns.length - 1);

        // Sum width for all columns before column
        var previousColumnsWidth = 0;
        for (i = 0; i < scrollableColumnIndex; ++i) {
          column = columnInfo.bodyScrollableColumns[i];
          previousColumnsWidth += column.props.width;
        }

        // Get width of scrollable columns in viewport
        var availableScrollWidth = adjustedWidth - totalFixedColumnsWidth;

        // Get width of specified column
        var selectedColumnWidth = columnInfo.bodyScrollableColumns[scrollableColumnIndex].props.width;

        // Must scroll at least far enough for end of column (prevColWidth + selColWidth)
        // to be in viewport (availableScrollWidth = viewport width)
        var minAcceptableScrollPosition = previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

        // If scrolled less than minimum amount, scroll to minimum amount
        // so column on right of viewport
        if (scrollX < minAcceptableScrollPosition) {
          scrollX = minAcceptableScrollPosition;
        }

        // If scrolled more than previous columns, at least part of column will be offscreen to left
        // Scroll so column is flush with left edge of viewport
        if (scrollX > previousColumnsWidth) {
          scrollX = previousColumnsWidth;
        }
      }
    }

    var scrollContentWidth = _FixedDataTableWidthHelper2.default.getTotalWidth(columns);

    var horizontalScrollbarVisible = scrollContentWidth > adjustedWidth && props.overflowX !== 'hidden' && props.showScrollbarX !== false;

    if (horizontalScrollbarVisible) {
      bodyHeight -= _Scrollbar2.default.SIZE;
      totalHeightNeeded += _Scrollbar2.default.SIZE;
      totalHeightReserved += _Scrollbar2.default.SIZE;
      // If the horizontal scrollbar appears, the vertical scrollbar may now be needed
      // since the bottom row might be partially obscured by the horizontal scrollbar.
      // We also need to make sure we don't double-dip and adjust the width twice
      var notAdjusted = adjustedWidth === props.width;
      maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
      if (notAdjusted && maxScrollY) {
        adjustedWidth = adjustedWidth - _Scrollbar2.default.SIZE - 1;
      }
    }

    var maxScrollX = Math.max(0, scrollContentWidth - adjustedWidth);
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

    var cellGroupWrapperHeight = props.cellGroupWrapperHeight;

    // The order of elements in this object metters and bringing bodyHeight,
    // height or useGroupHeader to the top can break various features
    var newState = _extends({
      isColumnResizing: oldState && oldState.isColumnResizing
    }, columnInfo, props, {

      columns: columns,
      columnGroups: columnGroups,
      columnResizingData: columnResizingData,
      firstRowIndex: firstRowIndex,
      firstRowOffset: firstRowOffset,
      horizontalScrollbarVisible: horizontalScrollbarVisible,
      maxScrollX: maxScrollX,
      maxScrollY: maxScrollY,
      reservedHeight: totalHeightReserved,
      scrollContentHeight: scrollContentHeight,
      scrollX: scrollX,
      scrollY: scrollY,
      // These properties may overwrite properties defined in
      // columnInfo and props
      bodyHeight: bodyHeight,
      height: height,
      cellGroupWrapperHeight: cellGroupWrapperHeight,
      groupHeaderHeight: groupHeaderHeight,
      useGroupHeader: useGroupHeader
    });

    return newState;
  },
  _selectColumnElement: function _selectColumnElement( /*string*/type, /*array*/columns) /*array*/{
    var newColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      var column = columns[i];
      newColumns.push(_React2.default.cloneElement(column, {
        cell: type ? column.props[type] : column.props[CELL]
      }));
    }
    return newColumns;
  },
  _splitColumnTypes: function _splitColumnTypes( /*array*/columns) /*object*/{
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
      scrollable: scrollableColumns
    };
  },
  _onScroll: function _onScroll( /*number*/deltaX, /*number*/deltaY) {
    if (!this._isScrolling) {
      this._didScrollStart();
    }

    var newState = null;

    var x = this.state.scrollX;
    if (Math.abs(deltaY) > Math.abs(deltaX) && this.props.overflowY !== 'hidden') {
      var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
      var onVerticalScroll = this.props.onVerticalScroll;
      if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
        var maxScrollY = Math.max(0, scrollState.contentHeight - this.state.bodyHeight);
        newState = {
          firstRowIndex: scrollState.index,
          firstRowOffset: scrollState.offset,
          scrollY: scrollState.position,
          scrollContentHeight: scrollState.contentHeight,
          maxScrollY: maxScrollY
        };
      }
    } else if (deltaX && this.props.overflowX !== 'hidden') {
      x += deltaX;
      x = x < 0 ? 0 : x;
      x = x > this.state.maxScrollX ? this.state.maxScrollX : x;

      //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
      var onHorizontalScroll = this.props.onHorizontalScroll;
      if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
        newState = {
          scrollX: x
        };
      }
    }

    // call didScrollStop only after state has been updated
    if (this.props.fixOnScrollEnd) {
      this.setState(newState, this._didScrollStop);
      return;
    }

    if (newState !== null) {
      this.setState(newState);
    }
    this._didScrollStop();
  },
  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
    if (scrollPos === this.state.scrollX) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }
    var onHorizontalScroll = this.props.onHorizontalScroll;

    // call didScrollStop only after state has been updated
    if (this.props.fixOnScrollEnd) {
      if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
        this.setState({ scrollX: scrollPos }, this._didScrollStop);
      } else {
        this._didScrollStop();
      }
      return;
    }

    if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
      this.setState({
        scrollX: scrollPos
      });
    }
    this._didScrollStop();
  },
  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
    if (scrollPos === this.state.scrollY) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }
    var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));

    var onVerticalScroll = this.props.onVerticalScroll;

    // call didScrollStop only after state has been updated
    if (this.props.fixOnScrollEnd) {
      var onVerticalScroll = this.props.onVerticalScroll;
      if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
        this.setState({
          firstRowIndex: scrollState.index,
          firstRowOffset: scrollState.offset,
          scrollY: scrollState.position,
          scrollContentHeight: scrollState.contentHeight
        }, this._didScrollStop);
      } else {
        this._didScrollStop();
      }
      return;
    }

    if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
      this.setState({
        firstRowIndex: scrollState.index,
        firstRowOffset: scrollState.offset,
        scrollY: scrollState.position,
        scrollContentHeight: scrollState.contentHeight
      });
      this._didScrollStop();
    }
  },
  _didScrollStart: function _didScrollStart() {
    if (this._isScrolling) {
      return;
    }

    this._isScrolling = true;
    if (this.props.onScrollStart) {
      this.props.onScrollStart(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
    }
  },


  // We need two versions of this function, one to finish up synchronously (for
  // example, in componentWillUnmount), and a debounced version for normal
  // scroll handling.
  _didScrollStopSync: function _didScrollStopSync() {
    if (!this._isScrolling) {
      return;
    }

    this._isScrolling = false;
    this.setState({ redraw: true });
    if (this.props.onScrollEnd) {
      this.props.onScrollEnd(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
    }
  }
});

var HorizontalScrollbar = (0, _createReactClass2.default)({
  displayName: 'HorizontalScrollbar',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    contentSize: _propTypes2.default.number.isRequired,
    offset: _propTypes2.default.number.isRequired,
    onScroll: _propTypes2.default.func.isRequired,
    position: _propTypes2.default.number.isRequired,
    size: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  render: function render() /*object*/{
    var outerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      width: this.props.size
    };
    var innerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      position: 'absolute',
      overflow: 'hidden',
      width: this.props.size
    };
    (0, _FixedDataTableTranslateDOMPosition2.default)(innerContainerStyle, 0, this.props.offset, this._initialRender);

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/horizontalScrollbar'), (0, _cx2.default)('public/fixedDataTable/horizontalScrollbar')),
        style: outerContainerStyle },
      _React2.default.createElement(
        'div',
        { style: innerContainerStyle },
        _React2.default.createElement(_Scrollbar2.default, _extends({}, this.props, {
          isOpaque: true,
          orientation: 'horizontal',
          offset: undefined
        }))
      )
    );
  }
});

module.exports = FixedDataTable;