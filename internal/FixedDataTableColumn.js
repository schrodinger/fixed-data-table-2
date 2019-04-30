'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Component that defines the attributes of table column.
 */
var FixedDataTableColumn = function (_React$Component) {
  _inherits(FixedDataTableColumn, _React$Component);

  function FixedDataTableColumn() {
    _classCallCheck(this, FixedDataTableColumn);

    return _possibleConstructorReturn(this, (FixedDataTableColumn.__proto__ || Object.getPrototypeOf(FixedDataTableColumn)).apply(this, arguments));
  }

  _createClass(FixedDataTableColumn, [{
    key: 'render',
    value: function render() {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Component <FixedDataTableColumn /> should never render');
      }
      return null;
    }
  }]);

  return FixedDataTableColumn;
}(_React2.default.Component);

FixedDataTableColumn.__TableColumn__ = true;
FixedDataTableColumn.propTypes = {
  /**
   * The horizontal alignment of the table cell content.
   */
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * Controls if the column is fixed when scrolling in the X axis.
   */
  fixed: _propTypes2.default.bool,

  /**
   * The header cell for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is the body cell that will be cloned for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   rowIndex; number // (the row index of the cell)
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  cell: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is the footer cell for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  footer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is used to uniquely identify the column, and is not required unless
   * you a resizing columns. This will be the key given in the
   * `onColumnResizeEndCallback` on the Table.
   */
  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * The pixel width of the column.
   */
  width: _propTypes2.default.number.isRequired,

  /**
   * If this is a resizable column this is its minimum pixel width.
   */
  minWidth: _propTypes2.default.number,

  /**
   * If this is a resizable column this is its maximum pixel width.
   */
  maxWidth: _propTypes2.default.number,

  /**
   * The grow factor relative to other columns. Same as the flex-grow API
   * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
   * extra width and distribute it proportionally according to all columns'
   * flexGrow values. Defaults to zero (no-flexing).
   */
  flexGrow: _propTypes2.default.number,

  /**
   * Whether the column can be resized with the
   * FixedDataTableColumnResizeHandle. Please note that if a column
   * has a flex grow, once you resize the column this will be set to 0.
   *
   * This property only provides the UI for the column resizing. If this
   * is set to true, you will need to set the onColumnResizeEndCallback table
   * property and render your columns appropriately.
   */
  isResizable: _propTypes2.default.bool,

  /**
   * Whether the column can be dragged to reorder.
   */
  isReorderable: _propTypes2.default.bool,

  /**
   * Whether cells in this column can be removed from document when outside
   * of viewport as a result of horizontal scrolling.
   * Setting this property to true allows the table to not render cells in
   * particular column that are outside of viewport for visible rows. This
   * allows to create table with many columns and not have vertical scrolling
   * performance drop.
   * Setting the property to false will keep previous behaviour and keep
   * cell rendered if the row it belongs to is visible.
   */
  allowCellsRecycling: _propTypes2.default.bool,

  /**
   * Flag to enable performance check when rendering. Stops the component from
   * rendering if none of it's passed in props have changed
   */
  pureRendering: _propTypes2.default.bool
};
FixedDataTableColumn.defaultProps = {
  allowCellsRecycling: false,
  fixed: false
};


module.exports = FixedDataTableColumn;