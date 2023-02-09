/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell, ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const { dataList } = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        columnsCount={8}
        getColumn={(i) =>
          [
            {
              columnKey: 'avatar',
              cell: <ImageCell data={dataList} />,
              fixed: true,
              width: 50,
            },
            {
              columnKey: 'firstName',
              header: <DataCell>First Name</DataCell>,
              cell: <LinkCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'lastName',
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'city',
              header: <DataCell>City</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'street',
              header: <DataCell>Street</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'zipCode',
              header: <DataCell>Zip Code</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'email',
              header: <DataCell>Email</DataCell>,
              cell: <LinkCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 200,
            },
          ][i]
        }
        {...this.props}
      />
    );
  }
}

export default ObjectDataExample;
