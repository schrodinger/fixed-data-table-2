/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const { DataCtxt } = require('./helpers/HOC');
const ExampleImage = require('./helpers/ExampleImage');
const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { ImageCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class DataListWrapper {
  constructor(data) {
    this._data = data;
    this._indexMap = null;
    this._callback = null;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb) {
    this._callback = cb;
  }

  setIndexMap(index) {
    this._indexMap = index;
    this._callback();
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

    this.state = {
      rawData: props.data,
      filteredData: DataListWrapper(props.data),
      filters: props.filters
    };

    this.updateFilterState = this.updateFilterState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.filters) !== JSON.stringify(state.filters)){
        this.filter()
      }
  }

  filter() {

    // Get and prep filters
    let filters = {};
    for (let key in this.state.filters) {
      if (this.state.filters.hasOwnProperty(key) &&
          this.state.filters[key] !== ''){
        filters[key] = this.state.filters[key];
      }
    }
    Object.keys(filters).map((key) => {
      filters[key] = filters[key].toLowerCase();
      return (key);
    });

    const noMatch = (haystack, needle) => haystack.toLowerCase().indexOf(needle) !== -1;

    if (Object.keys(filters).length > 0) {
      const data = this.state.rawData;

      const filteredIndexes = [];
      for (let index = 0; index < data.getSize(); index += 1) {
        const row = data.getObjectAt(index);

        // Loop through all the filters and check if there's a match
        const found = Object.keys(filters)
          .map((varName) => {
            const value = row.get(varName);
            if (value instanceof List) {
              if (value.map(x => noMatch(x, filters[varName])).filter(x => x === false).size > 0) {
                return (false);
              }
            } else if (!noMatch(value, filters[varName])) {
              return (false);
            }
            return (true);
          })
          .filter(x => x === false) // Select only those where no match was found
          .length === 0; // If we didn't find any non-matching criteria then this was a success

        if (found) {
          filteredIndexes.push(index);
        }
      }

      // Set the data filtering
      this.state.filteredData.setIndexMap(filteredIndexes);
    } else {
      this.state.filteredData.setIndexMap(null);
    }
  }

  render() {
    return(
      <DataTable
        data={this.state.filteredData}
        {...this.props}
      >
        {this.props.children}
      </DataTable>
    )
  }
}

class FilterExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);
    this.state = {
      filteredDataList: this._dataList,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  render() {
    var {filteredDataList} = this.state;
    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />
        <FilterTable
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="avatar"
            cell={<ImageCell data={filteredDataList} />}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
        </FilterTable>
      </div>
    );
  }
}

module.exports = FilterExample;
