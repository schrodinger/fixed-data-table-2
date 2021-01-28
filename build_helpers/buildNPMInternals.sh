#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var glob = require('glob');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var babel = require('@babel/core');

var internalPath = path.join(__dirname, '../internal');
rimraf.sync(internalPath); // remove older entries
fs.mkdirSync(internalPath);

var providesModuleRegex = /@providesModule ([^\s*]+)/;
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
  var providesModule = providesModuleRegex.exec(contents);
  if (providesModule) {
    contents = babel.transform(contents, babelConf).code;
    contents = contents.replace(moduleRequireRegex, replaceRequirePath);
    contents = contents.replace(findDEVRegex, 'process.env.NODE_ENV !== \'production\'');
    fs.writeFileSync(
      path.join(internalPath, providesModule[1] + '.js'),
      contents
    );
  }
}

glob.sync(path.join(__dirname, '../src/**/*.js')).forEach(processFile);
