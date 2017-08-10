/**
 * Copyright Schrodinger, LLC
 */

import columnStateHelper from 'columnStateHelper'
import emptyFunction from 'emptyFunction';
import { assert } from 'chai';

describe('columnStateHelper', function() {
  describe('resizeColumn', function() {
    it('should return a new object with column resizing data', function() {
      const oldState = {
        placeholder: true
      };

      // --- Run Test ---
      const result = columnStateHelper.resizeColumn(oldState, {
        cellMinWidth: 10,
        cellMaxWidth: 200,
        cellWidth: 150,
        columnKey: 'col1',
        combinedWidth: 600,
        clientX: 20,
        clientY: 50,
        leftOffset: 13
      });

      // --- Verify Expectations ---
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
            preventDefault: emptyFunction
          },
          key: 'col1'
        }
      });
    });
  });

  describe('reorderColumn', function() {
    it('should return a new object with column reorder data', function() {
      const fakeColumnGroups = [{
        columns: [{
          columnKey: 'col1',
          fixed: true,
        }],
      }];
      const oldState = {
        placeholder: true,
        columnGroups: fakeColumnGroups,
      };

      // --- Run Test ---
      const result = columnStateHelper.reorderColumn(oldState, {
        columnKey: 'col1',
        left: 20,
        scrollStart: 50,
        width: 100
      });

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnGroups: fakeColumnGroups,
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
          columnAfter: undefined
        },
      });
    });
  });

  describe('reorderColumnMove', function() {
    let fakeColumnGroups;
    let reorderingData;
    before(function() {
      fakeColumnGroups = [{
        columns: [
          { width: 50, fixed: true },
          { width: 80, fixed: true },
          { width: 300, fixed: false },
          { width: 180, fixed: false },
          { width: 400, fixed: false },
        ],
      }];

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
    });

    it('should update drag distance on move', function() {
      const oldState = {
        columnGroups: fakeColumnGroups,
        scrollX: 195,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: reorderingData,
      };

      // --- Run Test ---
      const result = columnStateHelper.reorderColumnMove(oldState, 10);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnGroups: fakeColumnGroups,
        scrollX: 195,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: 10,
        }),
      });
    });

    it('should adjust scrollX when nears first edge', function() {
      const oldState = {
        columnGroups: fakeColumnGroups,
        scrollX: 195,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: reorderingData,
      };

      // --- Run Test ---
      const result = columnStateHelper.reorderColumnMove(oldState, -30);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnGroups: fakeColumnGroups,
        scrollX: 180,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: -30,
        }),
      });
    });

    it('should adjust scrollX when nears end edge', function() {
      const oldState = {
        columnGroups: fakeColumnGroups,
        scrollX: 195,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: reorderingData,
      };

      // --- Run Test ---
      const result = columnStateHelper.reorderColumnMove(oldState, 30);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnGroups: fakeColumnGroups,
        scrollX: 210,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: 30,
        }),
      });
    });

    it('should not adjust scrollX when fixed', function() {
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

      const oldState = {
        columnGroups: fakeColumnGroups,
        scrollX: 25,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: reorderingData,
      };

      // --- Run Test ---
      const result = columnStateHelper.reorderColumnMove(oldState, -10);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnGroups: fakeColumnGroups,
        scrollX: 25,
        maxScrollX: 660,
        width: 350,
        isColumnReordering: true,
        columnReorderingData: Object.assign({}, reorderingData, {
          dragDistance: -10,
        }),
      });
    });
  });

  describe('initialize', function() {
    let oldState;
    beforeEach(function() {
      oldState = {
        columnResizingData: {
          placeholder: true
        },
        isColumnResizing: true,
        scrollX: 300,
        width: 200,
      };

      columnStateHelper.__Rewire__('fixedColumnsWidthSelector', () => 150);
      columnStateHelper.__Rewire__('scrollContentWidthSelector', () => 600);
      columnStateHelper.__Rewire__('columnsSelector', () => ({
        fixedColumns: [{ id: 1, width: 150 }],
        scrollableColumns: [
          { id: 2, width: 150 },
          { id: 3, width: 150 },
          { id: 4, width: 150 },
        ],
      }));
    });

    afterEach(function() {
      columnStateHelper.__ResetDependency__('fixedColumnsWidthSelector');
      columnStateHelper.__ResetDependency__('scrollContentWidthSelector');
      columnStateHelper.__ResetDependency__('columnsSelector');
    });

    it('should initialize column state as expected', function() {
      const result = columnStateHelper.initialize(oldState, {}, {});

      assert.deepEqual(result, Object.assign({
        maxScrollX: 400,
      }, oldState));
    });

    it('should clamp scrollX to maxScrollX', function() {
      oldState.scrollX = 700;
      const result = columnStateHelper.initialize(oldState, {}, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 400,
      }));
    });

    it('should use scrollLeft when specified', function() {
      const result = columnStateHelper.initialize(oldState, {
        scrollLeft: 100,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 100,
      }));
    });

    it('should overwrite column resizing from props', function() {
      const result = columnStateHelper.initialize(oldState, {
        isColumnResizing: false,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        columnResizingData: {},
        isColumnResizing: false,
        maxScrollX: 400,
      }));
    });

    it('should scroll to column when specified via prop', function() {
      oldState.scrollX = 0;
      const result = columnStateHelper.initialize(oldState, {
        scrollToColumn: 2,
        width: 350,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 100,
      }));
    });

    it('should scroll to column when behind existing scroll', function() {
      oldState.scrollX = 300;
      const result = columnStateHelper.initialize(oldState, {
        scrollToColumn: 2,
        width: 350,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 150,
      }));
    });

    it('should not change scroll when column already on screen', function() {
      oldState.scrollX = 125;
      const result = columnStateHelper.initialize(oldState, {
        scrollToColumn: 2,
        width: 350,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 125,
      }));
    });

    it('should not change scroll when column is fixed', function() {
      oldState.scrollX = 300;
      const result = columnStateHelper.initialize(oldState, {
        scrollToColumn: 0,
        width: 350,
      }, {});

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 300,
      }));
    });

    it('should not change scroll when column is unchange', function() {
      oldState.scrollX = 300;
      const result = columnStateHelper.initialize(oldState, {
        scrollToColumn: 2,
        width: 350,
      }, {
        scrollToColumn: 2
      });

      assert.deepEqual(result, Object.assign({}, oldState, {
        maxScrollX: 400,
        scrollX: 300,
      }));
    });
  });
});
