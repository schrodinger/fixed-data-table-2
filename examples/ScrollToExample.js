/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

var ExampleImage = require('./helpers/ExampleImage');
var FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

const {Table, Column, Cell} = FixedDataTable;

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <ExampleImage
    src={data.getObjectAt(rowIndex)[col]}
  />
);

const TextCell = ({rowIndex, data, col, query, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class ScrollToExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);
    var data = this._dataList.getAll();

    this.state = {
      filteredDataList: this._dataList,
      currentIndex: 0,
      matchedRows: [],
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._rowClassNameGetter= this._rowClassNameGetter.bind(this);
    this._prevSearch = this._prevSearch.bind(this);
    this._nextSearch = this._nextSearch.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        query: null,
        matchedRows: [],
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      query: filterBy,
      matchedRows: filteredIndexes,
    });
  }

  _prevSearch() {
    this.setState({
      currentIndex: this.state.currentIndex - 1
    });
  }

  _nextSearch() {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    });
  }

  _rowClassNameGetter(rowIndex) {
    if (rowIndex === this.state.matchedRows[this.state.currentIndex]) {
      return 'active-row';
    }
    if (this.state.matchedRows.includes(rowIndex)) {
      return 'highlight-row';
    }
  }

  render() {
    var {filteredDataList, index, currentIndex, matchedRows, query} = this.state;

    var search = matchedRows.length ? (
      <span>
        <button
          disabled={currentIndex === 0}
          onClick={this._prevSearch}
        >
          {'<'}
        </button>
        {currentIndex + 1} / {matchedRows.length}
        <button
          disabled={currentIndex === matchedRows.length - 1}
          onClick={this._nextSearch}
        >
          {'>'}
        </button>
        <br />
      </span>
    ) : null;

    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />
        {search}
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          rowClassNameGetter={this._rowClassNameGetter}
          scrollToRow={matchedRows[currentIndex]}
          rowClass
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cell={<ImageCell data={filteredDataList} col="avartar" />}
            fixed={true}
            width={50}
          />
          <Column
            header={<Cell>First Name</Cell>}
            cell={<TextCell query={query} data={filteredDataList} col="firstName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={filteredDataList} col="lastName" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>City</Cell>}
            cell={<TextCell data={filteredDataList} col="city" />}
            width={100}
          />
          <Column
            header={<Cell>Street</Cell>}
            cell={<TextCell data={filteredDataList} col="street" />}
            width={200}
          />
          <Column
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={filteredDataList} col="zipCode" />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

module.exports = ScrollToExample;
