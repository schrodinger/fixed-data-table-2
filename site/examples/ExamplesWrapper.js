/**
 * Copyright Schrodinger, LLC
 */

'use strict';

require('./examplesPageStyle.less');

const MiniHeader = require('../MiniHeader');
const SideBar = require('../SideBar');
const React = require('react');
const Constants = require('../Constants');

class ExamplesWrapper extends React.Component {
  render() {
    return (
      <div className="examplesPage">
        <MiniHeader />

        <div className="pageBody" id="body">
          <div className="contents">
            <SideBar
              title="Examples"
              pages={Constants.ExamplePages}
              page={this.props.page}
            />
            <div className="exampleContents">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ExamplesWrapper;
