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
import { bindActionCreators } from 'redux';
import invariant from './stubs/invariant';
import pick from 'lodash/pick';

import * as ActionTypes from './actions/ActionTypes';
import * as columnActions from './actions/columnActions';
import * as scrollActions from './actions/scrollActions';
import FixedDataTable from './FixedDataTable';
import FixedDataTableStore from './FixedDataTableStore';
import Scrollbar from './plugins/Scrollbar';
import ScrollContainer from './plugins/ScrollContainer';
import { polyfill as lifecycleCompatibilityPolyfill } from 'react-lifecycles-compat';

class FixedDataTableContainer extends React.Component {
  static defaultProps = {
    defaultScrollbars: true,
    scrollbarXHeight: Scrollbar.SIZE,
    scrollbarYWidth: Scrollbar.SIZE,
  };

  constructor(props) {
    super(props);

    this.reduxStore = FixedDataTableStore.get();

    this.scrollActions = bindActionCreators(
      scrollActions,
      this.reduxStore.dispatch
    );
    this.columnActions = bindActionCreators(
      columnActions,
      this.reduxStore.dispatch
    );

    this.reduxStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props,
    });

    this.unsubscribe = this.reduxStore.subscribe(this.onStoreUpdate.bind(this));
    this.state = {
      boundState: FixedDataTableContainer.getBoundState(this.reduxStore), // the state from the redux store
      reduxStore: this.reduxStore, // put store instance in local state so that getDerivedStateFromProps can access it
      props, // put props in local state so that getDerivedStateFromProps can access it
    };
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    invariant(
      nextProps.height !== undefined || nextProps.maxHeight !== undefined,
      'You must set either a height or a maxHeight'
    );

    // getDerivedStateFromProps is called for both prop and state updates.
    // If props are unchanged here, then there's no need to recalculate derived state.
    if (nextProps === currentState.boundState.propsReference) {
      // return null to indicate that state should be unchanged
      return null;
    }

    // Props have changed, so update the redux store with the latest props
    currentState.reduxStore.dispatch({
      type: ActionTypes.PROP_CHANGE,
      newProps: nextProps,
      oldProps: currentState.props,
    });

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

  render() {
    const fdt = (
      <FixedDataTable
        {...this.props}
        {...this.state.boundState}
        scrollActions={this.scrollActions}
        columnActions={this.columnActions}
      />
    );
    // For backward compatibility, by default we render FDT-2 scrollbars
    if (this.props.defaultScrollbars) {
      return <ScrollContainer {...this.props}>{fdt}</ScrollContainer>;
    }
    return fdt;
  }

  static getBoundState(reduxStore) {
    const state = reduxStore.getState();
    const boundState = pick(state, [
      'columnGroupProps',
      'columnProps',
      'columnReorderingData',
      'columnResizingData',
      'elementHeights',
      'elementTemplates',
      'firstRowIndex',
      'endRowIndex',
      'isColumnReordering',
      'isColumnResizing',
      'maxScrollX',
      'maxScrollY',
      'propsRevision',
      'rows',
      'rowOffsets',
      'rowSettings',
      'scrollContentHeight',
      'scrollFlags',
      'scrollX',
      'scrollY',
      'scrolling',
      'scrollJumpedX',
      'scrollJumpedY',
      'tableSize',
    ]);
    return boundState;
  }

  onStoreUpdate() {
    const newBoundState = FixedDataTableContainer.getBoundState(
      this.reduxStore
    );

    // If onStoreUpdate was called through a prop change, then skip updating local state.
    // This is fine because getDerivedStateFromProps already calculates the new state.
    if (this.state.boundState.propsRevision !== newBoundState.propsRevision) {
      return;
    }

    this.setState({ boundState: newBoundState });
  }
}

export default lifecycleCompatibilityPolyfill(FixedDataTableContainer);
