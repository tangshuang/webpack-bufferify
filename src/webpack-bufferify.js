import RawSource from 'webpack-sources/lib/RawSource'

export class WebpackBufferify {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let assets = compilation.assets
      let files = Object.keys(assets)
      files.forEach((file) => {
        let asset = assets[file]
        let content = asset.source()
        // begin to modify content
        content = this.process(content, file, assets, compilation, compiler) || content
        assets[file] = new RawSource(content)
      })
      callback()
    })
  }
  process(content, file, assets, compilation, compiler) {
    throw new Error('You should override this method.')
  }
}

export default function bufferify(factory) {
  let plugin = new WebpackBufferify()
  plugin.process = factory.bind(plugin)
  return plugin
}