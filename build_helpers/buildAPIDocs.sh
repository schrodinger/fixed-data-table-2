#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var fs = require('fs');
var generateMarkdown = require('./react_documentation/generateMarkdown');
var path = require('path');
var ReactDocGen = require('react-docgen');

var docsPath = path.join(__dirname, '../docs/api');
if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath);
}

var PROJECT_ROOT = path.join(__dirname, '../');
var FILES_TO_READ = [
  {
    path: path.join(PROJECT_ROOT, 'src/FixedDataTable.js'),
    name: 'Table',
    markdownFileName: 'TableAPI.md'
  },
  {
    path: path.join(PROJECT_ROOT, 'src/FixedDataTableColumn.js'),
    name: 'Column',
    markdownFileName: 'ColumnAPI.md'
  },
  {
    path: path.join(PROJECT_ROOT, 'src/FixedDataTableColumnGroup.js'),
    name: 'ColumnGroup',
    markdownFileName: 'ColumnGroupAPI.md'
  },
  {
    path: path.join(PROJECT_ROOT, 'src/FixedDataTableCellDefault.js'),
    name: 'DataCell',
    markdownFileName: 'CellAPI.md'
  },
  {
    path: path.join(PROJECT_ROOT, 'src/plugins/ResizeReorder/ReorderCell.js'),
    name: 'ReorderCell',
    markdownFileName: 'ReorderCell.md'
  },
  {
    path: path.join(PROJECT_ROOT, 'src/plugins/ResizeReorder/ResizeCell.js'),
    name: 'ResizeCell',
    markdownFileName: 'ResizeCell.md'
  }
];

FILES_TO_READ.forEach(function(file) {
  var fileSource = fs.readFileSync(file.path);
  var fileDocsData = ReactDocGen.parse(fileSource);
  var markdownFilePath = path.join(docsPath, file.markdownFileName);

  var headerComment = '<!-- File generated from "' +
    file.path.replace(PROJECT_ROOT, '') +
    '" -->\n';

  fs.writeFileSync(
    markdownFilePath,
    headerComment + generateMarkdown(file.name, fileDocsData)
  );

  console.log('Wrote: ' + markdownFilePath);
});
