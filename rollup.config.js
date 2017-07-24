import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  moduleName: 'Scrollify',
  exports: 'named',
  plugins: [
    buble()
  ],
  targets: [
    { dest: 'dist/scrollify.cjs.js', format: 'cjs' },
    { dest: 'dist/scrollify.es6.js', format: 'es' },
    { dest: 'dist/scrollify.js', format: 'iife' }
  ]
};
