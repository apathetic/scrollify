import buble from 'rollup-plugin-buble';

export default [
  {
    entry: 'src/index.js',
    exports: 'named',
    plugins: [
      buble()
    ],
    targets: [
      { dest: 'dist/scrollify.cjs.js', format: 'cjs' },
      { dest: 'dist/scrollify.es6.js', format: 'es' },
    ]
  },
  {
    entry: 'src/shim.js',
    moduleName: 'Scrollify',
    plugins: [
      buble()
    ],
    targets: [
      { dest: 'dist/scrollify.js', format: 'iife' }
    ]
  }
];
