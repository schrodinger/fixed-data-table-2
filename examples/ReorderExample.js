/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table-2');
var React = require('react');
var ReactShallowCompare = require('react-addons-shallow-compare');

const {Table, Column, Cell} = FixedDataTable;

class TextCell extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ReactShallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Cell {...this.props}>
        {this.props.data.getObjectAt(this.props.rowIndex)[this.props.columnKey]}
      </Cell>
    );
  }
};

var columnTitles = {
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'sentence': 'Sentence',
  'companyName': 'Company',
  'city': 'City',
  'street': 'Street',
  'zipCode': 'Zip Code'
};

var columnWidths = {
  firstName: 150,
  lastName: 150,
  sentence: 240,
  companyName: 100,
  city: 240,
  street: 260,
  zipCode: 240
};

class ReorderExample extends React.Component {
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
        'companyName'
      ],
    };

    this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
  }

  _onColumnReorderEndCallback(event) {
    console.log(event);
    var columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });
    if (event.columnAfter) {
      var index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      columnOrder.push(event.reorderColumn);
    }
    this.setState({
      columnOrder: columnOrder
    });
  }

  render() {
    var {dataList} = this.state;

    return (
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        onColumnReorderEndCallback={this._onColumnReorderEndCallback}
        isColumnReordering={false}
        width={1000}
        height={500}
        {...this.props}>
        {this.state.columnOrder.map(function (columnKey, i) {
          return <Column
            allowCellsRecycling={true}
            columnKey={columnKey}
            key={i}
            isReorderable={true}
            header={<Cell>{columnTitles[columnKey]}</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={i === 0}
            width={columnWidths[columnKey]}
           />;
        })}
       </Table>
    );
  }
}

module.exports = ReorderExample;
