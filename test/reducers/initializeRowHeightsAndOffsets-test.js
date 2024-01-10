import { initializeRowHeightsAndOffsets } from '../../src/reducers';
import { assert } from 'chai';
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
      assert.strictEqual(
        newState.getInternal().storedHeights[rowIdx],
        125,
        'expected stored height of 125 for each row'
      );
      assert.strictEqual(
        newState.getInternal().rowOffsetIntervalTree.get(rowIdx),
        125,
        'expected row offsets for each row to be set to 125'
      );
    }
    assert.strictEqual(
      newState.scrollContentHeight,
      10000,
      'expected scrollContentHeight to be 10000'
    );
  });

  it('if isVerticalScrollExact = true then rowHeightGetter() is used for all the rows', function () {
    newState.isVerticalScrollExact = true;
    initializeRowHeightsAndOffsets(newState);
    for (let rowIdx = 0; rowIdx < 80; rowIdx++) {
      const expectedRowHeight = rowIdx % 2 == 0 ? 100 : 200;
      assert.strictEqual(
        newState.getInternal().storedHeights[rowIdx],
        expectedRowHeight,
        'expected stored height of ' + expectedRowHeight + ' for row ' + rowIdx
      );
      assert.strictEqual(
        newState.getInternal().rowOffsetIntervalTree.get(rowIdx),
        expectedRowHeight,
        'expected row offsets for row ' +
          rowIdx +
          ' to be set to ' +
          expectedRowHeight
      );
    }
    assert.strictEqual(
      newState.scrollContentHeight,
      12000,
      'expected scrollContentHeight to be 12000'
    );
  });
});
