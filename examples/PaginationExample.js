/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
// const { PagedCell } = require('./helpers/cells');
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

const dataProp = React.PropTypes.instanceOf(PagedData).isRequired;

function ContextHOC(Wrapped) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this._updateData = this._updateData.bind(this);
      this.state = {
        data: new PagedData(this._updateData),
        end: 50
      };
    }

    //Just need to force a refresh
    _updateData(end) {
      this.setState({
        end: end
      });
    }

    getChildContext() {
      return {
        data: this.state.data
      };
    }

    render() {
      return <Wrapped {... this.props}  />
    }
  };

  ContextClass.childContextTypes = {
    data: React.PropTypes.instanceOf(PagedData),
  };

  return ContextClass;
}


const PendingCell = ({rowIndex, columnKey, dataVersion, ...props}, {data}) => {
  const rowObject = data.getObjectAt(rowIndex);
  return (
    <Cell {...props}>
      {rowObject ? rowObject[columnKey] : 'pending'}
    </Cell>
  );
};

PendingCell.contextTypes = {
  data: dataProp,
};

const PagedCell = (props, {data}) => {
  const dataVersion = data.getDataVersion();
  return (
    <PendingCell
      dataVersion={dataVersion}
      {...props}>
    </PendingCell>
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

module.exports = ContextHOC(PaginationExample);
