import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/shim.js',
  dest: 'dist/scrollify.min.js',
  format: 'iife',
  moduleName: 'Scrollify',
  plugins: [
    buble(),
    // uglify()
  ]
};
