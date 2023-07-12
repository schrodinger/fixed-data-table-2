Public API - Getting Started
==========================

## Access using React Refs

The `Table` component exposes a member method `getApi` which can be used to retrieve the full public API.

`getApi` can be easily accessed through a [React Ref](https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component) to the `Table` component.

### Example snippet:

```js
import { Table } from 'fixed-data-table-2';

class MyApp extends React.Component {
  tableRef = React.createRef();

  componentDidMount() {
    const {
      availableScrollWidth,
      getColumnAtOffset
    } = this.tableRef.current.getApi();

    console.log("Scroll content width is: ", availableScrollWidth);

    const { column } = getColumnAtOffset(200, "scrollable");
    console.log("Scrollable column at offset 200:", column.columnKey);
  }

  render() {
    return (
      <Table ref={this.tableRef} width={400} height={400}>
        ...
      </Table>
    );
  }
};
```

## Access using FDT's Context

The `Table` provides the full Public API through `Context`, which is a React Context instance. 
Your custom Cell Renderers can access this using [React's Consumer API](https://reactjs.org/docs/context.html#contextconsumer).

### Example snippet:

```js
import { Table, Context } from 'fixed-data-table-2';

class MyCell extends React.Component {
  render() {
    const { index, cellGroupType } = this.props;

    // this.context contains the full Public API
    const { scrollX, getColumn } = this.context;

    const { offset } = getColumn(index, cellGroupType);

    return (
      <div>
        Current horizontal scroll: {scrollX}
        This cell is at offset: {offset}
      </div>
    )
  }
};
MyCell.contextType = Context;

class MyApp extends React.Component {
  render() {
    return (
      <Table width={400} height={400}>
        <Column cell={MyCell} />
        <Column cell={MyCell} />
      </Table>
    );
  }
};
```
