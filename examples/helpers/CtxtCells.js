import React from 'react';
import { Cell } from 'fixed-data-table-2';
import ExampleImage from './ExampleImage';

function PropTypeCtxtData(props, propName, componentName) {
  const dataObj = props[propName];
  if (dataObj.getObjectAt === undefined){
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'has a getObjectAtk() function'
      ].join(' ')
    );
  }
}

const AvatarCell = ({ rowIndex, columnKey, ...props }, {data}) => (
  <ExampleImage
    src={data.getObjectAt(rowIndex)[columnKey]}
    {...props}
  />);

AvatarCell.contextTypes = {
  data: PropTypeCtxtData,
};

const TextCell = ({ rowIndex, columnKey, ...props }, {data}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);
TextCell.contextTypes = {
  data: PropTypeCtxtData,
};

module.exports = {
  AvatarCell,
  TextCell,
  PropTypeCtxtData
};
