/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class DynamicRowHeightExample extends React.Component {
  constructor(props) {
    super(props);

    const rowCount = 100000;
    this.state = {
      dataList: new FakeObjectDataListStore(rowCount),
      rowHeights: new Array(rowCount),
      useDynamicRowHeights: true,
    };

    // fill up random row heights
    for (let i = 0; i < rowCount; i++) {
      this.state.rowHeights[i] = Math.floor(Math.random() * 100) + 50; // height varies from the range [50, 150]
    }
  }

  render() {
    return (
      <div className="dynamic-row-heights-example">
        {this.renderControls()}
        {this.renderTable()}
      </div>
    );
  }

  renderControls() {
    return (
      <label className="toggle-dynamic-heights">
        Use dynamic row heights:
        <input
          type="checkbox"
          checked={this.state.useDynamicRowHeights}
          onChange={this.toggleDynamicRowHeights}
        />
      </label>
    );
  }

  renderTable() {
    const { dataList, useDynamicRowHeights } = this.state;
    return (
      <Table
        rowHeight={50}
        rowHeightGetter={
          useDynamicRowHeights
            ? (rowIndex) => this.state.rowHeights[rowIndex]
            : null
        }
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}
      >
        <Column
          columnKey="id"
          header={<DataCell>Id</DataCell>}
          cell={<TextCell data={dataList} />}
          width={100}
        />
        <Column
          columnKey="firstName"
          header={<DataCell>First Name</DataCell>}
          cell={<TextCell data={dataList} />}
          width={150}
        />
        <Column
          columnKey="lastName"
          header={<DataCell>Last Name</DataCell>}
          cell={<TextCell data={dataList} />}
          width={150}
        />
        <Column
          columnKey="city"
          header={<DataCell>City</DataCell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }

  toggleDynamicRowHeights = () => {
    this.setState((prevState) => ({
      useDynamicRowHeights: !prevState.useDynamicRowHeights,
    }));
  };
}

export default DynamicRowHeightExample;
