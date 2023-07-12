'use strict';

const EXAMPLES_LOCATION_BASE =
  'https://github.com/schrodinger/fixed-data-table-2/blob/master/examples/';

exports.OtherPages = {
  HOME: { location: 'index.html', title: 'Home' },
};

exports.DocsPages = {
  DOCS: {
    groupTitle: 'Guides',
    GETTING_STARTED: {
      location: 'getting-started.html',
      title: 'Getting Started',
    },
    ROADMAP: { location: 'roadmap.html', title: 'Roadmap' },
    CODEBASE_OVERVIEW: {
      location: 'codebase.html',
      title: 'Codebase Overview',
    },
  },
  COMPONENTS: {
    groupTitle: 'COMPONENTS',
    TABLE_API: { location: 'api-table.html', title: 'Table' },
    COLUMN_API: { location: 'api-column.html', title: 'Column' },
    COLUMNGROUP_API: {
      location: 'api-columngroup.html',
      title: 'Column Group',
    },
    CELL_API: { location: 'api-cell.html', title: 'Cell' },
  },
  PLUGINS: {
    groupTitle: 'Plugins',
    REORDERCELL_API: { location: 'api-reordercell.html', title: 'ReorderCell' },
    RESIZECELL_API: { location: 'api-resizecell.html', title: 'ResizeCell' },
  },
  PUBLIC_API: {
    groupTitle: 'Public API',
    OVERVIEW: { location: 'public-api-overview.html', title: 'Overview' },
    GETTING_STARTED: {
      location: 'public-api-getting-started.html',
      title: 'Getting Started',
    },
    API_REFERENCE: {
      location: 'public-api-api-reference.html',
      title: 'API Reference',
      pageClassname: 'page-api-reference',
    },
  },
};

exports.ExamplePages = {
  OBJECT_DATA_EXAMPLE: {
    location: 'example-object-data.html',
    fileName: 'ObjectDataExample.js',
    title: 'With JSON Data',
    description:
      'A basic table example with two fixed columns, fed in some JSON data.',
  },
  DYNAMIC_ROW_HEIGHTS_EXAMPLE: {
    location: 'dynamic-row-heights.html',
    fileName: 'DynamicRowHeightExample.js',
    title: 'Dynamic Row Heights',
    description: 'A table example where each row has a different height.',
  },
  FIXED_RIGHT_COLUMNS_EXAMPLE: {
    location: 'fixed-right-columns.html',
    fileName: 'FixedRightColumnsExample.js',
    title: 'Fixed Right Columns',
    description:
      'A table example that has its columns fixed to the right side of the table.',
  },
  FLEXGROW_EXAMPLE: {
    location: 'example-flexgrow.html',
    fileName: 'FlexGrowExample.js',
    title: 'Fluid column widths',
    description:
      "An example of a table with flexible column widths. Here, the middle two columns stretch to fill all remaining space if the table is wider than the sum of all the columns's default widths. Note that one column grows twice as greedily as the other, as specified by the flexGrow param.",
  },
  RESIZE_EXAMPLE: {
    location: 'example-resize.html',
    fileName: 'ResizeExample.js',
    title: 'Resizable columns',
    description:
      'Table with drag and drop column resizing and a dummy "store" for persistence. The Last Name column demonstrates the ability to constrain to both a min- and max-width.',
  },
  REORDER_EXAMPLE: {
    location: 'example-reorder.html',
    fileName: 'ReorderExample.js',
    title: 'Reorderable columns',
    description:
      'Table with drag and drop column reordering and a dummy "store" for persistence.',
  },
  COLUMN_GROUPS_RESIZE_REORDER_EXAMPLE: {
    location: 'example-column-groups-resize-reorder.html',
    fileName: 'ColumnGroupsResizeReorderExample.js',
    title: 'Resizable and Reorderable Column Groups',
    description:
      'Table with column groupings with the ability to reorder groups.',
  },
  SCROLL_TO_ROW_EXAMPLE: {
    location: 'example-scroll-to-row.html',
    fileName: 'ScrollToRowExample.js',
    title: 'Jump to row',
    description:
      'A table example that will list search matches and jump to specified row',
  },
  SCROLL_TO_COLUMN_EXAMPLE: {
    location: 'example-scroll-to-column.html',
    fileName: 'ScrollToColumnExample.js',
    title: 'Jump to column',
    description: 'A table example that will jump to a specified column',
  },
  TOUCH_SCROLL_EXAMPLE: {
    location: 'example-touch-scroll.html',
    fileName: 'TouchScrollExample.js',
    title: 'Touch scroll',
    description:
      'A table example that will let users scrolls with touch screens. This feature is currently in beta.',
  },
  EXPANDED_EXAMPLE: {
    location: 'example-expanded-rows.html',
    fileName: 'ExpandedExample.js',
    title: 'Expanded rows',
    description:
      'A table example that will let the user expand individual rows',
  },
  HIDE_COLUMN_EXAMPLE: {
    location: 'example-collapse.html',
    fileName: 'HideColumnExample.js',
    title: 'Hide Columns',
    description: 'A table example that is able to hide/show columns',
  },
  COLUMN_GROUPS_EXAMPLE: {
    location: 'example-column-groups.html',
    fileName: 'ColumnGroupsExample.js',
    title: 'Column Groups',
    description: 'Table with column groupings.',
  },
  PAGINATION_EXAMPLE: {
    location: 'example-pagination.html',
    fileName: 'PaginationExample.js',
    title: 'Pagination',
    description:
      'A table example that pages in data as the user scrolls. We fake this by having a promise that resolves after a few milliseconds',
  },
  INFINITE_SCROLL_EXAMPLE: {
    location: 'example-infinite-scroll.html',
    fileName: 'InfiniteScrollExample.js',
    title: 'Infinite Scroll',
    description:
      'A table example where we add more data as the user scrolls near the end of the table, thus simulating an Infinite Scroll.',
  },
  FILTER_EXAMPLE: {
    location: 'example-filter.html',
    fileName: 'FilterExample.js',
    title: 'Client-side Filter',
    description:
      'A table example that is filterable by column. In this example, by first name.',
  },
  SORT_EXAMPLE: {
    location: 'example-sort.html',
    fileName: 'SortExample.js',
    title: 'Client-side Sort',
    description: 'A table example that is sortable by column.',
  },
  RESPONSIVE_EXAMPLE: {
    location: 'example-responsive.html',
    fileName: 'ResponsiveExample.js',
    title: 'Responsive Resize',
    description: "A table example that resizes based on its parent's size.",
  },
  STYLING_EXAMPLE: {
    location: 'example-styling.html',
    fileName: 'StylingExample.js',
    title: 'Custom Styling',
    description: 'A table example with custom styling.',
  },
  TOOLTIP_EXAMPLE: {
    location: 'example-tooltip.html',
    fileName: 'TooltipExample.js',
    title: 'Tooltips',
    description:
      'A table example that displays additional information in a tooltip.',
  },
  FOOTER_EXAMPLE: {
    location: 'example-footer.html',
    fileName: 'FooterExample.js',
    title: 'Footer',
    description: 'A table example that displays a footer.',
  },
  MAX_HEIGHT_EXAMPLE: {
    location: 'example-max-height.html',
    fileName: 'MaxHeightExample.js',
    title: 'Max Height',
    description:
      "A table example that displays a table growing to it's max height.",
  },
  OWNER_HEIGHT_EXAMPLE: {
    location: 'example-owner-height.html',
    fileName: 'OwnerHeightExample.js',
    title: 'Owner Height',
    description:
      'A table example that displays a table footer sticking to the screen.',
  },
  LONG_CLICK_EXAMPLE: {
    location: 'example-long-click.html',
    fileName: 'LongClickExample.js',
    title: 'Row Long Click',
    description: 'A table example that highlights a row after a long click',
  },
  CONTEXT_EXAMPLE: {
    location: 'example-context.html',
    fileName: 'ContextExample.js',
    title: 'Data Context (Advanced)',
    description:
      'A table example using a data context to pass data to the cells.' +
      ' The table is paginated and filterable by first and last name.',
  },
  FIXED_ROWS_EXAMPLE: {
    location: 'example-fixed-rows.html',
    fileName: 'FixedRowsExample.js',
    title: 'Fixed Rows',
    description: 'An example using multiple tables to mimic fixed rows.',
  },
  AUTO_SCROLL_EXAMPLE: {
    location: 'example-auto-scroll.html',
    fileName: 'AutoScrollExample.js',
    title: 'Auto Scroll',
    description:
      'An example using Controlled Scrolling to mimic auto scrolling',
  },
};

Object.keys(exports.ExamplePages).forEach(
  (key) =>
    (exports.ExamplePages[
      key
    ].file = `${EXAMPLES_LOCATION_BASE}${exports.ExamplePages[key].fileName}`)
);

exports.DOCS_DEFAULT = exports.DocsPages.DOCS.GETTING_STARTED;
exports.EXAMPLES_DEFAULT = exports.ExamplePages.OBJECT_DATA_EXAMPLE;
exports.ALL_PAGES = [
  exports.OtherPages,
  exports.DocsPages,
  exports.ExamplePages,
];
