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

class DragProxy extends React.PureComponent {
  state = {
    displacement: 0,
  };

  containerRef = React.createRef();

  componentDidMount() {
    const draggedContents = this.props.contents.parentNode.cloneNode(true); // pass `true` to indicate a deep clone
    draggedContents.firstChild.classList.add(
      cx('public/fixedDataTableCell/reordering')
    );

    this.containerRef.current.appendChild(draggedContents);

    this.startDrag();
  }

  render() {
    const DIR_SIGN = this.context.isRTL ? -1 : 1;

    const style = {
      position: 'absolute',
      transform: `translateX(${
        this.state.displacement * DIR_SIGN
      }px) translateZ(0)`,
    };

    // render an empty placeholder which later gets injected with the dragged contents
    return <div style={style} ref={this.containerRef} />;
  }

  startDrag() {
    this.cursorDeltaX = 0;
    this.scrollStart = this.context.scrollX;
    this.originalLeft = this.props.left;
    this.initializeDOMMouseMoveTracker(this.props.reorderStartEvent);
    this.setState({ displacement: 0, isReordering: true });
    this.frameId = requestAnimationFramePolyfill(
      this.updateDisplacementPeriodically
    );
  }

  onTouchEnd = (ev) => {
    if (this.props.touchEnabled) ev.stopPropagation();
  };

  onTouchMove = (ev) => {
    if (this.props.touchEnabled) ev.stopPropagation();
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
    let cellGroupType = this.getCellGroupType();
    const groupHeaderExists = this.context.groupHeaderHeight > 0;

    if (groupHeaderExists > 0 && !this.props.isGroupHeader) {
      const group = this.context.getColumnGroupByChild(
        this.props.columnIndex,
        cellGroupType
      );
      groupWidth = group.width;

      if (groupHeaderExists > 0) {
        groupStart = group.offset;
      }
    } else {
      groupWidth = this.context.getCellGroupWidth(cellGroupType);
    }

    const maxReachableDisplacement = groupWidth - this.props.width;
    return _.clamp(
      deltaX,
      -this.originalLeft + groupStart,
      -this.originalLeft + maxReachableDisplacement + groupStart
    );
  };

  getCellGroupType = () => {
    if (this.props.isFixed) {
      return 'fixed';
    } else if (this.props.isFixedRight) {
      return 'fixedRight';
    }
    return 'scrollable';
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
    const cellGroupType = this.getCellGroupType();
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
        this.context.getColumnGroupAtOffset(offset, cellGroupType);
      target = columnGroup;
      targetColumnOffset = columnGroupOffset;
    } else {
      const { column, distanceFromOffset: columnOffset } =
        this.context.getColumnAtOffset(offset, cellGroupType);
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
      ? this.context.getColumnGroupCount(cellGroupType)
      : this.context.getColumnCount(cellGroupType);
    let columnBefore;
    let columnAfter;
    if (_.inRange(columnBeforeIndex, 0, columnCount)) {
      columnBefore = this.props.isGroupHeader
        ? this.context.getColumnGroup(columnBeforeIndex, cellGroupType)
        : this.context.getColumn(columnBeforeIndex, cellGroupType);
    }
    if (_.inRange(columnAfterIndex, 0, columnCount)) {
      columnAfter = this.props.isGroupHeader
        ? this.context.getColumnGroup(columnAfterIndex, cellGroupType)
        : this.context.getColumn(columnAfterIndex, cellGroupType);
    }

    this.props.onColumnReorderEnd({
      columnBefore: _.get(columnBefore, 'columnKey'),
      columnAfter: _.get(columnAfter, 'columnKey'),
      reorderColumn: this.props.columnKey,
    });
  };
}

DragProxy.contextType = FixedDataTableContext;

DragProxy.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  columnKey: PropTypes.string.isRequired,
  contents: PropTypes.object.isRequired,
  isFixed: PropTypes.bool,
  isFixedRight: PropTypes.bool,
  isGroupHeader: PropTypes.bool,
  isRTL: PropTypes.bool,
  left: PropTypes.number.isRequired,
  onColumnReorderStart: PropTypes.func.isRequired,
  reorderStartEvent: PropTypes.object.isRequired,
  touchEnabled: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

export default DragProxy;
