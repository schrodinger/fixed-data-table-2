'use strict';

const React = require('react');
const Constants = require('./Constants');

class SideBar extends React.Component {
  render() {
    return (
      <div className="sideBar">
        <div className="scrollContent">
          {this._renderSections(this.props.pages)}
        </div>
      </div>
    );
  }

  _renderSections(pages) {
    return Object.keys(pages).map((pageKey) => {
      const page = pages[pageKey];
      if (typeof page !== 'object') {
        return null;
      }

      if (page.groupTitle) {
        return [
          this._renderGroupTitle(page.groupTitle),
          ...this._renderSections(page),
        ];
      }

      return this._renderLink(page.title, page.location);
    });
  }

  _renderGroupTitle(title) {
    return <h4 className="groupTitle">{title}</h4>;
  }

  _renderLink(linkName, linkUrl) {
    const arrow = <span className="arrowBullet" />;
    let linkClass = 'sideItem';
    if (this.props.page.location === linkUrl) {
      linkClass += ' curSideItem';
    }

    return (
      <h2 key={linkName}>
        <a href={linkUrl} target="_self" className={linkClass}>
          <span className="sidebarItemText">{linkName}</span>
          {arrow}
        </a>
      </h2>
    );
  }
}

module.exports = SideBar;
