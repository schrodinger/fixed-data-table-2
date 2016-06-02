/**
 * Copyright Schrodinger, LLC
 */

"use strict";

var React = require('react');
var Constants = require('../Constants');

var ExampleHeader = React.createClass({
  render() {
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
      </div>
    );
  }
});

module.exports = ExampleHeader;
