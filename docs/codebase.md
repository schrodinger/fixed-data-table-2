Codebase Overview
==========================
The doc provides an overview of the codebase with a hope to encourage new contributors.
Please ask questions or encourage us to add more detail where you think it would assist you.

File Descriptions
---------------
### Public API
* FixedDataTableRoot.js
  * Provides public exports
* FixedDataTableContainer.js
  * Top level of component tree
  * Wraps Actual Table component with the Redux store
* FixedDataTable.js
  * Uses FixedDataTableBufferedRows for table rows
  * Uses FixedDataTableRow for table headers and footer
* FixedDataTableCellDefault.js
  * Provides Cell
  * Default FDT cell component
* FixedDataTableColumn.js
  * Provides Column
  * Configures template for rendering header and cells
  * Also configures column details like width, resizable, reorderable, fixed, etc
* FixedDataTableColumnGroup.js
  * Provides ColumnGroup
  * Configures template for rendering header
  * Also configure if column group is fixed


### Table Render / Component Tree
* FixedDataTableBufferedRows.js
  * Renders visible table rows (plus some buffered rows)
  * Uses FixedDataTableRow
* FixedDataTableRow.js
  * Renders a single row
  * Also used for headers & footers
  * Renders FixedDataTableCellGroup, one each for fixed, scrollable, and fixedRight columns
* FixedDataTableCellGroup.js
  * Renders a div containing the cells for a row
  * Also handles cell recycling
  * Individual cell rendering is done through FixedDataTableCell
* FixedDataTableCell.js
  * Renders individual cells with the specified cell or header component
  * Handles column reordering display logic
  * Also renders column resize and reorder handles

### Additional Components
* Scrollbar.js
  * Renders the horizontal and vertical scrollbars for the table
  * Used by FixedDataTable.js
* ColumnResizerLine.js
  * Renders the line displayed while resizing a column
  * Used by FixedDataTable.js
* FixedDataTableColumnReorderHandle.js
  * Renders the knob used to reorder a column
  * Used by FixedDataTableCell.js

### State Management  
* scrollAnchor.js
  * Finds the vertical scroll 'anchor'
  * Scroll anchor decides the first/last row's index amd offset from edge of table
* computeRenderedRows.js
  * Uses the scroll anchor to find the range of rows displayed in the viewport
  * It also updates the height of these rows using `updateRowHeight`
* updateRowHeight.js
  * Updates the row height, caches it, and keeps total scroll height in sync
* columnStateHelper.js
  * Finds horizontal scroll offset
  * Also manages column reordering and resizing
 
### Selectors
* ariaAttributes.js
  * Calculates the aria roles and attributes to be given to our columns, rows, cells, .etc
* columnTemplates.js
  * Finds the props and template (renderer) for the cells, and categorizes them into a useful format
  * Has lot of logic shared with convertColumnElementsToData and relies on columnWidths
  * Really needs a refactor/cleanup/elimination
* columnWidths.js
  * Finds the width of each column (and column group if present)
  * Also calculates flex widths
  * Determines max horizontal scroll
* roughHeights.js
  * Calculates estimates for the dimensions of the content view port
  * Accounts for scroll bar presence and hence gives min/max dimensions
  * Also decides count of buffered rows
* scrollbarsVisible.js
  * Calculates scrollbar state (i.e., if it should be visible or not needed)
  * Also calculates the height available for the viewport
* tableHeights.js
  * Calculates height and offset for different components of the table (full table, viewport, scrollbar, etc.)  

### Helpers
* ReactTouchHandler.js
  * Handles touch events and converts them to scroll events
  * Used by FixedDataTable.js
  * Semi-experimental
* FixedDataTableTranslateDOMPosition.js
  * Helper to shim Facebook's translateDOMPositionXY to work for server-side rendering
* convertColumnElementsToData.js
  * Parses columns (passed as React component)
  * Gives the templates (cell renderer) for the header, footer, and content
  * Also extracts column specific props (like `width`, `pureRendering`, etc.)
* shallowEqualSelector.js
  * Creates a selector that gets recomputed only if a shallow equal check over the arguments fail
  * Used to create most of our selectors

Public API Index
---------------
  * Table (FixedDataTableContainer.js)
  * Cell (FixedDataTableCellDefault.js)
  * Column (FixedDataTableColumn.js)
  * ColumnGroup (FixedDataTableColumnGroup.js)
