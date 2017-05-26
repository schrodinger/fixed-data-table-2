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
    FixedDataTableStore.subscribe(this.update);

    this.scrollActions = bindActionCreators(scrollActions, FixedDataTableStore.dispatch);
    this.columnActions = bindActionCreators(columnActions, FixedDataTableStore.dispatch);
  }

  componentWillMount() {
    const props = this.props;

    FixedDataTableStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props: props
    });

    this.update();
  }

  componentWillReceiveProps(nextProps) {
    FixedDataTableStore.dispatch({
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
    const state = FixedDataTableStore.getState();
    const {
      firstRowIndex,
      firstRowOffset,
      rows,
      rowHeights,
      scrollContentHeight,
      scrollY,
    } = state.scrollState;

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
