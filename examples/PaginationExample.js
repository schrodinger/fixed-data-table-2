/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { PagedCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class PagedData {
  constructor(callback) {
    this._dataList = new FakeObjectDataListStore(2000);
    this._end = 50;
    this._pending = false;
    this._dataVersion = 0;
    this._callback = callback;
  }

  getDataVersion() {
    return this._dataVersion;
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
      this._dataVersion++;
      this._callback(end)
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

class PaginationExample extends React.Component {
  constructor(props) {
    super(props);

    this._updateData = this._updateData.bind(this);
    this.state = {
      pagedData: new PagedData(this._updateData),
      end: 50
    };
  }

  //Just need to force a refresh
  _updateData(end) {
    this.setState({
      end: end
    });
  }

  render() {
    var {pagedData} = this.state;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={pagedData.getSize()}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            header={<Cell></Cell>}
            cell={({rowIndex}) => (<Cell>{rowIndex}</Cell>)}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<PagedCell data={pagedData} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<PagedCell data={pagedData} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<PagedCell data={pagedData} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<PagedCell data={pagedData} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<PagedCell data={pagedData} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

module.exports = PaginationExample;
