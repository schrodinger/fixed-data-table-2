'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import except from 'except';
import examplePropTypes from './examplePropTypes';

function DataCtxt(Wrapped) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      const data = this.props.data;
      data.setCallback(this.refresh, 'data');

      this.state = {
        data: props.data,
        version: 0,
      };
    }

    getChildContext() {
      return {
        data: this.state.data,
        version: this.state.version,
      };
    }

    componentDidUpdate() {
      if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
        this.setState({
          data: this.props.data,
        });
      }
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

    render() {
      const other = except(this.props, Object.keys(ContextClass.propTypes));
      return <Wrapped rowsCount={this.state.data.getSize()} {...other} />;
    }
  }

  ContextClass.childContextTypes = {
    data: examplePropTypes.CtxtDataListStore,
    version: PropTypes.number,
  };

  ContextClass.propTypes = {
    data: examplePropTypes.CtxtDataListStore,
  };

  return ContextClass;
}

class DataListWrapper {
  constructor(data, index = null) {
    this._data = data;
    this._indexMap = index;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb, id = 'wrapper') {
    if (this._data.setCallback) {
      this._data.setCallback(cb, id);
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

    return this._data.getObjectAt(this._indexMap[index]);
  }
}

function AddFilter(TableComponent) {
  class FilterTable extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      this.state = {
        version: 0,
      };
    }

    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    _getDataWrapper(indexMap = null) {
      const filteredData = new DataListWrapper(this.props.data, indexMap);
      filteredData.setCallback(this.refresh, 'filter');
      return filteredData;
    }

    filter() {
      // Get and prep filters
      const filters = {};
      Object.keys(this.props.filters)
        .filter((key) => this.props.filters[key].length > 0)
        .forEach((key) => {
          filters[key] = this.props.filters[key].toLowerCase();
          return null;
        });

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
          const keys = Object.keys(filters);
          for (const key of keys) {
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

      return this._getDataWrapper(filteredIndexes);
    }

    render() {
      const other = except(this.props, Object.keys(FilterTable.propTypes));
      const filteredData = this.filter();
      return (
        <TableComponent data={filteredData} {...other}>
          {this.props.children}
        </TableComponent>
      );
    }
  }

  FilterTable.propTypes = {
    data: examplePropTypes.CtxtDataListStore,
    children: PropTypes.node,
    filters: examplePropTypes.FilterObject,
  };

  return FilterTable;
}

// Export both HOC and the PropType for the data if required
export { DataCtxt, AddFilter };
