/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { ImageCell, TextCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');

class ScrollToColumnExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);
    var data = this._dataList.getAll();

    this.state = {
      filteredDataList: this._dataList,
      currentIndex: 0,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    const newIndex = parseInt(e.target.value) || 0;
    this.setState({
      currentIndex: newIndex,
    });
  }

  render() {
    var {filteredDataList, currentIndex } = this.state;

    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Jump to column index"
        />
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          scrollToColumn={currentIndex}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="firstName"
            header={<Cell>First Name [0]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name [1]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={100}
          />
          <Column
            columnKey="city"
            header={<Cell>City [2]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={100}
          />
          <Column
            columnKey="street"
            header={<Cell>Street [3]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code [4]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="bs"
            header={<Cell>BS [5]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="catchPhrase"
            header={<Cell>Catch Phrase [6]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="companyName"
            header={<Cell>Company Name [7]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="words"
            header={<Cell>Words [8]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="sentence"
            header={<Cell>Sentence [9]</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />

        </Table>
      </div>
    );
  }
}

module.exports = ScrollToColumnExample;
