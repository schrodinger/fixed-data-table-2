/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, TooltipCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';
import ReactTooltip from 'react-tooltip';

class TooltipExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const { dataList } = this.state;
    return (
      <div>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={1000}
          height={500}
          columnsCount={4}
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
                cell: <TooltipCell data={dataList} />,
                fixed: true,
                width: 150,
              },
              {
                columnKey: 'lastName',
                header: <DataCell>Last Name</DataCell>,
                cell: <TooltipCell data={dataList} />,
                fixed: true,
                width: 150,
              },
              {
                columnKey: 'companyName',
                header: <DataCell>Company</DataCell>,
                cell: <TooltipCell data={dataList} />,
                width: 200,
              },
            ][i]
          }
          {...this.props}
        />
        <ReactTooltip />
      </div>
    );
  }
}

export default TooltipExample;
