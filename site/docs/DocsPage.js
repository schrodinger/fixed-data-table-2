'use strict';

require('./docsPageStyle.less');

const MiniHeader = require('../MiniHeader');
const SideBar = require('../SideBar');
const StaticHTMLBlock = require('../StaticHTMLBlock');
const React = require('react');
const Constants = require('../Constants');

const DocsPages = Constants.DocsPages;

const DOCS_MARKDOWN_FILES = {
  [DocsPages.DOCS.GETTING_STARTED.location]: require('../../docs/README.md'),
  [DocsPages.DOCS.ROADMAP.location]: require('../../docs/roadmap.md'),
  [DocsPages.DOCS.CODEBASE_OVERVIEW
    .location]: require('../../docs/codebase.md'),

  // API
  [DocsPages.API.TABLE_API.location]: require('../../docs/api/TableAPI.md'),
  [DocsPages.API.COLUMN_API.location]: require('../../docs/api/ColumnAPI.md'),
  [DocsPages.API.COLUMNGROUP_API
    .location]: require('../../docs/api/ColumnGroupAPI.md'),
  [DocsPages.API.CELL_API.location]: require('../../docs/api/CellAPI.md'),

  // Plugins API
  [DocsPages.PLUGIN_API.REORDERCELL_API
    .location]: require('../../docs/api/ReorderCell.md'),
  [DocsPages.PLUGIN_API.RESIZECELL_API
    .location]: require('../../docs/api/ResizeCell.md'),
};

class DocsPage extends React.Component {
  render() {
    const HTML = DOCS_MARKDOWN_FILES[this.props.page.location];

    return (
      <div className="docsPage">
        <MiniHeader />

        <div className="pageBody" id="body">
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
