/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { TextCell } from './helpers/cells';
import { Table, Column, ColumnGroup, Plugins } from 'fixed-data-table-2';
import React from 'react';

const columnGroupTitles = {
  name: 'Name',
  about: 'About',
};

const columnTitles = {
  firstName: 'First Name',
  lastName: 'Last Name',
  sentence: 'Sentence',
  companyName: 'Company',
};

const fixedColumnGroups = [];

const fixedColumns = [];

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
    const columnGroupOrder = this.state.columnGroupOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      const index = columnGroupOrder.indexOf(event.columnAfter);
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
      columnGroupOrder,
    });
  };

  findColumnGroup = (columnKey) => {
    for (const groupKey in this.state.columnOrder) {
      for (const cKey of this.state.columnOrder[groupKey]) {
        if (cKey == columnKey) {
          return groupKey;
        }
      }
    }
    return null;
  };

  _onColumnReorderEndCallback = (event) => {
    const columnGroup = this.findColumnGroup(event.reorderColumn);
    const columnOrder = this.state.columnOrder[columnGroup].filter(
      (columnKey) => {
        return columnKey !== event.reorderColumn;
      }
    );

    const columnBeforeIndex = columnOrder.indexOf(event.columnBefore);
    const columnAfterIndex = columnOrder.indexOf(event.columnAfter);

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
    const newColumnOrder = { ...this.state.columnOrder };
    newColumnOrder[columnGroup] = columnOrder;
    this.setState({
      columnOrder: newColumnOrder,
    });
  };

  _onColumnGroupResizeEndCallback = (newColumnGroupWidth, columnGroupKey) => {
    const columnWidths = { ...this.state.columnWidths };
    const currentColumns = this.state.columnOrder[columnGroupKey];
    let totalWidth = 0;
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
    const { dataList, columnWidths, columnOrder } = this.state;
    const onColumnGroupReorderEndCallback =
      this._onColumnGroupReorderEndCallback;
    const onColumnReorderEndCallback = this._onColumnReorderEndCallback;
    const onColumnGroupResizeEndCallback = this._onColumnGroupResizeEndCallback;
    const onColumnResizeEndCallback = this._onColumnResizeEndCallback;

    return (
      <Table
        rowHeight={30}
        groupHeaderHeight={30}
        headerHeight={30}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        touchScrollEnabled={true}
        {...this.props}
      >
        {this.state.columnGroupOrder.map(function (columnGroupKey, i) {
          return (
            <ColumnGroup
              key={i}
              header={
                <Plugins.ReorderCell
                  onColumnReorderEnd={onColumnGroupReorderEndCallback}
                >
                  <Plugins.ResizeCell
                    onColumnResizeEnd={onColumnGroupResizeEndCallback}
                  >
                    {columnGroupTitles[columnGroupKey]}
                  </Plugins.ResizeCell>
                </Plugins.ReorderCell>
              }
              columnKey={columnGroupKey}
            >
              {columnOrder[columnGroupKey].map(function (columnKey, j) {
                return (
                  <Column
                    allowCellsRecycling={true}
                    columnKey={columnKey}
                    key={i + '.' + j}
                    header={
                      <Plugins.ReorderCell
                        onColumnReorderEnd={onColumnReorderEndCallback}
                      >
                        <Plugins.ResizeCell
                          onColumnResizeEnd={onColumnResizeEndCallback}
                        >
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
