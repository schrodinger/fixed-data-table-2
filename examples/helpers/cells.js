/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import ExampleImage from './ExampleImage';
import { Cell } from 'fixed-data-table-2';
import React from 'react';
import ReactTooltip from 'react-tooltip';

class CollapseCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </Cell>
    );
  }
}

class ColoredTextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)}
      </Cell>
    );
  }

  colorizeText(str, index) {
    let val, n = 0;
    return str.split('').map((letter) => {
      val = index * 70 + n++;
      let color = 'hsl(' + val + ', 100%, 50%)';
      return <span style={{color}} key={val}>{letter}</span>;
    });
  }
}

class DateCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </Cell>
    );
  }
}

class ImageCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <ExampleImage
        src={data.getObjectAt(rowIndex)[columnKey]}
      />
    );
  }
}

class LinkCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href="#">{data.getObjectAt(rowIndex)[columnKey]}</a>
      </Cell>
    );
  }
}

class PendingCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <Cell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
    );
  }
}
const PagedCell = ({data, ...props}) => {
  const dataVersion = data.getDataVersion();
  return (
    <PendingCell
      data={data}
      dataVersion={dataVersion}
      {...props}>
    </PendingCell>
  );
};

class RemovableHeaderCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, callback, children, ...props} = this.props;
    return (
      <Cell {...props}>
        {children}
        <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </Cell>
    );
  }
}

class TextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey]}
      </Cell>
    );
  }
}

class TooltipCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    const value = data.getObjectAt(rowIndex)[columnKey];
    return (
      <Cell
        {...props}
        onMouseEnter={() => { ReactTooltip.show(); }}
        onMouseLeave={() => { ReactTooltip.hide(); }}>
        <div data-tip={value}>
          {value}
        </div>
      </Cell>
    );
  }
}
export { CollapseCell, ColoredTextCell, DateCell, ImageCell, LinkCell, PagedCell, RemovableHeaderCell, TextCell, TooltipCell };
