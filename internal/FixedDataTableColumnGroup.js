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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumnGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Component that defines the attributes of a table column group.
 */
var FixedDataTableColumnGroup = function (_React$Component) {
  _inherits(FixedDataTableColumnGroup, _React$Component);

  function FixedDataTableColumnGroup() {
    _classCallCheck(this, FixedDataTableColumnGroup);

    return _possibleConstructorReturn(this, (FixedDataTableColumnGroup.__proto__ || Object.getPrototypeOf(FixedDataTableColumnGroup)).apply(this, arguments));
  }

  _createClass(FixedDataTableColumnGroup, [{
    key: 'render',
    value: function render() {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Component <FixedDataTableColumnGroup /> should never render');
      }
      return null;
    }
  }]);

  return FixedDataTableColumnGroup;
}(_React2.default.Component);

FixedDataTableColumnGroup.__TableColumnGroup__ = true;
FixedDataTableColumnGroup.propTypes = {
  /**
   * The horizontal alignment of the table cell content.
   */
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * Controls if the column group is fixed when scrolling in the X axis.
   */
  fixed: _propTypes2.default.bool,

  /**
   * This is the header cell for this column group.
   * This can either be a string or a React element. Passing in a string
   * will render a default footer cell with that string. By default, the React
   * element passed in can expect to receive the following props:
   *
   * ```
   * props: {
   *   height: number // (supplied from the groupHeaderHeight)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * You can also pass in a function that returns a react elemnt, with the
   * props object above passed in as the first parameter.
   */
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])

};
FixedDataTableColumnGroup.defaultProps = {
  fixed: false
};


module.exports = FixedDataTableColumnGroup;