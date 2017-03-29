/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

const dummy = document.createElement('div');        // we use this instead of document.body if the DOM is not yet ready
const transform = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find((t) => {
  return (dummy.style[t] !== undefined);
});

export default transform;
