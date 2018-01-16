/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

export let transform;
const dummy = document.createElement('div');        // we use this instead of document.body if the DOM is not yet ready

['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].forEach((t) => {
  if (dummy.style[t] !== undefined) { transform = t; }
});


/**
 * getUnit(), from anime.js
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
 */
export function getUnit(val) {
  const split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

