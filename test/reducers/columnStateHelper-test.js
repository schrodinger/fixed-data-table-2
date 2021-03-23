/**
 * Copyright Schrodinger, LLC
 */

import emptyFunction from '../../src/vendor_upstream/core/emptyFunction';
import { assert } from 'chai';

import columnStateHelper from '../../src/reducers/columnStateHelper';

describe('columnStateHelper', function () {
  describe('initialize', function () {
    let availableWidth;
    let oldState;
    beforeEach(function () {
      oldState = {
        columnResizingData: {
          placeholder: true,
        },
        isColumnResizing: true,
        scrollX: 300,
      };
      availableWidth = 200;

      columnStateHelper.__Rewire__('columnWidths', () => ({
        availableScrollWidth: availableWidth - 150,
        fixedColumns: [{ id: 1, width: 150 }],
        maxScrollX: 600 - availableWidth,
        scrollableColumns: [
          { id: 2, width: 150 },
          { id: 3, width: 150 },
          { id: 4, width: 150 },
        ],
      }));
    });

    afterEach(function () {
      columnStateHelper.__ResetDependency__('columnWidths');
    });

    it('should initialize column state as expected', function () {
      const result = columnStateHelper.initialize(oldState, {}, {});

      assert.deepEqual(
        result,
        Object.assign(
          {
            maxScrollX: 400,
          },
          oldState
        )
      );
    });

    it('should clamp scrollX to maxScrollX', function () {
      oldState.scrollX = 700;
      const result = columnStateHelper.initialize(oldState, {}, {});

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 400,
          scrollX: 400,
        })
      );
    });

    it('should use scrollLeft when specified', function () {
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollLeft: 100,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 400,
          scrollX: 100,
        })
      );
    });

    it('should overwrite column resizing from props', function () {
      const result = columnStateHelper.initialize(
        oldState,
        {
          isColumnResizing: false,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          columnResizingData: {},
          isColumnResizing: false,
          maxScrollX: 400,
        })
      );
    });

    it('should scroll to column when specified via prop', function () {
      oldState.scrollX = 0;
      availableWidth = 350;
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollToColumn: 2,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 100,
        })
      );
    });

    it('should scroll to column when behind existing scroll', function () {
      oldState.scrollX = 250;
      availableWidth = 350;
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollToColumn: 2,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 150,
        })
      );
    });

    it('should not change scroll when column already on screen', function () {
      oldState.scrollX = 125;
      availableWidth = 350;
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollToColumn: 2,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 125,
        })
      );
    });

    it('should not change scroll when column is fixed', function () {
      oldState.scrollX = 250;
      availableWidth = 350;
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollToColumn: 0,
        },
        {}
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 250,
        })
      );
    });

    it('should not change scroll when column is unchanged', function () {
      oldState.scrollX = 250;
      availableWidth = 350;
      const result = columnStateHelper.initialize(
        oldState,
        {
          scrollToColumn: 2,
        },
        {
          scrollToColumn: 2,
        }
      );

      assert.deepEqual(
        result,
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 250,
        })
      );
    });
  });
});
