/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class TouchScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(2000)
    }
  }

  render() {
    const { dataList } = this.state;

    // Recent browser versions are making touch events passive by default. Unfortunately, React doesn't allow us
    // to specify the event handlers as passive/active (see #6436 on facebook/react). This can lead to unneeded
    // scrolling of parent containers of FDT. This style is a work around to fix this. By applying 'none' to
    // touch-action, we are disabling touch events from propagating.
    const tableParentStyle = {
      'touch-action': 'none'
    };

    return (
      <div style={tableParentStyle}>
        <Table
          rowHeight={50}
          rowsCount={dataList.getSize()}
          headerHeight={50}
          touchScrollEnabled={true}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<TextCell data={dataList} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<TextCell data={dataList} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={dataList} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

module.exports = TouchScrollExample;
