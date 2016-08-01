/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

const dummy = document.createElement('div');
const transform = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find((t) => {
  // return (document.body.style[t] !== undefined);   // if DOM is not yet ready, let's do:
  return (dummy.style[t] !== undefined);
});

export default transform;
