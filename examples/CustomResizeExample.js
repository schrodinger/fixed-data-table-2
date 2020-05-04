/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, Cell } from 'fixed-data-table-2';
import ResizerKnob  from '../src/plugins/CustomResizeComponent';
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

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  render() {
    var {dataList, columnWidths} = this.state;
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
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<TextCell data={dataList} />}
          resizerComponent={ResizerKnob}
          fixed={true}
          width={columnWidths.firstName}
          // isResizable={true}
          isResizable={false}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name (min/max constrained)</Cell>}
          cell={<TextCell data={dataList} />}
          resizerComponent={ResizerKnob}
          width={columnWidths.lastName}
          // isResizable={true}
          isResizable={false}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company</Cell>}
          cell={<TextCell data={dataList} />}
          resizerComponent={ResizerKnob}
          width={columnWidths.companyName}
          // isResizable={true}
          isResizable={false}
        />
        <Column
          columnKey="sentence"
          header={<Cell>Sentence</Cell>}
          cell={<TextCell data={dataList} />}
          resizerComponent={ResizerKnob}
          width={columnWidths.sentence}
          // isResizable={true}
          isResizable={false}
        />
      </Table>
    );
  }
}

export default ResizeExample;
