/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReorderCell
 * @typechecks
 */

import React from 'react';
import ReactDOM from 'react-dom';
import joinClasses from '../../vendor_upstream/core/joinClasses';
import cx from '../../vendor_upstream/stubs/cx';
import FixedDataTableCellDefault from '../../FixedDataTableCellDefault';
import { FixedDataTableContext } from '../../FixedDataTableContext';
import ReorderHandle from './ReorderHandle';
import ExternalContextProvider from '../ExternalContextProvider';
import _ from 'lodash';
import ResizeCell from './ResizeCell';
import PropTypes from 'prop-types';

const BORDER_WIDTH = 1;

/**
 * HOC that enables reordering functionality by rendering a handle, which can be used to drag the cell around.
 *
 * While dragging takes place, this components rerenders itself into a seperate React root, referred here as the "Drag Proxy".
 * The HOC then hides itself, while the Drag Proxy becomes visible and is what the user actually sees and drags around.
 *
 * This ensures that even if the original HOC unmounts (which can happen when the table scrolls far away), the "Drag Proxy"
 * which is rendered in a separate React root is still alive and doesn't break dragging functionality.
 *
 * Once dragging ends, the proxy is destroyed, and the original HOC becomes visible again.
 */
class ReorderCell extends React.PureComponent {
  state = {
    isReordering: false,
    displacement: 0,
    reorderStartEvent: null,
  };

  dragContainer = null;
  cellRef = React.createRef();
  isMounted = false;

  constructor(props) {
    super(props);
    this.state.isReordering = this.props.isDragProxy;
  }

  componentDidMount() {
    this.isMounted = true;

    /**
     * NOTE (pradeep): Important! Check if this cell was "already" being dragged by the user.
     * This is a slightly rare case, and happens under the following steps:
     *   1. User starts reordering on cell "A", which creates the draggable proxy cell "B".
     *   2. If cell B is dragged far away such that the column associated with the cell goes outside the viewport, this effectively unmounts all cells in that column, including cell "A".
     *   2. Now if the user drags cell "B" back such that the column associated with the cell becomes visible, then another instance of cell "A" will be mounted.
     *   3. The new instance of cell "A" now needs to figure out that the dragged proxy cell "B" already exists, and if so it should be in a reordering state.
     */
    const draggedCellColumnKey = _.get(
      this.getDragContainer(),
      'dataset.columnKey'
    );
    const isReordering =
      _.toString(this.props.columnKey) === draggedCellColumnKey;
    this.setState({ isReordering }, () => this.renderDragProxy());
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  /**
   * @param {string} columnKey
   */
  onColumnReorderStart = (columnKey, event) => {
    this.createDragContainer();
    this.setState(
      {
        isReordering: true,
        reorderStartEvent: event,
      },
      () => this.renderDragProxy()
    );
    this.props.onColumnReorderStart(columnKey);
  };

  /**
   * @param {number} displacement
   */
  onTranslateCell = (displacement) => {
    this.setState({ displacement });
  };

  /**
   * @param ev
   * @param {string} ev.columnBefore
   * @param {string} ev.columnAfter
   * @param {string} ev.reorderColumn
   */
  onColumnReorderEnd = (ev) => {
    if (this.isMounted) {
      this.setState({
        isReordering: false,
        reorderStartEvent: null,
        displacement: 0,
      });
    }

    if (!this.props.isDragProxy) {
      this.removeDragContainer();
    }
    this.props.onColumnReorderEnd(ev);
  };

  render() {
    if (this.state.isReordering && !this.props.isDragProxy) {
      // If we're in the middle of reordering but this cell isn't the one that's actually being dragged, then return null here.
      // The rendering responsibility will instead be taken care of by the drag proxy.
      return null;
    }

    const { isDragProxy, reorderStartEvent, ...props } = this.props;

    const {
      children,
      minWidth,
      maxWidth,
      rowIndex,
      left,
      touchEnabled,
      isFixed,
      scrollToX,
      onColumnReorderStart,
      onColumnReorderEnd,
    } = props;

    let className = joinClasses(
      cx({
        'public/fixedDataTableCell/resizeReorderCellContainer': true,
      }),
      props.className
    );

    const reorderClasses = joinClasses(
      className,
      cx({
        'public/fixedDataTableCell/hasReorderHandle': true,
        'public/fixedDataTableCell/reordering': this.state.isReordering,
      })
    );

    const DIR_SIGN = this.context.isRTL ? -1 : 1;

    let style = {
      height: props.height,
      width: props.width - BORDER_WIDTH,
      transform: `translateX(${
        this.state.displacement * DIR_SIGN
      }px) translateZ(0)`,
    };

    if (this.context.isRTL) {
      style.right = left;
    } else {
      style.left = left;
    }

    let content;
    if (React.isValidElement(children)) {
      if (children.type === ResizeCell) {
        content = React.cloneElement(children, {
          ...children.props,
          ...props,
        });
      } else content = React.cloneElement(children, props);
    } else if (typeof children === 'function') {
      content = children(props);
    } else {
      content = (
        <FixedDataTableCellDefault {...props}>
          {children}
        </FixedDataTableCellDefault>
      );
    }

    return (
      <div className={reorderClasses} style={style} ref={this.cellRef}>
        <ReorderHandle
          columnIndex={this.props.columnIndex}
          columnKey={this.props.columnKey}
          height={this.props.height}
          isDragProxy={this.props.isDragProxy}
          isFixed={this.props.isFixed}
          isGroupHeader={this.props.isGroupHeader}
          isRTL={this.context.isRTL}
          left={this.props.left}
          onColumnReorderStart={this.onColumnReorderStart}
          onColumnReorderEnd={this.onColumnReorderEnd}
          onTranslateCell={this.onTranslateCell}
          reorderStartEvent={this.props.reorderStartEvent}
          scrollToX={this.props.scrollToX}
          touchEnabled={this.props.touchEnabled}
          width={this.props.width}
        />
        {content}
      </div>
    );
  }

  /**
   * Render a proxy version of our cell that can be dragged around without repercussions to component unmounts.
   */
  renderDragProxy() {
    if (!this.state.isReordering) {
      // no need for a drag proxy if we're not in the middle of reordering
      return;
    }

    if (this.props.isDragProxy) {
      // no need to render contents into another drag proxy if this cell is already a proxy
      return;
    }

    const additionalProps = {
      isDragProxy: true,
      reorderStartEvent: this.state.reorderStartEvent,
      onColumnReorderEnd: this.onColumnReorderEnd,
    };

    ReactDOM.render(
      // Since we're effectively rendering the proxy in a separate VDOM root, we cannot directly pass in our context.
      // To solve this, we use ExternalContextProvider to pass down the context value.
      // ExternalContextProvider also ensures that even if our cell gets unmounted, the dragged cell still receives updates from context.
      <ExternalContextProvider value={this.context}>
        <ReorderCell {...this.props} {...additionalProps} />
      </ExternalContextProvider>,
      this.getDragContainer()
    );
  }

  createDragContainer = () => {
    // create a container for the drag proxy
    this.dragContainer = document.createElement('div');

    // drag proxy should be visible above other cells and should also not affect other cells' layout
    this.dragContainer.style.position = 'absolute';
    this.dragContainer.style.zIndex = 1;

    // store the column key in the DOM to easily identify what column is being dragged around
    this.dragContainer.dataset.columnKey = this.props.columnKey;

    // Place the container inside the parent cell group so that our dragged cell ends up in the correct heirarchy.
    // This is important for correct styling and layout calculations.
    const cellGroup = this.cellRef.current.closest(
      '.fixedDataTableCellGroupLayout_cellGroup'
    );
    cellGroup.appendChild(this.dragContainer);
  };

  getDragContainer = () => {
    if (this.dragContainer) {
      return this.dragContainer;
    }

    // get the cell group containing our cell
    const cellGroup = this.cellRef.current.closest(
      '.fixedDataTableCellGroupLayout_cellGroup'
    );

    // find the drag container within the cell group
    this.dragContainer = cellGroup.querySelector(
      `[data-column-key="${this.props.columnKey}"]`
    );
    return this.dragContainer;
  };

  removeDragContainer = () => {
    // since the drag container is going to be removed, also unmount the drag proxy
    ReactDOM.unmountComponentAtNode(this.dragContainer);

    this.dragContainer.remove();
    this.dragContainer = null;
  };
}

ReorderCell.contextType = FixedDataTableContext;

ReorderCell.defaultProps = {
  onColumnReorderStart: _.noop,
};

ReorderCell.propTypes = {
  /**
   * Outer height of the cell.
   */
  height: PropTypes.number,

  /**
   * Outer width of the cell.
   */
  width: PropTypes.number,

  /**
   * Optional prop that if specified on the `Column` will be passed to the
   * cell. It can be used to uniquely identify which column is the cell is in.
   */
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,

  /**
   * Optional prop that represents the rows index in the table.
   * For the 'cell' prop of a Column, this parameter will exist for any
   * cell in a row with a positive index.
   *
   * Below that entry point the user is welcome to consume or
   * pass the prop through at their discretion.
   */
  rowIndex: PropTypes.number,

  /**
   * The left offset in pixels of the cell.
   * Space between cell's left edge and left edge of table
   */
  left: PropTypes.number,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: PropTypes.bool,

  /**
   * Function to change the scroll position by interacting
   * with the store.
   */
  scrollToX: PropTypes.func,

  /**
   * Whether the cells belongs to the fixed group
   */
  isFixed: PropTypes.bool,

  /**
   * The minimum width of the column.
   */
  minWidth: PropTypes.number,

  /**
   * The maximum width of the column.
   */
  maxWidth: PropTypes.number,

  /**
   * Callback function which is called when reordering starts
   * ```
   * function(columnKey: string)
   * ```
   */
  onColumnReorderStart: PropTypes.func,

  /**
   * Callback function which is called when reordering ends
   * ```
   * function({columnBefore: string, columnAfter: string, reorderColumn: string})
   * ```
   */
  onColumnReorderEnd: PropTypes.func.isRequired,

  /**
   * The event which initialized reordering.
   */
  reorderStartEvent: PropTypes.object,

  /**
   * Flag to indicate if this component instance is a proxy that's used while reodering/dragging.
   */
  isDragProxy: PropTypes.bool,
};

export default ReorderCell;