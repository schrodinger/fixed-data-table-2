/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, Column, DataCell, Plugins } from 'fixed-data-table-2';
import React from 'react';
import Shared from '../src/impl';
import cx from '../src/vendor_upstream/stubs/cx';
import joinClasses from '../src/vendor_upstream/core/joinClasses';

class AutoScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(10000),
      display: 'none',
      autoScrollEnabled: true,
      horizontalScrollDelta: 0,
      verticalScrollDelta: 0,
      columns: [],
      columns1: [],

      // columnGroups: [],
      columnsCount: 100,
      shouldUseLegacyComponents: false, //we have to pass this as a prop to FixedDataTableContainer
      isPin: false,
      isHover: false,
    };
    //these are legacy function because we are already providing the styles in FixedDataTableCell for this so there is no need of any div here
    const cellRendererLegacy = (props) =>
      `${props.columnKey}, ${props.rowIndex}`;

    const headercellRendererLegacy = (props) => props.columnKey;

    const cellRendererDatacell = (props) => (
      <DataCell {...props}>
        {props.columnKey},{props.rowIndex}
      </DataCell>
    );
    const cellRendererDiv = (props) => (
      <div style={props.styleDefault} className={props.classNameDefault}>
        {props.columnKey}, {props.rowIndex}
      </div>
    );
    //user can pass any function as here we passed cellRendererDiv
    //we have to pass the default styles which we were earlier providing in the FixedDataTableCell div

    const headerCellRenderer = (props) => (
      <DataCell {...props}>{props.columnKey}</DataCell>
    );
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 100; i++) {
      // const columnGroupIndex = Math.floor(i / 2);
      this.state.columns[i] = {
        columnKey: 'Column ' + i,
        // columnGroupIndex,
        header: this.state.shouldUseLegacyComponents
          ? headercellRendererLegacy
          : headerCellRenderer,
        cell: this.state.shouldUseLegacyComponents
          ? cellRendererLegacy
          : i % 2
          ? cellRendererDatacell
          : cellRendererDiv,
        width: 50 + Math.floor((i * 300) / this.state.columnsCount),
        // allowCellsRecycling: true,
        // fixed: i < 2 ? true : false,
        // fixedRight: i >= 10000 - 4 ? true : false,
      };
      // this.state.columnGroups[columnGroupIndex] = {
      //   columnKey: 'Column Group ' + columnGroupIndex,
      //   header: headerCellRenderer,
      // };
    }
    for (let i = 0; i < 100; i++) {
      // const columnGroupIndex = Math.floor(i / 2);
      this.state.columns1[i] = {
        columnKey: 'Column ' + i,
        // columnGroupIndex,
        header: this.state.shouldUseLegacyComponents
          ? headercellRendererLegacy
          : headerCellRenderer,
        cell: this.state.shouldUseLegacyComponents
          ? cellRendererLegacy
          : i % 2
          ? cellRendererDatacell
          : cellRendererDiv,
        width: getRandomInt(100, 200),
        // allowCellsRecycling: true,
        // fixed: i < 2 ? true : false,
        // fixedRight: i >= 10000 - 4 ? true : false,
      };
      // this.state.columnGroups[columnGroupIndex] = {
      //   columnKey: 'Column Group ' + columnGroupIndex,
      //   header: headerCellRenderer,
      // };
    }

    this.onVerticalScroll = this.onVerticalScroll.bind(this);
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
    this.setHorizontalScrollDelta = this.setHorizontalScrollDelta.bind(this);
    this.setVerticalScrollDelta = this.setVerticalScrollDelta.bind(this);
    this.displayChange = this.displayChange.bind(this);
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
    var fdt;
    if (Shared.isHover) {
      fdt = this.renderTable2({ tableNumber: 2 });
    }

    const style = {
      display: Shared.display,
      // top: '500px',
      // position: 'absolute',
      // left: Shared.tableLeft,
      // top:'100px'
    };
    // console.log(this.state.display)
    // style.display='block'
    const style1 = {
      // position: 'absolute',
    };
    return (
      <div className="autoScrollContainer">
        {this.renderControls()}
        <div style={style1}>{this.renderTable1({ tableNumber: 1 })}</div>
        <div
          style={style}
          // onMouseEnter={this._onMouseEnter}
          // onMouseMove={this._onMouseMove}
          onMouseLeave={this._onMouseLeave}
        >
          <img
            id="myImage"
            src={require('./pin-button.png')}
            alt="Pin Button"
            className="pin-button-img"
            onClick={() => this.pinned(this.state.isPin)}
            height="50px"
            width="50px"
          ></img>
          {fdt}
        </div>
      </div>
    );
  }
  pinned = (isPin) => {
    var image = document.getElementById('myImage');
    if (isPin === true) {
      this.state.isPin = false;
      image.src = require('./pin-button.png');
    } else {
      this.state.isPin = true;
      image.src = require('./unpin-button.png');
    }
    // console.log(this.state.isPin)
  };
  // _onMouseMove = (event) => {
  //   /** @type {object} */
  //   // console.log('hello')
  //   Shared.setDisplay('block');
  // };
  // _onMouseEnter = (event) => {
  //   /** @type {object} */
  //   // console.log('hello')
  //   Shared.setDisplay('block');
  // };
  _onMouseLeave = (event) => {
    if (!this.state.isPin) {
      Shared.subscribers.pop();
      Shared.setisHover(false);
      Shared.setDisplay('none');
    }
  };
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

  renderTable1(additionalProps) {
    var { dataList, scrollLeft, scrollTop } = this.state;
    return (
      <Table
        // groupHeaderHeight={50}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={this.props.height / 3}
        // scrollLeft={scrollLeft}
        // scrollTop={scrollTop}
        // onVerticalScroll={this.onVerticalScroll}
        // onHorizontalScroll={this.onHorizontalScroll}
        columnsCount={this.state.columnsCount}
        getColumn={(i) => this.state.columns[i]}
        // getColumnGroup={(i) => this.state.columnGroups[i]}
        shouldUseLegacyComponents={this.state.shouldUseLegacyComponents}
        {...additionalProps}
      />
    );
  }
  renderTable2(additionalProps) {
    var { dataList, scrollLeft, scrollTop } = this.state;
    return (
      <Table
        // groupHeaderHeight={50}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={this.props.height / 3}
        // scrollLeft={scrollLeft}
        // scrollTop={scrollTop}
        // onVerticalScroll={this.onVerticalScroll}
        // onHorizontalScroll={this.onHorizontalScroll}
        // defaultScrollbars={false}
        // showScrollbarY= {'false'}

        columnsCount={this.state.columnsCount}
        getColumn={(i) => this.state.columns[i]}
        // getColumnGroup={(i) => this.state.columnGroups[i]}
        shouldUseLegacyComponents={this.state.shouldUseLegacyComponents}
        {...additionalProps}
      />
    );
  }

  onVerticalScroll(scrollTop) {
    this.setState({ scrollTop });
  }

  onHorizontalScroll(scrollLeft) {
    this.setState({ scrollLeft });
  }

  displayChange(display) {
    // console.log(display)
    this.state.display = display;
    // this.setState({display})
    // console.log(this.state.display)
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
