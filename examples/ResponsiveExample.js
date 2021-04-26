/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';
import debounce from 'lodash/debounce';

class ResponsiveExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      tableHeight: window.innerHeight - 200,
      tableWidth: window.innerWidth - (window.innerWidth < 680 ? 0 : 240),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateTableDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTableDimensions);
  }

  updateTableDimensions = debounce(() => {
    const tableHeight = window.innerHeight - 200;
    const widthOffset = window.innerWidth < 680 ? 0 : 240;
    const tableWidth = window.innerWidth - widthOffset;
    this.setState({ tableHeight, tableWidth });
  }, 200);

  render() {
    const { dataList, tableHeight, tableWidth } = this.state;
    const { height, width, ...props } = this.props;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={tableWidth}
        height={tableHeight}
        {...props}
      >
        <Column
          columnKey="firstName"
          header={<DataCell>First Name</DataCell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={20}
        />
        <Column
          columnKey="lastName"
          header={<DataCell>Last Name</DataCell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={20}
        />
        <Column
          columnKey="companyName"
          header={<DataCell>Company</DataCell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={50}
        />
      </Table>
    );
  }
}

export default ResponsiveExample;
