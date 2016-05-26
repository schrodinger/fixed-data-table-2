/**
 * Copyright (c) 2015, Facebook, Inc.
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
 * @providesModule FixedDataTableColumnResizeHandle.react
 * @typechecks
 */

var DOMMouseMoveTracker = require('DOMMouseMoveTracker');
var Locale = require('Locale');
var React = require('React');
var ReactComponentWithPureRenderMixin = require('ReactComponentWithPureRenderMixin');

var clamp = require('clamp');
var cx = require('cx');

var {PropTypes} = React;

var FixedDataTableColumnReorderHandle = React.createClass({
  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {

    /**
     * When resizing is complete this is called.
     */
    onColumnReorderEnd: PropTypes.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  },

  getInitialState() /*object*/ {
    return {
      dragDistance: 0
    };
  },

  componentWillReceiveProps(/*object*/ newProps) {
  },


  componentWillUnmount() {
    if (this._mouseMoveTracker) {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  },

  render() /*object*/ {
    var style = {
      height: this.props.height,
    };
    return (
      <div
        className={cx({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false,
        })}
        onMouseDown={this.onMouseDown}
        style={style}>
      </div>
    );
  },

  onMouseDown(event) {
    var targetRect = event.target.getBoundingClientRect();

    var mouseLocationInElement = event.clientX - targetRect.offsetLeft;
    var mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;

    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnReorderEnd,
      document.body
    );
    this._mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      dragDistance: 0
    });
    this.props.onMouseDown({
      columnKey: this.props.columnKey,
      mouseLocation: {
        dragDistance: 0,
        inElement: mouseLocationInElement,
        inColumnGroup: mouseLocationInRelationToColumnGroup
      }
    });

    this._distance = 0;
    this._animating = true;
    requestAnimationFrame(this._updateState);
  },

  _onMove(/*number*/ deltaX) {
    this._distance = this.state.dragDistance + deltaX;
  },

  _onColumnReorderEnd() {
    this._animating = false;
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.onColumnReorderEnd();
  },

  _updateState() {
    if (this._animating) {
      requestAnimationFrame(this._updateState)
    } 
    this.setState({
      dragDistance: this._distance
    });
    this.props.onColumnReorderMove(this._distance);
  }
});

module.exports = FixedDataTableColumnReorderHandle;
