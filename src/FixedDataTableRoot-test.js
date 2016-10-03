/**
 * Copyright Schrodinger, LLC
 */

import { assert } from 'chai';
import React from 'react';
import FixedDataTable from './FixedDataTableRoot';
import { createRenderer, isElement } from 'react-addons-test-utils';

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

  describe('initial render', function() {
    const renderTable = (optionalProps = {}) => {
      let table = (
        <Table
          width={600}
          height={400}
          rowsCount={50}
          rowHeight={100}
          headerHeight={50}
          {...optionalProps}
        >
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
        </Table>
      );
      let renderer = createRenderer();
      renderer.render(table);
      return renderer.getMountedInstance();
    };

    it('should set scrollLeft correctly', function() {
      let table = renderTable({scrollLeft: 300});
      assert.equal(table.state.scrollX, 300, 'should set scrollX to 300');
    });

    it('should set scrollTop correctly', function() {
      let table = renderTable({scrollTop: 600});
      assert.equal(table.state.scrollY, 600, 'should set scrollY to 600');
    });

    it('should set scrollToColumn correctly', function() {
      let table = renderTable({scrollToColumn: 3});
      assert.equal(table.state.scrollX, 300 * 2, 'should be third visible column');
    });

    it('should set scrollToRow correctly', function() {
      let table = renderTable({scrollToRow: 30, height: 300});
      //scrollToRow is considered valid if row is visible. Test to make sure that row is somewhere in between
      assert.isBelow(table.state.scrollY, 30 * 100, 'should be below first row');
      assert.isAbove(table.state.scrollY, 30 * 100 - 300, 'should be above last row');
    });

  });
});

