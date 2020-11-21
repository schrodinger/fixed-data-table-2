import React from 'react';
import cx from 'cx';
import PropTypes from 'prop-types';
import DOMMouseMoveTracker from 'DOMMouseMoveTracker';
import { getState } from 'FixedDataTableStore';

const DRAG_SCROLL_SPEED = 10;
const DRAG_SCROLL_BUFFER = 100;

export default class NewReorderCell extends React.Component {

  static propTypes = {
    height: PropTypes.number,
    touchEnabled: PropTypes.bool,
    isRTL: PropTypes.bool,
    parentRef: PropTypes.any,
    scrollX: PropTypes.number,
    maxScrollX: PropTypes.number,
    left: PropTypes.number,
    availableScrollWidth: PropTypes.number,
    isFixed: PropTypes.bool,
    scrollToX: PropTypes.func,
    onColumnReorderEndCallback: PropTypes.func,
    cellGroupColumnWidths: PropTypes.shape({
      keys: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])),
      widths: PropTypes.arrayOf(PropTypes.number)
    }),
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };

  /**
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
  animating = false;

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
        onTouchStart={this.props.touchEnabled ? this.onMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? e => e.stopPropagation() : null}
        onTouchMove={this.props.touchEnabled ? e => e.stopPropagation() : null}
        style={style}>
      </div>
    );
  }

  /**
   *
   * @param {MouseEvent} event
   */
  onMouseDown = (event) => {
    this.distance = 0;
    this.animating = true;
    this.scrollStart = this.props.scrollX;
    this.originalLeft = this.props.left;
    this.initializeDOMMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
    this.setZIndexOfParent(2);
    this.frameId = requestAnimationFrame(this.updateState);
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
    this.animating = false;
    this.frameId = null;
    this.distance = 0;
    this.mouseMoveTracker.releaseMouseMoves();
    this.translateParent(0);
    this.setZIndexOfParent(0);
  };

  initializeDOMMouseMoveTracker = () => {
    this.mouseMoveTracker = new DOMMouseMoveTracker(
      this.onMouseMove,
      this.onMouseUp,
      document.body,
      this.props.touchEnabled
    );
  };

  updateState = () => {
    if (this.animating) {
      this.frameId = requestAnimationFrame(this.updateState);
    }
    this.calculateDisplacementWithScroll();
  };

  calculateDisplacementWithScroll = () => {
    const scrollStart = this.scrollStart;
    let { isFixed, maxScrollX } = this.props;
    let scrollX = getState().scrollX;
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
    this.translateParent(deltaX);
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
    let columnReorderingData = {
      dragDistance: this.distance,
      columnBefore: undefined,
      columnAfter: undefined
    };
    let index = this.props.cellGroupColumnWidths.keys.indexOf(this.props.columnKey);
    const { cellGroupColumnWidths } = this.props;

    columnReorderingData.columnBefore = cellGroupColumnWidths.keys[index - 1];
    columnReorderingData.columnAfter = cellGroupColumnWidths.keys[index + 1];

    let localDisplacement = this.distance;
    if (this.isColumnMovedToRight(localDisplacement)) {
      for (let i = index + 1, j = cellGroupColumnWidths.widths.length; i < j; i++) {
        let curWidth = cellGroupColumnWidths.widths[i];
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        } else {
          if (localDisplacement > curWidth / 2) {
            columnReorderingData.columnAfter = cellGroupColumnWidths.keys[i + 1];
            columnReorderingData.columnBefore = cellGroupColumnWidths.keys[i];
          } else {
            columnReorderingData.columnAfter = cellGroupColumnWidths.keys[i];
            columnReorderingData.columnBefore = (i - 1 !== index) ? cellGroupColumnWidths.keys[i - 1] : cellGroupColumnWidths.keys[i - 2];
          }
          break;
        }
      }
    } else if (this.isColumnMovedToLeft(localDisplacement)) {
      localDisplacement = -localDisplacement;
      for (let i = index - 1; i >= 0; i--) {
        let curWidth = cellGroupColumnWidths.widths[i];
        if (localDisplacement > curWidth) {
          localDisplacement -= curWidth;
        } else {
          if (localDisplacement > curWidth / 2) {
            columnReorderingData.columnAfter = cellGroupColumnWidths.keys[i];
            columnReorderingData.columnBefore = cellGroupColumnWidths.keys[i - 1];
          } else {
            columnReorderingData.columnBefore = cellGroupColumnWidths.keys[i];
            columnReorderingData.columnAfter = (i + 1 !== index) ? cellGroupColumnWidths.keys[i + 1] : cellGroupColumnWidths.keys[i + 2];
          }
          break;
        }
      }
    }
    this.props.onColumnReorderEndCallback({
      columnBefore: columnReorderingData.columnBefore,
      columnAfter: columnReorderingData.columnAfter,
      reorderColumn: this.props.columnKey
    });
  };

  /**
   * @param {number} translateX
   */
  translateParent = (translateX) => {
    this.props.parentRef.style.transform = `translateX(${translateX}px) translateZ(0)`;
  };

  /**
   * @param {number} zIndex
   */
  setZIndexOfParent = (zIndex) => {
    this.props.parentRef.style.zIndex = zIndex;
  };

}