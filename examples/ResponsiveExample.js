/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import React from 'react';
import Dimensions from 'react-dimensions';

class ResponsiveExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const { dataList } = this.state;
    const {
      height,
      width,
      containerHeight,
      containerWidth,
      ...props
    } = this.props;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={containerWidth}
        height={containerHeight}
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

// See react-dimensions for the best way to configure
// https://github.com/digidem/react-dimensions
export default Dimensions({
  getHeight: function (element) {
    return window.innerHeight - 200;
  },
  getWidth: function (element) {
    var widthOffset = window.innerWidth < 680 ? 0 : 240;
    return window.innerWidth - widthOffset;
  },
})(ResponsiveExample);
