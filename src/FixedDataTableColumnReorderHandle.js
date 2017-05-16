/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a header icon
 * that allows you to reorder the corresponding column.
 *
 * @providesModule FixedDataTableColumnReorderHandle
 * @typechecks
 */

import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import Locale from 'Locale';
import React from 'React';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ReactComponentWithPureRenderMixin from 'ReactComponentWithPureRenderMixin';

import clamp from 'clamp';
import cx from 'cx';

var FixedDataTableColumnReorderHandle = createReactClass({
  displayName: 'FixedDataTableColumnReorderHandle',
  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {

    /**
     * When resizing is complete this is called.
     */
    onColumnReorderEnd: PropTypes.func,

    /**
     * Column key for the column being reordered.
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
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
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
    this.frameId = requestAnimationFrame(this._updateState);
  },

  _onMove(/*number*/ deltaX) {
    this._distance = this.state.dragDistance + deltaX;
  },

  _onColumnReorderEnd(/*boolean*/ cancelReorder) {
    this._animating = false;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.columnReorderingData.cancelReorder = cancelReorder;
    this.props.onColumnReorderEnd();
  },

  _updateState() {
    if (this._animating) {
      this.frameId = requestAnimationFrame(this._updateState)
    }
    this.setState({
      dragDistance: this._distance
    });
    this.props.onColumnReorderMove(this._distance);
  },
});

module.exports = FixedDataTableColumnReorderHandle;
