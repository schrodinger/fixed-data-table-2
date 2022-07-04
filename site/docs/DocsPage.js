'use strict';

require('./docsPageStyle.less');

var MiniHeader = require('../MiniHeader');
var SideBar = require('../SideBar');
var StaticHTMLBlock = require('../StaticHTMLBlock');
var React = require('react');
var Constants = require('../Constants');

var DocsPages = Constants.DocsPages;

var DOCS_MARKDOWN_FILES = {
  [DocsPages.DOCS.GETTING_STARTED.location]: require('../../docs/README.md'),
  [DocsPages.DOCS.ROADMAP.location]: require('../../docs/roadmap.md'),
  [DocsPages.DOCS.CODEBASE_OVERVIEW
    .location]: require('../../docs/codebase.md'),

  // COMPONENTS
  [DocsPages.COMPONENTS.TABLE_API
    .location]: require('../../docs/api/TableAPI.md'),
  [DocsPages.COMPONENTS.COLUMN_API
    .location]: require('../../docs/api/ColumnAPI.md'),
  [DocsPages.COMPONENTS.COLUMNGROUP_API
    .location]: require('../../docs/api/ColumnGroupAPI.md'),
  [DocsPages.COMPONENTS.CELL_API
    .location]: require('../../docs/api/CellAPI.md'),

  // PLUGINS
  [DocsPages.PLUGINS.REORDERCELL_API
    .location]: require('../../docs/api/ReorderCell.md'),
  [DocsPages.PLUGINS.RESIZECELL_API
    .location]: require('../../docs/api/ResizeCell.md'),

  // PUBLIC API
  [DocsPages.PUBLIC_API.OVERVIEW
    .location]: require('../../docs/public_api/overview.md'),
  [DocsPages.PUBLIC_API.GETTING_STARTED
    .location]: require('../../docs/public_api/getting_started.md'),
  [DocsPages.PUBLIC_API.API_REFERENCE
    .location]: require('../../docs/public_api/api_reference.md'),
};

class DocsPage extends React.Component {
  render() {
    var HTML = DOCS_MARKDOWN_FILES[this.props.page.location];

    let pageClassname = 'pageBody';
    if (this.props.page.pageClassname) {
      pageClassname += ' ' + this.props.page.pageClassname;
    }

    return (
      <div className="docsPage">
        <MiniHeader />

        <div className={pageClassname} id="body">
          <div className="contents">
            <SideBar title="API" pages={DocsPages} page={this.props.page} />
            <StaticHTMLBlock className="docContents" html={HTML} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = DocsPage;
