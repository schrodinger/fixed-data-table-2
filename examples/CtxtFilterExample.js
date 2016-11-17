/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const { AvatarCell, TextCell } = require('./helpers/CtxtCells');
const { DataCtxt } = require('./helpers/HOC');
const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class DataListWrapper {
  constructor(data, index = null) {
    this._data = data;
    this._indexMap = index;
    this._callback = null;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb) {
    this._callback = cb;
  }

  getSize() {
    if (this._indexMap === null) {
      return this._data.getSize();
    }

    return this._indexMap.length;
  }

  getObjectAt(index) {
    if (this._indexMap === null) {
      return this._data.getObjectAt(index);
    }

    return this._data.getObjectAt(
      this._indexMap[index]
    );
  }
}

const DataTable = DataCtxt(Table);

class FilterTable extends React.Component {
  constructor(props) {
    super(props);

    const { data, filters, ...other } = props;
    this.state = {
      rawData: data,
      filteredData: new DataListWrapper(props.data),
      filters: Object.assign({}, filters),
      other
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.state.filters)){
      this.setState({
        filters: Object.assign({}, nextProps.filters),
      });
      this.filter();
    }
  }

  filter() {
    // Get and prep filters
    let filters = {};
    for (let key in this.props.filters) {
      if (this.props.filters.hasOwnProperty(key) &&
          this.props.filters[key] !== ''){
        filters[key] = this.props.filters[key];
      }
    }
    Object.keys(filters).map((key) => {
      filters[key] = filters[key].toLowerCase();
      return (key);
    });

    const match = (haystack, needle) =>
      haystack.toLowerCase().indexOf(needle) !== -1;

    if (Object.keys(filters).length > 0) {
      const filteredIndexes = [];
      for (let index = 0; index < this.state.rawData.getSize(); index += 1) {
        const row = this.state.rawData.getObjectAt(index);

        // Loop through all the filters and check if there's a match
        const found = Object.keys(filters)
          .map((varName) => {
            const value = row[varName];

            // If we have a set of values e.g. an array
            //  If you're using immutablejs then you can just use List
            //  This can be useful when you have more complex matches
            if (value instanceof Array) {
              const matches = value.map(x => match(x, filters[varName])).filter(x => x === true);
              // If all filters were identified then set this to true
              return (matches.length !== value.length);
            }

            return (!match(value, filters[varName]));
          })
          .filter(x => x === true)
          .length === 0;

        if (found) {
          filteredIndexes.push(index);
        }
      }

      // Set the data filtering
      this.setState({
        filteredData: new DataListWrapper(this.state.rawData, filteredIndexes)
      })
    } else {
      this.setState({
        filteredData: new DataListWrapper(this.state.rawData, null)
      })
    }
  }

  render() {
    return(
      <DataTable
        data={this.state.filteredData}
        rowsCount={this.state.filteredData.getSize()}
        {...this.state.other}
      >
        {this.props.children}
      </DataTable>
    );
  }
}

FilterTable.propTypes = {
  filters: React.PropTypes.object,
  data: React.PropTypes.instanceOf(FakeObjectDataListStore),
}

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
