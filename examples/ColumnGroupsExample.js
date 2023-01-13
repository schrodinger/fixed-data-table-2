/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ColumnGroupsExample extends React.Component {
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
        rowHeight={30}
        groupHeaderHeight={30}
        headerHeight={30}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        columnsCount={4}
        getColumn={(i) =>
          [
            {
              columnGroupIndex: 0,
              columnKey: 'firstName',
              fixed: true,
              header: <DataCell>First Name</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 150,
            },
            {
              columnGroupIndex: 0,
              columnKey: 'lastName',
              fixed: true,
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 150,
            },
            {
              columnGroupIndex: 1,
              columnKey: 'companyName',
              header: <DataCell>Company</DataCell>,
              cell: <TextCell data={dataList} />,
              flexGrow: 1,
              width: 150,
            },
            {
              columnGroupIndex: 1,
              columnKey: 'sentence',
              header: <DataCell>Sentence</DataCell>,
              cell: <TextCell data={dataList} />,
              flexGrow: 1,
              width: 150,
            },
          ][i]
        }
        getColumnGroup={(i) =>
          [
            {
              fixed: true,
              header: <DataCell>Name</DataCell>,
            },
            {
              header: <DataCell>About</DataCell>,
            },
          ][i]
        }
        {...this.props}
      />
    );
  }
}

export default ColumnGroupsExample;
