import { expect } from '@jest/globals';
import { initializeRowHeightsAndOffsets } from '../../src/reducers';
import clone from 'lodash/clone';

describe('initializeRowHeightsAndOffsets', function () {
  let oldState;
  let newState;
  beforeEach(function () {
    const createInternalStateGetter = () => {
      const internalState = {};
      return () => internalState;
    };
    oldState = {
      getInternal: createInternalStateGetter(),
      rowSettings: {
        rowsCount: 80,
        rowHeight: 125,
        subRowHeight: 0,
        rowHeightGetter: (rowIndex) => (rowIndex % 2 == 0 ? 100 : 200),
        subRowHeightGetter: () => 0,
      },
    };
    newState = clone(oldState);
    newState.getInternal = createInternalStateGetter();
  });
  it('if isVerticalScrollExact = false then rowheight is used instead of rowHeightGetter() for all the rows', function () {
    initializeRowHeightsAndOffsets(newState);
    for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
      expect(newState.getInternal().storedHeights[rowIdx]).toBe(125);
      expect(newState.getInternal().rowOffsetIntervalTree.get(rowIdx)).toBe(
        125
      );
    }
    expect(newState.scrollContentHeight).toBe(10000);
  });

  it('if isVerticalScrollExact = true then rowHeightGetter() is used for all the rows', function () {
    newState.isVerticalScrollExact = true;
    initializeRowHeightsAndOffsets(newState);
    for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
      const expectedRowHeight = rowIdx % 2 == 0 ? 100 : 200;
      expect(newState.getInternal().storedHeights[rowIdx]).toBe(
        expectedRowHeight
      );
      expect(newState.getInternal().rowOffsetIntervalTree.get(rowIdx)).toBe(
        expectedRowHeight
      );
    }
    expect(newState.scrollContentHeight).toBe(12000);
  });
});
