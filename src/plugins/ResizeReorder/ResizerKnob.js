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
import emptyFunction from 'emptyFunction';



class ResizerKnob extends React.Component {
  initialState = {
    isColumnResizing: undefined,
    left: 0,
    width: 0,
    minWidth: 0,
    maxWidth: Number.MAX_VALUE,
    initialEvent: undefined,
    key: undefined
  };

  state = {...this.initialState};

  clearState = () => {
    this.setState(
      this.initialState
    );
  }

  componentDidMount(){
    this.setState({
      instance: this.curRef
    });
  }

  render() {
    const dragKnob =
    <ResizerLine
      height={this.props.resizerLineHeight}
      initialWidth={this.state.width}
      minWidth={this.state.minWidth}
      maxWidth={this.state.maxWidth}
      visible={!!this.state.isColumnResizing}
      leftOffset={this.state.left}
      knobHeight={this.props.columnResizerStyle.height}
      initialEvent={this.state.initialEvent}
      onColumnResizeEnd={this.props.onColumnResizeEnd}
      columnKey={this.state.key}
      touchEnabled={this.props.touchScrollEnabled}
      clearState={this.clearState}
      isRTL={this.props.isRTL}
      instance={this.state.instance}
    />;

    return(
      <div
        className={cx('fixedDataTableCellLayout/columnResizerContainer')}
        ref={(element) => this.curRef=element}
        style={this.props.columnResizerStyle}
        onMouseDown={this._onColumnResizerMouseDown}
        onTouchStart={this.props.touchEnabled ? this._onColumnResizerMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? this._suppressEvent : null}
        onTouchMove={this.props.touchEnabled ? this._suppressEvent : null}> 
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

  _onColumnResizerMouseDown = (/*object*/ event) => {;
    this.onColumnResize(
      this.props.offsetLeft,
      this.props.cellGroupLeft - this.props.left + this.props.width,
      this.props.width,
      this.props.minWidth,
      this.props.maxWidth,
      this.props.columnKey,
      event
    );

    /**
     * This prevents the rows from moving around when we resize the
     * headers on touch devices.
     */
    if (this.props.touchEnabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onColumnResize = (
    /*number*/ combinedWidth,
    /*number*/ leftOffset,
    /*number*/ cellWidth,
    /*?number*/ cellMinWidth,
    /*?number*/ cellMaxWidth,
    /*number|string*/ columnKey,
    /*object*/ event
    ) => {
      const coordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(event);
      const clientX = coordinates.x;
      const clientY = coordinates.y;
      this.setState ({
        isColumnResizing: true,
        left: leftOffset + combinedWidth - cellWidth,
        width: cellWidth,
        minWidth: cellMinWidth,
        maxWidth: cellMaxWidth,
        initialEvent: {
          clientX: clientX,
          clientY: clientY,
          preventDefault: emptyFunction
        },
        key: columnKey
      });
    }

  _suppressEvent = (/*object*/ event) => {
    event.preventDefault();
    event.stopPropagation();
  }

};

export default ResizerKnob;