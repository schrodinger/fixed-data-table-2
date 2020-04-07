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

import * as ActionTypes from 'ActionTypes';
import FixedDataTable from 'FixedDataTable';
import FixedDataTableStore from 'FixedDataTableStore';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as columnActions from 'columnActions';
import invariant from 'invariant';
import pick from 'lodash/pick';
import * as scrollActions from 'scrollActions';
import ScrollContainer from 'ScrollContainer';
import Scrollbar from 'Scrollbar';

class FixedDataTableContainer extends React.Component {
  static defaultProps = {
      defaultScrollbars: true,
      scrollbarXHeight: Scrollbar.SIZE,
      scrollbarYWidth: Scrollbar.SIZE
  };

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);

    this.reduxStore = FixedDataTableStore.get();

    this.scrollActions = bindActionCreators(scrollActions, this.reduxStore.dispatch);
    this.columnActions = bindActionCreators(columnActions, this.reduxStore.dispatch);

    this.reduxStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props,
    });

    this.unsubscribe = this.reduxStore.subscribe(this.update);
    this.state = this.getBoundState();
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
      this.unsubscribe = null;
    }
    this.reduxStore = null;
  }

  render() {
    const fdt = (
        <FixedDataTable
            {...this.props}
            {...this.state}
            scrollActions={this.scrollActions}
            columnActions={this.columnActions}
        />
    );
    // For backward compatibility, by default we render FDT-2 scrollbars
    if (this.props.defaultScrollbars) {
      return (
          <ScrollContainer {...this.props}>
            {fdt}
          </ScrollContainer>
      );
    }
    return fdt;
  }

  getBoundState() {
    const state = this.reduxStore.getState();
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

  update() {
    this.setState(this.getBoundState());
  }
}

export default FixedDataTableContainer;
