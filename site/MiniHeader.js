'use strict';

const React = require('react');
const Constants = require('./Constants');

require('./miniHeader.less');

const GITHUB_URL = 'https://github.com/schrodinger/fixed-data-table-2';
const DOCS_DEFAULT_LOCATION = Constants.DOCS_DEFAULT.location;
const EXAMPLES_DEFAULT_LOCATION = Constants.EXAMPLES_DEFAULT.location;

class MiniHeader extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="miniHeader">
          <div className="miniHeaderContents">
            <a href="./" target="_self" className="miniLogo" />
            <a className="homeLink" href="./" target="_self">
              Home
            </a>
            <a href={DOCS_DEFAULT_LOCATION} target="_self">
              Docs
            </a>
            <a href={EXAMPLES_DEFAULT_LOCATION} target="_self">
              Examples
            </a>
            <a href={GITHUB_URL}>Github</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MiniHeader;
