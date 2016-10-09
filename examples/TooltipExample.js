/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { ImageCell, TooltipCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const ReactTooltip = require('react-tooltip');
const {findDOMNode} = require('react-dom');

class TooltipExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const {dataList} = this.state;
    return (
      <div>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="avatar"
            cell={<ImageCell data={dataList} />}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TooltipCell data={dataList} />}
            fixed={true}
            width={150}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TooltipCell data={dataList} />}
            width={150}
          />
          <Column
            columnKey="companyName"
            header={<Cell>Company</Cell>}
            cell={<TooltipCell data={dataList} />}
            width={200}
          />
        </Table>
        <ReactTooltip />
      </div>
    );
  }
}

module.exports = TooltipExample;
