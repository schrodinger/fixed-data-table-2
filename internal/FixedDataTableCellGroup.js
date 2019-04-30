/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FixedDataTableHelper = require('./FixedDataTableHelper');

var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FixedDataTableCell = require('./FixedDataTableCell');

var _FixedDataTableCell2 = _interopRequireDefault(_FixedDataTableCell);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _FixedDataTableTranslateDOMPosition = require('./FixedDataTableTranslateDOMPosition');

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

var FixedDataTableCellGroupImpl = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableCellGroupImpl',

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {

    /**
     * Array of <FixedDataTableColumn />.
     */
    columns: _propTypes2.default.array.isRequired,

    isScrolling: _propTypes2.default.bool,

    left: _propTypes2.default.number,

    onColumnResize: _propTypes2.default.func,

    onColumnReorder: _propTypes2.default.func,
    onColumnReorderMove: _propTypes2.default.func,
    onColumnReorderEnd: _propTypes2.default.func,

    height: _propTypes2.default.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: _propTypes2.default.number,

    rowHeight: _propTypes2.default.number.isRequired,

    rowIndex: _propTypes2.default.number.isRequired,

    width: _propTypes2.default.number.isRequired,

    zIndex: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  render: function render() /*object*/{
    var props = this.props;
    var columns = props.columns;
    var cells = new Array(columns.length);

    var contentWidth = this._getColumnsWidth(columns);

    var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    var currentPosition = 0;
    for (var i = 0, j = columns.length; i < j; i++) {
      var columnProps = columns[i].props;
      var recycable = columnProps.allowCellsRecycling && !isColumnReordering;
      if (!recycable || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
        var key = columnProps.columnKey || 'cell_' + i;
        cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, currentPosition, key, contentWidth, isColumnReordering);
      }
      currentPosition += columnProps.width;
    }
    var style = {
      height: props.height,
      position: 'absolute',
      width: contentWidth,
      zIndex: props.zIndex
    };
    (0, _FixedDataTableTranslateDOMPosition2.default)(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

    return _React2.default.createElement(
      'div',
      {
        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroup'),
        style: style },
      cells
    );
  },
  _renderCell: function _renderCell(
  /*number*/rowIndex,
  /*number*/height,
  /*object*/columnProps,
  /*number*/left,
  /*string*/key,
  /*number*/columnGroupWidth,
  /*boolean*/isColumnReordering) /*object*/{

    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var cellIsReorderable = columnProps.isReorderable && this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

    var className = columnProps.cellClassName;
    var pureRendering = columnProps.pureRendering || false;

    return _React2.default.createElement(_FixedDataTableCell2.default, {
      isScrolling: this.props.isScrolling,
      align: columnProps.align,
      className: className,
      height: height,
      key: key,
      maxWidth: columnProps.maxWidth,
      minWidth: columnProps.minWidth,
      onColumnResize: onColumnResize,
      onColumnReorder: onColumnReorder,
      onColumnReorderMove: this.props.onColumnReorderMove,
      onColumnReorderEnd: this.props.onColumnReorderEnd,
      isColumnReordering: isColumnReordering,
      columnReorderingData: this.props.columnReorderingData,
      rowIndex: rowIndex,
      columnKey: columnProps.columnKey,
      width: columnProps.width,
      left: left,
      cell: columnProps.cell,
      columnGroupWidth: columnGroupWidth,
      pureRendering: pureRendering
    });
  },
  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
    var width = 0;
    for (var i = 0; i < columns.length; ++i) {
      width += columns[i].props.width;
    }
    return width;
  }
});

var FixedDataTableCellGroup = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableCellGroup',

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {
    isScrolling: _propTypes2.default.bool,
    /**
     * Height of the row.
     */
    height: _propTypes2.default.number.isRequired,

    offsetLeft: _propTypes2.default.number,

    left: _propTypes2.default.number,
    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: _propTypes2.default.number.isRequired
  },

  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
  },
  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      offsetLeft: 0
    };
  },
  render: function render() /*object*/{
    var _props = this.props,
        offsetLeft = _props.offsetLeft,
        props = _objectWithoutProperties(_props, ['offsetLeft']);

    var style = {
      height: props.cellGroupWrapperHeight || props.height,
      width: props.width
    };

    if (DIR_SIGN === 1) {
      style.left = offsetLeft;
    } else {
      style.right = offsetLeft;
    }

    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

    return _React2.default.createElement(
      'div',
      {
        style: style,
        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroupWrapper') },
      _React2.default.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
        onColumnResize: onColumnResize
      }))
    );
  },
  _onColumnResize: function _onColumnResize(
  /*number*/left,
  /*number*/width,
  /*?number*/minWidth,
  /*?number*/maxWidth,
  /*string|number*/columnKey,
  /*object*/event) {
    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, columnKey, event);
  }
});

module.exports = FixedDataTableCellGroup;