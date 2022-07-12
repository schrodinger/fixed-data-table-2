'use strict';

require('./homePageStyle.less');

const Header = require('./Header');
const React = require('react');
const ReadMeHTML = require('../../README.md');
const StaticHTMLBlock = require('../StaticHTMLBlock');

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
