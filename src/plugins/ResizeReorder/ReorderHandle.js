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
 * @file Contains the reordering logic
 */

import React from 'react';
import cx from '../../vendor_upstream/stubs/cx';
import PropTypes from 'prop-types';
import DOMMouseMoveTracker from '../../vendor_upstream/dom/DOMMouseMoveTracker';
import { PluginContext } from '../../Context';
import requestAnimationFramePolyfill from '../../vendor_upstream/core/requestAnimationFramePolyfill';
import cancelAnimationFramePolyfill from '../../vendor_upstream/core/cancelAnimationFramePolyfill';

const DRAG_SCROLL_SPEED = 15;
const DRAG_SCROLL_BUFFER = 100;

class ReorderHandle extends React.PureComponent {
  state = {
    displacement: 0,
    isReordering: false,
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
  cursorDeltaX = 0;

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
        style={style}
      />
    );
  }

  onTouchStart = (ev) => {
    if (!this.props.touchEnabled) {
      return;
    }
    this.onMouseDown(ev);
  };

  onTouchEnd = (ev) => {
    if (this.props.touchEnabled) ev.stopPropagation();
  };

  onTouchMove = (ev) => {
    if (this.props.touchEnabled) ev.stopPropagation();
  };

  /**
   *
   * @param {MouseEvent} event
   */
  onMouseDown = (event) => {
    this.props.onColumnReorderStart(this.props.columnKey);
    this.cursorDeltaX = 0;
    this.scrollStart = this.context.scrollX;
    this.originalLeft = this.props.left;
    this.initializeDOMMouseMoveTracker(event);
    this.setState({ displacement: 0, isReordering: true });
    this.frameId = requestAnimationFramePolyfill(
      this.updateDisplacementPeriodically
    );
  };

  /**
   * @param {number} deltaX
   */
  onMouseMove = (deltaX) => {
    this.cursorDeltaX += deltaX * (this.props.isRTL ? -1 : 1);
  };

  onMouseUp = () => {
    cancelAnimationFramePolyfill(this.frameId);
    this.setState({ displacement: 0, isReordering: false });
    this.updateColumnOrder();
    this.frameId = null;
    this.cursorDeltaX = 0;
    this.mouseMoveTracker.releaseMouseMoves();
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

  updateDisplacementPeriodically = () => {
    /* NOTE: We need to use requestAnimationFrame because whenever column reaches the end of table (scroll width is left),
     we want to update the scrollX which can't be updated if we uer onMouseMove*/
    this.frameId = requestAnimationFramePolyfill(
      this.updateDisplacementPeriodically
    );
    this.updateDisplacementWithScroll();
  };

  /**
   * @param {number} deltaX
   * @return {number} deltaX bounded between cell group
   */
  getBoundedDeltaX = (deltaX) => {
    // Column should not be moved beyond left of cell group
    if (this.originalLeft + deltaX < 0) {
      deltaX = -this.originalLeft;
    }
    // Column should not be moved beyond right of cell group
    const cellGroupColumnWidths = this.props.getCellGroupWidth();
    const cellGroupWidth = cellGroupColumnWidths.widths.reduce((a, b) => a + b);
    const maxReachableDisplacement = cellGroupWidth - this.props.width;
    if (this.originalLeft + deltaX > maxReachableDisplacement) {
      deltaX = maxReachableDisplacement - this.originalLeft;
    }
    return deltaX;
  };

  updateDisplacementWithScroll = () => {
    const scrollStart = this.scrollStart;
    let { isFixed } = this.props;
    let { scrollX, maxScrollX, availableScrollWidth } = this.context;
    let deltaX = this.cursorDeltaX;
    if (!isFixed) {
      // Relative dragX position on scroll
      const dragX = this.originalLeft - scrollStart + deltaX;
      deltaX += scrollX - scrollStart;

      // Scroll the table left or right if we drag near the edges of the table
      if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
        scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
      } else if (dragX <= DRAG_SCROLL_BUFFER) {
        scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
      }
      this.props.scrollToX(scrollX);
    }
    deltaX = this.getBoundedDeltaX(deltaX);
    this.setState({ displacement: deltaX });
    this.props.translateCell(deltaX);
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

  updateColumnOrder = () => {
    const { getCellGroupWidth, columnKey } = this.props;
    const cellGroupColumnWidths = getCellGroupWidth();
    const columnIndex = cellGroupColumnWidths.keys.indexOf(columnKey);
    let columnBefore = cellGroupColumnWidths.keys[columnIndex - 1];
    let columnAfter = cellGroupColumnWidths.keys[columnIndex + 1];

    let localDisplacement = this.getBoundedDeltaX(
      this.cursorDeltaX + this.context.scrollX - this.scrollStart
    );
    if (this.isColumnMovedToRight(localDisplacement)) {
      for (
        let i = columnIndex + 1, j = cellGroupColumnWidths.widths.length;
        i < j;
        i++
      ) {
        let curWidth = cellGroupColumnWidths.widths[i];
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        } else {
          if (localDisplacement > curWidth / 2) {
            columnAfter = cellGroupColumnWidths.keys[i + 1];
            columnBefore = cellGroupColumnWidths.keys[i];
          } else {
            columnAfter = cellGroupColumnWidths.keys[i];
            columnBefore =
              i - 1 !== columnIndex
                ? cellGroupColumnWidths.keys[i - 1]
                : cellGroupColumnWidths.keys[i - 2];
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
            columnAfter =
              i + 1 !== columnIndex
                ? cellGroupColumnWidths.keys[i + 1]
                : cellGroupColumnWidths.keys[i + 2];
          }
          break;
        }
      }
    }
    this.props.onColumnReorderEndCallback({
      columnBefore,
      columnAfter,
      reorderColumn: this.props.columnKey,
    });
  };
}

ReorderHandle.contextType = PluginContext;

ReorderHandle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  touchEnabled: PropTypes.bool,
  isRTL: PropTypes.bool,
  left: PropTypes.number.isRequired,
  isFixed: PropTypes.bool,
  scrollToX: PropTypes.func,
  onColumnReorderEndCallback: PropTypes.func.isRequired,
  getCellGroupWidth: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onColumnReorderStart: PropTypes.func.isRequired,
  translateCell: PropTypes.func.isRequired,
};

export default ReorderHandle;
