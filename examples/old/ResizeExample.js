/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var FakeObjectDataListStore = require('../helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var Table = FixedDataTable.Table;

var ROWS = 1000000;

var columnWidths = {
  firstName: 240,
  lastName: 150,
  sentence: 140,
  companyName: 60,
};
var isColumnResizing;

var ResizeExample = React.createClass({
  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore(ROWS),
      columnWidths: columnWidths
    }
  },

  _rowGetter(index) {
    return this.state.dataList.getObjectAt(index);
  },

  _onColumnResizeEndCallback(newColumnWidth, dataKey) {
    var columnWidths = this.state.columnWidths;
    columnWidths[dataKey] = newColumnWidth;
    isColumnResizing = false;
    this.setState({
      columnWidths
    })
  },

  render() {
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowGetter={this._rowGetter}
        rowsCount={this.state.dataList.getSize()}
        isColumnResizing={isColumnResizing}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          dataKey="firstName"
          fixed={true}
          label="First Name"
          width={columnWidths['firstName']}
          isResizable={true}
        />
        <Column
          label="Last Name (min/max constrained)"
          dataKey="lastName"
          width={columnWidths['lastName']}
          isResizable={true}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          label="Company"
          dataKey="companyName"
          width={columnWidths['companyName']}
          isResizable={true}
        />
        <Column
          label="Sentence"
          dataKey="sentence"
          width={columnWidths['sentence']}
          isResizable={true}
        />
      </Table>
    );
  }
});

module.exports = ResizeExample;
