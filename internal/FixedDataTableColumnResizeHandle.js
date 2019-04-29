'use strict';

var _DOMMouseMoveTracker = require('./DOMMouseMoveTracker');

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Locale = require('./Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a read line
 * that when you click on a column that is resizable appears and allows
 * you to resize the corresponding column.
 *
 * @providesModule FixedDataTableColumnResizeHandle
 * @typechecks
 */

var FixedDataTableColumnResizeHandle = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableColumnResizeHandle',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    visible: _propTypes2.default.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: _propTypes2.default.number.isRequired,

    /**
     * Offset from left border of the table, please note
     * that the line is a border on diff. So this is really the
     * offset of the column itself.
     */
    leftOffset: _propTypes2.default.number.isRequired,

    /**
     * Height of the clickable region of the line.
     * This is assumed to be at the top of the line.
     */
    knobHeight: _propTypes2.default.number.isRequired,

    /**
     * The line is a border on a diff, so this is essentially
     * the width of column.
     */
    initialWidth: _propTypes2.default.number,

    /**
     * The minimum width this dragger will collapse to
     */
    minWidth: _propTypes2.default.number,

    /**
     * The maximum width this dragger will collapse to
     */
    maxWidth: _propTypes2.default.number,

    /**
     * Initial click event on the header cell.
     */
    initialEvent: _propTypes2.default.object,

    /**
     * When resizing is complete this is called.
     */
    onColumnResizeEnd: _propTypes2.default.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  },

  getInitialState: function getInitialState() /*object*/{
    return {
      width: 0,
      cursorDelta: 0
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
      this.setState({
        width: newProps.initialWidth,
        cursorDelta: newProps.initialWidth
      });
    }
  },
  componentDidMount: function componentDidMount() {
    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnResizeEnd, document.body);
  },
  componentWillUnmount: function componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  },
  render: function render() /*object*/{
    var style = {
      width: this.state.width,
      height: this.props.height
    };
    if (_Locale2.default.isRTL()) {
      style.right = this.props.leftOffset;
    } else {
      style.left = this.props.leftOffset;
    }
    return _React2.default.createElement(
      'div',
      {
        className: (0, _cx2.default)({
          'fixedDataTableColumnResizerLineLayout/main': true,
          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
          'public/fixedDataTableColumnResizerLine/main': true
        }),
        style: style },
      _React2.default.createElement('div', {
        className: (0, _cx2.default)('fixedDataTableColumnResizerLineLayout/mouseArea'),
        style: { height: this.props.height }
      })
    );
  },
  _onMove: function _onMove( /*number*/deltaX) {
    if (_Locale2.default.isRTL()) {
      deltaX = -deltaX;
    }
    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth = (0, _clamp2.default)(newWidth, this.props.minWidth, this.props.maxWidth);

    // Please note cursor delta is the different between the currently width
    // and the new width.
    this.setState({
      width: newColumnWidth,
      cursorDelta: newWidth
    });
  },
  _onColumnResizeEnd: function _onColumnResizeEnd() {
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
  }
});

module.exports = FixedDataTableColumnResizeHandle;