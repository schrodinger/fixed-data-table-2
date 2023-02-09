/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(this._indexMap[index]);
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

    const filterBy = e.target.value.toLowerCase();
    const size = this._dataList.getSize();
    const filteredIndexes = [];
    for (const index = 0; index < size; index++) {
      const { firstName } = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  render() {
    const { filteredDataList } = this.state;
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
          columnsCount={6}
          getColumn={(i) =>
            [
              {
                columnKey: 'avatar',
                cell: <ImageCell data={filteredDataList} />,
                fixed: true,
                width: 50,
              },
              {
                columnKey: 'firstName',
                header: <DataCell>First Name</DataCell>,
                cell: <TextCell data={filteredDataList} />,
                fixed: true,
                width: 100,
              },
              {
                columnKey: 'lastName',
                header: <DataCell>Last Name</DataCell>,
                cell: <TextCell data={filteredDataList} />,
                fixed: true,
                width: 100,
              },
              {
                columnKey: 'city',
                header: <DataCell>City</DataCell>,
                cell: <TextCell data={filteredDataList} />,
                width: 100,
              },
              {
                columnKey: 'street',
                header: <DataCell>Street</DataCell>,
                cell: <TextCell data={filteredDataList} />,
                width: 200,
              },
              {
                columnKey: 'zipCode',
                header: <DataCell>Zip Code</DataCell>,
                cell: <TextCell data={filteredDataList} />,
                width: 200,
              },
            ][i]
          }
          {...this.props}
        />
      </div>
    );
  }
}

export default FilterExample;
