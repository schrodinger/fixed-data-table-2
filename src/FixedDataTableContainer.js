/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableContainer
 * @typechecks
 * @noflow
 */

import React from 'react';
import invariant from './stubs/invariant';
import pick from 'lodash/pick';

import { getScrollActions } from './actions/scrollActions';
import FixedDataTable from './FixedDataTable';
import FixedDataTableStore from './FixedDataTableStore';
import Scrollbar from './plugins/Scrollbar';
import ScrollContainer from './plugins/ScrollContainer';
import { FixedDataTableContext } from './FixedDataTableContext';
import { createApi } from './api';
import { initialize, propChange } from './reducers';
import { polyfill as lifecycleCompatibilityPolyfill } from 'react-lifecycles-compat';
import Shared from './impl.js';

class FixedDataTableContainer extends React.Component {
  static defaultProps = {
    defaultScrollbars: true,
    scrollbarXHeight: Scrollbar.SIZE,
    scrollbarYWidth: Scrollbar.SIZE,
    shouldUseLegacyComponents: false,
  };

  constructor(props) {
    super(props);
    // console.log(props.tableNumber)
    this.reduxStore = FixedDataTableStore.get();
    // console.log(Shared)
    this.scrollActions = getScrollActions(this.reduxStore, () => this.props);
    // console.log(this.props)
    this.reduxStore.dispatch(initialize(props));

    this.unsubscribe = this.reduxStore.subscribe(this.onStoreUpdate.bind(this));
    this.state = {
      boundState: FixedDataTableContainer.getBoundState(this.reduxStore), // the state from the redux store
      reduxStore: this.reduxStore, // put store instance in local state so that getDerivedStateFromProps can access it
      props, // put props in local state so that getDerivedStateFromProps can access it
    };

    this.fixedDataTableApi = createApi();
    this.previousApiValue = null;
    // console.log(props.tableNumber)
    // Shared.subscribe()
    // console.log(Shared)
    // if (this.props.tableNumber === 2) {
    //   Shared.subscribers.push(this.reduxStore);
    // }
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    // console.log(nextProps)
    // console.log('hello')
    invariant(
      nextProps.height !== undefined || nextProps.maxHeight !== undefined,
      'You must set either a height or a maxHeight'
    );

    // getDerivedStateFromProps is called for both prop and state updates.
    // If props are unchanged here, then there's no need to recalculate derived state.
    if (nextProps === currentState.props) {
      // console.log(nextProps)

      // return null to indicate that state should be unchanged
      return null;
    }

    // Props have changed, so update the redux store with the latest props
    // Shared.update(nextProps,currentState.props)

    currentState.reduxStore.dispatch(
      propChange({
        newProps: nextProps,
        oldProps: currentState.props,
      })
    );

    // return the new state from the updated redux store
    return {
      boundState: FixedDataTableContainer.getBoundState(
        currentState.reduxStore
      ),
      props: nextProps,
    };
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.reduxStore = null;
  }

  componentDidUpdate() {
    this.notifyApiValueChanges();
  }

  /**
   * Returns FDT's public API.
   *
   * @public
   * @returns
   */
  getApi() {
    // console.log(this.reduxStore)
    return this.fixedDataTableApi.getValue(
      {
        ...this.props,
        ...this.reduxStore.getState(),
      },
      this.scrollActions
    );
  }

  /**
   * Notify all subscribers of the API if API value got changed.
   */
  notifyApiValueChanges() {
    const fixedDataTableContextValue = this.getApi();

    if (this.previousApiValue !== fixedDataTableContextValue) {
      this.fixedDataTableApi.notify();
      this.previousApiValue = fixedDataTableContextValue;
    }
  }

  render() {
    const fixedDataTableContextValue = this.getApi();
    // console.log(fixedDataTableContextValue)
    // console.log('hello')
    // console.log(this.props.storedWidths)
    // console.log(this.props.scrollableColOffsetIntervalTree)
    const fdt = (
      <FixedDataTable
        {...this.props}
        {...this.state.boundState}
        scrollActions={this.scrollActions}
      />
    );
    // For backward compatibility, by default we render FDT-2 scrollbars
    // console.log(this.props.defaultScrollbars,this.props.tableNumber)
    if (this.props.defaultScrollbars) {
      return (
        <FixedDataTableContext.Provider value={fixedDataTableContextValue}>
          <ScrollContainer {...this.props}>{fdt}</ScrollContainer>
          {/* {fdt} */}
        </FixedDataTableContext.Provider>
      );
    }
    return (
      // console.log('hello')
      <FixedDataTableContext.Provider value={fixedDataTableContextValue}>
        {/* //   {fdt} */}
      </FixedDataTableContext.Provider>
    );
  }

  static getBoundState(reduxStore) {
    const state = reduxStore.getState();
    const boundState = pick(state, [
      'columnGroupProps',
      'columnGroupOffsets',
      'columnOffsets',
      'columnProps',
      'columnReorderingData',
      'columnResizingData',
      'columnSettings',
      'columnsToRender',
      'columnGroupsToRender',
      'elementHeights',
      'elementTemplates',
      'endColumnIndex',
      'endViewportColumnGroupIndex',
      'endRowIndex',
      'firstColumnIndex',
      'firstViewportColumnGroupIndex',
      'firstRowIndex',
      'fixedColumnGroups',
      'fixedColumnGroupsToRender',
      'fixedColumnGroupOffsets',
      'fixedColumnOffsets',
      'fixedColumns',
      'fixedColumnsToRender',
      'fixedColumnsWidth',
      'fixedContentWidth',
      'fixedRightColumnGroups',
      'fixedRightColumnGroupsToRender',
      'fixedRightColumnGroupOffsets',
      'fixedRightColumnOffsets',
      'fixedRightColumns',
      'fixedRightColumnsToRender',
      'fixedRightColumnsWidth',
      'isColumnReordering',
      'isColumnResizing',
      'maxScrollX',
      'maxScrollY',
      'propsRevision',
      'rowOffsets',
      'rowSettings',
      'rows',
      'scrollContentHeight',
      'scrollContentWidth',
      'scrollFlags',
      'scrollJumpedX',
      'scrollJumpedY',
      'scrollX',
      'scrollY',
      'scrollableColumnGroups',
      'scrollableColumns',
      'scrolling',
      'tableSize',
    ]);

    return boundState;
  }

  onStoreUpdate() {
    const newBoundState = FixedDataTableContainer.getBoundState(
      this.reduxStore
    );
    // Shared.setscrollX(newBoundState.scrollX)

    // If onStoreUpdate was called through a prop change, then skip updating local state.
    // This is fine because getDerivedStateFromProps already calculates the new state.
    if (this.state.boundState.propsRevision !== newBoundState.propsRevision) {
      return;
    }

    this.setState({ boundState: newBoundState });
  }
}

export default lifecycleCompatibilityPolyfill(FixedDataTableContainer);
