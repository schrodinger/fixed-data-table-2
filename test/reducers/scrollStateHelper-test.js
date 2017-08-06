/**
 * Copyright Schrodinger, LLC
 */
import IntegerBufferSet from 'IntegerBufferSet';
import PrefixIntervalTree from 'PrefixIntervalTree';
import { assert } from 'chai';
import scrollStateHelper from 'scrollStateHelper';
import sinon from 'sinon';

describe('scrollStateHelper', function() {
  beforeEach(function() {
    scrollStateHelper.__Rewire__('verticalHeightsSelector', () => ({
      availableHeight: 600,
      bodyHeight: 600,
    }));
  });

  afterEach(function() {
    scrollStateHelper.__ResetDependency__('verticalHeightsSelector');
  });

  describe('computeRenderedRows', function() {
    let sandbox;
    let oldState;
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      scrollStateHelper.__Rewire__('bufferRowsCountSelector', () => 2);

      const initialStoredHeights = {};
      for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
        initialStoredHeights[rowIdx] = 125;
      }
      oldState = {
        bufferSet: new IntegerBufferSet(),
        placeholder: 'temp',
        rowsCount: 80,
        rowHeightGetter: () => 125,
        rowOffsets: PrefixIntervalTree.uniform(80, 125),
        storedHeights: initialStoredHeights,
        scrollContentHeight: 10000,
        subRowHeightGetter: () => 0,
      };
    });

    afterEach(function() {
      sandbox.restore();
      scrollStateHelper.__ResetDependency__('bufferRowsCountSelector');
    });

    it('should update bufferSet & row heights for buffered rows', function() {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };

      const newState = scrollStateHelper.computeRenderedRows(oldState, scrollAnchor);

      const expectedRowHeights = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 22; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowHeights[rowIdx] = rowIdx * 125;

        assert.strictEqual(newState.storedHeights[rowIdx], 125,
          'expected stored height of 125 for each row');
        assert.strictEqual(newState.rowOffsets.get(rowIdx), 125,
          'expected row offsets for each row to be set to 125');
        assert.isNotNull(newState.bufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`);
      }

      assert.isNull(newState.bufferSet.getValuePosition(12),
        'expected no buffer position for other row');

      assert.deepEqual(newState, Object.assign(oldState, {
        firstRowIndex: 15,
        firstRowOffset: -25,
        maxScrollY: 9400,
        rowHeights: expectedRowHeights,
        rows: expectedRows,
        scrollY: 1900,
      }));
    });

    it('should work as expected when lastIndex is specified', function() {
      const scrollAnchor = {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 30,
      };

      const newState = scrollStateHelper.computeRenderedRows(oldState, scrollAnchor);

      const expectedRowHeights = {};
      const expectedRows = [];
      for (let rowIdx = 24; rowIdx < 33; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowHeights[rowIdx] = rowIdx * 125;

        assert.strictEqual(newState.storedHeights[rowIdx], 125,
          'expected stored height of 125 for each row');
        assert.strictEqual(newState.rowOffsets.get(rowIdx), 125,
          'expected row offsets for each row to be set to 125');
        assert.isNotNull(newState.bufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`);
      }

      assert.isNull(newState.bufferSet.getValuePosition(12),
        'expected no buffer position for other row');

      assert.deepEqual(newState, Object.assign(oldState, {
        firstRowIndex: 26,
        firstRowOffset: -25,
        maxScrollY: 9400,
        rowHeights: expectedRowHeights,
        rows: expectedRows,
        scrollY: 3275,
      }));
    });

    it('should handle things well when rowsCount is 0', function() {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };
      oldState.rowsCount = 0;

      const newState = scrollStateHelper.computeRenderedRows(oldState, scrollAnchor);

      assert.deepEqual(newState, Object.assign(oldState, {
        maxScrollY: 9400,
        rowHeights: {},
        rows: [],
        scrollY: 0,
      }));
    });

    it('should clamp scrollY to maxScrollY', function() {
      const scrollAnchor = {
        firstIndex: 90,
        firstOffset: 0,
        lastIndex: undefined,
      };

      const newState = scrollStateHelper.computeRenderedRows(oldState, scrollAnchor);

      const expectedRowHeights = {};
      const expectedRows = [];
      for (let rowIdx = 73; rowIdx < 80; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowHeights[rowIdx] = rowIdx * 125;

        assert.strictEqual(newState.storedHeights[rowIdx], 125,
          'expected stored height of 125 for each row');
        assert.strictEqual(newState.rowOffsets.get(rowIdx), 125,
          'expected row offsets for each row to be set to 125');
        assert.isNotNull(newState.bufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`);
      }

      assert.isNull(newState.bufferSet.getValuePosition(80),
        'expected no buffer position for other row');

      assert.deepEqual(newState, Object.assign(oldState, {
        firstRowIndex: 75,
        firstRowOffset: -25,
        maxScrollY: 9400,
        rowHeights: expectedRowHeights,
        rows: expectedRows,
        scrollY: 9400,
      }));
    });

    it('should update row heights and scrollContentHeight', function() {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };
      oldState.rowHeightGetter = () => 200;

      const rowOffsetsMock = sandbox.mock(PrefixIntervalTree.prototype);
      oldState.rowOffsets = PrefixIntervalTree.uniform(80, 125);
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        rowOffsetsMock.expects('set').once().withArgs(rowIdx, 200);
      }

      const newState = scrollStateHelper.computeRenderedRows(oldState, scrollAnchor);
      sandbox.verify();

      let priorHeight = 1625;
      const expectedRowHeights = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowHeights[rowIdx] = priorHeight;
        priorHeight += 200;

        assert.strictEqual(newState.storedHeights[rowIdx], 200,
          'expected stored height of 200 for each row');
      }

      assert.deepEqual(newState, Object.assign(oldState, {
        firstRowIndex: 15,
        firstRowOffset: -25,
        maxScrollY: 10000,
        rowHeights: expectedRowHeights,
        rows: expectedRows,
        scrollContentHeight: 10600,
        scrollY: 2050,
      }));
    });
  });

  describe('scrollTo', function() {
    let oldState;
    beforeEach(function() {
      oldState = {
        rowOffsets: {
          greatestLowerBound: (scrollY) => Math.floor(scrollY / 100),
          sumUntil: (idx) => idx * 100,
        },
        rowsCount: 100,
        scrollContentHeight: 10000,
      };
    });

    it('should scroll to row and offset of scrollY', function() {
      const scrollAnchor = scrollStateHelper.scrollTo(oldState, 2150);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 21,
        firstOffset: -50,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should scroll to first index if scrollY < 0', function() {
      const scrollAnchor = scrollStateHelper.scrollTo(oldState, -200);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should scroll to last index if scrollY is larger than max scroll', function() {
      const scrollAnchor = scrollStateHelper.scrollTo(oldState, 9500);
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 99,
        changed: true,
      });
    });

    it('should scroll to first index if rowsCount is 0', function() {
      oldState.rowsCount = 0;
      const scrollAnchor = scrollStateHelper.scrollTo(oldState, 9500);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });
  });

  describe('scrollToRow', function() {
    let oldState;
    beforeEach(function() {
      oldState = {
        rowOffsets: {
          sumUntil: (idx) => idx * 100,
        },
        rowsCount: 100,
        storedHeights: {
          0: 100,
          40: 100,
          99: 100,
        },
      };
    });

    it('should scroll forward to row', function() {
      oldState.scrollY = 2000;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, 40);
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 40,
        changed: true,
      });
    });

    it('should scroll backward to row', function() {
      oldState.scrollY = 5000;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, 40);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 40,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should not scroll if row already in viewport', function() {
      oldState.scrollY = 3850;
      oldState.firstRowIndex = 38;
      oldState.firstRowOffset = 50;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, 40);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 38,
        firstOffset: 50,
        lastIndex: undefined,
        changed: false,
      });
    });

    it('should return default anchor if rowsCount is 0', function() {
      oldState.firstRowIndex = 0;
      oldState.firstRowOffset = 50;
      oldState.rowsCount = 0;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, 40);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should treat a negative row index as 0', function() {
      oldState.scrollY = 2000;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, -20);
      assert.deepEqual(scrollAnchor, {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: true,
      });
    });

    it('should clamp to the max row', function() {
      oldState.scrollY = 2000;

      const scrollAnchor = scrollStateHelper.scrollToRow(oldState, 200);
      assert.deepEqual(scrollAnchor, {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 99,
        changed: true,
      });
    });
  });
});
