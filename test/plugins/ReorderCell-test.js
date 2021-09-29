import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { assert, expect } from 'chai';
import { createRenderer } from 'react-test-renderer/shallow';
import {
  act,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  isElement,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import FakeObjectDataListStore from '../../examples/helpers/FakeObjectDataListStore';
import { Column, Table, Plugins, DataCell } from '../../src/FixedDataTableRoot';
import ReorderCell from '../../src/plugins/ResizeReorder/ReorderCell';
import ReorderHandle from '../../src/plugins/ResizeReorder/ReorderHandle';

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
      recycling: {},
    };
  }

  _onColumnReorderEndCallback = (event) => {
    var columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      var index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      if (fixedColumns.indexOf(event.reorderColumn) !== -1) {
        columnOrder.splice(fixedColumns.length - 1, 0, event.reorderColumn);
      } else {
        columnOrder.push(event.reorderColumn);
      }
    }
    this.setState({
      columnOrder: columnOrder,
      recycling: {},
    });
  };

  onColumnReorderStart = (columnKey) => {
    this.setState({
      recycling: {
        [columnKey]: false,
      },
    });
  };

  render() {
    const { dataList, recycling } = this.state;
    const onColumnReorderEndCallback = this._onColumnReorderEndCallback;
    const onColumnReorderStart = this.onColumnReorderStart;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        isColumnReordering={false}
        width={1000}
        height={500}
        {...this.props}
      >
        {this.state.columnOrder.map(function (columnKey, i) {
          return (
            <Column
              allowCellsRecycling={_.get(recycling, columnKey, true)}
              columnKey={columnKey}
              key={i}
              header={
                <Plugins.ReorderCell
                  onColumnReorderStart={onColumnReorderStart}
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
      const reorderCell = <ReorderCell onColumnReorderEnd={_.noop} />;
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
      const reorderHandle = findRenderedComponentWithType(cell, ReorderHandle);
      const reorderDiv = findRenderedDOMComponentWithTag(reorderHandle, 'div');
      const clickEvent = new window.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: false,
      });
      reorderDiv.dispatchEvent(clickEvent);
      const nextCellWidth = 150;
      // Reordering cell should cross more than half of the next cell for swapping order
      reorderHandle.onMouseMove(nextCellWidth / 2 + 1);
      reorderHandle.onMouseUp();
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
