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
import invariant from 'invariant';
import pick from 'lodash/pick';
import * as ActionTypes from 'ActionTypes';
import * as scrollActions from 'scrollActions';
import * as columnActions from 'columnActions';

export default class FixedDataTableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);

    this.reduxStore = FixedDataTableStore.get();
    this.unsubscribe = this.reduxStore.subscribe(this.update);

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
    invariant(
      nextProps.height !== undefined || nextProps.maxHeight !== undefined,
      'You must set either a height or a maxHeight'
    );

    this.reduxStore.dispatch({
      type: ActionTypes.PROP_CHANGE,
      newProps: nextProps,
      oldProps: this.props,
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.reduxStore = null;
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
    const boundState = pick(state, [
      'columnGroups',
      'columnReorderingData',
      'columnResizingData',
      'elementTemplates',
      'firstRowIndex',
      'firstRowOffset',
      'isColumnReordering',
      'isColumnResizing',
      'maxScrollX',
      'maxScrollY',
      'rows',
      'rowHeightGetter',
      'rowHeights',
      'scrollContentHeight',
      'scrollX',
      'scrollY',
      'useGroupHeader',
    ]);

    this.setState(boundState);
  }
}
