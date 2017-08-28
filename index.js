var RawSource = require('webpack-sources/lib/RawSource')

var Bufferify = function() {}

Bufferify.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
      let assets = compilation.assets
      for (let file in assets) {
          if (assets.hasOwnProperty(file)) {
              let asset = assets[file]
              let content = asset.source()
              // begin to modify content
              content = this.process(content, file, assets, compilation, compiler) || content
              assets[file] = new RawSource(content)
          }
      }
      callback()
  })
}
Bufferify.prototype.process = function(content, file, assets, compilation, compiler) {}

module.exports = Bufferify
