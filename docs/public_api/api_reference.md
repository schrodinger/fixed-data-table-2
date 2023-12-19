Public API - Reference
==========================

## State
#### scrollX
`number`
<br>The current horizontal scroll offset in pixels.

#### maxScrollX
`number`
<br>
The max horizontal scroll offset in pixels.

#### availableScrollWidth
`number`
<br>
The available width upon which horizontal scrolling is possible.
<br>i.e, this is the width of the scrollable region of the table's viewport.

#### groupHeaderHeight
`number`
<br>
The height of the group header in pixels.

#### isRTL
`Boolean`
<br>
Whether the table is in Right To Left mode.

## Queries
<div class="note">
<b>NOTE:</b>
"<b>columnIndex</b>" refers to the <b>global</b> index of the column in relation to the whole table.
<br>eg: Consider a table with 2 fixed columns A and B, and 3 scrollable columns X, Y and Z.
<br>The columnIndex for each column will be:

```js
A - 0
B - 1
X - 2
Y - 3
Z - 4
```
</div>

#### getColumn()
```ts
getColumn(columnIndex: number) => Column
```
Get the column at the given index.
#### getColumnGroup()
Get the column group at the given index.
```ts
getColumnGroup(columnGroupIndex: number) => ColumnGroup
```
#### getColumnGroupByChild()
Get the column group for the given child column index.
```ts
getColumnGroupByChild(columnIndex: number, cellGroupType: CellGroupType) => ColumnGroup
```
#### getColumnAtOffset()
Get the column at given offset (in px) in relation to the specified CellGroup.
```ts
getColumnAtOffset(offset: number, cellGroupType: CellGroupType) => Column
```
#### getColumnGroupAtOffset()
Get the column group at given offset (in px) in relation to the specified CellGroup.
```ts
getColumnGroupAtOffset(offset: number, cellGroupType: CellGroupType) => ColumnGroup
```
#### getCellGroupWidth()
Get the total width of the specified CellGroup.
```ts
getCellGroupWidth(cellGroupType: CellGroupType) => number
```
#### getColumnCount()
Get the total count of columns under the specified CellGroup.
<br>
If `cellGroupType` isn't specified, then this returns the total count of columns.
```ts
getColumnCount(cellGroupType?: CellGroupType) => number
```
#### getColumnGroupCount()
Get the total count of column groups under the specified CellGroup.
<br>
If `cellGroupType` isn't specified, then this returns the total count of column groups.
```ts
getColumnGroupCount(cellGroupType?: CellGroupType) => number
```

## Actions
#### scrollToX()
Scrolls the table to given horizontal offset.
```ts
function(scrollX: number)
```

#### updateRowHeights(firstUpdatedRowIndex)
In case of variable row heights the FDT asks only once for the row heights before the current visible rows (by calling `rowHeightGetter()`) and it caches those heights.
If any of the row heights changes meantime, the user should call `updateRowHeights(firstUpdatedRowIndex)` in order for the new row heights to be updated
starting with the ```firstUpdatedRowIndex```
If the method is called without passing the ```firstUpdatedRowIndex``` it updates all the row heights 
```ts
function(firstUpdatedRowIndex: number)
```


## Types
#### Column
```ts
interface Column {
  columnKey?: string
  index: number
  offset: number
  width: number
}
```
#### ColumnGroup
```ts
interface ColumnGroup {
  columnKey?: string
  index: number
  offset: number
  width: number
}
```
#### CellGroupType
```ts
enum CellGroupType {
  SCROLLABLE = "scrollable"
  FIXED = "fixed"
  FIXED_RIGHT = "fixedRight"
}
```