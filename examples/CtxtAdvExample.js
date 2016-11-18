/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import { DataCtxt, AddFilter, AddSort } from './helpers/HOC';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';

// Note: Using sort with pagination is not recommended as this will
//       force loading all the data.
const AdvancedTable = AddFilter(AddSort(DataCtxt(Table)));

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

/**
 * This React component adds to the header sort funcitonality decorating with
 * arrow and adding a onClick to the header link.
 */
class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    const {columnKey, sortDir, sortColumn, onSortChange, children, ...props} = this.props;

    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir && columnKey === sortColumn ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      // TODO: Add indicator for handling large sort operations
      return new Promise(() => {
        this.props.onSortChange(
          this.props.columnKey,
          this.props.sortDir ?
            reverseSortDirection(this.props.sortDir) :
            SortTypes.DESC
        )
      })
    }
  }
}

SortHeaderCell.propTypes = {
  columnKey: React.PropTypes.string,
  sortDir: React.PropTypes.string,
  sortColumn: React.PropTypes.string,
  onSortChange: React.PropTypes.func,
  children: React.PropTypes.node,
}

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
    this._fetchSize = Math.ceil(size/10);
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
  setCallback(callback, id = "base") {
    const new_callback = {id: id, fun: callback};

    let found = false;
    const new_callbacks = [];
    for (let cb of this._callbacks){
      if (cb.id == id){
        found = true;
        new_callbacks.push(new_callback);
      }else{
        new_callbacks.push(cb);
      }
    }

    if (!found) {
      new_callbacks.push(new_callback);
    }

    this._callbacks = new_callbacks;
  }

  /**
   * Runs callbacks in the order that they've been added.
   *
   * The function is triggered when the fetchRange() Promise resolves.
   *
   * @return {void}
   */
  runCallbacks() {
    for (let cb of this._callbacks){
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
    return new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => {
      this._pending = false;
      this._end = end;
      this.runCallbacks();
    });
  }

  getObjectAt(index) {
    if (index >= this._end) {
      this.fetchRange(Math.min(this._dataList.getSize(),
                               index + this._fetchSize));
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
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <Cell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
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
const PagedCell = (props, {data, version}) => {
  return (
    <PendingCell
      data={data}
      dataVersion={version}
      {...props}
    />
  );
};

/**
 * Data type validator
 *
 * Instead of having React.PropTypes.instanceOf(PagedData) the custom PropTypes
 * allows any data structure as long as it provides a `getObjectAt` function.
 *
 * @param {object} props         The list of the props
 * @param {string} propName      The prop that is to be validated
 * @param {string} componentName The name of the component that the prop belongs to
 */
function PropTypeCtxtData(props, propName, componentName) {
  const dataObj = props[propName];
  if (dataObj.getObjectAt === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a getObjectAt() function'
      ].join(' ')
    );
  }
};

PagedCell.contextTypes = {
  data: PropTypeCtxtData,
  version: React.PropTypes.number
};

class AdvancedExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new PagedData(2000),
      filters: {
        firstName: '',
        lastName: ''
      },
      sortColumn: '',
      sortDir: null,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
  }

  _onFilterChange(name, value) {
    const filters = this.state.filters;
    filters[name] = value;
    this.setState({
      filters
    });
  }

  _onSortChange(columnKey, sortDir) {
    this.setState({
      sortColumn: columnKey,
      sortDir: sortDir,
    });
  }

  render() {
    var { data, filters, sortColumn, sortDir } = this.state;

    return (
      <div>
        <strong>Filter by:</strong>&nbsp;
        <input
          onChange={(e) => this._onFilterChange('firstName', e.target.value)}
          placeholder="First Name"
        />&nbsp;
        <input
          onChange={(e) => this._onFilterChange('lastName', e.target.value)}
          placeholder="Last Name"
        />
        <br />
        <AdvancedTable
          rowHeight={50}
          data={data}
          filters={filters}
          sortColumn={sortColumn}
          sortDir={sortDir}
          onSortChange={this._onSortChange}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="firstName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={sortDir}
                sortColumn={sortColumn}
              >
                First Name
              </SortHeaderCell>
            }
            cell={<PagedCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={sortDir}
                sortColumn={sortColumn}
              >
                Last Name
              </SortHeaderCell>
            }
            cell={<PagedCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<PagedCell />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<PagedCell />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<PagedCell />}
            width={200}
          />
        </AdvancedTable>
      </div>
    );
  }
}

module.exports = AdvancedExample;
