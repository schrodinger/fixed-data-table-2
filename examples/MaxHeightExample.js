/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { DateCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class MaxHeightExample extends React.Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.state = {
      dataList: new FakeObjectDataListStore(5),
    };
  }

  addRow() {
    this.setState({
      dataList: new FakeObjectDataListStore(this.state.dataList.getSize() + 1),
    });
  }

  render() {
    var {dataList} = this.state;
    return (
      <div>
        <a onClick={this.addRow}>Add Row</a>
        <br />
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={400}
          maxHeight={450}
          footerHeight={30}>
          <Column
            columnKey="date"
            header={<Cell>DOB</Cell>}
            footer={<Cell>sample footer</Cell>}
            cell={<DateCell data={dataList} />}
            width={500}
          />
        </Table>
      </div>
    );
  }
}

module.exports = MaxHeightExample;
