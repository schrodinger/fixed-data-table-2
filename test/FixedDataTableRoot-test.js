/**
 * Copyright Schrodinger, LLC
 */

import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import FixedDataTable from '../src/FixedDataTableRoot';
import { createRenderer, isElement, renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

const { Table, Column } = FixedDataTable;

describe('FixedDataTableRoot', function() {
  describe('render ', function() {
    it('should not crash and burn', function() {
      let table = (
        <Table
          width={600}
          height={400}
          rowsCount={5}
          rowHeight={100}
          headerHeight={50}
        >
          <Column
            width={300}
          />
        </Table>
      );
      let renderer = createRenderer();
      renderer.render(table);
      let tableRender = renderer.getRenderOutput();

      assert.isTrue(isElement(tableRender));
    });
  });

  class TestTable extends React.Component {
    constructor(props) {
      super(props);
    }

    /**
     * Returns state from FDT.Table object for unit testing
     *
     * @return {!Object}
     */
    getTableState() {
      return this.refs['table'].state;
    }

    render() {
      return (
        <Table
          ref="table"
          width={600}
          height={400}
          rowsCount={50}
          rowHeight={100}
          headerHeight={50}
          {...this.props}
        >
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
        </Table>
      );
    }
  }

  let node;

  beforeEach(function() {
    node = document.createElement('div');
  });

  const renderTable = (optionalProps = {}) => {
    let renderedTree = ReactDOM.render(<TestTable {...optionalProps} />, node);
    return findRenderedComponentWithType(renderedTree, TestTable);
  };

  describe('initial render', function() {
    it('should set scrollLeft correctly', function() {
      let table = renderTable({scrollLeft: 300});
      assert.equal(table.getTableState().scrollX, 300, 'should set scrollX to 300');
    });

    it('should set scrollTop correctly', function() {
      let table = renderTable({scrollTop: 600});
      assert.equal(table.getTableState().scrollY, 600, 'should set scrollY to 600');
    });

    it('should set scrollToColumn correctly', function() {
      let table = renderTable({scrollToColumn: 3});
      // extra 18 comes from Scrollbar.SIZE & Scrollbar.OFFSET
      assert.equal(table.getTableState().scrollX, 300 * 2 + 18, 'should be third visible column');
    });

    it('should set scrollToRow correctly', function() {
      let table = renderTable({scrollToRow: 30, height: 300});
      //scrollToRow is considered valid if row is visible. Test to make sure that row is somewhere in between
      assert.isBelow(table.getTableState().scrollY, 30 * 100, 'should be below first row');
      assert.isAbove(table.getTableState().scrollY, 30 * 100 - 300, 'should be above last row');
    });
  });

  describe('update render', function() {
    it('should update scrollLeft correctly', function() {
      let table = renderTable({scrollLeft: 300});
      assert.equal(table.getTableState().scrollX, 300, 'should set scrollX to 300');
      table = renderTable({scrollLeft: 600});
      assert.equal(table.getTableState().scrollX, 600, 'should set scrollX to 600');
    });

    it('should update scrollTop correctly', function() {
      let table = renderTable({scrollTop: 600});
      assert.equal(table.getTableState().scrollY, 600, 'should set scrollY to 600');

      table = renderTable({scrollTop: 300});
      assert.equal(table.getTableState().scrollY, 300, 'should set scrollY to 300');
    });

    it('should update scrollToColumn correctly', function() {
      let table = renderTable({scrollToColumn: 3});
      assert.equal(table.getTableState().scrollX, 300 * 2, 'should be third visible column');
      table = renderTable({scrollToColumn: 1});
      assert.equal(table.getTableState().scrollX, 300 * 1, 'should be first visible column');
    });

    it('should update scrollToRow correctly', function() {
      let table = renderTable({scrollToRow: 30, height: 300});
      //scrollToRow is considered valid if row is visible. Test to make sure that row is somewhere in between
      assert.isAtMost(table.getTableState().scrollY, 30 * 100, 'should be below first row');
      assert.isAtLeast(table.getTableState().scrollY, 30 * 100 - 300, 'should be above last row');
      table = renderTable({scrollToRow: 20, height: 100});
      assert.isAtMost(table.getTableState().scrollY, 20 * 100, 'should be below first row');
      assert.isAtLeast(table.getTableState().scrollY, 20 * 100 - 100, 'should be above last row');
    });
  });

  describe('unset props', function() {
    it('should not blow up when unsetting the scrollLeft property', function() {
      let table = renderTable({scrollLeft: 300});
      assert.doesNotThrow(function() {
        renderTable({scrollLeft: undefined});
      });
    });

    it('should not blow up when unsetting the scrollTop property', function() {
      let table = renderTable({scrollTop: 600});
      assert.doesNotThrow(function() {
        renderTable({scrollTop: undefined});
      });
    });

    it('should not blow up when unsetting the scrollToColumn property', function() {
      let table = renderTable({scrollToColumn: 3});
      assert.doesNotThrow(function() {
        renderTable({scrollToColumn: undefined});
      });
    });

    it('should not blow up when unsetting the scrollToRow property', function() {
      let table = renderTable({scrollToRow: 30});
      assert.doesNotThrow(function() {
        renderTable({scrollToRow: undefined});
      });
    });

    it('should set scrollToRow correctly when height changes', function() {
      let table = renderTable({ height: 0, scrollToRow: 30 });
      table.setState({ height: 200 });
      assert.equal(table.getTableState().scrollY, 30 * 100, 'should be scrolled to 30th row');
    });
  });
});
