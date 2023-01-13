/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class FooterExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(5),
    };
  }

  render() {
    const { dataList } = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={450}
        footerHeight={30}
        columnsCount={1}
        getColumn={(i) =>
          [
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              footer: <DataCell>sample footer</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 200,
            },
          ][i]
        }
      />
    );
  }
}

export default FooterExample;
