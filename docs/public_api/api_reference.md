Public API - Reference
==========================

## State
#### scrollX
`Number`
<br>The current horizontal scroll offset in pixels.

#### maxScrollX
`Number`
<br>
The max horizontal scroll offset in pixels.

#### availableScrollWidth
`Number`
<br>
The available width upon which horizontal scrolling is possible.
<br>i.e, this is the width of the scrollable region of the table's viewport.

#### groupHeaderHeight
`Number`
<br>
The height of the group header in pixels.

#### isRTL
`Boolean`
<br>
Whether the table is in Right To Left mode.

## Queries
<div class="note">
<b>NOTE:</b>
"<b>columnIndex</b>" refers to the <b>local</b> index of the column <b>within its CellGroup</b>.
<br>eg: Consider a table with 2 fixed columns A and B, and 3 scrollable columns X, Y and Z.
<br>The columnIndex for each column will be:
<br>A - 0
<br>B - 1
<br>X - 0
<br>Y - 1
<br>Z - 2
</div>

#### getColumn()
```js
getColumn(columnIndex: Number, cellGroupType: CellGroupType) => Column
```
Get the column with the given index under the specified CellGroup.
#### getColumnGroup()
Get the column group with the given offset under the specified CellGroup.
```js
function(columnGroupIndex: Number, cellGroupType: CellGroupType) => ColumnGroup
```
#### getColumnGroupByChild()
Get the column group for the given child column with given index under the specified CellGroup.
```js
function(columnIndex: Number, cellGroupType: CellGroupType) => ColumnGroup
```
#### getColumnAtOffset()
Get the column at given offset (in px) under the specified CellGroup.
```js
function(offset: Number, cellGroupType: CellGroupType) => Column
```
#### getColumnGroupAtOffset()
Get the column group at given offset (in px) under the specified CellGroup.
```js
function(offset: Number, cellGroupType: CellGroupType) => ColumnGroup
```
#### getCellGroupWidth()
Get the total width of the specified CellGroup.
```js
function(cellGroupType: CellGroupType) => Number
```
#### getColumnCount()
Get the total count of columns under the specified CellGroup.
```js
function(cellGroupType: CellGroupType) => Number
```
#### getColumnGroupCount()
Get the total count of column groups under the specified CellGroup.
```js
function(cellGroupType: CellGroupType) => Number
```

## Actions
#### scrollToX()
Scrolls the table at given horizontal offset.
```flow
function(scrollX: Number)
```

## Types
#### Column
```js
interface Column {
  columnKey?: String
  columnIndex: Number
  offset: Number
  width: Number
}
```
#### ColumnGroup
```js
interface ColumnGroup {
  columnKey?: String
  columnIndex: Number
  offset: Number
  width: Number
}
```
#### CellGroupType
```js
enum CellGroupType {
  SCROLLABLE = "scrollable"
  FIXED = "fixed"
  FIXED_RIGHT = "fixedRight"
}
```