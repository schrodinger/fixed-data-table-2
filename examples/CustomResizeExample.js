/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';
import ResizeReorderCell  from 'ResizeReorderCell';


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
        touchScrollEnabled={true}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<ResizeReorderCell 
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
            First Name </ResizeReorderCell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={columnWidths.firstName}
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
        />
        <Column
          columnKey="companyName"
          header={<ResizeReorderCell 
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
            Company </ResizeReorderCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.companyName}
        />
        <Column
          columnKey="sentence"
          header={<ResizeReorderCell 
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
            Sentence </ResizeReorderCell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.sentence}
        />
      </Table>
    );
  }
}

export default ResizeExample;
