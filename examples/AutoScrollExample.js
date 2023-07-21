/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, LinkCell, TextCell } from './helpers/cells';
import { Table, Column, DataCell, Plugins } from 'fixed-data-table-2';
import React from 'react';
import Shared from '../src/SharedClass';
import cx from '../src/vendor_upstream/stubs/cx';
import joinClasses from '../src/vendor_upstream/core/joinClasses';

class AutoScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: new FakeObjectDataListStore(10000),
      columns: [],
      columnsCount: 100,
      shouldUseLegacyComponents: false, //we have to pass this as a prop to FixedDataTableContainer
      isSplitted: false,
      isPinned: false,
      scrollbarHoverLeft: 0,
      tablePosition: 0,
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
  }

  render() {
    return (
      <div className="autoScrollContainer">
        <div>{this.renderMainTable()}</div>
        <div
          style={{
            position: 'relative',
            left: this.state.isSplitted ? 0 : this.state.tablePosition,
          }}
          onMouseEnter={() => this.setState({ isPinContainerHovering: true })}
          onMouseLeave={() => this.setState({ isPinContainerHovering: false })}
        >
          {this.renderPinAndTable()}
        </div>
      </div>
    );
  }
  renderPinAndTable() {
    if (!this.state.isPinned) {
      if (
        !this.state.isScrollbarHovering &&
        !this.state.isSplitted &&
        !this.state.isPinContainerHovering
      ) {
        return null;
      } else {
        let containerStyles = {
          position: 'absolute',
          top: '-270px',
          display: 'flex',
          flexDirection: 'column',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
        };

        if (this.state.isSplitted) {
          containerStyles = {
            position: 'absolute',
            top: -3,
            display: 'flex',
            flexDirection: 'column',
          };
        }
        let buttonStyles = {
          alignSelf: 'end',
          display: 'flex',
        };
        return (
          <div style={containerStyles}>
            <div style={buttonStyles}>
              {this.renderPin()}
              {this.renderSplit()}
            </div>

            {this.renderPreviewTable()}
          </div>
        );
      }
    } else {
      let containerStyles = {
        position: 'absolute',
        top: '-270px',
        display: 'flex',
        flexDirection: 'column',
        transform: 'scale(0.5)',
        transformOrigin: 'top left',
      };

      if (this.state.isSplitted) {
        containerStyles = {
          position: 'absolute',
          top: -3,
          display: 'flex',
          flexDirection: 'column',
        };
      }
      let buttonStyles = {
        display: 'flex',
        alignSelf: 'end',
      };
      return (
        <div style={containerStyles}>
          <div style={buttonStyles}>
            {this.renderPin()}
            {this.renderSplit()}
          </div>

          {this.renderPreviewTable()}
        </div>
      );
    }
  }
  renderPin() {
    return (
      <img
        id="myImagePin"
        style={{ alignSelf: 'end', padding: '5px', margin: '5px' }}
        src={require('./pin-button.png')}
        alt="Pin Button"
        className="button-img"
        onClick={() => this.pinned(this.state.isPinned)}
        height="30px"
        width="30px"
      />
    );
  }
  pinned = (isPinned) => {
    var image = document.getElementById('myImagePin');
    if (isPinned === true) {
      image.src = require('./pin-button.png');
    } else {
      image.src = require('./unpin-button.png');
    }
    this.setState({
      isPinned: !isPinned,
    });
  };
  renderSplit() {
    return (
      <img
        id="myImage"
        style={{ alignSelf: 'end', padding: '5px', margin: '5px' }}
        src={require('./split-button.png')}
        alt="Split Button"
        className="button-img"
        onClick={() => this.splitted(this.state.isSplitted)}
        height="30px"
        width="30px"
      />
    );
  }
  splitted = (isSplitted) => {
    var image = document.getElementById('myImage');
    if (isSplitted === true) {
      image.src = require('./split-button.png');
    } else {
      image.src = require('./unsplit-button.png');
    }
    this.setState({
      isSplitted: !isSplitted,
    });
  };

  renderMainTable() {
    var { dataList } = this.state;
    return (
      <Table
        ref={this.shared.setRef}
        onScrollHoverMove={(scrollbarHoverLeft, tablePosition) => {
          if (!this.state.isPinned) {
            clearTimeout(window.hoverTimeoutId);
            this.setState({ scrollbarHoverLeft });
            if (tablePosition + this.props.width / 2 > this.props.width) {
              tablePosition = this.props.width - this.props.width / 2 - 15;
            }
            this.setState({ tablePosition });
          }
        }}
        onScrollHoverStart={() => {
          if (!this.state.isPinned) {
            this.setState({ isScrollbarHovering: true });
            clearTimeout(window.hoverTimeoutId);
          }
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
        height={
          this.state.isSplitted ? this.props.height / 2 : this.props.height
        }
        scrollLeft={this.shared.state.scrollLeft}
        columnsCount={this.state.columnsCount}
        getColumn={(i) => this.state.columns[i]}
        shouldUseLegacyComponents={this.state.shouldUseLegacyComponents}
      />
    );
  }
  renderPreviewTable() {
    var { dataList } = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={this.props.width}
        height={this.props.height / 2}
        scrollLeft={Math.round(this.state.scrollbarHoverLeft)}
        storedWidths={this.shared.state.storedWidths}
        scrollableColOffsetIntervalTree={
          this.shared.state.scrollableColOffsetIntervalTree
        }
        columnsCount={this.state.columnsCount}
        getColumn={(i) => this.state.columns[i]}
        shouldUseLegacyComponents={this.state.shouldUseLegacyComponents}
      />
    );
  }
}

export default AutoScrollExample;
