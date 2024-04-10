/**
 * Copyright Schrodinger, LLC
 */
import { expect, jest } from '@jest/globals';
import IntegerBufferSet from '../../src/vendor_upstream/struct/IntegerBufferSet';
import PrefixIntervalTree from '../../src/vendor_upstream/struct/PrefixIntervalTree';
import clone from 'lodash/clone';

import computeRenderedRows from '../../src/reducers/computeRenderedRows';
import * as roughHeightsSelector from '../../src/selectors/roughHeights';
import * as scrollbarsVisibleSelector from '../../src/selectors/scrollbarsVisible';
import * as tableHeightsSelector from '../../src/selectors/tableHeights';

describe('computeRenderedRows', function () {
  beforeEach(function () {
    jest.spyOn(roughHeightsSelector, 'default').mockImplementation(() => ({
      bufferRowCount: 2,
      maxAvailableHeight: 600,
    }));
    jest.spyOn(scrollbarsVisibleSelector, 'default').mockImplementation(() => ({
      availableHeight: 600,
    }));
    jest.spyOn(tableHeightsSelector, 'default').mockImplementation(() => ({
      bodyHeight: 600,
    }));
  });

  afterEach(function () {
    jest.restoreAllMocks();
  });

  describe('computeRenderedRows', function () {
    let oldState;
    let newState;
    beforeEach(function () {
      const initialStoredHeights = {};
      for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
        initialStoredHeights[rowIdx] = 125;
      }
      const createInternalStateGetter = () => {
        const internalState = {
          rowBufferSet: new IntegerBufferSet(),
          rowOffsetIntervalTree: PrefixIntervalTree.uniform(80, 125),
          storedHeights: clone(initialStoredHeights),
        };
        return () => internalState;
      };
      oldState = {
        placeholder: 'temp',
        getInternal: createInternalStateGetter(),
        rowSettings: {
          rowsCount: 80,
          rowHeightGetter: () => 125,
          subRowHeightGetter: () => 0,
        },
        scrollContentHeight: 10000,
      };
      newState = clone(oldState);
      // NOTE (pradeep): getInternal is a function, and hence cannot be cloned directly
      newState.getInternal = createInternalStateGetter();
    });

    afterEach(function () {
      jest.restoreAllMocks();
    });

    it('should update rowBufferSet & row heights for buffered rows', function () {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };

      computeRenderedRows(newState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 22; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        // expected stored height of 125 for each row
        expect(newState.getInternal().storedHeights[rowIdx]).toBe(125);
        // expected row offsets for each row to be set to 125
        expect(newState.getInternal().rowOffsetIntervalTree.get(rowIdx)).toBe(
          125
        );
        // expected a buffer position for each row
        expect(
          newState.getInternal().rowBufferSet.getValuePosition(rowIdx)
        ).not.toBeNull();
      }

      // expected no buffer position for other row
      expect(
        newState.getInternal().rowBufferSet.getValuePosition(12)
      ).toBeNull();

      expect(newState).toEqual(
        Object.assign(oldState, {
          firstRowIndex: 15,
          endRowIndex: 20,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 1900,
          getInternal: newState.getInternal,
        })
      );
    });

    it('should work as expected when lastIndex is specified', function () {
      const scrollAnchor = {
        firstIndex: undefined,
        firstOffset: 0,
        lastIndex: 30,
      };

      computeRenderedRows(newState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 24; rowIdx < 33; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        // expected stored height of 125 for each row
        expect(newState.getInternal().storedHeights[rowIdx]).toBe(125);
        // expected row offsets for each row to be set to 125
        expect(newState.getInternal().rowOffsetIntervalTree.get(rowIdx)).toBe(
          125
        );
        // expected a buffer position for each row
        expect(
          newState.getInternal().rowBufferSet.getValuePosition(rowIdx)
        ).not.toBeNull();
      }

      // expected no buffer position for other row
      expect(
        newState.getInternal().rowBufferSet.getValuePosition(12)
      ).toBeNull();
      expect(newState).toEqual(
        Object.assign(oldState, {
          firstRowIndex: 26,
          endRowIndex: 31,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 3275,
          getInternal: newState.getInternal,
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

      computeRenderedRows(newState, scrollAnchor);

      expect(newState).toEqual(
        Object.assign(oldState, {
          endRowIndex: 0,
          firstRowIndex: 0,
          firstRowOffset: 0,
          maxScrollY: 9400,
          rowOffsets: {},
          rows: [],
          scrollY: 0,
          getInternal: newState.getInternal,
        })
      );
    });

    it('should clamp scrollY to maxScrollY', function () {
      const scrollAnchor = {
        firstIndex: 90,
        firstOffset: 0,
        lastIndex: undefined,
      };

      computeRenderedRows(newState, scrollAnchor);

      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 73; rowIdx < 80; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = rowIdx * 125;

        // expected stored height of 125 for each row
        expect(newState.getInternal().storedHeights[rowIdx]).toBe(125);
        // expected row offsets for each row to be set to 125
        expect(newState.getInternal().rowOffsetIntervalTree.get(rowIdx)).toBe(
          125
        );
        // expected a buffer position for each row
        expect(
          newState.getInternal().rowBufferSet.getValuePosition(rowIdx)
        ).not.toBeNull();
      }

      // expected no buffer position for other row
      expect(
        newState.getInternal().rowBufferSet.getValuePosition(80)
      ).toBeNull();

      expect(newState).toEqual(
        Object.assign(oldState, {
          firstRowIndex: 75,
          endRowIndex: 80,
          firstRowOffset: -25,
          maxScrollY: 9400,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollY: 9400,
          getInternal: newState.getInternal,
        })
      );
    });

    it('should update row heights and scrollContentHeight', function () {
      const scrollAnchor = {
        firstIndex: 15,
        firstOffset: -25,
        lastIndex: undefined,
      };
      newState.rowSettings.rowHeightGetter = () => 200;

      const rowOffsetIntervalTreeSetMock = jest.spyOn(
        PrefixIntervalTree.prototype,
        'set'
      );
      newState.getInternal().rowOffsetIntervalTree = PrefixIntervalTree.uniform(
        80,
        125
      );

      computeRenderedRows(newState, scrollAnchor);
      expect(rowOffsetIntervalTreeSetMock).toHaveBeenCalledTimes(8);
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        expect(rowOffsetIntervalTreeSetMock).toBeCalledWith(rowIdx, 200);
      }

      let priorHeight = 1625;
      const expectedRowOffsets = {};
      const expectedRows = [];
      for (let rowIdx = 13; rowIdx < 21; rowIdx++) {
        expectedRows.push(rowIdx);
        expectedRowOffsets[rowIdx] = priorHeight;
        priorHeight += 200;

        // expected stored height of 200 for each row
        expect(newState.getInternal().storedHeights[rowIdx]).toBe(200);
      }

      expect(newState).toEqual(
        Object.assign(oldState, {
          firstRowIndex: 15,
          endRowIndex: 19,
          firstRowOffset: -25,
          maxScrollY: 10000,
          rowOffsets: expectedRowOffsets,
          rows: expectedRows,
          scrollContentHeight: 10600,
          scrollY: 2050,
          getInternal: newState.getInternal,
        })
      );
    });
  });
});
