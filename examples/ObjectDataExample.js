/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const _ = require('lodash');
const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const {DateCell, ImageCell, LinkCell, TextCell} = require('./helpers/cells');
const {Table, Column, Cell} = require('fixed-data-table-2');
const React = require('react');

const justGiveMeAValue = {
  getObjectAt: () => {
    return new Proxy({}, {get: () => 'A value'});
  },
  size: () => 1000000,
};

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    var {dataList} = this.state;
    const extraColumns = _.times(200, (i) =>
      <Column
        key={i}
        columnKey={'col' + i}
        header={<Cell>A value</Cell>}
        cell={<TextCell data={justGiveMeAValue}/>}
        width={200}
      />);
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="avatar"
          cell={<ImageCell data={dataList}/>}
          fixed={true}
          width={50}
        />
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList}/>}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList}/>}
          fixed={true}
          width={100}
        />
        <Column
          columnKey="city"
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList}/>}
          width={100}
        />
        <Column
          columnKey="street"
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList}/>}
          width={200}
        />
        <Column
          columnKey="zipCode"
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList}/>}
          width={200}
        />
        <Column
          columnKey="email"
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList}/>}
          width={200}
        />
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList}/>}
          width={200}
        />
        {extraColumns}
      </Table>
    );
  }
}

module.exports = ObjectDataExample;
