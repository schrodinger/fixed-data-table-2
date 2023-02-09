/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

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
    const { onSortChange, sortDir, children, ...props } = this.props;
    return (
      <DataCell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </DataCell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir
          ? reverseSortDirection(this.props.sortDir)
          : SortTypes.DESC
      );
    }
  }
}

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

class SortExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);

    this._defaultSortIndexes = [];
    const size = this._dataList.getSize();
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(columnKey, sortDir) {
    const sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      const valueA = this._dataList.getObjectAt(indexA)[columnKey];
      const valueB = this._dataList.getObjectAt(indexB)[columnKey];
      const sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.DESC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  render() {
    const { sortedDataList, colSortDirs } = this.state;
    return (
      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={50}
        width={1000}
        height={500}
        columnsCount={5}
        getColumn={(i) =>
          [
            {
              columnKey: 'id',
              header: (
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.id}
                >
                  id
                </SortHeaderCell>
              ),
              cell: <TextCell data={sortedDataList} />,
              width: 100,
            },
            {
              columnKey: 'firstName',
              header: (
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.firstName}
                >
                  First Name
                </SortHeaderCell>
              ),
              cell: <TextCell data={sortedDataList} />,
              width: 200,
            },
            {
              columnKey: 'lastName',
              header: (
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.lastName}
                >
                  Last Name
                </SortHeaderCell>
              ),
              cell: <TextCell data={sortedDataList} />,
              width: 200,
            },
            {
              columnKey: 'city',
              header: (
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.city}
                >
                  City
                </SortHeaderCell>
              ),
              cell: <TextCell data={sortedDataList} />,
              width: 200,
            },
            {
              columnKey: 'companyName',
              header: (
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.companyName}
                >
                  Company Name
                </SortHeaderCell>
              ),
              cell: <TextCell data={sortedDataList} />,
              width: 200,
            },
          ][i]
        }
        {...this.props}
      />
    );
  }
}

export default SortExample;
