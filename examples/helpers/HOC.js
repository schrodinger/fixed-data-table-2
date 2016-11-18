"use strict";

const React = require('react');

function PropTypeCtxtData(props, propName, componentName) {
  const dataObj = props[propName];
  if (dataObj.setCallback === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a setCallback() function'
      ].join(' ')
    );
  }

  if (dataObj.getSize === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a getSize() function that returns the number of rows'
      ].join(' ')
    );
  }
};

function PropTypeCtxtDataAdvanced(props, propName, componentName) {
  const dataObj = props[propName];

  if (dataObj.setCallback === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a setCallback() function'
      ].join(' ')
    );
  }

  if (dataObj.getObjectAt === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a getObjectAt() function that retrieves a row'
      ].join(' ')
    );
  }

  if (dataObj.getSize === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a getSize() function that returns the number of rows'
      ].join(' ')
    );
  }
};

function DataCtxt(Wrapped, data) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      props.data.setCallback(this.refresh, "data");

      this.state = {
        data: props.data,
        version: 0,
      };
    }

    // Force a refresh or the page doesn't re-render
    //
    // The name of the state variable is irrelevant, it will simply trigger
    // an update event that is propagated into the cells
    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    getChildContext() {
      return {
        data: this.state.data,
        version: this.state.version,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data)){
        this.setState({
          data: nextProps.data,
        });
      }
    }

    render() {
      const {data, ...other} = this.props;
      return (
      <Wrapped
        rowsCount={data.getSize()}
        {...other}
      />);
    }
  };

  ContextClass.childContextTypes = {
    data: PropTypeCtxtData,
    version: React.PropTypes.number,
  };

  return ContextClass;
}

class DataListWrapper {
  constructor(data, index = null) {
    this._data = data;
    this._indexMap = index;
    this._callback = null;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb, id = "wrapper") {
    this._data.setCallback(cb, id);
  }

  getSize() {
    if (this._indexMap === null) {
      return this._data.getSize();
    }

    return this._indexMap.length;
  }

  getObjectAt(index) {
    if (this._indexMap === null) {
      return this._data.getObjectAt(index);
    }

    return this._data.getObjectAt(
      this._indexMap[index]
    );
  }
}

function AddFilter(TableComponent) {
  class FilterTable extends React.Component {
    constructor(props) {
      super(props);

      const { data, filters } = props;
      this.refresh = this.refresh.bind(this);

      this.state = {
        version: 0,
      };
    }

    refresh() {
      this.setState({
        version: this.state.version + 1
      })
    }

    _getDataWrapper(indexMap = null) {
      const filteredData = new DataListWrapper(this.props.data, indexMap);
      filteredData.setCallback(this.refresh, "filter");
      return filteredData;
    }

    filter() {
      // Get and prep filters
      let filters = {};
      for (let key in this.props.filters) {
        if (this.props.filters.hasOwnProperty(key) &&
            this.props.filters[key] !== ''){
          filters[key] = this.props.filters[key].toLowerCase();
        }
      }

      const match = (haystack, needle) =>
        haystack.toLowerCase().indexOf(needle) !== -1;

      let filteredIndexes = null;
      if (Object.keys(filters).length > 0) {
        filteredIndexes = [];
        for (let index = 0; index < this.props.data.getSize(); index += 1) {
          const row = this.props.data.getObjectAt(index);
          // If the object is null it may be loading and should therefore be kept
          if (row === null) {
            filteredIndexes.push(index);
            continue;
          }

          // Loop through all the filters and check if there's a match
          let found = true;
          let keys = Object.keys(filters);
          for (let key of keys) {
            const value = row[key];

            if (!match(value, filters[key])) {
              found = false;
              break;
            }
          }

          if (found) {
            filteredIndexes.push(index);
          }
        }
      }

      return (this._getDataWrapper(filteredIndexes))
    }

    render() {
      const { data, filters, ...other } = this.props;
      const filteredData = this.filter();
      return(
        <TableComponent
          data={filteredData}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }

  FilterTable.propTypes = {
    data: PropTypeCtxtDataAdvanced,
    filters: (props, propName, componentName) => {
      const dataObj = props[propName];

      if (typeof(dataObj) !== "object"){
        return new Error(
          [
            componentName,
            'requires that',
            propName,
            'is an object that can be used for filtering.',
            'You have provided a:',
            typeof(dataObj)
          ].join(' ')
        );
      }

      if (Object.keys(dataObj).length === 0){
        return new Error(
          [
            componentName,
            'requires that',
            propName,
            'isn\'t empty'
          ].join(' ')
        );
      }
    },
  }

  return FilterTable;
}


function AddSort(TableComponent) {
  class SortTable extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        version: 0,
      }
      this.refresh = this.refresh.bind(this);
    }

    refresh() {
      this.setState({
        version: this.state.version + 1,
      })
    }

    _getDataWrapper(indexMap = null) {
      const sortedData = new DataListWrapper(this.props.data, indexMap);
      sortedData.setCallback(this.refresh, "sort");
      return sortedData;
    }

    _getIndexes() {
      const indexes = [];
      var size = this.props.data.getSize();
      for (var index = 0; index < size; index++) {
        indexes.push(index);
      }

      return (indexes);
    }

    sort() {
      const { sortColumn, sortDir } = this.props;
      let sortIndexes = null;
      if (sortColumn.length > 0) {

        sortIndexes = this._getIndexes();
        sortIndexes.sort((indexA, indexB) => {
          const objA = this.props.data.getObjectAt(indexA);
          const objB = this.props.data.getObjectAt(indexB);
          if (objA === null && objB === null) {
            return 0;
          }

          let sortVal = 0;
          if (objA == null) {
            sortVal = 1;
          } else if (objB == null) {
            sortVal = -1;
          } else {
            const valueA = objA[sortColumn];
            const valueB = objB[sortColumn];
            if (valueA > valueB) {
              sortVal = 1;
            }
            if (valueA < valueB) {
              sortVal = -1;
            }
          }

          if (sortVal !== 0 && sortDir === "ASC") {
            sortVal = sortVal * -1;
          }

          return sortVal;
        });
      }

      return this._getDataWrapper(sortIndexes);
    }

    render() {
      const { data, onSortChange, sortDir, sortColumn, ...other } = this.props;

      const sortedData = this.sort();
      return(
        <TableComponent
          data={sortedData}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }

  SortTable.propTypes = {
    data: PropTypeCtxtDataAdvanced,
    sortColumn: React.PropTypes.string,
    sortDir: React.PropTypes.string,
    onSortChange: React.PropTypes.func.isRequired,
  }

  return SortTable;
}

// Export both HOC and the PropType for the data if required
export {
  DataCtxt, PropTypeCtxtData,
  AddFilter,
  AddSort,
};
