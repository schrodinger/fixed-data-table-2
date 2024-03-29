/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class InfiniteScrollExample extends React.Component {
  constructor(props) {
    super(props);

    this.dataList = new FakeObjectDataListStore(50);
    this.state = {
      rowsCount: this.dataList.getSize(),
    };
  }

  onScrollEnd = (scrollX, scrollY, firstRowIndex, lastRowIndex) => {
    // check if user scrolled near the end of the table
    if (lastRowIndex + 10 >= this.state.rowsCount) {
      this.fetchData();
    }
  };

  // Fetch data for 50 more rows
  fetchData = () => {
    this.dataList.setSize(this.state.rowsCount + 50);
    this.setState(({ rowsCount }) => ({
      rowsCount: rowsCount + 50,
    }));
  };

  render() {
    const data = this.dataList;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={this.state.rowsCount}
          headerHeight={50}
          width={1000}
          height={500}
          onScrollEnd={this.onScrollEnd}
          {...this.props}
        >
          <Column
            header={<DataCell></DataCell>}
            cell={(props) => <DataCell {...props}>{props.rowIndex}</DataCell>}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<DataCell>First Name</DataCell>}
            cell={<TextCell data={data} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<DataCell>Last Name</DataCell>}
            cell={<TextCell data={data} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<DataCell>City</DataCell>}
            cell={<TextCell data={data} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<DataCell>Street</DataCell>}
            cell={<TextCell data={data} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<DataCell>Zip Code</DataCell>}
            cell={<TextCell data={data} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

export default InfiniteScrollExample;
