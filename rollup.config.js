import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import cssRollupConfigs from './build_helpers/cssRollup.config.js';
import pkg from './package.json';

// extract out the list of peer dependencies from package.json
const peerDependencies = Object.keys(pkg.peerDependencies || {});

export default [
  // for CSS
  ...cssRollupConfigs,

  // for CommonJS and ES6
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/cjs/fixed-data-table-2.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/es/fixed-data-table-2.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        __DEV__: 'process.env.NODE_ENV !== "production"',
      }),
      nodeResolve(), // allow importing external modules (node modules)
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      commonjs({
        include: 'node_modules/**', // allow importing common JS modules
      }),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },

  // for UMD during development
  {
    input: 'src/index.js',
    output: {
      // NOTE (pradeep): I prefer this to be in "dist/umd" instead of just "dist/", but that'll break backward compatibility.
      // I also prefer this to be named fixed-data-table-2.js, but that also breaks backward compatibility.
      file: 'dist/fixed-data-table.js',
      name: 'FixedDataTable',
      format: 'umd',
      globals: {
        react: 'React', // react's UMD export name is 'React'
        'react-dom': 'ReactDOM', // react-dom's UMD export name is 'ReactDOM'
      },
      sourcemap: true,
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'), // this bundle is always used in development mode
        __DEV__: true,
      }),
      nodeResolve(), // allow importing external modules (node modules)
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      commonjs({
        include: 'node_modules/**', // allow importing common JS modules
      }),
      inject({
        global: 'global', // `global` is not defined in browsers, so we use a polyfill
      }),
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },

  // for UMD in production
  {
    input: 'src/index.js',
    output: {
      // NOTE (pradeep): I prefer this to be in "dist/umd" instead of just "dist/", but that'll break backward compatibility.
      // I also prefer this to be named fixed-data-table-2.js, but that also breaks backward compatibility.
      file: 'dist/fixed-data-table.min.js',
      name: 'FixedDataTable',
      format: 'umd',
      globals: {
        react: 'React', // react's UMD export name is 'React'
        'react-dom': 'ReactDOM', // react-dom's UMD export name is 'ReactDOM'
      },
      sourcemap: true,
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'), // this bundle is always used in production mode
        __DEV__: false,
      }),
      nodeResolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**', // no need to include node_modules because libraries only distribute transpiled code
      }),
      commonjs({
        include: 'node_modules/**', // allow importing of common JS modules
      }),
      inject({
        global: 'global', // `global` is not defined in browsers, so we use a polyfill
      }),
      terser(), // minify because this bundle is for production usage
    ],
    external: peerDependencies, // don't include peer dependencies in our bundle
  },
];
