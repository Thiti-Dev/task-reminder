import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: './src/index.mts',  // Your main TypeScript file
  output: {
    file: './dist/bundle.cjs',
    format: 'cjs',  // Output as ESM
  },
  plugins: [
    typescript(),  // Transpile TypeScript,
    commonjs(),
    nodePolyfills(),
    //globals(),
    builtins(),
    nodeResolve(),  // Resolve imports
    json(),
    // replace({
    //   'navigator.userAgent': JSON.stringify('node.js'),  // Replace navigator.userAgent with 'node.js'
    // }),
  ],
};