/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

let transform;
const dummy = document.createElement('div');        // we use this instead of document.body if the DOM is not yet ready

['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].forEach((t) => {
  if (dummy.style[t] !== undefined) { transform = t; }
});

export default transform;
