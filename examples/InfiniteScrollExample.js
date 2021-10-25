/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { PagedCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class PagedData {
  constructor(callback) {
    this._dataList = new FakeObjectDataListStore(2000);
    this._end = 50;
    this._pending = false;
    this._dataVersion = 0;
    this._callback = callback;
  }

  getDataVersion() {
    return this._dataVersion;
  }

  getSize() {
    return 2000;
  }

  fetchRange(end) {
    if (this._pending) {
      return;
    }

    this._pending = true;
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      this._pending = false;
      this._end = end;
      this._dataVersion++;
      this._callback(end);
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

class InfiniteScrollExample extends React.Component {
  constructor(props) {
    super(props);

    this._updateData = this._updateData.bind(this);
    this.state = {
      pagedData: new PagedData(this._updateData),
      end: 50,
    };
  }

  //Just need to force a refresh
  _updateData(end) {
    this.setState({
      end: end,
    });
  }

  render() {
    var { pagedData } = this.state;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={pagedData.getSize()}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}
        >
          <Column
            header={<DataCell></DataCell>}
            cell={({ rowIndex }) => <DataCell>{rowIndex}</DataCell>}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<DataCell>First Name</DataCell>}
            cell={<PagedCell data={pagedData} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<DataCell>Last Name</DataCell>}
            cell={<PagedCell data={pagedData} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<DataCell>City</DataCell>}
            cell={<PagedCell data={pagedData} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<DataCell>Street</DataCell>}
            cell={<PagedCell data={pagedData} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<DataCell>Zip Code</DataCell>}
            cell={<PagedCell data={pagedData} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

export default InfiniteScrollExample;
