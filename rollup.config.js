import buble from '@rollup/plugin-buble';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/scrollify.es6.js', format: 'es'},
    { file: 'dist/scrollify.cjs.js', format: 'cjs', exports: 'named' },
    { file: 'dist/scrollify.js', format: 'iife', exports: 'named', name: 'scrollify' },
  ],
  plugins: [
    buble()
  ],
};
