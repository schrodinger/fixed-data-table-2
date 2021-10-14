/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, LinkCell } from './helpers/cells';
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
      fixedColumnsCount: 2,
      fixedRightColumnsCount: 2,
      scrollableColumnsCount: 10000 - 2 - 2,
    };

    const cellRenderer = (props) => `${props.columnKey}, ${props.rowIndex}`;
    const headerCellRenderer = (props) => props.columnKey;

    for (let i = 0; i < 10000; i++) {
      this.state.columns[i] = {
        columnKey: 'Column ' + i,
        header: headerCellRenderer,
        cell: cellRenderer,
        width: 100,
        allowCellsRecycling: true,
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
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        onVerticalScroll={this.onVerticalScroll}
        onHorizontalScroll={this.onHorizontalScroll}
        scrollableColumnsCount={this.state.scrollableColumnsCount}
        getScrollableColumn={(i) =>
          this.state.columns[this.state.fixedColumnsCount + i]
        }
        getFixedColumn={(i) => this.state.columns[i]}
        fixedColumnsCount={this.state.fixedColumnsCount}
        fixedRightColumnsCount={this.state.fixedRightColumnsCount}
        getFixedRightColumn={(i) =>
          this.state.columns[
            this.state.fixedColumnsCount + this.state.scrollableColumnsCount + i
          ]
        }
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
