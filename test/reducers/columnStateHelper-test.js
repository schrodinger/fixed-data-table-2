/**
 * Copyright Schrodinger, LLC
 */

import { expect, jest } from '@jest/globals';

import columnStateHelper from '../../src/reducers/columnStateHelper';
import * as columnWidths from '../../src/selectors/columnWidths';
import cloneDeep from 'lodash/cloneDeep';

describe('columnStateHelper', function () {
  describe('initialize', function () {
    let availableWidth;
    let oldState;
    let newState;

    beforeEach(function () {
      oldState = {
        scrollX: 300,
      };
      newState = cloneDeep(oldState);
      availableWidth = 200;

      jest.spyOn(columnWidths, 'default').mockImplementation(() => ({
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
      jest.restoreAllMocks();
    });

    it('should initialize column state as expected', function () {
      columnStateHelper.initialize(newState, {}, {});

      expect(newState).toEqual(
        Object.assign(
          {
            maxScrollX: 400,
          },
          oldState
        )
      );
    });

    it('should clamp scrollX to maxScrollX', function () {
      newState.scrollX = 700;
      columnStateHelper.initialize(newState, {}, {});

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 400,
          scrollX: 400,
        })
      );
    });

    it('should use scrollLeft when specified', function () {
      columnStateHelper.initialize(newState, { scrollLeft: 100 }, {});

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 400,
          scrollX: 100,
        })
      );
    });

    it('should overwrite column resizing from props', function () {
      columnStateHelper.initialize(newState, {}, {});

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 400,
        })
      );
    });

    it('should scroll to column when specified via prop', function () {
      newState.scrollX = 0;
      availableWidth = 350;
      columnStateHelper.initialize(newState, { scrollToColumn: 2 }, {});

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 100,
        })
      );
    });

    it('should scroll to column when behind existing scroll', function () {
      newState.scrollX = 250;
      availableWidth = 350;
      columnStateHelper.initialize(
        newState,
        {
          scrollToColumn: 2,
        },
        {}
      );

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 150,
        })
      );
    });

    it('should not change scroll when column already on screen', function () {
      newState.scrollX = 125;
      availableWidth = 350;
      columnStateHelper.initialize(
        newState,
        {
          scrollToColumn: 2,
        },
        {}
      );

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 125,
        })
      );
    });

    it('should not change scroll when column is fixed', function () {
      newState.scrollX = 250;
      availableWidth = 350;
      columnStateHelper.initialize(
        newState,
        {
          scrollToColumn: 0,
        },
        {}
      );

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 250,
        })
      );
    });

    it('should not change scroll when column is unchanged', function () {
      newState.scrollX = 250;
      availableWidth = 350;
      columnStateHelper.initialize(
        newState,
        {
          scrollToColumn: 2,
        },
        {
          scrollToColumn: 2,
        }
      );

      expect(newState).toEqual(
        Object.assign({}, oldState, {
          maxScrollX: 250,
          scrollX: 250,
        })
      );
    });
  });
});
