'use strict';

let React = require('react');

let PropTypes = require('prop-types');

class StaticHTMLBlock extends React.Component {
  static propType = {
    html: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let { html, ...props } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  }
}

module.exports = StaticHTMLBlock;
