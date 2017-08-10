/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import horizontalScrollbarVisible from 'horizontalScrollbarVisible';

describe('horizontalScrollbarVisible', function() {
  it('should show scrollbar if content width exceeds width', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', true, 1000, 800);
    assert.isTrue(result);
  });

  it('should show not show scrollbar if content width is less than width', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', true, 500, 800);
    assert.isFalse(result);
  });

  it('should not show scrollbar if overflowX is hidden', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'hidden', true, 1000, 800);
    assert.isFalse(result);
  });

  it('should not show scrollbar if showScrollbarX is false', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', false, 1000, 800);
    assert.isFalse(result);
  });
});
