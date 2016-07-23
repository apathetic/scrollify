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
    if (!element || !_transform2.default) {
      return this.active = false;
    }
    // if (!transform) { throw 'Scrollify [error]: transforms not supported'; }
    // if (!element) { throw 'Scrollify [error]: could not find element'; }

    this.element = element;
    this.ticking = false;
    this.scenes = [];
    this.scroll = window.scrollY || window.pageYOffset;
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
      var trigger = opts.trigger ? opts.trigger instanceof HTMLElement ? opts.trigger : document.querySelector(opts.trigger) : this.element;
      var applyTransform = opts.applyTransform !== undefined ? opts.applyTransform : true; // opt out rather than opt in
      var scene = {
        trigger: trigger,
        triggerPos: 1 - triggerPos,
        duration: duration,
        easing: easing,
        applyTransform: applyTransform,
        effects: []
      };

      // scene.active = this.scroll > this.calculateStart(scene); // calculate any transformations if the scene has already passed.

      var start = this.calculateStart(scene);
      scene.state = this.scroll > start ? this.scroll > start + duration ? 'after' : 'active' : 'before';

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
      scene.start = this.calculateStart(scene);
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
     * Calculate the start point of each scene.
     * @param  {[type]} scene A Scrollify Scene object.
     * @return {Integer} The start position of the Scene, in pixels.
     */

  }, {
    key: 'calculateStart',
    value: function calculateStart(scene) {
      var trigger = scene.trigger;
      var triggerPos = scene.triggerPos;
      var top = 0;

      do {
        top += trigger.offsetTop || 0;
        trigger = trigger.offsetParent;
      } while (trigger);
      // top = trigger.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);

      return Math.max(0, top - triggerPos * window.innerHeight); // (can be negative...?)
    }

    /**
     * onScroll Handler
     * @return {void}
     */

  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (!this.active) {
        return;
      }
      this.scroll = window.scrollY || window.pageYOffset;

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
      this.scenes.forEach(this.updateScene, this);
    }

    /**
     * Update the transformations for every scene.
     * @return {void}
     */

  }, {
    key: 'update',
    value: function update() {
      this.scenes.forEach(this.calculate, this);
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

      // after end
      if (scroll - start > duration) {
        if (scene.state !== 'after') {
          // do one final iteration
          scene.state = 'after';
          progress = 1;
        } else {
          return;
        }

        // before start
      } else if (scroll - start < 0) {
          if (scene.state !== 'before') {
            // do one final iteration
            scene.state = 'before';
            progress = 0;
          } else {
            return;
          }

          // active
        } else {
            scene.state = 'active';
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

var transform = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find(function (t) {
  return document.body.style[t] !== undefined;
});

exports.default = transform;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL21hdHJpeC5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQixTLEdBQUEsUztRQVNBLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUlBLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQU9BLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUtBLGEsR0FBQSxhO1FBZ0JBLGMsR0FBQSxjO1FBZ0JBLGdCLEdBQUEsZ0I7UUFpQkEsVSxHQUFBLFU7UUFLQSxXLEdBQUEsVztRQUtBLGEsR0FBQSxhO1FBTUEsYSxHQUFBLGE7OztBQXRLVCxTQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0I7QUFDcEMsTUFBSSxJQUFJLENBQVIsQztBQUNBLE9BQUssQ0FBTCxDO0FBQ0EsTUFBSSxLQUFLLEVBQUwsR0FBVSxDQUFWLEdBQWMsQ0FBbEIsQztBQUNBLE1BQUksS0FBSyxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWxCLEM7QUFDQSxNQUFJLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FBSixDO0FBQ0EsU0FBTyxJQUFJLENBQVg7QUFDRDs7QUFFTSxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIs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QVYsR0FBb0IsT0FBcEI7O0FBRUEsT0FBTyxTQUFQOzs7Ozs7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFZLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELEVBQThFLElBQTlFLENBQW1GLFVBQUMsQ0FBRCxFQUFPO0FBQ3hHLFNBQVEsU0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixDQUFwQixNQUEyQixTQUFuQztBQUNELENBRmUsQ0FBaEI7O2tCQUllLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG5cbmV4cG9ydCBmdW5jdGlvbiBvc2NpbGxhdGUodCwgYiwgYywgZCkge1xuICB2YXIgaSA9IDQ7ICAgICAgICAgICAgLy8gIyBvZiBib3VuY2VzXG4gIHQgLz0gZDsgICAgICAgICAgICAgICAvLyBwZXJjZW50YWdlXG4gIHQgPSBNYXRoLlBJICogaSAqIHQ7ICAvLyBnbyBmcm9tIDAgLT4gMs+AXG4gIHQgPSBNYXRoLnNpbih0KSAqIGM7ICAvLyBub3csIG9zY2lsbGF0ZXMgYmV0d2VlbiBjLCAtY1xuICB0ID0gTWF0aC5hYnModCk7XHRcdFx0Ly8gXCJoYWxmIHdhdmUgcmVjdGlmaWVyXCJcbiAgcmV0dXJuIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgIC89ICBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zaW4odCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCAvIGQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IDAgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIHQgPT0gZCA/IGIgKyBjIDogYyAqICgtTWF0aC5wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKHQgPT0gZCkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkKSA9PSAxKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAuMzsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLC0xMCAqIHQpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA9PSAyKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAoLjMgKiAxLjUpOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICBpZiAodCA8IDEpIHsgcmV0dXJuIC0uNSAqIChhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7IH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIC41ICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgaWYgKHQgLz0gZCA8IDEgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NSkgKyBiO1xuICB9XG59XG4iLCIvKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUgYW5kIGFyZSBjdXJyaWVkIGluIHZpYSBcInRoaXNcIi5cbiAqXG4gKiBOT1RFOiBmb3IgYWxsIGZ1bmN0aW9ucyBoZXJlaW4sIFwidGhpc1wiIGNvbnRhaW5zIGVmZmVjdCBvcHRpb25zLCBhXG4gKiB0cmFuc2Zvcm1hdGlvbiBPYmplY3QsIGFuZCBhbHNvIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50LlxuICovXG5cbi8qZ2xvYmFsIGNvbnNvbGUqL1xuLyplc2xpbnQgbm8taW52YWxpZC10aGlzOiBcImVycm9yXCIqL1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcblxuXG4vKipcbiAqIFRyYW5zbGF0ZSBhbiBlbGVtZW50IGFsb25nIHRoZSBYLWF4aXMuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVYKHByb2dyZXNzKSB7XG4gIGxldCB0byA9IHRoaXMub3B0aW9ucy50byB8fCAwO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tIHx8IDA7XG4gIGxldCBvZmZzZXQgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICB0aGlzLnRyYW5zZm9ybXMucG9zaXRpb25bMF0gPSBvZmZzZXQ7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIGFuIGVsZW1lbnQgdmVydGljYWxseS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVkocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDA7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgMDsgLy8gdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdO1xuICBsZXQgb2Zmc2V0ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy50cmFuc2Zvcm1zLnBvc2l0aW9uWzFdID0gb2Zmc2V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZSBhbiBlbGVtZW50LCB1c2luZyByYWRpYW5zLiAobm90ZTogcm90YXRlcyBhcm91bmQgWi1heGlzKS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShwcm9ncmVzcykge1xuICBsZXQgcmFkaWFucyA9IHRoaXMub3B0aW9ucy5yYWQgKiBwcm9ncmVzcztcblxuICB0aGlzLnRyYW5zZm9ybXMucm90YXRpb25bMl0gPSByYWRpYW5zO1xufTtcblxuLyoqXG4gKiBVbmlmb3JtbHkgc2NhbGUgYW4gZWxlbWVudCBhbG9uZyBib3RoIGF4aXMnLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvIHx8IDE7XG4gIGxldCBmcm9tID0gdGhpcy5vcHRpb25zLmZyb20gfHwgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzBdO1xuICBsZXQgc2NhbGUgPSAodG8gLSBmcm9tKSAqIHByb2dyZXNzICsgZnJvbTtcblxuICB0aGlzLnRyYW5zZm9ybXMuc2NhbGVbMF0gPSBzY2FsZTtcbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlWzFdID0gc2NhbGU7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBlbGVtZW50J3Mgb3BhY2l0eS5cbiAqIEBwYXJhbSB7RmxvYXR9IHByb2dyZXNzOiBDdXJyZW50IHByb2dyZXNzIGRhdGEgb2YgdGhlIHNjZW5lLCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAdGhpcyB7T2JqZWN0fVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhZGUocHJvZ3Jlc3MpIHtcbiAgbGV0IHRvID0gdGhpcy5vcHRpb25zLnRvICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMudG8gOiAxO1xuICBsZXQgZnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMuZnJvbSA6IDE7XG4gIGxldCBvcGFjaXR5ID0gKHRvIC0gZnJvbSkgKiBwcm9ncmVzcyArIGZyb207XG5cbiAgdGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xufTtcblxuLyoqXG4gKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICpcbiAqIFwidGhpc1wiIGNvbnRhaW5zIGVmZmVjdCBvcHRpb25zIGFuZCBhbHNvIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyYWxsYXgocHJvZ3Jlc3MpIHtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGxldCByYW5nZSA9IHRoaXMub3B0aW9ucy5yYW5nZSB8fCAwO1xuXG4gIG9mZnNldCA9IHByb2dyZXNzICogcmFuZ2U7XG4gIHRoaXMudHJhbnNmb3Jtcy5wb3NpdGlvblsxXSA9IG9mZnNldDsgICAvLyBqdXN0IHZlcnRpY2FsIGZvciBub3dcbn1cblxuLyoqXG4gKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gKiBAcGFyYW0ge0Zsb2F0fSBwcm9ncmVzczogQ3VycmVudCBwcm9ncmVzcyBkYXRhIG9mIHRoZSBzY2VuZSwgYmV0d2VlbiAwIGFuZCAxLlxuICogQHRoaXMge09iamVjdH1cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUocHJvZ3Jlc3MpIHtcbiAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblxuICB0aW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbWUpIHtcbiAgICBsZXQgY3NzID0gb3B0c1t0aW1lXTtcblxuICAgIGlmIChwcm9ncmVzcyA+IHRpbWUpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFN0aWNreSBFbGVtZW50OiBzZXRzIHVwIGEgc3RpY2t5IGVsZW1lbnQgd2hpY2ggdG9nZ2xlcyBwb3NpdGlvbiAnZml4ZWQnIG9uIC8gb2ZmLlxuICogQHBhcmFtIHtGbG9hdH0gcHJvZ3Jlc3M6IEN1cnJlbnQgcHJvZ3Jlc3MgZGF0YSBvZiB0aGUgc2NlbmUsIGJldHdlZW4gMCBhbmQgMS5cbiAqIEB0aGlzIHtPYmplY3R9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RpY2socHJvZ3Jlc3MpIHtcbiAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gIGxldCBjdXJyZW50U3RhdGUgPSAnXyc7XG5cbiAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAuMCwgcHJvZ3Jlc3MpKTtcblxuICBpZiAocHJvZ3Jlc3MgPD0gMCkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdub3JtYWwnKTtcbiAgfSBlbHNlIGlmIChwcm9ncmVzcyA+PSAxKSB7XG4gICAgc2V0U3RhdGUoZWxlbWVudCwgJ2JvdHRvbScpO1xuICB9IGVsc2Uge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdzdGlja3knKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKGVsZW1lbnQsIHN0YXRlKSB7XG4gICAgbGV0IEJDUiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgICBpZiAoc3RhdGUgPT0gJ3N0aWNreScpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gQkNSLnRvcCArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBCQ1IubGVmdCArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gQkNSLndpZHRoICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnJztcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICcnO1xuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgLy8gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7ICAvLyBUT0RPOiB3aHkgaXMgdGhpcyBub3Qgd29ya2luZz9cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuXG4gICAgY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG59XG4iLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBEYW5pZWwgTHVuZGluXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCByZXMpIHtcbiAgLy8gVW5yb2xsZWQgbG9vcFxuICByZXNbMF0gPSBhWzBdICogYlswXSArIGFbMV0gKiBiWzRdICsgYVsyXSAqIGJbOF0gKyBhWzNdICogYlsxMl07XG4gIHJlc1sxXSA9IGFbMF0gKiBiWzFdICsgYVsxXSAqIGJbNV0gKyBhWzJdICogYls5XSArIGFbM10gKiBiWzEzXTtcbiAgcmVzWzJdID0gYVswXSAqIGJbMl0gKyBhWzFdICogYls2XSArIGFbMl0gKiBiWzEwXSArIGFbM10gKiBiWzE0XTtcbiAgcmVzWzNdID0gYVswXSAqIGJbM10gKyBhWzFdICogYls3XSArIGFbMl0gKiBiWzExXSArIGFbM10gKiBiWzE1XTtcblxuICByZXNbNF0gPSBhWzRdICogYlswXSArIGFbNV0gKiBiWzRdICsgYVs2XSAqIGJbOF0gKyBhWzddICogYlsxMl07XG4gIHJlc1s1XSA9IGFbNF0gKiBiWzFdICsgYVs1XSAqIGJbNV0gKyBhWzZdICogYls5XSArIGFbN10gKiBiWzEzXTtcbiAgcmVzWzZdID0gYVs0XSAqIGJbMl0gKyBhWzVdICogYls2XSArIGFbNl0gKiBiWzEwXSArIGFbN10gKiBiWzE0XTtcbiAgcmVzWzddID0gYVs0XSAqIGJbM10gKyBhWzVdICogYls3XSArIGFbNl0gKiBiWzExXSArIGFbN10gKiBiWzE1XTtcblxuICByZXNbOF0gPSBhWzhdICogYlswXSArIGFbOV0gKiBiWzRdICsgYVsxMF0gKiBiWzhdICsgYVsxMV0gKiBiWzEyXTtcbiAgcmVzWzldID0gYVs4XSAqIGJbMV0gKyBhWzldICogYls1XSArIGFbMTBdICogYls5XSArIGFbMTFdICogYlsxM107XG4gIHJlc1sxMF0gPSBhWzhdICogYlsyXSArIGFbOV0gKiBiWzZdICsgYVsxMF0gKiBiWzEwXSArIGFbMTFdICogYlsxNF07XG4gIHJlc1sxMV0gPSBhWzhdICogYlszXSArIGFbOV0gKiBiWzddICsgYVsxMF0gKiBiWzExXSArIGFbMTFdICogYlsxNV07XG5cbiAgcmVzWzEyXSA9IGFbMTJdICogYlswXSArIGFbMTNdICogYls0XSArIGFbMTRdICogYls4XSArIGFbMTVdICogYlsxMl07XG4gIHJlc1sxM10gPSBhWzEyXSAqIGJbMV0gKyBhWzEzXSAqIGJbNV0gKyBhWzE0XSAqIGJbOV0gKyBhWzE1XSAqIGJbMTNdO1xuICByZXNbMTRdID0gYVsxMl0gKiBiWzJdICsgYVsxM10gKiBiWzZdICsgYVsxNF0gKiBiWzEwXSArIGFbMTVdICogYlsxNF07XG4gIHJlc1sxNV0gPSBhWzEyXSAqIGJbM10gKyBhWzEzXSAqIGJbN10gKyBhWzE0XSAqIGJbMTFdICsgYVsxNV0gKiBiWzE1XTtcblxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25UcmFuc2xhdGUobWF0cml4LCB4LCB5LCB6KSB7XG4gIG1hdHJpeFswXSA9IDE7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IHg7XG4gIG1hdHJpeFsxM10gPSB5O1xuICBtYXRyaXhbMTRdID0gejtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVgobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gMDtcbiAgbWF0cml4WzJdID0gMDtcbiAgbWF0cml4WzNdID0gMDtcbiAgbWF0cml4WzRdID0gMDtcbiAgbWF0cml4WzVdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzZdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsxMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxudmFyIGFzc2lnblJvdGF0ZVkgPSBmdW5jdGlvbihtYXRyaXgsIHJhZCkge1xuICBtYXRyaXhbMF0gPSBNYXRoLmNvcyhyYWQpO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSBNYXRoLnNpbihyYWQpO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAtTWF0aC5zaW4ocmFkKTtcbiAgbWF0cml4WzldID0gMDtcbiAgbWF0cml4WzEwXSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFsxMV0gPSAwO1xuICBtYXRyaXhbMTJdID0gMDtcbiAgbWF0cml4WzEzXSA9IDA7XG4gIG1hdHJpeFsxNF0gPSAwO1xuICBtYXRyaXhbMTVdID0gMTtcbn07XG5cbmZ1bmN0aW9uIGFzc2lnblJvdGF0ZVoobWF0cml4LCByYWQpIHtcbiAgbWF0cml4WzBdID0gTWF0aC5jb3MocmFkKTtcbiAgbWF0cml4WzFdID0gLU1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IE1hdGguc2luKHJhZCk7XG4gIG1hdHJpeFs1XSA9IE1hdGguY29zKHJhZCk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblNrZXcobWF0cml4LCBheCwgYXkpIHtcbiAgbWF0cml4WzBdID0gMTtcbiAgbWF0cml4WzFdID0gTWF0aC50YW4oYXgpO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSBNYXRoLnRhbihheSk7XG4gIG1hdHJpeFs1XSA9IDE7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cblxuZnVuY3Rpb24gYXNzaWduU2NhbGUobWF0cml4LCB4LCB5KSB7XG4gIG1hdHJpeFswXSA9IHg7XG4gIG1hdHJpeFsxXSA9IDA7XG4gIG1hdHJpeFsyXSA9IDA7XG4gIG1hdHJpeFszXSA9IDA7XG4gIG1hdHJpeFs0XSA9IDA7XG4gIG1hdHJpeFs1XSA9IHk7XG4gIG1hdHJpeFs2XSA9IDA7XG4gIG1hdHJpeFs3XSA9IDA7XG4gIG1hdHJpeFs4XSA9IDA7XG4gIG1hdHJpeFs5XSA9IDA7XG4gIG1hdHJpeFsxMF0gPSAxO1xuICBtYXRyaXhbMTFdID0gMDtcbiAgbWF0cml4WzEyXSA9IDA7XG4gIG1hdHJpeFsxM10gPSAwO1xuICBtYXRyaXhbMTRdID0gMDtcbiAgbWF0cml4WzE1XSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbklkZW50aXR5KG1hdHJpeCkge1xuICBtYXRyaXhbMF0gPSAxO1xuICBtYXRyaXhbMV0gPSAwO1xuICBtYXRyaXhbMl0gPSAwO1xuICBtYXRyaXhbM10gPSAwO1xuICBtYXRyaXhbNF0gPSAwO1xuICBtYXRyaXhbNV0gPSAxO1xuICBtYXRyaXhbNl0gPSAwO1xuICBtYXRyaXhbN10gPSAwO1xuICBtYXRyaXhbOF0gPSAwO1xuICBtYXRyaXhbOV0gPSAwO1xuICBtYXRyaXhbMTBdID0gMTtcbiAgbWF0cml4WzExXSA9IDA7XG4gIG1hdHJpeFsxMl0gPSAwO1xuICBtYXRyaXhbMTNdID0gMDtcbiAgbWF0cml4WzE0XSA9IDA7XG4gIG1hdHJpeFsxNV0gPSAxO1xufVxuXG5mdW5jdGlvbiBjb3B5QXJyYXkoYSwgYikge1xuICBiWzBdID0gYVswXTtcbiAgYlsxXSA9IGFbMV07XG4gIGJbMl0gPSBhWzJdO1xuICBiWzNdID0gYVszXTtcbiAgYls0XSA9IGFbNF07XG4gIGJbNV0gPSBhWzVdO1xuICBiWzZdID0gYVs2XTtcbiAgYls3XSA9IGFbN107XG4gIGJbOF0gPSBhWzhdO1xuICBiWzldID0gYVs5XTtcbiAgYlsxMF0gPSBhWzEwXTtcbiAgYlsxMV0gPSBhWzExXTtcbiAgYlsxMl0gPSBhWzEyXTtcbiAgYlsxM10gPSBhWzEzXTtcbiAgYlsxNF0gPSBhWzE0XTtcbiAgYlsxNV0gPSBhWzE1XTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWF0cml4KCkge1xuICAgIHZhciBkYXRhID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIGEgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB2YXIgYiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIGFzc2lnbklkZW50aXR5KGRhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IGRhdGEsXG5cbiAgICAgIGFzQ1NTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNzcyA9ICdtYXRyaXgzZCgnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyArK2kpIHtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YVtpXSkgPCAwLjAwMDEpIHtcbiAgICAgICAgICAgIGNzcyArPSAnMCwnO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIGNzcyArPSBkYXRhW2ldLnRvRml4ZWQoMTApICsgJywnO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRhdGFbMTVdKSA8IDAuMDAwMSkge1xuICAgICAgICAgIGNzcyArPSAnMCknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzcyArPSBkYXRhWzE1XS50b0ZpeGVkKDEwKSArICcpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzO1xuICAgICAgfSxcblxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NpZ25JZGVudGl0eShkYXRhKTtcbiAgICAgIH0sXG5cbiAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSwgeikge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblRyYW5zbGF0ZShiLCB4LCB5LCB6KTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVYOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWChiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVZOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWShiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICByb3RhdGVaOiBmdW5jdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgICAgYXNzaWduUm90YXRlWihiLCByYWRpYW5zKTtcbiAgICAgICAgYXNzaWduZWRNYXRyaXhNdWx0aXBsaWNhdGlvbihhLCBiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICBzY2FsZTogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgYSk7XG4gICAgICAgIGFzc2lnblNjYWxlKGIsIHgsIHkpO1xuICAgICAgICBhc3NpZ25lZE1hdHJpeE11bHRpcGxpY2F0aW9uKGEsIGIsIGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICBza2V3OiBmdW5jdGlvbihheCwgYXkpIHtcbiAgICAgIGNvcHlBcnJheShkYXRhLCBhKTtcbiAgICAgIGFzc2lnblNrZXcoYiwgYXgsIGF5KTtcbiAgICAgIGFzc2lnbmVkTWF0cml4TXVsdGlwbGljYXRpb24oYSwgYiwgZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG59XG5cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNYXRyaXg7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNYXRyaXg7XG4iLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgY29uc29sZSBIVE1MRWxlbWVudCovXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuaW1wb3J0IGNyZWF0ZU1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gZWxlbWVudDogVGhlIGVsZW1lbnQgdG8gU2Nyb2xsaWZ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cbiAgICBpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSkgeyByZXR1cm4gdGhpcy5hY3RpdmUgPSBmYWxzZTsgfVxuICAgIC8vIGlmICghdHJhbnNmb3JtKSB7IHRocm93ICdTY3JvbGxpZnkgW2Vycm9yXTogdHJhbnNmb3JtcyBub3Qgc3VwcG9ydGVkJzsgfVxuICAgIC8vIGlmICghZWxlbWVudCkgeyB0aHJvdyAnU2Nyb2xsaWZ5IFtlcnJvcl06IGNvdWxkIG5vdCBmaW5kIGVsZW1lbnQnOyB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2NlbmVzID0gW107XG4gICAgdGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubWF0cml4ID0gY3JlYXRlTWF0cml4KCk7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0ge1xuICAgICAgc2NhbGU6IFsxLDFdLFxuICAgICAgcm90YXRpb246IFswLDAsMF0sXG4gICAgICBwb3NpdGlvbjogWzAsMCwwXVxuICAgICAgLy8gdHJhbnNmb3JtT3JpZ2luOiBbXSxcbiAgICAgIC8vIHNrZXc6IFtdLFxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IFNjZW5lIHRvIHRoZSBTY3JvbGxpZnkgb2JqZWN0LiBTY2VuZSBpbmZvcm1hdGlvbiBpbmNsdWRlcyB3aGVuXG4gICAqIHRvIHN0YXJ0IGFwcGx5aW5nIGFuIGVmZmVjdCBhbmQgZm9yIGhvdyBsb25nLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdHM6IFZhcmlvdXMgb3B0aW9ucyB0byBhcHBseSB0byB0aGUgbmV3IFNjZW5lOlxuICAgKlxuICAgKiAgIHN0YXJ0OiAocmVxdWlyZWQpIFdoZW4gdG8gc3RhcnQgdGhlIGVmZmVjdC4gSXQgaXMgYSAwIC0gMSB2YWx1ZVxuICAgKiAgICAgICAgICByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KS5cbiAgICogICAgICAgICAgQW55IGVmZmVjdHMgaW4gdGhlIFNjZW5lIHdpbGwgYmVnaW4gd2hlbiB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqICAgICAgICAgIGNyb3NzZXMgdGhpcyB0aHJlc2hvbGQuXG4gICAqXG4gICAqICAgZHVyYXRpb246IFRoZSBsZW5ndGggb2YgdGhlIGVmZmVjdCwgaW4gcGl4ZWxzLiBTY3JvbGxpZnkgd2lsbFxuICAgKiAgICAgICAgICBpbnRlcnBvbGF0ZSB0aGF0IGludG8gdmFsdWUgaW50byBhIFwicHJvZ3Jlc3NcIiB2YXJpYWJsZSwgYm91bmRlZFxuICAgKiAgICAgICAgICBieSAwIC0gMS4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZVxuICAgKiAgICAgICAgICB2aWV3cG9ydCArIGVsZW1lbnQgaGVpZ2h0LCBtZWFuaW5nIHRoZSBlZmZlY3Qgd2lsbCBsYXN0IGZvciBhc1xuICAgKiAgICAgICAgICBsb25nIGFzIHRoZSBlbGVtZW50IGlzIHZpc2libGUuXG4gICAqXG4gICAqICAgdHJpZ2dlcjogSWYgc3VwcGxpZWQsIFNjcm9sbGlmeSB3aWxsIHVzZSB0aGlzIGVsZW1lbnQncyBwb3NpdGlvbiB0b1xuICAgKiAgICAgICAgICBzdGFydCBhbnkgU2NlbmUgZWZmZWN0cy4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCBpcyB0byB1c2VcbiAgICogICAgICAgICAgdGhlIGVsZW1lbnQgaXRzZWxmIGFzIGEgdHJpZ2dlci5cbiAgICpcbiAgICogICBlYXNpbmc6IEVhc2UgaW4vb3V0IG9mIGFuIGVmZmVjdC4gQW55IHZhbHVlIGZyb20gUm9iZXJ0IFBlbm5lcidzIGVhc2luZ1xuICAgKiAgICAgICAgICBmdW5jdGlvbnMgaXMgdmFsaWQuXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRTY2VuZShvcHRzKSB7XG4gICAgbGV0IHRyaWdnZXJQb3MgPSBvcHRzLnN0YXJ0IHx8IDA7XG4gICAgbGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgKyB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBlYXNpbmcgPSBvcHRzLmVhc2luZyB8fCBmYWxzZTtcbiAgICBsZXQgZWZmZWN0cyA9IG9wdHMuZWZmZWN0cyB8fCBbXTtcbiAgICBsZXQgdHJpZ2dlciA9IG9wdHMudHJpZ2dlciA/IG9wdHMudHJpZ2dlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gb3B0cy50cmlnZ2VyIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRzLnRyaWdnZXIpIDogdGhpcy5lbGVtZW50O1xuICAgIGxldCBhcHBseVRyYW5zZm9ybSA9IG9wdHMuYXBwbHlUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCA/IG9wdHMuYXBwbHlUcmFuc2Zvcm0gOiB0cnVlOyAgIC8vIG9wdCBvdXQgcmF0aGVyIHRoYW4gb3B0IGluXG4gICAgbGV0IHNjZW5lID0ge1xuICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgICAgIHRyaWdnZXJQb3M6IDEgLSB0cmlnZ2VyUG9zLFxuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgZWFzaW5nOiBlYXNpbmcsXG4gICAgICBhcHBseVRyYW5zZm9ybTogYXBwbHlUcmFuc2Zvcm0sXG4gICAgICBlZmZlY3RzOiBbXVxuICAgIH07XG5cbiAgICAvLyBzY2VuZS5hY3RpdmUgPSB0aGlzLnNjcm9sbCA+IHRoaXMuY2FsY3VsYXRlU3RhcnQoc2NlbmUpOyAvLyBjYWxjdWxhdGUgYW55IHRyYW5zZm9ybWF0aW9ucyBpZiB0aGUgc2NlbmUgaGFzIGFscmVhZHkgcGFzc2VkLlxuXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYWxjdWxhdGVTdGFydChzY2VuZSk7XG4gICAgc2NlbmUuc3RhdGUgPSAodGhpcy5zY3JvbGwgPiBzdGFydCkgPyAodGhpcy5zY3JvbGwgPiBzdGFydCtkdXJhdGlvbikgPyAnYWZ0ZXInIDogJ2FjdGl2ZScgOiAnYmVmb3JlJztcblxuXG4gICAgZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4ge1xuICAgICAgdGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcbiAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBlYWNoIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBUaGUgc2NlbmUgdG8gdXBkYXRlLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdXBkYXRlU2NlbmUoc2NlbmUpIHtcbiAgICBzY2VuZS5zdGFydCA9IHRoaXMuY2FsY3VsYXRlU3RhcnQoc2NlbmUpO1xuICAgIHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBlZmZlY3Q6IFRoZSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiB0byBhcHBseS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogT2JqZWN0IGNvbnRhaW5pbmcgc3RhcnQgYW5kIGR1cmF0aW9uIGluZm9ybWF0aW9uLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgYWRkRWZmZWN0KGVmZmVjdCwgb3B0aW9ucyA9IHt9LCBzY2VuZSkge1xuICAgIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIGxldCB0cmFuc2Zvcm1zID0gdGhpcy50cmFuc2Zvcm1zO1xuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgaWYgKHRoaXMuc2NlbmVzLmxlbmd0aCkge1xuICAgICAgICAvLyB1c2UgdGhlIG1vc3QgcmVjZW50bHkgYWRkZWQgc2NlbmVcbiAgICAgICAgc2NlbmUgPSB0aGlzLnNjZW5lc1t0aGlzLnNjZW5lcy5sZW5ndGggLSAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9yIGlmIG5vIHNjZW5lIChpZSBcImFkZEVmZmVjdFwiIHdhcyBjYWxsZWQgZGlyZWN0bHkgb24gU2Nyb2xsaWZ5KSwgc2V0IHVwIGEgZGVmYXVsdCBvbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU2NlbmUoe1xuICAgICAgICAgICdlZmZlY3RzJzogW3snbmFtZSc6IGVmZmVjdCwgJ29wdGlvbnMnOiBvcHRpb25zfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgIC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgJ29wdGlvbnMnOiBvcHRpb25zLFxuICAgICAgICAgICdlbGVtZW50JzogZWxlbWVudCxcbiAgICAgICAgICAndHJhbnNmb3Jtcyc6IHRyYW5zZm9ybXNcbiAgICAgICAgfTtcblxuICAgICAgICBmbi5jYWxsKGNvbnRleHQsIHRoaXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBzY2VuZS5lZmZlY3RzLnB1c2goY3VycnkoZWZmZWN0LCBvcHRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHN0YXJ0IHBvaW50IG9mIGVhY2ggc2NlbmUuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gc2NlbmUgQSBTY3JvbGxpZnkgU2NlbmUgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIFNjZW5lLCBpbiBwaXhlbHMuXG4gICAqL1xuICBjYWxjdWxhdGVTdGFydChzY2VuZSkge1xuICAgIGxldCB0cmlnZ2VyID0gc2NlbmUudHJpZ2dlcjtcbiAgICBsZXQgdHJpZ2dlclBvcyA9IHNjZW5lLnRyaWdnZXJQb3M7XG4gICAgbGV0IHRvcCA9IDA7XG5cbiAgICBkbyB7XG4gICAgICB0b3AgKz0gdHJpZ2dlci5vZmZzZXRUb3AgfHwgMDtcbiAgICAgIHRyaWdnZXIgPSB0cmlnZ2VyLm9mZnNldFBhcmVudDtcbiAgICB9IHdoaWxlKHRyaWdnZXIpO1xuICAgIC8vIHRvcCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgdG9wIC0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUuLi4/KVxuICB9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMudGlja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2godGhpcy51cGRhdGVTY2VuZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuc2NlbmVzLmZvckVhY2godGhpcy5jYWxjdWxhdGUsIHRoaXMpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gYXMgd2VsbCBhcyBhbiBBcnJheSBvZlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbnMgdG8gYXBwbHkuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjYWxjdWxhdGUoc2NlbmUpIHtcbiAgICBsZXQgc3RhcnQgPSBzY2VuZS5zdGFydDtcbiAgICBsZXQgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbjtcbiAgICBsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGxldCBtYXRyaXg7XG5cbiAgICAvLyBhZnRlciBlbmRcbiAgICBpZiAoc2Nyb2xsIC0gc3RhcnQgPiBkdXJhdGlvbikge1xuICAgICAgaWYgKHNjZW5lLnN0YXRlICE9PSAnYWZ0ZXInKSB7ICAgIC8vIGRvIG9uZSBmaW5hbCBpdGVyYXRpb25cbiAgICAgICAgc2NlbmUuc3RhdGUgPSAnYWZ0ZXInO1xuICAgICAgICBwcm9ncmVzcyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAvLyBiZWZvcmUgc3RhcnRcbiAgICB9IGVsc2UgaWYgKHNjcm9sbCAtIHN0YXJ0IDwgMCkge1xuICAgICAgaWYgKHNjZW5lLnN0YXRlICE9PSAnYmVmb3JlJykgeyAgICAvLyBkbyBvbmUgZmluYWwgaXRlcmF0aW9uXG4gICAgICAgIHNjZW5lLnN0YXRlID0gJ2JlZm9yZSc7XG4gICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgIC8vIGFjdGl2ZVxuICAgIH0gZWxzZSB7XG4gICAgICBzY2VuZS5zdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgaWYgKHNjZW5lLmVhc2luZykgeyAvLyAgICAgICAgICAgIHN0YXJ0LCBmcm9tLCB0bywgZW5kXG4gICAgICAgIHByb2dyZXNzID0gc2NlbmUuZWFzaW5nKHNjcm9sbCAtIHN0YXJ0LCAwLCAxLCBkdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9ncmVzcyA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuICAgIHNjZW5lLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG4gICAgICBlZmZlY3QuY2FsbChwcm9ncmVzcyk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2NlbmUuYXBwbHlUcmFuc2Zvcm0pIHtcbiAgICAgIC8vIHRyYW5zbW9ncmlmeSBhbGwgYXBwbGllZCB0cmFuc2Zvcm1hdGlvbnMgaW50byBhIHNpbmdsZSBtYXRyaXgsIGFuZCBhcHBseVxuICAgICAgbWF0cml4ID0gdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1dID0gbWF0cml4LmFzQ1NTKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvb3AgdGhyb3VnaCBhbGwgdGhlIGVsZW1lbnQncyB0cmFuc2Zvcm1hdGlvbiBkYXRhIGFuZCBjYWxjdWxhdGVzIGEgbWF0cml4IHJlcHJlc2VudGluZyBpdC5cbiAgICogQHJldHVybiB7TWF0cml4fSBZZSBvbGRlIE1hdHJpeFxuICAgKi9cbiAgdXBkYXRlTWF0cml4KCkge1xuICAgIGxldCB0ID0gdGhpcy50cmFuc2Zvcm1zO1xuICAgIGxldCBtID0gdGhpcy5tYXRyaXg7XG5cbiAgICBtLmNsZWFyKCk7XG5cbiAgICAvLyBoZXJlIHdlIGFkanVzdCB0aGUgdHJhbnNmb3JtT3JpZ2luIC4uLlxuICAgIGlmICh0LnRyYW5zZm9ybU9yaWdpbikge1xuICAgICAgbS50cmFuc2xhdGUoLXQudHJhbnNmb3JtT3JpZ2luWzBdLCAtdC50cmFuc2Zvcm1PcmlnaW5bMV0sIC10LnRyYW5zZm9ybU9yaWdpblsyXSk7XG4gICAgfVxuXG4gICAgaWYgKHQuc2NhbGUpIHtcbiAgICAgIG0uc2NhbGUodC5zY2FsZVswXSwgdC5zY2FsZVsxXSk7XG4gICAgfVxuXG4gICAgaWYgKHQuc2tldykge1xuICAgICAgbS5za2V3KHQuc2tld1swXSwgdC5za2V3WzFdKTtcbiAgICB9XG5cbiAgICBpZiAodC5yb3RhdGlvbikge1xuICAgICAgbS5yb3RhdGVYKHQucm90YXRpb25bMF0pO1xuICAgICAgbS5yb3RhdGVZKHQucm90YXRpb25bMV0pO1xuICAgICAgbS5yb3RhdGVaKHQucm90YXRpb25bMl0pO1xuICAgIH1cblxuICAgIGlmICh0LnBvc2l0aW9uKSB7XG4gICAgICBtLnRyYW5zbGF0ZSh0LnBvc2l0aW9uWzBdLCB0LnBvc2l0aW9uWzFdLCB0LnBvc2l0aW9uWzJdKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIElGIHdlIHdpc2hlZCB0byBwZXJmb3JtIHJvdGF0aW9uIEFGVEVSIHNrZXcgLyBwb3NpdGlvbiAvIGV0Yywgd2UgY291bGQgZG8gaXQgaGVyZS5cbiAgICAvLyBUaGUgb3JkZXJpbmcgaXMgaW1wb3J0YW50LCBhbmQgaGFzIGFuIGVmZmVjdC5cblxuICAgIC8vIGlmICh0LnJvdGF0aW9uUG9zdCkge1xuICAgIC8vICAgbS5yb3RhdGVYKHQucm90YXRpb25Qb3N0WzBdKTtcbiAgICAvLyAgIG0ucm90YXRlWSh0LnJvdGF0aW9uUG9zdFsxXSk7XG4gICAgLy8gICBtLnJvdGF0ZVoodC5yb3RhdGlvblBvc3RbMl0pO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0LnNjYWxlUG9zdCkge1xuICAgIC8vICAgbS5zY2FsZSh0LnNjYWxlUG9zdFswXSwgdC5zY2FsZVBvc3RbMV0pO1xuICAgIC8vIH1cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvLyAuLi4gYW5kIGhlcmUgd2UgcHV0IGl0IGJhY2suIChUaGlzIGR1cGxpY2F0aW9uIGlzIG5vdCBhIG1pc3Rha2UpLlxuICAgIGlmICh0LnRyYW5zZm9ybU9yaWdpbikge1xuICAgICAgbS50cmFuc2xhdGUodC50cmFuc2Zvcm1PcmlnaW5bMF0sIHQudHJhbnNmb3JtT3JpZ2luWzFdLCB0LnRyYW5zZm9ybU9yaWdpblsyXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG07XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZSBTY3JvbGxpZnktaW5nLiBQZXJoYXBzIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIC8gbW9iaWxlIGRldmljZXMuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cblxuIiwiLyoqXG4gKiBQdXQgU2Nyb2xsaWZ5IGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xuaW1wb3J0ICogYXMgZnggZnJvbSAnLi9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGVhc2luZ3MgZnJvbSAnLi9lYXNpbmdzJztcblxuc2Nyb2xsaWZ5LmZ4ID0gZng7XG5zY3JvbGxpZnkuZWFzaW5ncyA9IGVhc2luZ3M7XG5cbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG5cbiIsIi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xuXG5sZXQgdHJhbnNmb3JtID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ10uZmluZCgodCkgPT4ge1xuICByZXR1cm4gKGRvY3VtZW50LmJvZHkuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtOyJdfQ==
