// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
// import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/scrollify.js',
  plugins: [
    // babel({
    //   exclude: [
    //     'node_modules/**',
    //     'source/js/lib/**'
    //   ],
    //   presets: 'es2015-rollup'
    // })
    buble(),
    // uglify()
  ],

  targets: [
    { dest: 'dist/scrollify.cjs.js', format: 'cjs' },
    { dest: 'dist/scrollify.es6.js', format: 'es6' }
  ]
};
