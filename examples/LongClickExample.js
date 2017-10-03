/**
 * Copyright Schrodinger, LLC
 */

'use strict';

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class LongClickExample extends React.Component {

  columns = [];
  longClickTimer = null;
  
  constructor(props) {
    super(props);

    var dataList = new FakeObjectDataListStore(1000000);
    var displayColumns = {
      firstName: 'First Name',
      lastName: 'Last Name',
      city: 'City',
      street: 'zipCode'
    };

    Object.keys(displayColumns).forEach(columnKey => {
      this.columns.push(
        <Column
          key={columnKey}
          columnKey={columnKey}
          flexGrow={2}
          header={<Cell>{this.columns[columnKey]}</Cell>}
          cell={({ rowIndex, columnKey }) => {
            let isRowHighlighted = this.state.longPressedRowIndex === rowIndex;
            return <TextCell style={{
              backgroundColor: isRowHighlighted ? 'yellow' : 'transparent',
              width: '100%',
              height: '100%'
            }}
              data={dataList}
              rowIndex={rowIndex}
              columnKey={columnKey} />;
          }
          }
          width={100}
        />);
    });

    this.state = {
      dataList
    };
  }

  handleRowMouseDown(rowIndex) {
    this.cancelLongClick();
    this.longClickTimer = setTimeout(() => {
      this.setState({
        longPressedRowIndex: rowIndex
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

  render() {
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={this.state.dataList.getSize()}
        width={1000}
        height={500}
        onRowMouseDown={(event, rowIndex) => { this.handleRowMouseDown(rowIndex); }}
        onRowMouseUp={(event, rowIndex) => { this.handleRowMouseUp(rowIndex); }}
        {...this.props}>
        {this.columns}
      </Table>
    );
  }
}

module.exports = LongClickExample;
