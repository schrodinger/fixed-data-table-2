/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table-2');
var React = require('react');

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => {
  var rowObject = data.getObjectAt(rowIndex);
  return (
    <Cell {...props}>
      {rowObject ? rowObject[col] : 'pending'}
    </Cell>
  );
};

class PagedData {
  constructor(callback) {
    this._dataList = new FakeObjectDataListStore(2000);
    this._end = 50;
    this._pending = false;
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
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={pagedData} col="firstName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={pagedData} col="lastName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>City</Cell>}
            cell={<TextCell data={pagedData} col="city" />}
            width={100}
          />
          <Column
            header={<Cell>Street</Cell>}
            cell={<TextCell data={pagedData} col="street" />}
            width={200}
          />
          <Column
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={pagedData} col="zipCode" />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

module.exports = PaginationExample;
