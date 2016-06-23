/**
 * Copyright Schrodinger, LLC
 */

"use strict";

let FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
let FixedDataTable = require('fixed-data-table-2');
let React = require('react');

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class TouchScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(2000)
    }
  }

  render() {
    let {dataList, collapsedRows} = this.state;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={dataList.getSize()}
          headerHeight={50}
          touchScrollEnabled={true}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={dataList} col="firstName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={dataList} col="lastName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>City</Cell>}
            cell={<TextCell data={dataList} col="city" />}
            width={100}
          />
          <Column
            header={<Cell>Street</Cell>}
            cell={<TextCell data={dataList} col="street" />}
            width={200}
          />
          <Column
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={dataList} col="zipCode" />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

module.exports = TouchScrollExample;
