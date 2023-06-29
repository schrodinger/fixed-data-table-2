/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, Column, DataCell, Plugins } from 'fixed-data-table-2';
import React from 'react';

class AutoScrollExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(10000),
      scrollTop: 0,
      scrollLeft: 0,
      autoScrollEnabled: true,
      horizontalScrollDelta: 0,
      verticalScrollDelta: 0,
      columns: [],
      columnGroups: [],
      columnsCount: 10000,
    };
    const cellRenderer = (props) => (
      <DataCell {...props}>
        {props.columnKey},{props.rowIndex}
      </DataCell>
    );

    const headerCellRenderer = (props) => (
      <DataCell {...props}>{props.columnKey}</DataCell>
    );

    for (let i = 0; i < 10000; i++) {
      const columnGroupIndex = Math.floor(i / 2);
      this.state.columns[i] = {
        columnKey: 'Column ' + i,
        columnGroupIndex,
        header: headerCellRenderer,
        cell: cellRenderer,
        width: 100,
        allowCellsRecycling: true,
        fixed: i < 2 ? true : false,
        fixedRight: i >= 10000 - 4 ? true : false,
      };
      this.state.columnGroups[columnGroupIndex] = {
        columnKey: 'Column Group ' + columnGroupIndex,
        header: headerCellRenderer,
      };
    }

    this.onVerticalScroll = this.onVerticalScroll.bind(this);
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
    this.setHorizontalScrollDelta = this.setHorizontalScrollDelta.bind(this);
    this.setVerticalScrollDelta = this.setVerticalScrollDelta.bind(this);
  }

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
    return (
      <Table
        groupHeaderHeight={50}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        onVerticalScroll={this.onVerticalScroll}
        onHorizontalScroll={this.onHorizontalScroll}
        columnsCount={this.state.columnsCount}
        getColumn={(i) => this.state.columns[i]}
        getColumnGroup={(i) => this.state.columnGroups[i]}
        {...this.props}
      />
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
