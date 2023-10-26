/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ExactScrollTopExample extends React.Component {
  constructor(props) {
    super(props);

    this._toggleExactScrollTop = this._toggleExactScrollTop.bind(this);

    const rowCount = 100;
    this.state = {
      dataList: new FakeObjectDataListStore(rowCount),
      rowHeights: new Array(rowCount),
      useDynamicRowHeights: true,
      scrollTop: 0,
      exactScrollTop: false,
    };

    for (let i = 0; i < rowCount; i++) {
      this.state.rowHeights[i] = i == 0 ? 30 : 500;
    }
  }

  _toggleExactScrollTop() {
    this.setState((prevState) => ({
      exactScrollTop: !prevState.exactScrollTop,
    }));
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderTable()}
      </div>
    );
  }

  renderControls() {
    return (
      <div className="exactScrollTopControls">
        <button
          onClick={() =>
            this.setState({
              scrollTop: 5000,
            })
          }
        >
          Scroll to 5000 px
        </button>
        <button
          onClick={() =>
            this.setState({
              scrollTop: 0,
            })
          }
        >
          Scroll to 0 px
        </button>
        <label>
          Exact scroll top
          <input
            type="checkbox"
            checked={this.state.exactScrollTop}
            onChange={this._toggleExactScrollTop}
          />
        </label>
      </div>
    );
  }

  renderTable() {
    const { dataList } = this.state;
    return (
      <Table
        rowHeight={30}
        rowHeightGetter={(rowIndex) => this.state.rowHeights[rowIndex]}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        scrollTop={this.state.scrollTop}
        exactScrollTopInCaseOfVariableRowHeights={this.state.exactScrollTop}
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
}

export default ExactScrollTopExample;
