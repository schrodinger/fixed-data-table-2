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
import DragProxy from './DragProxy';
import ExternalContextProvider from '../ExternalContextProvider';
import get from 'lodash/get';
import lodashToString from 'lodash/toString';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';

const BORDER_WIDTH = 1;

/**
 * HOC that enables reordering functionality by rendering a handle, which can be used to drag the cell around.
 *
 * While dragging takes place, this components rerenders a proxy component into a seperate React root, referred here as the "Drag Proxy".
 * ReorderCell then hides itself, while the Drag Proxy becomes visible and is what the user actually sees and drags around.
 *
 * This ensures that even if ReorderCell unmounts (which can happen when the table scrolls far away), the Drag Proxy
 * which is rendered in a separate React root is still alive, and hence doesn't break dragging functionality.
 *
 * Once dragging ends, the proxy is destroyed, and the original ReorderCell becomes visible again.
 */
class ReorderCell extends React.PureComponent {
  state = {
    isReordering: false,
  };

  dragContainer = null;
  cellRef = React.createRef();
  isMounted = false;

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
    const draggedCellColumnKey = get(
      this.getDragContainer(),
      'dataset.columnKey'
    );
    const isReordering =
      lodashToString(this.props.columnKey) === draggedCellColumnKey;

    if (isReordering) {
      // NOTE (pradeep): rerender the drag proxy to alert it that this instance is the new parent
      this.renderDragProxy({});

      this.setState({ isReordering: true });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    if (this.state.isReordering) {
      // If we're in the middle of reordering then return null here.
      // The rendering responsibility will instead be taken care of by the drag proxy instead.
      return null;
    }

    const {
      onColumnReorderStart,
      onColumnReorderEnd,
      reorderStartEvent,
      ...props
    } = this.props;

    const { children, left } = props;

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
      })
    );

    let style = {
      height: props.height,
      width: props.width - BORDER_WIDTH,
    };

    let content;
    if (React.isValidElement(children)) {
      content = React.cloneElement(children, props);
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
        {this.renderReorderHandle()}
        {content}
      </div>
    );
  }

  renderReorderHandle() {
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

  /**
   *
   * @param {MouseEvent} event
   */
  onMouseDown = (event) => {
    this.onDragStart(event);
  };

  /**
   * @param {string} columnKey
   */
  onDragStart = (event) => {
    this.createDragContainer();
    this.renderDragProxy(event);
    this.props.onColumnReorderStart(this.props.columnKey);
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
      });
    }

    this.removeDragContainer();
    this.props.onColumnReorderEnd(ev);
  };

  /**
   * Render a proxy version of our cell that can be dragged around without repercussions to component unmounts.
   */
  renderDragProxy(reorderStartEvent) {
    const additionalProps = {
      isDragProxy: true,
      reorderStartEvent,
      onColumnReorderEnd: this.onColumnReorderEnd,
      contents: this.cellRef.current,
    };

    ReactDOM.render(
      // Since we're effectively rendering the proxy in a separate VDOM root, we cannot directly pass in our context.
      // To solve this, we use ExternalContextProvider to pass down the context value.
      // ExternalContextProvider also ensures that even if our cell gets unmounted, the dragged cell still receives updates from context.
      <ExternalContextProvider value={this.context}>
        <DragProxy {...this.props} {...additionalProps} />
      </ExternalContextProvider>,
      this.getDragContainer(),
      // we consider our cell in a reordering state as soon as the drag proxy gets mounted
      () => this.setState({ isReordering: true })
    );
  }

  createDragContainer = () => {
    // create a container for the drag proxy
    this.dragContainer = document.createElement('div');

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
  onColumnReorderStart: noop,
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
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
};

export default ReorderCell;
