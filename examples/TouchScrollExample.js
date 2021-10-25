/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class TouchScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(2000),
    };
  }

  render() {
    const { dataList } = this.state;

    return (
      <Table
        rowHeight={50}
        rowsCount={dataList.getSize()}
        headerHeight={50}
        touchScrollEnabled={true}
        width={1000}
        height={500}
        {...this.props}
      >
        <Column
          columnKey="firstName"
          header={<DataCell>First Name</DataCell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="lastName"
          header={<DataCell>Last Name</DataCell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="city"
          header={<DataCell>City</DataCell>}
          cell={<TextCell data={dataList} />}
          width={100}
        />
        <Column
          columnKey="street"
          header={<DataCell>Street</DataCell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="zipCode"
          header={<DataCell>Zip Code</DataCell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }
}

export default TouchScrollExample;
