/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import { DataCtxt, AddFilter, AddSort } from './helpers/HOC';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';

const AdvancedTable = AddFilter(AddSort(DataCtxt(Table)));

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

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

class PagedData {
  constructor() {
    this._dataList = new FakeObjectDataListStore(2000);
    this._end = 50;
    this._pending = false;
  }

  // The callback is used for events when data has been loaded
  setCallback(callback) {
    this._callback = callback;
  }

  getSize() {
    return 2000;
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
      this._callback()
    });
  }

  getObjectAt(index) {
    if (index >= this._end) {
      this.fetchRange(Math.min(2000, index + 50));
      return null;
    }
    return this._dataList.getObjectAt(index);
  }
}

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

const PagedCell = (props, {data, version}) => {
  return (
    <PendingCell
      data={data}
      dataVersion={version}
      {...props}
    />
  );
};

function PropTypeCtxtData(props, propName, componentName) {
  const dataObj = props[propName];
  if (dataObj.setCallback === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a setCallback() function'
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
