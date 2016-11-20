Codebase Overview
==========================
The doc provides an overview of the codebase with a hope to encourage new contributors.
Please ask questions or encourage us to add more detail where you think it would assist you.

File Descriptions
---------------
### Public API
* FixedDataTableRoot.js
  * Provides public exports
* FixedDataTable.js
  * Provides Table
  * Top level of component tree
  * Manages all state (prior to Redux migration)
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
  * Renders visible table rows
  * Uses FixedDataTableRowBuffer for the windowing logic
* FixedDataTableRow.js
  * Renders the currently visible table rows
  * Also used for headers & footers
  * Renders a FixedDataTableCellGroup for each of frozen and non-frozen columns
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
* FixedDataTableColumnResizeHandle.js
  * Renders the line displayed while resizing a column
  * Used by FixedDataTable.js
  * This is named misleadingly; the resize handle is defined in FixedDataTableCell
* FixedDataTableColumnReorderHandle.js
  * Renders the element to reorder a column
  * Used by FixedDataTableCell.js

### State Management Helpers
* FixedDataTableRowBuffer.js
  * Provides the windowing logic for which rows to display on screen
  * Used by FixedDataTableBufferedRows.js
* FixedDataTableScrollHelper.js
  * Handles the logic for programatically scrolling to a rows
  * Handles scroll events
  * Used by FixedDataTable.js
* ReactTouchHandler.js
  * Handles touch events and converts them to scroll events
  * Used by FixedDataTable.js
  * Semi-experimental
* FixedDataTableTranslateDOMPosition.js
  * Helper to shim Facebook's translateDOMPositionXY to work for server-side rendering
* FixedDataTableWidthHelper.js
  * Helper logic for supporting flex column widths
  * Used by FixedDataTable.js
* FixedDataTableHelper.js
  * Dead code - let's delete it!

Public API Index
---------------
  * Table (FixedDataTable.js)
  * Cell (FixedDataTableCellDefault.js)
  * Column (FixedDataTableColumn.js)
  * ColumnGroup (FixedDataTableColumnGroup.js)
