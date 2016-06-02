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

function colorizeText(/*string*/ str, key, data, index) {
  var val, n = 0;
  return str.split('').map((letter) => {
    val = index * 70 + n++;
    var color = 'hsl(' + val + ', 100%, 50%)';
    return <span style={{color}} key={n}>{letter}</span>;
  });
}

var FlexGrowExample = React.createClass({
  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore(ROWS)
    };
  },

  _rowGetter(index) {
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
          dataKey="firstName"
          fixed={true}
          label="First Name"
          width={100}
        />
        <Column
          label="Sentence! (flexGrow greediness=2)"
          cellRenderer={colorizeText}
          dataKey="sentence"
          flexGrow={2}
          width={200}
        />
        <Column
          flexGrow={1}
          label="Company (flexGrow greediness=1)"
          width={200}
          dataKey="companyName"
        />
        <Column
          dataKey="lastName"
          label="Last Name"
          width={100}
        />
      </Table>
    );
  }
});

module.exports = FlexGrowExample;
