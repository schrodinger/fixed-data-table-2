/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import maxVisibleRowCount from 'maxVisibleRowCount';

describe('maxVisibleRowCount', function() {
  it('should return a visible row count estimated from the row height', function() {
    const result = maxVisibleRowCount.resultFunc(50, { availableHeight: 500 });
    assert.strictEqual(result, 11);
  });

  it('should round up', function() {
    const result = maxVisibleRowCount.resultFunc(50, { availableHeight: 510 });
    assert.strictEqual(result, 12);
  });
});
