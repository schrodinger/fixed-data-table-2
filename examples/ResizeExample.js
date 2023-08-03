/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ResizeExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnWidths: {
        firstName: 240,
        lastName: 150,
        sentence: 140,
        companyName: 60,
      },
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(
      this
    );
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  }

  render() {
    var { dataList, columnWidths } = this.state;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        touchScrollEnabled={true}
        width={1000}
        height={500}
        {...this.props}
      >
        <Column
          columnKey="firstName"
          header={<DataCell>First Name</DataCell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={columnWidths.firstName}
          isResizable={true}
        />
        <Column
          columnKey="lastName"
          header={<DataCell>Last Name (min/max constrained)</DataCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.lastName}
          isResizable={true}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          columnKey="companyName"
          header={<DataCell>Company</DataCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.companyName}
          isResizable={true}
        />
        <Column
          columnKey="sentence"
          header={<DataCell>Sentence</DataCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.sentence}
          isResizable={true}
        />
      </Table>
    );
  }
}

export default ResizeExample;
