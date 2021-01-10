
/**
 * Debounce
 * @param {*} callback The function to execute
 * @param {*} wait The time to wait before the callback if fired.
 */
export function debounce(callback, wait = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), wait);
  };
};

/**
 * getUnit(), from anime.js
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
 */
export function getUnit(val) {
  const split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

/**
  * [mapTo description]
  * @param  {any} input [description]
  * @param  {number} scale [description]
  * @return {number}       [description]
  */
export function mapTo(input, scale) {
  const parsed = parseFloat(input);
  const unit = getUnit(input);

  switch (unit) {
    case 'px':
      return parsed;
    case '%':
      return parsed / 100.0 * scale;
    default:
      return parsed * scale;
  }
}

