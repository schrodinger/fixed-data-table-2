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

let FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
let FixedDataTable = require('fixed-data-table');
let React = require('react');
let _ = require('lodash');

const {Table, Column, Cell} = FixedDataTable;

const HeaderCell = ({columnKey, callback, children, ...props}) => (
  <Cell {...props}>
    {children}
    <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
      {'\u274C'}
    </a>
  </Cell>
);

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

let columnTitles = {
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'city': 'City',
  'sentence': 'Sentence',
  'street': 'Street',
  'companyName': 'Company Name',
  'zipCode': 'Zip Code'
};

let columnWidths = {
  firstName: 150,
  lastName: 150,
  city: 150,
  sentence: 240,
  street: 150,
  companyName: 200,
  zipCode: 100
};

class HideColumnExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(10000),
      columnOrder: Object.keys(columnTitles)
    };

    this._handleColumnHide = this._handleColumnHide.bind(this);
    this._resetColumns= this._resetColumns.bind(this);
  }

  _handleColumnHide(columnKey) {
    let newColumnOrder = this.state.columnOrder.filter((column) => column !== columnKey);
    this.setState({
      columnOrder: newColumnOrder
    });
  }

  _resetColumns() {
    this.setState({
      columnOrder: Object.keys(columnTitles)
    });
  }

  render() {
    let {dataList} = this.state;
    let handleColumnHide = this._handleColumnHide;

    return (
      <div>
        <button onClick={this._resetColumns}>Reset</button>
        <br />
        <Table
          rowHeight={30}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          width={1000}
          height={500}
          {...this.props}>
          {this.state.columnOrder.map(function (columnKey, i) {
            return <Column
              columnKey={columnKey}
              key={i}
              header={<HeaderCell callback={handleColumnHide}>{columnTitles[columnKey]}</HeaderCell>}
              cell={<TextCell data={dataList} />}
              fixed={i === 0}
              width={columnWidths[columnKey]}
            />;
          })}
        </Table>
       </div>
    );
  }
}

module.exports = HideColumnExample;
