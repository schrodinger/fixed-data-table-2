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

import React from 'react';
import cx from 'cx';
import PropTypes from 'prop-types';
import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import { getState } from 'FixedDataTableStore';

const DRAG_SCROLL_SPEED = 10;
const DRAG_SCROLL_BUFFER = 100;

class ReorderHandle extends React.Component {

  static propTypes = {
    height: PropTypes.number,
    touchEnabled: PropTypes.bool,
    isRTL: PropTypes.bool,
    scrollX: PropTypes.number,
    maxScrollX: PropTypes.number,
    left: PropTypes.number,
    availableScrollWidth: PropTypes.number,
    isFixed: PropTypes.bool,
    scrollToX: PropTypes.func,
    onColumnReorderEndCallback: PropTypes.func,
    getColumnGroupWidth: PropTypes.func,
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };

  /**
   * Instance of DOMMouseMoveTracker to capture mouse events
   * @type {DOMMouseMoveTracker}
   */
  mouseMoveTracker = null;

  /**
   * Displacement of reorder cell while reordering
   * @type {number}
   */
  distance = 0;

  /**
   * Set true while reordering
   * @type {boolean}
   */
  isReordering = false;

  /**
   * Frame Id of requested animation frame
   * @type {number | null}
   */
  frameId = null;

  /**
   * Initial position of scroll
   * @type {number}
   */
  scrollStart = 0;

  /**
   * Left of column
   * @type {number}
   */
  originalLeft = 0;

  render() {
    const style = {
      height: this.props.height,
    };

    return (
      <div
        className={cx({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false,
        })}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={this.onTouchMove}
        style={style}>
      </div>
    );
  }

  onTouchStart = (ev) => {
    if (!this.props.touchEnabled) {
      return;
    }
    this.onMouseDown(ev);
  };

  onTouchEnd = (ev) => {
    if (this.props.touchEnabled)
      ev.stopPropagation();
  };

  onTouchMove = (ev) => {
    if (this.props.touchEnabled)
      ev.stopPropagation();
  };

  /**
   *
   * @param {MouseEvent} event
   */
  onMouseDown = (event) => {
    this.distance = 0;
    this.isReordering = true;
    this.scrollStart = getState().scrollX;
    this.originalLeft = this.props.left;
    this.initializeDOMMouseMoveTracker(event);
    this.updateParentReorderingData({
      isColumnReordering: true,
      displacement: 0
    });
    this.frameId = requestAnimationFrame(this.updateDisplacementPeriodically);
  };

  /**
   * @param {number} deltaX
   */
  onMouseMove = (deltaX) => {
    this.distance += deltaX * (this.props.isRTL ? -1 : 1);
  };

  onMouseUp = () => {
    cancelAnimationFrame(this.frameId);
    this.calculateColumnOrder();
    this.isReordering = false;
    this.frameId = null;
    this.distance = 0;
    this.mouseMoveTracker.releaseMouseMoves();
    this.updateParentReorderingData({
      isColumnReordering: false,
      displacement: 0
    });
  };

  /**
   *
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

  updateParentReorderingData = (state) => {
    this.props.updateParentReorderingData(state);
  };

  updateDisplacementPeriodically = () => {
    if (this.isReordering) {
      /* NOTE: We need to use requestAnimationFrame because whenever column reaches the end of table (scroll width is left),
       we want to update the scrollX which can't be updated if we uer onMouseMove*/
      this.frameId = requestAnimationFrame(this.updateDisplacementPeriodically);
    }
    this.calculateDisplacementWithScroll();
  };

  calculateDisplacementWithScroll = () => {
    const scrollStart = this.scrollStart;
    let { isFixed, maxScrollX } = this.props;
    let { scrollX } = getState();
    let deltaX = this.distance;
    if (!isFixed) {
      // Relative dragX position on scroll
      const dragX = this.originalLeft - scrollStart + deltaX;
      const availableScrollWidth = this.props.availableScrollWidth;
      deltaX += scrollX - scrollStart;

      // Scroll the table left or right if we drag near the edges of the table
      if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
        scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
      } else if (dragX <= DRAG_SCROLL_BUFFER) {
        scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
      }
      this.props.scrollToX(scrollX);
    }
    this.updateParentReorderingData({ displacement: deltaX });
  };

  /**
   * Returns true if column moved to right
   * @param {number} deltaX
   * @returns {boolean}
   */
  isColumnMovedToRight = (deltaX) => deltaX > 0;

  /**
   * Returns true if column moved to left
   * @param {number} deltaX
   * @returns {boolean}
   */
  isColumnMovedToLeft = (deltaX) => deltaX < 0;

  calculateColumnOrder = () => {
    const cellGroupColumnWidths = this.props.getColumnGroupWidth();
    const columnIndex = cellGroupColumnWidths.keys.indexOf(this.props.columnKey);
    let columnBefore = cellGroupColumnWidths.keys[columnIndex - 1];
    let columnAfter = cellGroupColumnWidths.keys[columnIndex + 1];

    let localDisplacement = this.distance + this.props.scrollX - this.scrollStart;
    if (this.isColumnMovedToRight(localDisplacement)) {
      for (let i = columnIndex + 1, j = cellGroupColumnWidths.widths.length; i < j; i++) {
        let curWidth = cellGroupColumnWidths.widths[i];
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        } else {
          if (localDisplacement > curWidth / 2) {
            columnAfter = cellGroupColumnWidths.keys[i + 1];
            columnBefore = cellGroupColumnWidths.keys[i];
          } else {
            columnAfter = cellGroupColumnWidths.keys[i];
            columnBefore = (i - 1 !== columnIndex) ? cellGroupColumnWidths.keys[i - 1] : cellGroupColumnWidths.keys[i - 2];
          }
          break;
        }
      }
    } else if (this.isColumnMovedToLeft(localDisplacement)) {
      localDisplacement = -localDisplacement;
      for (let i = columnIndex - 1; i >= 0; i--) {
        let curWidth = cellGroupColumnWidths.widths[i];
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        } else {
          if (localDisplacement > curWidth / 2) {
            columnAfter = cellGroupColumnWidths.keys[i];
            columnBefore = cellGroupColumnWidths.keys[i - 1];
          } else {
            columnBefore = cellGroupColumnWidths.keys[i];
            columnAfter = (i + 1 !== columnIndex) ? cellGroupColumnWidths.keys[i + 1] : cellGroupColumnWidths.keys[i + 2];
          }
          break;
        }
      }
    }
    this.props.onColumnReorderEndCallback({
      columnBefore,
      columnAfter,
      reorderColumn: this.props.columnKey
    });
  };
}

export default ReorderHandle;