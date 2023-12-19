/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import {
  __RewireAPI__,
  getScrollAnchor,
} from '../../src/reducers/scrollAnchor';
import PrefixIntervalTree from '../../src/vendor_upstream/struct/PrefixIntervalTree';

describe('scrollAnchor', function () {
  beforeEach(function () {
    __RewireAPI__.__Rewire__('scrollbarsVisibleSelector', () => ({
      availableHeight: 600,
    }));
  });

  afterEach(function () {
    __RewireAPI__.__ResetDependency__('scrollbarsVisibleSelector');
  });

  describe('scrollTo', function () {
    let oldState;
    beforeEach(function () {
      const oldInternalState = {
        rowOffsetIntervalTree: {
          greatestLowerBound: (scrollY) => Math.floor(scrollY / 100),
          sumUntil: (idx) => idx * 100,
        },
      };
      oldState = {
        getInternal: () => oldInternalState,
        rowSettings: {
          rowsCount: 100,
        },
        scrollContentHeight: 10000,
      };
    });

    it('should scroll to row and offset of scrollY', function () {
      const scrollAnchor = getScrollAnchor(oldState, { scrollTop: 2150 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 21,
        firstOffset: -50,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should scroll to first index if scrollY < 0', function () {
      const scrollAnchor = getScrollAnchor(oldState, { scrollTop: -200 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should scroll to last index if scrollY is larger than max scroll', function () {
      const scrollAnchor = getScrollAnchor(oldState, { scrollTop: 9500 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 99,
        changed: true,
      });
    });

    it('should scroll to first index if rowsCount is 0', function () {
      oldState.rowSettings.rowsCount = 0;

      const scrollAnchor = getScrollAnchor(oldState, { scrollTop: 9500 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    describe('scrollTo if rowHeightGetter() is set', function () {
      beforeEach(function () {
        oldState.getInternal().rowOffsetIntervalTree =
          PrefixIntervalTree.uniform(100, 50);
        const storedHeights = new Array(100);
        for (let idx = 0; idx < 100; idx++) {
          storedHeights[idx] = 50;
        }
        oldState.getInternal().storedHeights = storedHeights;

        oldState.rowSettings = {
          rowsCount: 100,
          rowHeightGetter: () => 100,
          subRowHeightGetter: () => 0,
        };
      });
      it('should ask for rowHeightGetter() if the row height were not computed before', function () {
        oldState.getInternal().rowUntilOffsetsAreExact = 0;
        oldState.isVerticalScrollExact = true;

        let scrollAnchor = getScrollAnchor(oldState, { scrollTop: 300 }, {});
        assert.deepEqual(scrollAnchor, {
          firstIndex: 3,
          firstOffset: 0,
          lastIndex: undefined,
          changed: true,
        });
      });

      it('should use the cached row heights if they were computed before', function () {
        oldState.getInternal().rowUntilOffsetsAreExact = 4;
        oldState.isVerticalScrollExact = true;

        let scrollAnchor = getScrollAnchor(oldState, { scrollTop: 300 }, {});
        assert.deepEqual(scrollAnchor, {
          firstIndex: 5,
          firstOffset: 0,
          lastIndex: undefined,
          changed: true,
        });
      });
    });
  });

  describe('scrollToRow', function () {
    let oldState;
    beforeEach(function () {
      const oldInternalState = {
        rowOffsetIntervalTree: {
          sumUntil: (idx) => idx * 100,
        },
        storedHeights: {
          0: 100,
          40: 100,
          99: 100,
        },
      };
      oldState = {
        getInternal: () => oldInternalState,
        rowSettings: {
          rowsCount: 100,
          rowHeightGetter: () => 100,
          subRowHeightGetter: () => 0,
        },
      };
    });

    it('should scroll forward to row', function () {
      oldState.scrollY = 2000;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: 40 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 40,
        changed: true,
      });
    });

    it('should scroll backward to row', function () {
      oldState.scrollY = 5000;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: 40 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 40,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should not scroll if row already in viewport', function () {
      oldState.scrollY = 3850;
      oldState.firstRowIndex = 38;
      oldState.firstRowOffset = 50;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: 40 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 38,
        firstOffset: 50,
        lastIndex: undefined,
        changed: false,
      });
    });

    it('should return default anchor if rowsCount is 0', function () {
      oldState.firstRowIndex = 0;
      oldState.firstRowOffset = 50;
      oldState.rowSettings.rowsCount = 0;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: 40 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should treat a negative row index as 0', function () {
      oldState.scrollY = 2000;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: -20 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should clamp to the max row', function () {
      oldState.scrollY = 2000;

      const scrollAnchor = getScrollAnchor(oldState, { scrollToRow: 200 }, {});
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 99,
        changed: true,
      });
    });
  });
});
