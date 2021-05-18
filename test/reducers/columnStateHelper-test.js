/**
 * Copyright Schrodinger, LLC
 */

import emptyFunction from '../../src/vendor_upstream/core/emptyFunction';
import { assert } from 'chai';

import columnStateHelper from '../../src/reducers/columnStateHelper';

describe('columnStateHelper', function () {
  describe('resizeColumn', function () {
    it('should return a new object with column resizing data', function () {
      const oldState = {
        placeholder: true,
      };

      const result = columnStateHelper.resizeColumn(oldState, {
        cellMinWidth: 10,
        cellMaxWidth: 200,
        cellWidth: 150,
        columnKey: 'col1',
        combinedWidth: 600,
        clientX: 20,
        clientY: 50,
        leftOffset: 13,
      });

      assert.deepEqual(result, {
        placeholder: true,
        isColumnResizing: true,
        columnResizingData: {
          left: 463,
          width: 150,
          minWidth: 10,
          maxWidth: 200,
          initialEvent: {
            clientX: 20,
            clientY: 50,
            preventDefault: emptyFunction,
          },
          key: 'col1',
        },
      });
    });
  });

  describe('reorderColumn', function () {
    beforeEach(function () {
      columnStateHelper.__Rewire__('columnWidths', () => ({
        fixedColumns: [{ columnKey: 'col1', fixed: true }],
      }));
    });

    afterEach(function () {
      columnStateHelper.__ResetDependency__('columnWidths');
    });

    it('should return a new object with column reorder data', function () {
      const oldState = {
        placeholder: true,
      };

      const result = columnStateHelper.reorderColumn(oldState, {
        columnKey: 'col1',
        left: 20,
        scrollStart: 50,
        width: 100,
      });

      assert.deepEqual(result, {
        placeholder: true,
        isColumnReordering: true,
        columnReorderingData: {
          cancelReorder: false,
          dragDistance: 0,
          isFixed: true,
          scrollStart: 50,
          columnKey: 'col1',
          columnWidth: 100,
          originalLeft: 20,
          columnBefore: undefined,
          columnAfter: undefined,
        },
      });
    });
  });

  describe('reorderColumnMove', function () {
    let reorderingData;
    let oldState;
    beforeEach(function () {
      reorderingData = {
        cancelReorder: false,
        dragDistance: 0,
        isFixed: false,
        scrollStart: 195,
        columnKey: 'col4',
        columnWidth: 180,
        originalLeft: 300,
        columnBefore: undefined,
        columnAfter: undefined,
      };

      oldState = {
        columnReorderingData: reorderingData,
        isColumnReordering: true,
        maxScrollX: 660,
        scrollX: 195,
      };

      columnStateHelper.__Rewire__('columnWidths', () => ({
        availableScrollWidth: 220,
        fixedColumns: [
          { width: 50, fixed: true },
          { width: 80, fixed: true },
        ],
        maxScrollX: 660,
        scrollableColumns: [
          { width: 300, fixed: false },
          { width: 180, fixed: false },
          { width: 400, fixed: false },
        ],
      }));
    });

    afterEach(function () {
      columnStateHelper.__ResetDependency__('columnWidths');
    });

    it('should update drag distance on move', function () {
      const result = columnStateHelper.reorderColumnMove(oldState, 10);

      assert.deepEqual(result, {
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: 10,
        }),
        isColumnReordering: true,
        maxScrollX: 660,
        scrollX: 195,
      });
    });

    it('should adjust scrollX when nears first edge', function () {
      const result = columnStateHelper.reorderColumnMove(oldState, -30);

      assert.deepEqual(result, {
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: -30,
        }),
        isColumnReordering: true,
        maxScrollX: 660,
        scrollX: 180,
      });
    });

    it('should adjust scrollX when nears end edge', function () {
      const result = columnStateHelper.reorderColumnMove(oldState, 30);

      assert.deepEqual(result, {
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: 30,
        }),
        isColumnReordering: true,
        maxScrollX: 660,
        scrollX: 210,
      });
    });

    it('should not adjust scrollX when fixed', function () {
      reorderingData = {
        cancelReorder: false,
        dragDistance: 0,
        isFixed: true,
        scrollStart: 25,
        columnKey: 'col2',
        columnWidth: 80,
        originalLeft: 50,
        columnBefore: undefined,
        columnAfter: undefined,
      };
      oldState.columnReorderingData = reorderingData;
      oldState.scrollX = 25;

      const result = columnStateHelper.reorderColumnMove(oldState, -10);

      assert.deepEqual(result, {
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: -10,
        }),
        isColumnReordering: true,
        maxScrollX: 660,
        scrollX: 25,
      });
    });
  });

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
