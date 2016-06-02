/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var FakeObjectDataListStore = require('../helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var Table = FixedDataTable.Table;
var ColumnGroup = FixedDataTable.ColumnGroup;

var ROWS = 1000000;

var ColumnGroupsExample = React.createClass({
  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore(ROWS)
    }
  },

  _rowGetter(index){
    return this.state.dataList.getObjectAt(index);
  },

  render() {
    return (
      <Table
        rowHeight={30}
        groupHeaderHeight={30}
        headerHeight={30}
        rowGetter={this._rowGetter}
        rowsCount={this.state.dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}>
        <ColumnGroup
          fixed={true}
          label="Name">
          <Column
            fixed={true}
            dataKey="firstName"
            label="First Name"
            width={150}
          />
          <Column
            fixed={true}
            label="Last Name"
            dataKey="lastName"
            width={150}
          />
        </ColumnGroup>
        <ColumnGroup label="About">
          <Column
            label="Company"
            dataKey="companyName"
            flexGrow={1}
            width={150}
          />
          <Column
            label="Sentence"
            dataKey="sentence"
            flexGrow={1}
            width={150}
          />
        </ColumnGroup>
      </Table>
    );
  }
});

module.exports = ColumnGroupsExample;
