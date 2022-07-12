'use strict';

require('./base.less');

const Constants = require('./Constants');
const HomePage = require('./home/HomePage');
const DocsPage = require('./docs/DocsPage');
const ExamplesPage = require('./examples/ExamplesPage');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const faviconURL = require('./images/favicon.png');

const DocsPages = Constants.DocsPages;
const ExamplePages = Constants.ExamplePages;
const OtherPages = Constants.OtherPages;

function getPageForLocation(pages, location) {
  for (const key in pages) {
    if (!pages.hasOwnProperty(key) || typeof pages[key] !== 'object') {
      continue;
    }

    if (pages[key].groupTitle) {
      const nestedPage = getPageForLocation(pages[key], location);
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
    const browserInitScriptObj = {
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

    const activeDocsPage = getPageForLocation(DocsPages, this.props.location);
    if (activeDocsPage) {
      return (
        <DocsPage
          page={activeDocsPage.page}
          pageType={activeDocsPage.pageType}
        />
      );
    }

    const activeExamplePage = getPageForLocation(
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
