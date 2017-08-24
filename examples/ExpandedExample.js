/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { CollapseCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const {StyleSheet, css} = require('aphrodite');

class ExpandedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      dataList: new FakeObjectDataListStore(2000)
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
  }

  _handleCollapseClick(rowIndex) {
    const {collapsedRows} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    let scrollToRow = rowIndex;
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      scrollToRow: scrollToRow,
      collapsedRows: shallowCopyOfCollapsedRows
    });
  }

  _subRowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 80 : 0;
  }

  _rowExpandedGetter({rowIndex, width, height}) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null;
    }

    const style = {
      height: height,
      width: width - 2,
    };
    return (
      <div style={style}>
        <div className={css(styles.expandStyles)}>
            expanded content
        </div>
      </div>
    );
  }

  render() {
    let {dataList, collapsedRows, scrollToRow} = this.state;

    return (
      <div>
        <Table
          scrollToRow={scrollToRow}
          rowHeight={50}
          rowsCount={dataList.getSize()}
          subRowHeightGetter={this._subRowHeightGetter}
          rowExpanded={this._rowExpandedGetter}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
            fixed={true}
            width={30}
          />
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<TextCell data={dataList} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<TextCell data={dataList} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={dataList} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

const styles = StyleSheet.create({
 expandStyles: {
    'background-color': 'white',
    border: '1px solid #d3d3d3',
    'box-sizing': 'border-box',
    padding: '20px',
    overflow:'hidden',
    width: '100%',
    height: '100%'
  }
});

module.exports = ExpandedExample;
