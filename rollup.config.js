import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import cssRollupConfigs from './build_helpers/cssRollup.config.js';
import pkg from './package.json';

const peerDependencies = Object.keys(pkg.peerDependencies || {});

export default [
  // for CSS
  ...cssRollupConfigs,

  // for CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'dist/cjs/fixed-data-table-2.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**', // allow importing of common JS modules
      }),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false,
      }),
      terser(),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },

  // for ES6
  {
    input: 'src/index.js',
    output: {
      file: 'dist/es/fixed-data-table-2.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**', // allow importing of common JS modules
      }),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false,
      }),
      terser(),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },

  // for UMD during development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/fixed-data-table-2.js',
      name: 'FixedDataTable',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**', // allow importing of common JS modules
      }),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      inject({
        global: 'global',
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: true,
      }),
      terser(),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },

  // for UMD in production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/fixed-data-table-2.min.js',
      name: 'FixedDataTable',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**', // allow importing of common JS modules
      }),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      inject({
        global: 'global',
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false,
      }),
      terser(),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },
];
