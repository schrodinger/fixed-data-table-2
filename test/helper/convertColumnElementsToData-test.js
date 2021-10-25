/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import forEach from 'lodash/forEach';

import convertColumnElementsToData from '../../src/helper/convertColumnElementsToData';

describe('convertColumnElementsToData', function () {
  before(function () {
    convertColumnElementsToData.__Rewire__('React', {
      Children: {
        forEach: forEach,
      },
    });
  });

  after(function () {
    convertColumnElementsToData.__ResetDependency__('React');
  });

  let column1;
  let column2;
  let column3;
  beforeEach(function () {
    column1 = {
      props: {
        columnKey: 'bob',
        fixed: true,
        width: 100,
        cell: { id: 'c1' },
        header: { id: 'h1' },
        footer: { id: 'f1' },
      },
      type: { __TableColumn__: true },
    };
    column2 = {
      props: {
        columnKey: 'sue',
        fixed: false,
        width: 50,
        cell: { id: 'c2' },
        header: { id: 'h2' },
        footer: { id: 'f2' },
      },
      type: { __TableColumn__: true },
    };
    column3 = {
      props: {
        columnKey: 'bill',
        fixed: false,
        width: 200,
        cell: { id: 'c3' },
        header: { id: 'h3' },
        footer: { id: 'f3' },
      },
      type: { __TableColumn__: true },
    };
  });

  it('should return appropriate columnGroupProps, columnProps, and elementTemplates', function () {
    const {
      columnGroupProps,
      columnProps,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData([
      {
        props: {
          fixed: true,
          children: [column1, column2],
          header: { id: 'g1' },
        },
        type: { __TableColumnGroup__: true },
      },
      {
        props: {
          fixed: false,
          children: [column3],
          header: { id: 'g2' },
        },
        type: { __TableColumnGroup__: true },
      },
    ]);

    assert.deepEqual(columnGroupProps, [{ fixed: true }, { fixed: false }]);
    assert.deepEqual(columnProps, [
      {
        columnKey: 'bob',
        fixed: true,
        width: 100,
        groupIdx: 0,
      },
      {
        columnKey: 'sue',
        fixed: false,
        width: 50,
        groupIdx: 0,
      },
      {
        columnKey: 'bill',
        fixed: false,
        width: 200,
        groupIdx: 1,
      },
    ]);
    assert.deepEqual(elementTemplates, {
      cell: [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }],
      footer: [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }],
      groupHeader: [{ id: 'g1' }, { id: 'g2' }],
      header: [{ id: 'h1' }, { id: 'h2' }, { id: 'h3' }],
    });
    assert.strictEqual(useGroupHeader, true);
  });

  it('should not specify a groupIdx if none exists', function () {
    const {
      columnGroupProps,
      columnProps,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData([column1, column2]);

    assert.deepEqual(columnGroupProps, []);
    assert.deepEqual(columnProps, [
      {
        columnKey: 'bob',
        fixed: true,
        width: 100,
      },
      {
        columnKey: 'sue',
        fixed: false,
        width: 50,
      },
    ]);
    assert.deepEqual(elementTemplates, {
      cell: [{ id: 'c1' }, { id: 'c2' }],
      footer: [{ id: 'f1' }, { id: 'f2' }],
      groupHeader: [],
      header: [{ id: 'h1' }, { id: 'h2' }],
    });
    assert.strictEqual(useGroupHeader, false);
  });

  it('should include all necessary props and remove all others', function () {
    const testColumn = {
      props: {
        align: 'center',
        allowCellsRecycling: true,
        cellClassName: 'myClass',
        columnKey: 'test',
        extraneousProp: 'hello',
        extraneousProp2: "I'm not useful!",
        flexGrow: 10,
        fixed: true,
        isReorderable: true,
        isResizable: true,
        maxWidth: 200,
        minWidth: 50,
        width: 100,
      },
      type: { __TableColumn__: true },
    };

    const { columnProps } = convertColumnElementsToData([testColumn]);

    assert.deepEqual(columnProps, [
      {
        align: 'center',
        allowCellsRecycling: true,
        cellClassName: 'myClass',
        columnKey: 'test',
        flexGrow: 10,
        fixed: true,
        isReorderable: true,
        isResizable: true,
        maxWidth: 200,
        minWidth: 50,
        width: 100,
      },
    ]);
  });

  it('should include undefined placeholders for missing header and footer templates', function () {
    delete column1.props.header;
    delete column1.props.footer;

    const { columnProps, elementTemplates } = convertColumnElementsToData([
      column1,
      column2,
    ]);

    assert.deepEqual(columnProps, [
      {
        columnKey: 'bob',
        fixed: true,
        width: 100,
      },
      {
        columnKey: 'sue',
        fixed: false,
        width: 50,
      },
    ]);

    assert.deepEqual(elementTemplates, {
      cell: [{ id: 'c1' }, { id: 'c2' }],
      footer: [undefined, { id: 'f2' }],
      groupHeader: [],
      header: [undefined, { id: 'h2' }],
    });
  });
});
