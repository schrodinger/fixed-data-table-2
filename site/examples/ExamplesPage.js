/**
 * Copyright Schrodinger, LLC
 */

'use strict';

// Require common FixedDataTable CSS.
require('fixed-data-table-2/css/layout/ScrollbarLayout.css');
require('fixed-data-table-2/css/layout/fixedDataTableLayout.css');
require('fixed-data-table-2/css/layout/fixedDataTableCellLayout.css');
require('fixed-data-table-2/css/layout/fixedDataTableCellGroupLayout.css');
require('fixed-data-table-2/css/layout/fixedDataTableColumnResizerLineLayout.css');
require('fixed-data-table-2/css/layout/fixedDataTableRowLayout.css');
require('fixed-data-table-2/css/style/fixedDataTable.css');
require('fixed-data-table-2/css/style/fixedDataTableCell.css');
require('fixed-data-table-2/css/style/fixedDataTableColumnResizerLine.css');
require('fixed-data-table-2/css/style/fixedDataTableColumnReorder.css');
require('fixed-data-table-2/css/style/fixedDataTableRow.css');
require('fixed-data-table-2/css/style/Scrollbar.css');

var ExampleHeader = require('./ExampleHeader');
var ExamplesWrapper = require('./ExamplesWrapper');
var React = require('react');
var Constants = require('../Constants');

var ExamplePages = Constants.ExamplePages;

var EXAMPLE_COMPONENTS = {
  [ExamplePages.OBJECT_DATA_EXAMPLE
    .location]: require('../../examples/ObjectDataExample'),
  [ExamplePages.RESIZE_EXAMPLE
    .location]: require('../../examples/ResizeExample'),
  [ExamplePages.REORDER_EXAMPLE
    .location]: require('../../examples/ReorderExample'),
  [ExamplePages.COLUMN_GROUPS_RESIZE_REORDER_EXAMPLE
    .location]: require('../../examples/ColumnGroupsResizeReorderExample'),
  [ExamplePages.HIDE_COLUMN_EXAMPLE
    .location]: require('../../examples/HideColumnExample'),
  [ExamplePages.SCROLL_TO_ROW_EXAMPLE
    .location]: require('../../examples/ScrollToRowExample'),
  [ExamplePages.SCROLL_TO_COLUMN_EXAMPLE
    .location]: require('../../examples/ScrollToColumnExample'),
  [ExamplePages.TOUCH_SCROLL_EXAMPLE
    .location]: require('../../examples/TouchScrollExample'),
  [ExamplePages.EXPANDED_EXAMPLE
    .location]: require('../../examples/ExpandedExample'),
  [ExamplePages.FLEXGROW_EXAMPLE
    .location]: require('../../examples/FlexGrowExample'),
  [ExamplePages.COLUMN_GROUPS_EXAMPLE
    .location]: require('../../examples/ColumnGroupsExample'),
  [ExamplePages.INFINITE_SCROLL_EXAMPLE
    .location]: require('../../examples/InfiniteScrollExample'),
  [ExamplePages.FILTER_EXAMPLE
    .location]: require('../../examples/FilterExample'),
  [ExamplePages.SORT_EXAMPLE.location]: require('../../examples/SortExample'),
  [ExamplePages.RESPONSIVE_EXAMPLE
    .location]: require('../../examples/ResponsiveExample'),
  [ExamplePages.STYLING_EXAMPLE
    .location]: require('../../examples/StylingExample'),
  [ExamplePages.TOOLTIP_EXAMPLE
    .location]: require('../../examples/TooltipExample'),
  [ExamplePages.FOOTER_EXAMPLE
    .location]: require('../../examples/FooterExample'),
  [ExamplePages.MAX_HEIGHT_EXAMPLE
    .location]: require('../../examples/MaxHeightExample'),
  [ExamplePages.OWNER_HEIGHT_EXAMPLE
    .location]: require('../../examples/OwnerHeightExample'),
  [ExamplePages.LONG_CLICK_EXAMPLE
    .location]: require('../../examples/LongClickExample'),
  [ExamplePages.CONTEXT_EXAMPLE
    .location]: require('../../examples/ContextExample'),
  [ExamplePages.FIXED_RIGHT_COLUMNS_EXAMPLE
    .location]: require('../../examples/FixedRightColumnsExample'),
  [ExamplePages.FIXED_ROWS_EXAMPLE
    .location]: require('../../examples/FixedRowsExample'),
  [ExamplePages.AUTO_SCROLL_EXAMPLE
    .location]: require('../../examples/AutoScrollExample'),
};

class ExamplesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPage: false,
    };
  }

  render() {
    return (
      <ExamplesWrapper {...this.props}>
        <ExampleHeader {...this.props} />
        {this.state.renderPage && this._renderPage()}
      </ExamplesWrapper>
    );
  }

  _renderPage() {
    var Example = EXAMPLE_COMPONENTS[this.props.page.location].default;

    return (
      <Example height={this.state.tableHeight} width={this.state.tableWidth} />
    );
  }

  componentDidMount() {
    this._update();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize, false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize);
    } else {
      win.onresize = this._onResize;
    }
  }

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._update, 16);
  }

  _update() {
    var win = window;

    var widthOffset = win.innerWidth < 680 ? 0 : 240;

    this.setState({
      renderPage: true,
      tableWidth: win.innerWidth - widthOffset,
      tableHeight: win.innerHeight - 200,
    });
  }
}

module.exports = ExamplesPage;
