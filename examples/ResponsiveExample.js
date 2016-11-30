/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const Dimensions = require('react-dimensions');

class ResponsiveExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const {dataList} = this.state;
    const {height, width, containerHeight, containerWidth, ...props} = this.props;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={containerWidth}
        height={containerHeight}
        {...props}>
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={20}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
          flexGrow={1}
          width={20}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company</Cell>}
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
module.exports = Dimensions({
  getHeight: function(element) {
    return window.innerHeight - 200;
  },
  getWidth: function(element) {
    var widthOffset = window.innerWidth < 680 ? 0 : 240;
    return window.innerWidth - widthOffset;
  }
})(ResponsiveExample);
