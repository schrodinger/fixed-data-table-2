/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var ExampleImage = require('../helpers/ExampleImage');
var FakeObjectDataListStore = require('../helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table-2');
var React = require('react');

var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;

var ROWS = 1000000;

function renderImage(/*string*/ cellData) {
  return <ExampleImage src={cellData} />;
}

function renderLink(/*string*/ cellData) {
  return <a href="#">{cellData}</a>;
}

function renderDate(/*object*/ cellData) {
  return <span>{cellData.toLocaleString()}</span>;
}

var ObjectDataExample = React.createClass({
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
        rowHeight={50}
        headerHeight={50}
        rowGetter={this._rowGetter}
        rowsCount={this.state.dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          cellRenderer={renderImage}
          dataKey="avatar"
          fixed={true}
          label=""
          width={50}
        />
        <Column
          dataKey="firstName"
          fixed={true}
          label="First Name"
          width={100}
        />
        <Column
          dataKey="lastName"
          fixed={true}
          label="Last Name"
          width={100}
        />
        <Column
          dataKey="city"
          label="City"
          width={100}
        />
        <Column
          label="Street"
          width={200}
          dataKey="street"
        />
        <Column
          label="Zip Code"
          width={200}
          dataKey="zipCode"
        />
        <Column
          cellRenderer={renderLink}
          label="Email"
          width={200}
          dataKey="email"
        />
        <Column
          cellRenderer={renderDate}
          label="DOB"
          width={200}
          dataKey="date"
        />
      </Table>
    );
  },
});

module.exports = ObjectDataExample;
