/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

let transform = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find((t) => {
  return (document.body.style[t] !== undefined);
});

export default transform;