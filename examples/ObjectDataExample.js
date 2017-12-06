/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { DateCell, ImageCell, LinkCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

const numOfRows = 5;
const numOfCols = 4;
const width = 800;
const height = 500;

class Example extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      columnText: 'No resize yet',
      _rows: [],
      dataLoading: false,
      buttonText: "Start Data Load",
      interval: ""
    };
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillMount() {
    this.createRows();

    this._columns = [];
    for(var i = 0; i < numOfCols; i++) {
    	this._columns.push({ key: i, name: 'Col ' + i });
    }
  }

  createRows() {
    let rows = [];
    for (let i = 0; i < numOfRows; i++) {
      let rowValues = {};
      for(var j=0; j < numOfCols; j++) {
    		rowValues[j] = (i * numOfCols + j);
    	}
      rows.push(rowValues);
    }

    this.setState({_rows: rows});
  }

  onColumnResizeEndCallback(newWidth, columnKey) {
  	this.setState({columnText: 'Column ' + columnKey + ' updated with width ' + newWidth});
  }

  handleButtonClick() {
  	if (this.state.dataLoading) {
    	clearInterval(this.state.interval);
      this.setState({dataLoading: false, buttonText: "Start Data Load"});
    }
    else {
      let v = setInterval(() => {
      	let rows = this.state._rows;
        let rowValues = {};
        for (var j=0; j < numOfCols; j++) {
        	rowValues[j] = (numOfCols + j);
        }
        rows.push(rowValues);
        this.setState({_rows: rows});
      }, 100);
			this.setState({dataLoading: true, buttonText: "Stop Data Load", interval: v});
    }
  }

  render() {
    return  (
    	<div>
        {this.state.columnText}
        <button
          onClick={this.handleButtonClick.bind(this)}
          classname="btn btn-primary">{this.state.buttonText}
        </button>
    	  <Table
          rowsCount={this.state._rows.length}
          headerHeight={50}
          rowHeight={50}
          width={width}
          height={height}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          >
          {
            this._columns
              .map(c => c.key)
              .map(field => (
                <Column
              		columnKey={field}
                  key={field}
                  header={<Cell>{'Col' + field}</Cell>}
                  isResizable={true}
                  cell={({rowIndex}) => (
                  	<Cell className="text-cell">
        							{this.state._rows[rowIndex][field]}
  									</Cell>
                  )}
                  allowCellsRecycling={true}
                  width={200}
                />
            ))
          }
        </Table>
    	</div>
    );
  }
};

module.exports = Example;
