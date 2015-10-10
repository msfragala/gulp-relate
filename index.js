'use strict';

var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var Stream = require('stream');
var Path = require('path');
var Fs = require('fs');

var locate = require('./libs/locate.js');
var replace = require('./libs/replace.js');
var PLUGIN = 'gulp-relate';

module.exports = function(pathsObject) {
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      callback();
      return;
    } else if (file.isStream()) {
      callback(new PluginError(PLUGIN, 'Streaming not supported'));
      return;
    }

    file.dirname = Path.dirname(file.path);
    Object.keys(pathsObject).map(function(handle) {
      var matches = locate(file, handle);
      return replace(file, matches, handle, pathsObject[handle]);
    });

    delete file.dirname;
    this.push(file);
    callback();

  });
};

module.exports.locate = locate;
