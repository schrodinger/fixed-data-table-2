/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import { ImageCell, TextCell } from './helpers/cells';
import { Table, DataCell } from 'fixed-data-table-2';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class StylingExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    const { dataList } = this.state;
    const { width, ...props } = this.props;
    return (
      <Table
        className={css(styles.wrapperStyles)}
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={550}
        height={500}
        columnsCount={4}
        getColumn={(i) =>
          [
            {
              columnKey: 'avatar',
              header: (
                <DataCell className={css(styles.newTableHeader)}></DataCell>
              ),
              cell: (
                <ImageCell
                  className={css(styles.newCellBorder)}
                  data={dataList}
                />
              ),
              fixed: true,
              width: 50,
            },
            {
              columnKey: 'firstName',
              header: (
                <DataCell className={css(styles.newTableHeader)}>
                  First Name
                </DataCell>
              ),
              cell: (
                <TextCell
                  className={css(styles.newCellBorder)}
                  data={dataList}
                />
              ),
              fixed: true,
              width: 150,
            },
            {
              columnKey: 'lastName',
              header: (
                <DataCell className={css(styles.newTableHeader)}>
                  Last Name
                </DataCell>
              ),
              cell: (
                <TextCell
                  className={css(styles.newCellBorder)}
                  data={dataList}
                />
              ),
              width: 150,
            },
            {
              columnKey: 'companyName',
              header: (
                <DataCell className={css(styles.newTableHeader)}>
                  Company
                </DataCell>
              ),
              cell: (
                <TextCell
                  className={css(styles.newCellBorder)}
                  data={dataList}
                />
              ),
              width: 200,
            },
          ][i]
        }
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyles: {
    marginTop: '1rem',
    marginLeft: '1rem',
    marginRight: '3rem',
    border: 'none',
    overflow: 'hidden',
    height: '100%',
  },
  newTableHeader: {
    color: '#000',
    fontSize: '12px',
    lineHeight: '1',
    background: '#CCFFEE',
    border: 'none',
  },
});

export default StylingExample;
