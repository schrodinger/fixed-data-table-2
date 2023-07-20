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
      autoScrollEnabled: false,
      horizontalScrollDelta: 0,
      verticalScrollDelta: 0,
      columns: [],
      columns1: [],

      // columnGroups: [],
      columnsCount: 100,
      shouldUseLegacyComponents: false, //we have to pass this as a prop to FixedDataTableContainer
      isPinned: false,
      scrollbarHoverLeft: 0,
      isScrollbarHovering: false,
      isPinContainerHovering: false,
    };
    this.shared = new Shared(this.forceUpdate.bind(this));
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
      this.state.columns[i] = {
        columnKey: 'Column ' + i,
        header: this.state.shouldUseLegacyComponents
          ? headercellRendererLegacy
          : headerCellRenderer,
        cell: this.state.shouldUseLegacyComponents
          ? cellRendererLegacy
          : i % 2
          ? cellRendererDatacell
          : cellRendererDiv,
        width: 50 + Math.floor((i * 300) / this.state.columnsCount),
      };
    }
    for (let i = 0; i < 100; i++) {
      this.state.columns1[i] = {
        columnKey: 'Column ' + i,
        header: this.state.shouldUseLegacyComponents
          ? headercellRendererLegacy
          : headerCellRenderer,
        cell: this.state.shouldUseLegacyComponents
          ? cellRendererLegacy
          : i % 2
          ? cellRendererDatacell
          : cellRendererDiv,
        width: getRandomInt(100, 200),
      };
    }

    this.onVerticalScroll = this.onVerticalScroll.bind(this);
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
    this.setHorizontalScrollDelta = this.setHorizontalScrollDelta.bind(this);
    this.setVerticalScrollDelta = this.setVerticalScrollDelta.bind(this);
    this.hoverChange = this.hoverChange.bind(this);
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
        <div>{this.renderTable1({ tableNumber: 1 })}</div>
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => this.setState({ isPinContainerHovering: true })}
          onMouseLeave={() => this.setState({ isPinContainerHovering: false })}
        >
          {this.renderPinAndTable()}
        </div>
      </div>
    );
  }
  renderPinAndTable() {
    if (
      !this.state.isScrollbarHovering &&
      !this.state.isPinned &&
      !this.state.isPinContainerHovering
    ) {
      return null;
    }

    const containerStyles = {
      position: 'absolute',
      top: -3,
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <div style={containerStyles}>
        {this.renderPin()}
        {this.renderTable2({ tableNumber: 2 })}
      </div>
    );
  }
  renderPin() {
    return (
      <img
        id="myImage"
        style={{ alignSelf: 'end' }}
        src={require('./pin-button.png')}
        alt="Pin Button"
        className="pin-button-img"
        onClick={() => this.pinned(this.state.isPinned)}
        height="50px"
        width="50px"
      />
    );
  }
  pinned = (isPinned) => {
    var image = document.getElementById('myImage');
    if (isPinned === true) {
      this.state.isPinned = false;
      image.src = require('./pin-button.png');
    } else {
      this.state.isPinned = true;
      image.src = require('./unpin-button.png');
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
        ref={this.shared.setRef}
        onScrollHoverMove={(scrollbarHoverLeft) => {
          clearTimeout(window.hoverTimeoutId);
          this.setState({ scrollbarHoverLeft });
        }}
        onScrollHoverStart={() => {
          this.setState({ isScrollbarHovering: true });
          clearTimeout(window.hoverTimeoutId);
        }}
        onScrollHoverEnd={() => {
          window.hoverTimeoutId = setTimeout(() => {
            this.setState({ isScrollbarHovering: false });
          }, 500);
        }}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={this.props.height / 3}
        // scrollHover={this.shared.state.scrollHover}

        scrollLeft={this.shared.state.scrollLeft}
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
        scrollLeft={Math.round(this.state.scrollbarHoverLeft)}
        storedWidths={this.shared.state.storedWidths}
        scrollableColOffsetIntervalTree={
          this.shared.state.scrollableColOffsetIntervalTree
        }
        // scrollHover={this.shared.state.scrollHover}

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

  hoverChange(isHover) {
    this.setState({ isHover });
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
