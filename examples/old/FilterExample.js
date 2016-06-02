/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var ExampleImage = require('../helpers/ExampleImage');
var FakeObjectDataListStore = require('../helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var Table = FixedDataTable.Table;

var ROWS = 1000000;

function renderImage(/*string*/ cellData) {
  return <ExampleImage src={cellData} />;
}

var FilterExample = React.createClass({
  getInitialState() {
    return {
      rows : new FakeObjectDataListStore().getAll(),
      filteredRows: null,
      filterBy: null
    };
  },

  componentWillMount() {
    this._filterRowsBy(this.state.filterBy);
  },

  _filterRowsBy(filterBy) {
    var rows = this.state.rows.slice();
    var filteredRows = filterBy ? rows.filter(function(row){
      return row['firstName'].toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
    }) : rows;

    this.setState({
      filteredRows,
      filterBy,
    });
  },

  _rowGetter(rowIndex) {
    return this.state.filteredRows[rowIndex];
  },

  _onFilterChange(e) {
    this._filterRowsBy(e.target.value);
  },

	render() {
		return (
      <div>
        <input onChange={this._onFilterChange} placeholder='Filter by First Name' />
        <br />
        <Table
          rowHeight={50}
          rowGetter={this._rowGetter}
          rowsCount={this.state.filteredRows.length}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cellRenderer={renderImage}
            dataKey='avartar'
            fixed={true}
            label=''
            width={50}
          />
          <Column
            dataKey='firstName'
            fixed={true}
            label='First Name'
            width={100}
          />
          <Column
            dataKey='lastName'
            fixed={true}
            label='Last Name'
            width={100}
          />
          <Column
            dataKey='city'
            label='City'
            width={100}
          />
          <Column
            label='Street'
            width={200}
            dataKey='street'
          />
          <Column
            label='Zip Code'
            width={200}
            dataKey='zipCode'
          />
        </Table>
      </div>
    );
	},
});

module.exports = FilterExample;
