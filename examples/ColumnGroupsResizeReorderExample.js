/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, ColumnGroup, Plugins } from 'fixed-data-table-2';
import React from 'react';

var columnGroupTitles = {
  name: 'Name',
  about: 'About',
};

var columnTitles = {
  firstName: 'First Name',
  lastName: 'Last Name',
  sentence: 'Sentence',
  companyName: 'Company',
};

var fixedColumnGroups = [];

var fixedColumns = [];

class ColumnGroupsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnGroupOrder: ['name', 'about'],
      columnOrder: {
        name: ['firstName', 'lastName'],
        about: ['companyName', 'sentence'],
      },
      columnWidths: {
        firstName: 150,
        lastName: 150,
        sentence: 240,
        companyName: 100,
      },
    };
  }

  _onColumnGroupReorderEndCallback = (event) => {
    var columnGroupOrder = this.state.columnGroupOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      var index = columnGroupOrder.indexOf(event.columnAfter);
      columnGroupOrder.splice(index, 0, event.reorderColumn);
    } else {
      if (fixedColumnGroups.indexOf(event.reorderColumn) !== -1) {
        columnGroupOrder.splice(
          fixedColumnGroups.length - 1,
          0,
          event.reorderColumn
        );
      } else {
        columnGroupOrder.push(event.reorderColumn);
      }
    }
    this.setState({
      columnGroupOrder: columnGroupOrder,
    });
  };

  findColumnGroup = (columnKey) => {
    for (var groupKey in this.state.columnOrder) {
      for (const cKey of this.state.columnOrder[groupKey]) {
        if (cKey == columnKey) {
          return groupKey;
        }
      }
    }
    return null;
  };

  _onColumnReorderEndCallback = (event) => {
    var columnGroup = this.findColumnGroup(event.reorderColumn);
    var columnOrder = this.state.columnOrder[columnGroup].filter(
      (columnKey) => {
        return columnKey !== event.reorderColumn;
      }
    );

    var columnBeforeIndex = columnOrder.indexOf(event.columnBefore);
    var columnAfterIndex = columnOrder.indexOf(event.columnAfter);

    if (columnBeforeIndex == -1 && columnAfterIndex == -1) {
      return;
    } else if (columnAfterIndex != -1) {
      columnOrder.splice(columnAfterIndex, 0, event.reorderColumn);
    } else {
      if (fixedColumns.indexOf(event.reorderColumn) !== -1) {
        columnOrder.splice(fixedColumns.length - 1, 0, event.reorderColumn);
      } else {
        columnOrder.push(event.reorderColumn);
      }
    }
    var newColumnOrder = { ...this.state.columnOrder };
    newColumnOrder[columnGroup] = columnOrder;
    this.setState({
      columnOrder: newColumnOrder,
    });
  };

  _onColumnGroupResizeEndCallback = (newColumnGroupWidth, columnGroupKey) => {
    var columnWidths = { ...this.state.columnWidths };
    var currentColumns = this.state.columnOrder[columnGroupKey];
    var totalWidth = 0;
    for (var key of currentColumns) {
      totalWidth += columnWidths[key];
    }

    const widthChange = newColumnGroupWidth - totalWidth;
    const perColumnChange = Math.floor(widthChange / currentColumns.length);
    const remainderWidth = Math.abs(widthChange) % currentColumns.length;

    for (var key of currentColumns) {
      columnWidths[key] += perColumnChange;
    }
    columnWidths[Object.keys(currentColumns)[0]] += remainderWidth;

    this.setState({
      columnWidths,
    });
  };

  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  };

  render() {
    var { dataList, columnWidths, columnOrder } = this.state;
    var onColumnGroupReorderEndCallback = this._onColumnGroupReorderEndCallback;
    var onColumnReorderEndCallback = this._onColumnReorderEndCallback;
    var onColumnGroupResizeEndCallback = this._onColumnGroupResizeEndCallback;
    var onColumnResizeEndCallback = this._onColumnResizeEndCallback;

    return (
      <Table
        rowHeight={30}
        groupHeaderHeight={30}
        headerHeight={30}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}
      >
        {this.state.columnGroupOrder.map(function (columnGroupKey, i) {
          return (
            <ColumnGroup
              key={i}
              header={
                <Plugins.ReorderCell
                  onColumnReorderEnd={onColumnGroupReorderEndCallback}>
                  <Plugins.ResizeCell
                    onColumnResizeEnd={onColumnGroupResizeEndCallback}>
                    {columnGroupTitles[columnGroupKey]}
                  </Plugins.ResizeCell>
                </Plugins.ReorderCell>
              }
              columnKey={columnGroupKey}
            >
              {columnOrder[columnGroupKey].map(function(columnKey, j) {
                return (
                  <Column
                    allowCellsRecycling={true}
                    columnKey={columnKey}
                    key={i + '.' + j}
                    header={
                      <Plugins.ReorderCell
                        onColumnReorderEnd={onColumnReorderEndCallback}>
                        <Plugins.ResizeCell
                          onColumnResizeEnd={onColumnResizeEndCallback}>
                          {columnTitles[columnKey]}
                        </Plugins.ResizeCell>
                      </Plugins.ReorderCell>
                    }
                    cell={<TextCell data={dataList} />}
                    width={columnWidths[columnKey]}
                  />
                );
              })}
            </ColumnGroup>
          );
        })}
      </Table>
    );
  }
}

export default ColumnGroupsExample;
