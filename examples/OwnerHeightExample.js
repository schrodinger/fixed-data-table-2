/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { DateCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const Dimensions = require('react-dimensions');

class OwnerExample extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.state = {
      dataList: new FakeObjectDataListStore(100),
      scrollY: 0,
    };
  }

  componentDidMount() {
    const win = window;
    if (win.addEventListener) {
      win.addEventListener('scroll', this.onScroll, false);
    } else if (win.attachEvent) {
      win.attachEvent('onscroll', this.onScroll);
    } else {
      win.onscroll = this.onScroll;
    }
  }

  onScroll() {
    this.setState({
      pageYOffset: window.pageYOffset,
    });
  }

  render() {
    var { dataList, pageYOffset } = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={400}
        height={600}
        footerHeight={30}
        ownerHeight={this.props.height + 60 + pageYOffset}>
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          footer={<Cell>sample footer</Cell>}
          cell={<DateCell data={dataList} />}
          width={500}
        />
      </Table>
    );
  }
}

module.exports = OwnerExample;
