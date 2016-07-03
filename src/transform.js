/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

let transform = false;
const transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

for (let i in transforms) {
  if (document.body.style[transforms[i]] !== undefined) {
    transform = transforms[i];
    break;
  }
}

export default transform;