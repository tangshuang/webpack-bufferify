# Webpack Bufferify

This is a webpack plugin generator tool, which help you modify the output file content of webpack more quickly.

## Install

```
npm install --save-dev webpack-bufferify
```

## Usage

ES6:

```
import bufferify, { WebpackBufferify } from 'webpack-bufferify/src/webpack-bufferify'
```

CommonJS:

```
const bufferify = require('webpack-bufferify')
```

To use:

```
//webpack.config.js
...
plugins: [
    bufferify(function(content, file, assets, compilation) {
        content = content.replace(/a/g, 'b')
        return content
    }),
],
...
```

## Params

As you seen, you pass a callback function into `bufferify` function. This callback function has parameters:

**content**

chunk buffer content string, which has been convert to be a string by `content.toString()`.

if you want to get the original buffer, use `assets[file].source()`.

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

## Create a webpack plugin

If you use ES6 to build you code, you are able to create your own webpack plugin easliy like:

```
import { WebpackBufferify } from 'webpack-bufferify/src/webpack-bufferify'

export default class MyWebpackPlugin extends WebpackBufferify {
    process(content, file, assets, compilation, compiler) {
        // ...
    }
}
```

Just override `process` method.
