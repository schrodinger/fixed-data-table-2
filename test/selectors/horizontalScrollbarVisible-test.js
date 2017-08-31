/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import horizontalScrollbarVisible, { ScrollbarState } from 'horizontalScrollbarVisible';

describe('horizontalScrollbarVisible', function() {
  it('should show scrollbar if content width exceeds width', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', true, 1000, 800);
    assert.strictEqual(result, ScrollbarState.VISIBLE);
  });

  it('should have a conditional scrollbar if content is within a scrollbar size of width', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', true, 790, 800);
    assert.strictEqual(result, ScrollbarState.IF_VERTICAL_VISIBLE);
  });

  it('should show not show scrollbar if content width is less than width', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', true, 500, 800);
    assert.strictEqual(result, ScrollbarState.HIDDEN);
  });

  it('should not show scrollbar if overflowX is hidden', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'hidden', true, 1000, 800);
    assert.strictEqual(result, ScrollbarState.HIDDEN);
  });

  it('should not show scrollbar if showScrollbarX is false', function() {
    const result = horizontalScrollbarVisible.resultFunc(
      'auto', false, 1000, 800);
    assert.strictEqual(result, ScrollbarState.HIDDEN);
  });
});
