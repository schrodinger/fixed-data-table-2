/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import columnTemplates from '../../src/selectors/columnTemplates';

describe('columnTemplates', function () {
  it('should organize props and templates appropriately', function () {
    const columnGroupProps = [
      {
        id: 10,
        fixed: true,
      },
      {
        id: 20,
        fixed: false,
      },
    ];

    const columnProps = [
      {
        id: 1,
        fixed: true,
      },
      {
        id: 2,
        fixed: true,
      },
      {
        id: 3,
        fixed: false,
      },
    ];

    const columnWidths = {
      columnGroupProps,
      columnProps,
    };

    const templates = {
      cell: [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }],
      footer: [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }],
      groupHeader: [{ id: 'g10' }, { id: 'g20' }],
      header: [{ id: 'h1' }, { id: 'h2' }, { id: 'h3' }],
    };

    const {
      fixedColumnGroups,
      fixedColumns,
      scrollableColumnGroups,
      scrollableColumns,
    } = columnTemplates.resultFunc(columnWidths, templates);

    assert.deepEqual(fixedColumnGroups, [
      {
        props: { id: 10, fixed: true },
        template: { id: 'g10' },
      },
    ]);
    assert.deepEqual(scrollableColumnGroups, [
      {
        props: { id: 20, fixed: false },
        template: { id: 'g20' },
      },
    ]);

    assert.deepEqual(fixedColumns, {
      cell: [
        {
          props: { id: 1, fixed: true },
          template: { id: 'c1' },
        },
        {
          props: { id: 2, fixed: true },
          template: { id: 'c2' },
        },
      ],
      footer: [
        {
          props: { id: 1, fixed: true },
          template: { id: 'f1' },
        },
        {
          props: { id: 2, fixed: true },
          template: { id: 'f2' },
        },
      ],
      header: [
        {
          props: { id: 1, fixed: true },
          template: { id: 'h1' },
        },
        {
          props: { id: 2, fixed: true },
          template: { id: 'h2' },
        },
      ],
    });
    assert.deepEqual(scrollableColumns, {
      cell: [
        {
          props: { id: 3, fixed: false },
          template: { id: 'c3' },
        },
      ],
      footer: [
        {
          props: { id: 3, fixed: false },
          template: { id: 'f3' },
        },
      ],
      header: [
        {
          props: { id: 3, fixed: false },
          template: { id: 'h3' },
        },
      ],
    });
  });
});
