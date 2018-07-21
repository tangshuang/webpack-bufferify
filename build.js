var gulp = require('gulp')
var bufferify = require('gulp-bufferify')
var babel = require('gulp-babel')
var namespace = 'HelloEvents'

gulp.src('src/webpack-bufferify.js')
  .pipe(babel({
    presets: [
      ['env']
    ]
  }))
  .pipe(bufferify(function(content) {
    content = content.replace(/Object\.defineProperty\(exports,[\s\S]+?\);/gm, '')
    content = content.replace('exports.WebpackBufferify = undefined;', '')
    content = content.replace('exports.default = bufferify;', '')
    content = content.replace('exports.WebpackBufferify =', '')
    content += '\n\nmodule.exports = bufferify;\n'
    return content
  }))
  .pipe(gulp.dest('dist'))