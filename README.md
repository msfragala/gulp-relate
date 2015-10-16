# gulp-relate

##Install

```
$ npm install --save-dev gulp-relate
```
## Usage
Rewrite file references relative to the current file in the stream. Pass `gulp-relate` an object containing containing a handle used in the source and the path it should rewrite to.

**`src/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="assets//css/styles.css">
</head>
<body>
  <p>Oh. My. Glob.</p>
</body>
</html>
```
**`gulpfile.js`**

```js
var gulp = require('gulp');
var relate = require('gulp-relate');

gulp.task('page', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./app/'))
    .pipe(relate({assets: './app/assets/'}))
    .pipe(gulp.dest('./app/'))
});
```
This comes in hand especially well with stream-based template systems, where assets are referenced in layouts and partials agnostic to any specific rendered file. For example, `gulp-relate` was conceived with this issue in mind from working with Nunjucks.

```js
var gulp = require('gulp');
var data = require('gulp-data');
var fm = require('front-matter');
var render = require('gulp-nunjucks-render');

gulp.task('render', function() {
  return gulp.src('./src/*.html')
    .pipe(data(function(file){
       var content = fm(String(file.contents));
       file.contents = new Buffer(content.body);
       return content.attributes;
    }))
    .pipe(render())
    .pipe(gulp.dest('./app/'))
    .pipe(relate({
      assets: './app/assets/'
    }))
    .pipe(gulp.dest('./app/'))
});
```
