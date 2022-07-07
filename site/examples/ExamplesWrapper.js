/**
 * Copyright Schrodinger, LLC
 */

'use strict';

require('./examplesPageStyle.less');

let MiniHeader = require('../MiniHeader');
let SideBar = require('../SideBar');
let React = require('react');
let Constants = require('../Constants');

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
