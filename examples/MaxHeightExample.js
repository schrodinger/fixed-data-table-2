/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class MaxHeightExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(5),
    };
  }

  addRow = () => {
    this.state.dataList.setSize(this.state.dataList.getSize() + 1);
    this.forceUpdate();
  };

  resetRows = () => {
    this.state.dataList.setSize(5);
    this.forceUpdate();
  };

  render() {
    var { dataList } = this.state;
    return (
      <div>
        <a onClick={this.addRow}>Add Row</a>
        <a style={{ marginLeft: 100 }} onClick={this.resetRows}>
          Reset Rows
        </a>
        <br />
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={400}
          maxHeight={450}
          footerHeight={30}
        >
          <Column
            columnKey="date"
            header={<DataCell>DOB</DataCell>}
            footer={<DataCell>sample footer</DataCell>}
            cell={<DateCell data={dataList} />}
            width={500}
          />
        </Table>
      </div>
    );
  }
}

export default MaxHeightExample;
