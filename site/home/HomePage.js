'use strict';

require('./homePageStyle.less');

let Header = require('./Header');
let React = require('react');
let ReadMeHTML = require('../../README.md');
let StaticHTMLBlock = require('../StaticHTMLBlock');

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <Header />

        <div className="pageBody" id="body">
          <div className="contents">
            <StaticHTMLBlock html={ReadMeHTML} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;
