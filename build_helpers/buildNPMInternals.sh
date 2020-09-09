#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var glob = require('glob');
var path = require('path');
var fs = require('fs');
var babel = require('@babel/core');
var mkdirp = require('mkdirp');

var internalPath = path.join(__dirname, '../internal');
var sourcePath = path.join(__dirname, '../src');
if (!fs.existsSync(internalPath)) {
  fs.mkdirSync(internalPath);
}

var moduleRequireRegex = /require\((?:'|")([\w\.\/]+)(?:'|")\)/gm;
var excludePathRegex = /^(react|lodash|redux|reselect)($|\/)/;
var findDEVRegex = /__DEV__/g;

function replaceRequirePath(match, modulePath) {
  var path = modulePath;

  if (!excludePathRegex.test(path)) {
    path = './' + path;
  }

  return 'require(\'' + path + '\')';
}

var babelConf = JSON.parse(
  fs.readFileSync('.babelrc', {encoding: 'utf8'})
);

function processFile(fileName) {
  var contents = fs.readFileSync(fileName, {encoding: 'utf8'});
  var outputPath = path.join(internalPath, path.relative(sourcePath, fileName));

  // we create the directory explicitly because `fs.writeFileSync` requires parent directory to exist
  mkdirp.sync(path.dirname(outputPath));

  contents = babel.transform(contents, babelConf).code;
  contents = contents.replace(moduleRequireRegex, replaceRequirePath);
  contents = contents.replace(findDEVRegex, 'process.env.NODE_ENV !== \'production\'');
  fs.writeFileSync(
    outputPath,
    contents
  );
}

glob.sync(path.join(__dirname, '../src/**/*.js')).forEach(processFile);
