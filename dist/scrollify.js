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
  t /= d; // percentage
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
        active: false,
        trigger: trigger,
        triggerPos: 1 - triggerPos,
        duration: duration,
        easing: easing,
        applyTransform: applyTransform,
        effects: []
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

      // let top = trigger.getBoundingClientRect().top + window.scrollY;

      var top = 0;
      do {
        top += trigger.offsetTop || 0;
        trigger = trigger.offsetParent;
      } while (trigger);

      scene.start = Math.max(0, top - triggerPos * window.innerHeight);
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
        if (scene.easing) {
          //            start, from, to, end
          progress = scene.easing(scroll - start, 0, 1, duration);
        } else {
          progress = (scroll - start) / duration;
        }
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL21hdHJpeC5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQjtRQVNBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFJQTtRQU9BO1FBSUE7UUFJQTtRQUtBO1FBZ0JBO1FBZ0JBO1FBaUJBO1FBS0E7UUFLQTtRQU1BOzs7QUF0S1QsU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCO0FBQ3BDLE1BQUksSUFBSSxDQUFKO0FBRGdDLEdBRXBDLElBQUssQ0FBTDtBQUZvQyxHQUdwQyxHQUFJLEtBQUssRUFBTCxHQUFVLENBQVYsR0FBYyxDQUFkO0FBSGdDLEdBSXBDLEdBQUksS0FBSyxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWQ7QUFKZ0MsR0FLcEMsR0FBSSxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQUo7QUFMb0MsU0FNN0IsSUFBSSxDQUFKLENBTjZCO0NBQS9COztBQVNBLFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQztBQUNyQyxTQUFPLEtBQUssS0FBSyxDQUFMLENBQUwsR0FBZSxDQUFmLEdBQW1CLENBQW5CLENBRDhCO0NBQWhDOztBQUlBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQztBQUN0QyxTQUFPLENBQUMsQ0FBRCxJQUFNLEtBQUssQ0FBTCxDQUFOLElBQWlCLElBQUksQ0FBSixDQUFq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QkF5REw7QUFDUixXQUFLLE1BQUwsR0FBYyxLQUFkLENBRFE7Ozs7U0E5UlM7Ozs7Ozs7O0FDaEJyQjs7OztBQUNBOztJQUFZOztBQUNaOztJQUFZOzs7Ozs7QUFFWixvQkFBVSxFQUFWLEdBQWUsRUFBZjs7Ozs7QUFDQSxvQkFBVSxPQUFWLEdBQW9CLE9BQXBCOztBQUVBLE9BQU8sU0FBUDs7Ozs7Ozs7Ozs7OztBQ1BBLElBQUksWUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQWI7O0FBRU4sS0FBSyxJQUFJLENBQUosSUFBUyxVQUFkLEVBQTBCO0FBQ3hCLE1BQUksU0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixXQUFXLENBQVgsQ0FBcEIsTUFBdUMsU0FBdkMsRUFBa0Q7QUFDcEQsZ0JBQVksV0FBVyxDQUFYLENBQVosQ0FEb0Q7QUFFcEQsVUFGb0Q7R0FBdEQ7Q0FERjs7a0JBT2UiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG5cbmV4cG9ydCBmdW5jdGlvbiBvc2NpbGxhdGUodCwgYiwgYywgZCkge1xuICB2YXIgaSA9IDQ7ICAgICAgICAgICAgLy8gIyBvZiBib3VuY2VzXG4gIHQgLz0gZDsgICAgICAgICAgICAgICAvLyBwZXJjZW50YWdlXG4gIHQgPSBNYXRoLlBJICogaSAqIHQ7ICAvLyBnbyBmcm9tIDAgLT4gMs+AXG4gIHQgPSBNYXRoLnNpbih0KSAqIGM7ICAvLyBub3csIG9zY2lsbGF0ZXMgYmV0d2VlbiBjLCAtY1xuICB0ID0gTWF0aC5hYnModCk7XHRcdFx0Ly8gXCJoYWxmIHdhdmUgcmVjdGlmaWVyXCJcbiAgcmV0dXJuIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgIC89ICBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zaW4odCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCAvIGQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IDAgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIHQgPT0gZCA/IGIgKyBjIDogYyAqICgtTWF0aC5wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKHQgPT0gZCkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkKSA9PSAxKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAuMzsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLC0xMCAqIHQpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA9PSAyKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAoLjMgKiAxLjUpOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICBpZiAodCA8IDEpIHsgcmV0dXJuIC0uNSAqIChhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7IH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIC41ICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgaWYgKHQgLz0gZCA8IDEgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NSkgKyBiO1xuICB9XG59XG4iLCIvKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUgYW5kIGFyZSBjdXJyaWVkIGluIHZpYSBcInRoaXNcIi5cbiAqXG4gKiBOT1RFOiBmb3IgYWxsIGZ1bmN0aW9ucyBoZXJlaW4sIFwidGhpc1wiIGNvbnRhaW5zIGVmZmVjdCBvcHRpb25zLCBhXG4gKiB0cmFuc2Zvcm1hdGlvbiBPYmplY3QsIGFuZCBhbHNvIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50LlxuICovXG5cbi8qZ2xvYmFsIGNvbnNvbGUqL1xuLyplc2xpbnQgbm8taW52YWxpZC10aGlzOiBcImVycm9yXCIqL1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcblxuXG4vKipcbiAqIFRyYW5zbGF0ZSBhbiBlbGVtZW50IGFsb25nIHRoZSBYLWF4aXMuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVYKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAwO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IDA7XG4gIGxldCBvZmZzZXQgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICB0aGlzLnRyYW5zZm9ybXMucG9zaXRpb25bMF0gPSBvZmZzZXQ7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIGFuIGVsZW1lbnQgdmVydGljYWxseS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVkocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDA7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgMDsgLy8gdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdO1xuICBsZXQgb2Zmc2V0ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdID0gb2Zmc2V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZSBhbiBlbGVtZW50LCB1c2luZyByYWRpYW5zLiAobm90ZTogcm90YXRlcyBhcm91bmQgWi1heGlzKS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShwcm9ncmVzcykge1xuICBsZXQgcmFkaWFucyA9IHRoaXMub3B0aW9ucy5yYWQgKiBwcm9ncmVzcztcblxuICB0aGlzLnRyYW5zZm9ybXMucm90YXRpb25bMl0gPSByYWRpYW5zO1xufTtcblxuLyoqXG4gKiBVbmlmb3JtbHkgc2NhbGUgYW4gZWxlbWVudCBhbG9uZyBib3RoIGF4aXMnLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDE7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzBdO1xuICBsZXQgc2NhbGUgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICB0aGlzLnRyYW5zZm9ybXMuc2NhbGVbMF0gPSBzY2FsZTtcbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzFdID0gc2NhbGU7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBlbGVtZW50J3Mgb3BhY2l0eS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhZGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMudG8gOiAxO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMuZnJvbSA6IDE7XG4gIGxldCBvcGFjaXR5ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xufTtcblxuLyoqXG4gKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICpcbiAqIFwidGhpc1wiIGNvbnRhaW5zIGVmZmVjdCBvcHRpb25zIGFuZCBhbHNvIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyYWxsYXgocHJvZ3Jlc3MpIHtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGxldCByYW5nZSA9IHRoaXMub3B0aW9ucy5yYW5nZSB8fCAwO1xuXG4gIG9mZnNldCA9IHByb2dyZXNzICogcmFuZ2U7XG4gIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXSA9IG9mZnNldDsgICAvLyBqdXN0IHZlcnRpY2FsIGZvciBub3dcbn1cblxuLyoqXG4gKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUocHJvZ3Jlc3MpIHtcbiAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblxuICB0aW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbWUpIHtcbiAgICBsZXQgY3NzID0gb3B0c1t0aW1lXTtcblxuICAgIGlmIChwcm9ncmVzcyA+IHRpbWUpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFN0aWNreSBFbGVtZW50OiBzZXRzIHVwIGEgc3RpY2t5IGVsZW1lbnQgd2hpY2ggdG9nZ2xlcyBwb3NpdGlvbiAnZml4ZWQnIG9uIC8gb2ZmLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RpY2socHJvZ3Jlc3MpIHtcbiAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gIGxldCBjdXJyZW50U3RhdGUgPSAnXyc7XG5cbiAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAuMCwgcHJvZ3Jlc3MpKTtcblxuICBpZiAocHJvZ3Jlc3MgPD0gMCkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdub3JtYWwnKTtcbiAgfSBlbHNlIGlmIChwcm9ncmVzcyA+PSAxKSB7XG4gICAgc2V0U3RhdGUoZWxlbWVudCwgJ2JvdHRvbScpO1xuICB9IGVsc2Uge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdzdGlja3knKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKGVsZW1lbnQsIHN0YXRlKSB7XG4gICAgbGV0IEJDUiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgICBpZiAoc3RhdGUgPT0gJ3N0aWNreScpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gQkNSLnRvcCArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBCQ1IubGVmdCArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gQkNSLndpZHRoICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnJztcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICcnO1xuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgLy8gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7ICAvLyBUT0RPOiB3aHkgaXMgdGhpcyBub3Qgd29ya2luZz9cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuXG4gICAgY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG59XG4iLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBEYW5pZWwgTHVuZGluXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCByZXMpIHtcbiAgLy8gVW5yb2xsZWQgbG9vcFxuICByZXNbMF0gPSBhWzBdICogYlswXSArIGFbMV0gKiBiWzRdICsgYVsyXSAqIGJbOF0gKyBhWzNdICogYlsxMl07XG4gIHJlc1sxXSA9IGFbMF0gKiBiWzFdICsgYVsxXSAqIGJbNV0gKyBhWzJdICogYls5XSArIGFbM10gKiBiWzEzXTtcbiAgcmVzWzJdID0gYVswXSAqIGJbMl0gKyBhWzFdICogYls2XSArIGFbMl0gKiBiWzEwXSArIGFbM10gKiBiWzE0XTtcbiAgcmVzWzNdID0gYVswXSAqIGJbM10gKyBhWzFdICogYls3XSArIGFbMl0gKiBiWzExXSArIGFbM10gKiBiWzE1XTtcblxuICByZXNbNF0gPSBhWzRdICogYlswXSArIGFbNV0gKiBiWzRdICsgYVs2XSAqIGJbOF0gKyBhWzddICogYlsxMl07XG4gIHJlc1s1XSA9IGFbNF0gKiBiWzFdICsgYVs1XSAqIGJbNV0gKyBhWzZdICogYls5XSArIGFbN10gKiBiWzEzXTtcbiAgcmVzWzZdID0gYVs0XSAqIGJbMl0gKyBhWzVdICogYls2XSArIGFbNl0gKiBiWzEwXSArIGFbN10gKiBiWzE0XTtcbiAgcmVzWzddID0gYVs0XSAqIGJbM10gKyBhWzVdICogYls3XSArIGFbNl0gKiBiWzExXSArIGFbN10gKiBiWzE1XTtcblxuICByZXNbOF0gPSBhWzhdICogYlswXSArIGFbOV0gKiBiWzRdICsgYVsxMF0gKiBiWzhdICsgYVsxMV0gKiBiWzEyXTtcbiAgcmVzWzldID0gYVs4XSAqIGJbMV0gKyBhWzldICogYls1XSArIGFbMTBdICogYls5XSArIGFbMTFdICogYlsxM107XG4gIHJlc1sxMF0gPSBhWzhdICogYlsyXSArIGFbOV0gKiBiWzZdICsgYVsxMF0gKiBiWzEwXSArIGFbMTFdICogYlsxNF07XG4gIHJlc1sxMV0gPSBhWzhdICogYlszXSArIGFbOV0gKiBiWzddICsgYVsxMF0gKiBiWzExXSArIGFbMTFdICogYlsxNV07XG5cbiAgcmVzWzEyXSA9IGFbMTJdICogYlswXSArIGFbMTNdICogYls0XSArIGFbMTRdICogYls4XSArIGFbMTVdICogYlsxMl07XG4gIHJlc1sxM10gPSBhWzEyXSAqIGJbMV0gKyBhWzEzXSAqIGJbNV0gKyBhWzE0XSAqIGJbOV0gKyBhWzE1XSAqIGJbMTNdO1xuICByZXNbMTRdID0gYVsxMl0gKiBiWzJdICsgYVsxM10gKiBiWzZdICsgYVsxNF0gKiBiWzEwXSArIGFbMTVdICogYlsxNF07XG4gIHJlc1sxNV0gPSBhWzEyXSAqIGJbM10gKyBhWzEzXSAqIGJbN10gKyBhWzE0XSAqIGJbMTFdICsgYVsxNV0gKiBiWzE1XTtcblxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25UcmFuc2xhdGUobWF0cml4LCB4LCB5LCB6KSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IHg7XG4gIG1hdHJpeFsxM10gPSB5O1xuICBtYXRyaXhbMTRdID0gejtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVgobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzZdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsxMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxudmFyIGFzc2lnblJvdGF0ZVkgPSBmdW5jdGlvbihtYXRyaXgsIHJhZCkge1xuICBtYXRyaXhbMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAtTWF0aC5zaW4ocmFkKTtcbiAgbWF0cml4WzldID0gMDtcbiAgbWF0cml4WzEwXSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFsxMV0gPSAwO1xuICBtYXRyaXhbMTJdID0gMDtcbiAgbWF0cml4WzEzXSA9IDA7XG4gIG1hdHJpeFsxNF0gPSAwO1xuICBtYXRyaXhbMTVdID0gMTtcbn07XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVoobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzFdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs1XSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblNrZXcobWF0cml4LCBheCwgYXkpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gTWF0aC50YW4oYXgpO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSBNYXRoLnRhbihheSk7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxuZnVuY3Rpb24gYXNzaWduU2NhbGUobWF0cml4LCB4LCB5KSB7XG4gIG1hdHJpeFswXSA9IHg7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IHk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbklkZW50aXR5KG1hdHJpeCkge1xuICBtYXRyaXhbMF0gPSAxO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBjb3B5QXJyYXkoYSwgYikge1xuICBiWzBdID0gYVswXTtcbiAgYlsxXSA9IGFbMV07XG4gIGJbMl0gPSBhWzJdO1xuICBiWzNdID0gYVszXTtcbiAgYls0XSA9IGFbNF07XG4gIGJbNV0gPSBhWzVdO1xuICBiWzZdID0gYVs2XTtcbiAgYls3XSA9IGFbN107XG4gIGJbOF0gPSBhWzhdO1xuICBiWzldID0gYVs5XTtcbiAgYlsxMF0gPSBhWzEwXTtcbiAgYlsxMV0gPSBhWzExXTtcbiAgYlsxMl0gPSBhWzEyXTtcbiAgYlsxM10gPSBhWzEzXTtcbiAgYlsxNF0gPSBhWzE0XTtcbiAgYlsxNV0gPSBhWzE1XTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWF0cml4KCkge1xuICAgIHZhciBkYXRhID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIGEgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB2YXIgYiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIGFzc2lnbklkZW50aXR5KGRhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IGRhdGEsXG5cbiAgICAgIGFzQ1NTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNzcyA9ICdtYXRyaXgzZCgnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyArK2kpIHtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YVtpXSkgPCAwLjAwMDEpIHtcbiAgICAgICAgICAgIGNzcyArPSAnMCwnO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIGNzcyArPSBkYXRhW2ldLnRvRml4ZWQoMTApICsgJywnO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRhdGFbMTVdKSA8IDAuMDAwMSkge1xuICAgICAgICAgIGNzcyArPSAnMCknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzcyArPSBkYXRhWzE1XS50b0ZpeGVkKDEwKSArICcpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzO1xuICAgICAgfSxcblxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NpZ25JZGVudGl0eShkYXRhKTtcbiAgICAgIH0sXG5cbiAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSwgeikge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblRyYW5zbGF0ZShiLCB4LCB5LCB6KTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVYOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWChiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVZOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWShiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVaOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWihiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICBzY2FsZTogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblNjYWxlKGIsIHgsIHkpO1xuICAgICAgICBhc3NpZ25lZE1hdHJpeE11bHRpcGxpY2F0aW9uKGEsIGIsIGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICBza2V3OiBmdW5jdGlvbihheCwgYXkpIHtcbiAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgIGFzc2lnblNrZXcoYiwgYXgsIGF5KTtcbiAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG59XG5cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNYXRyaXg7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNYXRyaXg7XG4iLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgY29uc29sZSBIVE1MRWxlbWVudCovXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuaW1wb3J0IGNyZWF0ZU1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gZWxlbWVudDogVGhlIGVsZW1lbnQgdG8gU2Nyb2xsaWZ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cbiAgICAvLyBpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSkgeyByZXR1cm4gdGhpcy5hY3RpdmUgPSBmYWxzZTsgfVxuICAgIGlmICghdHJhbnNmb3JtKSB7IHRocm93ICdTY3JvbGxpZnkgW2Vycm9yXTogdHJhbnNmb3JtcyBub3Qgc3VwcG9ydGVkJzsgfVxuICAgIGlmICghZWxlbWVudCkgeyB0aHJvdyAnU2Nyb2xsaWZ5IFtlcnJvcl06IGNvdWxkIG5vdCBmaW5kIGVsZW1lbnQnOyB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2NlbmVzID0gW107XG4gICAgdGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5tYXRyaXggPSBjcmVhdGVNYXRyaXgoKTtcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSB7XG4gICAgICBzY2FsZTogWzEsMV0sXG4gICAgICByb3RhdGlvbjogWzAsMCwwXSxcbiAgICAgIHBvc2l0aW9uOiBbMCwwLDBdXG4gICAgICAvLyB0cmFuc2Zvcm1PcmlnaW46IFtdLFxuICAgICAgLy8gc2tldzogW10sXG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgU2NlbmUgdG8gdGhlIFNjcm9sbGlmeSBvYmplY3QuIFNjZW5lIGluZm9ybWF0aW9uIGluY2x1ZGVzIHdoZW5cbiAgICogdG8gc3RhcnQgYXBwbHlpbmcgYW4gZWZmZWN0IGFuZCBmb3IgaG93IGxvbmcuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0czogVmFyaW91cyBvcHRpb25zIHRvIGFwcGx5IHRvIHRoZSBuZXcgU2NlbmU6XG4gICAqXG4gICAqICAgc3RhcnQ6IChyZXF1aXJlZCkgV2hlbiB0byBzdGFydCB0aGUgZWZmZWN0LiBJdCBpcyBhIDAgLSAxIHZhbHVlXG4gICAqICAgICAgICAgIHJlcHJlc2VudGluZyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpLlxuICAgKiAgICAgICAgICBBbnkgZWZmZWN0cyBpbiB0aGUgU2NlbmUgd2lsbCBiZWdpbiB3aGVuIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICogICAgICAgICAgY3Jvc3NlcyB0aGlzIHRocmVzaG9sZC5cbiAgICpcbiAgICogICBkdXJhdGlvbjogVGhlIGxlbmd0aCBvZiB0aGUgZWZmZWN0LCBpbiBwaXhlbHMuIFNjcm9sbGlmeSB3aWxsXG4gICAqICAgICAgICAgIGludGVycG9sYXRlIHRoYXQgaW50byB2YWx1ZSBpbnRvIGEgXCJwcm9ncmVzc1wiIHZhcmlhYmxlLCBib3VuZGVkXG4gICAqICAgICAgICAgIGJ5IDAgLSAxLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIHRoZSBoZWlnaHQgb2YgdGhlXG4gICAqICAgICAgICAgIHZpZXdwb3J0ICsgZWxlbWVudCBoZWlnaHQsIG1lYW5pbmcgdGhlIGVmZmVjdCB3aWxsIGxhc3QgZm9yIGFzXG4gICAqICAgICAgICAgIGxvbmcgYXMgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZS5cbiAgICpcbiAgICogICB0cmlnZ2VyOiBJZiBzdXBwbGllZCwgU2Nyb2xsaWZ5IHdpbGwgdXNlIHRoaXMgZWxlbWVudCdzIHBvc2l0aW9uIHRvXG4gICAqICAgICAgICAgIHN0YXJ0IGFueSBTY2VuZSBlZmZlY3RzLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZVxuICAgKiAgICAgICAgICB0aGUgZWxlbWVudCBpdHNlbGYgYXMgYSB0cmlnZ2VyLlxuICAgKlxuICAgKiAgIGVhc2luZzogRWFzZSBpbi9vdXQgb2YgYW4gZWZmZWN0LiBBbnkgdmFsdWUgZnJvbSBSb2JlcnQgUGVubmVyJ3MgZWFzaW5nXG4gICAqICAgICAgICAgIGZ1bmN0aW9ucyBpcyB2YWxpZC5cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGFkZFNjZW5lKG9wdHMpIHtcbiAgICBsZXQgdHJpZ2dlclBvcyA9IG9wdHMuc3RhcnQgfHwgMDtcbiAgICBsZXQgZHVyYXRpb24gPSBvcHRzLmR1cmF0aW9uIHx8IHdpbmRvdy5pbm5lckhlaWdodCArIHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IGVhc2luZyA9IG9wdHMuZWFzaW5nIHx8IGZhbHNlO1xuICAgIGxldCBlZmZlY3RzID0gb3B0cy5lZmZlY3RzIHx8IFtdO1xuICAgIGxldCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRzLnRyaWdnZXIpIHx8IHRoaXMuZWxlbWVudDtcbiAgICBsZXQgYXBwbHlUcmFuc2Zvcm0gPSBvcHRzLmFwcGx5VHJhbnNmb3JtICE9PSB1bmRlZmluZWQgPyBvcHRzLmFwcGx5VHJhbnNmb3JtIDogdHJ1ZTsgICAvLyBvcHQgb3V0IHJhdGhlciB0aGFuIG9wdCBpblxuICAgIGxldCBzY2VuZSA9IHtcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuICAgICAgdHJpZ2dlclBvczogMSAtIHRyaWdnZXJQb3MsXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBlYXNpbmc6IGVhc2luZyxcbiAgICAgIGFwcGx5VHJhbnNmb3JtOiBhcHBseVRyYW5zZm9ybSxcbiAgICAgIGVmZmVjdHM6IFtdXG4gICAgfTtcblxuICAgIGVmZmVjdHMubWFwKChlZmZlY3QpID0+IHtcbiAgICAgIHRoaXMuYWRkRWZmZWN0KGVmZmVjdC5uYW1lLCBlZmZlY3Qub3B0aW9ucywgc2NlbmUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG4gICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZWFjaCBzY2VuZS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG4gICAgbGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuICAgIGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB0cmlnZ2VyUG9zID0gc2NlbmUudHJpZ2dlclBvcztcblxuICAgIC8vIGxldCB0b3AgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgbGV0IHRvcCA9IDA7XG4gICAgZG8ge1xuICAgICAgdG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG4gICAgICB0cmlnZ2VyID0gdHJpZ2dlci5vZmZzZXRQYXJlbnQ7XG4gICAgfSB3aGlsZSh0cmlnZ2VyKTtcblxuICAgIHNjZW5lLnN0YXJ0ID0gTWF0aC5tYXgoMCwgdG9wIC0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgLy8gc2NlbmUuc3RhcnQgPSB0b3AgLSAodHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUpXG5cbiAgICB0aGlzLmNhbGN1bGF0ZShzY2VuZSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiB0byBhIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZWZmZWN0OiBUaGUgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gdG8gYXBwbHkuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uczogQW55IHRyYW5zZm9ybWF0aW9uIG9wdGlvbnMuXG4gICAqIEBwYXJhbSAge09iamVjdH0gc2NlbmU6IE9iamVjdCBjb250YWluaW5nIHN0YXJ0IGFuZCBkdXJhdGlvbiBpbmZvcm1hdGlvbi5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGFkZEVmZmVjdChlZmZlY3QsIG9wdGlvbnMgPSB7fSwgc2NlbmUpIHtcbiAgICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICBsZXQgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3JtcztcblxuICAgIGlmICghc2NlbmUpIHtcbiAgICAgIGlmICh0aGlzLnNjZW5lcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSBtb3N0IHJlY2VudGx5IGFkZGVkIHNjZW5lXG4gICAgICAgIHNjZW5lID0gdGhpcy5zY2VuZXNbdGhpcy5zY2VuZXMubGVuZ3RoIC0gMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvciBpZiBubyBzY2VuZSAoaWUgXCJhZGRFZmZlY3RcIiB3YXMgY2FsbGVkIGRpcmVjdGx5IG9uIFNjcm9sbGlmeSksIHNldCB1cCBhIGRlZmF1bHQgb25lXG4gICAgICAgIHJldHVybiB0aGlzLmFkZFNjZW5lKHtcbiAgICAgICAgICAnZWZmZWN0cyc6IFt7J25hbWUnOiBlZmZlY3QsICdvcHRpb25zJzogb3B0aW9uc31dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAgICAgICAvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICdvcHRpb25zJzogb3B0aW9ucyxcbiAgICAgICAgICAnZWxlbWVudCc6IGVsZW1lbnQsXG4gICAgICAgICAgJ3RyYW5zZm9ybXMnOiB0cmFuc2Zvcm1zXG4gICAgICAgIH07XG5cbiAgICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2NlbmUuZWZmZWN0cy5wdXNoKGN1cnJ5KGVmZmVjdCwgb3B0aW9ucykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogb25TY3JvbGwgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgb25TY3JvbGwoKSB7XG4gICAgLy8gaWYgKCF0aGlzLmFjdGl2ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIGlmICghdGhpcy50aWNraW5nKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy50aWNraW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogb25SZXNpemUgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5zY2VuZXMuZm9yRWFjaCgoc2NlbmUpID0+IHRoaXMudXBkYXRlU2NlbmUoc2NlbmUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRyYW5zZm9ybWF0aW9ucyBmb3IgZXZlcnkgc2NlbmUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5zY2VuZXMuZm9yRWFjaCgoc2NlbmUpID0+IHRoaXMuY2FsY3VsYXRlKHNjZW5lKSk7XG4gICAgdGhpcy50aWNraW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGVhY2ggc2NlbmUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gc2NlbmU6IEFuIE9iamVjdCBjb250YWluaW5nIHN0YXJ0IGFuZCBkdXJhdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvcm1hdGlvbiBhcyB3ZWxsIGFzIGFuIEFycmF5IG9mXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9ucyB0byBhcHBseS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNhbGN1bGF0ZShzY2VuZSkge1xuICAgIGxldCBzdGFydCA9IHNjZW5lLnN0YXJ0O1xuICAgIGxldCBkdXJhdGlvbiA9IHNjZW5lLmR1cmF0aW9uO1xuICAgIGxldCBzY3JvbGwgPSB0aGlzLnNjcm9sbDtcbiAgICBsZXQgcHJvZ3Jlc3M7XG4gICAgbGV0IG1hdHJpeDtcblxuICAgIGlmIChzY3JvbGwgLSBzdGFydCA+IGR1cmF0aW9uKSB7XG4gICAgICBpZiAoc2NlbmUuYWN0aXZlKSB7ICAgIC8vIGRvIG9uZSBmaW5hbCBpdGVyYXRpb25cbiAgICAgICAgc2NlbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHByb2dyZXNzID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNjcm9sbCAtIHN0YXJ0IDwgMCkge1xuICAgICAgaWYgKHNjZW5lLmFjdGl2ZSkgeyAgICAvLyBkbyBvbmUgZmluYWwgaXRlcmF0aW9uXG4gICAgICAgIHNjZW5lLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBwcm9ncmVzcyA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjZW5lLmFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAoc2NlbmUuZWFzaW5nKSB7IC8vICAgICAgICAgICAgc3RhcnQsIGZyb20sIHRvLCBlbmRcbiAgICAgICAgcHJvZ3Jlc3MgPSBzY2VuZS5lYXNpbmcoc2Nyb2xsIC0gc3RhcnQsIDAsIDEsIGR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG4gICAgc2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5jYWxsKHByb2dyZXNzKTtcbiAgICB9KTtcblxuICAgIGlmIChzY2VuZS5hcHBseVRyYW5zZm9ybSkge1xuICAgICAgLy8gdHJhbnNtb2dyaWZ5IGFsbCBhcHBsaWVkIHRyYW5zZm9ybWF0aW9ucyBpbnRvIGEgc2luZ2xlIG1hdHJpeCwgYW5kIGFwcGx5XG4gICAgICBtYXRyaXggPSB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSBtYXRyaXguYXNDU1MoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudCdzIHRyYW5zZm9ybWF0aW9uIGRhdGEgYW5kIGNhbGN1bGF0ZXMgYSBtYXRyaXggcmVwcmVzZW50aW5nIGl0LlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9IFllIG9sZGUgTWF0cml4XG4gICAqL1xuICB1cGRhdGVNYXRyaXgoKSB7XG4gICAgbGV0IHQgPSB0aGlzLnRyYW5zZm9ybXM7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeDtcblxuICAgIG0uY2xlYXIoKTtcblxuICAgIC8vIGhlcmUgd2UgYWRqdXN0IHRoZSB0cmFuc2Zvcm1PcmlnaW4gLi4uXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSgtdC50cmFuc2Zvcm1PcmlnaW5bMF0sIC10LnRyYW5zZm9ybU9yaWdpblsxXSwgLXQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICBpZiAodC5zY2FsZSkge1xuICAgICAgbS5zY2FsZSh0LnNjYWxlWzBdLCB0LnNjYWxlWzFdKTtcbiAgICB9XG5cbiAgICBpZiAodC5za2V3KSB7XG4gICAgICBtLnNrZXcodC5za2V3WzBdLCB0LnNrZXdbMV0pO1xuICAgIH1cblxuICAgIGlmICh0LnJvdGF0aW9uKSB7XG4gICAgICBtLnJvdGF0ZVgodC5yb3RhdGlvblswXSk7XG4gICAgICBtLnJvdGF0ZVkodC5yb3RhdGlvblsxXSk7XG4gICAgICBtLnJvdGF0ZVoodC5yb3RhdGlvblsyXSk7XG4gICAgfVxuXG4gICAgaWYgKHQucG9zaXRpb24pIHtcbiAgICAgIG0udHJhbnNsYXRlKHQucG9zaXRpb25bMF0sIHQucG9zaXRpb25bMV0sIHQucG9zaXRpb25bMl0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSUYgd2Ugd2lzaGVkIHRvIHBlcmZvcm0gcm90YXRpb24gQUZURVIgc2tldyAvIHBvc2l0aW9uIC8gZXRjLCB3ZSBjb3VsZCBkbyBpdCBoZXJlLlxuICAgIC8vIFRoZSBvcmRlcmluZyBpcyBpbXBvcnRhbnQsIGFuZCBoYXMgYW4gZWZmZWN0LlxuXG4gICAgLy8gaWYgKHQucm90YXRpb25Qb3N0KSB7XG4gICAgLy8gICBtLnJvdGF0ZVgodC5yb3RhdGlvblBvc3RbMF0pO1xuICAgIC8vICAgbS5yb3RhdGVZKHQucm90YXRpb25Qb3N0WzFdKTtcbiAgICAvLyAgIG0ucm90YXRlWih0LnJvdGF0aW9uUG9zdFsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHQuc2NhbGVQb3N0KSB7XG4gICAgLy8gICBtLnNjYWxlKHQuc2NhbGVQb3N0WzBdLCB0LnNjYWxlUG9zdFsxXSk7XG4gICAgLy8gfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8vIC4uLiBhbmQgaGVyZSB3ZSBwdXQgaXQgYmFjay4gKFRoaXMgZHVwbGljYXRpb24gaXMgbm90IGEgbWlzdGFrZSkuXG4gICAgaWYgKHQudHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgICBtLnRyYW5zbGF0ZSh0LnRyYW5zZm9ybU9yaWdpblswXSwgdC50cmFuc2Zvcm1PcmlnaW5bMV0sIHQudHJhbnNmb3JtT3JpZ2luWzJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIFNjcm9sbGlmeS1pbmcuIFBlcmhhcHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgLyBtb2JpbGUgZGV2aWNlcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG4iLCIvKipcbiAqIFB1dCBTY3JvbGxpZnkgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cblxuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG5pbXBvcnQgKiBhcyBmeCBmcm9tICcuL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgZWFzaW5ncyBmcm9tICcuL2Vhc2luZ3MnO1xuXG5zY3JvbGxpZnkuZnggPSBmeDtcbnNjcm9sbGlmeS5lYXNpbmdzID0gZWFzaW5ncztcblxud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcblxuIiwiLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5cbmxldCB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcblxuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG4gIGlmIChkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybTsiXX0=
