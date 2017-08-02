/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { DateCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class FooterExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(5),
    };
  }

  render() {
    var {dataList} = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={450}
        footerHeight={30}>
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          footer={<Cell>sample footer</Cell>}
          cell={<DateCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }
}

module.exports = FooterExample;
