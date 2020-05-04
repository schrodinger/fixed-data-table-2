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
 * @providesModule ColumnResizerLine
 * @typechecks
 */

import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import clamp from 'clamp';
import cx from 'cx';

class CustomResizerLine extends React.PureComponent {
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
  }

  state = /*object*/ {
    width: 0,
    cursorDelta: 0,
    left: 0,
    top: 0
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

  componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  }

  render() /*object*/ {
    var style = {
      width: 1,
      height: this.props.height,
      top: this.state.top
    };
    if (this.props.isRTL) {
      style.right = this.props.leftOffset;
    } else {
       style.left = this.state.left + this.state.width - this.props.initialWidth;
    }
    return (
      <Portal>
        <div
          id="rishi"
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
    // console.log(this.props.instance.getBoundingClientRect());
    this.state.top = this.props.instance.getBoundingClientRect().top;
    this.state.left = this.props.instance.getBoundingClientRect().left;
    console.log(this.state.left);
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
export default CustomResizerLine;
