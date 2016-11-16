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

function DataCtxt(Wrapped, data) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      props.data.setCallback(this.refresh);

      this.state = {
        data: props.data,
        version: 0
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
        data: this.state.data
      };
    }

    render() {
      return <Wrapped {...this.props}  />
    }
  };

  ContextClass.childContextTypes = {
    data: PropTypeCtxtData
  };

  return ContextClass;
}

// Export both HOC and the PropType for the data if required
export { DataCtxt, PropTypeCtxtData };
