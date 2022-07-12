'use strict';

const React = require('react');

const PropTypes = require('prop-types');

class StaticHTMLBlock extends React.Component {
  static propType = {
    html: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { html, ...props } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  }
}

module.exports = StaticHTMLBlock;
