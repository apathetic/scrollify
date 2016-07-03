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

},{"./transform":6}],3:[function(require,module,exports){
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
  }]);

  return Scrollify;
}();

exports.default = Scrollify;

},{"./matrix":3,"./transform":6}],5:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

var _effects = require('./effects');

var fx = _interopRequireWildcard(_effects);

var _easings = require('./easings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollify2.default.fx = fx;
// scrollify.easings = {};

/**
 * Put Scrollify into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */
window.Scrollify = _scrollify2.default;

},{"./easings":1,"./effects":2,"./scrollify.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

/*global document*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL21hdHJpeC5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQjtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFPQTtRQUlBO1FBSUE7UUFLQTtRQWdCQTtRQWdCQTtRQWlCQTtRQUtBO1FBS0E7UUFNQTs7O0FBN0pULFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQztBQUNyQyxTQUFPLEtBQUssS0FBSyxDQUFMLENBQUwsR0FBZSxDQUFmLEdBQW1CLENBQW5CLENBRDhCO0NBQWhDOztBQUlBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQztBQUN0QyxTQUFPLENBQUMsQ0FBRCxJQUFNLEtBQUssQ0FBTCxDQUFOLElBQWlCLElBQUksQ0FBSixDQUFqQixHQUEwQixDQUExQixDQUQrQjtDQUFqQzs7QUFJQSxTQUFTLGFBQVQsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUM7QUFDeEMsTUFBSSxDQUFDLEtBQU8sSUFBSSxDQUFKLENBQVIsR0FBaUIsQ0FBakIsRUFBb0I7QUFBRSxXQUFPLElBQUksQ0FBSixHQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCLENBQWhCLENBQVQ7R0FBeEI7QUFDQSxTQUFPLENBQUMsQ0FBRCxHQUFLLENBQUwsSUFBVSxFQUFFLENBQUYsSUFBTyxJQUFJLENBQUosQ0FBUCxHQUFnQixDQUFo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WUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQ0MsWUFERCxFQUNlLGFBRGYsQ0FBYjs7QUFHTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDeEIsTUFBSSxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUNwRCxnQkFBWSxXQUFXLENBQVgsQ0FBWixDQURvRDtBQUVwRCxVQUZvRDtHQUF0RDtDQURGOztrQkFPZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAxMjBdKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0ICAvPSAgZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSAwID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICh0ID09IGQpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dENpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gLShhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPT0gMikgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogKC4zICogMS41KTsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgaWYgKHQgPCAxKSB7IHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiOyB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gIGlmICh0IC89IGQgPCAxIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgLjc1KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogT3B0aW9ucyBhcmUgYXBwbGllZCBhdCBpbml0aWFsaXplIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKlxuICogTk9URTogZm9yIGFsbCBmdW5jdGlvbnMgaGVyZWluLCBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucywgYVxuICogdHJhbnNmb3JtYXRpb24gT2JqZWN0LCBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuXG4vKmdsb2JhbCBjb25zb2xlKi9cbi8qZXNsaW50IG5vLWludmFsaWQtdGhpczogXCJlcnJvclwiKi9cblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5cblxuLyoqXG4gKiBUcmFuc2xhdGUgYW4gZWxlbWVudCBhbG9uZyB0aGUgWC1heGlzLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChwcm9ncmVzcykge1xuICBsZXQgdG8gPSB0aGlzLm9wdGlvbnMudG8gfHwgMDtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSB8fCAwO1xuICBsZXQgb2Zmc2V0ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzBdID0gb2Zmc2V0O1xuICAvLyB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0ICsgdW5pdCArICcsIDAsIDApJztcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGUgYW4gZWxlbWVudCB2ZXJ0aWNhbGx5LlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWShwcm9ncmVzcykge1xuICAvLyBsZXQgZGVsYXkgPSB0aGlzLm9wdGlvbnMuZGVsYXkgfHwgMDtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDA7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgMDsgLy8gdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdO1xuICAvLyBsZXQgdW5pdCA9IHRoaXMub3B0aW9ucy51bml0IHx8ICdweCc7XG4gIGxldCBvZmZzZXQgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICAvLyBvZmZzZXQgLT0gZGVsYXk7XG5cbiAgLy8gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoMCwgJyArIG9mZnNldCArIHVuaXQgKyAnLCAwKSc7XG4gIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXSA9IG9mZnNldDtcbn1cblxuLyoqXG4gKiBSb3RhdGUgYW4gZWxlbWVudCwgdXNpbmcgcmFkaWFucy4gKG5vdGU6IHJvdGF0ZXMgYXJvdW5kIFotYXhpcykuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHJhZGlhbnMgPSB0aGlzLm9wdGlvbnMucmFkICogcHJvZ3Jlc3M7XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnJvdGF0aW9uWzJdID0gcmFkaWFucztcbn07XG5cbi8qKlxuICogVW5pZm9ybWx5IHNjYWxlIGFuIGVsZW1lbnQgYWxvbmcgYm90aCBheGlzJy5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAxO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IHRoaXMudHJhbnNmb3Jtcy5zY2FsZVswXTtcbiAgbGV0IHNjYWxlID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzBdID0gc2NhbGU7XG4gIHRoaXMudHJhbnNmb3Jtcy5zY2FsZVsxXSA9IHNjYWxlO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYW4gZWxlbWVudCdzIG9wYWNpdHkuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWRlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLnRvIDogMTtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLmZyb20gOiAxO1xuICBsZXQgb3BhY2l0eSA9ICh0byAtIGZyb20pICogcHJvZ3Jlc3MgKyBmcm9tO1xuXG4gIHRoaXMuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eTtcbn07XG5cbi8qKlxuICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucyBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGF4KHByb2dyZXNzKSB7XG4gIGxldCBvZmZzZXQgPSAwO1xuICBsZXQgcmFuZ2UgPSB0aGlzLm9wdGlvbnMucmFuZ2UgfHwgMDtcblxuICBvZmZzZXQgPSBwcm9ncmVzcyAqIHJhbmdlO1xuICAvLyB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICdweCknO1xuICB0aGlzLnRyYW5zZm9ybXMucG9zaXRpb25bMV0gPSBvZmZzZXQ7ICAgLy8ganVzdCB2ZXJ0aWNhbCBmb3Igbm93XG59XG5cbi8qKlxuICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHByb2dyZXNzKSB7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgbGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XG5cbiAgdGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG4gICAgbGV0IGNzcyA9IG9wdHNbdGltZV07XG5cbiAgICBpZiAocHJvZ3Jlc3MgPiB0aW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBlbGVtZW50IHdoaWNoIHRvZ2dsZXMgcG9zaXRpb24gJ2ZpeGVkJyBvbiAvIG9mZi5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0aWNrKHByb2dyZXNzKSB7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgY3VycmVudFN0YXRlID0gJ18nO1xuXG4gIHByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIHByb2dyZXNzKSk7XG5cbiAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnbm9ybWFsJyk7XG4gIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZShlbGVtZW50LCBzdGF0ZSkge1xuICAgIGxldCBCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN0YXRlID09ICdzdGlja3knKSB7XG4gICAgICBhcHBseVN0eWxlcyhCQ1IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBseVN0eWxlcyhCQ1IsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgIC8vIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50U3RhdGUpOyAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbm90IHdvcmtpbmc/XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcblxuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlTdHlsZXMoc3R5bGVzLCBhZGQgPSB0cnVlKSB7XG5cbiAgICAvLyBmb3IgKGxldCBwcm9wIGluIHN0eWxlcykge1xuICAgIC8vICAgaWYgKHByb3AgPT0gJ2JvdHRvbScgfHwgcHJvcCA9PSAncmlnaHQnKSB7IGNvbnRpbnVlOyB9XG4gICAgLy8gICB0aGlzLnN0eWxlW3Byb3BdID0gKGFkZCkgPyBzdHlsZXNbcHJvcF0gKyAncHgnIDogJyc7XG4gICAgLy8gfVxuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gICBhZGQgPyBzdHlsZXMudG9wICsgJ3B4JyA6ICcnO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICBhZGQgPyBzdHlsZXMubGVmdCArICdweCcgOiAnJztcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gYWRkID8gc3R5bGVzLndpZHRoICsgJ3B4JyA6ICcnO1xuICAgIC8vIHRoaXMuc3R5bGUuaGVpZ2h0XG4gICAgLy8gdGhpcy5zdHlsZS5wb3NpdGlvbiA9IChhZGQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7ICAgICAgICAgICAgIC8vIE9SLCBkZWFsIHdpdGggdGhpcyB2aWEgQ1NTLi4uP1xuXG4gIH1cblxuICAvLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG59XG4iLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBEYW5pZWwgTHVuZGluXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCByZXMpIHtcbiAgLy8gVW5yb2xsZWQgbG9vcFxuICByZXNbMF0gPSBhWzBdICogYlswXSArIGFbMV0gKiBiWzRdICsgYVsyXSAqIGJbOF0gKyBhWzNdICogYlsxMl07XG4gIHJlc1sxXSA9IGFbMF0gKiBiWzFdICsgYVsxXSAqIGJbNV0gKyBhWzJdICogYls5XSArIGFbM10gKiBiWzEzXTtcbiAgcmVzWzJdID0gYVswXSAqIGJbMl0gKyBhWzFdICogYls2XSArIGFbMl0gKiBiWzEwXSArIGFbM10gKiBiWzE0XTtcbiAgcmVzWzNdID0gYVswXSAqIGJbM10gKyBhWzFdICogYls3XSArIGFbMl0gKiBiWzExXSArIGFbM10gKiBiWzE1XTtcblxuICByZXNbNF0gPSBhWzRdICogYlswXSArIGFbNV0gKiBiWzRdICsgYVs2XSAqIGJbOF0gKyBhWzddICogYlsxMl07XG4gIHJlc1s1XSA9IGFbNF0gKiBiWzFdICsgYVs1XSAqIGJbNV0gKyBhWzZdICogYls5XSArIGFbN10gKiBiWzEzXTtcbiAgcmVzWzZdID0gYVs0XSAqIGJbMl0gKyBhWzVdICogYls2XSArIGFbNl0gKiBiWzEwXSArIGFbN10gKiBiWzE0XTtcbiAgcmVzWzddID0gYVs0XSAqIGJbM10gKyBhWzVdICogYls3XSArIGFbNl0gKiBiWzExXSArIGFbN10gKiBiWzE1XTtcblxuICByZXNbOF0gPSBhWzhdICogYlswXSArIGFbOV0gKiBiWzRdICsgYVsxMF0gKiBiWzhdICsgYVsxMV0gKiBiWzEyXTtcbiAgcmVzWzldID0gYVs4XSAqIGJbMV0gKyBhWzldICogYls1XSArIGFbMTBdICogYls5XSArIGFbMTFdICogYlsxM107XG4gIHJlc1sxMF0gPSBhWzhdICogYlsyXSArIGFbOV0gKiBiWzZdICsgYVsxMF0gKiBiWzEwXSArIGFbMTFdICogYlsxNF07XG4gIHJlc1sxMV0gPSBhWzhdICogYlszXSArIGFbOV0gKiBiWzddICsgYVsxMF0gKiBiWzExXSArIGFbMTFdICogYlsxNV07XG5cbiAgcmVzWzEyXSA9IGFbMTJdICogYlswXSArIGFbMTNdICogYls0XSArIGFbMTRdICogYls4XSArIGFbMTVdICogYlsxMl07XG4gIHJlc1sxM10gPSBhWzEyXSAqIGJbMV0gKyBhWzEzXSAqIGJbNV0gKyBhWzE0XSAqIGJbOV0gKyBhWzE1XSAqIGJbMTNdO1xuICByZXNbMTRdID0gYVsxMl0gKiBiWzJdICsgYVsxM10gKiBiWzZdICsgYVsxNF0gKiBiWzEwXSArIGFbMTVdICogYlsxNF07XG4gIHJlc1sxNV0gPSBhWzEyXSAqIGJbM10gKyBhWzEzXSAqIGJbN10gKyBhWzE0XSAqIGJbMTFdICsgYVsxNV0gKiBiWzE1XTtcblxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25UcmFuc2xhdGUobWF0cml4LCB4LCB5LCB6KSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IHg7XG4gIG1hdHJpeFsxM10gPSB5O1xuICBtYXRyaXhbMTRdID0gejtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVgobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzZdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsxMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxudmFyIGFzc2lnblJvdGF0ZVkgPSBmdW5jdGlvbihtYXRyaXgsIHJhZCkge1xuICBtYXRyaXhbMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAtTWF0aC5zaW4ocmFkKTtcbiAgbWF0cml4WzldID0gMDtcbiAgbWF0cml4WzEwXSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFsxMV0gPSAwO1xuICBtYXRyaXhbMTJdID0gMDtcbiAgbWF0cml4WzEzXSA9IDA7XG4gIG1hdHJpeFsxNF0gPSAwO1xuICBtYXRyaXhbMTVdID0gMTtcbn07XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVoobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzFdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs1XSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblNrZXcobWF0cml4LCBheCwgYXkpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gTWF0aC50YW4oYXgpO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSBNYXRoLnRhbihheSk7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxuZnVuY3Rpb24gYXNzaWduU2NhbGUobWF0cml4LCB4LCB5KSB7XG4gIG1hdHJpeFswXSA9IHg7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IHk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbklkZW50aXR5KG1hdHJpeCkge1xuICBtYXRyaXhbMF0gPSAxO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBjb3B5QXJyYXkoYSwgYikge1xuICBiWzBdID0gYVswXTtcbiAgYlsxXSA9IGFbMV07XG4gIGJbMl0gPSBhWzJdO1xuICBiWzNdID0gYVszXTtcbiAgYls0XSA9IGFbNF07XG4gIGJbNV0gPSBhWzVdO1xuICBiWzZdID0gYVs2XTtcbiAgYls3XSA9IGFbN107XG4gIGJbOF0gPSBhWzhdO1xuICBiWzldID0gYVs5XTtcbiAgYlsxMF0gPSBhWzEwXTtcbiAgYlsxMV0gPSBhWzExXTtcbiAgYlsxMl0gPSBhWzEyXTtcbiAgYlsxM10gPSBhWzEzXTtcbiAgYlsxNF0gPSBhWzE0XTtcbiAgYlsxNV0gPSBhWzE1XTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWF0cml4KCkge1xuICAgIHZhciBkYXRhID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIGEgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB2YXIgYiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIGFzc2lnbklkZW50aXR5KGRhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IGRhdGEsXG5cbiAgICAgIGFzQ1NTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNzcyA9ICdtYXRyaXgzZCgnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyArK2kpIHtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YVtpXSkgPCAwLjAwMDEpIHtcbiAgICAgICAgICAgIGNzcyArPSAnMCwnO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIGNzcyArPSBkYXRhW2ldLnRvRml4ZWQoMTApICsgJywnO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRhdGFbMTVdKSA8IDAuMDAwMSkge1xuICAgICAgICAgIGNzcyArPSAnMCknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzcyArPSBkYXRhWzE1XS50b0ZpeGVkKDEwKSArICcpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzO1xuICAgICAgfSxcblxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NpZ25JZGVudGl0eShkYXRhKTtcbiAgICAgIH0sXG5cbiAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSwgeikge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblRyYW5zbGF0ZShiLCB4LCB5LCB6KTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVYOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWChiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVZOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWShiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVaOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWihiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICBzY2FsZTogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblNjYWxlKGIsIHgsIHkpO1xuICAgICAgICBhc3NpZ25lZE1hdHJpeE11bHRpcGxpY2F0aW9uKGEsIGIsIGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICBza2V3OiBmdW5jdGlvbihheCwgYXkpIHtcbiAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgIGFzc2lnblNrZXcoYiwgYXgsIGF5KTtcbiAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG59XG5cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNYXRyaXg7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNYXRyaXg7XG4iLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgY29uc29sZSBIVE1MRWxlbWVudCovXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuaW1wb3J0IGNyZWF0ZU1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gZWxlbWVudDogVGhlIGVsZW1lbnQgdG8gU2Nyb2xsaWZ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cbiAgICAvLyBpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSkgeyB0aGlzLmFjdGl2ZSA9IGZhbHNlOyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoIXRyYW5zZm9ybSkgeyB0aHJvdyAnU2Nyb2xsaWZ5IFtlcnJvcl06IHRyYW5zZm9ybXMgbm90IHN1cHBvcnRlZCc7IH1cbiAgICBpZiAoIWVsZW1lbnQpIHsgdGhyb3cgJ1Njcm9sbGlmeSBbZXJyb3JdOiBjb3VsZCBub3QgZmluZCBlbGVtZW50JzsgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNjZW5lcyA9IFtdO1xuICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubWF0cml4ID0gY3JlYXRlTWF0cml4KCk7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0ge1xuICAgICAgc2NhbGU6IFsxLDFdLFxuICAgICAgcm90YXRpb246IFswLDAsMF0sXG4gICAgICBwb3NpdGlvbjogWzAsMCwwXVxuICAgICAgLy8gdHJhbnNmb3JtT3JpZ2luOiBbXSxcbiAgICAgIC8vIHNrZXc6IFtdLFxuICAgICAgLy8gcm90YXRpb25Qb3N0OiBbXSwgLy8gIC4uLnJlbW92ZT9cbiAgICAgIC8vIHNjYWxlUG9zdDogW10gICAgIC8vIC4uLnJlbW92ZT9cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBTY2VuZSB0byB0aGUgU2Nyb2xsaWZ5IG9iamVjdC4gU2NlbmUgaW5mb3JtYXRpb24gaW5jbHVkZXMgd2hlblxuICAgKiB0byBzdGFydCBhcHBseWluZyBhbiBlZmZlY3QgYW5kIGZvciBob3cgbG9uZy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRzOiBWYXJpb3VzIG9wdGlvbnMgdG8gYXBwbHkgdG8gdGhlIG5ldyBTY2VuZTpcbiAgICpcbiAgICogICBzdGFydDogKHJlcXVpcmVkKSBXaGVuIHRvIHN0YXJ0IHRoZSBlZmZlY3QuIEl0IGlzIGEgMCAtIDEgdmFsdWVcbiAgICogICAgICAgICAgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCAoZWcuIDAuNSkuXG4gICAqICAgICAgICAgIEFueSBlZmZlY3RzIGluIHRoZSBTY2VuZSB3aWxsIGJlZ2luIHdoZW4gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKiAgICAgICAgICBjcm9zc2VzIHRoaXMgdGhyZXNob2xkLlxuICAgKlxuICAgKiAgIGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSBlZmZlY3QsIGluIHBpeGVscy4gU2Nyb2xsaWZ5IHdpbGxcbiAgICogICAgICAgICAgaW50ZXJwb2xhdGUgdGhhdCBpbnRvIHZhbHVlIGludG8gYSBcInByb2dyZXNzXCIgdmFyaWFibGUsIGJvdW5kZWRcbiAgICogICAgICAgICAgYnkgMCAtIDEuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgdGhlIGhlaWdodCBvZiB0aGVcbiAgICogICAgICAgICAgdmlld3BvcnQgKyBlbGVtZW50IGhlaWdodCwgbWVhbmluZyB0aGUgZWZmZWN0IHdpbGwgbGFzdCBmb3IgYXNcbiAgICogICAgICAgICAgbG9uZyBhcyB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLlxuICAgKlxuICAgKiAgIHRyaWdnZXI6IElmIHN1cHBsaWVkLCBTY3JvbGxpZnkgd2lsbCB1c2UgdGhpcyBlbGVtZW50J3MgcG9zaXRpb24gdG9cbiAgICogICAgICAgICAgc3RhcnQgYW55IFNjZW5lIGVmZmVjdHMuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlXG4gICAqICAgICAgICAgIHRoZSBlbGVtZW50IGl0c2VsZiBhcyBhIHRyaWdnZXIuXG4gICAqXG4gICAqICAgZWFzaW5nOiBFYXNlIGluL291dCBvZiBhbiBlZmZlY3QuIEFueSB2YWx1ZSBmcm9tIFJvYmVydCBQZW5uZXIncyBlYXNpbmdcbiAgICogICAgICAgICAgZnVuY3Rpb25zIGlzIHZhbGlkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgYWRkU2NlbmUob3B0cykge1xuICAgIGxldCB0cmlnZ2VyUG9zID0gb3B0cy5zdGFydCB8fCAwO1xuICAgIGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgd2luZG93LmlubmVySGVpZ2h0ICsgdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBsZXQgZWFzaW5nID0gb3B0cy5lYXNpbmcgfHwgZmFsc2U7XG4gICAgbGV0IGVmZmVjdHMgPSBvcHRzLmVmZmVjdHMgfHwgW107XG4gICAgbGV0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMudHJpZ2dlcikgfHwgdGhpcy5lbGVtZW50O1xuICAgIGxldCBhcHBseVRyYW5zZm9ybSA9IG9wdHMuYXBwbHlUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCA/IG9wdHMuYXBwbHlUcmFuc2Zvcm0gOiB0cnVlOyAgIC8vIG9wdCBvdXQgcmF0aGVyIHRoYW4gb3B0IGluXG4gICAgbGV0IHNjZW5lID0ge1xuICAgICAgJ2FjdGl2ZSc6IHRydWUsXG4gICAgICAndHJpZ2dlcic6IHRyaWdnZXIsXG4gICAgICAndHJpZ2dlclBvcyc6IDEgLSB0cmlnZ2VyUG9zLFxuICAgICAgJ2R1cmF0aW9uJzogZHVyYXRpb24sXG4gICAgICAnZWFzaW5nJzogZWFzaW5nLFxuICAgICAgJ2FwcGx5VHJhbnNmb3JtJzogYXBwbHlUcmFuc2Zvcm0sXG4gICAgICAnZWZmZWN0cyc6IFtdXG4gICAgfTtcblxuICAgIGVmZmVjdHMubWFwKChlZmZlY3QpID0+IHtcbiAgICAgIHRoaXMuYWRkRWZmZWN0KGVmZmVjdC5uYW1lLCBlZmZlY3Qub3B0aW9ucywgc2NlbmUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG4gICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZWFjaCBzY2VuZS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG4gICAgbGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuICAgIGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB0cmlnZ2VyUG9zID0gc2NlbmUudHJpZ2dlclBvcztcbiAgICBsZXQgdG9wID0gMDtcblxuICAgIGRvIHtcbiAgICAgIHRvcCArPSB0cmlnZ2VyLm9mZnNldFRvcCB8fCAwO1xuICAgICAgdHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuICAgIH0gd2hpbGUodHJpZ2dlcik7XG4gICAgLy8gdG9wID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIHNjZW5lLnN0YXJ0ID0gTWF0aC5tYXgoMCwgdG9wIC0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUuLi4/KVxuXG4gICAgdGhpcy5jYWxjdWxhdGUoc2NlbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBhcnRpY3VsYXIgdHJhbnNmb3JtYXRpb24gdG8gYSBzY2VuZS5cbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGVmZmVjdDogVGhlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnM6IEFueSB0cmFuc2Zvcm1hdGlvbiBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRFZmZlY3QoZWZmZWN0LCBvcHRpb25zID0ge30sIHNjZW5lKSB7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgbGV0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXM7XG5cbiAgICBpZiAoIXNjZW5lKSB7XG4gICAgICBpZiAodGhpcy5zY2VuZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHVzZSB0aGUgbW9zdCByZWNlbnRseSBhZGRlZCBzY2VuZVxuICAgICAgICBzY2VuZSA9IHRoaXMuc2NlbmVzW3RoaXMuc2NlbmVzLmxlbmd0aCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IgaWYgbm8gc2NlbmUgKGllIFwiYWRkRWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IG9uZVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRTY2VuZSh7XG4gICAgICAgICAgJ2VmZmVjdHMnOiBbeyduYW1lJzogZWZmZWN0LCAnb3B0aW9ucyc6IG9wdGlvbnN9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAnb3B0aW9ucyc6IG9wdGlvbnMsXG4gICAgICAgICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICAgICAgICd0cmFuc2Zvcm1zJzogdHJhbnNmb3Jtc1xuICAgICAgICB9O1xuXG4gICAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vID8/XG4gICAgLy8gaWYgcm90YXRlIHtcbiAgICAvLyAgIHRoaXMudHJhbnNmb3Jtcy5yb3RhdGlvbiA9IFswLDAsMF1cbiAgICAvLyBpZiB0cmFuc2xhdGVYIHx8IHRyYW5zbGF0ZVlcbiAgICAvLyAgIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvbiA9IFswLDAsMF1cbiAgICAvLyA/Pz9cblxuICAgIHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uU2Nyb2xsKCkge1xuICAgIC8vIGlmICghdGhpcy50aWNraW5nKSB7XG4gICAgdGhpcy50aWNraW5nID0gdHJ1ZTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gYXMgd2VsbCBhcyBhbiBBcnJheSBvZlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbnMgdG8gYXBwbHkuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjYWxjdWxhdGUoc2NlbmUpIHtcbiAgICBsZXQgc3RhcnQgPSBzY2VuZS5zdGFydDtcbiAgICBsZXQgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbjtcbiAgICBsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGxldCBtYXRyaXg7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaWYgKHNjcm9sbCAtIHN0YXJ0ID4gZHVyYXRpb24pIHtcbiAgICAgIGlmIChzY2VuZS5hY3RpdmUpIHsgICAgLy8gZG8gb25lIGZpbmFsIGl0ZXJhdGlvblxuICAgICAgICBzY2VuZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcHJvZ3Jlc3MgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2Nyb2xsIC0gc3RhcnQgPCAwKSB7XG4gICAgICBpZiAoc2NlbmUuYWN0aXZlKSB7ICAgIC8vIGRvIG9uZSBmaW5hbCBpdGVyYXRpb25cbiAgICAgICAgc2NlbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2NlbmUuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBpZiAoc2NlbmUuZWFzaW5nKSB7IC8vICAgICAgICAgICAgc3RhcnQsIGZyb20sIHRvLCBlbmRcbiAgICAgICAgcHJvZ3Jlc3MgPSBzY2VuZS5lYXNpbmcoc2Nyb2xsIC0gc3RhcnQsIDAsIDEsIGR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgfVxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB9XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBxdWljayBzY3JvbGxpbmcsIGVmZmVjdHMgbWF5IG5vdCBzdGFydCBvciBlbmQgY2xlYW5seVxuICAgIC8vIGlmIChzY3JvbGwgLSBzdGFydCA+IGR1cmF0aW9uIHx8IHNjcm9sbCAtIHN0YXJ0IDwgMCkgeyByZXR1cm47IH1cblxuICAgIC8vICoqKiBOT1RFOiB3aXRoIGVhc2luZywgdGhpcyB3b250IHdvcmtcbiAgICAvLyBzY2VuZS5hY3RpdmUgPSBwcm9ncmVzcyA+IDAgJiYgcHJvZ3Jlc3MgPCAxO1xuICAgIC8vIGlmIChwcm9ncmVzcyA8PSAwIHx8IHByb2dyZXNzID49IDEpIHtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBmaXhlZC1wb3NpdGlvbmluZywgdGhpcyB3b24ndCB3b3JrOlxuICAgIC8vIERldGVybWluZSBpZiB3ZSBzaG91bGQgcnVuIGNhbGN1YXRpb25zIGZvciB0aGlzIFNjZW5lLlxuICAgIC8vIFVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhIGFzIGFuIGVsZW1lbnQgbWF5IGJlIG9uc2NyZWVuIHdoaWxlIGl0cyByZWZlcmVuY2UgKHRyaWdnZXIpXG4gICAgLy8gZWxlbWVudCBpcyBub3QuIFByb2dyZXNzIG1heSBiZSBuZWdhdGl2ZSBvciA+IDEuMCBpbiBzb21lIGluc3RhbmNlcy5cbiAgICAvLyBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCB8fFxuICAgIC8vICAgIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuXG4gICAgLy8gKioqIE5PVEU6IGhlbHBmdWwsIGJ1dCBtYXkgbGVhdmUgcGFyYWxsYXgnZCBlbGVtZW50cyBzdWRkZW5seSBzdG9wcGVkIHdoaWxlIHN0aWxsIGluIHZpZXdwb3J0XG4gICAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAsIHByb2dyZXNzKSk7XG5cblxuICAgIC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG4gICAgc2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5jYWxsKHByb2dyZXNzKTtcbiAgICB9KTtcblxuICAgIGlmIChzY2VuZS5hcHBseVRyYW5zZm9ybSkge1xuICAgICAgLy8gdHJhbnNtb2dyaWZ5IGFsbCBhcHBsaWVkIHRyYW5zZm9ybWF0aW9ucyBpbnRvIGEgc2luZ2xlIG1hdHJpeCwgYW5kIGFwcGx5XG4gICAgICBtYXRyaXggPSB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSBtYXRyaXguYXNDU1MoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudCdzIHRyYW5zZm9ybWF0aW9uIGRhdGEgYW5kIGNhbGN1bGF0ZXMgYSBtYXRyaXggcmVwcmVzZW50aW5nIGl0LlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9IFllIG9sZGUgTWF0cml4XG4gICAqL1xuICB1cGRhdGVNYXRyaXgoKSB7XG4gICAgbGV0IHQgPSB0aGlzLnRyYW5zZm9ybXM7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeDtcblxuICAgIG0uY2xlYXIoKTtcblxuICAgIC8vIGhlcmUgd2UgYWRqdXN0IHRoZSB0cmFuc2Zvcm1PcmlnaW4gLi4uXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSgtdC50cmFuc2Zvcm1PcmlnaW5bMF0sIC10LnRyYW5zZm9ybU9yaWdpblsxXSwgLXQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICBpZiAodC5zY2FsZSkge1xuICAgICAgbS5zY2FsZSh0LnNjYWxlWzBdLCB0LnNjYWxlWzFdKTtcbiAgICB9XG5cbiAgICBpZiAodC5za2V3KSB7XG4gICAgICBtLnNrZXcodC5za2V3WzBdLCB0LnNrZXdbMV0pO1xuICAgIH1cblxuICAgIGlmICh0LnJvdGF0aW9uKSB7XG4gICAgICBtLnJvdGF0ZVgodC5yb3RhdGlvblswXSk7XG4gICAgICBtLnJvdGF0ZVkodC5yb3RhdGlvblsxXSk7XG4gICAgICBtLnJvdGF0ZVoodC5yb3RhdGlvblsyXSk7XG4gICAgfVxuXG4gICAgaWYgKHQucG9zaXRpb24pIHtcbiAgICAgIG0udHJhbnNsYXRlKHQucG9zaXRpb25bMF0sIHQucG9zaXRpb25bMV0sIHQucG9zaXRpb25bMl0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSUYgd2Ugd2lzaGVkIHRvIHBlcmZvcm0gcm90YXRpb24gQUZURVIgc2tldyAvIHBvc2l0aW9uIC8gZXRjLCB3ZSBjb3VsZCBkbyBpdCBoZXJlLlxuICAgIC8vIFRoZSBvcmRlcmluZyBpcyBpbXBvcnRhbnQsIGFuZCBoYXMgYW4gZWZmZWN0LlxuXG4gICAgLy8gaWYgKHQucm90YXRpb25Qb3N0KSB7XG4gICAgLy8gICBtLnJvdGF0ZVgodC5yb3RhdGlvblBvc3RbMF0pO1xuICAgIC8vICAgbS5yb3RhdGVZKHQucm90YXRpb25Qb3N0WzFdKTtcbiAgICAvLyAgIG0ucm90YXRlWih0LnJvdGF0aW9uUG9zdFsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHQuc2NhbGVQb3N0KSB7XG4gICAgLy8gICBtLnNjYWxlKHQuc2NhbGVQb3N0WzBdLCB0LnNjYWxlUG9zdFsxXSk7XG4gICAgLy8gfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8vIC4uLiBhbmQgaGVyZSB3ZSBwdXQgaXQgYmFjay4gKFRoaXMgZHVwbGljYXRpb24gaXMgbm90IGEgbWlzdGFrZSkuXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSh0LnRyYW5zZm9ybU9yaWdpblswXSwgdC50cmFuc2Zvcm1PcmlnaW5bMV0sIHQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIFNjcm9sbGlmeS1pbmcuIFBlcmhhcHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgLyBtb2JpbGUgZGV2aWNlcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG4iLCIvKipcbiAqIFB1dCBTY3JvbGxpZnkgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xuaW1wb3J0ICogYXMgZnggZnJvbSAnLi9lZmZlY3RzJztcbmltcG9ydCB7ZWFzZU91dFF1YWR9IGZyb20gJy4vZWFzaW5ncyc7XG5cbnNjcm9sbGlmeS5meCA9IGZ4O1xuLy8gc2Nyb2xsaWZ5LmVhc2luZ3MgPSB7fTtcblxud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiIsIi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xuXG4vKmdsb2JhbCBkb2N1bWVudCovXG5cbmxldCB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcblxuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG4gIGlmIChkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybTsiXX0=
