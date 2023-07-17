/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { DateCell, ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';

// wrapper over a DataList that allows you to specify custom index mapping
class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(this._indexMap[index]);
  }
}

class FixedRowsExample extends React.Component {
  constructor(props) {
    super(props);

    const dataList = new FakeObjectDataListStore(1000000);
    const fixedRowsCount = 3;
    const topIndexMap = [];
    const bottomIndexMap = [];
    const middleIndexMap = [];

    let i = 0;
    while (i < fixedRowsCount) {
      topIndexMap.push(++i);
    }
    while (i < dataList.size - fixedRowsCount) {
      middleIndexMap.push(++i);
    }
    while (i < dataList.size) {
      bottomIndexMap.push(++i);
    }

    this.state = {
      headerDataList: new DataListWrapper([], dataList),
      topDataList: new DataListWrapper(topIndexMap, dataList),
      middleDataList: new DataListWrapper(middleIndexMap, dataList),
      bottomDataList: new DataListWrapper(bottomIndexMap, dataList),
      scrollLeft: 0,
    };
  }
  // componentDidMount() {
  //   const { scrollContentWidth, getColumnAtOffset } = this.tableRef.current.getApi();

  //   console.log(this.tableRef.current.getApi())
  // }
  // componentDidUpdate(){
  //   console.log(this.tableRef.current.getApi())

  // }

  render() {
    const {
      headerDataList,
      topDataList,
      middleDataList,
      bottomDataList,
      // scrollLeft,
    } = this.state;

    const totalTableHeight = this.props.height;
    const headerHeight = 50;
    const topTableHeight = topDataList.getSize() * 50;
    const bottomTableHeight = bottomDataList.getSize() * 50;
    const middleTableHeight =
      totalTableHeight - topTableHeight - bottomTableHeight - headerHeight;
    return (
      <div>
        {this.renderTable(headerDataList, {
          height: headerHeight,
          showScrollbarY: false,
          showScrollbarX: false,
          headerHeight,
          // scrollLeft,
        })}
        {this.renderTable(topDataList, {
          height: topTableHeight,
          showScrollbarY: false,
          showScrollbarX: false,
          headerHeight: 0,
          // scrollLeft,
        })}
        {this.renderTable(middleDataList, {
          height: middleTableHeight,
          showScrollbarX: false,
          headerHeight: 0,
          // scrollLeft,
        })}
        {this.renderTable(bottomDataList, {
          height: bottomTableHeight,
          showScrollbarY: false,
          headerHeight: 0,
          // onHorizontalScroll: this.onHorizontalScroll,
          // scrollLeft,
        })}
      </div>
    );
  }

  renderTable(dataList, additionalProps = {}) {
    return (
      <Table
        rowHeight={50}
        rowsCount={dataList.getSize()}
        width={500}
        columnsCount={13}
        getColumn={(i) =>
          [
            {
              columnKey: 'id',
              header: <DataCell>Id</DataCell>,
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: 100,
            },
            {
              columnKey: 'avatar',
              header: <DataCell>Avatar</DataCell>,
              cell: <ImageCell data={dataList} />,
              width: 50,
            },
            {
              columnKey: 'firstName',
              header: <DataCell>First Name</DataCell>,
              cell: <LinkCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'lastName',
              header: <DataCell>Last Name</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'city',
              header: <DataCell>City</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 250,
            },
            {
              columnKey: 'street',
              header: <DataCell>Street</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 250,
            },
            {
              columnKey: 'zipCode',
              header: <DataCell>Zip Code</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 100,
            },
            {
              columnKey: 'email',
              header: <DataCell>Email</DataCell>,
              cell: <LinkCell data={dataList} />,
              width: 400,
            },
            {
              columnKey: 'date',
              header: <DataCell>DOB</DataCell>,
              cell: <DateCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'catchPhrase',
              header: <DataCell>Catch Phrase</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'companyName',
              header: <DataCell>Company Name</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'words',
              header: <DataCell>Words</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
            {
              columnKey: 'sentence',
              header: <DataCell>Sentence</DataCell>,
              cell: <TextCell data={dataList} />,
              width: 200,
            },
          ][i]
        }
        {...this.props}
        {...additionalProps}
      />
    );
  }

  onHorizontalScroll = (scrollLeft) => {
    this.setState({ scrollLeft });
    return false;
  };
}

export default FixedRowsExample;
