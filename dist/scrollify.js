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
exports.parallax = parallax;
exports.toggle = toggle;
exports.rotate = rotate;
exports.translateX = translateX;
exports.stick = stick;

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize, and are curried in via "this".
 * NOTE: don't use arrow fn's here as they proxy "this"
 * @type {Object}
 */

/**
 * Parallax an element.
 * @type {Object} opts: You may define parallax "speed" or parallax "range" (in pixels).
 * @return {void}
 */
function parallax(data) {
  var offset = 0;
  var opts = this.options;

  if (opts.speed !== undefined) {
    // check speed first
    offset = data.absolute * opts.speed;
  } else {
    // fallback to range
    offset = data.progress * (opts.range || 0); // default is "0", no effect
  }

  this.element.style[_transform2.default] = 'translate(0, ' + offset + 'px)';
}

/**
 * Toggle a class on or off.
 * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
 * @this: an object containing Options + element reference
 * @return {void}
 */
function toggle(data) {
  var opts = this.options;
  var element = this.element;
  var times = Object.keys(opts);
  var now = data.progress;

  times.forEach(function (time) {
    var css = opts[time];
    if (now > time) {
      element.classList.add(css);
    } else {
      element.classList.remove(css);
    }
  });
}

/**
 * [rotate description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function rotate(data) {
  var degrees = this.options.deg * data.progress;
  this.element.style.transform = 'rotate(' + degrees + 'deg)';
};

/**
 * Dummy effect for testing, at the moment
 */
function translateX(data) {
  var offset = data.absolute;
  var progress = data.progress;
  var delay = window.innerHeight; // start translating after one window-height of scrolling
  var distance = 500;

  offset = progress * distance;
  offset -= delay;

  this.el.style[_transform2.default] = 'translate3d(' + offset + 'px, 0, 0)';
}

/**
 * Sticky Element setsup a sticky element which toggle position fixed on / off.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function stick(data) {
  var progress = data.progress;
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
      applyStyles.call(element, BCR);
    } else {
      applyStyles.call(element, BCR, false);
    }

    element.className = '';
    // element.classList.remove(currentState);
    element.classList.add(state);

    currentState = state;
  }

  function applyStyles(styles) {
    var add = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


    // for (let prop in styles) {
    //   if (prop == 'bottom' || prop == 'right') { continue; }
    //   this.style[prop] = (add) ? styles[prop] + 'px' : '';
    // }
    this.style.top = add ? styles.top + 'px' : '';
    this.style.left = add ? styles.left + 'px' : '';
    this.style.width = add ? styles.width + 'px' : '';
    // this.style.height
    // this.style.position = (add) ? 'fixed' : 'absolute';             // OR, deal with this via CSS...?

    // if (this._stickyTop && add) {
    //   this.style.top = this._stickyTop + 'px';
    // }
  }

  // boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
  // copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
}

},{"./transform":6}],3:[function(require,module,exports){
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

// TODO add weakmap support for public / private methods

// import Sticky from './sticky';


var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _easings = require('./easings');

var ease = _interopRequireWildcard(_easings);

var _effects = require('./effects');

var effectList = _interopRequireWildcard(_effects);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Scrollify Class
 */

var Scrollify = function () {
	function Scrollify(element) {
		var _this = this;

		_classCallCheck(this, Scrollify);

		if (element instanceof HTMLElement == false) {
			element = document.querySelector(element);
		}
		if (!element || !_transform2.default) {
			return false;
		}

		this.element = element;
		this.ticking = false;
		this.scenes = [];
		this.scroll = window.scrollY;

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
			var effects = opts.effects || [];
			var trigger = document.querySelector(opts.trigger) || this.element; // .parentNode;
			var scene = {
				'active': true,
				'trigger': trigger,
				'triggerPos': 1 - triggerPos,
				'duration': duration,
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
			// VS. ?
			// top = trigger.getBoundingClientRect().top + window.scrollY;

			scene.start = top - triggerPos * window.innerHeight; // (can be negative)

			this.calculate(scene);
		}

		/**
   * Add a particular transformation to a scene.
   * @param  {String|Function} name: The name of the transformation OR an actual function to apply.
   * @param  {Object} options: Any transformation options.
   * @return {void}
   */

	}, {
		key: 'addEffect',
		value: function addEffect(name) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var scene = arguments[2];

			var element = this.element;

			if (!scene) {
				if (this.scenes.length) {
					scene = this.scenes[this.scenes.length - 1]; // use the most recently added scene
				} else {
						return this.addScene({ // or if no scene (ie "addEffect" was called directly on Scrollify), set up a default one
							'effects': [{ 'name': name, 'options': options }]
						});
					}
			}

			var effect = typeof name == 'function' ? name : effectList[name];
			var curry = function curry(fn, options) {
				return function () {
					// NOTE: don't use => function here as we do NOT want to bind "this"
					var context = {
						'options': options,
						'element': element
					};

					fn.call(context, this); // eslint-disable-line
				};
			};

			// if (name == 'stick') { this.setupStick(); }
			scene.effects.push(curry(effect, options));

			return this;
		}
	}, {
		key: 'stick',
		value: function stick() {
			var d = scene.duration || 0;
			var h = this.element.getBoundingClientRect().height;

			this.element._stickyTop = triggerPos * window.innerHeight;
			this.element.parentNode.style.paddingBottom = d + h + 'px';
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
   * @param  {Object} scene: An Object containing start and duration information as well as the transformations to apply.
   * @return {void}
   */

	}, {
		key: 'calculate',
		value: function calculate(scene) {
			var start = scene.start;
			var duration = scene.duration;
			var scroll = this.scroll;
			var progress = void 0;

			// if (!scene.active) { return; }

			if (scene.easing) {
				// 						start, to, from, end
				progress = ease[scene.easing](scroll - start, 1.0, 0.0, duration);
			} else {
				progress = (scroll - start) / duration;
			}

			scene.active = progress > 0 && progress < 1;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (progress <= 0 || progress >= 1) {
			// 	return;
			// }

			// Use *actual* position data. An element may be onscreen while its reference (trigger)
			// element is not. Progress may be negative or > 1.0 in some instances.
			// if (this.element.getBoundingClientRect().top > window.innerHeight ||
			// 		this.element.getBoundingClientRect().bottom < 0
			// ) {
			// 	return;
			// }
			// progress = Math.min(1.0, Math.max(0, progress));

			// cycle through any registered transformations
			scene.effects.forEach(function (effect) {
				effect.call({
					'progress': progress,
					'absolute': scroll - start
				});
			});
		}
	}]);

	return Scrollify;
}();

exports.default = Scrollify;

},{"./easings":1,"./effects":2,"./transform":6}],4:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Put Carousel into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */


window.Scrollify = _scrollify2.default;
window.Sticky = _sticky2.default;

},{"./scrollify.js":3,"./sticky":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Sticky
 * https://github.com/apathetic/....?
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

},{}],6:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL3Njcm9sbGlmeS5qcyIsInNyYy9zaGltLmpzIiwic3JjL3N0aWNreS5qcyIsInNyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQjtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFLQTtRQUlBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFPQTtRQUlBO1FBSUE7UUFLQTtRQWdCQTtRQWdCQTtRQWlCQTtRQUtBO1FBS0E7UUFNQTs7O0FBN0pULFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQztBQUNyQyxTQUFPLEtBQUssS0FBSyxDQUFMLENBQUwsR0FBZSxDQUFmLEdBQW1CLENBQW5CLENBRDhCO0NBQWhDOztBQUlBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQztBQUN0QyxTQUFPLENBQUMsQ0FBRCxJQUFNLEtBQUssQ0FBTCxDQUFOLElBQWlCLElBQUksQ0FBSixDQUFqQixHQUEwQixDQUExQixDQUQrQjtDQUFqQzs7QUFJQSxTQUFTLGFBQVQsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUM7QUFDeEMsTUFBSSxDQUFDLEtBQU8sSUFBSSxDQUFKLENBQVIsR0FBaUIsQ0FBakIsRUFBb0I7QUFBRSxXQUFPLElBQUksQ0FBSixHQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCLENBQWhCLENBQVQ7R0FBeEI7QUFDQSxTQUFPLENBQUMsQ0FBRCxHQUFLLENBQUwsSUFBVSxFQUFFLENBQUYsSUFBTyxJQUFJLENBQUosQ0FBUCxHQUFnQixDQUFo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QixFQUF5QjtBQUMzQixlQUFPLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBUCxDQUQyQjtPQUE3Qjs7Ozs2QkFLTyxPQUFPO0FBQ2QsVUFBSSxLQUFLLFlBQUwsS0FBc0IsS0FBdEIsRUFBNkI7QUFBRSxlQUFGO09BQWpDO0FBQ0EsV0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixLQUFLLFlBQUwsQ0FBOUIsQ0FGYztBQUdkLFdBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBM0IsRUFIYztBQUlkLFdBQUssWUFBTCxHQUFvQixLQUFwQixDQUpjO0FBS2QsV0FBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFyQjtBQUxjOzs7U0FwREc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNackIsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7a0JBT2UiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAgLz0gIGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiAtYyAvIDIgKiAoLS10ICogKHQgLSAyKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhcnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWludCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluU2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqIE1hdGguY29zKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiBNYXRoLnNpbih0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0IC8gZCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIHQgPT0gMCA/IGIgOiBjICogTWF0aC5wb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSBkID8gYiArIGMgOiBjICogKC1NYXRoLnBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAodCA9PSBkKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DaXJjKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKE1hdGguc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiBNYXRoLnNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dENpcmModCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gLWMgLyAyICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5FbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkKSA9PSAxKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAuMzsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gYSAqIE1hdGgucG93KDIsLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCAvIDIpID09IDIpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqICguMyAqIDEuNSk7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIGlmICh0IDwgMSkgeyByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjsgfVxuICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogLjUgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICBpZiAodCAvPSBkIDwgMSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSkgKyBiO1xuICB9IGVsc2UgaWYgKHQgPCAyLjUgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIC45Mzc1KSArIGI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAuOTg0Mzc1KSArIGI7XG4gIH1cbn1cbiIsImltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUsIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblxuXG4vKipcbiAqIFBhcmFsbGF4IGFuIGVsZW1lbnQuXG4gKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGF4KGRhdGEpIHtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNwZWVkIGZpcnN0XG4gICAgb2Zmc2V0ID0gZGF0YS5hYnNvbHV0ZSAqIG9wdHMuc3BlZWQ7XG4gIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG4gICAgb2Zmc2V0ID0gZGF0YS5wcm9ncmVzcyAqIChvcHRzLnJhbmdlIHx8IDApOyAgIC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuICB9XG5cbiAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG59XG5cbi8qKlxuICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICogQHR5cGUge09iamVjdH0gb3B0czogVGhlIFwiY2xhc3NcIiB0byB0b2dnbGUsIGFuZCB3aGVuIChpZS4gYXQgd2hpY2ggcG9pbnQgaW4gdGhlIHByb2dyZXNzKVxuICogQHRoaXM6IGFuIG9iamVjdCBjb250YWluaW5nIE9wdGlvbnMgKyBlbGVtZW50IHJlZmVyZW5jZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShkYXRhKSB7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgbGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XG4gIGxldCBub3cgPSBkYXRhLnByb2dyZXNzO1xuXG4gIHRpbWVzLmZvckVhY2goZnVuY3Rpb24odGltZSkge1xuICAgIGxldCBjc3MgPSBvcHRzW3RpbWVdO1xuICAgIGlmIChub3cgPiB0aW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBbcm90YXRlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUoZGF0YSkge1xuICB2YXIgZGVncmVlcyA9IHRoaXMub3B0aW9ucy5kZWcgKiBkYXRhLnByb2dyZXNzO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSgnKyBkZWdyZWVzICsnZGVnKSc7XG59O1xuXG4vKipcbiAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChkYXRhKSB7XG4gIGxldCBvZmZzZXQgPSBkYXRhLmFic29sdXRlO1xuICBsZXQgcHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuICBsZXQgZGVsYXkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIHN0YXJ0IHRyYW5zbGF0aW5nIGFmdGVyIG9uZSB3aW5kb3ctaGVpZ2h0IG9mIHNjcm9sbGluZ1xuICBsZXQgZGlzdGFuY2UgPSA1MDA7XG5cbiAgb2Zmc2V0ID0gcHJvZ3Jlc3MgKiBkaXN0YW5jZTtcbiAgb2Zmc2V0IC09IGRlbGF5O1xuXG4gIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0ICsgJ3B4LCAwLCAwKSc7XG59XG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQgc2V0c3VwIGEgc3RpY2t5IGVsZW1lbnQgd2hpY2ggdG9nZ2xlIHBvc2l0aW9uIGZpeGVkIG9uIC8gb2ZmLlxuICogQHBhcmFtICB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGljayhkYXRhKSB7XG4gIGxldCBwcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG4gIGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICBsZXQgY3VycmVudFN0YXRlID0gJ18nO1xuXG4gIHByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIHByb2dyZXNzKSk7XG5cbiAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnbm9ybWFsJyk7XG4gIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZShlbGVtZW50LCBzdGF0ZSkge1xuICAgIGxldCBCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN0YXRlID09ICdzdGlja3knKSB7XG4gICAgICBhcHBseVN0eWxlcy5jYWxsKGVsZW1lbnQsIEJDUik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5U3R5bGVzLmNhbGwoZWxlbWVudCwgQkNSLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgICAvLyBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFN0YXRlKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuXG4gICAgY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXMsIGFkZD10cnVlKSB7XG5cbiAgICAvLyBmb3IgKGxldCBwcm9wIGluIHN0eWxlcykge1xuICAgIC8vICAgaWYgKHByb3AgPT0gJ2JvdHRvbScgfHwgcHJvcCA9PSAncmlnaHQnKSB7IGNvbnRpbnVlOyB9XG4gICAgLy8gICB0aGlzLnN0eWxlW3Byb3BdID0gKGFkZCkgPyBzdHlsZXNbcHJvcF0gKyAncHgnIDogJyc7XG4gICAgLy8gfVxuICAgIHRoaXMuc3R5bGUudG9wID0gICAoYWRkKSA/IHN0eWxlcy50b3ArJ3B4JyA6ICcnO1xuICAgIHRoaXMuc3R5bGUubGVmdCA9ICAoYWRkKSA/IHN0eWxlcy5sZWZ0KydweCcgOiAnJztcbiAgICB0aGlzLnN0eWxlLndpZHRoID0gKGFkZCkgPyBzdHlsZXMud2lkdGgrJ3B4JyA6ICcnO1xuICAgIC8vIHRoaXMuc3R5bGUuaGVpZ2h0XG4gICAgLy8gdGhpcy5zdHlsZS5wb3NpdGlvbiA9IChhZGQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7ICAgICAgICAgICAgIC8vIE9SLCBkZWFsIHdpdGggdGhpcyB2aWEgQ1NTLi4uP1xuXG4gICAgLy8gaWYgKHRoaXMuX3N0aWNreVRvcCAmJiBhZGQpIHtcbiAgICAvLyAgIHRoaXMuc3R5bGUudG9wID0gdGhpcy5fc3RpY2t5VG9wICsgJ3B4JztcbiAgICAvLyB9XG4gIH1cblxuICAvLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG4gIC8vIGNvcHlTdHlsZXMgPSBib3VuZHNQYXJhbXMuY29uY2F0KFtcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwicG9zaXRpb25cIiwgXCJib3hTaXppbmdcIiwgXCJtb3pCb3hTaXppbmdcIiwgXCJ3ZWJraXRCb3hTaXppbmdcIl0pO1xufSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbi8vIGltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5pbXBvcnQgKiBhcyBlYXNlIGZyb20gJy4vZWFzaW5ncyc7XG5pbXBvcnQgKiBhcyBlZmZlY3RMaXN0IGZyb20gJy4vZWZmZWN0cyc7XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cblx0XHRpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2NlbmVzID0gW107XG5cdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgU2NlbmUgdG8gdGhlIFNjcm9sbGlmeSBvYmplY3QuIFNjZW5lIGluZm9ybWF0aW9uIGluY2x1ZGVzIHdoZW5cbiAgICogdG8gc3RhcnQgYXBwbHlpbmcgYW4gZWZmZWN0IGFuZCBmb3IgaG93IGxvbmcuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0czogVmFyaW91cyBvcHRpb25zIHRvIGFwcGx5IHRvIHRoZSBuZXcgU2NlbmU6XG4gICAqXG4gICAqICAgc3RhcnQ6IChyZXF1aXJlZCkgV2hlbiB0byBzdGFydCB0aGUgZWZmZWN0LiBJdCBpcyBhIDAgLSAxIHZhbHVlXG4gICAqICAgICAgICAgIHJlcHJlc2VudGluZyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpLlxuICAgKiAgICAgICAgICBBbnkgZWZmZWN0cyBpbiB0aGUgU2NlbmUgd2lsbCBiZWdpbiB3aGVuIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICogICAgICAgICAgY3Jvc3NlcyB0aGlzIHRocmVzaG9sZC5cbiAgICpcbiAgICogICBkdXJhdGlvbjogVGhlIGxlbmd0aCBvZiB0aGUgZWZmZWN0LCBpbiBwaXhlbHMuIFNjcm9sbGlmeSB3aWxsXG4gICAqICAgICAgICAgIGludGVycG9sYXRlIHRoYXQgaW50byB2YWx1ZSBpbnRvIGEgXCJwcm9ncmVzc1wiIHZhcmlhYmxlLCBib3VuZGVkXG4gICAqICAgICAgICAgIGJ5IDAgLSAxLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIHRoZSBoZWlnaHQgb2YgdGhlXG4gICAqICAgICAgICAgIHZpZXdwb3J0ICsgZWxlbWVudCBoZWlnaHQsIG1lYW5pbmcgdGhlIGVmZmVjdCB3aWxsIGxhc3QgZm9yIGFzXG4gICAqICAgICAgICAgIGxvbmcgYXMgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZS5cbiAgICpcbiAgICogICB0cmlnZ2VyOiBJZiBzdXBwbGllZCwgU2Nyb2xsaWZ5IHdpbGwgdXNlIHRoaXMgZWxlbWVudCdzIHBvc2l0aW9uIHRvXG4gICAqICAgICAgICAgIHN0YXJ0IGFueSBTY2VuZSBlZmZlY3RzLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZVxuICAgKiAgICAgICAgICB0aGUgZWxlbWVudCBpdHNlbGYgYXMgYSB0cmlnZ2VyLlxuICAgKlxuICAgKiAgIGVhc2luZzogRWFzZSBpbi9vdXQgb2YgYW4gZWZmZWN0LiBBbnkgdmFsdWUgZnJvbSBSb2JlcnQgUGVubmVyJ3MgZWFzaW5nXG4gICAqICAgICAgICAgIGZ1bmN0aW9ucyBpcyB2YWxpZC5cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGFkZFNjZW5lKG9wdHMpIHtcblx0XHRsZXQgdHJpZ2dlclBvcyA9IG9wdHMuc3RhcnQgfHwgMDtcblx0XHRsZXQgZHVyYXRpb24gPSBvcHRzLmR1cmF0aW9uIHx8IHdpbmRvdy5pbm5lckhlaWdodCArIHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cdFx0bGV0IGVmZmVjdHMgPSBvcHRzLmVmZmVjdHMgfHwgW107XG4gICAgbGV0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMudHJpZ2dlcikgfHwgdGhpcy5lbGVtZW50OyAvLyAucGFyZW50Tm9kZTtcblx0XHRsZXQgc2NlbmUgPSB7XG5cdFx0XHQnYWN0aXZlJzogdHJ1ZSxcblx0XHRcdCd0cmlnZ2VyJzogdHJpZ2dlcixcblx0XHRcdCd0cmlnZ2VyUG9zJzogMSAtIHRyaWdnZXJQb3MsXG5cdFx0XHQnZHVyYXRpb24nOiBkdXJhdGlvbixcblx0XHRcdCdlZmZlY3RzJzogW11cblx0XHR9O1xuXG5cdFx0ZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4ge1xuXHRcdFx0dGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBUaGUgc2NlbmUgdG8gdXBkYXRlLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlU2NlbmUoc2NlbmUpIHtcblx0XHRsZXQgdHJpZ2dlciA9IHNjZW5lLnRyaWdnZXI7XG5cdFx0bGV0IEJDUiA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHRyaWdnZXJQb3MgPSBzY2VuZS50cmlnZ2VyUG9zO1xuXHRcdGxldCB0b3AgPSAwO1xuXG5cdFx0ZG8ge1xuXHRcdFx0dG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG5cdFx0XHR0cmlnZ2VyID0gdHJpZ2dlci5vZmZzZXRQYXJlbnQ7XG5cdFx0fSB3aGlsZSh0cmlnZ2VyKTtcblx0XHQvLyBWUy4gP1xuXHRcdC8vIHRvcCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFk7XG5cblx0XHRzY2VuZS5zdGFydCA9IHRvcCAtICh0cmlnZ2VyUG9zICogd2luZG93LmlubmVySGVpZ2h0KTsgLy8gKGNhbiBiZSBuZWdhdGl2ZSlcblxuXHRcdHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBvcHRpb25zPXt9LCBzY2VuZSkge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgaWYgKHRoaXMuc2NlbmVzLmxlbmd0aCkge1xuICAgICAgICBzY2VuZSA9IHRoaXMuc2NlbmVzW3RoaXMuc2NlbmVzLmxlbmd0aCAtIDFdOyAgLy8gdXNlIHRoZSBtb3N0IHJlY2VudGx5IGFkZGVkIHNjZW5lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRTY2VuZSh7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgbm8gc2NlbmUgKGllIFwiYWRkRWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IG9uZVxuICAgICAgICAgICdlZmZlY3RzJzogW3sgJ25hbWUnOiBuYW1lLCAnb3B0aW9ucyc6IG9wdGlvbnMgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cdFx0bGV0IGVmZmVjdCA9IHR5cGVvZiBuYW1lID09ICdmdW5jdGlvbicgPyBuYW1lIDogZWZmZWN0TGlzdFtuYW1lXTtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuXHRcdFx0XHRsZXQgY29udGV4dCA9IHtcblx0XHRcdFx0XHQnb3B0aW9ucyc6IG9wdGlvbnMsXG5cdFx0XHRcdFx0J2VsZW1lbnQnOiBlbGVtZW50XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgKG5hbWUgPT0gJ3N0aWNrJykgeyB0aGlzLnNldHVwU3RpY2soKTsgfVxuXHRcdHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c3RpY2soKSB7XG5cdFx0bGV0IGQgPSBzY2VuZS5kdXJhdGlvbiB8fCAwO1xuXHRcdGxldCBoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuXHRcdHRoaXMuZWxlbWVudC5fc3RpY2t5VG9wID0gdHJpZ2dlclBvcyAqIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZS5wYWRkaW5nQm90dG9tID0gZCArIGggKyAncHgnO1xuXHR9XG5cblx0LyoqXG5cdCAqIG9uU2Nyb2xsIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdC8vIGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0Ly8gfVxuXHR9XG5cblx0LyoqXG5cdCAqIG9uUmVzaXplIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbCBhcyB0aGUgdHJhbnNmb3JtYXRpb25zIHRvIGFwcGx5LlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0Y2FsY3VsYXRlKHNjZW5lKSB7XG5cdFx0bGV0IHN0YXJ0ID0gc2NlbmUuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gc2NlbmUuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcztcblxuXHRcdC8vIGlmICghc2NlbmUuYWN0aXZlKSB7IHJldHVybjsgfVxuXG5cdFx0aWYgKHNjZW5lLmVhc2luZykge1x0Ly8gXHRcdFx0XHRcdFx0c3RhcnQsIHRvLCBmcm9tLCBlbmRcblx0XHRcdHByb2dyZXNzID0gZWFzZVtzY2VuZS5lYXNpbmddKHNjcm9sbCAtIHN0YXJ0LCAxLjAsIDAuMCwgZHVyYXRpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm9ncmVzcyA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblx0XHR9XG5cblx0XHRzY2VuZS5hY3RpdmUgPSAocHJvZ3Jlc3MgPiAwICYmIHByb2dyZXNzIDwgMSk7XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdC8vIGlmIChwcm9ncmVzcyA8PSAwIHx8IHByb2dyZXNzID49IDEpIHtcblx0XHQvLyBcdHJldHVybjtcblx0XHQvLyB9XG5cblx0XHQvLyBVc2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YS4gQW4gZWxlbWVudCBtYXkgYmUgb25zY3JlZW4gd2hpbGUgaXRzIHJlZmVyZW5jZSAodHJpZ2dlcilcblx0XHQvLyBlbGVtZW50IGlzIG5vdC4gUHJvZ3Jlc3MgbWF5IGJlIG5lZ2F0aXZlIG9yID4gMS4wIGluIHNvbWUgaW5zdGFuY2VzLlxuXHRcdC8vIGlmICh0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gd2luZG93LmlubmVySGVpZ2h0IHx8XG5cdFx0Ly8gXHRcdHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG5cdFx0Ly8gKSB7XG5cdFx0Ly8gXHRyZXR1cm47XG5cdFx0Ly8gfVxuICAgIC8vIHByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLCBwcm9ncmVzcykpO1xuXG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHNjZW5lLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRlZmZlY3QuY2FsbCh7XG5cdFx0XHRcdCdwcm9ncmVzcyc6IHByb2dyZXNzLFxuXHRcdFx0XHQnYWJzb2x1dGUnOiBzY3JvbGwgLSBzdGFydFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgU2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbmltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuXG53aW5kb3cuU2Nyb2xsaWZ5ID0gU2Nyb2xsaWZ5O1xud2luZG93LlN0aWNreSA9IFN0aWNreTtcbiIsIi8qXG4gKiBTdGlja3lcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvLi4uLj9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cbi8qZ2xvYmFsIGRvY3VtZW50IHJlcXVlc3RBbmltYXRpb25GcmFtZSBIVE1MRWxlbWVudCovXG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQ6IHNldHMgdXAgYSBzdGlja3kgYmFyIHdoaWNoIGF0dGFjaGVzIC8gZGV0YWNoZXMgdG8gdG9wIG9mIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50OiBUaGUgZWxlbWVudCB0byBzdGlja3ktaWZ5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGJvdW5kZWQ6IFdoZXRoZXIgdG8gYXBwbHkgc3RpY2tpbmVzcyB0byB0aGUgYm90dG9tIG9mIHRoZSBwYXJlbnQgY29udGFpbmVyLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RpY2t5IHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBib3VuZGVkPXRydWUpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBlbGVtZW50IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgICBpZiAoIXRoaXMuZWxlbWVudCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHRoaXMuYm91bmRlZCA9ICEhYm91bmRlZDtcbiAgICB0aGlzLnBhcmVudCA9IHRoaXMuZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gJ18nO1xuICAgIHRoaXMuc3RhdGVTd2l0Y2hlcjtcbiAgICB0aGlzLmRldGVybWluZSA9ICdub3JtYWwnO1xuXG4gICAgLy8gZGV0ZXJtaW5lIGluaXRpYWwgc3RhdGVcbiAgICBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgICAgdGhpcy5zdGF0ZVN3aXRjaGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ25vcm1hbCcpO1xuICAgIH1cblxuICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnN0YXRlU3dpdGNoZXIpOyAgICAvLyBzdGF0ZVN3aXRjaGVyIGNoYW5nZXMsIHNvIGNhbm5vdCBwYXNzIChpZS4gYmluZCBkaXJlY3RseSkgbGlrZSB0aGlzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHsgdGhpcy5zdGF0ZVN3aXRjaGVyKCk7IH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuc3RhdGVTd2l0Y2hlcigpOyB9KTtcbiAgfVxuXG4gIG5vcm1hbCgpIHtcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChlbGVtZW50UG9zaXRpb24udG9wIDwgMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgIH1cbiAgfVxuXG4gIHN0aWNreSgpIHtcbiAgICBsZXQgcGFyZW50UG9zaXRpb24gPSB0aGlzLnBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAocGFyZW50UG9zaXRpb24udG9wID4gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ25vcm1hbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib3VuZGVkKSB7XG4gICAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLmJvdHRvbSA8IGVsZW1lbnRQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2JvdHRvbScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJvdHRvbSgpIHtcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChlbGVtZW50UG9zaXRpb24udG9wID4gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmN1cnJlbnRTdGF0ZSk7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5zdGF0ZVN3aXRjaGVyID0gdGhpc1tzdGF0ZV07ICAgLy8gc3RhdGVTd2l0Y2hlciB3aWxsIHBvaW50IGF0IGFuIGludGVybmFsIGZuXG4gIH1cbn1cblxuIiwiXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtOyJdfQ==
