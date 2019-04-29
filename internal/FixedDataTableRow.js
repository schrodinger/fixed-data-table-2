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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FixedDataTableCellGroup = require('./FixedDataTableCellGroup');

var _FixedDataTableCellGroup2 = _interopRequireDefault(_FixedDataTableCellGroup);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _joinClasses = require('./joinClasses');

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _FixedDataTableTranslateDOMPosition = require('./FixedDataTableTranslateDOMPosition');

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// .fixedDataTableLayout/header border-bottom-width
var HEADER_BORDER_BOTTOM_WIDTH = 1;

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */

var FixedDataTableRowImpl = function (_React$Component) {
  _inherits(FixedDataTableRowImpl, _React$Component);

  function FixedDataTableRowImpl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableRowImpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableRowImpl.__proto__ || Object.getPrototypeOf(FixedDataTableRowImpl)).call.apply(_ref, [this].concat(args))), _this), _this._getColumnsWidth = function ( /*array*/columns) /*number*/{
      var width = 0;
      for (var i = 0; i < columns.length; ++i) {
        width += columns[i].props.width;
      }
      return width;
    }, _this._getRowExpanded = function ( /*number*/subRowHeight) /*?object*/{
      if (_this.props.rowExpanded) {
        var rowExpandedProps = {
          rowIndex: _this.props.index,
          height: subRowHeight,
          width: _this.props.width
        };

        var rowExpanded;
        if (_React2.default.isValidElement(_this.props.rowExpanded)) {
          rowExpanded = _React2.default.cloneElement(_this.props.rowExpanded, rowExpandedProps);
        } else if (typeof _this.props.rowExpanded === 'function') {
          rowExpanded = _this.props.rowExpanded(rowExpandedProps);
        }

        return rowExpanded;
      }
    }, _this._renderColumnsLeftShadow = function ( /*number*/left) /*?object*/{
      var className = (0, _cx2.default)({
        'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
        'fixedDataTableRowLayout/columnsShadow': _this.props.scrollLeft > 0,
        'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
        'public/fixedDataTableRow/columnsShadow': _this.props.scrollLeft > 0
      });
      var dividerHeight = _this.props.cellGroupWrapperHeight ? _this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH : _this.props.height;
      var style = {
        left: left,
        height: dividerHeight
      };
      return _React2.default.createElement('div', { className: className, style: style });
    }, _this._renderColumnsRightShadow = function ( /*number*/totalWidth) /*?object*/{
      if (Math.ceil(_this.props.scrollLeft + _this.props.width) < Math.floor(totalWidth)) {
        var className = (0, _cx2.default)('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow');
        var style = {
          height: _this.props.height
        };
        return _React2.default.createElement('div', { className: className, style: style });
      }
    }, _this._onClick = function ( /*object*/event) {
      _this.props.onClick(event, _this.props.index);
    }, _this._onDoubleClick = function ( /*object*/event) {
      _this.props.onDoubleClick(event, _this.props.index);
    }, _this._onMouseUp = function ( /*object*/event) {
      _this.props.onMouseUp(event, _this.props.index);
    }, _this._onMouseDown = function ( /*object*/event) {
      _this.props.onMouseDown(event, _this.props.index);
    }, _this._onMouseEnter = function ( /*object*/event) {
      _this.props.onMouseEnter(event, _this.props.index);
    }, _this._onMouseLeave = function ( /*object*/event) {
      _this.props.onMouseLeave(event, _this.props.index);
    }, _this._onTouchStart = function ( /*object*/event) {
      _this.props.onTouchStart(event, _this.props.index);
    }, _this._onTouchEnd = function ( /*object*/event) {
      _this.props.onTouchEnd(event, _this.props.index);
    }, _this._onTouchMove = function ( /*object*/event) {
      _this.props.onTouchMove(event, _this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FixedDataTableRowImpl, [{
    key: 'render',
    value: function render() /*object*/{
      var subRowHeight = this.props.subRowHeight || 0;
      var style = {
        width: this.props.width,
        height: this.props.height + subRowHeight
      };
      var className = (0, _cx2.default)({
        'fixedDataTableRowLayout/main': true,
        'public/fixedDataTableRow/main': true,
        'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
        'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
        'public/fixedDataTableRow/even': this.props.index % 2 === 0
      });
      var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
      var fixedColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
        key: 'fixed_cells',
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
        left: 0,
        width: fixedColumnsWidth,
        zIndex: 2,
        columns: this.props.fixedColumns,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index
      });
      var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
      var scrollableColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
        key: 'scrollable_cells',
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
        left: this.props.scrollLeft,
        offsetLeft: fixedColumnsWidth,
        width: this.props.width - fixedColumnsWidth,
        zIndex: 0,
        columns: this.props.scrollableColumns,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index
      });
      var scrollableColumnsWidth = this._getColumnsWidth(this.props.scrollableColumns);
      var columnsRightShadow = this._renderColumnsRightShadow(fixedColumnsWidth + scrollableColumnsWidth);
      var rowExpanded = this._getRowExpanded(subRowHeight);
      var rowExpandedStyle = {
        height: subRowHeight,
        top: this.props.height,
        width: this.props.width
      };

      return _React2.default.createElement(
        'div',
        {
          className: (0, _joinClasses2.default)(className, this.props.className),
          onClick: this.props.onClick ? this._onClick : null,
          onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
          onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
          onMouseUp: this.props.onMouseUp ? this._onMouseUp : null,
          onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
          onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
          onTouchStart: this.props.onTouchStart ? this._onTouchStart : null,
          onTouchEnd: this.props.onTouchEnd ? this._onTouchEnd : null,
          onTouchMove: this.props.onTouchMove ? this._onTouchMove : null,
          style: style },
        _React2.default.createElement(
          'div',
          { className: (0, _cx2.default)('fixedDataTableRowLayout/body') },
          fixedColumns,
          scrollableColumns,
          columnsLeftShadow
        ),
        rowExpanded && _React2.default.createElement(
          'div',
          {
            className: (0, _cx2.default)('fixedDataTableRowLayout/rowExpanded'),
            style: rowExpandedStyle },
          rowExpanded
        ),
        columnsRightShadow
      );
    }
  }]);

  return FixedDataTableRowImpl;
}(_React2.default.Component);

FixedDataTableRowImpl.propTypes = {

  isScrolling: _propTypes2.default.bool,

  /**
   * Array of <FixedDataTableColumn /> for the fixed columns.
   */
  fixedColumns: _propTypes2.default.array.isRequired,

  /**
   * Height of the row.
   */
  height: _propTypes2.default.number.isRequired,

  /**
   * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
   */
  cellGroupWrapperHeight: _propTypes2.default.number,

  /**
   * Height of the content to be displayed below the row.
   */
  subRowHeight: _propTypes2.default.number,

  /**
   * the row expanded.
   */
  rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

  /**
   * The row index.
   */
  index: _propTypes2.default.number.isRequired,

  /**
   * Array of <FixedDataTableColumn /> for the scrollable columns.
   */
  scrollableColumns: _propTypes2.default.array.isRequired,

  /**
   * The distance between the left edge of the table and the leftmost portion
   * of the row currently visible in the table.
   */
  scrollLeft: _propTypes2.default.number.isRequired,

  /**
   * Width of the row.
   */
  width: _propTypes2.default.number.isRequired,

  /**
   * Fire when a row is clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * Fire when a row is double clicked.
   */
  onDoubleClick: _propTypes2.default.func,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number leftOffset
   * @param number cellWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize: _propTypes2.default.func,

  isColumnReordering: _propTypes2.default.bool,
  /**
   * Callback for when reorder handle (in FixedDataTableCell) is clicked
   * to initialize reordering. Please note this is only on the cells
   * in the header.
   * @param number|string columnKey
   * @param number cellWidth
   * @param number leftOffset
   * @param object event
   */
  onColumnReorder: _propTypes2.default.func,

  /**
   * Callback for when a cell is moved while reordering.
   * @param number distance
   */
  onColumnReorderMove: _propTypes2.default.func,

  /**
   * Callback for when the mouse is released to complete reordering.
   * @param number distance
   */
  onColumnReorderEnd: _propTypes2.default.func
};

var FixedDataTableRow = function (_React$Component2) {
  _inherits(FixedDataTableRow, _React$Component2);

  function FixedDataTableRow() {
    _classCallCheck(this, FixedDataTableRow);

    return _possibleConstructorReturn(this, (FixedDataTableRow.__proto__ || Object.getPrototypeOf(FixedDataTableRow)).apply(this, arguments));
  }

  _createClass(FixedDataTableRow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._initialRender = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var style = {
        width: this.props.width,
        height: this.props.height,
        zIndex: this.props.zIndex ? this.props.zIndex : 0
      };
      (0, _FixedDataTableTranslateDOMPosition2.default)(style, 0, this.props.offsetTop, this._initialRender);

      return _React2.default.createElement(
        'div',
        {
          style: style,
          className: (0, _cx2.default)('fixedDataTableRowLayout/rowWrapper') },
        _React2.default.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
          offsetTop: undefined,
          zIndex: undefined
        }))
      );
    }
  }]);

  return FixedDataTableRow;
}(_React2.default.Component);

FixedDataTableRow.propTypes = {

  isScrolling: _propTypes2.default.bool,

  /**
   * Height of the row.
   */
  height: _propTypes2.default.number.isRequired,

  /**
   * Z-index on which the row will be displayed. Used e.g. for keeping
   * header and footer in front of other rows.
   */
  zIndex: _propTypes2.default.number,

  /**
   * The vertical position where the row should render itself
   */
  offsetTop: _propTypes2.default.number.isRequired,

  /**
   * Width of the row.
   */
  width: _propTypes2.default.number.isRequired
};


module.exports = FixedDataTableRow;