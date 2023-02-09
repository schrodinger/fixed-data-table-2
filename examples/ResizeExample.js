/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Plugins } from 'fixed-data-table-2';
import React from 'react';

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
  }

  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  };

  render() {
    const { dataList, columnWidths } = this.state;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        touchScrollEnabled={true}
        width={1000}
        height={500}
        columnsCount={4}
        getColumn={(i) =>
          [
            {
              columnKey: 'firstName',
              header: (
                <Plugins.ResizeCell
                  onColumnResizeEnd={this._onColumnResizeEndCallback}
                >
                  First Name
                </Plugins.ResizeCell>
              ),
              cell: <TextCell data={dataList} />,
              fixed: true,
              width: columnWidths.firstName,
            },

            {
              columnKey: 'lastName',
              header: (
                <Plugins.ResizeCell
                  minWidth={70}
                  maxWidth={170}
                  onColumnResizeEnd={this._onColumnResizeEndCallback}
                >
                  Last Name (min/max constrained)
                </Plugins.ResizeCell>
              ),
              cell: <TextCell data={dataList} />,
              width: columnWidths.lastName,
              fixed: true,
            },
            {
              columnKey: 'companyName',
              header: (
                <Plugins.ResizeCell
                  onColumnResizeEnd={this._onColumnResizeEndCallback}
                >
                  Company
                </Plugins.ResizeCell>
              ),
              cell: <TextCell data={dataList} />,
              width: columnWidths.companyName,
            },
            {
              columnKey: 'sentence',
              header: (
                <Plugins.ResizeCell
                  onColumnResizeEnd={this._onColumnResizeEndCallback}
                >
                  Sentence
                </Plugins.ResizeCell>
              ),
              cell: <TextCell data={dataList} />,
              width: columnWidths.sentence,
            },
          ][i]
        }
        {...this.props}
      />
    );
  }
}

export default ResizeExample;
