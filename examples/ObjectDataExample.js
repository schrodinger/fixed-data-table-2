/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell, ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);
    // this.tableRef = React.createRef();

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      tableRef1: React.createRef(),
      tableRef2: React.createRef(),
      // t1:null,
      // t2:null,
      // scrollLeft:0
    };
  }
  // componentDidMount() {
  //   const tmp = this.state.tableRef1.current.getApi();
  //   const tmp2 = this.state.tableRef2.current.getApi();
  //   this.setState({t1:tmp})
  //   this.setState({t2:tmp2})

  //   // console.log(tmp,tmp2);
  // }

  // componentDidUpdate(){
  //   console.log('hell')
  //   // console.log(this.state.tableRef.current.getApi());
  // }

  render() {
    const { dataList } = this.state;
    const table1 = (
      <Table
        ref={this.state.tableRef1}
        tableNumber={1}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={300}
        columnsCount={8}
        scrollLeft={this.state.scrollLeft}
        onHorizontalScroll={onHorizontalScroll}
        getColumn={(i) =>
          [
            {
              columnKey: 'avatar',
              cell: <ImageCell data={dataList} />,
              fixed: true,
              width: 50,
            },
            {
              columnKey: 'firstName',
              header: <DataCell>First Name</DataCell>,
              cell: <LinkCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'lastName',
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'city',
              header: <DataCell>City</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'street',
              header: <DataCell>Street</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'zipCode',
              header: <DataCell>Zip Code</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'email',
              header: <DataCell>Email</DataCell>,
              cell: <LinkCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 200,
            },
          ][i]
        }
        // {...this.props}
      />
    );
    //  console.log( this.state.t1);

    const table2 = (
      <Table
        // ref={this.state.tableRef}
        ref={this.state.tableRef2}
        onHorizontalScroll={onHorizontalScroll}
        tableNumber={2}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={250}
        columnsCount={8}
        scrollLeft={this.state.scrollLeft}
        getColumn={(i) =>
          [
            {
              columnKey: 'avatar',
              cell: <ImageCell data={dataList} />,
              fixed: true,
              width: 50,
            },
            {
              columnKey: 'firstName',
              header: <DataCell>First Name</DataCell>,
              cell: <LinkCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'lastName',
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'city',
              header: <DataCell>City</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'street',
              header: <DataCell>Street</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'zipCode',
              header: <DataCell>Zip Code</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'email',
              header: <DataCell>Email</DataCell>,
              cell: <LinkCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 200,
            },
          ][i]
        }
        // {...this.props}
      />
    );
    const onHorizontalScroll = (scrollLeft) => {
      this.setState({ scrollLeft });
      return false;
    };
    return (
      <div>
        {table1}
        {table2}
      </div>
    );
  }
}

export default ObjectDataExample;
