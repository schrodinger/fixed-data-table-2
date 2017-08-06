/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var React = require('react');
var Constants = require('../Constants');

class ExampleHeader extends React.Component { 
  render() {
    const contextDisclamer = this.props.page.fileName === 'ContextExample.js' ? (
      <div>
        NOTE React discourages using context.  Prefer the other filtering and paging examples if possible. See
        <a key='docs' href='https://facebook.github.io/react/docs/context.html'> React Context documentation</a>
      </div>
    ) : null;

    return (
      <div className="exampleHeader">
        <div className="exampleControls">
        </div>
        <h1 className="exampleTitle">
          <span className="exampleTitleName">
            Example:
          </span>
          {' '}
          <a href={this.props.page.file}>{this.props.page.title}</a>
        </h1>
        <p className="exampleDescription">
          <a className="exampleCode" href={this.props.page.file}>Example code</a>
          {this.props.page.description}
        </p>
        {contextDisclamer}
      </div>
    );
  }
}

module.exports = ExampleHeader;
