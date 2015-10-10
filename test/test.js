var assert = require('stream-assert');
var File = require('gulp-util').File;
var through = require('through2');
var locate = require('../libs/locate.js');
var should = require('should');
var Path = require('path');
var relate = require('../');
var gulp = require('gulp');
var asserRefs = require('./libs/assert-references.js');

var sampleHTML = Path.join(__dirname, 'sample.html');
var sampleCSS = Path.join(__dirname, 'sample.css');

describe('gulp-relate', function() {
  it('should ignore null files', function(done) {
    var stream = relate({assets: './assets/'})
      .pipe(assert.length(0))
      .pipe(assert.end(done));
    stream.write(new File());
    stream.end();
  });
  it('should throw, when passed stream', function(done) {
    gulp.src('*', {buffer: false})
      .pipe(relate({assets: './assets/'}))
      .on('error', function(err) {
        err.message.should.eql('Streaming not supported');
        done();
      });
  });
  it('should replace references in HTML', function(done) {
    var __reference = {assets: './assets/'};
    gulp.src(sampleHTML)
      .pipe(asserRefs('assets', 'should == 2'))
      .pipe(relate(__reference))
      .pipe(asserRefs('assets', 'should == 0'))
      .pipe(asserRefs(__reference, 'should == 2'))
      .pipe(assert.end(done));
  });
  it('should replace references in CSS', function(done) {
    var __reference = {assets: './assets/'};
    gulp.src(sampleCSS)
      .pipe(asserRefs('assets', 'should == 2'))
      .pipe(relate(__reference))
      .pipe(asserRefs('assets', 'should == 0'))
      .pipe(asserRefs(__reference, 'should == 2'))
      .pipe(assert.end(done));
  });
});
