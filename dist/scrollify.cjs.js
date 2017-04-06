'use strict';

/**
 * Feature detection: CSS transforms
 * @type {Boolean}
 */

var dummy = document.createElement('div');        // we use this instead of document.body if the DOM is not yet ready
var transform = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find(function (t) {
  return (dummy.style[t] !== undefined);
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

function getUnit(val) {
  var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
  if (split) return split[2];
}

// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
var validTransforms = ['translateX', 'translateY', 'rotate', 'scale', 'parallax'];


/**
 * The Scrollify Class
 */
var Scrollify = function Scrollify(element) {
  var this$1 = this;

  if (element instanceof HTMLElement == false) { element = document.querySelector(element); }
  if (!element || !transform) { return this.active = false; }
  // if (!transform) { return new Error('Scrollify [error]: transforms not supported'); }
  // if (!element) { return new Error('Scrollify [error]: could not find element'); }

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

  window.addEventListener('scroll', function (e) { return this$1.onScroll(e); });
  window.addEventListener('resize', function (e) { return this$1.onResize(e); });
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
Scrollify.prototype.addScene = function addScene (opts) {
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

  scene.state = (this.scroll > this.start) ? (this.scroll > this.start+scene.duration) ? 'after' : 'active' : 'before';

  this.calculate(scene);
  this.scenes.push(scene);

  return this;
};

/**
 * Update each scene.
 * @param{Object} scene: The scene to update.
 * @return {void}
 */
Scrollify.prototype.updateScene = function updateScene (scene) {
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
Scrollify.prototype.addEffect = function addEffect (fn, options, scene) {
    if ( options === void 0 ) options = {};

  var element = this.element;
  var transforms = this.transforms;

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
  scene._applyTransform = scene._applyTransform || !!~validTransforms.indexOf(fn.name);

  var curry = function (fn, options) {
    return function() {     // NOTE: don't use => function here as we do NOT want to bind "this"
      var context = {
        'options': options,
        'element': element,
        'transforms': transforms
      };

      fn.call(context, this); // eslint-disable-line
    };
  };

  scene.effects.push(curry(fn, options));

  return this;
};

/**
 * Calculate the start point of each scene.
 * @param{Scrollify.Scene} scene A Scrollify Scene object.
 * @return {Integer} The start position of the Scene, in pixels.
 */
Scrollify.prototype.calculateStart = function calculateStart (scene) {
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

Scrollify.prototype.mapTo = function mapTo (input, scale) {
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
Scrollify.prototype.calculateDuration = function calculateDuration (scene) {
  // if (typeof scene._duration === 'function') { return scene._duration(); }
  scene.duration = this.mapTo(scene._duration, window.innerHeight + this.element.offsetHeight);
};

/**
 * onScroll Handler
 * @return {void}
 */
Scrollify.prototype.onScroll = function onScroll () {
  if (!this.active) { return; }
  this.scroll = window.scrollY || window.pageYOffset;

  if (!this.ticking) {
    window.requestAnimationFrame(this.update.bind(this));
    this.ticking = true;
  }
};

/**
 * onResize Handler
 * @return {void}
 */
Scrollify.prototype.onResize = function onResize () {
  this.scenes.forEach(this.updateScene, this);
};

/**
 * Update the transformations for every scene.
 * @return {void}
 */
Scrollify.prototype.update = function update () {
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
Scrollify.prototype.calculate = function calculate (scene) {
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
    effect.call(progress);
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
Scrollify.prototype.updateMatrix = function updateMatrix () {
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
  // m.rotateX(t.rotationPost[0]);
  // m.rotateY(t.rotationPost[1]);
  // m.rotateZ(t.rotationPost[2]);
  // }

  // if (t.scalePost) {
  // m.scale(t.scalePost[0], t.scalePost[1]);
  // }
  // -----------------------------------------------------


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
Scrollify.prototype.disable = function disable () {
  this.active = false;
};

module.exports = Scrollify;