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
import { FixedDataTableContext } from '../../FixedDataTableContext';
import requestAnimationFramePolyfill from '../../vendor_upstream/core/requestAnimationFramePolyfill';
import cancelAnimationFramePolyfill from '../../vendor_upstream/core/cancelAnimationFramePolyfill';
import _ from 'lodash';

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

  componentDidMount() {
    if (this.props.isDragProxy) {
      this.startReordering();
    }
  }

  componentWillUnmount() {
    cancelAnimationFramePolyfill(this.frameId);
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
    }
  }

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

  startReordering() {
    this.cursorDeltaX = 0;
    this.scrollStart = this.context.scrollX;
    this.originalLeft = this.props.left;
    this.initializeDOMMouseMoveTracker(this.props.reorderStartEvent);
    this.setState({ displacement: 0, isReordering: true });
    this.frameId = requestAnimationFramePolyfill(
      this.updateDisplacementPeriodically
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
    this.props.onColumnReorderStart(this.props.columnKey, event);
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
    let groupWidth = 0;
    let groupStart = 0;

    if (this.context.groupHeaderExists && !this.props.isGroupHeader) {
      const group = this.context.getColumnGroupByChild(this.props.columnIndex);
      groupWidth = group.width;

      if (this.context.groupHeaderExists) {
        groupStart = group.offset;
      }
    } else {
      groupWidth = this.context.getCellGroupWidth();
    }

    const maxReachableDisplacement = groupWidth - this.props.width;
    return _.clamp(
      deltaX,
      -this.originalLeft + groupStart,
      maxReachableDisplacement - this.originalLeft + groupStart
    );
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
      this.context.scrollToX(scrollX);
    }
    deltaX = this.getBoundedDeltaX(deltaX);
    this.setState({ displacement: deltaX });
    this.props.onTranslateCell(deltaX);
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
    const localOffset = this.getBoundedDeltaX(
      this.cursorDeltaX + this.context.scrollX - this.scrollStart
    );
    const offset =
      localOffset >= 0
        ? this.props.width + localOffset + this.props.left
        : localOffset + this.props.left;

    let target;
    let targetColumnOffset;
    if (this.props.isGroupHeader) {
      const { columnGroup, distanceFromOffset: columnGroupOffset } =
        this.context.getColumnGroupAtOffset(offset);
      target = columnGroup;
      targetColumnOffset = columnGroupOffset;
    } else {
      const { column, distanceFromOffset: columnOffset } =
        this.context.getColumnAtOffset(offset);
      target = column;
      targetColumnOffset = columnOffset;
    }

    let columnBeforeIndex = null;
    let columnAfterIndex = null;

    if (target.index < this.props.columnIndex) {
      if (targetColumnOffset <= target.width / 2) {
        columnBeforeIndex = target.index - 1;
        columnAfterIndex = target.index;
      } else {
        columnBeforeIndex = target.index;
        columnAfterIndex = target.index + 1;
      }
    } else {
      if (targetColumnOffset >= target.width / 2) {
        columnBeforeIndex = target.index;
        columnAfterIndex = target.index + 1;
      } else {
        columnBeforeIndex = target.index - 1;
        columnAfterIndex = target.index;
      }
    }

    if (columnBeforeIndex === this.props.columnIndex) {
      --columnBeforeIndex;
    }
    if (columnAfterIndex === this.props.columnIndex) {
      ++columnAfterIndex;
    }

    const columnCount = this.props.isGroupHeader
      ? this.context.getColumnGroupCount()
      : this.context.getColumnCount();
    let columnBefore;
    let columnAfter;
    if (_.inRange(columnBeforeIndex, 0, columnCount)) {
      columnBefore = this.props.isGroupHeader
        ? this.context.getColumnGroup(columnBeforeIndex)
        : this.context.getColumn(columnBeforeIndex);
    }
    if (_.inRange(columnAfterIndex, 0, columnCount)) {
      columnAfter = this.props.isGroupHeader
        ? this.context.getColumnGroup(columnAfterIndex)
        : this.context.getColumn(columnAfterIndex);
    }

    this.props.onColumnReorderEnd({
      columnBefore: _.get(columnBefore, 'columnKey'),
      columnAfter: _.get(columnAfter, 'columnKey'),
      reorderColumn: this.props.columnKey,
    });
  };
}

ReorderHandle.contextType = FixedDataTableContext;

ReorderHandle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  touchEnabled: PropTypes.bool,
  isRTL: PropTypes.bool,
  left: PropTypes.number.isRequired,
  isFixed: PropTypes.bool,
  isDragProxy: PropTypes.bool,
  onColumnReorderEnd: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onColumnReorderStart: PropTypes.func.isRequired,
  reorderStartEvent: PropTypes.object,
  onTranslateCell: PropTypes.func.isRequired,
};

export default ReorderHandle;
