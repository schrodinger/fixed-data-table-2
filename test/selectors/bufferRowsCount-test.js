/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import bufferRowsCount from 'bufferRowsCount';

describe('bufferRowsCount', function() {
  it('should return half the maxVisibleRowCount', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 10), 5);
  });

  it('should round down', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 9), 4);
  });

  it('should be at least 3', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 4), 3);
  });

  it('should be at most 6', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 14), 6);
  });

  it('should be settable via prop', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(1, 9), 1);
  });
});
