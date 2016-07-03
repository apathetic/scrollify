(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeInQuad = easeInQuad;
exports.easeOutQuad = easeOutQuad;
exports.easeInOutQuad = easeInOutQuad;
exports.easeInCubic = easeInCubic;
exports.easeOutCubic = easeOutCubic;
exports.easeInOutCubic = easeInOutCubic;
exports.easeInQuart = easeInQuart;
exports.easeOutQuart = easeOutQuart;
exports.easeInOutQuart = easeInOutQuart;
exports.easeInQuint = easeInQuint;
exports.easeOutQuint = easeOutQuint;
exports.easeInOutQuint = easeInOutQuint;
exports.easeInSine = easeInSine;
exports.easeOutSine = easeOutSine;
exports.easeInOutSine = easeInOutSine;
exports.easeInExpo = easeInExpo;
exports.easeOutExpo = easeOutExpo;
exports.easeInOutExpo = easeInOutExpo;
exports.easeInCirc = easeInCirc;
exports.easeOutCirc = easeOutCirc;
exports.easeInOutCirc = easeInOutCirc;
exports.easeInElastic = easeInElastic;
exports.easeOutElastic = easeOutElastic;
exports.easeInOutElastic = easeInOutElastic;
exports.easeInBack = easeInBack;
exports.easeOutBack = easeOutBack;
exports.easeInOutBack = easeInOutBack;
exports.easeOutBounce = easeOutBounce;
/*eslint max-len: ["error", 120]*/

function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b;
  }
  return -c / 2 * (--t * (t - 2) - 1) + b;
}

function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t + b;
  }
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}

function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t + b;
  }
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function easeInQuint(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b;
  }
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
  return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
  if (t == 0) {
    return b;
  }
  if (t == d) {
    return b + c;
  }
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  }
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  }
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

function easeInElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) {
    return b;
  }
  if ((t /= d) == 1) {
    return b + c;
  }
  if (!p) {
    p = d * .3;
  }
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

function easeOutElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) {
    return b;
  }
  if ((t /= d) == 1) {
    return b + c;
  }
  if (!p) {
    p = d * .3;
  }
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}

function easeInOutElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) {
    return b;
  }
  if ((t /= d / 2) == 2) {
    return b + c;
  }
  if (!p) {
    p = d * (.3 * 1.5);
  }
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  if (t < 1) {
    return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

function easeInBack(t, b, c, d, s) {
  if (s == undefined) {
    s = 1.70158;
  }
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(t, b, c, d, s) {
  if (s == undefined) {
    s = 1.70158;
  }
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) {
    s = 1.70158;
  }
  if ((t /= d / 2) < 1) {
    return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  }
  return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}

function easeOutBounce(t, b, c, d) {
  if (t /= d < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
  }
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateX = translateX;
exports.translateY = translateY;
exports.rotate = rotate;
exports.scale = scale;
exports.fade = fade;
exports.parallax = parallax;
exports.toggle = toggle;
exports.stick = stick;

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Translate an element along the X-axis.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function translateX(progress) {
  var to = this.options.to || 0;
  var from = this.options.from || 0;
  var offset = (to - from) * progress + from;

  this.transforms.position[0] = offset;
  // this.element.style[transform] = 'translate3d(' + offset + unit + ', 0, 0)';
}

/**
 * Translate an element vertically.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize and are curried in via "this".
 *
 * NOTE: for all functions herein, "this" contains effect options, a
 * transformation Object, and also a reference to the element.
 */

/*global console*/
/*eslint no-invalid-this: "error"*/

function translateY(progress) {
  // let delay = this.options.delay || 0;
  var to = this.options.to || 0;
  var from = this.options.from || 0; // this.transforms.position[1];
  // let unit = this.options.unit || 'px';
  var offset = (to - from) * progress + from;

  // offset -= delay;

  // this.element.style[transform] = 'translate3d(0, ' + offset + unit + ', 0)';
  this.transforms.position[1] = offset;
}

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function rotate(progress) {
  var radians = this.options.rad * progress;

  this.transforms.rotation[2] = radians;
};

/**
 * Uniformly scale an element along both axis'.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function scale(progress) {
  var to = this.options.to || 1;
  var from = this.options.from || this.transforms.scale[0];
  var scale = (to - from) * progress + from;

  this.transforms.scale[0] = scale;
  this.transforms.scale[1] = scale;
};

/**
 * Update an element's opacity.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function fade(progress) {
  var to = this.options.to !== undefined ? this.options.to : 1;
  var from = this.options.from !== undefined ? this.options.from : 1;
  var opacity = (to - from) * progress + from;

  this.element.style.opacity = opacity;
};

/**
 * Parallax an element.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 *
 * "this" contains effect options and also a reference to the element.
 */
function parallax(progress) {
  var offset = 0;
  var range = this.options.range || 0;

  offset = progress * range;
  // this.element.style[transform] = 'translate(0, ' + offset + 'px)';
  this.transforms.position[1] = offset; // just vertical for now
}

/**
 * Toggle a class on or off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function toggle(progress) {
  var opts = this.options;
  var element = this.element;
  var times = Object.keys(opts);

  times.forEach(function (time) {
    var css = opts[time];

    if (progress > time) {
      element.classList.add(css);
    } else {
      element.classList.remove(css);
    }
  });
}

/**
 * Sticky Element: sets up a sticky element which toggles position 'fixed' on / off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function stick(progress) {
  var element = this.element;
  var currentState = '_';

  progress = Math.min(1.0, Math.max(0.0, progress));

  if (progress <= 0) {
    setState(element, 'normal');
  } else if (progress >= 1) {
    setState(element, 'bottom');
  } else {
    setState(element, 'sticky');
  }

  function setState(element, state) {
    var BCR = element.getBoundingClientRect();

    if (currentState === state) {
      return;
    }
    if (state == 'sticky') {
      applyStyles(BCR);
    } else {
      applyStyles(BCR, false);
    }

    element.className = '';
    // element.classList.remove(currentState);  // TODO: why is this not working?
    element.classList.add(state);

    currentState = state;
  }

  function applyStyles(styles) {
    var add = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    // for (let prop in styles) {
    //   if (prop == 'bottom' || prop == 'right') { continue; }
    //   this.style[prop] = (add) ? styles[prop] + 'px' : '';
    // }
    element.style.top = add ? styles.top + 'px' : '';
    element.style.left = add ? styles.left + 'px' : '';
    element.style.width = add ? styles.width + 'px' : '';
    // this.style.height
    // this.style.position = (add) ? 'fixed' : 'absolute';             // OR, deal with this via CSS...?
  }

  // boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
}

},{"./transform":7}],3:[function(require,module,exports){
/*
The MIT License (MIT)

Copyright (c) 2015 Daniel Lundin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function assignedMatrixMultiplication(a, b, res) {
  // Unrolled loop
  res[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  res[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  res[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  res[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

  res[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  res[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  res[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  res[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

  res[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  res[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  res[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  res[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

  res[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  res[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  res[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  res[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

  return res;
}

function assignTranslate(matrix, x, y, z) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = x;
  matrix[13] = y;
  matrix[14] = z;
  matrix[15] = 1;
}

function assignRotateX(matrix, rad) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = Math.cos(rad);
  matrix[6] = -Math.sin(rad);
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = Math.sin(rad);
  matrix[10] = Math.cos(rad);
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

var assignRotateY = function assignRotateY(matrix, rad) {
  matrix[0] = Math.cos(rad);
  matrix[1] = 0;
  matrix[2] = Math.sin(rad);
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = -Math.sin(rad);
  matrix[9] = 0;
  matrix[10] = Math.cos(rad);
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
};

function assignRotateZ(matrix, rad) {
  matrix[0] = Math.cos(rad);
  matrix[1] = -Math.sin(rad);
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = Math.sin(rad);
  matrix[5] = Math.cos(rad);
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignSkew(matrix, ax, ay) {
  matrix[0] = 1;
  matrix[1] = Math.tan(ax);
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = Math.tan(ay);
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignScale(matrix, x, y) {
  matrix[0] = x;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = y;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignIdentity(matrix) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function copyArray(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
  b[3] = a[3];
  b[4] = a[4];
  b[5] = a[5];
  b[6] = a[6];
  b[7] = a[7];
  b[8] = a[8];
  b[9] = a[9];
  b[10] = a[10];
  b[11] = a[11];
  b[12] = a[12];
  b[13] = a[13];
  b[14] = a[14];
  b[15] = a[15];
}

function createMatrix() {
  var data = new Float32Array(16);
  var a = new Float32Array(16);
  var b = new Float32Array(16);
  assignIdentity(data);

  return {
    data: data,

    asCSS: function asCSS() {
      var css = 'matrix3d(';
      for (var i = 0; i < 15; ++i) {
        if (Math.abs(data[i]) < 0.0001) {
          css += '0,';
        } else {
          css += data[i].toFixed(10) + ',';
        }
      }
      if (Math.abs(data[15]) < 0.0001) {
        css += '0)';
      } else {
        css += data[15].toFixed(10) + ')';
      }
      return css;
    },

    clear: function clear() {
      assignIdentity(data);
    },

    translate: function translate(x, y, z) {
      copyArray(data, a);
      assignTranslate(b, x, y, z);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateX: function rotateX(radians) {
      copyArray(data, a);
      assignRotateX(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateY: function rotateY(radians) {
      copyArray(data, a);
      assignRotateY(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateZ: function rotateZ(radians) {
      copyArray(data, a);
      assignRotateZ(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    scale: function scale(x, y) {
      copyArray(data, a);
      assignScale(b, x, y);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    skew: function skew(ax, ay) {
      copyArray(data, a);
      assignSkew(b, ax, ay);
      assignedMatrixMultiplication(a, b, data);
      return this;
    }
  };
}

// module.exports = createMatrix;
exports.default = createMatrix;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * scrollify
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/apathetic/scrollify
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Wes Hatch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/*eslint max-len: ["error", 120]*/
/*global document requestAnimationFrame console HTMLElement*/

// TODO add weakmap support for public / private methods

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Sticky from './sticky';
// import * as ease from './easings';
// import * as effectList from './effects';

/**
 * The Scrollify Class
 */

var Scrollify = function () {

  /**
   * @constructor
   * @param {HTMLElement|String} element: The element to Scrollify.
   */

  function Scrollify(element) {
    var _this = this;

    _classCallCheck(this, Scrollify);

    if (element instanceof HTMLElement == false) {
      element = document.querySelector(element);
    }
    // if (!element || !transform) { this.active = false; return false; }
    if (!_transform2.default) {
      throw 'Scrollify [error]: transforms not supported';
    }
    if (!element) {
      throw 'Scrollify [error]: could not find element';
    }

    this.element = element;
    this.ticking = false;
    this.scenes = [];
    this.scroll = window.scrollY;
    this.active = true;
    this.matrix = (0, _matrix2.default)();
    this.transforms = {
      scale: [1, 1],
      rotation: [0, 0, 0],
      position: [0, 0, 0]
      // transformOrigin: [],
      // skew: [],
      // rotationPost: [], //  ...remove?
      // scalePost: []     // ...remove?
    };

    window.addEventListener('scroll', function (e) {
      return _this.onScroll(e);
    });
    window.addEventListener('resize', function (e) {
      return _this.onResize(e);
    });
  }

  /**
   * Add a new Scene to the Scrollify object. Scene information includes when
   * to start applying an effect and for how long.
   * @param  {Object} opts: Various options to apply to the new Scene:
   *
   *   start: (required) When to start the effect. It is a 0 - 1 value
   *          representing the percentage of the viewport (eg. 0.5).
   *          Any effects in the Scene will begin when the trigger element
   *          crosses this threshold.
   *
   *   duration: The length of the effect, in pixels. Scrollify will
   *          interpolate that into value into a "progress" variable, bounded
   *          by 0 - 1. If not supplied, the default value is the height of the
   *          viewport + element height, meaning the effect will last for as
   *          long as the element is visible.
   *
   *   trigger: If supplied, Scrollify will use this element's position to
   *          start any Scene effects. If not supplied, the default is to use
   *          the element itself as a trigger.
   *
   *   easing: Ease in/out of an effect. Any value from Robert Penner's easing
   *          functions is valid.
   *
   * @return {void}
   */


  _createClass(Scrollify, [{
    key: 'addScene',
    value: function addScene(opts) {
      var _this2 = this;

      var triggerPos = opts.start || 0;
      var duration = opts.duration || window.innerHeight + this.element.offsetHeight;
      var easing = opts.easing || false;
      var effects = opts.effects || [];
      var trigger = document.querySelector(opts.trigger) || this.element;
      var applyTransform = opts.applyTransform !== undefined ? opts.applyTransform : true; // opt out rather than opt in
      var scene = {
        'active': true,
        'trigger': trigger,
        'triggerPos': 1 - triggerPos,
        'duration': duration,
        'easing': easing,
        'applyTransform': applyTransform,
        'effects': []
      };

      effects.map(function (effect) {
        _this2.addEffect(effect.name, effect.options, scene);
      });

      this.updateScene(scene);
      this.scenes.push(scene);

      return this;
    }

    /**
     * Update each scene.
     * @param  {Object} scene: The scene to update.
     * @return {void}
     */

  }, {
    key: 'updateScene',
    value: function updateScene(scene) {
      var trigger = scene.trigger;
      var BCR = trigger.getBoundingClientRect();
      var triggerPos = scene.triggerPos;
      var top = 0;

      do {
        top += trigger.offsetTop || 0;
        trigger = trigger.offsetParent;
      } while (trigger);
      // top = trigger.getBoundingClientRect().top + window.scrollY;

      scene.start = Math.max(0, top - triggerPos * window.innerHeight); // (can be negative...?)
      // scene.start = top - (triggerPos * window.innerHeight); // (can be negative)

      this.calculate(scene);
    }

    /**
     * Add a particular transformation to a scene.
     * @param  {Function} effect: The transformation function to apply.
     * @param  {Object} options: Any transformation options.
     * @param  {Object} scene: Object containing start and duration information.
     * @return {void}
     */

  }, {
    key: 'addEffect',
    value: function addEffect(effect) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var scene = arguments[2];

      var element = this.element;
      var transforms = this.transforms;

      if (!scene) {
        if (this.scenes.length) {
          // use the most recently added scene
          scene = this.scenes[this.scenes.length - 1];
        } else {
          // or if no scene (ie "addEffect" was called directly on Scrollify), set up a default one
          return this.addScene({
            'effects': [{ 'name': effect, 'options': options }]
          });
        }
      }

      var curry = function curry(fn, options) {
        return function () {
          // NOTE: don't use => function here as we do NOT want to bind "this"
          var context = {
            'options': options,
            'element': element,
            'transforms': transforms
          };

          fn.call(context, this); // eslint-disable-line
        };
      };

      // ??
      // if rotate {
      //   this.transforms.rotation = [0,0,0]
      // if translateX || translateY
      //   this.transforms.position = [0,0,0]
      // ???

      scene.effects.push(curry(effect, options));

      return this;
    }

    /**
     * onScroll Handler
     * @return {void}
     */

  }, {
    key: 'onScroll',
    value: function onScroll() {
      // if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update.bind(this));
      this.scroll = window.scrollY;
      // }
    }

    /**
     * onResize Handler
     * @return {void}
     */

  }, {
    key: 'onResize',
    value: function onResize() {
      var _this3 = this;

      this.scenes.forEach(function (scene) {
        return _this3.updateScene(scene);
      });
    }

    /**
     * Update the transformations for every scene.
     * @return {void}
     */

  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      this.scenes.forEach(function (scene) {
        return _this4.calculate(scene);
      });
      this.ticking = false;
    }

    /**
     * Calculate the transformations for each scene.
     * @param  {Object} scene: An Object containing start and duration
     *                         information as well as an Array of
     *                         transformations to apply.
     * @return {void}
     */

  }, {
    key: 'calculate',
    value: function calculate(scene) {
      var start = scene.start;
      var duration = scene.duration;
      var scroll = this.scroll;
      var progress = void 0;
      var matrix = void 0;

      // -------------------------
      if (scroll - start > duration) {
        if (scene.active) {
          // do one final iteration
          scene.active = false;
          progress = 1;
        } else {
          return;
        }
      } else if (scroll - start < 0) {
        if (scene.active) {
          // do one final iteration
          scene.active = false;
          progress = 0;
        } else {
          return;
        }
      } else {
        scene.active = true;

        // -------------------------
        if (scene.easing) {
          //            start, from, to, end
          progress = scene.easing(scroll - start, 0, 1, duration);
        } else {
          progress = (scroll - start) / duration;
        }
        // -------------------------
      }
      // -------------------------

      // *** NOTE: with quick scrolling, effects may not start or end cleanly
      // if (scroll - start > duration || scroll - start < 0) { return; }

      // *** NOTE: with easing, this wont work
      // scene.active = progress > 0 && progress < 1;
      // if (progress <= 0 || progress >= 1) {
      //   return;
      // }

      // *** NOTE: with fixed-positioning, this won't work:
      // Determine if we should run calcuations for this Scene.
      // Use *actual* position data as an element may be onscreen while its reference (trigger)
      // element is not. Progress may be negative or > 1.0 in some instances.
      // if (this.element.getBoundingClientRect().top > window.innerHeight ||
      //    this.element.getBoundingClientRect().bottom < 0
      // ) {
      //   return;
      // }

      // *** NOTE: helpful, but may leave parallax'd elements suddenly stopped while still in viewport
      // progress = Math.min(1.0, Math.max(0, progress));

      // cycle through any registered transformations
      scene.effects.forEach(function (effect) {
        effect.call(progress);
      });

      if (scene.applyTransform) {
        // transmogrify all applied transformations into a single matrix, and apply
        matrix = this.updateMatrix();
        this.element.style[_transform2.default] = matrix.asCSS();
      }
    }

    /**
     * Loop through all the element's transformation data and calculates a matrix representing it.
     * @return {Matrix} Ye olde Matrix
     */

  }, {
    key: 'updateMatrix',
    value: function updateMatrix() {
      var t = this.transforms;
      var m = this.matrix;

      m.clear();

      // here we adjust the transformOrigin ...
      if (t.transformOrigin) {
        m.translate(-t.transformOrigin[0], -t.transformOrigin[1], -t.transformOrigin[2]);
      }

      if (t.scale) {
        m.scale(t.scale[0], t.scale[1]);
      }

      if (t.skew) {
        m.skew(t.skew[0], t.skew[1]);
      }

      if (t.rotation) {
        m.rotateX(t.rotation[0]);
        m.rotateY(t.rotation[1]);
        m.rotateZ(t.rotation[2]);
      }

      if (t.position) {
        m.translate(t.position[0], t.position[1], t.position[2]);
      }

      // -----------------------------------------------------
      // IF we wished to perform rotation AFTER skew / position / etc, we could do it here.
      // The ordering is important, and has an effect.

      // if (t.rotationPost) {
      //   m.rotateX(t.rotationPost[0]);
      //   m.rotateY(t.rotationPost[1]);
      //   m.rotateZ(t.rotationPost[2]);
      // }

      // if (t.scalePost) {
      //   m.scale(t.scalePost[0], t.scalePost[1]);
      // }
      // -----------------------------------------------------

      // ... and here we put it back. (This duplication is not a mistake).
      if (t.transformOrigin) {
        m.translate(t.transformOrigin[0], t.transformOrigin[1], t.transformOrigin[2]);
      }

      return m;
    }

    /**
     * Disable Scrollify-ing. Perhaps for performance reasons / mobile devices.
     * @return {void}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.active = false;
    }

    // stick() {
    // 	let d = scene.duration || 0;
    // 	let h = this.element.getBoundingClientRect().height;

    // 	this.element._stickyTop = triggerPos * window.innerHeight;
    // 	this.element.parentNode.style.paddingBottom = d + h + 'px';
    // }

  }]);

  return Scrollify;
}();

exports.default = Scrollify;

},{"./matrix":3,"./transform":7}],5:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _effects = require('./effects');

var fx = _interopRequireWildcard(_effects);

var _easings = require('./easings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Put Scrollify into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */

_scrollify2.default.fx = fx;
// scrollify.easings = {};

window.Scrollify = _scrollify2.default;
// window.Sticky = Sticky;

},{"./easings":1,"./effects":2,"./scrollify.js":4,"./sticky":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Sticky
 * https://github.com/apathetic/scrollify/
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} element: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */

var Sticky = function () {
  function Sticky(element) {
    var _this = this;

    var bounded = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, Sticky);

    this.element = element instanceof HTMLElement ? element : document.querySelector(element);
    if (!this.element) {
      return false;
    }

    this.bounded = !!bounded;
    this.parent = this.element.parentNode;
    this.currentState = '_';
    this.stateSwitcher;
    this.determine = 'normal';

    // determine initial state
    if (this.element.getBoundingClientRect().top < 1) {
      this.setState('sticky');
      this.stateSwitcher();
    } else {
      this.setState('normal');
    }

    // window.addEventListener('scroll', this.stateSwitcher);    // stateSwitcher changes, so cannot pass (ie. bind directly) like this
    window.addEventListener('scroll', function () {
      _this.stateSwitcher();
    });
    window.addEventListener('resize', function () {
      _this.stateSwitcher();
    });
  }

  _createClass(Sticky, [{
    key: 'normal',
    value: function normal() {
      var elementPosition = this.element.getBoundingClientRect();
      if (elementPosition.top < 1) {
        return this.setState('sticky');
      }
    }
  }, {
    key: 'sticky',
    value: function sticky() {
      var parentPosition = this.parent.getBoundingClientRect();
      if (parentPosition.top > 1) {
        return this.setState('normal');
      }
      if (this.bounded) {
        var elementPosition = this.element.getBoundingClientRect();
        if (parentPosition.bottom < elementPosition.bottom) {
          return this.setState('bottom');
        }
      }
    }
  }, {
    key: 'bottom',
    value: function bottom() {
      var elementPosition = this.element.getBoundingClientRect();
      if (elementPosition.top > 1) {
        return this.setState('sticky');
      }
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      if (this.currentState === state) {
        return;
      }
      this.element.classList.remove(this.currentState);
      this.element.classList.add(state);
      this.currentState = state;
      this.stateSwitcher = this[state]; // stateSwitcher will point at an internal fn
    }
  }]);

  return Sticky;
}();

exports.default = Sticky;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

var transform = false;
var transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

for (var i in transforms) {
  if (document.body.style[transforms[i]] !== undefined) {
    transform = transforms[i];
    break;
  }
}

exports.default = transform;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL21hdHJpeC5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy9zdGlja3kuanMiLCJzcmMvdHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7UUNFZ0I7UUFJQTtRQUlBO1FBS0E7UUFJQTtRQUlBO1FBS0E7UUFJQTtRQUlBO1FBS0E7UUFJQTtRQUlBO1FBS0E7UUFJQTtRQUlBO1FBSUE7UUFJQTtRQUlBO1FBT0E7UUFJQTtRQUlBO1FBS0E7UUFnQkE7UUFnQkE7UUFpQkE7UUFLQTtRQUtBO1FBTUE7OztBQTdKVCxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0M7QUFDckMsU0FBTyxLQUFLLEtBQUssQ0FBTCxDQUFMLEdBQWUsQ0FBZixHQUFtQixDQUFuQixDQUQ4QjtDQUFoQzs7QUFJQSxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUM7QUFDdEMsU0FBTyxDQUFDLENBQUQsSUFBTSxLQUFLLENBQUwsQ0FBTixJQUFpQixJQUFJLENBQUosQ0FBakIsR0FBMEIsQ0FBMUIsQ0FEK0I7Q0FBakM7O0FBSUEsU0FBUyxhQUFULENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DO0FBQ3hDLE1BQUksQ0FBQyxLQUFPLElBQUksQ0FBSixDQUFSLEdBQWlCLENBQWpCLEVBQW9CO0FBQUUsV0FBTyxJQUFJLENBQUosR0FBUSxDQUFSLEdBQVksQ0FBWixHQUFnQixDQUFoQixDQUFUO0dBQXhCO0FBQ0EsU0FBTyxDQUFDLENBQUQsR0FBSyxDQUFMLElBQVUsRUFBRSxDQUFGLElBQU8sSUFBSSxDQUFK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QWQsRUFBMEI7QUFDeEIsTUFBSSxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUNwRCxnQkFBWSxXQUFXLENBQVgsQ0FBWixDQURvRDtBQUVwRCxVQUZvRDtHQUF0RDtDQURGOztrQkFPZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAxMjBdKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0ICAvPSAgZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSAwID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICh0ID09IGQpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dENpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gLShhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPT0gMikgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogKC4zICogMS41KTsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgaWYgKHQgPCAxKSB7IHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiOyB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gIGlmICh0IC89IGQgPCAxIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgLjc1KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogT3B0aW9ucyBhcmUgYXBwbGllZCBhdCBpbml0aWFsaXplIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKlxuICogTk9URTogZm9yIGFsbCBmdW5jdGlvbnMgaGVyZWluLCBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucywgYVxuICogdHJhbnNmb3JtYXRpb24gT2JqZWN0LCBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuXG4vKmdsb2JhbCBjb25zb2xlKi9cbi8qZXNsaW50IG5vLWludmFsaWQtdGhpczogXCJlcnJvclwiKi9cblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5cblxuLyoqXG4gKiBUcmFuc2xhdGUgYW4gZWxlbWVudCBhbG9uZyB0aGUgWC1heGlzLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChwcm9ncmVzcykge1xuICBsZXQgdG8gPSB0aGlzLm9wdGlvbnMudG8gfHwgMDtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSB8fCAwO1xuICBsZXQgb2Zmc2V0ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzBdID0gb2Zmc2V0O1xuICAvLyB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0ICsgdW5pdCArICcsIDAsIDApJztcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGUgYW4gZWxlbWVudCB2ZXJ0aWNhbGx5LlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWShwcm9ncmVzcykge1xuICAvLyBsZXQgZGVsYXkgPSB0aGlzLm9wdGlvbnMuZGVsYXkgfHwgMDtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDA7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgMDsgLy8gdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdO1xuICAvLyBsZXQgdW5pdCA9IHRoaXMub3B0aW9ucy51bml0IHx8ICdweCc7XG4gIGxldCBvZmZzZXQgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICAvLyBvZmZzZXQgLT0gZGVsYXk7XG5cbiAgLy8gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoMCwgJyArIG9mZnNldCArIHVuaXQgKyAnLCAwKSc7XG4gIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXSA9IG9mZnNldDtcbn1cblxuLyoqXG4gKiBSb3RhdGUgYW4gZWxlbWVudCwgdXNpbmcgcmFkaWFucy4gKG5vdGU6IHJvdGF0ZXMgYXJvdW5kIFotYXhpcykuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHJhZGlhbnMgPSB0aGlzLm9wdGlvbnMucmFkICogcHJvZ3Jlc3M7XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnJvdGF0aW9uWzJdID0gcmFkaWFucztcbn07XG5cbi8qKlxuICogVW5pZm9ybWx5IHNjYWxlIGFuIGVsZW1lbnQgYWxvbmcgYm90aCBheGlzJy5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAxO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IHRoaXMudHJhbnNmb3Jtcy5zY2FsZVswXTtcbiAgbGV0IHNjYWxlID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzBdID0gc2NhbGU7XG4gIHRoaXMudHJhbnNmb3Jtcy5zY2FsZVsxXSA9IHNjYWxlO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYW4gZWxlbWVudCdzIG9wYWNpdHkuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWRlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLnRvIDogMTtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLmZyb20gOiAxO1xuICBsZXQgb3BhY2l0eSA9ICh0byAtIGZyb20pICogcHJvZ3Jlc3MgKyBmcm9tO1xuXG4gIHRoaXMuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eTtcbn07XG5cbi8qKlxuICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucyBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGF4KHByb2dyZXNzKSB7XG4gIGxldCBvZmZzZXQgPSAwO1xuICBsZXQgcmFuZ2UgPSB0aGlzLm9wdGlvbnMucmFuZ2UgfHwgMDtcblxuICBvZmZzZXQgPSBwcm9ncmVzcyAqIHJhbmdlO1xuICAvLyB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICdweCknO1xuICB0aGlzLnRyYW5zZm9ybXMucG9zaXRpb25bMV0gPSBvZmZzZXQ7ICAgLy8ganVzdCB2ZXJ0aWNhbCBmb3Igbm93XG59XG5cbi8qKlxuICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHByb2dyZXNzKSB7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgbGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XG5cbiAgdGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG4gICAgbGV0IGNzcyA9IG9wdHNbdGltZV07XG5cbiAgICBpZiAocHJvZ3Jlc3MgPiB0aW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBlbGVtZW50IHdoaWNoIHRvZ2dsZXMgcG9zaXRpb24gJ2ZpeGVkJyBvbiAvIG9mZi5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0aWNrKHByb2dyZXNzKSB7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgY3VycmVudFN0YXRlID0gJ18nO1xuXG4gIHByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIHByb2dyZXNzKSk7XG5cbiAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnbm9ybWFsJyk7XG4gIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZShlbGVtZW50LCBzdGF0ZSkge1xuICAgIGxldCBCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN0YXRlID09ICdzdGlja3knKSB7XG4gICAgICBhcHBseVN0eWxlcyhCQ1IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBseVN0eWxlcyhCQ1IsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgIC8vIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50U3RhdGUpOyAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbm90IHdvcmtpbmc/XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcblxuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlTdHlsZXMoc3R5bGVzLCBhZGQgPSB0cnVlKSB7XG4gICAgLy8gZm9yIChsZXQgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICAvLyAgIGlmIChwcm9wID09ICdib3R0b20nIHx8IHByb3AgPT0gJ3JpZ2h0JykgeyBjb250aW51ZTsgfVxuICAgIC8vICAgdGhpcy5zdHlsZVtwcm9wXSA9IChhZGQpID8gc3R5bGVzW3Byb3BdICsgJ3B4JyA6ICcnO1xuICAgIC8vIH1cbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9ICAgYWRkID8gc3R5bGVzLnRvcCArICdweCcgOiAnJztcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAgYWRkID8gc3R5bGVzLmxlZnQgKyAncHgnIDogJyc7XG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGFkZCA/IHN0eWxlcy53aWR0aCArICdweCcgOiAnJztcbiAgICAvLyB0aGlzLnN0eWxlLmhlaWdodFxuICAgIC8vIHRoaXMuc3R5bGUucG9zaXRpb24gPSAoYWRkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnOyAgICAgICAgICAgICAvLyBPUiwgZGVhbCB3aXRoIHRoaXMgdmlhIENTUy4uLj9cblxuICB9XG5cbiAgLy8gYm91bmRzUGFyYW1zID0gW1widG9wXCIsIFwibGVmdFwiLCBcImJvdHRvbVwiLCBcInJpZ2h0XCIsIFwibWFyZ2luXCIsIFwibWFyZ2luTGVmdFwiLCBcIm1hcmdpblJpZ2h0XCIsIFwibWFyZ2luVG9wXCIsIFwibWFyZ2luQm90dG9tXCJdO1xufVxuIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgRGFuaWVsIEx1bmRpblxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgcmVzKSB7XG4gIC8vIFVucm9sbGVkIGxvb3BcbiAgcmVzWzBdID0gYVswXSAqIGJbMF0gKyBhWzFdICogYls0XSArIGFbMl0gKiBiWzhdICsgYVszXSAqIGJbMTJdO1xuICByZXNbMV0gPSBhWzBdICogYlsxXSArIGFbMV0gKiBiWzVdICsgYVsyXSAqIGJbOV0gKyBhWzNdICogYlsxM107XG4gIHJlc1syXSA9IGFbMF0gKiBiWzJdICsgYVsxXSAqIGJbNl0gKyBhWzJdICogYlsxMF0gKyBhWzNdICogYlsxNF07XG4gIHJlc1szXSA9IGFbMF0gKiBiWzNdICsgYVsxXSAqIGJbN10gKyBhWzJdICogYlsxMV0gKyBhWzNdICogYlsxNV07XG5cbiAgcmVzWzRdID0gYVs0XSAqIGJbMF0gKyBhWzVdICogYls0XSArIGFbNl0gKiBiWzhdICsgYVs3XSAqIGJbMTJdO1xuICByZXNbNV0gPSBhWzRdICogYlsxXSArIGFbNV0gKiBiWzVdICsgYVs2XSAqIGJbOV0gKyBhWzddICogYlsxM107XG4gIHJlc1s2XSA9IGFbNF0gKiBiWzJdICsgYVs1XSAqIGJbNl0gKyBhWzZdICogYlsxMF0gKyBhWzddICogYlsxNF07XG4gIHJlc1s3XSA9IGFbNF0gKiBiWzNdICsgYVs1XSAqIGJbN10gKyBhWzZdICogYlsxMV0gKyBhWzddICogYlsxNV07XG5cbiAgcmVzWzhdID0gYVs4XSAqIGJbMF0gKyBhWzldICogYls0XSArIGFbMTBdICogYls4XSArIGFbMTFdICogYlsxMl07XG4gIHJlc1s5XSA9IGFbOF0gKiBiWzFdICsgYVs5XSAqIGJbNV0gKyBhWzEwXSAqIGJbOV0gKyBhWzExXSAqIGJbMTNdO1xuICByZXNbMTBdID0gYVs4XSAqIGJbMl0gKyBhWzldICogYls2XSArIGFbMTBdICogYlsxMF0gKyBhWzExXSAqIGJbMTRdO1xuICByZXNbMTFdID0gYVs4XSAqIGJbM10gKyBhWzldICogYls3XSArIGFbMTBdICogYlsxMV0gKyBhWzExXSAqIGJbMTVdO1xuXG4gIHJlc1sxMl0gPSBhWzEyXSAqIGJbMF0gKyBhWzEzXSAqIGJbNF0gKyBhWzE0XSAqIGJbOF0gKyBhWzE1XSAqIGJbMTJdO1xuICByZXNbMTNdID0gYVsxMl0gKiBiWzFdICsgYVsxM10gKiBiWzVdICsgYVsxNF0gKiBiWzldICsgYVsxNV0gKiBiWzEzXTtcbiAgcmVzWzE0XSA9IGFbMTJdICogYlsyXSArIGFbMTNdICogYls2XSArIGFbMTRdICogYlsxMF0gKyBhWzE1XSAqIGJbMTRdO1xuICByZXNbMTVdID0gYVsxMl0gKiBiWzNdICsgYVsxM10gKiBiWzddICsgYVsxNF0gKiBiWzExXSArIGFbMTVdICogYlsxNV07XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gYXNzaWduVHJhbnNsYXRlKG1hdHJpeCwgeCwgeSwgeikge1xuICBtYXRyaXhbMF0gPSAxO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSB4O1xuICBtYXRyaXhbMTNdID0geTtcbiAgbWF0cml4WzE0XSA9IHo7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Sb3RhdGVYKG1hdHJpeCwgcmFkKSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFs2XSA9IC1NYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbMTBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5cbnZhciBhc3NpZ25Sb3RhdGVZID0gZnVuY3Rpb24obWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gTWF0aC5zaW4ocmFkKTtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gMTtcbiAgbWF0cml4WzZdID0gMDtcbiAgbWF0cml4WzddID0gMDtcbiAgbWF0cml4WzhdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59O1xuXG5mdW5jdGlvbiBhc3NpZ25Sb3RhdGVaKG1hdHJpeCwgcmFkKSB7XG4gIG1hdHJpeFswXSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFsxXSA9IC1NYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbNV0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Ta2V3KG1hdHJpeCwgYXgsIGF5KSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IE1hdGgudGFuKGF4KTtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gTWF0aC50YW4oYXkpO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5cbmZ1bmN0aW9uIGFzc2lnblNjYWxlKG1hdHJpeCwgeCwgeSkge1xuICBtYXRyaXhbMF0gPSB4O1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSB5O1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25JZGVudGl0eShtYXRyaXgpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gMTtcbiAgbWF0cml4WzZdID0gMDtcbiAgbWF0cml4WzddID0gMDtcbiAgbWF0cml4WzhdID0gMDtcbiAgbWF0cml4WzldID0gMDtcbiAgbWF0cml4WzEwXSA9IDE7XG4gIG1hdHJpeFsxMV0gPSAwO1xuICBtYXRyaXhbMTJdID0gMDtcbiAgbWF0cml4WzEzXSA9IDA7XG4gIG1hdHJpeFsxNF0gPSAwO1xuICBtYXRyaXhbMTVdID0gMTtcbn1cblxuZnVuY3Rpb24gY29weUFycmF5KGEsIGIpIHtcbiAgYlswXSA9IGFbMF07XG4gIGJbMV0gPSBhWzFdO1xuICBiWzJdID0gYVsyXTtcbiAgYlszXSA9IGFbM107XG4gIGJbNF0gPSBhWzRdO1xuICBiWzVdID0gYVs1XTtcbiAgYls2XSA9IGFbNl07XG4gIGJbN10gPSBhWzddO1xuICBiWzhdID0gYVs4XTtcbiAgYls5XSA9IGFbOV07XG4gIGJbMTBdID0gYVsxMF07XG4gIGJbMTFdID0gYVsxMV07XG4gIGJbMTJdID0gYVsxMl07XG4gIGJbMTNdID0gYVsxM107XG4gIGJbMTRdID0gYVsxNF07XG4gIGJbMTVdID0gYVsxNV07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hdHJpeCgpIHtcbiAgICB2YXIgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIHZhciBhID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIGIgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICBhc3NpZ25JZGVudGl0eShkYXRhKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBkYXRhLFxuXG4gICAgICBhc0NTUzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjc3MgPSAnbWF0cml4M2QoJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgKytpKSB7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGFbaV0pIDwgMC4wMDAxKSB7XG4gICAgICAgICAgICBjc3MgKz0gJzAsJztcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICBjc3MgKz0gZGF0YVtpXS50b0ZpeGVkKDEwKSArICcsJztcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkYXRhWzE1XSkgPCAwLjAwMDEpIHtcbiAgICAgICAgICBjc3MgKz0gJzApJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjc3MgKz0gZGF0YVsxNV0udG9GaXhlZCgxMCkgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNzcztcbiAgICAgIH0sXG5cbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzaWduSWRlbnRpdHkoZGF0YSk7XG4gICAgICB9LFxuXG4gICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIGEpO1xuICAgICAgICBhc3NpZ25UcmFuc2xhdGUoYiwgeCwgeSwgeik7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWDogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVgoYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWTogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVkoYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWjogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVooYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgc2NhbGU6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIGEpO1xuICAgICAgICBhc3NpZ25TY2FsZShiLCB4LCB5KTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgc2tldzogZnVuY3Rpb24oYXgsIGF5KSB7XG4gICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICBhc3NpZ25Ta2V3KGIsIGF4LCBheSk7XG4gICAgICBhc3NpZ25lZE1hdHJpeE11bHRpcGxpY2F0aW9uKGEsIGIsIGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xufVxuXG5cbi8vIG1vZHVsZS5leHBvcnRzID0gY3JlYXRlTWF0cml4O1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWF0cml4O1xuIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cbi8qZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDEyMF0qL1xuLypnbG9iYWwgZG9jdW1lbnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGNvbnNvbGUgSFRNTEVsZW1lbnQqL1xuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCBjcmVhdGVNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG4vLyBpbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5Jztcbi8vIGltcG9ydCAqIGFzIGVhc2UgZnJvbSAnLi9lYXNpbmdzJztcbi8vIGltcG9ydCAqIGFzIGVmZmVjdExpc3QgZnJvbSAnLi9lZmZlY3RzJztcblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gZWxlbWVudDogVGhlIGVsZW1lbnQgdG8gU2Nyb2xsaWZ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cbiAgICAvLyBpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSkgeyB0aGlzLmFjdGl2ZSA9IGZhbHNlOyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoIXRyYW5zZm9ybSkgeyB0aHJvdyAnU2Nyb2xsaWZ5IFtlcnJvcl06IHRyYW5zZm9ybXMgbm90IHN1cHBvcnRlZCc7IH1cbiAgICBpZiAoIWVsZW1lbnQpIHsgdGhyb3cgJ1Njcm9sbGlmeSBbZXJyb3JdOiBjb3VsZCBub3QgZmluZCBlbGVtZW50JzsgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNjZW5lcyA9IFtdO1xuICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubWF0cml4ID0gY3JlYXRlTWF0cml4KCk7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0ge1xuICAgICAgc2NhbGU6IFsxLDFdLFxuICAgICAgcm90YXRpb246IFswLDAsMF0sXG4gICAgICBwb3NpdGlvbjogWzAsMCwwXVxuICAgICAgLy8gdHJhbnNmb3JtT3JpZ2luOiBbXSxcbiAgICAgIC8vIHNrZXc6IFtdLFxuICAgICAgLy8gcm90YXRpb25Qb3N0OiBbXSwgLy8gIC4uLnJlbW92ZT9cbiAgICAgIC8vIHNjYWxlUG9zdDogW10gICAgIC8vIC4uLnJlbW92ZT9cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBTY2VuZSB0byB0aGUgU2Nyb2xsaWZ5IG9iamVjdC4gU2NlbmUgaW5mb3JtYXRpb24gaW5jbHVkZXMgd2hlblxuICAgKiB0byBzdGFydCBhcHBseWluZyBhbiBlZmZlY3QgYW5kIGZvciBob3cgbG9uZy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRzOiBWYXJpb3VzIG9wdGlvbnMgdG8gYXBwbHkgdG8gdGhlIG5ldyBTY2VuZTpcbiAgICpcbiAgICogICBzdGFydDogKHJlcXVpcmVkKSBXaGVuIHRvIHN0YXJ0IHRoZSBlZmZlY3QuIEl0IGlzIGEgMCAtIDEgdmFsdWVcbiAgICogICAgICAgICAgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCAoZWcuIDAuNSkuXG4gICAqICAgICAgICAgIEFueSBlZmZlY3RzIGluIHRoZSBTY2VuZSB3aWxsIGJlZ2luIHdoZW4gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKiAgICAgICAgICBjcm9zc2VzIHRoaXMgdGhyZXNob2xkLlxuICAgKlxuICAgKiAgIGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSBlZmZlY3QsIGluIHBpeGVscy4gU2Nyb2xsaWZ5IHdpbGxcbiAgICogICAgICAgICAgaW50ZXJwb2xhdGUgdGhhdCBpbnRvIHZhbHVlIGludG8gYSBcInByb2dyZXNzXCIgdmFyaWFibGUsIGJvdW5kZWRcbiAgICogICAgICAgICAgYnkgMCAtIDEuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgdGhlIGhlaWdodCBvZiB0aGVcbiAgICogICAgICAgICAgdmlld3BvcnQgKyBlbGVtZW50IGhlaWdodCwgbWVhbmluZyB0aGUgZWZmZWN0IHdpbGwgbGFzdCBmb3IgYXNcbiAgICogICAgICAgICAgbG9uZyBhcyB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLlxuICAgKlxuICAgKiAgIHRyaWdnZXI6IElmIHN1cHBsaWVkLCBTY3JvbGxpZnkgd2lsbCB1c2UgdGhpcyBlbGVtZW50J3MgcG9zaXRpb24gdG9cbiAgICogICAgICAgICAgc3RhcnQgYW55IFNjZW5lIGVmZmVjdHMuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlXG4gICAqICAgICAgICAgIHRoZSBlbGVtZW50IGl0c2VsZiBhcyBhIHRyaWdnZXIuXG4gICAqXG4gICAqICAgZWFzaW5nOiBFYXNlIGluL291dCBvZiBhbiBlZmZlY3QuIEFueSB2YWx1ZSBmcm9tIFJvYmVydCBQZW5uZXIncyBlYXNpbmdcbiAgICogICAgICAgICAgZnVuY3Rpb25zIGlzIHZhbGlkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgYWRkU2NlbmUob3B0cykge1xuICAgIGxldCB0cmlnZ2VyUG9zID0gb3B0cy5zdGFydCB8fCAwO1xuICAgIGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgd2luZG93LmlubmVySGVpZ2h0ICsgdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBsZXQgZWFzaW5nID0gb3B0cy5lYXNpbmcgfHwgZmFsc2U7XG4gICAgbGV0IGVmZmVjdHMgPSBvcHRzLmVmZmVjdHMgfHwgW107XG4gICAgbGV0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMudHJpZ2dlcikgfHwgdGhpcy5lbGVtZW50O1xuICAgIGxldCBhcHBseVRyYW5zZm9ybSA9IG9wdHMuYXBwbHlUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCA/IG9wdHMuYXBwbHlUcmFuc2Zvcm0gOiB0cnVlOyAgIC8vIG9wdCBvdXQgcmF0aGVyIHRoYW4gb3B0IGluXG4gICAgbGV0IHNjZW5lID0ge1xuICAgICAgJ2FjdGl2ZSc6IHRydWUsXG4gICAgICAndHJpZ2dlcic6IHRyaWdnZXIsXG4gICAgICAndHJpZ2dlclBvcyc6IDEgLSB0cmlnZ2VyUG9zLFxuICAgICAgJ2R1cmF0aW9uJzogZHVyYXRpb24sXG4gICAgICAnZWFzaW5nJzogZWFzaW5nLFxuICAgICAgJ2FwcGx5VHJhbnNmb3JtJzogYXBwbHlUcmFuc2Zvcm0sXG4gICAgICAnZWZmZWN0cyc6IFtdXG4gICAgfTtcblxuICAgIGVmZmVjdHMubWFwKChlZmZlY3QpID0+IHtcbiAgICAgIHRoaXMuYWRkRWZmZWN0KGVmZmVjdC5uYW1lLCBlZmZlY3Qub3B0aW9ucywgc2NlbmUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG4gICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZWFjaCBzY2VuZS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG4gICAgbGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuICAgIGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB0cmlnZ2VyUG9zID0gc2NlbmUudHJpZ2dlclBvcztcbiAgICBsZXQgdG9wID0gMDtcblxuICAgIGRvIHtcbiAgICAgIHRvcCArPSB0cmlnZ2VyLm9mZnNldFRvcCB8fCAwO1xuICAgICAgdHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuICAgIH0gd2hpbGUodHJpZ2dlcik7XG4gICAgLy8gdG9wID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIHNjZW5lLnN0YXJ0ID0gTWF0aC5tYXgoMCwgdG9wIC0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUuLi4/KVxuXHRcdC8vIHNjZW5lLnN0YXJ0ID0gdG9wIC0gKHRyaWdnZXJQb3MgKiB3aW5kb3cuaW5uZXJIZWlnaHQpOyAvLyAoY2FuIGJlIG5lZ2F0aXZlKVxuXG4gICAgdGhpcy5jYWxjdWxhdGUoc2NlbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBhcnRpY3VsYXIgdHJhbnNmb3JtYXRpb24gdG8gYSBzY2VuZS5cbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGVmZmVjdDogVGhlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnM6IEFueSB0cmFuc2Zvcm1hdGlvbiBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRFZmZlY3QoZWZmZWN0LCBvcHRpb25zID0ge30sIHNjZW5lKSB7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgbGV0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXM7XG5cbiAgICBpZiAoIXNjZW5lKSB7XG4gICAgICBpZiAodGhpcy5zY2VuZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHVzZSB0aGUgbW9zdCByZWNlbnRseSBhZGRlZCBzY2VuZVxuICAgICAgICBzY2VuZSA9IHRoaXMuc2NlbmVzW3RoaXMuc2NlbmVzLmxlbmd0aCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IgaWYgbm8gc2NlbmUgKGllIFwiYWRkRWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IG9uZVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRTY2VuZSh7XG4gICAgICAgICAgJ2VmZmVjdHMnOiBbeyduYW1lJzogZWZmZWN0LCAnb3B0aW9ucyc6IG9wdGlvbnN9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAnb3B0aW9ucyc6IG9wdGlvbnMsXG4gICAgICAgICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICAgICAgICd0cmFuc2Zvcm1zJzogdHJhbnNmb3Jtc1xuICAgICAgICB9O1xuXG4gICAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vID8/XG4gICAgLy8gaWYgcm90YXRlIHtcbiAgICAvLyAgIHRoaXMudHJhbnNmb3Jtcy5yb3RhdGlvbiA9IFswLDAsMF1cbiAgICAvLyBpZiB0cmFuc2xhdGVYIHx8IHRyYW5zbGF0ZVlcbiAgICAvLyAgIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvbiA9IFswLDAsMF1cbiAgICAvLyA/Pz9cblxuICAgIHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uU2Nyb2xsKCkge1xuICAgIC8vIGlmICghdGhpcy50aWNraW5nKSB7XG4gICAgdGhpcy50aWNraW5nID0gdHJ1ZTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gYXMgd2VsbCBhcyBhbiBBcnJheSBvZlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbnMgdG8gYXBwbHkuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjYWxjdWxhdGUoc2NlbmUpIHtcbiAgICBsZXQgc3RhcnQgPSBzY2VuZS5zdGFydDtcbiAgICBsZXQgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbjtcbiAgICBsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGxldCBtYXRyaXg7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaWYgKHNjcm9sbCAtIHN0YXJ0ID4gZHVyYXRpb24pIHtcbiAgICAgIGlmIChzY2VuZS5hY3RpdmUpIHsgICAgLy8gZG8gb25lIGZpbmFsIGl0ZXJhdGlvblxuICAgICAgICBzY2VuZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcHJvZ3Jlc3MgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2Nyb2xsIC0gc3RhcnQgPCAwKSB7XG4gICAgICBpZiAoc2NlbmUuYWN0aXZlKSB7ICAgIC8vIGRvIG9uZSBmaW5hbCBpdGVyYXRpb25cbiAgICAgICAgc2NlbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2NlbmUuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBpZiAoc2NlbmUuZWFzaW5nKSB7IC8vICAgICAgICAgICAgc3RhcnQsIGZyb20sIHRvLCBlbmRcbiAgICAgICAgcHJvZ3Jlc3MgPSBzY2VuZS5lYXNpbmcoc2Nyb2xsIC0gc3RhcnQsIDAsIDEsIGR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgfVxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB9XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBxdWljayBzY3JvbGxpbmcsIGVmZmVjdHMgbWF5IG5vdCBzdGFydCBvciBlbmQgY2xlYW5seVxuICAgIC8vIGlmIChzY3JvbGwgLSBzdGFydCA+IGR1cmF0aW9uIHx8IHNjcm9sbCAtIHN0YXJ0IDwgMCkgeyByZXR1cm47IH1cblxuICAgIC8vICoqKiBOT1RFOiB3aXRoIGVhc2luZywgdGhpcyB3b250IHdvcmtcbiAgICAvLyBzY2VuZS5hY3RpdmUgPSBwcm9ncmVzcyA+IDAgJiYgcHJvZ3Jlc3MgPCAxO1xuICAgIC8vIGlmIChwcm9ncmVzcyA8PSAwIHx8IHByb2dyZXNzID49IDEpIHtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBmaXhlZC1wb3NpdGlvbmluZywgdGhpcyB3b24ndCB3b3JrOlxuICAgIC8vIERldGVybWluZSBpZiB3ZSBzaG91bGQgcnVuIGNhbGN1YXRpb25zIGZvciB0aGlzIFNjZW5lLlxuICAgIC8vIFVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhIGFzIGFuIGVsZW1lbnQgbWF5IGJlIG9uc2NyZWVuIHdoaWxlIGl0cyByZWZlcmVuY2UgKHRyaWdnZXIpXG4gICAgLy8gZWxlbWVudCBpcyBub3QuIFByb2dyZXNzIG1heSBiZSBuZWdhdGl2ZSBvciA+IDEuMCBpbiBzb21lIGluc3RhbmNlcy5cbiAgICAvLyBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCB8fFxuICAgIC8vICAgIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuXG4gICAgLy8gKioqIE5PVEU6IGhlbHBmdWwsIGJ1dCBtYXkgbGVhdmUgcGFyYWxsYXgnZCBlbGVtZW50cyBzdWRkZW5seSBzdG9wcGVkIHdoaWxlIHN0aWxsIGluIHZpZXdwb3J0XG4gICAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAsIHByb2dyZXNzKSk7XG5cblxuICAgIC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG4gICAgc2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5jYWxsKHByb2dyZXNzKTtcbiAgICB9KTtcblxuICAgIGlmIChzY2VuZS5hcHBseVRyYW5zZm9ybSkge1xuICAgICAgLy8gdHJhbnNtb2dyaWZ5IGFsbCBhcHBsaWVkIHRyYW5zZm9ybWF0aW9ucyBpbnRvIGEgc2luZ2xlIG1hdHJpeCwgYW5kIGFwcGx5XG4gICAgICBtYXRyaXggPSB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSBtYXRyaXguYXNDU1MoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudCdzIHRyYW5zZm9ybWF0aW9uIGRhdGEgYW5kIGNhbGN1bGF0ZXMgYSBtYXRyaXggcmVwcmVzZW50aW5nIGl0LlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9IFllIG9sZGUgTWF0cml4XG4gICAqL1xuICB1cGRhdGVNYXRyaXgoKSB7XG4gICAgbGV0IHQgPSB0aGlzLnRyYW5zZm9ybXM7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeDtcblxuICAgIG0uY2xlYXIoKTtcblxuICAgIC8vIGhlcmUgd2UgYWRqdXN0IHRoZSB0cmFuc2Zvcm1PcmlnaW4gLi4uXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSgtdC50cmFuc2Zvcm1PcmlnaW5bMF0sIC10LnRyYW5zZm9ybU9yaWdpblsxXSwgLXQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICBpZiAodC5zY2FsZSkge1xuICAgICAgbS5zY2FsZSh0LnNjYWxlWzBdLCB0LnNjYWxlWzFdKTtcbiAgICB9XG5cbiAgICBpZiAodC5za2V3KSB7XG4gICAgICBtLnNrZXcodC5za2V3WzBdLCB0LnNrZXdbMV0pO1xuICAgIH1cblxuICAgIGlmICh0LnJvdGF0aW9uKSB7XG4gICAgICBtLnJvdGF0ZVgodC5yb3RhdGlvblswXSk7XG4gICAgICBtLnJvdGF0ZVkodC5yb3RhdGlvblsxXSk7XG4gICAgICBtLnJvdGF0ZVoodC5yb3RhdGlvblsyXSk7XG4gICAgfVxuXG4gICAgaWYgKHQucG9zaXRpb24pIHtcbiAgICAgIG0udHJhbnNsYXRlKHQucG9zaXRpb25bMF0sIHQucG9zaXRpb25bMV0sIHQucG9zaXRpb25bMl0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSUYgd2Ugd2lzaGVkIHRvIHBlcmZvcm0gcm90YXRpb24gQUZURVIgc2tldyAvIHBvc2l0aW9uIC8gZXRjLCB3ZSBjb3VsZCBkbyBpdCBoZXJlLlxuICAgIC8vIFRoZSBvcmRlcmluZyBpcyBpbXBvcnRhbnQsIGFuZCBoYXMgYW4gZWZmZWN0LlxuXG4gICAgLy8gaWYgKHQucm90YXRpb25Qb3N0KSB7XG4gICAgLy8gICBtLnJvdGF0ZVgodC5yb3RhdGlvblBvc3RbMF0pO1xuICAgIC8vICAgbS5yb3RhdGVZKHQucm90YXRpb25Qb3N0WzFdKTtcbiAgICAvLyAgIG0ucm90YXRlWih0LnJvdGF0aW9uUG9zdFsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHQuc2NhbGVQb3N0KSB7XG4gICAgLy8gICBtLnNjYWxlKHQuc2NhbGVQb3N0WzBdLCB0LnNjYWxlUG9zdFsxXSk7XG4gICAgLy8gfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8vIC4uLiBhbmQgaGVyZSB3ZSBwdXQgaXQgYmFjay4gKFRoaXMgZHVwbGljYXRpb24gaXMgbm90IGEgbWlzdGFrZSkuXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSh0LnRyYW5zZm9ybU9yaWdpblswXSwgdC50cmFuc2Zvcm1PcmlnaW5bMV0sIHQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIFNjcm9sbGlmeS1pbmcuIFBlcmhhcHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgLyBtb2JpbGUgZGV2aWNlcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG5cdC8vIHN0aWNrKCkge1xuXHQvLyBcdGxldCBkID0gc2NlbmUuZHVyYXRpb24gfHwgMDtcblx0Ly8gXHRsZXQgaCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cblx0Ly8gXHR0aGlzLmVsZW1lbnQuX3N0aWNreVRvcCA9IHRyaWdnZXJQb3MgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdC8vIFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUuc3R5bGUucGFkZGluZ0JvdHRvbSA9IGQgKyBoICsgJ3B4Jztcblx0Ly8gfVxuXG59XG5cbiIsIi8qKlxuICogUHV0IFNjcm9sbGlmeSBpbnRvIHRoZSBHbG9iYWwgc2NvcGUuXG4gKiBVc2VmdWwgZm9yIGV4aXN0aW5nIGRlbW9zIG9yIGlmIHlvdSB3aXNoIHRvIGluY2x1ZGUgbWFudWFsbHlcbiAqL1xuXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbmltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuaW1wb3J0ICogYXMgZnggZnJvbSAnLi9lZmZlY3RzJztcbmltcG9ydCB7ZWFzZU91dFF1YWR9IGZyb20gJy4vZWFzaW5ncyc7XG5cbnNjcm9sbGlmeS5meCA9IGZ4O1xuLy8gc2Nyb2xsaWZ5LmVhc2luZ3MgPSB7fTtcblxud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbi8vIHdpbmRvdy5TdGlja3kgPSBTdGlja3k7XG5cbiIsIi8qXG4gKiBTdGlja3lcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5L1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiwgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLypnbG9iYWwgZG9jdW1lbnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEhUTUxFbGVtZW50Ki9cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBiYXIgd2hpY2ggYXR0YWNoZXMgLyBkZXRhY2hlcyB0byB0b3Agb2Ygdmlld3BvcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQ6IFRoZSBlbGVtZW50IHRvIHN0aWNreS1pZnlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYm91bmRlZDogV2hldGhlciB0byBhcHBseSBzdGlja2luZXNzIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhcmVudCBjb250YWluZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGlja3kge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGJvdW5kZWQ9dHJ1ZSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IGVsZW1lbnQgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgIGlmICghdGhpcy5lbGVtZW50KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgdGhpcy5ib3VuZGVkID0gISFib3VuZGVkO1xuICAgIHRoaXMucGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSAnXyc7XG4gICAgdGhpcy5zdGF0ZVN3aXRjaGVyO1xuICAgIHRoaXMuZGV0ZXJtaW5lID0gJ25vcm1hbCc7XG5cbiAgICAvLyBkZXRlcm1pbmUgaW5pdGlhbCBzdGF0ZVxuICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgMSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgICB0aGlzLnN0YXRlU3dpdGNoZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnbm9ybWFsJyk7XG4gICAgfVxuXG4gICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc3RhdGVTd2l0Y2hlcik7ICAgIC8vIHN0YXRlU3dpdGNoZXIgY2hhbmdlcywgc28gY2Fubm90IHBhc3MgKGllLiBiaW5kIGRpcmVjdGx5KSBsaWtlIHRoaXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4geyB0aGlzLnN0YXRlU3dpdGNoZXIoKTsgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5zdGF0ZVN3aXRjaGVyKCk7IH0pO1xuICB9XG5cbiAgbm9ybWFsKCkge1xuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGVsZW1lbnRQb3NpdGlvbi50b3AgPCAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RpY2t5KCkge1xuICAgIGxldCBwYXJlbnRQb3NpdGlvbiA9IHRoaXMucGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChwYXJlbnRQb3NpdGlvbi50b3AgPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnbm9ybWFsJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJvdW5kZWQpIHtcbiAgICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAocGFyZW50UG9zaXRpb24uYm90dG9tIDwgZWxlbWVudFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnYm90dG9tJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYm90dG9tKCkge1xuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGVsZW1lbnRQb3NpdGlvbi50b3AgPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09IHN0YXRlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLnN0YXRlU3dpdGNoZXIgPSB0aGlzW3N0YXRlXTsgICAvLyBzdGF0ZVN3aXRjaGVyIHdpbGwgcG9pbnQgYXQgYW4gaW50ZXJuYWwgZm5cbiAgfVxufVxuXG4iLCIvKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cblxubGV0IHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuXG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcbiAgaWYgKGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG4gICAgYnJlYWs7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtOyJdfQ==
