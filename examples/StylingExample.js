/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { ImageCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const {StyleSheet, css} = require('aphrodite');

class StylingExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const {dataList} = this.state;
    const { width, ...props } = this.props;
    return (
      <Table
        className={css(styles.wrapperStyles)}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={550}
        height={500}
        {...props}>
        <Column
          columnKey='avatar'
          header={<Cell className={css(styles.newTableHeader)}></Cell>}
          cell={<ImageCell className={css(styles.newCellBorder)} data={dataList} />}
          fixed={true}
          width={50}
        />
        <Column
          columnKey='firstName'
          header={<Cell className={css(styles.newTableHeader)}>First Name</Cell>}
          cell={<TextCell className={css(styles.newCellBorder)} data={dataList} />}
          fixed={true}
          width={150}
        />
        <Column
          columnKey='lastName'
          header={<Cell className={css(styles.newTableHeader)}>Last Name</Cell>}
          cell={<TextCell className={css(styles.newCellBorder)} data={dataList} />}
          width={150}
        />
        <Column
          columnKey='companyName'
          header={<Cell className={css(styles.newTableHeader)}>Company</Cell>}
          cell={<TextCell className={css(styles.newCellBorder)} data={dataList} />}
          width={200}
        />
      </Table>
    );
  }
}

const styles = StyleSheet.create({
 wrapperStyles: {
    marginTop: '1rem',
    marginLeft: '1rem',
    marginRight: '3rem',
    border: 'none',
    overflow:'hidden',
    height: '100%'
  },
  newTableHeader: {
    color: '#000',
    fontSize: '12px',
    lineHeight: '1',
    background: '#CCFFEE',
    border: 'none'
  }
});

module.exports = StylingExample;
