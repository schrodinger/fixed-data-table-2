/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import fixedColumnsWidth from 'fixedColumnsWidth';

describe('fixedColumnsWidth', function() {
  it('should sum the widths of the columns', function() {
    const columns = {
      fixedColumns: [{
        width: 20,
      }, {
        width: 200,
      }, {
        width: 110,
      }, {
        width: 320,
      }],
    };
    assert.strictEqual(fixedColumnsWidth.resultFunc(columns), 650);
  });
});
