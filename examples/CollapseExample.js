/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const {CollapseCell, TextCell} = require('./helpers/cells');
const {Table, Column, Cell} = require('fixed-data-table-2');
const React = require('react');

class CollapseExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedRows: new Set(),
      dataList: new FakeObjectDataListStore(2000)
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._rowHeightGetter = this._rowHeightGetter.bind(this);
    this._rowDropdownGetter = this._rowDropdownGetter.bind(this);
    this._rowDropdownHeightGetter = this._rowDropdownHeightGetter.bind(this);
  }

  _handleCollapseClick(rowIndex) {
    let {collapsedRows} = this.state;
    collapsedRows.has(rowIndex) ? collapsedRows.delete(rowIndex) : collapsedRows.add(rowIndex);
    this.setState({
      collapsedRows: collapsedRows
    });
  }

  _rowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 50.1 : 50;
  }

  _rowDropdownHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 50 : 0;
  }

  _rowDropdownGetter(index) {
    var style = {
      height: '100%',
      width: '100%',
      textAlign: 'center',
      lineHeight: '50px',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#777',
      background: '#CCC',
      letterSpacing: '1px'
    };

    return (
      <div style={style}>
        {index}
      </div>
    )
  }

  render() {
    let {dataList, collapsedRows} = this.state;

    return (
      <div>
        <Table
          rowHeight={50}
          rowsCount={dataList.getSize()}
          rowHeightGetter={this._rowHeightGetter}
          rowDropdownHeightGetter={this._rowDropdownHeightGetter}
          rowDropdownGetter={this._rowDropdownGetter}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows}/>}
            fixed={true}
            width={30}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={dataList}/>}
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
        </Table>
      </div>
    );
  }
}

module.exports = CollapseExample;
