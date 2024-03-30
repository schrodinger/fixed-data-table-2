import { expect, jest } from '@jest/globals';
import React from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import { createRenderer } from 'react-test-renderer/shallow';
import {
  act,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  isElement,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import ResizeCell from '../../src/plugins/ResizeReorder/ResizeCell';
import FakeObjectDataListStore from '../../examples/helpers/FakeObjectDataListStore';
import { Column, Table, Plugins, DataCell } from '../../src/index';
import ResizerKnob from '../../src/plugins/ResizeReorder/ResizerKnob';

class TextCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>{data.getObjectAt(rowIndex)[columnKey]}</DataCell>
    );
  }
}

class ResizeCellTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnWidths: {
        firstName: 240,
        lastName: 150,
        sentence: 140,
        companyName: 60,
      },
    };
  }

  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  };

  render() {
    let { dataList, columnWidths } = this.state;
    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        touchScrollEnabled={true}
        width={1000}
        height={500}
        {...this.props}
      >
        <Column
          columnKey="firstName"
          header={
            <Plugins.ResizeCell
              onColumnResizeEnd={this._onColumnResizeEndCallback}
            >
              First Name{' '}
            </Plugins.ResizeCell>
          }
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={columnWidths.firstName}
        />
        <Column
          columnKey="lastName"
          header={
            <Plugins.ResizeCell
              minWidth={70}
              maxWidth={170}
              onColumnResizeEnd={this._onColumnResizeEndCallback}
            >
              Last Name (min/max constrained)
            </Plugins.ResizeCell>
          }
          cell={<TextCell data={dataList} />}
          width={columnWidths.lastName}
        />
        <Column
          columnKey="companyName"
          header={
            <Plugins.ResizeCell
              onColumnResizeEnd={this._onColumnResizeEndCallback}
            >
              Company{' '}
            </Plugins.ResizeCell>
          }
          cell={<TextCell data={dataList} />}
          width={columnWidths.companyName}
        />
        <Column
          columnKey="sentence"
          header={
            <Plugins.ResizeCell
              onColumnResizeEnd={this._onColumnResizeEndCallback}
            >
              Sentence{' '}
            </Plugins.ResizeCell>
          }
          cell={<TextCell data={dataList} />}
          width={columnWidths.sentence}
        />
      </Table>
    );
  }
}

describe('ResizeCell', () => {
  describe('render', () => {
    it('should not crash and burn', () => {
      const reorderCell = <ResizeCell onColumnResizeEnd={noop} />;
      const renderer = createRenderer();
      renderer.render(reorderCell);
      const reorderCellRender = renderer.getRenderOutput();
      expect(isElement(reorderCellRender)).toBe(true);
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
        <ResizeCellTest {...optionalProps} />,
        container
      );
    });
    return scryRenderedComponentsWithType(renderedTree, ResizeCell);
  };

  describe('initial render', () => {
    it('should set props correctly', () => {
      const resizeCells = renderTable();
      const resizeCell = resizeCells[0];
      expect(resizeCell.props.left).toBe(0);
    });
  });

  describe('resizing', () => {
    it('should be equal to new width  after reordering', function () {
      const resizeCells = renderTable();
      const cell = resizeCells[0];
      const resizerKnob = findRenderedComponentWithType(cell, ResizerKnob);
      const resizeDiv = findRenderedDOMComponentWithTag(resizerKnob, 'div');
      const clickEvent = new window.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: false,
      });
      resizeDiv.dispatchEvent(clickEvent);
      resizerKnob.onMouseMove(10);
      resizerKnob.onMouseUp();

      const newResizeCells = scryRenderedComponentsWithType(
        renderedTree,
        ResizeCell
      );
      const expectedWidth = 250;
      const actualWidth = newResizeCells[0].props.width;
      expect(actualWidth).toBe(expectedWidth);
    });
  });
});
