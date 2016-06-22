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
var currentState = '_';
function stick(data) {
  var progress = data.progress;
  var element = this.element;

  progress = Math.min(1.0, Math.max(0.0, progress));

  console.log('sticky', progress);

  if (progress <= 0) {
    setState(element, 'normal');
  } else if (progress >= 1) {
    setState(element, 'bottom');
  } else {
    setState(element, 'sticky');
  }
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

  // element.classList.remove(currentState);
  element.className = '';
  element.classList.add(state);
  currentState = state;
}

function applyStyles(styles) {
  var add = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  for (var prop in styles) {
    if (prop == 'bottom' || prop == 'right') {
      continue;
    }
    this.style[prop] = add ? styles[prop] + 'px' : '';
  }

  if (this._stickyTop && add) {
    this.style.top = this._stickyTop + 'px';
  }
  this.style.position = add ? 'fixed' : 'absolute'; // OR, deal with this via CSS...?
}

},{"./transform":5}],3:[function(require,module,exports){
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

		// TODO: temporary workaround for chrome's scroll jitter bug
		window.addEventListener("mousewheel", function () {});
		window.wes = this;
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
			var _scene,
			    _this2 = this;

			var triggerPos = opts.start || 0;
			var duration = opts.duration || window.innerHeight + this.element.offsetHeight;
			var effects = opts.effects || [];
			var trigger = document.querySelector(opts.trigger) || this.element; // .parentNode;
			var scene = (_scene = {
				'active': true,
				'trigger': trigger,
				'triggerPos': triggerPos
			}, _defineProperty(_scene, 'triggerPos', 1 - start), _defineProperty(_scene, 'duration', duration), _defineProperty(_scene, 'effects', []), _scene);

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
			var where = scene.triggerPos;
			var top = 0;

			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);
			// VS. ?
			// top = trigger.getBoundingClientRect().top + window.scrollY;

			scene.start = top - where * window.innerHeight; // (can be negative)

			if (scene.isSticky) {
				var d = scene.duration || 0;
				var h = this.element.getBoundingClientRect().height;

				this.element._stickyTop = where * window.innerHeight;
				this.element.parentNode.style.paddingBottom = d + h + 'px';
			}

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

			if (!scene.active) {
				return;
			}

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

},{"./easings":1,"./effects":2,"./transform":5}],4:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Scrollify = _scrollify2.default; /**
                                         * Put Carousel into the Global scope.
                                         * Useful for existing demos or if you wish to include manually
                                         */

},{"./scrollify.js":3}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL3Njcm9sbGlmeS5qcyIsInNyYy9zaGltLmpzIiwic3JjL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDRWdCO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFJQTtRQU9BO1FBSUE7UUFJQTtRQUtBO1FBZ0JBO1FBZ0JBO1FBaUJBO1FBS0E7UUFLQTtRQU1BOzs7QUE3SlQsU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUwsQ0FBTCxHQUFlLENBQWYsR0FBbUIsQ0FBbkIsQ0FEOEI7Q0FBaEM7O0FBSUEsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCLEVBQWlDO0FBQ3RDLFNBQU8sQ0FBQyxDQUFELElBQU0sS0FBSyxDQUFMLENBQU4sSUFBaUIsSUFBSSxDQUFKLENBQWpCLEdBQTBCLENBQTFCLENBRCtCO0NBQWpDOztBQUlBLFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQztBQUN4QyxNQUFJLENBQUMsS0FBTyxJQUFJLENBQUosQ0FBUixHQUFpQixDQUFqQixFQUFvQjtBQUFFLFdBQU8sSUFBSSxDQUFKLEdBQVEsQ0FBUixHQUFZLENBQVosR0FBZ0IsQ0FBaEIsQ0FBVDtHQUF4QjtBQUNBLFNBQU8sQ0FBQyxDQUFELEdBQUssQ0FBTCxJQUFVLEVBQUUsQ0FBRixJQUFPLElBQUksQ0FBSixDQUFQLEdBQWdCLENBQWhCLENBQVYsR0FBK0IsQ0FB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VCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7a0JBT2UiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyplc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMTIwXSovXG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAgLz0gIGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiAtYyAvIDIgKiAoLS10ICogKHQgLSAyKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhcnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWludCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluU2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqIE1hdGguY29zKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiBNYXRoLnNpbih0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0IC8gZCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIHQgPT0gMCA/IGIgOiBjICogTWF0aC5wb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSBkID8gYiArIGMgOiBjICogKC1NYXRoLnBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAodCA9PSBkKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DaXJjKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKE1hdGguc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiBNYXRoLnNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dENpcmModCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gLWMgLyAyICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5FbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkKSA9PSAxKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAuMzsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gYSAqIE1hdGgucG93KDIsLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCAvIDIpID09IDIpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqICguMyAqIDEuNSk7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIGlmICh0IDwgMSkgeyByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjsgfVxuICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogLjUgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICBpZiAodCAvPSBkIDwgMSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSkgKyBiO1xuICB9IGVsc2UgaWYgKHQgPCAyLjUgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIC45Mzc1KSArIGI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAuOTg0Mzc1KSArIGI7XG4gIH1cbn1cbiIsImltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUsIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblxuXG4vKipcbiAqIFBhcmFsbGF4IGFuIGVsZW1lbnQuXG4gKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGF4KGRhdGEpIHtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNwZWVkIGZpcnN0XG4gICAgb2Zmc2V0ID0gZGF0YS5hYnNvbHV0ZSAqIG9wdHMuc3BlZWQ7XG4gIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG4gICAgb2Zmc2V0ID0gZGF0YS5wcm9ncmVzcyAqIChvcHRzLnJhbmdlIHx8IDApOyAgIC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuICB9XG5cbiAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG59XG5cbi8qKlxuICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICogQHR5cGUge09iamVjdH0gb3B0czogVGhlIFwiY2xhc3NcIiB0byB0b2dnbGUsIGFuZCB3aGVuIChpZS4gYXQgd2hpY2ggcG9pbnQgaW4gdGhlIHByb2dyZXNzKVxuICogQHRoaXM6IGFuIG9iamVjdCBjb250YWluaW5nIE9wdGlvbnMgKyBlbGVtZW50IHJlZmVyZW5jZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShkYXRhKSB7XG4gIGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgbGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XG4gIGxldCBub3cgPSBkYXRhLnByb2dyZXNzO1xuXG4gIHRpbWVzLmZvckVhY2goZnVuY3Rpb24odGltZSkge1xuICAgIGxldCBjc3MgPSBvcHRzW3RpbWVdO1xuICAgIGlmIChub3cgPiB0aW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBbcm90YXRlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUoZGF0YSkge1xuICB2YXIgZGVncmVlcyA9IHRoaXMub3B0aW9ucy5kZWcgKiBkYXRhLnByb2dyZXNzO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSgnKyBkZWdyZWVzICsnZGVnKSc7XG59O1xuXG4vKipcbiAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChkYXRhKSB7XG4gIGxldCBvZmZzZXQgPSBkYXRhLmFic29sdXRlO1xuICBsZXQgcHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuICBsZXQgZGVsYXkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIHN0YXJ0IHRyYW5zbGF0aW5nIGFmdGVyIG9uZSB3aW5kb3ctaGVpZ2h0IG9mIHNjcm9sbGluZ1xuICBsZXQgZGlzdGFuY2UgPSA1MDA7XG5cbiAgb2Zmc2V0ID0gcHJvZ3Jlc3MgKiBkaXN0YW5jZTtcbiAgb2Zmc2V0IC09IGRlbGF5O1xuXG4gIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0ICsgJ3B4LCAwLCAwKSc7XG59XG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQgc2V0c3VwIGEgc3RpY2t5IGVsZW1lbnQgd2hpY2ggdG9nZ2xlIHBvc2l0aW9uIGZpeGVkIG9uIC8gb2ZmLlxuICogQHBhcmFtICB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmxldCBjdXJyZW50U3RhdGUgPSAnXyc7XG5leHBvcnQgZnVuY3Rpb24gc3RpY2soZGF0YSkge1xuICBsZXQgcHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICBwcm9ncmVzcyA9IE1hdGgubWluKDEuMCwgTWF0aC5tYXgoMC4wLCBwcm9ncmVzcykpO1xuXG4gIGNvbnNvbGUubG9nKCdzdGlja3knLCBwcm9ncmVzcyk7XG5cbiAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnbm9ybWFsJyk7XG4gIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgIHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0U3RhdGUoZWxlbWVudCwgc3RhdGUpIHtcbiAgbGV0IEJDUiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gIGlmIChzdGF0ZSA9PSAnc3RpY2t5Jykge1xuICAgIGFwcGx5U3R5bGVzLmNhbGwoZWxlbWVudCwgQkNSKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseVN0eWxlcy5jYWxsKGVsZW1lbnQsIEJDUiwgZmFsc2UpO1xuICB9XG5cbiAgLy8gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdGF0ZSk7XG4gIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXMsIGFkZD10cnVlKSB7XG4gIGZvciAobGV0IHByb3AgaW4gc3R5bGVzKSB7XG4gICAgaWYgKHByb3AgPT0gJ2JvdHRvbScgfHwgcHJvcCA9PSAncmlnaHQnKSB7IGNvbnRpbnVlOyB9XG4gICAgdGhpcy5zdHlsZVtwcm9wXSA9IChhZGQpID8gc3R5bGVzW3Byb3BdICsgJ3B4JyA6ICcnO1xuICB9XG5cbiAgaWYgKHRoaXMuX3N0aWNreVRvcCAmJiBhZGQpIHtcbiAgICB0aGlzLnN0eWxlLnRvcCA9IHRoaXMuX3N0aWNreVRvcCArICdweCc7XG4gIH1cbiAgdGhpcy5zdHlsZS5wb3NpdGlvbiA9IChhZGQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7ICAgICAgICAgICAgIC8vIE9SLCBkZWFsIHdpdGggdGhpcyB2aWEgQ1NTLi4uP1xufVxuIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cblxuLy8gVE9ETyBhZGQgd2Vha21hcCBzdXBwb3J0IGZvciBwdWJsaWMgLyBwcml2YXRlIG1ldGhvZHNcblxuLy8gaW1wb3J0IFN0aWNreSBmcm9tICcuL3N0aWNreSc7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCAqIGFzIGVhc2UgZnJvbSAnLi9lYXNpbmdzJztcbmltcG9ydCAqIGFzIGVmZmVjdExpc3QgZnJvbSAnLi9lZmZlY3RzJztcblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY2VuZXMgPSBbXTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXG4gICAgLy8gVE9ETzogdGVtcG9yYXJ5IHdvcmthcm91bmQgZm9yIGNocm9tZSdzIHNjcm9sbCBqaXR0ZXIgYnVnXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIGZ1bmN0aW9uKCkge30pO1xuICAgIHdpbmRvdy53ZXMgPSB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBTY2VuZSB0byB0aGUgU2Nyb2xsaWZ5IG9iamVjdC4gU2NlbmUgaW5mb3JtYXRpb24gaW5jbHVkZXMgd2hlblxuICAgKiB0byBzdGFydCBhcHBseWluZyBhbiBlZmZlY3QgYW5kIGZvciBob3cgbG9uZy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRzOiBWYXJpb3VzIG9wdGlvbnMgdG8gYXBwbHkgdG8gdGhlIG5ldyBTY2VuZTpcbiAgICpcbiAgICogICBzdGFydDogKHJlcXVpcmVkKSBXaGVuIHRvIHN0YXJ0IHRoZSBlZmZlY3QuIEl0IGlzIGEgMCAtIDEgdmFsdWVcbiAgICogICAgICAgICAgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCAoZWcuIDAuNSkuXG4gICAqICAgICAgICAgIEFueSBlZmZlY3RzIGluIHRoZSBTY2VuZSB3aWxsIGJlZ2luIHdoZW4gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKiAgICAgICAgICBjcm9zc2VzIHRoaXMgdGhyZXNob2xkLlxuICAgKlxuICAgKiAgIGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSBlZmZlY3QsIGluIHBpeGVscy4gU2Nyb2xsaWZ5IHdpbGxcbiAgICogICAgICAgICAgaW50ZXJwb2xhdGUgdGhhdCBpbnRvIHZhbHVlIGludG8gYSBcInByb2dyZXNzXCIgdmFyaWFibGUsIGJvdW5kZWRcbiAgICogICAgICAgICAgYnkgMCAtIDEuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgdGhlIGhlaWdodCBvZiB0aGVcbiAgICogICAgICAgICAgdmlld3BvcnQgKyBlbGVtZW50IGhlaWdodCwgbWVhbmluZyB0aGUgZWZmZWN0IHdpbGwgbGFzdCBmb3IgYXNcbiAgICogICAgICAgICAgbG9uZyBhcyB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLlxuICAgKlxuICAgKiAgIHRyaWdnZXI6IElmIHN1cHBsaWVkLCBTY3JvbGxpZnkgd2lsbCB1c2UgdGhpcyBlbGVtZW50J3MgcG9zaXRpb24gdG9cbiAgICogICAgICAgICAgc3RhcnQgYW55IFNjZW5lIGVmZmVjdHMuIElmIG5vdCBzdXBwbGllZCwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlXG4gICAqICAgICAgICAgIHRoZSBlbGVtZW50IGl0c2VsZiBhcyBhIHRyaWdnZXIuXG4gICAqXG4gICAqICAgZWFzaW5nOiBFYXNlIGluL291dCBvZiBhbiBlZmZlY3QuIEFueSB2YWx1ZSBmcm9tIFJvYmVydCBQZW5uZXIncyBlYXNpbmdcbiAgICogICAgICAgICAgZnVuY3Rpb25zIGlzIHZhbGlkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0YWRkU2NlbmUob3B0cykge1xuXHRcdGxldCB0cmlnZ2VyUG9zID0gb3B0cy5zdGFydCB8fCAwO1xuXHRcdGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgd2luZG93LmlubmVySGVpZ2h0ICsgdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcblx0XHRsZXQgZWZmZWN0cyA9IG9wdHMuZWZmZWN0cyB8fCBbXTtcbiAgICBsZXQgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy50cmlnZ2VyKSB8fCB0aGlzLmVsZW1lbnQ7IC8vIC5wYXJlbnROb2RlO1xuXHRcdGxldCBzY2VuZSA9IHtcblx0XHRcdCdhY3RpdmUnOiB0cnVlLFxuXHRcdFx0J3RyaWdnZXInOiB0cmlnZ2VyLFxuXHRcdFx0J3RyaWdnZXJQb3MnOiB0cmlnZ2VyUG9zLFxuXHRcdFx0J3RyaWdnZXJQb3MnOiAxIC0gc3RhcnQsXG5cdFx0XHQnZHVyYXRpb24nOiBkdXJhdGlvbixcblx0XHRcdCdlZmZlY3RzJzogW11cblx0XHR9O1xuXG5cdFx0ZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4ge1xuXHRcdFx0dGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBUaGUgc2NlbmUgdG8gdXBkYXRlLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlU2NlbmUoc2NlbmUpIHtcblx0XHRsZXQgdHJpZ2dlciA9IHNjZW5lLnRyaWdnZXI7XG5cdFx0bGV0IEJDUiA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHdoZXJlID0gc2NlbmUudHJpZ2dlclBvcztcblx0XHRsZXQgdG9wID0gMDtcblxuXHRcdGRvIHtcblx0XHRcdHRvcCArPSB0cmlnZ2VyLm9mZnNldFRvcCB8fCAwO1xuXHRcdFx0dHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuXHRcdH0gd2hpbGUodHJpZ2dlcik7XG5cdFx0Ly8gVlMuID9cblx0XHQvLyB0b3AgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0c2NlbmUuc3RhcnQgPSB0b3AgLSAod2hlcmUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpOyAvLyAoY2FuIGJlIG5lZ2F0aXZlKVxuXG5cdFx0aWYgKHNjZW5lLmlzU3RpY2t5KSB7XG5cdFx0XHRsZXQgZCA9IHNjZW5lLmR1cmF0aW9uIHx8IDA7XG5cdFx0XHRsZXQgaCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cblx0XHRcdHRoaXMuZWxlbWVudC5fc3RpY2t5VG9wID0gd2hlcmUgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZS5wYWRkaW5nQm90dG9tID0gZCArIGggKyAncHgnO1xuXHRcdH1cblxuXHRcdHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBvcHRpb25zPXt9LCBzY2VuZSkge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgaWYgKCFzY2VuZSkge1xuICAgICAgaWYgKHRoaXMuc2NlbmVzLmxlbmd0aCkge1xuICAgICAgICBzY2VuZSA9IHRoaXMuc2NlbmVzW3RoaXMuc2NlbmVzLmxlbmd0aCAtIDFdOyAgLy8gdXNlIHRoZSBtb3N0IHJlY2VudGx5IGFkZGVkIHNjZW5lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRTY2VuZSh7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgbm8gc2NlbmUgKGllIFwiYWRkRWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IG9uZVxuICAgICAgICAgICdlZmZlY3RzJzogW3sgJ25hbWUnOiBuYW1lLCAnb3B0aW9ucyc6IG9wdGlvbnMgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cdFx0bGV0IGVmZmVjdCA9IHR5cGVvZiBuYW1lID09ICdmdW5jdGlvbicgPyBuYW1lIDogZWZmZWN0TGlzdFtuYW1lXTtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuXHRcdFx0XHRsZXQgY29udGV4dCA9IHtcblx0XHRcdFx0XHQnb3B0aW9ucyc6IG9wdGlvbnMsXG5cdFx0XHRcdFx0J2VsZW1lbnQnOiBlbGVtZW50XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0c2NlbmUuZWZmZWN0cy5wdXNoKGN1cnJ5KGVmZmVjdCwgb3B0aW9ucykpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogb25TY3JvbGwgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0Ly8gaWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHQvLyB9XG5cdH1cblxuXHQvKipcblx0ICogb25SZXNpemUgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0dGhpcy5zY2VuZXMuZm9yRWFjaCgoc2NlbmUpID0+IHRoaXMudXBkYXRlU2NlbmUoc2NlbmUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIHRyYW5zZm9ybWF0aW9ucyBmb3IgZXZlcnkgc2NlbmUuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5zY2VuZXMuZm9yRWFjaCgoc2NlbmUpID0+IHRoaXMuY2FsY3VsYXRlKHNjZW5lKSk7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGVhY2ggc2NlbmUuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gc2NlbmU6IEFuIE9iamVjdCBjb250YWluaW5nIHN0YXJ0IGFuZCBkdXJhdGlvbiBpbmZvcm1hdGlvbiBhcyB3ZWxsIGFzIHRoZSB0cmFuc2Zvcm1hdGlvbnMgdG8gYXBwbHkuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRjYWxjdWxhdGUoc2NlbmUpIHtcblx0XHRsZXQgc3RhcnQgPSBzY2VuZS5zdGFydDtcblx0XHRsZXQgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbjtcblx0XHRsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IHByb2dyZXNzO1xuXG5cdFx0aWYgKCFzY2VuZS5hY3RpdmUpIHsgcmV0dXJuOyB9XG5cblx0XHRpZiAoc2NlbmUuZWFzaW5nKSB7XHQvLyBcdFx0XHRcdFx0XHRzdGFydCwgdG8sIGZyb20sIGVuZFxuXHRcdFx0cHJvZ3Jlc3MgPSBlYXNlW3NjZW5lLmVhc2luZ10oc2Nyb2xsIC0gc3RhcnQsIDEuMCwgMC4wLCBkdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHNjZW5lLmFjdGl2ZSA9IChwcm9ncmVzcyA+IDAgJiYgcHJvZ3Jlc3MgPCAxKTtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0Ly8gaWYgKHByb2dyZXNzIDw9IDAgfHwgcHJvZ3Jlc3MgPj0gMSkge1xuXHRcdC8vIFx0cmV0dXJuO1xuXHRcdC8vIH1cblxuXHRcdC8vIFVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhLiBBbiBlbGVtZW50IG1heSBiZSBvbnNjcmVlbiB3aGlsZSBpdHMgcmVmZXJlbmNlICh0cmlnZ2VyKVxuXHRcdC8vIGVsZW1lbnQgaXMgbm90LiBQcm9ncmVzcyBtYXkgYmUgbmVnYXRpdmUgb3IgPiAxLjAgaW4gc29tZSBpbnN0YW5jZXMuXG5cdFx0Ly8gaWYgKHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcblx0XHQvLyBcdFx0dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA8IDBcblx0XHQvLyApIHtcblx0XHQvLyBcdHJldHVybjtcblx0XHQvLyB9XG4gICAgLy8gcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAsIHByb2dyZXNzKSk7XG5cblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0c2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcblx0XHRcdGVmZmVjdC5jYWxsKHtcblx0XHRcdFx0J3Byb2dyZXNzJzogcHJvZ3Jlc3MsXG5cdFx0XHRcdCdhYnNvbHV0ZSc6IHNjcm9sbCAtIHN0YXJ0XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBQdXQgQ2Fyb3VzZWwgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiIsIlxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybTsiXX0=
