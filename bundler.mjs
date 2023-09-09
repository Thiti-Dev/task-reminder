import {build} from 'esbuild'
import htmlPlugin from '@chialab/esbuild-plugin-html';
const externalModules = ['@mapbox/node-pre-gyp'];
//import htmlPlugin from 'esbuild-plugin-html'

build({
    entryPoints: ['./src/index.mts'],
    bundle: true,
    platform: 'node',
    target:'esnext',
    format: 'esm',
    //outdir: './bundler-dist',
    outfile: './bundler-dist/bundle.mjs',
    //outExtension: { '.js': '.mjs' },
    external:[],
    banner: {
        js: `
    // BANNER START
    const require = (await import("node:module")).createRequire(import.meta.url);
    const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
    const __dirname = (await import("node:path")).dirname(__filename);
    // BANNER END
    `,
      },
    plugins: [htmlPlugin()], // Use the HTML loader plugin
  })