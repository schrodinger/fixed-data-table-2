/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, Plugins } from 'fixed-data-table-2';
import React from 'react';
import _ from 'lodash';

var columnTitles = {
  firstName: 'First Name',
  lastName: 'Last Name',
  sentence: 'Sentence',
  companyName: 'Company',
  city: 'City',
  street: 'Street',
  zipCode: 'Zip Code',
};

var columnWidths = {
  firstName: 150,
  lastName: 150,
  sentence: 140,
  companyName: 140,
  city: 140,
  street: 160,
  zipCode: 140,
};

var fixedColumns = [];

class ReorderExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnOrder: [
        'firstName',
        'lastName',
        'city',
        'street',
        'zipCode',
        'sentence',
        'companyName',
      ],
      isReordering: {},
    };
    setInterval(() => {
      this.forceUpdate();
    });
  }

  _onColumnReorderEndCallback = (event) => {
    var columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (!_.isNil(event.columnAfter)) {
      var index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      if (fixedColumns.indexOf(event.reorderColumn) !== -1) {
        columnOrder.splice(fixedColumns.length - 1, 0, event.reorderColumn);
      } else {
        columnOrder.push(event.reorderColumn);
      }
    }

    this.setState({
      columnOrder: columnOrder,
      isReordering: {},
    });
  };

  onColumnReorderStart = (columnKey) => {
    this.setState({
      isReordering: {
        [columnKey]: false,
      },
    });
  };

  render() {
    const { dataList, isReordering } = this.state;
    const onColumnReorderEndCallback = this._onColumnReorderEndCallback;
    const onColumnReorderStart = this.onColumnReorderStart;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        isColumnReordering={false}
        width={1000}
        height={500}
        touchEnabled={true}
        {...this.props}
      >
        {this.state.columnOrder.map(function (columnKey, i) {
          return (
            <Column
              columnKey={columnKey}
              key={i}
              header={
                <Plugins.ReorderCell
                  touchEnabled={true}
                  onColumnReorderStart={onColumnReorderStart}
                  onColumnReorderEnd={onColumnReorderEndCallback}
                >
                  {columnTitles[columnKey]}
                </Plugins.ReorderCell>
              }
              cell={<TextCell data={dataList} />}
              width={columnWidths[columnKey]}
            />
          );
        })}
      </Table>
    );
  }
}

export default ReorderExample;
