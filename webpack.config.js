// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.mts', // Your main ESM entry point
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'bundle.cjs', // Output bundle file
    path: path.resolve(__dirname, 'dist'),
    module: true,
    libraryTarget: 'commonjs',
    chunkFormat: 'commonjs',
    chunkLoading: 'async-node'
  },
  target: 'node', // Ensure Node.js compatibility
  mode: 'production', // Set to 'production' for minification
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/, // Handle .mjs files as ESM
        type: 'javascript/auto',
      },
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ],
  },
};