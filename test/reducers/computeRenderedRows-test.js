/**
 * Copyright Schrodinger, LLC
 */
import IntegerBufferSet from '../../src/vendor_upstream/struct/IntegerBufferSet';
import PrefixIntervalTree from '../../src/vendor_upstream/struct/PrefixIntervalTree';
import { assert } from 'chai';
import sinon from 'sinon';

import computeRenderedRows from '../../src/reducers/computeRenderedRows';

describe('computeRenderedRows', function () {
  beforeEach(function () {
    computeRenderedRows.__Rewire__('roughHeightsSelector', () => ({
      bufferRowCount: 2,
      maxAvailableHeight: 600,
    }));
    computeRenderedRows.__Rewire__('scrollbarsVisibleSelector', () => ({
      availableHeight: 600,
    }));
    computeRenderedRows.__Rewire__('tableHeightsSelector', () => ({
      bodyHeight: 600,
    }));
  });

  afterEach(function () {
    computeRenderedRows.__ResetDependency__('roughHeightsSelector');
    computeRenderedRows.__ResetDependency__('scrollbarsVisibleSelector');
    computeRenderedRows.__ResetDependency__('tableHeightsSelector');
  });

  describe('computeRenderedRows', function () {
    let oldState;
    beforeEach(function () {
      const initialStoredHeights = {};
      for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
        initialStoredHeights[rowIdx] = 125;
      }
      oldState = {
        rowBufferSet: new IntegerBufferSet(),
        placeholder: 'temp',
        rowOffsetIntervalTree: PrefixIntervalTree.uniform(80, 125),
        rowSettings: {
          rowsCount: 80,
          rowHeightGetter: () => 125,
          subRowHeightGetter: () => 0,
        },
        storedHeights: initialStoredHeights,
        scrollContentHeight: 10000,
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it('should update rowBufferSet & row heights for buffered rows', function () {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };

      const newState = computeRenderedRows(oldState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 22; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        assert.strictEqual(
          newState.storedHeights[rowIdx],
          125,
          'expected stored height of 125 for each row'
        );
        assert.strictEqual(
          newState.rowOffsetIntervalTree.get(rowIdx),
          125,
          'expected row offsets for each row to be set to 125'
        );
        assert.isNotNull(
          newState.rowBufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`
        );
      }

      assert.isNull(
        newState.rowBufferSet.getValuePosition(12),
        'expected no buffer position for other row'
      );

      assert.deepEqual(
        newState,
        Object.assign(oldState, {
          firstRowIndex: 15,
          endRowIndex: 20,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 1900,
        })
      );
    });

    it('should work as expected when lastIndex is specified', function () {
      const scrollAnchor = {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 30,
      };

      const newState = computeRenderedRows(oldState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 24; rowIdx < 33; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        assert.strictEqual(
          newState.storedHeights[rowIdx],
          125,
          'expected stored height of 125 for each row'
        );
        assert.strictEqual(
          newState.rowOffsetIntervalTree.get(rowIdx),
          125,
          'expected row offsets for each row to be set to 125'
        );
        assert.isNotNull(
          newState.rowBufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`
        );
      }

      assert.isNull(
        newState.rowBufferSet.getValuePosition(12),
        'expected no buffer position for other row'
      );

      assert.deepEqual(
        newState,
        Object.assign(oldState, {
          firstRowIndex: 26,
          endRowIndex: 31,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 3275,
        })
      );
    });

    it('should handle things well when rowsCount is 0', function () {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };
      oldState.rowSettings.rowsCount = 0;

      const newState = computeRenderedRows(oldState, scrollAnchor);

      assert.deepEqual(
        newState,
        Object.assign(oldState, {
          endRowIndex: 0,
          firstRowIndex: 0,
          firstRowOffset: 0,
          maxScrollY: 9400,
          rowOffsets: {},
          rows: [],
          scrollY: 0,
        })
      );
    });

    it('should clamp scrollY to maxScrollY', function () {
      const scrollAnchor = {
        firstIndex: 90,
        firstOffset: 0,
        lastIndex: undefined,
      };

      const newState = computeRenderedRows(oldState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 73; rowIdx < 80; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        assert.strictEqual(
          newState.storedHeights[rowIdx],
          125,
          'expected stored height of 125 for each row'
        );
        assert.strictEqual(
          newState.rowOffsetIntervalTree.get(rowIdx),
          125,
          'expected row offsets for each row to be set to 125'
        );
        assert.isNotNull(
          newState.rowBufferSet.getValuePosition(rowIdx),
          `expected a buffer position for each row. rowIdx: ${rowIdx}`
        );
      }

      assert.isNull(
        newState.rowBufferSet.getValuePosition(80),
        'expected no buffer position for other row'
      );

      assert.deepEqual(
        newState,
        Object.assign(oldState, {
          firstRowIndex: 75,
          endRowIndex: 80,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 9400,
        })
      );
    });

    it('should update row heights and scrollContentHeight', function () {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };
      oldState.rowSettings.rowHeightGetter = () => 200;

      const rowOffsetIntervalTreeMock = sinon.mock(
        PrefixIntervalTree.prototype
      );
      oldState.rowOffsetIntervalTree = PrefixIntervalTree.uniform(80, 125);
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        rowOffsetIntervalTreeMock.expects('set').once().withArgs(rowIdx, 200);
      }

      const newState = computeRenderedRows(oldState, scrollAnchor);
      rowOffsetIntervalTreeMock.verify();

      let priorHeight = 1625;
      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = priorHeight;
        priorHeight += 200;

        assert.strictEqual(
          newState.storedHeights[rowIdx],
          200,
          'expected stored height of 200 for each row'
        );
      }

      assert.deepEqual(
        newState,
        Object.assign(oldState, {
          firstRowIndex: 15,
          endRowIndex: 19,
          firstRowOffset: -25,
          maxScrollY: 10000,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollContentHeight: 10600,
          scrollY: 2050,
        })
      );
    });
  });
});
