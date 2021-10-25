/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import { DataCtxt, AddFilter } from './helpers/HOC';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import examplePropTypes from './helpers/examplePropTypes';

const FilterablePagingTable = AddFilter(DataCtxt(Table));

/**
 * The PagedData class simulates real paginated data where data is fetched
 * as requested in chunks.
 */
class PagedData {
  constructor(size = 2000) {
    this._dataList = new FakeObjectDataListStore(size);
    // When fetching we need to fetch the index missing + additional x-elements.
    //  This specifies that we add 10% of the total size when fetching, the
    //  maximum number of data-requests will then be 10.
    this._fetchSize = Math.ceil(size / 10);
    this._end = 50;
    this._pending = false;
    this._callbacks = [];
    this.runCallbacks = this.runCallbacks.bind(this);
  }

  /**
   * The callbacks are used to trigger events as new data arrives.
   *
   * In most cases the callback is a method that updates the state, e.g.
   * updates a version number without direct impact on the component but that
   * will trigger an component refresh/update.
   *
   * @param callback {function} The fallback function to be called
   * @param id       {string}   The string that identifies the given callback.
   *   This allows a callback to be overwritten when creating new objects that
   *   use this data as reference.
   * @return void
   */
  setCallback(callback, id = 'base') {
    const newCallback = { id, fun: callback };

    let found = false;
    const newCallbacks = [];
    for (const cb of this._callbacks) {
      if (cb.id === id) {
        found = true;
        newCallbacks.push(newCallback);
      } else {
        newCallbacks.push(cb);
      }
    }

    if (!found) {
      newCallbacks.push(newCallback);
    }

    this._callbacks = newCallbacks;
  }

  /**
   * Runs callbacks in the order that they've been added.
   *
   * The function is triggered when the fetchRange() Promise resolves.
   *
   * @return {void}
   */
  runCallbacks() {
    for (const cb of this._callbacks) {
      cb.fun();
    }
  }

  getSize() {
    return this._dataList.getSize();
  }

  fetchRange(end) {
    if (this._pending) {
      return;
    }

    this._pending = true;
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      this._pending = false;
      this._end = end;
      this.runCallbacks();
    });
  }

  getObjectAt(index) {
    if (index >= this._end) {
      this.fetchRange(
        Math.min(this._dataList.getSize(), index + this._fetchSize)
      );
      return null;
    }

    return this._dataList.getObjectAt(index);
  }
}

/**
 * The PendingCell allows shallow comparison and avoiding updating
 * components that haven't changed, see Reacts performance post:
 * https://facebook.github.io/react/docs/optimizing-performance.html
 */
class PendingCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, dataVersion, ...props } = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <DataCell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </DataCell>
    );
  }
}

/**
 * A cell that is aware of its context
 *
 * This cell is aware of its context and retrieves the data and its version
 * before passing it on to an ordinary cell.
 *
 * @param {object} props   Standard props
 * @param {object} data    A data object with getObjectAt() defined
 * @param {number} version A number indicating the current version of the displayed data
 */
const PagedCell = (props, { data, version }) => (
  <PendingCell data={data} dataVersion={version} {...props} />
);

PagedCell.contextTypes = {
  data: examplePropTypes.CtxtDataListStore,
  version: PropTypes.number,
};

class ContextExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new PagedData(2000),
      filters: {
        firstName: '',
        lastName: '',
      },
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(name, value) {
    const filters = this.state.filters;
    filters[name] = value;
    this.setState({
      filters,
    });
  }

  render() {
    const { data, filters } = this.state;

    return (
      <div>
        <strong>Filter by:</strong>&nbsp;
        <input
          onChange={(e) => this._onFilterChange('firstName', e.target.value)}
          placeholder="First Name"
        />
        &nbsp;
        <input
          onChange={(e) => this._onFilterChange('lastName', e.target.value)}
          placeholder="Last Name"
        />
        <br />
        <FilterablePagingTable
          rowHeight={50}
          data={data}
          filters={filters}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}
        >
          <Column
            columnKey="firstName"
            header={<DataCell>First</DataCell>}
            cell={<PagedCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<DataCell>Last Name</DataCell>}
            cell={<PagedCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<DataCell>City</DataCell>}
            cell={<PagedCell />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<DataCell>Street</DataCell>}
            cell={<PagedCell />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<DataCell>Zip Code</DataCell>}
            cell={<PagedCell />}
            width={200}
          />
        </FilterablePagingTable>
      </div>
    );
  }
}

export default ContextExample;
