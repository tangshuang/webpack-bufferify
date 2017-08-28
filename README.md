# Webpack Bufferify

Webpack bufferify plugin basic class, when you want to create a webpack plugin to modify output file content, just extend this class.

## Install

```
npm install --save-dev webpack-bufferify
```

## Usage

```
var Bufferify = require('webpack-bufferify')
var MyWebpackPlugin = function() {}

MyWebpackPlugin.prototype.apply = Bufferify.prototype.apply
MyWebpackPlugin.prototype.process = function(content, file, assets, compilation) {
    // modify content, e.g. content = content.replace(/a/g, 'b')
    return content
}
```

or es6:

```
import Bufferify from 'webpack-bufferify/class'
export default class MyWebpackPlugin extends Bufferify {
    process(content, file, assets, compilation) {
        // modify content, e.g. content = content.replace(/a/g, 'b')
        return content
    }
}
```

And then when you use this new plugin:

```
//webpack.config.js

...
    plugins: [
        new MyWebpackPlugin(),
    ],
...
```
## Notice

In previous version, I use options.output.filename to determine which file to modify, this cause bug when using `[name].js` in output.filename.

In this version, all chunks content will be modified. If you want to modify certain file, do like:

```
...
  process(content, file) {
    if (file === 'myfile.js') {
      // do what you want
    }
  }
...
```

`process` has parameters:

**content**

chunk content, you can use it to modify.

**file**

filename of chunk.

**assets**

all files in chunks. you can use `assets[file]` to get certain asset.

**compilation**

webpack compilation.

**compiler**

webpack compiler.

**@return value**

the return value (string) will be treated as this output file content. if you do not return any content, original content will be used.
