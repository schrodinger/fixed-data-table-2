/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReorderHandle
 * @typechecks
 */

import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'cx';
import FixedDataTableEventHelper from 'FixedDataTableEventHelper';


class ReorderHandle extends React.Component {
  static propTypes = {

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

    /**
     * Whether the reorder handle should respond to touch events or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,
  };

  _distance = 0;

  componentWillUnmount() {
    if (this._mouseMoveTracker) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  }

  render() {
    let style = {
      height: this.props.height,
    };
    return (
      <div
        className={cx({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false,
        })}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.props.touchEnabled ? this.onMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? e => e.stopPropagation() : null}
        onTouchMove={this.props.touchEnabled ? e => e.stopPropagation() : null}
        style={style}>
      </div>
    );
  }

  registerMouseEventListener = () => {
    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnReorderEnd,
      document.body,
      this.props.touchEnabled
    );
  };

  onMouseDown = (event) => {
    const targetRect = event.target.getBoundingClientRect();
    const coordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(event);

    const mouseLocationInElement = coordinates.x - targetRect.left;
    let mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;

    this.registerMouseEventListener();
    this._mouseMoveTracker.captureMouseMoves(event);

    this._onColumnReorderMouseDown({
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

    /**
     * This prevents the rows from moving around when we drag the
     * headers on touch devices.
     */
    if (this.props.touchEnabled) {
      event.stopPropagation();
    }
  };

  _onMove = (/*number*/ deltaX) => {
    this._distance += deltaX * (this.props.isRTL ? -1 : 1);
  };

  _onColumnReorderEnd = (/*boolean*/ cancelReorder) => {
    this._animating = false;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.columnReorderingData.cancelReorder = cancelReorder;
    this.onColumnReorderEnd();
  };

  _updateState = () => {
    if (this._animating) {
      this.frameId = requestAnimationFrame(this._updateState);
    }
    this.props.moveColumnReorder(this._distance);
  };

  _onColumnReorderMouseDown = (/*object*/ event) => {
    this.props.startColumnReorder({
      scrollStart: this.props.scrollX,
      columnKey: this.props.columnKey,
      width: this.props.width,
      left: this.props.left
    });
  };

  onColumnReorderEnd = () => {
    const {
      columnReorderingData: {
        cancelReorder,
        columnAfter,
        columnBefore,
        columnKey,
      },
      onColumnReorderEndCallback,
    } = this.props;

    this.props.stopColumnReorder();
    if (cancelReorder) {
      return;
    }

    onColumnReorderEndCallback({
      columnAfter,
      columnBefore,
      reorderColumn: columnKey,
    });
  };
};
export default ReorderHandle;