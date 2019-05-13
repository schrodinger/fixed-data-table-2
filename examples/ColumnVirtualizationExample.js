/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const { Table } = require('fixed-data-table-2');
const React = require('react');

const cellRenderer = ({rowIndex, columnKey}) => {
  if (rowIndex !== undefined) { // column groups
    return `(${rowIndex}, ${columnKey})`;
  }
  return columnKey;
};

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    const columnsCount = 1000;
    const columnInfo = [];
    const columnGetter = ({ index }) => this.state.columnInfo[index];

    for (let i = 0; i < columnsCount; i++) {
      columnInfo.push({
        columnKey: i,
        header: cellRenderer,
        cell: cellRenderer,
        align: 'center',
        width: 150,
        fixed: i > 5 && i < 8,
        fixedRight: i > 20 && i < 23,
        allowCellsRecycling: true,
      });
    }

    this.state = {
      columnInfo,
      columnGetter,
      columnsCount,
    };
  }

  render() {
    const { columnGetter, columnsCount } = this.state;

    return (
      <Table
        rowsCount={1000}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}
        keyboardScrollEnabled={true}
        keyboardPageEnabled={true}
        onScrollStart={(a, b, c) => console.log(a, b, c)}
        onScrollEnd={(a, b, c) => console.log(a, b, c)}
        groupHeaderHeight={150}
        allowColumnVirtualization={true}
        columnGetter={columnGetter}
        columnsCount={columnsCount}
        {...this.props}
      >
        /* note that Columns aren't passed here */
      </Table>
    );
  }
}

module.exports = ObjectDataExample;
