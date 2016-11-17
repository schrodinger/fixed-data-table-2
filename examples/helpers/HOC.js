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
};

function PropTypeCtxtDataAdvanced(props, propName, componentName) {
  const dataObj = props[propName];

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
      props.data.setCallback(this.refresh);

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
        version: this.state.version + 1
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
      return <Wrapped {...other} />
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
  setCallback(cb) {
    this._callback = function() {
      cb();

      if (typeof(this._data._callback) === 'function') {
        this._data._callback();
      }
    }
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
      this._rawData = data;
      const filteredData = new DataListWrapper(data)

      this.refresh = this.refresh.bind(this);
      filteredData.setCallback(this.refresh);

      this.state = {
        filteredData,
        filters: Object.assign({}, filters),
        version: 0,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.data) !== JSON.stringify(this._rawData)){
        this._rawData = nextProps.data;
      }

      if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.state.filters)){
        this.setState({
          filters: Object.assign({}, nextProps.filters),
        });
        this.filter();
      }
    }

    // Force a refresh or the page doesn't re-render
    //
    // The name of the state variable is irrelevant, it will simply trigger
    // an update event that is propagated into the cells
    refresh() {
      this.setState({
        version: this.state.version + 1
      });
    }

    filter() {
      // Get and prep filters
      let filters = {};
      for (let key in this.props.filters) {
        if (this.props.filters.hasOwnProperty(key) &&
            this.props.filters[key] !== ''){
          filters[key] = this.props.filters[key];
        }
      }
      Object.keys(filters).map((key) => {
        filters[key] = filters[key].toLowerCase();
        return (key);
      });

      const match = (haystack, needle) =>
        haystack.toLowerCase().indexOf(needle) !== -1;

      if (Object.keys(filters).length > 0) {
        const filteredIndexes = [];
        for (let index = 0; index < this._rawData.getSize(); index += 1) {
          const row = this._rawData.getObjectAt(index);

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

        // Set the data filtering
        this.setState({
          filteredData: new DataListWrapper(this._rawData, filteredIndexes)
        })
      } else {
        this.setState({
          filteredData: new DataListWrapper(this._rawData, null)
        })
      }
    }

    render() {
      const { data, filters, ...other } = this.props;

      return(
        <TableComponent
          data={this.state.filteredData}
          rowsCount={this.state.filteredData.getSize()}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }

  // TODO: improve proptypes
  FilterTable.propTypes = {
    filters: React.PropTypes.object.isRequired,
    data: PropTypeCtxtDataAdvanced,
  }

  return FilterTable;
}


function AddSort(TableComponent) {
  class SortTable extends React.Component {
    constructor(props) {
      super(props);

      const { data } = props;
      this._rawData = data;
      this._createIndexes();

      const sortedData = new DataListWrapper(data);
      this.refresh = this.refresh.bind(this);
      sortedData.setCallback(this.refresh);

      this.state = {
        sortedData,
        version: 0,
      };
    }

    _createIndexes() {
      this._defaultSortIndexes = [];
      var size = this._rawData.getSize();
      for (var index = 0; index < size; index++) {
        this._defaultSortIndexes.push(index);
      }
    }

    componentWillReceiveProps(nextProps) {
      let triggerSort = false;
      if (JSON.stringify(nextProps.data) !== JSON.stringify()) {
        this._rawData = nextProps.data;
        triggerSort = true
      }

      if (nextProps.sortColumn !== this.props.sortColumn ||
          nextProps.sortDir !== this.props.sortDir) {
        triggerSort = true;
      }

      if (triggerSort) {
        this.sort(nextProps.sortColumn, nextProps.sortDir);
      }
    }

    refresh() {
      this.setState({
        version: this.state.version + 1
      });
    }

    sort(columnKey, sortDir) {
      if (columnKey.length > 0) {
        this._createIndexes();
        var sortIndexes = this._defaultSortIndexes;
        sortIndexes.sort((indexA, indexB) => {
          const objA = this._rawData.getObjectAt(indexA);
          const objB = this._rawData.getObjectAt(indexB);
          if (objA == null && objB == null) {
            return 0;
          }

          let sortVal = 0;
          if (objA == null) {
            sortVal = 1;
          } else if (objB == null) {
            sortVal = -1;
          } else {
            const valueA = objB[columnKey];
            const valueB = objB[columnKey];
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

        const sortedData = new DataListWrapper(this._rawData, sortIndexes);
        this.setState({
          sortedData: sortedData,
        });
      } else {
        this.setState({
          sortedData: new DataListWrapper(this._rawData, null),
        })
      }
    }

    render() {
      const { data, onSortChange, sortDir, sortColumn, ...other } = this.props;

      return(
        <TableComponent
          data={this.state.sortedData}
          rowsCount={this.state.sortedData.getSize()}
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
