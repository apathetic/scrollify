(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oscillate = oscillate;
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

function oscillate(t, b, c, d) {
  var i = 4; // # of bounces
  t /= d; // percentage through
  t = Math.PI * i * t; // go from 0 -> 2π
  t = Math.sin(t) * c; // now, oscillates between c, -c
  t = Math.abs(t); // "half wave rectifier"
  return t + b;
}

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
  var to = this.options.to || 0;
  var from = this.options.from || 0; // this.transforms.position[1];
  var offset = (to - from) * progress + from;

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

  // progress = Math.min(1.0, Math.max(0.0, progress));

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
      element.style.top = BCR.top + 'px';
      element.style.left = BCR.left + 'px';
      element.style.width = BCR.width + 'px';
    } else {
      element.style.top = '';
      element.style.left = '';
      element.style.width = '';
    }

    element.className = '';
    // element.classList.remove(currentState);  // TODO: why is this not working?
    element.classList.add(state);

    currentState = state;
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
    // if (!element || !transform) { return this.active = false; }
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
        'active': false,
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
      // if (!this.active) { return; }
      this.scroll = window.scrollY;
      if (!this.ticking) {
        window.requestAnimationFrame(this.update.bind(this));
        this.ticking = true;
      }
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

      // *** NOTE: with fixed-positioning, this won't work. (Use bounding container as trigger?)
      // Determine if we should run calcuations for this Scene.
      // Use *actual* position data as an element may be onscreen while its reference (trigger)
      // element is not. Progress may be negative or > 1.0 in some instances.
      //
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

var easings = _interopRequireWildcard(_easings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollify2.default.fx = fx; /**
                              * Put Scrollify into the Global scope.
                              * Useful for existing demos or if you wish to include manually
                              */

_scrollify2.default.easings = easings;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL21hdHJpeC5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQjtRQVNBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFJQTtRQU9BO1FBSUE7UUFJQTtRQUtBO1FBZ0JBO1FBZ0JBO1FBaUJBO1FBS0E7UUFLQTtRQU1BOzs7QUF0S1QsU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCO0FBQ3BDLE1BQUksSUFBSSxDQUFKO0FBRGdDLEdBRXBDLElBQUssQ0FBTDtBQUZvQyxHQUdwQyxHQUFJLEtBQUssRUFBTCxHQUFVLENBQVYsR0FBYyxDQUFkO0FBSGdDLEdBSXBDLEdBQUksS0FBSyxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWQ7QUFKZ0MsR0FLcEMsR0FBSSxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQUo7QUFMb0MsU0FNN0IsSUFBSSxDQUFKLENBTjZCO0NBQS9COztBQVNBLFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQztBQUNyQyxTQUFPLEtBQUssS0FBSyxDQUFMLENBQUwsR0FBZSxDQUFmLEdBQW1CLENBQW5CLENBRDhCO0NBQWhDOztBQUlBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQztBQUN0QyxTQUFPLENBQUMsQ0FBRCxJQUFNLEtBQUssQ0FBTCxDQUFOLElBQWlCLElBQUksQ0FBSixDQUFq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YUFBTyxDQUFQLENBbERhOzs7Ozs7Ozs7OzhCQXlETDtBQUNSLFdBQUssTUFBTCxHQUFjLEtBQWQsQ0FEUTs7OztTQTlUUzs7Ozs7Ozs7QUNoQnJCOzs7O0FBQ0E7O0lBQVk7O0FBQ1o7O0lBQVk7Ozs7OztBQUVaLG9CQUFVLEVBQVYsR0FBZSxFQUFmOzs7OztBQUNBLG9CQUFVLE9BQVYsR0FBb0IsT0FBcEI7O0FBRUEsT0FBTyxTQUFQOzs7Ozs7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjs7QUFFTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDeEIsTUFBSSxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUNwRCxnQkFBWSxXQUFXLENBQVgsQ0FBWixDQURvRDtBQUVwRCxVQUZvRDtHQUF0RDtDQURGOztrQkFPZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAxMjBdKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG9zY2lsbGF0ZSh0LCBiLCBjLCBkKSB7XG4gIHZhciBpID0gNDsgICAgICAgICAgICAvLyAjIG9mIGJvdW5jZXNcbiAgdCAvPSBkOyAgICAgICAgICAgICAgIC8vIHBlcmNlbnRhZ2UgdGhyb3VnaFxuICB0ID0gTWF0aC5QSSAqIGkgKiB0OyAgLy8gZ28gZnJvbSAwIC0+IDLPgFxuICB0ID0gTWF0aC5zaW4odCkgKiBjOyAgLy8gbm93LCBvc2NpbGxhdGVzIGJldHdlZW4gYywgLWNcbiAgdCA9IE1hdGguYWJzKHQpO1x0XHRcdC8vIFwiaGFsZiB3YXZlIHJlY3RpZmllclwiXG4gIHJldHVybiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0ICAvPSAgZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSAwID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICh0ID09IGQpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dENpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gLShhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPT0gMikgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogKC4zICogMS41KTsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgaWYgKHQgPCAxKSB7IHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiOyB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gIGlmICh0IC89IGQgPCAxIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgLjc1KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogT3B0aW9ucyBhcmUgYXBwbGllZCBhdCBpbml0aWFsaXplIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKlxuICogTk9URTogZm9yIGFsbCBmdW5jdGlvbnMgaGVyZWluLCBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucywgYVxuICogdHJhbnNmb3JtYXRpb24gT2JqZWN0LCBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuXG4vKmdsb2JhbCBjb25zb2xlKi9cbi8qZXNsaW50IG5vLWludmFsaWQtdGhpczogXCJlcnJvclwiKi9cblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5cblxuLyoqXG4gKiBUcmFuc2xhdGUgYW4gZWxlbWVudCBhbG9uZyB0aGUgWC1heGlzLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChwcm9ncmVzcykge1xuICBsZXQgdG8gPSB0aGlzLm9wdGlvbnMudG8gfHwgMDtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSB8fCAwO1xuICBsZXQgb2Zmc2V0ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzBdID0gb2Zmc2V0O1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZSBhbiBlbGVtZW50IHZlcnRpY2FsbHkuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVZKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAwO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IDA7IC8vIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXTtcbiAgbGV0IG9mZnNldCA9ICh0byAtIGZyb20pICogcHJvZ3Jlc3MgKyBmcm9tO1xuXG4gIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXSA9IG9mZnNldDtcbn1cblxuLyoqXG4gKiBSb3RhdGUgYW4gZWxlbWVudCwgdXNpbmcgcmFkaWFucy4gKG5vdGU6IHJvdGF0ZXMgYXJvdW5kIFotYXhpcykuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHJhZGlhbnMgPSB0aGlzLm9wdGlvbnMucmFkICogcHJvZ3Jlc3M7XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnJvdGF0aW9uWzJdID0gcmFkaWFucztcbn07XG5cbi8qKlxuICogVW5pZm9ybWx5IHNjYWxlIGFuIGVsZW1lbnQgYWxvbmcgYm90aCBheGlzJy5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAxO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IHRoaXMudHJhbnNmb3Jtcy5zY2FsZVswXTtcbiAgbGV0IHNjYWxlID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzBdID0gc2NhbGU7XG4gIHRoaXMudHJhbnNmb3Jtcy5zY2FsZVsxXSA9IHNjYWxlO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYW4gZWxlbWVudCdzIG9wYWNpdHkuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWRlKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLnRvIDogMTtcbiAgbGV0IGZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbSAhPT0gdW5kZWZpbmVkID8gdGhpcy5vcHRpb25zLmZyb20gOiAxO1xuICBsZXQgb3BhY2l0eSA9ICh0byAtIGZyb20pICogcHJvZ3Jlc3MgKyBmcm9tO1xuXG4gIHRoaXMuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eTtcbn07XG5cbi8qKlxuICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBcInRoaXNcIiBjb250YWlucyBlZmZlY3Qgb3B0aW9ucyBhbmQgYWxzbyBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGF4KHByb2dyZXNzKSB7XG4gIGxldCBvZmZzZXQgPSAwO1xuICBsZXQgcmFuZ2UgPSB0aGlzLm9wdGlvbnMucmFuZ2UgfHwgMDtcblxuICBvZmZzZXQgPSBwcm9ncmVzcyAqIHJhbmdlO1xuICB0aGlzLnRyYW5zZm9ybXMucG9zaXRpb25bMV0gPSBvZmZzZXQ7ICAgLy8ganVzdCB2ZXJ0aWNhbCBmb3Igbm93XG59XG5cbi8qKlxuICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHByb2dyZXNzKSB7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgbGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XG5cbiAgdGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG4gICAgbGV0IGNzcyA9IG9wdHNbdGltZV07XG5cbiAgICBpZiAocHJvZ3Jlc3MgPiB0aW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBlbGVtZW50IHdoaWNoIHRvZ2dsZXMgcG9zaXRpb24gJ2ZpeGVkJyBvbiAvIG9mZi5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0aWNrKHByb2dyZXNzKSB7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgY3VycmVudFN0YXRlID0gJ18nO1xuXG4gIC8vIHByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIHByb2dyZXNzKSk7XG5cbiAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnbm9ybWFsJyk7XG4gIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZShlbGVtZW50LCBzdGF0ZSkge1xuICAgIGxldCBCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN0YXRlID09ICdzdGlja3knKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IEJDUi50b3AgKyAncHgnO1xuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gQkNSLmxlZnQgKyAncHgnO1xuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IEJDUi53aWR0aCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJyc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnJztcbiAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnJztcbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgIC8vIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50U3RhdGUpOyAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbm90IHdvcmtpbmc/XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcblxuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgLy8gYm91bmRzUGFyYW1zID0gW1widG9wXCIsIFwibGVmdFwiLCBcImJvdHRvbVwiLCBcInJpZ2h0XCIsIFwibWFyZ2luXCIsIFwibWFyZ2luTGVmdFwiLCBcIm1hcmdpblJpZ2h0XCIsIFwibWFyZ2luVG9wXCIsIFwibWFyZ2luQm90dG9tXCJdO1xufVxuIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgRGFuaWVsIEx1bmRpblxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgcmVzKSB7XG4gIC8vIFVucm9sbGVkIGxvb3BcbiAgcmVzWzBdID0gYVswXSAqIGJbMF0gKyBhWzFdICogYls0XSArIGFbMl0gKiBiWzhdICsgYVszXSAqIGJbMTJdO1xuICByZXNbMV0gPSBhWzBdICogYlsxXSArIGFbMV0gKiBiWzVdICsgYVsyXSAqIGJbOV0gKyBhWzNdICogYlsxM107XG4gIHJlc1syXSA9IGFbMF0gKiBiWzJdICsgYVsxXSAqIGJbNl0gKyBhWzJdICogYlsxMF0gKyBhWzNdICogYlsxNF07XG4gIHJlc1szXSA9IGFbMF0gKiBiWzNdICsgYVsxXSAqIGJbN10gKyBhWzJdICogYlsxMV0gKyBhWzNdICogYlsxNV07XG5cbiAgcmVzWzRdID0gYVs0XSAqIGJbMF0gKyBhWzVdICogYls0XSArIGFbNl0gKiBiWzhdICsgYVs3XSAqIGJbMTJdO1xuICByZXNbNV0gPSBhWzRdICogYlsxXSArIGFbNV0gKiBiWzVdICsgYVs2XSAqIGJbOV0gKyBhWzddICogYlsxM107XG4gIHJlc1s2XSA9IGFbNF0gKiBiWzJdICsgYVs1XSAqIGJbNl0gKyBhWzZdICogYlsxMF0gKyBhWzddICogYlsxNF07XG4gIHJlc1s3XSA9IGFbNF0gKiBiWzNdICsgYVs1XSAqIGJbN10gKyBhWzZdICogYlsxMV0gKyBhWzddICogYlsxNV07XG5cbiAgcmVzWzhdID0gYVs4XSAqIGJbMF0gKyBhWzldICogYls0XSArIGFbMTBdICogYls4XSArIGFbMTFdICogYlsxMl07XG4gIHJlc1s5XSA9IGFbOF0gKiBiWzFdICsgYVs5XSAqIGJbNV0gKyBhWzEwXSAqIGJbOV0gKyBhWzExXSAqIGJbMTNdO1xuICByZXNbMTBdID0gYVs4XSAqIGJbMl0gKyBhWzldICogYls2XSArIGFbMTBdICogYlsxMF0gKyBhWzExXSAqIGJbMTRdO1xuICByZXNbMTFdID0gYVs4XSAqIGJbM10gKyBhWzldICogYls3XSArIGFbMTBdICogYlsxMV0gKyBhWzExXSAqIGJbMTVdO1xuXG4gIHJlc1sxMl0gPSBhWzEyXSAqIGJbMF0gKyBhWzEzXSAqIGJbNF0gKyBhWzE0XSAqIGJbOF0gKyBhWzE1XSAqIGJbMTJdO1xuICByZXNbMTNdID0gYVsxMl0gKiBiWzFdICsgYVsxM10gKiBiWzVdICsgYVsxNF0gKiBiWzldICsgYVsxNV0gKiBiWzEzXTtcbiAgcmVzWzE0XSA9IGFbMTJdICogYlsyXSArIGFbMTNdICogYls2XSArIGFbMTRdICogYlsxMF0gKyBhWzE1XSAqIGJbMTRdO1xuICByZXNbMTVdID0gYVsxMl0gKiBiWzNdICsgYVsxM10gKiBiWzddICsgYVsxNF0gKiBiWzExXSArIGFbMTVdICogYlsxNV07XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gYXNzaWduVHJhbnNsYXRlKG1hdHJpeCwgeCwgeSwgeikge1xuICBtYXRyaXhbMF0gPSAxO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSB4O1xuICBtYXRyaXhbMTNdID0geTtcbiAgbWF0cml4WzE0XSA9IHo7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Sb3RhdGVYKG1hdHJpeCwgcmFkKSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFs2XSA9IC1NYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbMTBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5cbnZhciBhc3NpZ25Sb3RhdGVZID0gZnVuY3Rpb24obWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gTWF0aC5zaW4ocmFkKTtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gMTtcbiAgbWF0cml4WzZdID0gMDtcbiAgbWF0cml4WzddID0gMDtcbiAgbWF0cml4WzhdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59O1xuXG5mdW5jdGlvbiBhc3NpZ25Sb3RhdGVaKG1hdHJpeCwgcmFkKSB7XG4gIG1hdHJpeFswXSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFsxXSA9IC1NYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbNV0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Ta2V3KG1hdHJpeCwgYXgsIGF5KSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IE1hdGgudGFuKGF4KTtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gTWF0aC50YW4oYXkpO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5cbmZ1bmN0aW9uIGFzc2lnblNjYWxlKG1hdHJpeCwgeCwgeSkge1xuICBtYXRyaXhbMF0gPSB4O1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSB5O1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25JZGVudGl0eShtYXRyaXgpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gMTtcbiAgbWF0cml4WzZdID0gMDtcbiAgbWF0cml4WzddID0gMDtcbiAgbWF0cml4WzhdID0gMDtcbiAgbWF0cml4WzldID0gMDtcbiAgbWF0cml4WzEwXSA9IDE7XG4gIG1hdHJpeFsxMV0gPSAwO1xuICBtYXRyaXhbMTJdID0gMDtcbiAgbWF0cml4WzEzXSA9IDA7XG4gIG1hdHJpeFsxNF0gPSAwO1xuICBtYXRyaXhbMTVdID0gMTtcbn1cblxuZnVuY3Rpb24gY29weUFycmF5KGEsIGIpIHtcbiAgYlswXSA9IGFbMF07XG4gIGJbMV0gPSBhWzFdO1xuICBiWzJdID0gYVsyXTtcbiAgYlszXSA9IGFbM107XG4gIGJbNF0gPSBhWzRdO1xuICBiWzVdID0gYVs1XTtcbiAgYls2XSA9IGFbNl07XG4gIGJbN10gPSBhWzddO1xuICBiWzhdID0gYVs4XTtcbiAgYls5XSA9IGFbOV07XG4gIGJbMTBdID0gYVsxMF07XG4gIGJbMTFdID0gYVsxMV07XG4gIGJbMTJdID0gYVsxMl07XG4gIGJbMTNdID0gYVsxM107XG4gIGJbMTRdID0gYVsxNF07XG4gIGJbMTVdID0gYVsxNV07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hdHJpeCgpIHtcbiAgICB2YXIgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIHZhciBhID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIGIgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICBhc3NpZ25JZGVudGl0eShkYXRhKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBkYXRhLFxuXG4gICAgICBhc0NTUzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjc3MgPSAnbWF0cml4M2QoJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgKytpKSB7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGFbaV0pIDwgMC4wMDAxKSB7XG4gICAgICAgICAgICBjc3MgKz0gJzAsJztcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICBjc3MgKz0gZGF0YVtpXS50b0ZpeGVkKDEwKSArICcsJztcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkYXRhWzE1XSkgPCAwLjAwMDEpIHtcbiAgICAgICAgICBjc3MgKz0gJzApJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjc3MgKz0gZGF0YVsxNV0udG9GaXhlZCgxMCkgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNzcztcbiAgICAgIH0sXG5cbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzaWduSWRlbnRpdHkoZGF0YSk7XG4gICAgICB9LFxuXG4gICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIGEpO1xuICAgICAgICBhc3NpZ25UcmFuc2xhdGUoYiwgeCwgeSwgeik7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWDogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVgoYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWTogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVkoYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcm90YXRlWjogZnVuY3Rpb24ocmFkaWFucykge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblJvdGF0ZVooYiwgcmFkaWFucyk7XG4gICAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgc2NhbGU6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIGEpO1xuICAgICAgICBhc3NpZ25TY2FsZShiLCB4LCB5KTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgc2tldzogZnVuY3Rpb24oYXgsIGF5KSB7XG4gICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICBhc3NpZ25Ta2V3KGIsIGF4LCBheSk7XG4gICAgICBhc3NpZ25lZE1hdHJpeE11bHRpcGxpY2F0aW9uKGEsIGIsIGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xufVxuXG5cbi8vIG1vZHVsZS5leHBvcnRzID0gY3JlYXRlTWF0cml4O1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWF0cml4O1xuIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cbi8qZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDEyMF0qL1xuLypnbG9iYWwgZG9jdW1lbnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGNvbnNvbGUgSFRNTEVsZW1lbnQqL1xuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCBjcmVhdGVNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IGVsZW1lbnQ6IFRoZSBlbGVtZW50IHRvIFNjcm9sbGlmeS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID09IGZhbHNlKSB7IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpOyB9XG4gICAgLy8gaWYgKCFlbGVtZW50IHx8ICF0cmFuc2Zvcm0pIHsgcmV0dXJuIHRoaXMuYWN0aXZlID0gZmFsc2U7IH1cbiAgICBpZiAoIXRyYW5zZm9ybSkgeyB0aHJvdyAnU2Nyb2xsaWZ5IFtlcnJvcl06IHRyYW5zZm9ybXMgbm90IHN1cHBvcnRlZCc7IH1cbiAgICBpZiAoIWVsZW1lbnQpIHsgdGhyb3cgJ1Njcm9sbGlmeSBbZXJyb3JdOiBjb3VsZCBub3QgZmluZCBlbGVtZW50JzsgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNjZW5lcyA9IFtdO1xuICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubWF0cml4ID0gY3JlYXRlTWF0cml4KCk7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0ge1xuICAgICAgc2NhbGU6IFsxLDFdLFxuICAgICAgcm90YXRpb246IFswLDAsMF0sXG4gICAgICBwb3NpdGlvbjogWzAsMCwwXVxuICAgICAgLy8gdHJhbnNmb3JtT3JpZ2luOiBbXSxcbiAgICAgIC8vIHNrZXc6IFtdLFxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IFNjZW5lIHRvIHRoZSBTY3JvbGxpZnkgb2JqZWN0LiBTY2VuZSBpbmZvcm1hdGlvbiBpbmNsdWRlcyB3aGVuXG4gICAqIHRvIHN0YXJ0IGFwcGx5aW5nIGFuIGVmZmVjdCBhbmQgZm9yIGhvdyBsb25nLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdHM6IFZhcmlvdXMgb3B0aW9ucyB0byBhcHBseSB0byB0aGUgbmV3IFNjZW5lOlxuICAgKlxuICAgKiAgIHN0YXJ0OiAocmVxdWlyZWQpIFdoZW4gdG8gc3RhcnQgdGhlIGVmZmVjdC4gSXQgaXMgYSAwIC0gMSB2YWx1ZVxuICAgKiAgICAgICAgICByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KS5cbiAgICogICAgICAgICAgQW55IGVmZmVjdHMgaW4gdGhlIFNjZW5lIHdpbGwgYmVnaW4gd2hlbiB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqICAgICAgICAgIGNyb3NzZXMgdGhpcyB0aHJlc2hvbGQuXG4gICAqXG4gICAqICAgZHVyYXRpb246IFRoZSBsZW5ndGggb2YgdGhlIGVmZmVjdCwgaW4gcGl4ZWxzLiBTY3JvbGxpZnkgd2lsbFxuICAgKiAgICAgICAgICBpbnRlcnBvbGF0ZSB0aGF0IGludG8gdmFsdWUgaW50byBhIFwicHJvZ3Jlc3NcIiB2YXJpYWJsZSwgYm91bmRlZFxuICAgKiAgICAgICAgICBieSAwIC0gMS4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZVxuICAgKiAgICAgICAgICB2aWV3cG9ydCArIGVsZW1lbnQgaGVpZ2h0LCBtZWFuaW5nIHRoZSBlZmZlY3Qgd2lsbCBsYXN0IGZvciBhc1xuICAgKiAgICAgICAgICBsb25nIGFzIHRoZSBlbGVtZW50IGlzIHZpc2libGUuXG4gICAqXG4gICAqICAgdHJpZ2dlcjogSWYgc3VwcGxpZWQsIFNjcm9sbGlmeSB3aWxsIHVzZSB0aGlzIGVsZW1lbnQncyBwb3NpdGlvbiB0b1xuICAgKiAgICAgICAgICBzdGFydCBhbnkgU2NlbmUgZWZmZWN0cy4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCBpcyB0byB1c2VcbiAgICogICAgICAgICAgdGhlIGVsZW1lbnQgaXRzZWxmIGFzIGEgdHJpZ2dlci5cbiAgICpcbiAgICogICBlYXNpbmc6IEVhc2UgaW4vb3V0IG9mIGFuIGVmZmVjdC4gQW55IHZhbHVlIGZyb20gUm9iZXJ0IFBlbm5lcidzIGVhc2luZ1xuICAgKiAgICAgICAgICBmdW5jdGlvbnMgaXMgdmFsaWQuXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRTY2VuZShvcHRzKSB7XG4gICAgbGV0IHRyaWdnZXJQb3MgPSBvcHRzLnN0YXJ0IHx8IDA7XG4gICAgbGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgKyB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBlYXNpbmcgPSBvcHRzLmVhc2luZyB8fCBmYWxzZTtcbiAgICBsZXQgZWZmZWN0cyA9IG9wdHMuZWZmZWN0cyB8fCBbXTtcbiAgICBsZXQgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy50cmlnZ2VyKSB8fCB0aGlzLmVsZW1lbnQ7XG4gICAgbGV0IGFwcGx5VHJhbnNmb3JtID0gb3B0cy5hcHBseVRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkID8gb3B0cy5hcHBseVRyYW5zZm9ybSA6IHRydWU7ICAgLy8gb3B0IG91dCByYXRoZXIgdGhhbiBvcHQgaW5cbiAgICBsZXQgc2NlbmUgPSB7XG4gICAgICAnYWN0aXZlJzogZmFsc2UsXG4gICAgICAndHJpZ2dlcic6IHRyaWdnZXIsXG4gICAgICAndHJpZ2dlclBvcyc6IDEgLSB0cmlnZ2VyUG9zLFxuICAgICAgJ2R1cmF0aW9uJzogZHVyYXRpb24sXG4gICAgICAnZWFzaW5nJzogZWFzaW5nLFxuICAgICAgJ2FwcGx5VHJhbnNmb3JtJzogYXBwbHlUcmFuc2Zvcm0sXG4gICAgICAnZWZmZWN0cyc6IFtdXG4gICAgfTtcblxuICAgIGVmZmVjdHMubWFwKChlZmZlY3QpID0+IHtcbiAgICAgIHRoaXMuYWRkRWZmZWN0KGVmZmVjdC5uYW1lLCBlZmZlY3Qub3B0aW9ucywgc2NlbmUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG4gICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZWFjaCBzY2VuZS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG4gICAgbGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuICAgIGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB0cmlnZ2VyUG9zID0gc2NlbmUudHJpZ2dlclBvcztcbiAgICBsZXQgdG9wID0gMDtcblxuICAgIGRvIHtcbiAgICAgIHRvcCArPSB0cmlnZ2VyLm9mZnNldFRvcCB8fCAwO1xuICAgICAgdHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuICAgIH0gd2hpbGUodHJpZ2dlcik7XG4gICAgLy8gdG9wID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIHNjZW5lLnN0YXJ0ID0gTWF0aC5tYXgoMCwgdG9wIC0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUuLi4/KVxuICAgIC8vIHNjZW5lLnN0YXJ0ID0gdG9wIC0gKHRyaWdnZXJQb3MgKiB3aW5kb3cuaW5uZXJIZWlnaHQpOyAvLyAoY2FuIGJlIG5lZ2F0aXZlKVxuXG4gICAgdGhpcy5jYWxjdWxhdGUoc2NlbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBhcnRpY3VsYXIgdHJhbnNmb3JtYXRpb24gdG8gYSBzY2VuZS5cbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGVmZmVjdDogVGhlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnM6IEFueSB0cmFuc2Zvcm1hdGlvbiBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRFZmZlY3QoZWZmZWN0LCBvcHRpb25zID0ge30sIHNjZW5lKSB7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgbGV0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXM7XG5cbiAgICBpZiAoIXNjZW5lKSB7XG4gICAgICBpZiAodGhpcy5zY2VuZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHVzZSB0aGUgbW9zdCByZWNlbnRseSBhZGRlZCBzY2VuZVxuICAgICAgICBzY2VuZSA9IHRoaXMuc2NlbmVzW3RoaXMuc2NlbmVzLmxlbmd0aCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IgaWYgbm8gc2NlbmUgKGllIFwiYWRkRWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IG9uZVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRTY2VuZSh7XG4gICAgICAgICAgJ2VmZmVjdHMnOiBbeyduYW1lJzogZWZmZWN0LCAnb3B0aW9ucyc6IG9wdGlvbnN9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAnb3B0aW9ucyc6IG9wdGlvbnMsXG4gICAgICAgICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICAgICAgICd0cmFuc2Zvcm1zJzogdHJhbnNmb3Jtc1xuICAgICAgICB9O1xuXG4gICAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uU2Nyb2xsKCkge1xuICAgIC8vIGlmICghdGhpcy5hY3RpdmUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMudGlja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gYXMgd2VsbCBhcyBhbiBBcnJheSBvZlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbnMgdG8gYXBwbHkuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjYWxjdWxhdGUoc2NlbmUpIHtcbiAgICBsZXQgc3RhcnQgPSBzY2VuZS5zdGFydDtcbiAgICBsZXQgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbjtcbiAgICBsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGxldCBtYXRyaXg7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaWYgKHNjcm9sbCAtIHN0YXJ0ID4gZHVyYXRpb24pIHtcbiAgICAgIGlmIChzY2VuZS5hY3RpdmUpIHsgICAgLy8gZG8gb25lIGZpbmFsIGl0ZXJhdGlvblxuICAgICAgICBzY2VuZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcHJvZ3Jlc3MgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2Nyb2xsIC0gc3RhcnQgPCAwKSB7XG4gICAgICBpZiAoc2NlbmUuYWN0aXZlKSB7ICAgIC8vIGRvIG9uZSBmaW5hbCBpdGVyYXRpb25cbiAgICAgICAgc2NlbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2NlbmUuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBpZiAoc2NlbmUuZWFzaW5nKSB7IC8vICAgICAgICAgICAgc3RhcnQsIGZyb20sIHRvLCBlbmRcbiAgICAgICAgcHJvZ3Jlc3MgPSBzY2VuZS5lYXNpbmcoc2Nyb2xsIC0gc3RhcnQsIDAsIDEsIGR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgfVxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB9XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBxdWljayBzY3JvbGxpbmcsIGVmZmVjdHMgbWF5IG5vdCBzdGFydCBvciBlbmQgY2xlYW5seVxuICAgIC8vIGlmIChzY3JvbGwgLSBzdGFydCA+IGR1cmF0aW9uIHx8IHNjcm9sbCAtIHN0YXJ0IDwgMCkgeyByZXR1cm47IH1cblxuICAgIC8vICoqKiBOT1RFOiB3aXRoIGVhc2luZywgdGhpcyB3b250IHdvcmtcbiAgICAvLyBzY2VuZS5hY3RpdmUgPSBwcm9ncmVzcyA+IDAgJiYgcHJvZ3Jlc3MgPCAxO1xuICAgIC8vIGlmIChwcm9ncmVzcyA8PSAwIHx8IHByb2dyZXNzID49IDEpIHtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG5cbiAgICAvLyAqKiogTk9URTogd2l0aCBmaXhlZC1wb3NpdGlvbmluZywgdGhpcyB3b24ndCB3b3JrLiAoVXNlIGJvdW5kaW5nIGNvbnRhaW5lciBhcyB0cmlnZ2VyPylcbiAgICAvLyBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHJ1biBjYWxjdWF0aW9ucyBmb3IgdGhpcyBTY2VuZS5cbiAgICAvLyBVc2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YSBhcyBhbiBlbGVtZW50IG1heSBiZSBvbnNjcmVlbiB3aGlsZSBpdHMgcmVmZXJlbmNlICh0cmlnZ2VyKVxuICAgIC8vIGVsZW1lbnQgaXMgbm90LiBQcm9ncmVzcyBtYXkgYmUgbmVnYXRpdmUgb3IgPiAxLjAgaW4gc29tZSBpbnN0YW5jZXMuXG4gICAgLy9cbiAgICAvLyBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCB8fFxuICAgIC8vICAgIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuXG4gICAgLy8gKioqIE5PVEU6IGhlbHBmdWwsIGJ1dCBtYXkgbGVhdmUgcGFyYWxsYXgnZCBlbGVtZW50cyBzdWRkZW5seSBzdG9wcGVkIHdoaWxlIHN0aWxsIGluIHZpZXdwb3J0XG4gICAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAsIHByb2dyZXNzKSk7XG5cblxuICAgIC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG4gICAgc2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5jYWxsKHByb2dyZXNzKTtcbiAgICB9KTtcblxuICAgIGlmIChzY2VuZS5hcHBseVRyYW5zZm9ybSkge1xuICAgICAgLy8gdHJhbnNtb2dyaWZ5IGFsbCBhcHBsaWVkIHRyYW5zZm9ybWF0aW9ucyBpbnRvIGEgc2luZ2xlIG1hdHJpeCwgYW5kIGFwcGx5XG4gICAgICBtYXRyaXggPSB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSBtYXRyaXguYXNDU1MoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudCdzIHRyYW5zZm9ybWF0aW9uIGRhdGEgYW5kIGNhbGN1bGF0ZXMgYSBtYXRyaXggcmVwcmVzZW50aW5nIGl0LlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9IFllIG9sZGUgTWF0cml4XG4gICAqL1xuICB1cGRhdGVNYXRyaXgoKSB7XG4gICAgbGV0IHQgPSB0aGlzLnRyYW5zZm9ybXM7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeDtcblxuICAgIG0uY2xlYXIoKTtcblxuICAgIC8vIGhlcmUgd2UgYWRqdXN0IHRoZSB0cmFuc2Zvcm1PcmlnaW4gLi4uXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSgtdC50cmFuc2Zvcm1PcmlnaW5bMF0sIC10LnRyYW5zZm9ybU9yaWdpblsxXSwgLXQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICBpZiAodC5zY2FsZSkge1xuICAgICAgbS5zY2FsZSh0LnNjYWxlWzBdLCB0LnNjYWxlWzFdKTtcbiAgICB9XG5cbiAgICBpZiAodC5za2V3KSB7XG4gICAgICBtLnNrZXcodC5za2V3WzBdLCB0LnNrZXdbMV0pO1xuICAgIH1cblxuICAgIGlmICh0LnJvdGF0aW9uKSB7XG4gICAgICBtLnJvdGF0ZVgodC5yb3RhdGlvblswXSk7XG4gICAgICBtLnJvdGF0ZVkodC5yb3RhdGlvblsxXSk7XG4gICAgICBtLnJvdGF0ZVoodC5yb3RhdGlvblsyXSk7XG4gICAgfVxuXG4gICAgaWYgKHQucG9zaXRpb24pIHtcbiAgICAgIG0udHJhbnNsYXRlKHQucG9zaXRpb25bMF0sIHQucG9zaXRpb25bMV0sIHQucG9zaXRpb25bMl0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSUYgd2Ugd2lzaGVkIHRvIHBlcmZvcm0gcm90YXRpb24gQUZURVIgc2tldyAvIHBvc2l0aW9uIC8gZXRjLCB3ZSBjb3VsZCBkbyBpdCBoZXJlLlxuICAgIC8vIFRoZSBvcmRlcmluZyBpcyBpbXBvcnRhbnQsIGFuZCBoYXMgYW4gZWZmZWN0LlxuXG4gICAgLy8gaWYgKHQucm90YXRpb25Qb3N0KSB7XG4gICAgLy8gICBtLnJvdGF0ZVgodC5yb3RhdGlvblBvc3RbMF0pO1xuICAgIC8vICAgbS5yb3RhdGVZKHQucm90YXRpb25Qb3N0WzFdKTtcbiAgICAvLyAgIG0ucm90YXRlWih0LnJvdGF0aW9uUG9zdFsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHQuc2NhbGVQb3N0KSB7XG4gICAgLy8gICBtLnNjYWxlKHQuc2NhbGVQb3N0WzBdLCB0LnNjYWxlUG9zdFsxXSk7XG4gICAgLy8gfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8vIC4uLiBhbmQgaGVyZSB3ZSBwdXQgaXQgYmFjay4gKFRoaXMgZHVwbGljYXRpb24gaXMgbm90IGEgbWlzdGFrZSkuXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSh0LnRyYW5zZm9ybU9yaWdpblswXSwgdC50cmFuc2Zvcm1PcmlnaW5bMV0sIHQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIFNjcm9sbGlmeS1pbmcuIFBlcmhhcHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgLyBtb2JpbGUgZGV2aWNlcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG4iLCIvKipcbiAqIFB1dCBTY3JvbGxpZnkgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cblxuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG5pbXBvcnQgKiBhcyBmeCBmcm9tICcuL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgZWFzaW5ncyBmcm9tICcuL2Vhc2luZ3MnO1xuXG5zY3JvbGxpZnkuZnggPSBmeDtcbnNjcm9sbGlmeS5lYXNpbmdzID0gZWFzaW5ncztcblxud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcblxuIiwiLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5cbmxldCB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcblxuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG4gIGlmIChkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybTsiXX0=
