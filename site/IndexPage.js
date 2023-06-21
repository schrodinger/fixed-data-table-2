'use strict';

require('./base.less');

var Constants = require('./Constants');
var HomePage = require('./home/HomePage');
var DocsPage = require('./docs/DocsPage');
var ExamplesPage = require('./examples/ExamplesPage');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var faviconURL = require('./images/favicon.png');

var DocsPages = Constants.DocsPages;
var ExamplePages = Constants.ExamplePages;
var OtherPages = Constants.OtherPages;

function getPageForLocation(pages, location) {
  for (var key in pages) {
    if (!pages.hasOwnProperty(key) || typeof pages[key] !== 'object') {
      continue;
    }

    if (pages[key].groupTitle) {
      var nestedPage = getPageForLocation(pages[key], location);
      if (nestedPage) {
        return nestedPage;
      }
    }

    if (pages[key].location === location) {
      return { pageType: key, page: pages[key] };
    }
  }

  return null;
}

class IndexPage extends React.Component {
  static getDoctype() {
    return '<!doctype html>';
  }

  static renderToString(props) {
    return (
      IndexPage.getDoctype() +
      ReactDOMServer.renderToString(<IndexPage {...props} />)
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      renderPage: !this.props.devMode,
    };
  }

  render() {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    var browserInitScriptObj = {
      __html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';\n',
    };

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>FixedDataTable</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          <link rel="stylesheet" href="//code.cdn.mozilla.net/fonts/fira.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href={this.props.files['main.css']}
          />
          <link rel="shortcut icon" type="image/png" href={faviconURL} />
          <base target="_blank" />
        </head>
        <body>
          {this.state.renderPage && this._renderPage()}

          <script dangerouslySetInnerHTML={browserInitScriptObj} />
          <script src={this.props.files['main.js']}></script>
        </body>
      </html>
    );
  }

  _renderPage() {
    switch (this.props.location) {
      case OtherPages.HOME.location:
        return <HomePage />;
    }

    var activeDocsPage = getPageForLocation(DocsPages, this.props.location);
    if (activeDocsPage) {
      return (
        <DocsPage
          page={activeDocsPage.page}
          pageType={activeDocsPage.pageType}
        />
      );
    }

    var activeExamplePage = getPageForLocation(
      ExamplePages,
      this.props.location
    );
    if (activeExamplePage) {
      return (
        <ExamplesPage
          page={activeExamplePage.page}
          pageType={activeExamplePage.pageType}
        />
      );
    }

    throw new Error(
      'Page of location ' + JSON.stringify(this.props.location) + ' not found.'
    );
  }

  componentDidMount() {
    if (!this.state.renderPage) {
      this.setState({
        renderPage: true,
      });
    }
  }
}

module.exports = IndexPage;
