/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

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
    const { dataList, pageYOffset } = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={400}
        height={600}
        footerHeight={30}
        columnsCount={1}
        getColumn={(i) =>
          [
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              footer: <DataCell>sample footer</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 500,
            },
          ][i]
        }
        ownerHeight={this.props.height + 60 + pageYOffset}
      />
    );
  }
}

export default OwnerExample;
