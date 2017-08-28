import RawSource from 'webpack-sources/lib/RawSource'

export default class {
    constructor() {}
    apply(compiler) {
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
    // rewrite this property when you create your own webpack plugin
    process(content, file, assets, compilation, compiler) {}
}
