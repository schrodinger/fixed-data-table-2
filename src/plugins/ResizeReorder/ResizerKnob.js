/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResizerKnob
 * @typechecks
 */

import React from 'react';
import cx from 'cx';
import joinClasses from 'joinClasses';
import FixedDataTableEventHelper from 'FixedDataTableEventHelper';
import ResizerLine from 'ResizerLine';
import clamp from 'clamp';


class ResizerKnob extends React.Component {
  initialState = {
    isColumnResizing: undefined,
    instance: undefined,
    mouseXCoordinate: 0
  };

  state = { ...this.initialState };

  componentDidMount() {
    this.setState({
      instance: this.curRef
    });
  }

  render() {
    const dragKnob =
      <ResizerLine
        height={this.props.resizerLineHeight}
        visible={!!this.state.isColumnResizing}
        instance={this.state.instance}
        xCoordinate={this.state.mouseXCoordinate}
      />;

    return (
      <div
        className={cx('fixedDataTableCellLayout/columnResizerContainer')}
        ref={(element) => this.curRef = element}
        style={this.props.columnResizerStyle}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.props.touchEnabled ? this.onMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? this.suppressEvent : null}
        onTouchMove={this.props.touchEnabled ? this.suppressEvent : null}>
        {dragKnob}
        <div
          className={joinClasses(
            cx('fixedDataTableCellLayout/columnResizerKnob'),
            cx('public/fixedDataTableCell/columnResizerKnob'),
          )}
          style={this.props.columnResizerStyle}
        />
      </div>
    );
  }

  /**
   *
   * @param {MouseEvent} ev                    Mouse down event
   */
  onMouseDown = (ev) => {
    const initialMouseCoordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(ev);
    document.body.onmousemove = (ev) => this.onMouseMove(ev, initialMouseCoordinates);
    document.body.onmouseup = (ev) => this.onMouseUp(ev, initialMouseCoordinates);
    this.disableTextSelection();
  };

  /**
   *
   * @param {MouseEvent} ev                     Mouse up event
   * @param {Object} initialMouseCoordinates    Initial mouse coordinates
   * @param {number} initialMouseCoordinates.x  Initial mouse X coordinate
   * @param {number} initialMouseCoordinates.y  Initial mouse Y coordinate
   */
  onMouseUp = (ev, initialMouseCoordinates) => {
    this.removeMouseEventListeners();
    this.enableTextSelection();

    const currentMouseCoordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(ev);
    const displacement = currentMouseCoordinates.x - initialMouseCoordinates.x;

    // let minWidth = 0, maxWidth = Number.MAX_SAFE_INTEGER;
    // if (this.props.minWidth)
    //   minWidth = Math.max(minWidth, this.props.minWidth)
    // if (this.props.maxWidth)
    //   maxWidth = Math.min(maxWidth, this.props.maxWidth)
    const { minWidth, maxWidth } = this.getMinMaxWidth(this.props.minWidth, this.props.maxWidth);

    const newWidth = clamp(this.props.width + displacement, minWidth, maxWidth);
    this.props.onColumnResizeEnd(newWidth, this.props.columnKey);
    this.resetColumnResizing();
  };

  /**
   *
   * @param {MouseEvent} ev                     Mouse move event
   * @param {Object} initialMouseCoordinates    Initial mouse coordinates when mouseDown event happened
   * @param {number} initialMouseCoordinates.x  Initial mouse X coordinate
   * @param {number} initialMouseCoordinates.y  Initial mouse Y coordinate
   */
  onMouseMove = (ev, initialMouseCoordinates) => {
    const mouseXCoordinate = ev.clientX;
    // If negative, means displacement is in left direction
    const displacement = mouseXCoordinate - initialMouseCoordinates.x;
    let resizerLineXCoordinate = mouseXCoordinate;
    const { minWidth, maxWidth } = this.getMinMaxWidth(this.props.minWidth, this.props.maxWidth);
    // Limit the resizer line to not move ahead or back of maxWidth and minWidth respectively
    if (this.props.width + displacement < minWidth || this.props.width + displacement > maxWidth) {
      // If new position is going out of bounds, instead of updating,  use the previous value
      resizerLineXCoordinate = this.state.mouseXCoordinate;
    }
    this.setState({
      mouseXCoordinate: resizerLineXCoordinate,
      isColumnResizing: true,
    });
  };

  /**
   * While resizing disable text selection
   */
  disableTextSelection = () => {
    document.body.addEventListener('selectstart', this.suppressEvent);
  };

  /**
   * When resizing done, enable text selection
   */
  enableTextSelection = () => {
    document.body.removeEventListener('selectstart', this.suppressEvent);
  };

  /**
   * Set isColumnResizing to false to hide the ResizerLine and set displacement to 0
   */
  resetColumnResizing = () => {
    this.setState({
      isColumnResizing: false,
      displacement: 0
    });
  };

  /**
   * If minWidth and Width not given, mapping them to a valid range i.e. 0 to Number.MAX_SAFE_INTEGER
   * @param {number | undefined} minWidth   min width of column
   * @param {number | undefined} maxWidth   max width of column
   * @returns {{minWidth: number, maxWidth: number}}
   */
  getMinMaxWidth = (minWidth, maxWidth) => {
    let newMinWidth = 0, newMaxWidth = Number.MAX_SAFE_INTEGER;
    if (minWidth)
      newMinWidth = Math.max(minWidth, newMinWidth);
    if (maxWidth)
      newMaxWidth = Math.min(maxWidth, newMaxWidth);
    return {
      minWidth: newMinWidth,
      maxWidth: newMaxWidth
    };
  };

  /**
   * Remove event listeners after mouseup event
   */
  removeMouseEventListeners = () => {
    document.body.onmousemove = () => {
    };
    document.body.onmouseup = () => {
    };
  };

  /**
   * @param {Object} event
   * @private
   */
  suppressEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

}

export default ResizerKnob;