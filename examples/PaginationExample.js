/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const { DataCtxt } = require('./helpers/HOC');
const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
// const { PagedCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class PagedData {
  constructor() {
    this._dataList = new FakeObjectDataListStore(2000);
    this._end = 50;
    this._pending = false;
  }

  // The callback is used for events when data has been loaded
  setCallback(callback) {
    this._callback = callback;
  }

  getSize() {
    return 2000;
  }

  fetchRange(end) {
    if (this._pending) {
      return;
    }

    this._pending = true;
    return new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => {
      this._pending = false;
      this._end = end;
      this._callback()
    });
  }

  getObjectAt(index) {
    if (index >= this._end) {
      this.fetchRange(Math.min(2000, index + 50));
      return null;
    }
    return this._dataList.getObjectAt(index);
  }
}

const dataProp = React.PropTypes.instanceOf(PagedData).isRequired;

const PagedCell = ({rowIndex, columnKey, ...props}, {data}) => {
  const rowObject = data.getObjectAt(rowIndex);
  return (
    <Cell {...props}>
      {rowObject ? rowObject[columnKey] : 'pending'}
    </Cell>
  );
};

PagedCell.contextTypes = {
  data: dataProp,
};


const PaginationExample = (props, {data}) => (
  <div>
    <Table
      rowHeight={50}
      rowsCount={data.getSize()}
      headerHeight={50}
      width={1000}
      height={500}
      {...props}>
      <Column
        header={<Cell></Cell>}
        cell={({rowIndex}) => (<Cell>{rowIndex}</Cell>)}
        fixed={true}
        width={50}
        />
      <Column
        columnKey="firstName"
        header={<Cell>First Name</Cell>}
        cell={<PagedCell />}
        fixed={true}
        width={100}
        />
      <Column
        columnKey="lastName"
        header={<Cell>Last Name</Cell>}
        cell={<PagedCell />}
        fixed={true}
        width={100}
        />
      <Column
        columnKey="city"
        header={<Cell>City</Cell>}
        cell={<PagedCell />}
        width={100}
        />
      <Column
        columnKey="street"
        header={<Cell>Street</Cell>}
        cell={<PagedCell />}
        width={200}
        />
      <Column
        columnKey="zipCode"
        header={<Cell>Zip Code</Cell>}
        cell={<PagedCell />}
        width={200}
        />
    </Table>
  </div>);

PaginationExample.contextTypes = {
  data: dataProp,
};

const data = new PagedData();
module.exports = DataCtxt(PaginationExample, data);
