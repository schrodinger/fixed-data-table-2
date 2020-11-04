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
import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import PropTypes from 'prop-types';


class ResizerKnob extends React.Component {

  initialState = {
    isColumnResizing: undefined,
    instance: undefined,
    mouseXCoordinate: 0,
    totalDisplacement: 0
  };

  state = { ...this.initialState };

  constructor(props) {
    super(props);
    this.trackMouse();
  }


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
        xCoordinate={this.state.resizerLineXCoordinate}
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
   * Registers event listeners for mouse tracking
   */
  trackMouse = () => {
    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this.onMouseMove,
      this.onMouseUp,
      document.body,
      this.props.touchEnabled
    );
  };

  /**
   * @param {MouseEvent} ev Mouse down event
   */
  onMouseDown = (ev) => {
    const initialMouseCoordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(ev);
    this._mouseMoveTracker.captureMouseMoves(ev);
    this.setState({
      initialMouseCoordinates,
      isColumnResizing: true,
      totalDisplacement: 0,
      resizerLineXCoordinate: initialMouseCoordinates.x
    });
  };

  onMouseUp = () => {
    const { minWidth, maxWidth } = this.getMinMaxWidth(this.props.minWidth, this.props.maxWidth);
    const newWidth = clamp(this.props.width + this.state.totalDisplacement, minWidth, maxWidth);
    this.props.onColumnResizeEnd(newWidth, this.props.columnKey);
    this._mouseMoveTracker.releaseMouseMoves();
    this.resetColumnResizing();
  };

  /**
   *
   * @param {number} displacementX Displacement of mouse along x-direction
   */
  onMouseMove = (displacementX) => {
    const { initialMouseCoordinates, totalDisplacement: previousTotalDisplacement } = this.state;
    // displacementX is negative if movement is in left direction
    const newTotalDisplacement = previousTotalDisplacement + displacementX;
    let resizerLineXCoordinate = initialMouseCoordinates.x + newTotalDisplacement;
    const { minWidth, maxWidth } = this.getMinMaxWidth(this.props.minWidth, this.props.maxWidth);
    // Limit the resizer line to not move ahead or back of maxWidth and minWidth respectively
    if (this.props.width + newTotalDisplacement < minWidth || this.props.width + newTotalDisplacement > maxWidth) {
      // If new position is going out of bounds, instead of updating,  use the previous value
      resizerLineXCoordinate = this.state.resizerLineXCoordinate;
    }
    this.setState({
      mouseXCoordinate: resizerLineXCoordinate,
      isColumnResizing: true,
      totalDisplacement: newTotalDisplacement,
      resizerLineXCoordinate
    });
  };

  /**
   * Set isColumnResizing to false to hide the ResizerLine and set displacement to 0
   */
  resetColumnResizing = () => {
    this.setState({
      isColumnResizing: false,
      totalDisplacement: 0
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
   * @param {Object} event
   */
  suppressEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

}

export default ResizerKnob;