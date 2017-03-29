import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/scrollify.js',
  plugins: [
    buble()
  ],

  targets: [
    { dest: 'dist/scrollify.cjs.js', format: 'cjs' },
    { dest: 'dist/scrollify.es6.js', format: 'es' }
  ]
};
