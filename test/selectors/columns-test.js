/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import columnsSelector from 'columns';

describe('columns', function() {
  let columnGroups;
  beforeEach(function() {
    const fixedGroup1 = [{
      id: 2,
      fixed: true,
      flexGrow: 10,
      width: 50,
    },{
      id: 4,
      fixed: true,
      width: 60,
    }];

    const fixedGroup2 = [{
      id: 5,
      fixed: true,
      width: 90,
    },{
      id: 7,
      fixed: true,
      width: 10,
    }];

    const scrollableGroup1 = [{
      id: 1,
      fixed: false,
      flexGrow: 5,
      width: 50,
    },{
      id: 3,
      fixed: false,
      flexGrow: 10,
      width: 20,
    }];

    const scrollableGroup2 = [{
      id: 6,
      fixed: false,
      flexGrow: 1,
      width: 100,
    }];

    columnGroups = [{
      columns: fixedGroup1,
    }, {
      columns: scrollableGroup1,
    }, {
      columns: fixedGroup2,
    }, {
      columns: scrollableGroup2,
    }];
  });
  it('should partition columns on fixed flag', function() {
    const {
      allColumns,
      fixedColumns,
      scrollableColumns,
    } = columnsSelector.resultFunc(columnGroups, 100);
    assert.deepEqual(allColumns.map(column => column.id),
      [2, 4, 1, 3, 5, 7, 6]);
    assert.deepEqual(fixedColumns.map(column => column.id), [2, 4, 5, 7]);
    assert.deepEqual(scrollableColumns.map(column => column.id), [1, 3, 6]);
  });

  it('should maintain widths when no surplus', function() {
    const {
      allColumns,
      fixedColumns,
      scrollableColumns,
    } = columnsSelector.resultFunc(columnGroups, 100);

    assert.deepEqual(allColumns.map(column => column.width),
      [50, 60, 50, 20, 90, 10, 100]);
    assert.deepEqual(fixedColumns.map(column => column.width),
      [50, 60, 90, 10]);
    assert.deepEqual(scrollableColumns.map(column => column.width),
      [50, 20, 100]);
  });

  it('should distribute flex width', function() {
    const {
      allColumns,
      fixedColumns,
      scrollableColumns,
    } = columnsSelector.resultFunc(columnGroups, 640);

    assert.deepEqual(allColumns.map(column => column.width),
      [50 + 100, 60, 50 + 50, 20 + 100, 90, 10, 100 + 10]);
    assert.deepEqual(fixedColumns.map(column => column.width),
      [50 + 100, 60, 90, 10]);
    assert.deepEqual(scrollableColumns.map(column => column.width),
      [50 + 50, 20 + 100, 100 + 10]);
  });
});
