"use strict";

require('./homePageStyle.less');

var Header = require('./Header');
var React = require('react');
var ReadMeHTML = require('../../README.md');
var StaticHTMLBlock = require('../StaticHTMLBlock');

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
};

module.exports = HomePage;
