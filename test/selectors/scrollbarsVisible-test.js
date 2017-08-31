/**
 * Copyright Schrodinger, LLC
 */
import { ScrollbarState } from 'horizontalScrollbarVisible';
import { assert } from 'chai';
import scrollbarsVisible from 'scrollbarsVisible';

describe('scrollbarsVisible', function() {
  it('should show scrollbars when content overflows', function() {
    const roughHeights = {
      minAvailableHeight: 785,
      maxAvailableHeight: 785,
    };
    const result = scrollbarsVisible.resultFunc(
      ScrollbarState.VISIBLE, 'auto', roughHeights, 1000, true);

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollsHorizontally: true,
      scrollsVertically: true,
    });
  });

  it('should not show horizontal scrollbar when hidden', function() {
    const roughHeights = {
      minAvailableHeight: 800,
      maxAvailableHeight: 800,
    };
    const result = scrollbarsVisible.resultFunc(
      ScrollbarState.HIDDEN, 'auto', roughHeights, 1000, true);

    assert.deepEqual(result, {
      availableHeight: 800,
      scrollsHorizontally: false,
      scrollsVertically: true,
    });
  });

  it('should not show vertical scrollbar when hidden', function() {
    const roughHeights = {
      minAvailableHeight: 785,
      maxAvailableHeight: 785,
    };
    const result = scrollbarsVisible.resultFunc(
      ScrollbarState.VISIBLE, 'hidden', roughHeights, 1000, true);

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollsHorizontally: true,
      scrollsVertically: false,
    });
  });

  it('should not show vertical scrollbar when disabled', function() {
    const roughHeights = {
      minAvailableHeight: 785,
      maxAvailableHeight: 785,
    };
    const result = scrollbarsVisible.resultFunc(
      ScrollbarState.VISIBLE, 'auto', roughHeights, 1000, false);

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollsHorizontally: true,
      scrollsVertically: false,
    });
  });

  describe('horizontal state is "if vertical is visible"', function() {
    it('should not show scrollbars when vertical content does not overflow', function() {
      const roughHeights = {
        minAvailableHeight: 785,
        maxAvailableHeight: 800,
      };
      const result = scrollbarsVisible.resultFunc(
        ScrollbarState.IF_VERTICAL_VISIBLE, 'auto', roughHeights, 790, true);

      assert.deepEqual(result, {
        availableHeight: 800,
        scrollsHorizontally: false,
        scrollsVertically: false,
      });
    });

    it('should show both scrollbars when vertical content overflows', function() {
      const roughHeights = {
        minAvailableHeight: 785,
        maxAvailableHeight: 800,
      };
      const result = scrollbarsVisible.resultFunc(
        ScrollbarState.IF_VERTICAL_VISIBLE, 'auto', roughHeights, 805, true);

      assert.deepEqual(result, {
        availableHeight: 785,
        scrollsHorizontally: true,
        scrollsVertically: true,
      });
    });
  });
});
