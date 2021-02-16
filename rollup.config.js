import { terser } from "rollup-plugin-terser";
import buble from '@rollup/plugin-buble';

const pkg = require('./package.json');
const year = new Date().getFullYear();
const banner = `/*!
 * Scrollify ${pkg.version}
 *
 * @link ${pkg.homepage}
 * @copyright (c) ${year} wes hatch
 * @license ${pkg.license} https://github.com/apathetic/scrollify/blob/master/LICENSE
 */
`;


export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/scrollify.es6.js', format: 'es', banner },
    { file: 'dist/scrollify.cjs.js', format: 'cjs', exports: 'named', banner },
    { file: 'dist/scrollify.js', format: 'iife', exports: 'named', name: 'Scrollify', banner },
  ],
  plugins: [
    buble(),
    terser()
  ],
};
