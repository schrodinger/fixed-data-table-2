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
      var table = (
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
      var renderer = createRenderer();
      renderer.render(table);
      var tableRender = renderer.getRenderOutput();

      assert.isTrue(isElement(tableRender));
    });
  });
});

