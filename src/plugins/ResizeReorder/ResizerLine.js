/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the ResizerKnob. It is a read line
 * that when you click on a column that is resizable appears and allows
 * you to resize the corresponding column.
 * @providesModule ResizerLine
 * @typechecks
 */

import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import clamp from 'clamp';
import cx from 'cx';

class ResizerLine extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: PropTypes.number.isRequired,

    /**
     * Offset from left border of the table, please note
     * that the line is a border on diff. So this is really the
     * offset of the column itself.
     */
    leftOffset: PropTypes.number.isRequired,

    /**
     * Height of the clickable region of the line.
     * This is assumed to be at the top of the line.
     */
    knobHeight: PropTypes.number.isRequired,

    /**
     * The line is a border on a diff, so this is essentially
     * the width of column.
     */
    initialWidth: PropTypes.number,

    /**
     * The minimum width this dragger will collapse to
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width this dragger will collapse to
     */
    maxWidth: PropTypes.number,

    /**
     * Initial click event on the header cell.
     */
    initialEvent: PropTypes.object,

    /**
     * When resizing is complete this is called.
     */
    onColumnResizeEnd: PropTypes.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Whether the resize handle should respond to touch events or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * Whether the line should render in RTL mode
     */
    isRTL: PropTypes.bool,

    /**
     * The ResizerKnob DOM object instance.
     */
    instance: PropTypes.object,

    /**
     * The minimum width of the column.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the column.
     */
    maxWidth: PropTypes.number,
  }

  state = /*object*/ {
    width: 0,
    cursorDelta: 0,
  }

  /**
   * TODO (sharma-rishi): Migrate instanceDetails to state.
   * Currently, a mutable object is used.
   * MouseTracker keeps changing state.cursorDelta even after mouse release.
   * This could be causing the unwanted repositioning of the resizerLine when
   * using this.setState with instanceDetails inside the state.
   */
  instanceDetails = {
    left: 0,
    top: 0,
    knobWidth: 0,
  }

  componentDidUpdate() {
    if (this.props.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(this.props.initialEvent);
      this.setState({
        width: this.props.initialWidth,
        cursorDelta: this.props.initialWidth,
      });
    }
  }

  componentDidMount() {
    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnResizeEnd,
      document.body,
      this.props.touchEnabled
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.instance){
      this.instanceDetails.top = nextProps.instance.getBoundingClientRect().top;
      this.instanceDetails.left = nextProps.instance.getBoundingClientRect().left;
      this.instanceDetails.knobWidth = nextProps.instance.getBoundingClientRect().width;
    }
  }

  componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  }

  render() /*object*/ {
    var style = {
      width: 1,
      height: this.props.height,
      top: this.instanceDetails.top,
      position: 'fixed',
    };
    if (this.props.isRTL) {
      style.left = this.instanceDetails.left - this.state.width + this.props.initialWidth;
    } else {
       style.left = this.instanceDetails.knobWidth + this.instanceDetails.left + this.state.width - this.props.initialWidth;
    }
    return (
      <Portal>
        <div
          className={cx({
            'fixedDataTableColumnResizerLineLayout/main': true,
            'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
            'public/fixedDataTableColumnResizerLine/main': true,
          })}
          style={style}>
          <div
            className={cx('fixedDataTableColumnResizerLineLayout/mouseArea')}
            style={{ height: this.props.height }}
          />
        </div>
      </Portal>
    );
  }

  _onMove = (/*number*/ deltaX) => {
    this.instanceDetails.top = this.props.instance.getBoundingClientRect().top;
    this.instanceDetails.left = this.props.instance.getBoundingClientRect().left;
    if (this.props.isRTL) {
      deltaX = -deltaX;
    }
    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth =
      clamp(newWidth, this.props.minWidth, this.props.maxWidth);

    // Please note cursor delta is the different between the currently width
    // and the new width.
    this.setState({
      width: newColumnWidth,
      cursorDelta: newWidth
    });
  }

  _onColumnResizeEnd = () => {
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.onColumnResizeEnd(
      this.state.width,
      this.props.columnKey
    );
    this.props.clearState();
  }
}
export default ResizerLine;
