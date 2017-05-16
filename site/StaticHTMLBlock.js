"use strict";

var React = require('react');

var PropTypes = require('prop-types');

class StaticHTMLBlock extends React.Component {
  static propType = {
    html: PropTypes.string.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    var {html, ...props} = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{__html: html}}
        {...props}
      />
    );
  }
};

module.exports = StaticHTMLBlock;
