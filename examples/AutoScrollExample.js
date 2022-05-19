/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, LinkCell } from './helpers/cells';
import {
  Table,
  Column,
  ColumnGroup,
  DataCell,
  Plugins,
} from 'fixed-data-table-2';
import React from 'react';
import _ from 'lodash';

var fixedColumnGroups = [0];

var fixedColumns = [0, 1, 2, 3];

class AutoScrollExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(100),
      scrollTop: 0,
      scrollLeft: 0,
      autoScrollEnabled: false,
      horizontalScrollDelta: 0,
      verticalScrollDelta: 0,
      columnGroupOrder: [],
      columnOrder: {},
      columnWidths: [],
    };

    this.columns = [];
    this.columnGroups = [];
    const cellRenderer = ({ columnKey, rowIndex }) => (
      <div className="autoScrollCell">
        {' '}
        {rowIndex}, {columnKey}{' '}
      </div>
    );

    for (let i = 0; i < 25; i++) {
      this.state.columnGroupOrder[i] = i;
      this.state.columnOrder[i] = [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3];
    }

    for (let i = 0; i < 100; i++) {
      this.state.columnWidths[i] = 75;
    }

    this.getColumnGroup = (index) => {
      return (
        <ColumnGroup
          key={index}
          columnKey={index}
          fixed={fixedColumnGroups.indexOf(index) !== -1}
          header={
            <Plugins.ReorderCell
              onColumnReorderEnd={this._onColumnGroupReorderEndCallback}
            >
              <Plugins.ResizeCell
                onColumnResizeEnd={this._onColumnGroupResizeEndCallback}
              >
                {index}
              </Plugins.ResizeCell>
            </Plugins.ReorderCell>
          }
        >
          {_.map(this.state.columnOrder[index], (y) => {
            return (
              <Column
                fixed={fixedColumns.indexOf(y) !== -1}
                key={y}
                columnKey={y}
                header={({ columnIndex, columnKey, rowIndex, ...props }) => (
                  <Plugins.ReorderCell
                    columnKey={columnKey}
                    columnIndex={columnIndex}
                    rowIndex={rowIndex}
                    touchEnabled={true}
                    onColumnReorderStart={this.onColumnReorderStart}
                    onColumnReorderEnd={this._onColumnReorderEndCallback}
                    {...props}
                  >
                    <Plugins.ResizeCell
                      onColumnResizeEnd={this._onColumnResizeEndCallback}
                    >
                      <div className="autoScrollCell">{columnKey}</div>
                    </Plugins.ResizeCell>
                  </Plugins.ReorderCell>
                )}
                cell={cellRenderer}
                width={this.state.columnWidths[y]}
                allowCellsRecycling={true}
              />
            );
          })}
        </ColumnGroup>
      );
    };

    this.onVerticalScroll = this.onVerticalScroll.bind(this);
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
    this.setHorizontalScrollDelta = this.setHorizontalScrollDelta.bind(this);
    this.setVerticalScrollDelta = this.setVerticalScrollDelta.bind(this);
  }

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
    var columnWidths = { ...this.state.columnWidths };
    columnWidths[columnKey] = newColumnWidth;

    this.setState({
      columnWidths,
    });
  };

  _onColumnGroupReorderEndCallback = (event) => {
    var columnGroupOrder = this.state.columnGroupOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter !== undefined) {
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

  tableRef = React.createRef();

  componentDidMount() {
    setInterval(() => {
      if (!this.state.autoScrollEnabled) {
        return;
      }
      this.setState((prevState) => ({
        scrollTop: prevState.scrollTop + (prevState.verticalScrollDelta || 0),
        scrollLeft:
          prevState.scrollLeft + (prevState.horizontalScrollDelta || 0),
      }));
    }, 16);
  }

  render() {
    return (
      <div className="autoScrollContainer">
        {this.renderControls()}
        {this.renderTable()}
      </div>
    );
  }

  renderControls() {
    return (
      <div className="autoScrollControls">
        <label>
          Auto Scroll Enabled
          <input
            type="checkbox"
            checked={this.state.autoScrollEnabled}
            onChange={this.toggleAutoScroll}
          />
        </label>
        <label>
          Horizontal Scroll Delta
          <input
            type="number"
            value={this.state.horizontalScrollDelta}
            onChange={this.setHorizontalScrollDelta}
          />
        </label>
        <label>
          Vertical Scroll Delta
          <input
            type="number"
            value={this.state.verticalScrollDelta}
            onChange={this.setVerticalScrollDelta}
          />
        </label>
      </div>
    );
  }

  renderTable() {
    var { dataList, scrollLeft, scrollTop } = this.state;
    const columns = this.state.columnGroupOrder.map((index) => {
      return this.getColumnGroup(index);
    });
    return (
      <Table
        groupHeaderHeight={100}
        rowHeight={100}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        onVerticalScroll={this.onVerticalScroll}
        onHorizontalScroll={this.onHorizontalScroll}
        {...this.props}
        ref={this.tableRef}
      >
        {columns}
      </Table>
    );
  }

  onVerticalScroll(scrollTop) {
    this.setState({ scrollTop });
  }

  onHorizontalScroll(scrollLeft) {
    this.setState({ scrollLeft });
  }

  toggleAutoScroll() {
    this.setState((prevState) => ({
      autoScrollEnabled: !prevState.autoScrollEnabled,
    }));
  }

  setHorizontalScrollDelta(event) {
    const { value } = event.target;
    if (isNaN(value)) {
      return;
    }
    this.setState({
      horizontalScrollDelta: parseInt(value),
    });
  }

  setVerticalScrollDelta(event) {
    const { value } = event.target;
    if (isNaN(value)) {
      return;
    }
    this.setState({
      verticalScrollDelta: parseInt(value),
    });
  }
}

export default AutoScrollExample;
