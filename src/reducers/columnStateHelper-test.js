/**
 * Copyright Schrodinger, LLC
 */

import FixedDataTableColumn from 'FixedDataTableColumn';
import FixedDataTableColumnGroup from 'FixedDataTableColumnGroup';
import React from 'React';
import columnStateHelper from 'columnStateHelper'
import emptyFunction from 'emptyFunction';
import { assert } from 'chai';

describe('columnStateHelper', function() {
  describe('resizeColumn', function() {
    it('should return a new object with column resizing data', function() {
      var oldState = {
        placeholder: true
      };

      // --- Run Test ---
      var result = columnStateHelper.resizeColumn(oldState, {
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
      var oldState = {
        placeholder: true,
        columnInfo: {
          headFixedColumns: [{
            props: {
              columnKey: 'col1'
            }
          }]
        }
      };

      // --- Run Test ---
      var result = columnStateHelper.reorderColumn(oldState, {
        columnKey: 'col1',
        left: 20,
        scrollStart: 50,
        width: 100
      });

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        placeholder: true,
        columnInfo: {
          headFixedColumns: [{
            props: {
              columnKey: 'col1'
            }
          }]
        },
        isColumnReordering: true,
        columnReorderingData: {
          dragDistance: 0,
          isFixed: true,
          scrollStart: 50,
          columnKey: 'col1',
          columnWidth: 100,
          originalLeft: 20,
          columnBefore: undefined,
          columnAfter: undefined
        }
      });
    });
  });

  describe('reorderColumnMove', function() {
    it('should update column reorder data based on new position', function() {
      var oldState = {
        columnInfo: {
          bodyFixedColumns: [{
            props: {
              width: 250
            }
          }]
        },
        scrollX: 30,
        maxScrollX: 50,
        width: 550,
        isColumnReordering: true,
        columnReorderingData: {
          dragDistance: 0,
          isFixed: false,
          scrollStart: 50,
          columnKey: 'col1',
          columnWidth: 100,
          originalLeft: 20,
          columnBefore: undefined,
          columnAfter: undefined
        }
      };

      // --- Run Test ---
      var result = columnStateHelper.reorderColumnMove(oldState, 277);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columnInfo: {
          bodyFixedColumns: [{
            props: {
              width: 250
            }
          }]
        },
        scrollX: 45,
        maxScrollX: 50,
        width: 550,
        isColumnReordering: true,
        columnReorderingData: {
          dragDistance: 257,
          isFixed: false,
          scrollStart: 50,
          columnKey: 'col1',
          columnWidth: 100,
          originalLeft: 20,
          columnBefore: undefined,
          columnAfter: undefined
        }
      });
    });
  });

  describe('initialize', function() {
    it('should initialize column state as expected', function() {
      var oldState = {
        scrollX: 30,
        isColumnReordering: true,
        columnReorderingData: {
          placeholder: true
        },
        isColumnResizing: true,
        columnResizingData: {
          placeholder: true
        }
      };

      var children = [
        React.createElement(FixedDataTableColumn, {
          columnKey: 'fixed1',
          fixed: true,
          width: 150
        }),
        React.createElement(FixedDataTableColumn, {
          columnKey: 'fixed2',
          fixed: true,
          width: 75
        }),
        React.createElement(FixedDataTableColumn, {
          columnKey: 'scrollable1',
          fixed: false,
          width: 12
        }),
        React.createElement(FixedDataTableColumn, {
          columnKey: 'scrollable2',
          fixed: false,
          width: 200
        })
      ];

      // --- Run Test ---
      var result = columnStateHelper.initialize(oldState, {
        children: children,
        width: 200,
        isColumnResizing: true
      });

      // --- Verify Expectations ---
      var { columns, columnInfo, ...otherResults } = result;

      assert.deepEqual(otherResults, {
        columnGroups: undefined,
        groupHeaderHeight: 0,
        maxScrollX: 237,
        horizontalScrollbarVisible: true,
        scrollX: 30,
        useGroupHeader: false,
        width: 200,
        isColumnReordering: true,
        columnReorderingData: {
          placeholder: true
        },
        isColumnResizing: true,
        columnResizingData: {
          placeholder: true
        }
      });
    });
  });
});
