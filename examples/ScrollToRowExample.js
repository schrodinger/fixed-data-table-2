/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ScrollToRowExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);

    this.state = {
      filteredDataList: this._dataList,
      currentIndex: 0,
      matchedRows: [],
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
    this._prevSearch = this._prevSearch.bind(this);
    this._nextSearch = this._nextSearch.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        currentIndex: 0,
        matchedRows: [],
      });
    }

    const filterBy = e.target.value.toLowerCase();
    const size = this._dataList.getSize();
    const filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      const { firstName } = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      currentIndex: 0,
      matchedRows: filteredIndexes,
    });
  }

  _prevSearch() {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
  }

  _nextSearch() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
  }

  _rowClassNameGetter(rowIndex) {
    if (rowIndex === this.state.matchedRows[this.state.currentIndex]) {
      return 'active-row';
    }
    if (this.state.matchedRows.includes(rowIndex)) {
      return 'highlight-row';
    }
  }

  render() {
    const { filteredDataList, currentIndex, matchedRows } = this.state;

    const search = matchedRows.length ? (
      <span>
        <button disabled={currentIndex === 0} onClick={this._prevSearch}>
          {'<'}
        </button>
        {currentIndex + 1} / {matchedRows.length}
        <button
          disabled={currentIndex === matchedRows.length - 1}
          onClick={this._nextSearch}
        >
          {'>'}
        </button>
        <br />
      </span>
    ) : null;

    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />
        {search}
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          rowClassNameGetter={this._rowClassNameGetter}
          scrollToRow={matchedRows[currentIndex]}
          rowClass
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

export default ScrollToRowExample;
