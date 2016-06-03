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

const CollapseCell = ({rowIndex, collapsedRows, callback, ...props}) => (
  <Cell {...props}>
    <a onClick={() => callback(rowIndex)}>
      {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
    </a>
  </Cell>
);

class CollapseExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedRows: new Set(),
      dataList: new FakeObjectDataListStore(2000)
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._rowHeightGetter = this._rowHeightGetter.bind(this);
  }

  _handleCollapseClick(rowIndex) {
    let {collapsedRows} = this.state;
    collapsedRows.has(rowIndex) ? collapsedRows.delete(rowIndex) : collapsedRows.add(rowIndex);
    this.setState({
      collapsedRows: collapsedRows
    });
  }

  _rowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 100 : 50;
  }

  render() {
    let {dataList, collapsedRows} = this.state;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={dataList.getSize()}
          rowHeightGetter={this._rowHeightGetter}
          rowClass
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
            fixed={true}
            width={30}
          />
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

module.exports = CollapseExample;
