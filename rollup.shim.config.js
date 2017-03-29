import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/shim.js',
  dest: 'dist/scrollify.js',
  format: 'iife',
  moduleName: 'Scrollify',
  plugins: [
    buble()
  ]
};
