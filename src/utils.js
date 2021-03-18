
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

// /*
//  * @example "0.5"
//  * @example "200px"
//  * @example "33vh"
//  */
// function calculateDuration(d = 1, el) {
//   return (typeof d === 'function') ?
//     d(el) :
//     mapTo(d, window.innerHeight + el.offsetHeight);
// }



export function parseDataAttribute(el) {
  const parser = (str) => Function(`'use strict';return (${str})`)();
  return parser(el.dataset.scrollify);
}


// helper parsing functions
// NOTE: will work for --css-vars, but only if they resolve to a number (ie. no strings, 'rgb(0,0,0)' etc):
// export const css = (prop, el) => parseFloat(window.getComputedStyle(el)[prop]) || 0;
// export const css = (prop, el) => parseFloat(window.getComputedStyle(el).getPropertyValue(prop)) || 0;
export const css = (prop, el) => window.getComputedStyle(el)[prop] || 0;
export const max = (...args) => Math.max(...args);
export const min = (...args) => Math.min(...args);

export const isArray = (n) => Array.isArray(n);
export const isFunc = (n) => typeof n === 'function';

export const getRef = (el) => el.nodeType === 1 ? el : document.querySelector(el);
export const getPosition = (el) => {
  const bcr = el.getBoundingClientRect();
  return {
    left:   bcr.left + window.pageXOffset,
    right:  bcr.right + window.pageXOffset,
    top:    bcr.top + window.pageYOffset,
    bottom: bcr.bottom + window.pageYOffset,
    height: bcr.height,
    width:  bcr.width
  };
};


/**
 * Given an array of keyframe `times`, return a function that
 * will interpolate a value from `arrB` given an arbitrary time `t`
 * @param {number[]} times An array of keyframes, bounded by 0 and 1
 * @param {number[]} arrB An array of values, each corresponding to the
 *                        keyframe value in the `times` array.
 */
export function interpolate(times, values, t) {
  let index = 0;

  times.forEach((a) => (a < t) && index++);
  // index = Math.min(index, times.length - 1);

  // times.forEach((a) => {
  //   if (a < v) index++;
  // });

  if (index <= 0) {
    return values[0];
  }

  if (index >= times.length) {
    return values[times.length - 1];
  }

  const j = index - 1;
  const vector = invlerp(times[j], times[index], t);

  return lerp(values[j], values[index], vector);
};
export const lerp = (start, end, t) => (end - start) * t + start;
export const invlerp = (a, b, v) => (v - a) / (b - a);
