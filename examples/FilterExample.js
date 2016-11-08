/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const ExampleImage = require('./helpers/ExampleImage');
const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { ImageCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
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
        <Table
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
        </Table>
      </div>
    );
  }
}

module.exports = FilterExample;
