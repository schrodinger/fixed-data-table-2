/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { RemovableHeaderCell, TextCell } from './helpers/cells';
import { Table } from 'fixed-data-table-2';
import React from 'react';

let columnTitles = {
  firstName: 'First Name',
  lastName: 'Last Name',
  city: 'City',
  sentence: 'Sentence',
  street: 'Street',
  companyName: 'Company Name',
  zipCode: 'Zip Code',
};

let columnWidths = {
  firstName: 150,
  lastName: 150,
  city: 150,
  sentence: 240,
  street: 150,
  companyName: 200,
  zipCode: 100,
};

class HideColumnExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(10000),
      columnOrder: Object.keys(columnTitles),
    };

    this._handleColumnHide = this._handleColumnHide.bind(this);
    this._resetColumns = this._resetColumns.bind(this);
  }

  _handleColumnHide(columnKey) {
    let newColumnOrder = this.state.columnOrder.filter(
      (column) => column !== columnKey
    );
    this.setState({
      columnOrder: newColumnOrder,
    });
  }

  _resetColumns() {
    this.setState({
      columnOrder: Object.keys(columnTitles),
    });
  }

  render() {
    const { dataList } = this.state;
    const handleColumnHide = this._handleColumnHide;

    return (
      <div>
        <button onClick={this._resetColumns}>Reset</button>
        <br />
        <Table
          rowHeight={30}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={1000}
          height={500}
          columnsCount={this.state.columnOrder.length}
          getColumn={(i) => {
            const columnKey = this.state.columnOrder[i];
            return {
              columnKey: columnKey,
              header: (
                <RemovableHeaderCell callback={handleColumnHide}>
                  {columnTitles[columnKey]}
                </RemovableHeaderCell>
              ),
              cell: <TextCell data={dataList} />,
              fixed: i === 0,
              width: columnWidths[columnKey],
            };
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default HideColumnExample;
