/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import { AvatarCell, TextCell } from './helpers/CtxtCells';
import { DataCtxt, AddFilter } from './helpers/HOC';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';

const FilterTable = AddFilter(DataCtxt(Table));

class FilterExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new FakeObjectDataListStore(20),
      filters: {
        firstName: '',
        lastName: ''
      }
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(name, value) {
    const filters = this.state.filters;
    filters[name] = value;
    this.setState({
      filters
    });
  }

  render() {
    var {data, filters } = this.state;
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
        <FilterTable
          rowHeight={50}
          data={data}
          filters={filters}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="avatar"
            cell={<AvatarCell />}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TextCell />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<TextCell />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<TextCell />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell />}
            width={200}
          />
        </FilterTable>
      </div>
    );
  }
}

module.exports = FilterExample;
