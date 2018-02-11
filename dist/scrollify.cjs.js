'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

var transform;
var dummy = document.createElement('div');        // we use this instead of document.body if the DOM is not yet ready

['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].forEach(function (t) {
  if (dummy.style[t] !== undefined) { transform = t; }
});


/**
 * getUnit(), from anime.js
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
 */
function getUnit(val) {
  var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

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


var assignRotateY = function(matrix, rad) {
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

      asCSS: function() {
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

      clear: function() {
        assignIdentity(data);
      },

      translate: function(x, y, z) {
        copyArray(data, a);
        assignTranslate(b, x, y, z);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateX: function(radians) {
        copyArray(data, a);
        assignRotateX(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateY: function(radians) {
        copyArray(data, a);
        assignRotateY(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateZ: function(radians) {
        copyArray(data, a);
        assignRotateZ(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      scale: function(x, y) {
        copyArray(data, a);
        assignScale(b, x, y);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

    skew: function(ax, ay) {
      copyArray(data, a);
      assignSkew(b, ax, ay);
      assignedMatrixMultiplication(a, b, data);
      return this;
    }
  };
}

/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016, 2017 Wes Hatch
 * Licensed under the MIT license.
 *
 */

// import { getUnit } from './normalize';


/**
 * The Scrollify Class
 */
var Scrollify$1 = function Scrollify(element) {
  var this$1 = this;

  if (element instanceof HTMLElement == false) { element = document.querySelector(element); }
  if (!element || !transform) {
    console.log('Scrollify [error] ', arguments[0]);
    return this.disable();
  }

  this.element = element;
  this.ticking = false;
  this.scenes = [];
  this.scroll = window.scrollY || window.pageYOffset;
  this.active = true;
  this.matrix = createMatrix();
  this.transforms = {
    scale: [1,1],
    rotation: [0,0,0],
    position: [0,0,0],
    // transformOrigin: [0,0,0]
    // skew: [],
  };

  window.addEventListener('scroll', function () { return this$1.onScroll(); }, { passive: true });
  window.addEventListener('resize', function () { return this$1.onResize(); }, { passive: true });
};

/**
 * Add a new Scene to the Scrollify object. Scene information includes when
 * to start applying an effect and for how long.
 * @param{Object} opts: Various options to apply to the new Scene:
 *
 *   start: (required) When to start the effect. It is a 0 - 1 value
 *          representing the percentage of the viewport (eg. 0.5).
 *          Any effects in the Scene will begin when the trigger element
 *          crosses this threshold.
 *
 *duration: The length of the effect, in pixels. Scrollify will
 *          interpolate that into value into a "progress" variable, bounded
 *          by 0 - 1. If not supplied, the default value is the height of
 *          the viewport + element height, meaning the effect will last for
 *          as long as the element is visible.
 *
 * trigger: If supplied, Scrollify will use this element's position to
 *          start any Scene effects. If not supplied, the default is to use
 *          the element itself as a trigger.
 *
 *  easing: Ease in/out of any effects in the Scene.
 *
 * @return {void}
 */
Scrollify$1.prototype.addScene = function addScene (opts) {
    var this$1 = this;

  var trigger = opts.trigger ? opts.trigger instanceof HTMLElement ? opts.trigger : document.querySelector(opts.trigger) : this.element;
  var easing = opts.easing || false;
  var effects = opts.effects || [];
  var scene = {
    _trigger: trigger,                // keep for internal calculations
    _applyTransform: false,           // internal-use only. Whether to use matrix transforms or not. Perhaps should be moved to *effect* level
    _offset: opts.start || 0,         // store original value for later calcs
    _duration: opts.duration || 1,    // store original value for later calculations
    // start: 0,                      // absolute value in px. Some percentage of the viewport
    // duration: duration,            // absolute value in px. Some percentage of the viewport
    easing: easing,
    effects: []
  };

  effects.map(function (effect) {
    this$1.addEffect(effect.fn, effect.options, scene);
  });

  this.calculateStart(scene);
  this.calculateDuration(scene);

  scene.state = (this.scroll > this.start) ? (this.scroll > this.start + scene.duration) ? 'after' : 'active' : 'before';

  this.calculate(scene);
  this.scenes.push(scene);

  if (opts.debug) {
    console.log('Scrollify scene: ', scene);
  }

  return this;
};

/**
 * Update each scene.
 * @param{Object} scene: The scene to update.
 * @return {void}
 */
Scrollify$1.prototype.updateScene = function updateScene (scene) {
  this.calculateStart(scene);
  this.calculateDuration(scene);
  this.calculate(scene);
};

/**
 * Add a particular transformation to a scene.
 * @param{Function} effect: The transformation function to apply.
 * @param{Object} options: Any transformation options.
 * @param{Object} scene: Object containing start and duration information.
 * @return {void}
 */
Scrollify$1.prototype.addEffect = function addEffect (fn, options, scene) {
    if ( options === void 0 ) options = {};

  var element = this.element;
  var transforms = this.transforms;
  var context = { options: options, element: element, transforms: transforms };

  if (!scene) {
    if (this.scenes.length) {
      // use the most recently added scene
      scene = this.scenes[this.scenes.length - 1];
    } else {
      // or if no scene (ie "addEffect" was called directly on Scrollify), set up a default one
      return this.addScene({
        'effects': [{'fn': fn, 'options': options}]
      });
    }
  }

  // if any effect uses a matrix tranformation, we use true for the entire scene
  scene._applyTransform = scene._applyTransform || fn._applyTransform;
  scene.effects.push(fn.bind(context));
  // scene.effects.push(() => { fn.call(context); });

  return this;
};

/**
 * Calculate the start point of each scene.
 * @param{Scrollify.Scene} scene A Scrollify Scene object.
 * @return {Integer} The start position of the Scene, in pixels.
 */
Scrollify$1.prototype.calculateStart = function calculateStart (scene) {
  var offset = window.innerHeight - this.mapTo(scene._offset, window.innerHeight);
  var trigger = scene._trigger;
  var top = 0;

  do {
    top += trigger.offsetTop || 0;
    trigger = trigger.offsetParent;
  } while(trigger);
  // var test = trigger.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);

  scene.start = Math.max(0, top - offset);
};

/**
 * [mapTo description]
 * @param{[type]} input [description]
 * @param{[type]} scale [description]
 * @return {[type]}     [description]
 */
Scrollify$1.prototype.mapTo = function mapTo (input, scale) {
  var parsed = parseFloat(input);
  var unit = getUnit(input);

  switch (unit) {
    case 'px':
      return parsed;
    case '%':
      return parsed / 100.0 * scale;
    default:
      return parsed * scale;
  }
};

/**
 * [calculateDuration description]
 * @param{[type]} scene [description]
 * @return [type]       [description]
 */
Scrollify$1.prototype.calculateDuration = function calculateDuration (scene) {
  scene.duration = (typeof scene._duration === 'function') ?
    scene._duration(scene._trigger) :
    this.mapTo(scene._duration, window.innerHeight + this.element.offsetHeight);
};

/**
 * onScroll Handler
 * @return {void}
 */
Scrollify$1.prototype.onScroll = function onScroll () {
  if (!this.active) { return; }

  this.scroll = window.scrollY || window.pageYOffset;
  this.direction = (this.scroll > this.previousScroll) ? 'down' : 'up';
  this.previousScroll = this.scroll;

  if (!this.ticking) {
    window.requestAnimationFrame(this.update.bind(this));
    // window.requestAnimationFrame(() => { this.update(); });
    this.ticking = true;
  }
};

/**
 * onResize Handler
 * @return {void}
 */
Scrollify$1.prototype.onResize = function onResize () {
  this.scenes.forEach(this.updateScene, this);
};

/**
 * Update the transformations for every scene.
 * @return {void}
 */
Scrollify$1.prototype.update = function update () {
  this.scenes.forEach(this.calculate, this);
  this.ticking = false;
};

/**
 * Calculate the transformations for each scene.
 * @param{Object} scene: An Object containing start and duration
 *                       information as well as an Array of
 *                       transformations to apply.
 * @return {void}
 */
Scrollify$1.prototype.calculate = function calculate (scene) {
  var start = scene.start;
  var duration = scene.duration;
  var scroll = this.scroll;
  var progress;

  // after end
  if (scroll - start > duration) {
    if (scene.state !== 'after') {  // do one final iteration
      scene.state = 'after';
      progress = 1;
    } else {
      return;
    }

  // before start
  } else if (scroll - start < 0) {
    if (scene.state !== 'before') {  // do one final iteration
      scene.state = 'before';
      progress = 0;
    } else {
      return;
    }

  // active
  } else {
    scene.state = 'active';
    if (scene.easing) { //          start, from, to, end
      progress = scene.easing(scroll - start, 0, 1, duration);
    } else {
      progress = (scroll - start) / duration;
    }
  }

  // cycle through any registered transformations
  scene.effects.forEach(function (effect) {
    effect(progress);
  });

  if (scene._applyTransform) {
    // transmogrify all applied transformations into a single matrix, and apply
    var matrix = this.updateMatrix();
    this.element.style[transform] = matrix.asCSS();
  }
};

/**
 * Loop through all the element's transformation data and calculates a matrix representing it.
 * @return {Matrix} Ye olde Matrix
 */
Scrollify$1.prototype.updateMatrix = function updateMatrix () {
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

  // ... and here we put it back. (This duplication is not a mistake).
  if (t.transformOrigin) {
    m.translate(t.transformOrigin[0], t.transformOrigin[1], t.transformOrigin[2]);
  }

  return m;
};

/**
 * Disable Scrollify-ing. Perhaps for performance reasons / mobile devices.
 * @return {void}
 */
Scrollify$1.prototype.disable = function disable () {
  this.active = false;
};

/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize and are curried in via "this".
 *
 * NOTE: for all functions herein, "this" contains effect options, a
 * transformation Object, and also a reference to the element.
 */

/*global console*/
/*eslint no-invalid-this: "error"*/

// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
[translateX, translateY, rotate, scale, parallax].forEach(function (fn) {
  fn._applyTransform = true;
});


/**
 * Translate an element along the X-axis.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function translateX(progress) {
  var to = (this.options.to !== undefined) ? this.options.to : 0;
  var from = (this.options.from !== undefined) ? this.options.from : 0;
  var offset = (to - from) * progress + from;

  this.transforms.position[0] = offset;
}

/**
 * Translate an element vertically.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function translateY(progress) {
  var to = (this.options.to !== undefined) ? this.options.to : 0;
  var from = (this.options.from !== undefined) ? this.options.from : 0;// this.transforms.position[1];
  var offset = (to - from) * progress + from;

  this.transforms.position[1] = offset;
}

// export function translate(progress) {
//   const to = this.options.to;
//   const from = this.options.from;
//   const offsetX = (to[0] - from[0]) * progress + from[0];
//   const offsetY = (to[1] - from[1]) * progress + from[1];
//
//   this.transforms.position[0] = offsetX;
//   this.transforms.position[1] = offsetY;
// }

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function rotate(progress) {
  var radians = this.options.rad * progress;

  this.transforms.rotation[2] = radians;
}

/**
 * Uniformly scale an element along both axis'.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function scale(progress) {
  var to = (this.options.to !== undefined) ? this.options.to : 1;
  var from = (this.options.from !== undefined) ? this.options.from : this.transforms.scale[0];
  var scale = (to - from) * progress + from;

  this.transforms.scale[0] = scale;
  this.transforms.scale[1] = scale;
}

/**
 * Update an element's opacity.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function fade(progress) {
  var to = (this.options.to !== undefined) ? this.options.to : 0;
  var from = (this.options.from !== undefined) ? this.options.from : 1;
  var opacity = (to - from) * progress + from;

  this.element.style.opacity = opacity;
}

/**
 * Update an element's blur.
 * @param {Float} progress  Current progress of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function blur(progress) {
  var to = (this.options.to !== undefined) ? this.options.to : 0;
  var from = (this.options.from !== undefined) ? this.options.from : 0;
  var amount = (to - from) * progress + from;

  this.element.style.filter = 'blur(' + amount + 'px)';
}

/**
 * Parallax an element.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
function parallax(progress) {
  var range = this.options.range || 0;
  var offset = progress * range;        // TODO add provision for speed as well

  this.transforms.position[1] = offset;   // just vertical for now
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

  times.forEach(function(time) {
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
  var currentState = element._currentState || null; // store prop on element

  if (progress <= 0) {
    setState(element, 'normal');
  } else if (progress >= 1) {
    setState(element, 'bottom');
  } else {
    setState(element, 'sticky');
  }

  function setState(element, state) {
    if (currentState === state) { return; }
    if (state == 'sticky') {
      var BCR = element.getBoundingClientRect();

      element.style.top = BCR.top + 'px';
      element.style.left = BCR.left + 'px';
      element.style.width = BCR.width + 'px';
    } else {
      element.style.top = '';
      element.style.left = '';
      element.style.width = '';
    }

    element.classList.remove(currentState);
    element.classList.add(state);
    element._currentState = state;
  }
}


var effects = Object.freeze({
	translateX: translateX,
	translateY: translateY,
	rotate: rotate,
	scale: scale,
	fade: fade,
	blur: blur,
	parallax: parallax,
	toggle: toggle,
	stick: stick
});

/*eslint max-len: ["error", 120]*/

function oscillate(t, b, c, d) {
  var i = 4;            // # of bounces
  t /= d;               // percentage
  t = Math.PI * i * t;  // go from 0 -> 2π
  t = Math.sin(t) * c;  // now, oscillates between c, -c
  t = Math.abs(t);      // "half wave rectifier"
  return t + b;
}

function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
  if ((t  /=  d / 2) < 1) { return c / 2 * t * t + b; }
  return -c / 2 * (--t * (t - 2) - 1) + b;
}

function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) { return c / 2 * t * t * t + b; }
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}

function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) { return c / 2 * t * t * t * t + b; }
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function easeInQuint(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) { return c / 2 * t * t * t * t * t + b; }
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
  if (t == 0) { return b; }
  if (t == d) { return b + c; }
  if ((t /= d / 2) < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) { return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; }
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

function easeInElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) { return b; }
  if ((t /= d) == 1) { return b + c; }
  if (!p) { p = d * .3; }
  if (a < Math.abs(c)) {
    a = c; var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  return -(a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

function easeOutElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) { return b; }
  if ((t /= d) == 1) { return b + c; }
  if (!p) { p = d * .3; }
  if (a < Math.abs(c)) {
    a = c; var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  return a * Math.pow(2,-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}

function easeInOutElastic(t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) { return b; }
  if ((t /= d / 2) == 2) { return b + c; }
  if (!p) { p = d * (.3 * 1.5); }
  if (a < Math.abs(c)) {
    a = c; var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  if (t < 1) { return -.5 * (a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; }
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

function easeInBack(t, b, c, d, s) {
  if (s == undefined) { s = 1.70158; }
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(t, b, c, d, s) {
  if (s == undefined) { s = 1.70158; }
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) { s = 1.70158; }
  if ((t /= d / 2) < 1) { return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b; }
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


var easings = Object.freeze({
	oscillate: oscillate,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
	easeInOutQuad: easeInOutQuad,
	easeInCubic: easeInCubic,
	easeOutCubic: easeOutCubic,
	easeInOutCubic: easeInOutCubic,
	easeInQuart: easeInQuart,
	easeOutQuart: easeOutQuart,
	easeInOutQuart: easeInOutQuart,
	easeInQuint: easeInQuint,
	easeOutQuint: easeOutQuint,
	easeInOutQuint: easeInOutQuint,
	easeInSine: easeInSine,
	easeOutSine: easeOutSine,
	easeInOutSine: easeInOutSine,
	easeInExpo: easeInExpo,
	easeOutExpo: easeOutExpo,
	easeInOutExpo: easeInOutExpo,
	easeInCirc: easeInCirc,
	easeOutCirc: easeOutCirc,
	easeInOutCirc: easeInOutCirc,
	easeInElastic: easeInElastic,
	easeOutElastic: easeOutElastic,
	easeInOutElastic: easeInOutElastic,
	easeInBack: easeInBack,
	easeOutBack: easeOutBack,
	easeInOutBack: easeInOutBack,
	easeOutBounce: easeOutBounce
});

/**
 * Put Scrollify into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */

exports['default'] = Scrollify$1;
exports.Scrollify = Scrollify$1;
exports.fx = effects;
exports.easings = easings;
