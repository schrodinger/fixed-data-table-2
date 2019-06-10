/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell } = require('./helpers/cells');
const { Table, Column, ColumnGroup, Cell } = require('fixed-data-table-2');
const React = require('react');

class ColumnVirtualizationExample extends React.Component {
  constructor(props) {
    super(props);

    const cellRenderer = ({columnKey, rowIndex}) => `${columnKey}, ${rowIndex}`;
    const headerRenderer = ({columnKey}) => `${columnKey}`;

    this.columnData = [];
    this.columnGroupData = [];

    // helper to construct object for a column/columnGroup given it's index
    const getColumn = (index, groupIdx) => ({
      columnKey: index,
      header: headerRenderer,
      cell: cellRenderer,
      width: 100,
      groupIdx: Math.floor(groupIdx),
    });

    // construct columns
    for (let i = 0; i < 10000; i++) {
      this.columnData.push(getColumn(i, i/2));
    }

    // construct column groups
    for (let i = 0; i < this.columnData.length / 2; i++) {
      this.columnGroupData.push(getColumn(i));
    }
  }

  render() {
    return (
      <Table
        rowHeight={50}
        groupHeaderHeight={30}
        headerHeight={30}
        rowsCount={10000}
        width={1000}
        height={500}
        columnData={this.columnData}
        columnGroupData={this.columnGroupData}
        allowColumnVirtualization // flag to turn on column virtualization
        {...this.props}
      >
        /* notice that no children are passed */
      </Table>
    );
  }
}

module.exports = ColumnVirtualizationExample;
