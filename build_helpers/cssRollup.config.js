import multiEntry from '@rollup/plugin-multi-entry';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import autoprefixer from 'autoprefixer';
import postcssCustomProperties from 'postcss-custom-properties';
import cssVar from '../src/stubs/cssVar';

function escapeSlash(match) {
  return match.replace(/\//g, '_');
}

function slashTransform(content) {
  return content.replace(/\.[\w\/\:\.]+(\s|\,)/g, escapeSlash);
}

// NOTE (pradeep): Our custom rollup plugin that transforms slashes to underscores in CSS files
// Check https://rollupjs.org/guide/en/#plugins-overview for a quick start on roll plugins
function cssSlashTransformPlugin() {
  return {
    name: 'plugin-css-slash-transform', // this name will show up in warnings and errors
    resolveId(source) {
      if (source.match(/\.css$/)) {
        return source; // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null; // other ids should be handled as usually
    },
    transform(code, id) {
      if (id.match(/\.css$/)) {
        return slashTransform(code);
      }
      return null; // other ids should be handled as usually
    },
  };
}

// NOTE (pradeep): I prefer CSS to be at "dist/css", but this breaks backward compatibility
// because previously we always bundled CSS in "dist/"
const cssOutputDirectory = 'dist/';

const makeCSSRollupConfig = function (minimize, inputGlob, outputBundleName) {
  return {
    input: [inputGlob],
    output: {
      // NOTE (pradeep): I wasn't able to figure out a way to have roll-up generate just the CSS.
      // So for now, we have a bare JS file that simply includes the actual CSS, but is ignored.
      // TODO: Figure out a way to generate the CSS without creating a JS bundle.
      file: 'dist/placeholder.css.js',
      format: 'es',
    },
    plugins: [
      cssSlashTransformPlugin(),
      postcss({
        extract: path.resolve(cssOutputDirectory + outputBundleName), // extract CSS out to the specified location
        minimize,
        plugins: [
          postcssCustomProperties({
            preserve: false,
            importFrom: { customProperties: cssVar.CSS_VARS },
          }),
          autoprefixer(),
        ],
      }),
      multiEntry(), // required for multiple CSS files to be input
    ],
  };
};

const allCSSGlob = './src/css/**/*.css';
const layoutCSSGlob = './src/css/layout/**/*.css';
const styleCSSGlob = './src/css/style/**/*.css';

export default [
  // layout + styling
  makeCSSRollupConfig(false, allCSSGlob, 'fixed-data-table.css'),
  makeCSSRollupConfig(true, allCSSGlob, 'fixed-data-table.min.css'),

  // layout
  makeCSSRollupConfig(false, layoutCSSGlob, 'fixed-data-table-base.css'),
  makeCSSRollupConfig(true, layoutCSSGlob, 'fixed-data-table-base.min.css'),

  // styling
  makeCSSRollupConfig(false, styleCSSGlob, 'fixed-data-table-style.css'),
  makeCSSRollupConfig(true, styleCSSGlob, 'fixed-data-table-style.min.css'),
];
