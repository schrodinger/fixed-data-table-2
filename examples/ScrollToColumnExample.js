/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ScrollToColumnExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);
    var data = this._dataList.getAll();

    this.state = {
      filteredDataList: this._dataList,
      currentIndex: 0,
      columns: [],
      fixedColumnsCount: 2,
      fixedRightColumnsCount: 0,
      scrollableColumnsCount: 10 - 2 - 0,
    };
    this.state.columns = [
      {
        columnKey: 'firstName',
        header: <DataCell>First Name [0]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        fixed: true,
        width: 100,
      },
      {
        columnKey: 'lastName',
        header: <DataCell>Last Name [1]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        fixed: true,
        width: 100,
      },
      {
        columnKey: 'city',
        header: <DataCell>City [2]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 100,
      },
      {
        columnKey: 'street',
        header: <DataCell>Street [3]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'zipCode',
        header: <DataCell>Zip Code [4]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'bs',
        header: <DataCell>BS [5]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'catchPhrase',
        header: <DataCell>Catch Phrase [6]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'companyName',
        header: <DataCell>Company Name [7]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'words',
        header: <DataCell>Words [8]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
      {
        columnKey: 'sentence',
        header: <DataCell>Sentence [9]</DataCell>,
        cell: <TextCell data={this.state.filteredDataList} />,
        width: 200,
      },
    ];

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    const newIndex = parseInt(e.target.value) || 0;
    this.setState({
      currentIndex: newIndex,
    });
  }

  render() {
    var { filteredDataList, currentIndex } = this.state;

    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Jump to column index"
        />
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          scrollToColumn={currentIndex}
          headerHeight={50}
          width={1000}
          height={500}
          scrollableColumnsCount={this.state.scrollableColumnsCount}
          getScrollableColumn={(i) =>
            this.state.columns[this.state.fixedColumnsCount + i]
          }
          getFixedColumn={(i) => this.state.columns[i]}
          fixedColumnsCount={this.state.fixedColumnsCount}
          fixedRightColumnsCount={this.state.fixedRightColumnsCount}
          getFixedRightColumn={(i) =>
            this.state.columns[
              this.state.fixedColumnsCount +
                this.state.scrollableColumnsCount +
                i
            ]
          }
          {...this.props}
        />
      </div>
    );
  }
}

export default ScrollToColumnExample;
