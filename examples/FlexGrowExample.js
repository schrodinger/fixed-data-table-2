/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell, ColoredTextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class FlexGrowExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    var {dataList} = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="sentence"
          header={<Cell>Sentence! (flexGrow greediness=2)</Cell>}
          cell={<ColoredTextCell data={dataList} />}
          flexGrow={2}
          width={200}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company (flexGrow greediness=1)</Cell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={200}
        />
        <Column
          columnKey="lastName"
          width={100}
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
        />
      </Table>
    );
  }
}

module.exports = FlexGrowExample;
