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
var currentState = 'normal';
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
  if (currentState === state) {
    return;
  }
  if (state == 'sticky') {
    var BCR = element.getBoundingClientRect();
    applyStyles(BCR, element);
    element.style.position = 'fixed';
  } else {
    element.style.position = '';
  }

  element.classList.remove(currentState);
  element.classList.add(state);
  currentState = state;
}

function applyStyles(styles, element) {
  for (var prop in styles) {
    if (prop == 'bottom' || prop == 'right') {
      continue;
    }
    element.style[prop] = styles[prop] + 'px';
  }
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
	}

	/**
  * params: any TWO of: start / stop / duration.
  *         start: a percentage of the viewport (eg. 0.5) OR a reference element's position (eg ['#toggle', 0.3] )
  *         stop: a percentage of the viewport OR a reference element's position
  *         duration: the duration in pixels
  *
  *         default is 0 - 100% (making duration the window height + element height)
  *
  *         examples:
  *          { start: 0, stop: 0.5 }
  *          { start: 0.1, duration: '400px' }
  *          { duration: 100px, stop: 1.0 }
  *          { start: ['#toggle', 0.3], stop: ['#toggle', 0.5] }
  *          { start: ['#toggle', 0.3], duration: '300px' }
  *
  *         easing...? start, to, from, duration
  *
  */


	_createClass(Scrollify, [{
		key: 'addScene',
		value: function addScene(opts) {
			var _this2 = this;

			var start = opts.start === undefined ? false : opts.start;
			var duration = opts.duration || null;
			var effects = opts.effects || [];
			var trigger = opts.trigger || this.element; // .parentNode;
			var scene = {
				'trigger': trigger,
				'_start': start,
				'duration': duration,
				'effects': []
			};

			if (start === false) {
				console.log('Scrollify [error]: Cannot add Scene. Missing "start" argument.');return;
			}

			effects.forEach(function (effect) {
				_this2.addEffect(effect.name, effect.options, scene);
				if (effect.name == 'stick') _this2.isSticky = true;
			});

			if (duration) {
				this.duration = duration;
			}

			this.updateScene(scene);
			this.scenes.push(scene);

			if (this.element.id == 'sequence') {
				console.log(this);
			}

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
			var where = 1 - scene._start; // 1
			var top = 0; // window.scrollY;

			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);

			scene.start = top - where * window.innerHeight; // (can be negative)

			if (scene.isSticky) {
				var d = scene.duration || 0;
				var h = this.element.getBoundingClientRect().height;
				this.element.parentNode.style.paddingBottom = d + h + 'px';
				console.log('sticky update', this.element.id);
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

			if (!scene && this.scenes.length == 1) {
				scene = this.scenes[0];
			}

			if (scene) {
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
			} else {
				// if no scene (ie "effect" was called directly on Scrollify), set up a default scene
				return this.addScene({
					'start': 0,
					'duration': window.innerHeight + element.offsetHeight,
					'effects': [{
						'name': name, 'options': options
					}]
				});
			}

			return this;
		}

		/**
   * onScroll Handler
   * @return {void}
   */

	}, {
		key: 'onScroll',
		value: function onScroll() {
			if (!this.ticking) {
				this.ticking = true;
				window.requestAnimationFrame(this.update.bind(this));
				this.scroll = window.scrollY;
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

			// this.throttle(this.updateScene);
			this.scenes.forEach(function (scene) {
				return _this3.updateScene(scene);
			});
		}

		/**
   * Limit frequency of DOM updates on resize
   */

	}, {
		key: 'throttle',
		value: function throttle() {}

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

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (progress < 0 || progress > 1) { return; }

			// Use *actual* position data. An element may be onscreen while its reference (trigger) element is not.
			if (this.element.getBoundingClientRect().top > window.innerHeight || this.element.getBoundingClientRect().bottom < 0) {
				return;
			}

			if (scene.easing) {
				// 						start, to, from, end
				progress = ease[scene.easing](scroll - start, 1.0, 0.0, duration);
			} else {
				progress = (scroll - start) / duration;
			}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWFzaW5ncy5qcyIsInNyYy9lZmZlY3RzLmpzIiwic3JjL3Njcm9sbGlmeS5qcyIsInNyYy9zaGltLmpzIiwic3JjL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDRWdCO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUtBO1FBSUE7UUFJQTtRQUlBO1FBSUE7UUFJQTtRQU9BO1FBSUE7UUFJQTtRQUtBO1FBZ0JBO1FBZ0JBO1FBaUJBO1FBS0E7UUFLQTtRQU1BOzs7QUE3SlQsU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUwsQ0FBTCxHQUFlLENBQWYsR0FBbUIsQ0FBbkIsQ0FEOEI7Q0FBaEM7O0FBSUEsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCLEVBQWlDO0FBQ3RDLFNBQU8sQ0FBQyxDQUFELElBQU0sS0FBSyxDQUFMLENBQU4sSUFBaUIsSUFBSSxDQUFKLENBQWpCLEdBQTBCLENBQTFCLENBRCtCO0NBQWpDOztBQUlBLFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQztBQUN4QyxNQUFJLENBQUMsS0FBTyxJQUFJLENBQUosQ0FBUixHQUFpQixDQUFqQixFQUFvQjtBQUFFLFdBQU8sSUFBSSxDQUFKLEdBQVEsQ0FBUixHQUFZLENBQVosR0FBZ0IsQ0FBaEIsQ0FBVDtHQUF4QjtBQUNBLFNBQU8sQ0FBQyxDQUFELEdBQUssQ0FBTCxJQUFVLEVBQUUsQ0FBRixJQUFPLElBQUksQ0FBSixDQUFQLEdBQWdCLENBQWhCLENBQVYsR0FBK0IsQ0FB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QyxTQUF2QyxFQUFrRDtBQUN0RCxjQUFZLFdBQVcsQ0FBWCxDQUFaLENBRHNEO0FBRXRELFFBRnNEO0VBQXZEO0NBREQ7O2tCQU9lIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDEyMF0qL1xuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgIC89ICBkIC8gMikgPCAxKSB7IHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjsgfVxuICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zaW4odCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCAvIGQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiB0ID09IDAgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIHQgPT0gZCA/IGIgKyBjIDogYyAqICgtTWF0aC5wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKHQgPT0gZCkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIGMgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQ2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICogTWF0aC5zcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHsgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjsgfVxuICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gIHZhciBzID0gMS43MDE1ODtcbiAgdmFyIHAgPSAwO1xuICB2YXIgYSA9IGM7XG5cbiAgaWYgKHQgPT0gMCkgeyByZXR1cm4gYjsgfVxuICBpZiAoKHQgLz0gZCkgPT0gMSkgeyByZXR1cm4gYiArIGM7IH1cbiAgaWYgKCFwKSB7IHAgPSBkICogLjM7IH1cbiAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgIGEgPSBjOyB2YXIgcyA9IHAgLyA0O1xuICB9IGVsc2Uge1xuICAgIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICB9XG4gIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgdmFyIHMgPSAxLjcwMTU4O1xuICB2YXIgcCA9IDA7XG4gIHZhciBhID0gYztcblxuICBpZiAodCA9PSAwKSB7IHJldHVybiBiOyB9XG4gIGlmICgodCAvPSBkKSA9PSAxKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAuMzsgfVxuICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgYSA9IGM7IHZhciBzID0gcCAvIDQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gIH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLC0xMCAqIHQpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyBjICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICB2YXIgcyA9IDEuNzAxNTg7XG4gIHZhciBwID0gMDtcbiAgdmFyIGEgPSBjO1xuXG4gIGlmICh0ID09IDApIHsgcmV0dXJuIGI7IH1cbiAgaWYgKCh0IC89IGQgLyAyKSA9PSAyKSB7IHJldHVybiBiICsgYzsgfVxuICBpZiAoIXApIHsgcCA9IGQgKiAoLjMgKiAxLjUpOyB9XG4gIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICBhID0gYzsgdmFyIHMgPSBwIC8gNDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgfVxuICBpZiAodCA8IDEpIHsgcmV0dXJuIC0uNSAqIChhICogTWF0aC5wb3coMiwxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7IH1cbiAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIC41ICsgYyArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgaWYgKHMgPT0gdW5kZWZpbmVkKSB7IHMgPSAxLjcwMTU4OyB9XG4gIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICBpZiAocyA9PSB1bmRlZmluZWQpIHsgcyA9IDEuNzAxNTg7IH1cbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gIGlmIChzID09IHVuZGVmaW5lZCkgeyBzID0gMS43MDE1ODsgfVxuICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgeyByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7IH1cbiAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgaWYgKHQgLz0gZCA8IDEgLyAyLjc1KSB7XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUpICsgYjtcbiAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NSkgKyBiO1xuICB9XG59XG4iLCJpbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcblxuLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogT3B0aW9ucyBhcmUgYXBwbGllZCBhdCBpbml0aWFsaXplLCBhbmQgYXJlIGN1cnJpZWQgaW4gdmlhIFwidGhpc1wiLlxuICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5cblxuLyoqXG4gKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuICogQHR5cGUge09iamVjdH0gb3B0czogWW91IG1heSBkZWZpbmUgcGFyYWxsYXggXCJzcGVlZFwiIG9yIHBhcmFsbGF4IFwicmFuZ2VcIiAoaW4gcGl4ZWxzKS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJhbGxheChkYXRhKSB7XG5cdGxldCBvZmZzZXQgPSAwO1xuXHRsZXQgb3B0cyA9IHRoaXMub3B0aW9ucztcblxuXHRpZiAob3B0cy5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7ICAgICAgICAgICAgICAgICAvLyBjaGVjayBzcGVlZCBmaXJzdFxuXHRcdG9mZnNldCA9IGRhdGEuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHR9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdG9mZnNldCA9IGRhdGEucHJvZ3Jlc3MgKiAob3B0cy5yYW5nZSB8fCAwKTsgICAvLyBkZWZhdWx0IGlzIFwiMFwiLCBubyBlZmZlY3Rcblx0fVxuXG5cdHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xufVxuXG4vKipcbiAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZi5cbiAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFRoZSBcImNsYXNzXCIgdG8gdG9nZ2xlLCBhbmQgd2hlbiAoaWUuIGF0IHdoaWNoIHBvaW50IGluIHRoZSBwcm9ncmVzcylcbiAqIEB0aGlzOiBhbiBvYmplY3QgY29udGFpbmluZyBPcHRpb25zICsgZWxlbWVudCByZWZlcmVuY2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUoZGF0YSkge1xuXHRsZXQgb3B0cyA9IHRoaXMub3B0aW9ucztcblx0bGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG5cdGxldCB0aW1lcyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRsZXQgbm93ID0gZGF0YS5wcm9ncmVzcztcblxuXHR0aW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRsZXQgY3NzID0gb3B0c1t0aW1lXTtcblx0XHRpZiAobm93ID4gdGltZSkge1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogW3JvdGF0ZSBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKGRhdGEpIHtcblx0dmFyIGRlZ3JlZXMgPSB0aGlzLm9wdGlvbnMuZGVnICogZGF0YS5wcm9ncmVzcztcblx0dGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoJysgZGVncmVlcyArJ2RlZyknO1xufTtcblxuLyoqXG4gKiBEdW1teSBlZmZlY3QgZm9yIHRlc3RpbmcsIGF0IHRoZSBtb21lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVgoZGF0YSkge1xuXHRsZXQgb2Zmc2V0ID0gZGF0YS5hYnNvbHV0ZTtcblx0bGV0IHByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcblx0bGV0IGRlbGF5ID0gd2luZG93LmlubmVySGVpZ2h0O1x0Ly8gc3RhcnQgdHJhbnNsYXRpbmcgYWZ0ZXIgb25lIHdpbmRvdy1oZWlnaHQgb2Ygc2Nyb2xsaW5nXG5cdGxldCBkaXN0YW5jZSA9IDUwMDtcblxuXHRvZmZzZXQgPSBwcm9ncmVzcyAqIGRpc3RhbmNlO1xuXHRvZmZzZXQgLT0gZGVsYXk7XG5cblx0dGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZTNkKCcgKyBvZmZzZXQgKyAncHgsIDAsIDApJztcbn1cblxuXG4vKipcbiAqIFN0aWNreSBFbGVtZW50IHNldHN1cCBhIHN0aWNreSBlbGVtZW50IHdoaWNoIHRvZ2dsZSBwb3NpdGlvbiBmaXhlZCBvbiAvIG9mZi5cbiAqIEBwYXJhbSAge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5sZXQgY3VycmVudFN0YXRlID0gJ25vcm1hbCc7XG5leHBvcnQgZnVuY3Rpb24gc3RpY2soZGF0YSkge1xuXHRsZXQgcHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuXHRsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuXHRpZiAocHJvZ3Jlc3MgPCAwKSB7XG5cdFx0c2V0U3RhdGUoZWxlbWVudCwgJ25vcm1hbCcpO1xuXHR9IGVsc2UgaWYgKHByb2dyZXNzID4gMSkge1xuXHRcdHNldFN0YXRlKGVsZW1lbnQsICdib3R0b20nKTtcblx0fSBlbHNlIHtcblx0XHRzZXRTdGF0ZShlbGVtZW50LCAnc3RpY2t5Jyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0U3RhdGUoZWxlbWVudCwgc3RhdGUpIHtcbiAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gIGlmIChzdGF0ZSA9PSAnc3RpY2t5Jykge1xuICAgIGxldCBCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGFwcGx5U3R5bGVzKEJDUiwgZWxlbWVudCk7XG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICB9XG5cbiAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdGF0ZSk7XG4gIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXMsIGVsZW1lbnQpIHtcbiAgZm9yIChsZXQgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICBpZiAocHJvcCA9PSAnYm90dG9tJyB8fCBwcm9wID09ICdyaWdodCcpIHsgY29udGludWU7IH1cbiAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdICsgJ3B4JztcbiAgfVxufVxuIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cblxuLy8gVE9ETyBhZGQgd2Vha21hcCBzdXBwb3J0IGZvciBwdWJsaWMgLyBwcml2YXRlIG1ldGhvZHNcblxuLy8gaW1wb3J0IFN0aWNreSBmcm9tICcuL3N0aWNreSc7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCAqIGFzIGVhc2UgZnJvbSAnLi9lYXNpbmdzJztcbmltcG9ydCAqIGFzIGVmZmVjdExpc3QgZnJvbSAnLi9lZmZlY3RzJztcblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY2VuZXMgPSBbXTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHBhcmFtczogYW55IFRXTyBvZjogc3RhcnQgLyBzdG9wIC8gZHVyYXRpb24uXG5cdCAqICAgICAgICAgc3RhcnQ6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpIE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbiAoZWcgWycjdG9nZ2xlJywgMC4zXSApXG5cdCAqICAgICAgICAgc3RvcDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb25cblx0ICogICAgICAgICBkdXJhdGlvbjogdGhlIGR1cmF0aW9uIGluIHBpeGVsc1xuXHQgKlxuXHQgKiAgICAgICAgIGRlZmF1bHQgaXMgMCAtIDEwMCUgKG1ha2luZyBkdXJhdGlvbiB0aGUgd2luZG93IGhlaWdodCArIGVsZW1lbnQgaGVpZ2h0KVxuXHQgKlxuXHQgKiAgICAgICAgIGV4YW1wbGVzOlxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLCBzdG9wOiAwLjUgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLjEsIGR1cmF0aW9uOiAnNDAwcHgnIH1cblx0ICogICAgICAgICAgeyBkdXJhdGlvbjogMTAwcHgsIHN0b3A6IDEuMCB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIHN0b3A6IFsnI3RvZ2dsZScsIDAuNV0gfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBkdXJhdGlvbjogJzMwMHB4JyB9XG5cdCAqXG5cdCAqICAgICAgICAgZWFzaW5nLi4uPyBzdGFydCwgdG8sIGZyb20sIGR1cmF0aW9uXG5cdCAqXG5cdCAqL1xuXHRhZGRTY2VuZShvcHRzKSB7XG5cdFx0bGV0IHN0YXJ0ID0gKG9wdHMuc3RhcnQgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6IG9wdHMuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCBudWxsO1xuXHRcdGxldCBlZmZlY3RzID0gb3B0cy5lZmZlY3RzIHx8IFtdO1xuXHRcdGxldCB0cmlnZ2VyID0gb3B0cy50cmlnZ2VyIHx8IHRoaXMuZWxlbWVudDsgLy8gLnBhcmVudE5vZGU7XG5cdFx0bGV0IHNjZW5lID0ge1xuXHRcdFx0J3RyaWdnZXInOiB0cmlnZ2VyLFxuXHRcdFx0J19zdGFydCc6IHN0YXJ0LFxuXHRcdFx0J2R1cmF0aW9uJzogZHVyYXRpb24sXG5cdFx0XHQnZWZmZWN0cyc6IFtdXG5cdFx0fTtcblxuXHRcdGlmIChzdGFydCA9PT0gZmFsc2UpIHsgY29uc29sZS5sb2coJ1Njcm9sbGlmeSBbZXJyb3JdOiBDYW5ub3QgYWRkIFNjZW5lLiBNaXNzaW5nIFwic3RhcnRcIiBhcmd1bWVudC4nKTsgcmV0dXJuOyB9XG5cblx0XHRlZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4ge1xuXHRcdFx0dGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG5cdFx0XHRpZiAoZWZmZWN0Lm5hbWUgPT0gJ3N0aWNrJykgdGhpcy5pc1N0aWNreSA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuXHRcdGlmICh0aGlzLmVsZW1lbnQuaWQgPT0gJ3NlcXVlbmNlJykge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIGVhY2ggc2NlbmUuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gc2NlbmU6IFRoZSBzY2VuZSB0byB1cGRhdGUuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR1cGRhdGVTY2VuZShzY2VuZSkge1xuXHRcdGxldCB0cmlnZ2VyID0gc2NlbmUudHJpZ2dlcjtcblx0XHRsZXQgQkNSID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRsZXQgd2hlcmUgPSAxIC0gc2NlbmUuX3N0YXJ0O1x0Ly8gMVxuXHRcdGxldCB0b3AgPSAwO1x0Ly8gd2luZG93LnNjcm9sbFk7XG5cblx0XHRkbyB7XG5cdFx0XHR0b3AgKz0gdHJpZ2dlci5vZmZzZXRUb3AgfHwgMDtcblx0XHRcdHRyaWdnZXIgPSB0cmlnZ2VyLm9mZnNldFBhcmVudDtcblx0XHR9IHdoaWxlKHRyaWdnZXIpO1xuXG5cdFx0c2NlbmUuc3RhcnQgPSB0b3AgLSAod2hlcmUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpOyAvLyAoY2FuIGJlIG5lZ2F0aXZlKVxuXG5cdFx0aWYgKHNjZW5lLmlzU3RpY2t5KSB7XG5cdFx0XHRsZXQgZCA9IHNjZW5lLmR1cmF0aW9uIHx8IDA7XG5cdFx0XHRsZXQgaCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZS5wYWRkaW5nQm90dG9tID0gKGQraCkgKyAncHgnO1xuXHRcdFx0Y29uc29sZS5sb2coJ3N0aWNreSB1cGRhdGUnLCB0aGlzLmVsZW1lbnQuaWQpO1xuXHRcdH1cblxuXHRcdHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBvcHRpb25zPXt9LCBzY2VuZSkge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG5cdFx0aWYgKCFzY2VuZSAmJiB0aGlzLnNjZW5lcy5sZW5ndGggPT0gMSkge1xuXHRcdFx0c2NlbmUgPSB0aGlzLnNjZW5lc1swXTtcblx0XHR9XG5cblx0XHRpZiAoc2NlbmUpIHtcblx0XHRcdGxldCBlZmZlY3QgPSAodHlwZW9mIG5hbWUgPT0gJ2Z1bmN0aW9uJykgPyBuYW1lIDogZWZmZWN0TGlzdFtuYW1lXTtcblx0XHRcdGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgIC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0XHRsZXQgY29udGV4dCA9IHtcblx0XHRcdFx0XHRcdCdvcHRpb25zJzogb3B0aW9ucyxcblx0XHRcdFx0XHRcdCdlbGVtZW50JzogZWxlbWVudFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Zm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHNjZW5lLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3QsIG9wdGlvbnMpKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBpZiBubyBzY2VuZSAoaWUgXCJlZmZlY3RcIiB3YXMgY2FsbGVkIGRpcmVjdGx5IG9uIFNjcm9sbGlmeSksIHNldCB1cCBhIGRlZmF1bHQgc2NlbmVcblx0XHRcdHJldHVybiB0aGlzLmFkZFNjZW5lKHtcblx0XHRcdFx0J3N0YXJ0JzogMCxcblx0XHRcdFx0J2R1cmF0aW9uJzogd2luZG93LmlubmVySGVpZ2h0ICsgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG5cdFx0XHRcdCdlZmZlY3RzJzogW3tcblx0XHRcdFx0XHQnbmFtZSc6IG5hbWUsICdvcHRpb25zJzogb3B0aW9uc1xuXHRcdFx0XHR9XVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogb25TY3JvbGwgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogb25SZXNpemUgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0Ly8gdGhpcy50aHJvdHRsZSh0aGlzLnVwZGF0ZVNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKChzY2VuZSkgPT4gdGhpcy51cGRhdGVTY2VuZShzY2VuZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpbWl0IGZyZXF1ZW5jeSBvZiBET00gdXBkYXRlcyBvbiByZXNpemVcblx0ICovXG5cdHRocm90dGxlKCkge1xuXG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbCBhcyB0aGUgdHJhbnNmb3JtYXRpb25zIHRvIGFwcGx5LlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0Y2FsY3VsYXRlKHNjZW5lKSB7XG5cdFx0bGV0IHN0YXJ0ID0gc2NlbmUuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gc2NlbmUuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcztcdC8vICA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0Ly8gaWYgKHByb2dyZXNzIDwgMCB8fCBwcm9ncmVzcyA+IDEpIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBVc2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YS4gQW4gZWxlbWVudCBtYXkgYmUgb25zY3JlZW4gd2hpbGUgaXRzIHJlZmVyZW5jZSAodHJpZ2dlcikgZWxlbWVudCBpcyBub3QuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcblx0XHRcdFx0dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA8IDBcblx0XHQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoc2NlbmUuZWFzaW5nKSB7XHQvLyBcdFx0XHRcdFx0XHRzdGFydCwgdG8sIGZyb20sIGVuZFxuXHRcdFx0cHJvZ3Jlc3MgPSBlYXNlW3NjZW5lLmVhc2luZ10oc2Nyb2xsIC0gc3RhcnQsIDEuMCwgMC4wLCBkdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0c2NlbmUuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcblx0XHRcdGVmZmVjdC5jYWxsKHtcblx0XHRcdFx0J3Byb2dyZXNzJzogcHJvZ3Jlc3MsXG5cdFx0XHRcdCdhYnNvbHV0ZSc6IHNjcm9sbCAtIHN0YXJ0XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBQdXQgQ2Fyb3VzZWwgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiIsIlxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybTsiXX0=
