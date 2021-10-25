/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class LongClickExample extends React.Component {
  longClickTimer = null;

  displayColumns = {
    firstName: 'First Name',
    lastName: 'Last Name',
    city: 'City',
    street: 'zipCode',
  };

  constructor(props) {
    super(props);

    var dataList = new FakeObjectDataListStore(1000000);

    this.state = {
      dataList,
      columns: this.getColumns(),
      longPressedRowIndex: -1,
    };
  }

  handleRowMouseDown(rowIndex) {
    this.cancelLongClick();
    this.longClickTimer = setTimeout(() => {
      this.setState({
        longPressedRowIndex: rowIndex,
      });
    }, 1000);
  }

  handleRowMouseUp() {
    this.cancelLongClick();
  }

  cancelLongClick() {
    if (this.longClickTimer) {
      clearTimeout(this.longClickTimer);
      this.longClickTimer = null;
    }
  }

  getColumns() {
    let columns = [];

    Object.keys(this.displayColumns).forEach((columnKey) => {
      columns.push(
        <Column
          key={columnKey}
          columnKey={columnKey}
          flexGrow={2}
          header={<DataCell>{columns[columnKey]}</DataCell>}
          cell={(cell) => this.getCell(cell.rowIndex, cell.columnKey)}
          width={100}
        />
      );
    });

    return columns;
  }

  getCell(rowIndex, columnKey) {
    let isCellHighlighted = this.state.longPressedRowIndex === rowIndex;

    let rowStyle = {
      backgroundColor: isCellHighlighted ? 'yellow' : 'transparent',
      width: '100%',
      height: '100%',
    };

    return (
      <TextCell
        style={rowStyle}
        data={this.state.dataList}
        rowIndex={rowIndex}
        columnKey={columnKey}
      />
    );
  }

  render() {
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={this.state.dataList.getSize()}
        width={1000}
        height={500}
        onRowMouseDown={(event, rowIndex) => {
          this.handleRowMouseDown(rowIndex);
        }}
        onRowMouseUp={(event, rowIndex) => {
          this.handleRowMouseUp(rowIndex);
        }}
        {...this.props}
      >
        {this.state.columns}
      </Table>
    );
  }
}

export default LongClickExample;
