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

  if (progress < 0) {
    setState(element, 'normal');
  } else if (progress > 1) {
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
  var on = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  for (var prop in styles) {
    if (prop == 'bottom' || prop == 'right') {
      continue;
    }
    this.style[prop] = on ? styles[prop] + 'px' : '';
  }
  this.style.position = on ? 'fixed' : ''; // OR, deal with this via CSS...?
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
			var _this2 = this;

			var triggerPos = opts.start || 0;
			var duration = opts.duration || window.innerHeight + this.element.offsetHeight;
			var effects = opts.effects || [];
			var trigger = document.querySelector(opts.trigger) || this.element; // .parentNode;
			var scene = {
				'active': true,
				'trigger': trigger,
				'triggerPos': triggerPos,
				'duration': duration,
				'effects': []
			};

			effects.map(function (effect) {
				_this2.addEffect(effect.name, effect.options, scene);
				if (effect.name == 'stick') scene.isSticky = true;
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
			var where = 1 - scene.triggerPos;
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
			var progress = void 0; //  = (scroll - start) / duration;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL3Njcm9sbGlmeS5qcyIsInNyYy9zaGltLmpzIiwic3JjL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDRWdCLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFcsR0FBQSxXO1FBSUEsWSxHQUFBLFk7UUFJQSxjLEdBQUEsYztRQUtBLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUlBLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQU9BLFUsR0FBQSxVO1FBSUEsVyxHQUFBLFc7UUFJQSxhLEdBQUEsYTtRQUtBLGEsR0FBQSxhO1FBZ0JBLGMsR0FBQSxjO1FBZ0JBLGdCLEdBQUEsZ0I7UUFpQkEsVSxHQUFBLFU7UUFLQSxXLEdBQUEsVztRQUtBLGEsR0FBQSxhO1FBTUEsYSxHQUFBLGE7OztBQTdKVCxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0M7QUFDckMsU0FBTyxLQUFLLEtBQUssQ0FBVixJQUFlLENBQWYsR0FBbUIsQ0FBMUI7QUFDRDs7QUFFTSxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUM7QUFDdEMsU0FBTyxDQUFDLENBQUQsSUFBTSxLQUFLLENBQVgsS0FBaUIsSUFBSSxDQUFyQixJQUEwQixDQUFqQztBQUNEOztBQUVNLFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixF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QVgsQ0FBWjtBQUNBO0FBQ0E7QUFDRDs7a0JBRWMsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAxMjBdKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0ICAvPSAgZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICByZXR1cm4gdCA9PSAwID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICh0ID09IGQpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dENpcmModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIGlmICgodCAvPSBkIC8gMikgPCAxKSB7IHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQpID09IDEpIHsgcmV0dXJuIGIgKyBjOyB9XG4gIGlmICghcCkgeyBwID0gZCAqIC4zOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICByZXR1cm4gLShhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkIC8gMikgPT0gMikgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogKC4zICogMS41KTsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgaWYgKHQgPCAxKSB7IHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiOyB9XG4gIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiOyB9XG4gIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gIGlmICh0IC89IGQgPCAxIC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgLjc1KSArIGI7XG4gIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgfVxufVxuIiwiaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcInRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIE9wdGlvbnMgYXJlIGFwcGxpZWQgYXQgaW5pdGlhbGl6ZSwgYW5kIGFyZSBjdXJyaWVkIGluIHZpYSBcInRoaXNcIi5cbiAqIE5PVEU6IGRvbid0IHVzZSBhcnJvdyBmbidzIGhlcmUgYXMgdGhleSBwcm94eSBcInRoaXNcIlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuXG5cbi8qKlxuICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFlvdSBtYXkgZGVmaW5lIHBhcmFsbGF4IFwic3BlZWRcIiBvciBwYXJhbGxheCBcInJhbmdlXCIgKGluIHBpeGVscykuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyYWxsYXgoZGF0YSkge1xuXHRsZXQgb2Zmc2V0ID0gMDtcblx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG5cblx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRvZmZzZXQgPSBkYXRhLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0fSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcmFuZ2Vcblx0XHRvZmZzZXQgPSBkYXRhLnByb2dyZXNzICogKG9wdHMucmFuZ2UgfHwgMCk7ICAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdH1cblxuXHR0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcbn1cblxuLyoqXG4gKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBUaGUgXCJjbGFzc1wiIHRvIHRvZ2dsZSwgYW5kIHdoZW4gKGllLiBhdCB3aGljaCBwb2ludCBpbiB0aGUgcHJvZ3Jlc3MpXG4gKiBAdGhpczogYW4gb2JqZWN0IGNvbnRhaW5pbmcgT3B0aW9ucyArIGVsZW1lbnQgcmVmZXJlbmNlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKGRhdGEpIHtcblx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG5cdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0bGV0IG5vdyA9IGRhdGEucHJvZ3Jlc3M7XG5cblx0dGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG5cdFx0bGV0IGNzcyA9IG9wdHNbdGltZV07XG5cdFx0aWYgKG5vdyA+IHRpbWUpIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIFtyb3RhdGUgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShkYXRhKSB7XG5cdHZhciBkZWdyZWVzID0gdGhpcy5vcHRpb25zLmRlZyAqIGRhdGEucHJvZ3Jlc3M7XG5cdHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlKCcrIGRlZ3JlZXMgKydkZWcpJztcbn07XG5cbi8qKlxuICogRHVtbXkgZWZmZWN0IGZvciB0ZXN0aW5nLCBhdCB0aGUgbW9tZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVYKGRhdGEpIHtcblx0bGV0IG9mZnNldCA9IGRhdGEuYWJzb2x1dGU7XG5cdGxldCBwcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG5cdGxldCBkZWxheSA9IHdpbmRvdy5pbm5lckhlaWdodDtcdC8vIHN0YXJ0IHRyYW5zbGF0aW5nIGFmdGVyIG9uZSB3aW5kb3ctaGVpZ2h0IG9mIHNjcm9sbGluZ1xuXHRsZXQgZGlzdGFuY2UgPSA1MDA7XG5cblx0b2Zmc2V0ID0gcHJvZ3Jlc3MgKiBkaXN0YW5jZTtcblx0b2Zmc2V0IC09IGRlbGF5O1xuXG5cdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0ICsgJ3B4LCAwLCAwKSc7XG59XG5cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudCBzZXRzdXAgYSBzdGlja3kgZWxlbWVudCB3aGljaCB0b2dnbGUgcG9zaXRpb24gZml4ZWQgb24gLyBvZmYuXG4gKiBAcGFyYW0gIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xubGV0IGN1cnJlbnRTdGF0ZSA9ICdfJztcbmV4cG9ydCBmdW5jdGlvbiBzdGljayhkYXRhKSB7XG5cdGxldCBwcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG5cdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG4gIC8vIFRPRE8uIFNBTklUWSBDSEVDS1xuICBwcm9ncmVzcyA9IE1hdGgubWluKDEuMCwgTWF0aC5tYXgoMCwgcHJvZ3Jlc3MpKTtcblxuXHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xuXHRcdHNldFN0YXRlKGVsZW1lbnQsICdub3JtYWwnKTtcblx0fSBlbHNlIGlmIChwcm9ncmVzcyA+PSAxKSB7XG5cdFx0c2V0U3RhdGUoZWxlbWVudCwgJ2JvdHRvbScpO1xuXHR9IGVsc2Uge1xuXHRcdHNldFN0YXRlKGVsZW1lbnQsICdzdGlja3knKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZXRTdGF0ZShlbGVtZW50LCBzdGF0ZSkge1xuICBsZXQgQkNSID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBpZiAoY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgaWYgKHN0YXRlID09ICdzdGlja3knKSB7XG4gICAgYXBwbHlTdHlsZXMuY2FsbChlbGVtZW50LCBCQ1IpO1xuICB9IGVsc2Uge1xuICAgIGFwcGx5U3R5bGVzLmNhbGwoZWxlbWVudCwgQkNSLCBmYWxzZSk7XG4gIH1cblxuICAvLyBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFN0YXRlKTtcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcbiAgY3VycmVudFN0YXRlID0gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGVzKHN0eWxlcywgb249dHJ1ZSkge1xuICBmb3IgKGxldCBwcm9wIGluIHN0eWxlcykge1xuICAgIGlmIChwcm9wID09ICdib3R0b20nIHx8IHByb3AgPT0gJ3JpZ2h0JykgeyBjb250aW51ZTsgfVxuICAgIHRoaXMuc3R5bGVbcHJvcF0gPSAob24pID8gc3R5bGVzW3Byb3BdICsgJ3B4JyA6ICcnO1xuICB9XG4gIHRoaXMuc3R5bGUucG9zaXRpb24gPSAob24pID8gJ2ZpeGVkJyA6ICcnOyAgLy8gT1IsIGRlYWwgd2l0aCB0aGlzIHZpYSBDU1MuLi4/XG59XG4iLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG4vLyBpbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuaW1wb3J0ICogYXMgZWFzZSBmcm9tICcuL2Vhc2luZ3MnO1xuaW1wb3J0ICogYXMgZWZmZWN0TGlzdCBmcm9tICcuL2VmZmVjdHMnO1xuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID09IGZhbHNlKSB7IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpOyB9XG5cdFx0aWYgKCFlbGVtZW50IHx8ICF0cmFuc2Zvcm0gKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjZW5lcyA9IFtdO1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG5cbiAgICAvLyBUT0RPOiB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCBmb3IgY2hyb21lJ3Mgc2Nyb2xsIGppdHRlciBidWdcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgZnVuY3Rpb24oKSB7fSk7XG4gICAgd2luZG93LndlcyA9IHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IFNjZW5lIHRvIHRoZSBTY3JvbGxpZnkgb2JqZWN0LiBTY2VuZSBpbmZvcm1hdGlvbiBpbmNsdWRlcyB3aGVuXG4gICAqIHRvIHN0YXJ0IGFwcGx5aW5nIGFuIGVmZmVjdCBhbmQgZm9yIGhvdyBsb25nLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdHM6IFZhcmlvdXMgb3B0aW9ucyB0byBhcHBseSB0byB0aGUgbmV3IFNjZW5lOlxuICAgKlxuICAgKiAgIHN0YXJ0OiAocmVxdWlyZWQpIFdoZW4gdG8gc3RhcnQgdGhlIGVmZmVjdC4gSXQgaXMgYSAwIC0gMSB2YWx1ZVxuICAgKiAgICAgICAgICByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KS5cbiAgICogICAgICAgICAgQW55IGVmZmVjdHMgaW4gdGhlIFNjZW5lIHdpbGwgYmVnaW4gd2hlbiB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqICAgICAgICAgIGNyb3NzZXMgdGhpcyB0aHJlc2hvbGQuXG4gICAqXG4gICAqICAgZHVyYXRpb246IFRoZSBsZW5ndGggb2YgdGhlIGVmZmVjdCwgaW4gcGl4ZWxzLiBTY3JvbGxpZnkgd2lsbFxuICAgKiAgICAgICAgICBpbnRlcnBvbGF0ZSB0aGF0IGludG8gdmFsdWUgaW50byBhIFwicHJvZ3Jlc3NcIiB2YXJpYWJsZSwgYm91bmRlZFxuICAgKiAgICAgICAgICBieSAwIC0gMS4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZVxuICAgKiAgICAgICAgICB2aWV3cG9ydCArIGVsZW1lbnQgaGVpZ2h0LCBtZWFuaW5nIHRoZSBlZmZlY3Qgd2lsbCBsYXN0IGZvciBhc1xuICAgKiAgICAgICAgICBsb25nIGFzIHRoZSBlbGVtZW50IGlzIHZpc2libGUuXG4gICAqXG4gICAqICAgdHJpZ2dlcjogSWYgc3VwcGxpZWQsIFNjcm9sbGlmeSB3aWxsIHVzZSB0aGlzIGVsZW1lbnQncyBwb3NpdGlvbiB0b1xuICAgKiAgICAgICAgICBzdGFydCBhbnkgU2NlbmUgZWZmZWN0cy4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZGVmYXVsdCBpcyB0byB1c2VcbiAgICogICAgICAgICAgdGhlIGVsZW1lbnQgaXRzZWxmIGFzIGEgdHJpZ2dlci5cbiAgICpcbiAgICogICBlYXNpbmc6IEVhc2UgaW4vb3V0IG9mIGFuIGVmZmVjdC4gQW55IHZhbHVlIGZyb20gUm9iZXJ0IFBlbm5lcidzIGVhc2luZ1xuICAgKiAgICAgICAgICBmdW5jdGlvbnMgaXMgdmFsaWQuXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRhZGRTY2VuZShvcHRzKSB7XG5cdFx0bGV0IHRyaWdnZXJQb3MgPSBvcHRzLnN0YXJ0IHx8IDA7XG5cdFx0bGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgKyB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXHRcdGxldCBlZmZlY3RzID0gb3B0cy5lZmZlY3RzIHx8IFtdO1xuICAgIGxldCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRzLnRyaWdnZXIpIHx8IHRoaXMuZWxlbWVudDsgLy8gLnBhcmVudE5vZGU7XG5cdFx0bGV0IHNjZW5lID0ge1xuXHRcdFx0J2FjdGl2ZSc6IHRydWUsXG5cdFx0XHQndHJpZ2dlcic6IHRyaWdnZXIsXG5cdFx0XHQndHJpZ2dlclBvcyc6IHRyaWdnZXJQb3MsXG5cdFx0XHQnZHVyYXRpb24nOiBkdXJhdGlvbixcblx0XHRcdCdlZmZlY3RzJzogW11cblx0XHR9O1xuXG5cdFx0ZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4ge1xuXHRcdFx0dGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG5cdFx0XHRpZiAoZWZmZWN0Lm5hbWUgPT0gJ3N0aWNrJykgc2NlbmUuaXNTdGlja3kgPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG5cdFx0dGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgZWFjaCBzY2VuZS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG5cdFx0bGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuXHRcdGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGxldCB3aGVyZSA9IDEgLSBzY2VuZS50cmlnZ2VyUG9zO1xuXHRcdGxldCB0b3AgPSAwO1xuXG5cdFx0ZG8ge1xuXHRcdFx0dG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG5cdFx0XHR0cmlnZ2VyID0gdHJpZ2dlci5vZmZzZXRQYXJlbnQ7XG5cdFx0fSB3aGlsZSh0cmlnZ2VyKTtcblx0XHQvLyBWUy4gP1xuXHRcdC8vIHRvcCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFk7XG5cblx0XHRzY2VuZS5zdGFydCA9IHRvcCAtICh3aGVyZSAqIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIChjYW4gYmUgbmVnYXRpdmUpXG5cblx0XHRpZiAoc2NlbmUuaXNTdGlja3kpIHtcblx0XHRcdGxldCBkID0gc2NlbmUuZHVyYXRpb24gfHwgMDtcblx0XHRcdGxldCBoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuXHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUuc3R5bGUucGFkZGluZ0JvdHRvbSA9IGQgKyBoICsgJ3B4Jztcblx0XHR9XG5cblx0XHR0aGlzLmNhbGN1bGF0ZShzY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiB0byBhIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd8RnVuY3Rpb259IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiBPUiBhbiBhY3R1YWwgZnVuY3Rpb24gdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uczogQW55IHRyYW5zZm9ybWF0aW9uIG9wdGlvbnMuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgb3B0aW9ucz17fSwgc2NlbmUpIHtcblx0XHRsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICAgIGlmICghc2NlbmUpIHtcbiAgICAgIGlmICh0aGlzLnNjZW5lcy5sZW5ndGgpIHtcbiAgICAgICAgc2NlbmUgPSB0aGlzLnNjZW5lc1t0aGlzLnNjZW5lcy5sZW5ndGggLSAxXTsgIC8vIHVzZSB0aGUgbW9zdCByZWNlbnRseSBhZGRlZCBzY2VuZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU2NlbmUoeyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIG5vIHNjZW5lIChpZSBcImFkZEVmZmVjdFwiIHdhcyBjYWxsZWQgZGlyZWN0bHkgb24gU2Nyb2xsaWZ5KSwgc2V0IHVwIGEgZGVmYXVsdCBvbmVcbiAgICAgICAgICAnZWZmZWN0cyc6IFt7ICduYW1lJzogbmFtZSwgJ29wdGlvbnMnOiBvcHRpb25zIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuXHRcdGxldCBlZmZlY3QgPSB0eXBlb2YgbmFtZSA9PSAnZnVuY3Rpb24nID8gbmFtZSA6IGVmZmVjdExpc3RbbmFtZV07XG5cdFx0bGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgIC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0bGV0IGNvbnRleHQgPSB7XG5cdFx0XHRcdFx0J29wdGlvbnMnOiBvcHRpb25zLFxuXHRcdFx0XHRcdCdlbGVtZW50JzogZWxlbWVudFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZuLmNhbGwoY29udGV4dCwgdGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdH07XG5cdFx0fTtcblxuXHRcdHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIG9uU2Nyb2xsIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdC8vIGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0Ly8gfVxuXHR9XG5cblx0LyoqXG5cdCAqIG9uUmVzaXplIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbCBhcyB0aGUgdHJhbnNmb3JtYXRpb25zIHRvIGFwcGx5LlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0Y2FsY3VsYXRlKHNjZW5lKSB7XG5cdFx0bGV0IHN0YXJ0ID0gc2NlbmUuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gc2NlbmUuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcztcdC8vICA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblxuXHRcdGlmICghc2NlbmUuYWN0aXZlKSB7IHJldHVybjsgfVxuXHRcdGlmIChzY2VuZS5lYXNpbmcpIHtcdC8vIFx0XHRcdFx0XHRcdHN0YXJ0LCB0bywgZnJvbSwgZW5kXG5cdFx0XHRwcm9ncmVzcyA9IGVhc2Vbc2NlbmUuZWFzaW5nXShzY3JvbGwgLSBzdGFydCwgMS4wLCAwLjAsIGR1cmF0aW9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvZ3Jlc3MgPSAoc2Nyb2xsIC0gc3RhcnQpIC8gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0c2NlbmUuYWN0aXZlID0gKHByb2dyZXNzID4gMCAmJiBwcm9ncmVzcyA8IDEpO1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHQvLyBpZiAocHJvZ3Jlc3MgPD0gMCB8fCBwcm9ncmVzcyA+PSAxKSB7XG5cdFx0Ly8gXHRyZXR1cm47XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gVXNlICphY3R1YWwqIHBvc2l0aW9uIGRhdGEuIEFuIGVsZW1lbnQgbWF5IGJlIG9uc2NyZWVuIHdoaWxlIGl0cyByZWZlcmVuY2UgKHRyaWdnZXIpXG5cdFx0Ly8gZWxlbWVudCBpcyBub3QuIFByb2dyZXNzIG1heSBiZSBuZWdhdGl2ZSBvciA+IDEuMCBpbiBzb21lIGluc3RhbmNlcy5cblx0XHQvLyBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCB8fFxuXHRcdC8vIFx0XHR0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgMFxuXHRcdC8vICkge1xuXHRcdC8vIFx0cmV0dXJuO1xuXHRcdC8vIH1cbiAgICAvLyBwcm9ncmVzcyA9IE1hdGgubWluKDEuMCwgTWF0aC5tYXgoMCwgcHJvZ3Jlc3MpKTtcblxuXG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHNjZW5lLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRlZmZlY3QuY2FsbCh7XG5cdFx0XHRcdCdwcm9ncmVzcyc6IHByb2dyZXNzLFxuXHRcdFx0XHQnYWJzb2x1dGUnOiBzY3JvbGwgLSBzdGFydFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iLCJcbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdGlmICggZG9jdW1lbnQuYm9keS5zdHlsZVt0cmFuc2Zvcm1zW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblx0XHRicmVhaztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm07Il19
