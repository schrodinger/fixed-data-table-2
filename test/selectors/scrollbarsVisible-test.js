/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';

import { ScrollbarState } from '../../src/selectors/roughHeights';
import scrollbarsVisible from '../../src/selectors/scrollbarsVisible';

describe('scrollbarsVisible', function () {
  let roughHeights;
  let scrollFlags;

  beforeEach(function () {
    roughHeights = {
      minAvailableHeight: 785,
      maxAvailableHeight: 785,
      scrollStateX: ScrollbarState.VISIBLE,
    };

    scrollFlags = {
      overflowY: 'auto',
      showScrollbarY: true,
    };
  });

  it('should show scrollbars when content overflows', function () {
    const result = scrollbarsVisible.resultFunc(
      roughHeights,
      1000,
      scrollFlags
    );

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollEnabledX: true,
      scrollEnabledY: true,
    });
  });

  it('should not show horizontal scrollbar when hidden', function () {
    roughHeights = {
      minAvailableHeight: 800,
      maxAvailableHeight: 800,
      scrollStateX: ScrollbarState.HIDDEN,
    };

    const result = scrollbarsVisible.resultFunc(
      roughHeights,
      1000,
      scrollFlags
    );

    assert.deepEqual(result, {
      availableHeight: 800,
      scrollEnabledX: false,
      scrollEnabledY: true,
    });
  });

  it('should not show vertical scrollbar when hidden', function () {
    scrollFlags.overflowY = 'hidden';

    const result = scrollbarsVisible.resultFunc(
      roughHeights,
      1000,
      scrollFlags
    );

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollEnabledX: true,
      scrollEnabledY: false,
    });
  });

  it('should not show vertical scrollbar when disabled', function () {
    scrollFlags.showScrollbarY = false;

    const result = scrollbarsVisible.resultFunc(
      roughHeights,
      1000,
      scrollFlags
    );

    assert.deepEqual(result, {
      availableHeight: 785,
      scrollEnabledX: true,
      scrollEnabledY: false,
    });
  });

  describe('horizontal state is "if vertical is visible"', function () {
    beforeEach(function () {
      roughHeights = {
        minAvailableHeight: 785,
        maxAvailableHeight: 800,
        scrollStateX: ScrollbarState.JOINT_SCROLLBARS,
      };

      scrollFlags = {
        overflowY: 'auto',
        showScrollbarY: true,
      };
    });

    it('should not show scrollbars when vertical content does not overflow', function () {
      const result = scrollbarsVisible.resultFunc(
        roughHeights,
        790,
        scrollFlags
      );

      assert.deepEqual(result, {
        availableHeight: 800,
        scrollEnabledX: false,
        scrollEnabledY: false,
      });
    });

    it('should show both scrollbars when vertical content overflows', function () {
      const result = scrollbarsVisible.resultFunc(
        roughHeights,
        805,
        scrollFlags
      );

      assert.deepEqual(result, {
        availableHeight: 785,
        scrollEnabledX: true,
        scrollEnabledY: true,
      });
    });
  });
});
