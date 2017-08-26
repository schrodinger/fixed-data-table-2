/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import bufferRowsCount from 'bufferRowsCount';

describe('bufferRowsCount', function() {
  it('should return half the max visible rows count', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 50, 0, { availableHeight: 450 }), 5);
  });

  it('should round max visible rows count up', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 50, 0, { availableHeight: 425 }), 5);
  });

  it('should round buffer rows count down', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 50, 0, { availableHeight: 400 }), 4);
  });

  it('should be at least 3', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 50, 0, { availableHeight: 150 }), 3);
  });

  it('should be at most 6', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(null, 50, 0, { availableHeight: 650 }), 6);
  });

  it('should be settable via prop', function() {
    assert.strictEqual(bufferRowsCount.resultFunc(1, 50, 0, { availableHeight: 450 }), 1);
  });
});
