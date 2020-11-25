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
import _ from 'lodash';


class ResizerKnob extends React.Component {

  initialState = {
    /**
     * @type {boolean} Set true when column resizing starts. It is used to make ResizerLine visible.
     */
    isColumnResizing: undefined,

    /**
     * @type {number} X coordinate of ResizerLine during resizing. It is passed do to ResizerLine to render at appropriate position.
     */
    currentMouseXCoordinate: 0,

    /**
     * @type {number} Total displacement of mouse calculated from initial position when resizing started
     */
    totalDisplacement: 0,

    /**
     * @type {number} Top position of ResizerKnow. It is passed to ResizerLine to render at appropriate position.
     */
    top: 0,
  };

  state = { ...this.initialState };

  // Ref to ResizerKnob
  curRef = null;

  /**
   *
   * @type {DOMMouseMoveTracker}
   */
  mouseMoveTracker = null;

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.setState({
      top: this.curRef.getBoundingClientRect().top
    });
  }

  render() {
    const resizerKnobStyle = {
      height: this.props.height
    };
    const resizerLine =
      <ResizerLine
        height={this.props.resizerLineHeight}
        visible={!!this.state.isColumnResizing}
        xCoordinate={this.state.currentMouseXCoordinate}
        top={this.state.top}
      />;

    return (
      <div
        className={cx('fixedDataTableCellLayout/columnResizerContainer')}
        ref={(element) => this.curRef = element}
        style={resizerKnobStyle}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.props.touchEnabled ? this.onMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? this.suppressEvent : null}
        onTouchMove={this.props.touchEnabled ? this.suppressEvent : null}>
        {resizerLine}
      </div>
    );
  }

  /**
   * Registers event listeners for mouse tracking
   * @param {MouseEvent} event
   */
  initializeDOMMouseMoveTracker = (event) => {
    this.mouseMoveTracker = new DOMMouseMoveTracker(
      this.onMouseMove,
      this.onMouseUp,
      document.body,
      this.props.touchEnabled
    );
    this.mouseMoveTracker.captureMouseMoves(event);
  };

  /**
   * @param {MouseEvent} ev Mouse down event
   */
  onMouseDown = (ev) => {
    this.initializeDOMMouseMoveTracker(ev);
    const initialMouseXCoordinate = FixedDataTableEventHelper.getCoordinatesFromEvent(ev).x;
    this.setState({
      initialMouseXCoordinate,
      isColumnResizing: true,
      totalDisplacement: 0,
      currentMouseXCoordinate: initialMouseXCoordinate
    });
  };

  onMouseUp = () => {
    const { minWidth, maxWidth } = this.getMinMaxWidth();
    const newWidth = clamp(this.props.width + (this.state.totalDisplacement * (this.props.isRTL ? -1 : 1)), minWidth, maxWidth);
    this.mouseMoveTracker.releaseMouseMoves();
    this.resetColumnResizing(() => this.props.onColumnResizeEnd(newWidth, this.props.columnKey));
  };

  /**
   *
   * @param {number} displacementX Displacement of mouse along x-direction
   */
  onMouseMove = (displacementX) => {
    const { initialMouseXCoordinate, totalDisplacement: previousTotalDisplacement } = this.state;
    // displacementX is negative if movement is in left direction
    const newTotalDisplacement = previousTotalDisplacement + displacementX;
    let newResizerLineXCoordinate = initialMouseXCoordinate + newTotalDisplacement;
    const { minWidth, maxWidth } = this.getMinMaxWidth();
    // Limit the resizer line to not move ahead or back of maxWidth and minWidth respectively
    if (this.props.width + newTotalDisplacement < minWidth || this.props.width + newTotalDisplacement > maxWidth) {
      // If new position is going out of bounds, instead of updating,  use the previous value
      newResizerLineXCoordinate = this.state.currentMouseXCoordinate;
    }
    this.setState({
      totalDisplacement: newTotalDisplacement,
      currentMouseXCoordinate: newResizerLineXCoordinate
    });
  };

  /**
   * Set isColumnResizing to false to hide the ResizerLine and set displacement to 0
   * @param {Function} callback Called after resetting state
   */
  resetColumnResizing = (callback) => {
    this.setState({
      isColumnResizing: false,
      totalDisplacement: 0
    }, () => {
      if (_.isFunction(callback)) {
        callback();
      }
    });
  };

  /**
   * If minWidth and Width not given, mapping them to a valid range i.e. 0 to Number.MAX_SAFE_INTEGER
   * @returns {{minWidth: number, maxWidth: number}}
   */
  getMinMaxWidth = () => {
    return {
      minWidth: this.props.minWidth || 0,
      maxWidth: this.props.maxWidth || Number.MAX_SAFE_INTEGER
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