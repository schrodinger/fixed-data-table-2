/**
 * Copyright Schrodinger, LLC
 */
import { expect, jest } from '@jest/globals';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  isElement,
} from 'react-dom/test-utils';

import { Table, Column } from '../src/index';
import Scrollbar from '../src/plugins/Scrollbar';
import * as requestAnimationFramePolyfill from '../src/vendor_upstream/core/requestAnimationFramePolyfill';

describe('FixedDataTableRoot', function () {
  beforeEach(() => {
    // NOTE (pradeep): Call the callback passed to requestAnimationFrame immediately.
    // This simplifies the tests by making them behave synchronous.
    jest
      .spyOn(requestAnimationFramePolyfill, 'default')
      .mockImplementation((callback) => callback());
  });

  afterEach(() => {
    // restore all spys created with spyOn
    jest.restoreAllMocks();
  });

  describe('render ', function () {
    it('should not crash and burn', function () {
      let table = (
        <Table
          width={600}
          height={400}
          rowsCount={5}
          rowHeight={100}
          headerHeight={50}
        >
          <Column width={300} />
        </Table>
      );
      let renderer = createRenderer();
      renderer.render(table);
      let tableRender = renderer.getRenderOutput();

      expect(isElement(tableRender)).toBe(true);
    });
  });

  class TestTable extends React.Component {
    constructor(props) {
      super(props);
    }

    /**
     * Returns state from FDT.Table object for unit testing
     *
     * @return {!Object}
     */
    getTableState() {
      return this._tableRef.state.boundState;
    }

    _onRef = (ref) => (this._tableRef = ref);

    render() {
      return (
        <Table
          ref={this._onRef}
          width={600}
          height={400}
          rowsCount={50}
          rowHeight={100}
          headerHeight={50}
          {...this.props}
        >
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
          <Column width={300} />
        </Table>
      );
    }
  }

  let node;

  beforeEach(function () {
    node = document.createElement('div');
  });

  const renderTable = (optionalProps = {}) => {
    let renderedTree = ReactDOM.render(<TestTable {...optionalProps} />, node);
    return findRenderedComponentWithType(renderedTree, TestTable);
  };

  describe('initial render', function () {
    it('should set scrollLeft correctly', function () {
      let table = renderTable({ scrollLeft: 300 });
      expect(table.getTableState().scrollX).toBe(300);
    });

    it('should set scrollTop correctly', function () {
      let table = renderTable({ scrollTop: 600 });
      expect(table.getTableState().scrollY).toBe(600);
    });

    it('should set scrollToColumn correctly to third visible column', function () {
      let table = renderTable({ scrollToColumn: 3 });
      expect(table.getTableState().scrollX).toBe(300 * 2 + Scrollbar.SIZE);
    });

    it('should set scrollToRow correctly', function () {
      // scrollToRow should ensure that row is fully visible

      let table = renderTable({ scrollToRow: 30, height: 300 });
      // make sure scrollY is below first row
      expect(table.getTableState().scrollY).toBeLessThan(30 * 100);
      // and also above last row
      expect(table.getTableState().scrollY).toBeGreaterThan(30 * 100 - 300);
    });
  });

  describe('update render', function () {
    it('should update scrollLeft correctly', function () {
      let table = renderTable({ scrollLeft: 300 });
      expect(table.getTableState().scrollX).toBe(300);
      table = renderTable({ scrollLeft: 600 });
      expect(table.getTableState().scrollX).toBe(600);
    });

    it('should update scrollTop correctly', function () {
      let table = renderTable({ scrollTop: 600 });
      expect(table.getTableState().scrollY).toBe(600);

      table = renderTable({ scrollTop: 300 });
      expect(table.getTableState().scrollY).toBe(300);
    });

    it('should update scrollToColumn correctly', function () {
      let table = renderTable({ scrollToColumn: 3 });
      // should scroll to third visible column
      expect(table.getTableState().scrollX).toBe(300 * 2 + Scrollbar.SIZE);

      table = renderTable({ scrollToColumn: 1 });
      // should scroll to first visible column
      expect(table.getTableState().scrollX).toBe(300);
    });

    it('should update scrollToRow correctly', function () {
      // scrollToRow should ensure that row is fully visible

      let table = renderTable({ scrollToRow: 30, height: 300 });
      // should be below 31st row
      expect(table.getTableState().scrollY).toBeLessThan(30 * 100);

      table = renderTable({ scrollToRow: 20, height: 100 });
      // should be below frst row
      expect(table.getTableState().scrollY).toBeLessThanOrEqual(20 * 100);
      // and also above last row
      expect(table.getTableState().scrollY).toBeGreaterThanOrEqual(
        20 * 100 - 100
      );
    });
  });

  describe('unset props', function () {
    it('should not blow up when unsetting the scrollLeft property', function () {
      let table = renderTable({ scrollLeft: 300 });
      expect(function () {
        renderTable({ scrollLeft: undefined });
      }).not.toThrow();
    });

    it('should not blow up when unsetting the scrollTop property', function () {
      let table = renderTable({ scrollTop: 600 });
      expect(function () {
        renderTable({ scrollTop: undefined });
      }).not.toThrow();
    });

    it('should not blow up when unsetting the scrollToColumn property', function () {
      let table = renderTable({ scrollToColumn: 3 });
      expect(function () {
        renderTable({ scrollToColumn: undefined });
      }).not.toThrow();
    });

    it('should not blow up when unsetting the scrollToRow property', function () {
      let table = renderTable({ scrollToRow: 30 });
      expect(function () {
        renderTable({ scrollToRow: undefined });
      }).not.toThrow();
    });

    it('should set scrollToRow correctly when height changes', function () {
      let table = renderTable({ height: 0, scrollToRow: 30 });
      table.setState({ height: 200 });
      // should scroll to 30th row
      expect(table.getTableState().scrollY).toBe(30 * 100);
    });
  });

  describe('RTL scroll', function () {
    describe('RTL', function () {
      it('should flip wheel sign', function (done) {
        const scroll = -50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={true} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );
        let tableComponent = findRenderedComponentWithType(
          renderedTree,
          TestTable
        );
        const scrollToXSpy = jest.spyOn(
          tableComponent._tableRef.scrollActions,
          'scrollToX'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          // scrollToX should be called with the correctly flipped value
          expect(scrollToXSpy).toBeCalledTimes(1);
          expect(scrollToXSpy).toBeCalledWith(-scroll);
          done();
        });
      });

      it('should not scroll past 0 bounds', function (done) {
        const scroll = 50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={true} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );
        let tableComponent = findRenderedComponentWithType(
          renderedTree,
          TestTable
        );
        const scrollToXSpy = jest.spyOn(
          tableComponent._tableRef.scrollActions,
          'scrollToX'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          // scrollToX should not be called, since the scroll is past zero
          expect(scrollToXSpy).not.toBeCalled();
          done();
        });
      });

      it('should apply correct left/right transform', function (done) {
        const scroll = -50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={true} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          let tableBody = findRenderedDOMComponentWithClass(
            renderedTree,
            'public_fixedDataTable_header'
          );
          let cellGroupElements = tableBody.getElementsByClassName(
            'fixedDataTableCellGroupLayout_cellGroup'
          );
          let scrollableCellGroup = cellGroupElements[1]; // The scrollable columns group (the middle index of [fixed left, scrollable, fixed right])

          // should translate the cell's right value when in RTL
          expect(scrollableCellGroup.style.transform).toBe(
            `translate(${-scroll}px,0px)`
          );

          done();
        });
      });
    });

    describe('LTR', function () {
      it('should flip wheel sign', function (done) {
        const scroll = 50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={false} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );
        let tableComponent = findRenderedComponentWithType(
          renderedTree,
          TestTable
        );
        const scrollToXSpy = jest.spyOn(
          tableComponent._tableRef.scrollActions,
          'scrollToX'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          // scrollToX should be called with the correctly flipped value
          expect(scrollToXSpy).toBeCalledTimes(1);
          expect(scrollToXSpy).toBeCalledWith(scroll);
          done();
        });
      });

      it('should not scroll past 0 bounds', function (done) {
        const scroll = -50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={false} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );
        let tableComponent = findRenderedComponentWithType(
          renderedTree,
          TestTable
        );
        const scrollToXSpy = jest.spyOn(
          tableComponent._tableRef.scrollActions,
          'scrollToX'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          // scrollToX should not be called, since the scroll is past zero
          expect(scrollToXSpy).not.toBeCalled();
          done();
        });
      });

      it('should apply correct left/right transform', function (done) {
        const scroll = 50;
        let renderedTree = ReactDOM.render(
          <TestTable className="my-test-table" isRTL={false} />,
          node
        );
        let tableDiv = findRenderedDOMComponentWithClass(
          renderedTree,
          'my-test-table'
        );

        let wheelEvent = document.createEvent('mouseevent');
        wheelEvent.initEvent('wheel', true, false);
        wheelEvent.deltaMode = 0;
        wheelEvent.deltaX = scroll;
        tableDiv.dispatchEvent(wheelEvent);

        setTimeout(() => {
          let tableBody = findRenderedDOMComponentWithClass(
            renderedTree,
            'public_fixedDataTable_header'
          );
          let cellGroupElements = tableBody.getElementsByClassName(
            'fixedDataTableCellGroupLayout_cellGroup'
          );
          let scrollableCellGroup = cellGroupElements[1]; // The scrollable columns group (the middle index of [fixed left, scrollable, fixed right])

          // should translate the cell's left value when in LTR
          expect(scrollableCellGroup.style.transform).toBe(
            `translate(${-scroll}px,0px)`
          );

          done();
        });
      });
    });
  });
});
