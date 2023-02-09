/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell, ColoredTextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class FlexGrowExample extends React.Component {
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
        columnsCount={4}
        getColumn={(i) =>
          [
            {
              columnKey: 'firstName',
              header: <DataCell>First Name</DataCell>,
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'sentence',
              header: <DataCell>Sentence! (flexGrow greediness=2)</DataCell>,
              cell: <ColoredTextCell data={dataList} />,
              flexGrow: 2,
              width: 200,
            },
            {
              columnKey: 'companyName',
              header: <DataCell>Company (flexGrow greediness=1)</DataCell>,
              cell: <TextCell data={dataList} />,
              flexGrow: 1,
              width: 200,
            },
            {
              columnKey: 'lastName',
              width: 100,
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
            },
          ][i]
        }
        {...this.props}
      />
    );
  }
}

export default FlexGrowExample;
