var scrollify = (function (exports) {
'use strict';

/**
 * Debounce
 * @param {*} callback The function to execute
 * @param {*} wait The time to wait before the callback if fired.
 */


/**
 * getUnit(), from anime.js
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
 */
function getUnit(val) {
  var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

/**
  * [mapTo description]
  * @param  {any} input [description]
  * @param  {number} scale [description]
  * @return {number}       [description]
  */
function mapTo(input, scale) {
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

var transform = 'transform';


/**
 * Calculate the start point of each scene.
 * @param  {HTMLElement} trigger ....
 * @return {number} The start position of the Scene, in pixels.
 */
function calculateStart(trigger, offset) {
  if ( offset === void 0 ) offset = 0;

  var c = window.innerHeight - (offset * window.innerHeight);
  var top = trigger ? trigger.getBoundingClientRect().top + window.pageYOffset : 0;

  return Math.max(0, top - c);
}

/**
 * [calculateDuration description]
 * @param  {number|string|Function} d The duration, as a fixed px value, a % of the element, or a custom function
 * @param  {HTMLElement} el The element to Scrollify
 * @return [type]         [description]
 */
function calculateDuration(d, el) {
  if ( d === void 0 ) d = 1;

  return (typeof d === 'function') ?
    d(el) :
    mapTo(d, window.innerHeight + el.offsetHeight);
}



/**
 * The Scrollify Class
 */
var Scrollify$1 = function Scrollify(element) {
  var this$1 = this;

  if (element instanceof HTMLElement === false) {
    element = document.querySelector(element);
  }

  if (!element) {
    throw new Error('Scrollify requires an `element`');
  }

  this.element = element;
  this.ticking = false;
  this.scenes = [];
  this.active = true;
  this.matrix = createMatrix();
  this.transforms = {
    scale: [1,1],
    rotation: [0,0,0],
    position: [0,0,0],
    // transformOrigin: [0,0,0]
    // skew: [],
  };

  element.style.willChange = transform;

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
 */
Scrollify$1.prototype.addScene = function addScene (opts) {
    var this$1 = this;

  var trigger = opts.trigger;
    var easing = opts.easing;
    var effects = opts.effects;
    var start = opts.start;
    var duration = opts.duration;
  var ref = this;
    var element = ref.element;
    var transforms = ref.transforms;

  effects = effects || [];
  trigger = trigger ?
    trigger instanceof HTMLElement ?
      trigger :
      document.querySelector(trigger) :
    element;

  var scene = {
    start: 0,
    duration: 0,
    state: '',
    easing: easing,
    effects: effects.map(function (ref) {
        var fn = ref.fn;
        var options = ref.options;

        return fn({ options: options, element: element, transforms: transforms });
    }),
    reset: function () {
      var scroll = window.scrollY;
      scene.start = calculateStart(trigger, start);
      scene.duration = calculateDuration(duration, element);
      scene.state = (scroll > scene.start) ? (scroll > scene.start + scene.duration) ? 'after' : 'active' : 'before';
      this$1.update(scene);
    }
  };

  // internal-use only. Whether to use matrix transforms or not.
  // Perhaps should be moved to *effect* level
  scene.__applyTransform = effects.some(function (ref) {
      var fn = ref.fn;

      return fn.__applyTransform;
    });
  scene.reset();

  this.scenes.push(scene);

  if (opts.debug) {
    console.log('Scrollify scene: ', scene);
  }

  return this;
};

/**
 * Convenience method to add an effect directly to a scrollify'd element.
 * i.e. "addEffect" was called directly on Scrollify
 * @param{Function} fn The transformation function to apply.
 * @param{object} options Any transformation options.
 * @param{object} scene Object containing scene data.
 */
Scrollify$1.prototype.addEffect = function addEffect (fn, options, scene) {
    if ( options === void 0 ) options = {};

  var ref = this;
    var element = ref.element;
    var transforms = ref.transforms;

  if (!scene) {
    if (!this.scenes.length) this.addScene({});
    scene = this.scenes[this.scenes.length - 1];
  }

  scene.effects.push( fn({ options: options, element: element, transforms: transforms }) );
  scene.__applyTransform = scene.__applyTransform || fn.__applyTransform;
};

/**
 * onScroll Handler
 * TODO: debounce?
 */
Scrollify$1.prototype.onScroll = function onScroll () {
    var this$1 = this;

  if (!this.active) { return; }

  window.requestAnimationFrame(function () {
    this$1.scenes.forEach(function (s) { return this$1.update(s); }, this$1);
  });
};

/**
 * onResize handler
 * @return {void}
 */
Scrollify$1.prototype.onResize = function onResize () {
  this.scenes.forEach(function (s) { return s.reset(); });
};

/**
 * Update the transformation effects for each scene.
 * @param{object} scene The `scene` object.
 * @param{number} scene.start When the `scene` is active and effects calculated.
 * @param{number} scene.duration How long the scene is "active" for, in px.
 * @param{array} scene.effects An array of effects to apply to the `element`.
 * @param{string} scene.state A label for the scene's running state.
 * @param{function} scene.easing Custom easing for the progress value.
 */
Scrollify$1.prototype.update = function update (scene) {
  var start = scene.start;
    var duration = scene.duration;
    var easing = scene.easing;
    var effects = scene.effects;
  var scroll = window.scrollY;
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
      if (scene.start === 3050) console.log('setting to before', progress);
    } else {
      return;
    }

  // active
  } else {
    scene.state = 'active';
    if (easing) { //          start, from, to, end
      progress = easing(scroll - start, 0, 1, duration);
    } else {
      progress = (scroll - start) / duration;
    }
  }

  // cycle through any registered transformations
  effects.forEach(function (effect) { return effect(progress); });

  if (scene.__applyTransform) {
    // transmogrify all applied transformations into a single matrix, and apply
    this.element.style[transform] = this.updateMatrix().asCSS();
  }
};

/**
 * Loop through all the element's transformation data and calculates a matrix representing it.
 * @return {object} Ye olde Matrix
 */
Scrollify$1.prototype.updateMatrix = function updateMatrix () {
  var ref = this;
    var matrix = ref.matrix;
    var t = ref.transforms;

  matrix.clear();

  // here we adjust the transformOrigin ...
  if (t.transformOrigin) {
    matrix.translate(-t.transformOrigin[0], -t.transformOrigin[1], -t.transformOrigin[2]);
  }

  if (t.scale) {
    matrix.scale(t.scale[0], t.scale[1]);
  }

  if (t.skew) {
    matrix.skew(t.skew[0], t.skew[1]);
  }

  if (t.rotation) {
    matrix.rotateX(t.rotation[0]);
    matrix.rotateY(t.rotation[1]);
    matrix.rotateZ(t.rotation[2]);
  }

  if (t.position) {
    matrix.translate(t.position[0], t.position[1], t.position[2]);
  }

  // ... and here we put it back. (This duplication is not a mistake).
  if (t.transformOrigin) {
    matrix.translate(t.transformOrigin[0], t.transformOrigin[1], t.transformOrigin[2]);
  }

  return matrix;
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
 */


/**
 * Translate an element along the X-axis.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
var translateX = function (ref) {
  var options = ref.options;
  var transforms = ref.transforms;

  var to = (options.to !== undefined) ? options.to : 0;
  var from = (options.from !== undefined) ? options.from : 0;

  return function (progress) {
    transforms.position[0] = (to - from) * progress + from;
  };
};

/**
 * Translate an element vertically.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
var translateY = function (ref) {
  var options = ref.options;
  var transforms = ref.transforms;

  var to = (options.to !== undefined) ? options.to : 0;
  var from = (options.from !== undefined) ? options.from : 0;// this.transforms.position[1];

  return function (progress) {
    transforms.position[1] = (to - from) * progress + from;
  };
};

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
var rotate = function (ref) {
  var options = ref.options;
  var transforms = ref.transforms;

  return function (progress) {
    transforms.rotation[2] = options.rad * progress;
  };
};

/**
 * Uniformly scale an element along both axis'.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
var scale = function (ref) {
  var options = ref.options;
  var transforms = ref.transforms;

  var to = (options.to !== undefined) ? options.to : 1;
  var from = (options.from !== undefined) ? options.from : transforms.scale[0];

  return function (progress) {
    var scale = (to - from) * progress + from;

    transforms.scale[0] = scale;
    transforms.scale[1] = scale;
  };
};

/**
 * Update an element's opacity.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
var fade = function (ref) {
  var options = ref.options;
  var element = ref.element;

  var to = (options.to !== undefined) ? options.to : 0;
  var from = (options.from !== undefined) ? options.from : 1;

  return function (progress) {
    element.style.opacity = (to - from) * progress + from;
  };
};

/**
 * Update an element's blur.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
var blur = function (ref) {
  var options = ref.options;
  var element = ref.element;

  var to = (options.to !== undefined) ? options.to : 0;
  var from = (options.from !== undefined) ? options.from : 0;

  return function (progress) {
    var amount = (to - from) * progress + from;
    element.style.filter = 'blur(' + amount + 'px)';
  };
};

/**
 * Parallax an element.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
var parallax = function (ref) {
  var options = ref.options;
  var transforms = ref.transforms;

  var range = options.range || 0;

  return function (progress) {
    transforms.position[1] = progress * range;
  };
};

/**
 * Toggle a class on or off.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
var toggle = function (ref) {
  var options = ref.options;
  var element = ref.element;

  var times = Object.keys(options);

  return function (progress) {
    times.forEach(function (time) {
      var css = options[time];
      element.classList.toggle(css, progress > +time);
    });
  };
};

/**
 * Sticky Element: sets up a sticky element which toggles position 'fixed' on / off.
 * NOTE: this is a POC, a little CSS is also required
 * @param {object} context Setup options
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
var stick = function (ref) {
  var element = ref.element;

  function setState(state) {
    var currentState = element.__currentState; // store state on element

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
    element.__currentState = state;
  }

  return function (progress) {
    if (progress <= 0) {
      setState('normal');
    } else if (progress >= 1) {
      setState('bottom');
    } else {
      setState('sticky');
    }
  };
};


// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
[translateX, translateY, rotate, scale, parallax].forEach(function (fn) {
  Object.defineProperty(fn, '__applyTransform', { value: true });
});


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

return exports;

}({}));
