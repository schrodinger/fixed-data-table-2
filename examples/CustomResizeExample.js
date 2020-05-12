/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';
import ResizeReorderCell  from '../src/plugins/ResizeReorder/ResizeReorderCell.js';


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
        isColumnResizing={false}
        touchScrollEnabled={true}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<ResizeReorderCell onColumnResizeEndCallback={this._onColumnResizeEndCallback}>First Name</ResizeReorderCell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={columnWidths.firstName}
          isResizable={false}
        />
        <Column
          columnKey="lastName"
          header={<ResizeReorderCell 
            minWidth={70}
            maxWidth={170} 
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
              Last Name (min/max constrained)
              </ResizeReorderCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.lastName}
          isResizable={false}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.companyName}
          isResizable={false}
        />
        <Column
          columnKey="sentence"
          header={<Cell>Sentence</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.sentence}
          isResizable={false}
        />
      </Table>
    );
  }
}

export default ResizeExample;
