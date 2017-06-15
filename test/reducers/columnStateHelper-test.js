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
      const oldState = {
        placeholder: true,
        columns: [{
          columnKey: 'col1',
          fixed: true
        }],
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
        placeholder: true,
        columns: [{
          columnKey: 'col1',
          fixed: true
        }],
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
      const oldState = {
        columns: [{
          width: 250,
          fixed: true
        }, {
          width: 90,
          fixed: false
        }],
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
      const result = columnStateHelper.reorderColumnMove(oldState, 277);

      // --- Verify Expectations ---
      assert.deepEqual(result, {
        columns: [{
          width: 250,
          fixed: true
        }, {
          width: 90,
          fixed: false
        }],
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
      const oldState = {
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

      const fakeColumnGroups = [{
        columns: [{
          columnKey: 'fixed1',
          fixed: true,
          width: 150,
        }, {
          columnKey: 'fixed2',
          fixed: true,
          width: 75,
        }, {
          columnKey: 'scrollable1',
          fixed: false,
          width: 12,
        }, {
          columnKey: 'scrollable2',
          fixed: false,
          width: 200,
        }],
      }];

      const fakeProps = {
        width: 200,
        isColumnResizing: true,
      };

      const fakeElementTemplates = {
        cell: [],
        footer: [],
        groupHeader: [],
        header: []
      };

      // --- Run Test ---
      const result = columnStateHelper.initialize(
        oldState, fakeProps, fakeColumnGroups, false, fakeElementTemplates);

      // --- Verify Expectations ---
      const { columns, ...otherResults } = result;

      assert.deepEqual(otherResults, {
        columnGroups: fakeColumnGroups,
        elementTemplates: fakeElementTemplates,
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
