
/* Adapted from Anime https://github.com/juliangarnier/anime
 * @author Julian Garnier
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
 */

const validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

export function getUnit(val) {
  const split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

export function getTransformUnit(propName) {
  if (stringContains(propName, 'translate')) return 'px';
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
}

function getCSSValue(el, prop) {
  if (prop in el.style) {
    const val = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return getComputedStyle(el).getPropertyValue(val) || '0';
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
  if (is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
  if (el[prop] != null) return 'object';
}

function getTransformValue(el, propName) {
  const defaultUnit = getTransformUnit(propName);
  const defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
  const str = el.style.transform;
  if (!str) return defaultVal;
  let match = [];
  let props = [];
  let values = [];
  const rgx = /(\w+)\((.+?)\)/g;
  while (match = rgx.exec(str)) {
    props.push(match[1]);
    values.push(match[2]);
  }
  const value = values.filter((val, i) => props[i] === propName );
  return arrayLength(value) ? value[0] : defaultVal;
}

function getOriginalTargetValue(target, propName) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName);
    case 'css': return getCSSValue(target, propName);
    case 'attribute': return target.getAttribute(propName);
  }
  return target[propName] || 0;
}

export function getRelativeValue(to, from) {
  const operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) return to;
  const x = parseFloat(from);
  const y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
  }
}
