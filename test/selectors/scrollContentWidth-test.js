/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import scrollContentWidth from 'scrollContentWidth';

describe('scrollContentWidth', function() {
  it('should sum the widths of the columns', function() {
    const columns = {
      allColumns: [{
        width: 20,
      }, {
        width: 200,
      }, {
        width: 110,
      }, {
        width: 320,
      }],
    };
    assert.strictEqual(scrollContentWidth.resultFunc(columns), 650);
  });
});
