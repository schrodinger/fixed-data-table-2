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

import React from 'React';
import { bindActionCreators } from 'redux';

import FixedDataTable from 'FixedDataTable';
import FixedDataTableStore from 'FixedDataTableStore';
import * as ActionTypes from 'ActionTypes';
import * as scrollActions from 'scrollActions';
import * as columnActions from 'columnActions';

export default class FixedDataTableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);

    // TODO (jordan) destroy on unmount
    this.reduxStore = FixedDataTableStore.get();
    this.reduxStore.subscribe(this.update);

    this.scrollActions = bindActionCreators(scrollActions, this.reduxStore.dispatch);
    this.columnActions = bindActionCreators(columnActions, this.reduxStore.dispatch);
  }

  componentWillMount() {
    const props = this.props;

    this.reduxStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props: props
    });

    this.update();
  }

  componentWillReceiveProps(nextProps) {
    this.reduxStore.dispatch({
      type: ActionTypes.PROP_CHANGE,
      newProps: nextProps,
      oldProps: this.props,
    });
  }

  render() {
    return (
      <FixedDataTable
        {...this.props}
        {...this.state}
        scrollActions={this.scrollActions}
        columnActions={this.columnActions}
      />
    );
  }

  update() {
    const state = this.reduxStore.getState();
    const {
      firstRowIndex,
      firstRowOffset,
      rows,
      rowHeights,
      scrollContentHeight,
      scrollY,
    } = state.scrollState;

    // TODO REDUX_MIGRATION
    //const maxScrollY = Math.max(0, scrollContentHeight - this.state.bodyHeight);

    this.setState({
      firstRowIndex,
      firstRowOffset,
      //maxScrollY,
      rows,
      rowHeights,
      scrollContentHeight,
      scrollY,
      ...state.columnState,
    });
  }
}
