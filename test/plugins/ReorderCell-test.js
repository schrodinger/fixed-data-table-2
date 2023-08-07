import React from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import { assert, expect } from 'chai';
import { createRenderer } from 'react-test-renderer/shallow';
import {
  act,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  isElement,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import FakeObjectDataListStore from '../../examples/helpers/FakeObjectDataListStore';
import { Column, Table, Plugins, DataCell } from '../../src/index';
import ReorderCell from '../../src/plugins/ResizeReorder/ReorderCell';
import cx from '../../src/vendor_upstream/stubs/cx';
import sinon from 'sinon';
import DOMMouseMoveTracker from '../../src/vendor_upstream/dom/DOMMouseMoveTracker';

const columnTitles = {
  firstName: 'First Name',
  lastName: 'Last Name',
  sentence: 'Sentence',
  companyName: 'Company',
  city: 'City',
  street: 'Street',
  zipCode: 'Zip Code',
};

const columnWidths = {
  firstName: 150,
  lastName: 150,
  sentence: 240,
  companyName: 100,
  city: 240,
  street: 260,
  zipCode: 240,
};

const fixedColumns = ['firstName', 'lastName'];

class TextCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>{data.getObjectAt(rowIndex)[columnKey]}</DataCell>
    );
  }
}

class ReorderCellTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnOrder: [
        'firstName',
        'lastName',
        'city',
        'street',
        'zipCode',
        'sentence',
        'companyName',
      ],
    };
  }

  _onColumnReorderEndCallback = (event) => {
    let columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      let index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      if (fixedColumns.indexOf(event.reorderColumn) !== -1) {
        columnOrder.splice(fixedColumns.length - 1, 0, event.reorderColumn);
      } else {
        columnOrder.push(event.reorderColumn);
      }
    }
    this.setState({
      columnOrder,
      recycling: {},
    });
  };

  render() {
    const { dataList } = this.state;
    const onColumnReorderEndCallback = this._onColumnReorderEndCallback;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={1000}
        height={500}
        {...this.props}
      >
        {this.state.columnOrder.map(function (columnKey, i) {
          return (
            <Column
              allowCellsRecycling={true}
              columnKey={columnKey}
              key={i}
              header={
                <Plugins.ReorderCell
                  onColumnReorderEnd={onColumnReorderEndCallback}
                >
                  {columnTitles[columnKey]}
                </Plugins.ReorderCell>
              }
              cell={<TextCell data={dataList} />}
              fixed={fixedColumns.indexOf(columnKey) !== -1}
              width={columnWidths[columnKey]}
            />
          );
        })}
      </Table>
    );
  }
}

describe('ReorderCell', () => {
  describe('render', () => {
    it('should not crash and burn', () => {
      const reorderCell = <ReorderCell onColumnReorderEnd={noop} />;
      const renderer = createRenderer();
      renderer.render(reorderCell);
      const reorderCellRender = renderer.getRenderOutput();
      assert.isTrue(isElement(reorderCellRender));
    });
  });

  let container, renderedTree;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const renderTable = (optionalProps = {}) => {
    act(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      renderedTree = ReactDOM.render(
        <ReorderCellTest {...optionalProps} />,
        container
      );
    });
    return scryRenderedComponentsWithType(renderedTree, ReorderCell);
  };

  describe('initial render', () => {
    it('should set props correctly', () => {
      const reorderCells = renderTable();
      const reorderCell = reorderCells[0];
      expect(reorderCell.props.left).eql(0);
    });
  });

  describe('reordering', () => {
    it('should be equal to new order after reordering', function () {
      const reorderCells = renderTable();
      const cell = reorderCells[0];
      const reorderDiv = findRenderedDOMComponentWithClass(
        cell,
        cx('fixedDataTableCellLayout/columnReorderContainer')
      );

      // start dragging
      const clickEvent = new window.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: false,
      });
      reorderDiv.dispatchEvent(clickEvent);

      // Reordering cell should cross more than half of the next cell for swapping order
      const nextCellWidth = 150;
      const targetMouseOffset = nextCellWidth / 2 + 1;

      // drag until required position
      const mouseMoveEvent = new window.MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: targetMouseOffset,
      });

      // NOTE (pradeep): JSDOM doesn't seem to pass in clientX for `mousemove` events,
      // which is crucial for DOMMouseMoveTracker to figure out the mouse position.
      // I'm fixing this by rewiring DOMMouseMoveTracker.
      DOMMouseMoveTracker.__Rewire__('FixedDataTableEventHelper', {
        getCoordinatesFromEvent: () => ({ x: targetMouseOffset, y: 0 }),
      });
      document.body.dispatchEvent(mouseMoveEvent);
      DOMMouseMoveTracker.__Rewire__.reset;

      // finish dragging
      let mouseUpEvent = new window.MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
      });
      document.body.dispatchEvent(mouseUpEvent);

      const newOrderCells = scryRenderedComponentsWithType(
        renderedTree,
        ReorderCell
      );
      const expectedOrder = [
        'Last Name',
        'First Name',
        'City',
        'Street',
        'Zip Code',
      ];
      const actualOrder = newOrderCells.map((cell) => cell.props.children);
      expect(actualOrder, 'Unexpected order after reordering').to.eql(
        expectedOrder
      );
    });
  });
});
