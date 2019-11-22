/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';

class TouchScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(2000)
    }
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
          header={<Cell>First Name</Cell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="city"
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} />}
          width={100}
        />
        <Column
          columnKey="street"
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="zipCode"
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }
}

export default TouchScrollExample;
