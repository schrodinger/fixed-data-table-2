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
 * @file Contains resizing logic
 */

import React from 'react';
import cx from '../../vendor_upstream/stubs/cx';
import FixedDataTableEventHelper from '../../FixedDataTableEventHelper';
import ResizerLine from './ResizerLine';
import clamp from '../../vendor_upstream/core/clamp';
import DOMMouseMoveTracker from '../../vendor_upstream/dom/DOMMouseMoveTracker';
import _ from 'lodash';
import PropTypes, { element } from 'prop-types';
import ResizerKnobFunction from '../../hoc_components/ResizerKnobFunction';
import ResizerKnobLegacyFunction from '../../hoc_components/ResizerKnobLegacyFunction';

class ResizerKnob extends React.PureComponent {
  initialState = {
    /**
     * @type {boolean} Set true when column resizing starts. It is used to make ResizerLine visible.
     */
    isColumnResizing: false,

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

  /**
   * Ref to ResizerKnob
   * @type {HTMLDivElement}
   */
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
      top: this.curRef.getBoundingClientRect().top,
    });
  }

  render() {
    const resizerLine = (
      <ResizerLine
        height={this.props.resizerLineHeight}
        visible={!!this.state.isColumnResizing}
        left={this.state.currentMouseXCoordinate}
        top={this.state.top}
      />
    );
    const ResizerKnobComponent = this.props.shouldUseLegacyComponents
      ? ResizerKnobLegacyFunction
      : ResizerKnobFunction;

    return (
      <ResizerKnobComponent
        {...this.props}
        settingRef={this.settingRef}
        onMouseDown={this.onMouseDown}
        suppressEvent={this.suppressEvent}
        resizerLine={resizerLine}
      />
    );
  }

  /**
   * Registers event listeners for mouse tracking
   * @param {MouseEvent} event
   */
  settingRef = (element) => {
    this.curRef = element;
  };
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
    const initialMouseXCoordinate =
      FixedDataTableEventHelper.getCoordinatesFromEvent(ev).x;
    this.setState({
      initialMouseXCoordinate,
      isColumnResizing: true,
      totalDisplacement: 0,
      currentMouseXCoordinate: initialMouseXCoordinate,
    });
  };

  onMouseUp = () => {
    const { minWidth, maxWidth } = this.getMinMaxWidth();
    const newWidth = clamp(
      this.props.width +
        this.state.totalDisplacement * (this.props.isRTL ? -1 : 1),
      minWidth,
      maxWidth
    );
    this.mouseMoveTracker.releaseMouseMoves();
    this.setState(
      {
        isColumnResizing: false,
        totalDisplacement: 0,
      },
      () => {
        this.props.onColumnResizeEnd(newWidth, this.props.columnKey);
      }
    );
  };

  /**
   *
   * @param {number} displacementX Displacement of mouse along x-direction
   */
  onMouseMove = (displacementX) => {
    const { isRTL, width } = this.props;
    const {
      initialMouseXCoordinate,
      totalDisplacement: previousTotalDisplacement,
    } = this.state;
    // displacementX is negative if movement is in left direction
    const newTotalDisplacement = previousTotalDisplacement + displacementX;
    let newResizerLineXCoordinate =
      initialMouseXCoordinate + newTotalDisplacement;
    const { minWidth, maxWidth } = this.getMinMaxWidth();

    const currentWidth = width + newTotalDisplacement * (isRTL ? -1 : 1);
    // Limit the resizer line to not move ahead or back of maxWidth and minWidth respectively
    if (currentWidth < minWidth || currentWidth > maxWidth) {
      // If new position is going out of bounds, instead of updating,  use the previous value
      newResizerLineXCoordinate = this.state.currentMouseXCoordinate;
    }
    this.setState({
      totalDisplacement: newTotalDisplacement,
      currentMouseXCoordinate: newResizerLineXCoordinate,
    });
  };

  /**
   * If minWidth and Width not given, mapping them to a valid range i.e. 0 to Number.MAX_SAFE_INTEGER
   * @returns {{minWidth: number, maxWidth: number}}
   */
  getMinMaxWidth = () => {
    return {
      minWidth: this.props.minWidth || 0,
      maxWidth: this.props.maxWidth || Number.MAX_SAFE_INTEGER,
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

ResizerKnob.propTypes = {
  /**
   * Optional prop that if specified on the `Column` will be passed to the
   * cell. It can be used to uniquely identify which column is the cell is in.
   */
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,

  /**
   * The minimum width of the column.
   */
  minWidth: PropTypes.number,

  /**
   * The maximum width of the column.
   */
  maxWidth: PropTypes.number,

  /**
   * Outer width of the cell.
   */
  width: PropTypes.number.isRequired,

  /**
   * Line of resizing line
   */
  resizerLineHeight: PropTypes.number.isRequired,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: PropTypes.bool,

  /**
   * True if FDT has right to left orientation
   */
  isRTL: PropTypes.bool,

  /**
   * Callback function which is called when reordering ends
   */
  onColumnResizeEnd: PropTypes.func.isRequired,

  /**
   * Outer height of the cell.
   */
  height: PropTypes.number.isRequired,
};

export default ResizerKnob;
