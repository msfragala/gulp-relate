var locate = require('../../libs/locate.js');
var through = require('through2');
var should = require('should');
var Path = require('path');

module.exports = function(handle, assertion) {

  return through.obj(function(file, enc, callback) {
    var matches, asset, regex;
    if (handle.constructor === Object) {

      Object.keys(handle).map(function($handle) {
        asset = tracePath(file.path, handle[$handle]);
        asset = asset.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        regex = new RegExp(asset + '/[^\'\"]+', 'g');
        matches = locate(file, handle, regex);
        compareReferences(assertion, matches);
      });

    } else {

      matches = locate(file, handle);
      compareReferences(assertion, matches);

    }

    this.push(file); callback();
  });
};

function compareReferences(assertion, references) {
  var less, greater, equal, number;
  below = Boolean(assertion.search('<') > -1);
  above = Boolean(assertion.search('>') > -1);
  equal = Boolean(assertion.search('=') > -1);
  number = /(-?\d+(?:\.\d+)?)/.exec(assertion)[1];
  number = parseFloat(number);

  if (below && !equal) (references.length).should.be.below(number);
  else if (above && !equal) (references.length).should.be.above(number);
  else if (below && equal) (references.length).should.be.belowOrEqual(number);
  else if (above && equal) (references.length).should.be.aboveOrEqual(number);
  else if (equal) (references.length).should.equal(number);
}

function tracePath($base, $dest) {
  var dest = Path.resolve($dest);
  var base = Path.dirname(Path.resolve($base));
  return Path.relative(base, dest);
}
