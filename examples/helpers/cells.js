/**
 * Copyright Schrodinger, LLC
 */

'use strict';

import ExampleImage from './ExampleImage';
import { DataCell } from 'fixed-data-table-2';
import React from 'react';
import ReactTooltip from 'react-tooltip';

class CollapseCell extends React.PureComponent {
  render() {
    const {
      data,
      rowIndex,
      columnKey,
      collapsedRows,
      callback,
      ...props
    } = this.props;
    return (
      <DataCell {...props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </DataCell>
    );
  }
}

class ColoredTextCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>
        {this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)}
      </DataCell>
    );
  }

  colorizeText(str, index) {
    let val,
      n = 0;
    return str.split('').map((letter) => {
      val = index * 70 + n++;
      let color = 'hsl(' + val + ', 100%, 50%)';
      return (
        <span style={{ color }} key={val}>
          {letter}
        </span>
      );
    });
  }
}

class DateCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </DataCell>
    );
  }
}

class ImageCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return <ExampleImage src={data.getObjectAt(rowIndex)[columnKey]} />;
  }
}

class LinkCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>
        <a href="#">{data.getObjectAt(rowIndex)[columnKey]}</a>
      </DataCell>
    );
  }
}

class PendingCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, dataVersion, ...props } = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <DataCell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </DataCell>
    );
  }
}
const PagedCell = ({ data, ...props }) => {
  const dataVersion = data.getDataVersion();
  return (
    <PendingCell data={data} dataVersion={dataVersion} {...props}></PendingCell>
  );
};

class RemovableHeaderCell extends React.PureComponent {
  render() {
    const {
      data,
      rowIndex,
      columnKey,
      callback,
      children,
      ...props
    } = this.props;
    return (
      <DataCell {...props}>
        {children}
        <a style={{ float: 'right' }} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </DataCell>
    );
  }
}

class TextCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    return (
      <DataCell {...props}>{data.getObjectAt(rowIndex)[columnKey]}</DataCell>
    );
  }
}

class TooltipCell extends React.PureComponent {
  render() {
    const { data, rowIndex, columnKey, ...props } = this.props;
    const value = data.getObjectAt(rowIndex)[columnKey];
    return (
      <DataCell
        {...props}
        onMouseEnter={() => {
          ReactTooltip.show();
        }}
        onMouseLeave={() => {
          ReactTooltip.hide();
        }}
      >
        <div data-tip={value}>{value}</div>
      </DataCell>
    );
  }
}
export {
  CollapseCell,
  ColoredTextCell,
  DateCell,
  ImageCell,
  LinkCell,
  PagedCell,
  RemovableHeaderCell,
  TextCell,
  TooltipCell,
};
