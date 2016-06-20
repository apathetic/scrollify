(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parallax = parallax;
exports.toggle = toggle;
exports.translateX = translateX;

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
	var times = Object.keys(opts); // times
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
 * Dummy effect for testing, at the moment
 */
function translateX(opts) {
	var offset = this.absolute;
	var on = Object.keys(opts);
	var delay = window.innerHeight; // start translating after one window-height of scrolling

	offset -= delay;

	// if (this.percent < 0.5) {    // test: start translating when element is centered in viewport
	//   offset -= delay;
	// } else {
	//   offset = 0;
	// }

	//  ease = easeInQuad(elapsed,     start, end, duration);
	var distance = 500;
	var ease = easeInQuad(this.percent * 100, 0, distance, 100);

	this.el.style[_transform2.default] = 'translate3d(' + ease + 'px, 0, 0)';
}

},{"./transform":5}],2:[function(require,module,exports){
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

// import {easeInOutCubic} from './easings';


var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _effects = require('./effects');

var effectList = _interopRequireWildcard(_effects);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Scrollify Class
 */

var Scrollify = function () {
	function Scrollify(element, debug) {
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
		this.debug = debug;

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
				'start': start,
				'duration': duration,
				'effects': []
			};

			if (start === false) {
				console.log('Scrollify [error]: Cannot add Scene. Missing "start" argument.');return;
			}

			effects.forEach(function (effect) {
				_this2.addEffect(effect.name, effect.options, scene);
			});

			if (duration) {
				this.duration = duration;
			}

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
			var where = 1;
			var top = 0; // window.scrollY;

			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);

			scene.start = top - where * window.innerHeight;

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

				// console.log(effect, options);
				scene.effects.push(curry(effect, options));

				if (name == 'stick') {
					var d = scene.duration || 0;
					var h = element.getBoundingClientRect().height;
					element.parentNode.style.paddingBottom = d + h + 'px';
					new _sticky2.default(element, true);
				}
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
			// let data = this.data;
			var start = scene.start;
			var duration = scene.duration;
			var scroll = this.scroll;
			var progress = (scroll - start) / duration;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (progress < 0 || progress > 1) { return; }

			// Use *actual* position data. An element may be onscreen while its reference (trigger) element is not.
			if (this.element.getBoundingClientRect().top > window.innerHeight || this.element.getBoundingClientRect().bottom < 0) {
				return;
			}

			if (this.debug) {
				console.log(this.debug, progress);
			}

			// start      to  from  end
			// let easing = easeInOutQuad(data.start, 100, 0, data.start+data.duration);

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

},{"./effects":1,"./sticky":4,"./transform":5}],3:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Scrollify = _scrollify2.default; /**
                                         * Put Carousel into the Global scope.
                                         * Useful for existing demos or if you wish to include manually
                                         */

},{"./scrollify.js":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Sticky
 * https://github.com/apathetic/....?
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/

// boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
// copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);

function copyStyles(element) {
  var style = element.style;
  var props = ['width', 'height', 'position', 'boxSizing', 'mozBoxSizing', 'webkitBoxSizing'];

  element.originalStyles = {};
  props.forEach(function (val) {
    element.originalStyles[val] = style[val] || '';
  });
}

function applyStyles(styles, element) {
  var addedProps = {};
  for (var prop in styles) {
    if (prop == 'bottom' || prop == 'right') {
      continue;
    }
    element.style[prop] = styles[prop] + 'px';
    addedProps[prop] = styles[prop];
  }
  // element.addedProps = addedProps;
}

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
function Sticky(_sticky) {
  var bounded = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  _sticky = _sticky instanceof HTMLElement ? _sticky : document.querySelector(_sticky);
  if (!_sticky) {
    return false;
  }

  var parent = _sticky.parentNode,

  // stickyPosition,
  // parentPosition,
  currentState = '_',
      stateSwitcher,
      determine = {
    normal: function normal() {
      var stickyPosition = _sticky.getBoundingClientRect();
      if (stickyPosition.top < 1) {
        applyStyles(stickyPosition, _sticky);
        _sticky.style.position = 'fixed';
        return setState('sticky');
      }
    },
    sticky: function sticky() {
      var parentPosition = parent.getBoundingClientRect();
      if (parentPosition.top > 1) {
        _sticky.style = '';
        return setState('normal');
      }
      if (bounded) {
        var stickyPosition = _sticky.getBoundingClientRect();
        if (parentPosition.bottom < stickyPosition.bottom) {
          _sticky.style = '';
          return setState('bottom');
        }
      }
    },
    bottom: function bottom() {
      var stickyPosition = _sticky.getBoundingClientRect();
      if (stickyPosition.top > 1) {
        applyStyles(stickyPosition, _sticky);
        _sticky.style.position = 'fixed';
        return setState('sticky');
      }
    }
  };

  function setState(state) {
    if (currentState === state) {
      return;
    }
    _sticky.classList.remove(currentState);
    _sticky.classList.add(state);
    currentState = state;
    stateSwitcher = determine[state];
  }

  // stickyPosition = sticky.getBoundingClientRect();

  //sticky initial position
  if (_sticky.getBoundingClientRect().top < 1) {
    setState('sticky');
    stateSwitcher(); // edge case: check if bottom of sticky collides w/ bounding container
  } else {
      setState('normal');
    }

  // window.addEventListener('scroll', stateSwitcher);
  window.addEventListener('scroll', function () {
    stateSwitcher();
  }); // stateSwitcher changes, so cannot pass (ie. bind directly) here
  window.addEventListener('resize', function () {
    stateSwitcher();
  });
}
exports.default = Sticky;

},{}],5:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZWZmZWN0cy5qcyIsInNyYy9zY3JvbGxpZnkuanMiLCJzcmMvc2hpbS5qcyIsInNyYy9zdGlja3kuanMiLCJzcmMvdHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7UUNlZ0I7UUFtQkE7UUFtQkE7O0FBckRoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZU8sU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCO0FBQzlCLEtBQUksU0FBUyxDQUFULENBRDBCO0FBRTlCLEtBQUksT0FBTyxLQUFLLE9BQUwsQ0FGbUI7O0FBSTlCLEtBQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDN0IsV0FBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBREk7RUFBOUIsTUFFTzs7QUFDTixXQUFTLEtBQUssUUFBTCxJQUFpQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWpCO0FBREgsRUFGUDs7QUFNQSxNQUFLLE9BQUwsQ0FBYSxLQUFiLHdCQUFnQyxrQkFBaUIsTUFBakIsR0FBeUIsS0FBekIsQ0FWRjtDQUF4Qjs7Ozs7Ozs7QUFtQkEsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQzVCLEtBQUksT0FBTyxLQUFLLE9BQUwsQ0FEaUI7QUFFNUIsS0FBSSxVQUFVLEtBQUssT0FBTCxDQUZjO0FBRzVCLEtBQUksUUFBUSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQVI7QUFId0IsS0FJeEIsTUFBTSxLQUFLLFFBQUwsQ0FKa0I7O0FBTTVCLE9BQU0sT0FBTixDQUFjLFVBQVMsSUFBVCxFQUFlO0FBQzVCLE1BQUksTUFBTSxLQUFLLElBQUwsQ0FBTixDQUR3QjtBQUU1QixNQUFJLE1BQU0sSUFBTixFQUFZO0FBQ2YsV0FBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLEdBQXRCLEVBRGU7R0FBaEIsTUFFTztBQUNOLFdBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixHQUF6QixFQURNO0dBRlA7RUFGYSxDQUFkLENBTjRCO0NBQXRCOzs7OztBQW1CQSxTQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDaEMsS0FBSSxTQUFTLEtBQUssUUFBTCxDQURtQjtBQUVoQyxLQUFJLEtBQUssT0FBTyxJQUFQLENBQVksSUFBWixDQUFMLENBRjRCO0FBR2hDLEtBQUksUUFBUSxPQUFPLFdBQVA7O0FBSG9CLE9BS2hDLElBQVUsS0FBVjs7Ozs7Ozs7O0FBTGdDLEtBYzVCLFdBQVcsR0FBWCxDQWQ0QjtBQWVoQyxLQUFJLE9BQU8sV0FBVyxLQUFLLE9BQUwsR0FBZSxHQUFmLEVBQW9CLENBQS9CLEVBQWtDLFFBQWxDLEVBQTRDLEdBQTVDLENBQVAsQ0FmNEI7O0FBaUJoQyxNQUFLLEVBQUwsQ0FBUSxLQUFSLHdCQUEyQixpQkFBaUIsSUFBakIsR0FBd0IsV0FBeEIsQ0FqQks7Q0FBMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENQOzs7O0FBQ0E7O0lBQVk7O0FBQ1o7Ozs7Ozs7Ozs7Ozs7O0lBTXFCO0FBRXBCLFVBRm9CLFNBRXBCLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0Qjs7O3dCQUZSLFdBRVE7O0FBQzNCLE1BQUksbUJBQW1CLFdBQW5CLElBQWtDLEtBQWxDLEVBQXlDO0FBQUUsYUFBVSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVixDQUFGO0dBQTdDO0FBQ0EsTUFBSSxDQUFDLE9BQUQsSUFBWSxvQkFBWixFQUF5QjtBQUFFLFVBQU8sS0FBUCxDQUFGO0dBQTdCOztBQUVBLE9BQUssT0FBTCxHQUFlLE9BQWYsQ0FKMkI7QUFLM0IsT0FBSyxPQUFMLEdBQWUsS0FBZixDQUwyQjtBQU0zQixPQUFLLE1BQUwsR0FBYyxFQUFkLENBTjJCO0FBTzNCLE9BQUssTUFBTCxHQUFjLE9BQU8sT0FBUCxDQVBhO0FBUTNCLE9BQUssS0FBTCxHQUFhLEtBQWIsQ0FSMkI7O0FBVTNCLFNBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO1VBQU8sTUFBSyxRQUFMLENBQWMsQ0FBZDtHQUFQLENBQWxDLENBVjJCO0FBVzNCLFNBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO1VBQU8sTUFBSyxRQUFMLENBQWMsQ0FBZDtHQUFQLENBQWxDLENBWDJCO0VBQTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBRm9COzsyQkFrQ1gsTUFBTTs7O0FBQ2QsT0FBSSxRQUFRLElBQUMsQ0FBSyxLQUFMLEtBQWUsU0FBZixHQUE0QixLQUE3QixHQUFxQyxLQUFLLEtBQUwsQ0FEbkM7QUFFZCxPQUFJLFdBQVcsS0FBSyxRQUFMLElBQWlCLElBQWpCLENBRkQ7QUFHZCxPQUFJLFVBQVUsS0FBSyxPQUFMLElBQWdCLEVBQWhCLENBSEE7QUFJZCxPQUFJLFVBQVUsS0FBSyxPQUFMLElBQWdCLEtBQUssT0FBTDtBQUpoQixPQUtWLFFBQVE7QUFDWCxlQUFXLE9BQVg7QUFDQSxhQUFTLEtBQVQ7QUFDQSxnQkFBWSxRQUFaO0FBQ0EsZUFBVyxFQUFYO0lBSkcsQ0FMVTs7QUFZZCxPQUFJLFVBQVUsS0FBVixFQUFpQjtBQUFFLFlBQVEsR0FBUixDQUFZLGdFQUFaLEVBQUY7SUFBckI7O0FBRUEsV0FBUSxPQUFSLENBQWdCLFVBQUMsTUFBRCxFQUFZO0FBQzNCLFdBQUssU0FBTCxDQUFlLE9BQU8sSUFBUCxFQUFhLE9BQU8sT0FBUCxFQUFnQixLQUE1QyxFQUQyQjtJQUFaLENBQWhCLENBZGM7O0FBa0JkLE9BQUksUUFBSixFQUFjO0FBQ2IsU0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBRGE7SUFBZDs7QUFJQSxRQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUF0QmM7QUF1QmQsUUFBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFqQixFQXZCYzs7QUF5QmQsVUFBTyxJQUFQLENBekJjOzs7Ozs7Ozs7Ozs4QkFpQ0gsT0FBTztBQUNsQixPQUFJLFVBQVUsTUFBTSxPQUFOLENBREk7QUFFbEIsT0FBSSxNQUFNLFFBQVEscUJBQVIsRUFBTixDQUZjO0FBR2xCLE9BQUksUUFBUSxDQUFSLENBSGM7QUFJbEIsT0FBSSxNQUFNLENBQU47O0FBSmMsTUFNZjtBQUNGLFdBQU8sUUFBUSxTQUFSLElBQXFCLENBQXJCLENBREw7QUFFRixjQUFVLFFBQVEsWUFBUixDQUZSO0lBQUgsUUFHUSxPQUhSLEVBTmtCOztBQVdsQixTQUFNLEtBQU4sR0FBYyxNQUFPLFFBQVEsT0FBTyxXQUFQLENBWFg7O0FBYWxCLFFBQUssU0FBTCxDQUFlLEtBQWYsRUFia0I7Ozs7Ozs7Ozs7Ozs0QkFzQlQsTUFBeUI7T0FBbkIsZ0VBQVEsa0JBQVc7T0FBUCxxQkFBTzs7QUFDbEMsT0FBSSxVQUFVLEtBQUssT0FBTCxDQURvQjs7QUFHbEMsT0FBSSxDQUFDLEtBQUQsSUFBVSxLQUFLLE1BQUwsQ0FBWSxNQUFaLElBQXNCLENBQXRCLEVBQXlCO0FBQ3RDLFlBQVEsS0FBSyxNQUFMLENBQVksQ0FBWixDQUFSLENBRHNDO0lBQXZDOztBQUlBLE9BQUksS0FBSixFQUFXO0FBQ1YsUUFBSSxTQUFTLE9BQVEsSUFBUCxJQUFlLFVBQWYsR0FBNkIsSUFBOUIsR0FBcUMsV0FBVyxJQUFYLENBQXJDLENBREg7QUFFVixRQUFJLFFBQVEsU0FBUixLQUFRLENBQUMsRUFBRCxFQUFLLE9BQUwsRUFBaUI7QUFDNUIsWUFBTyxZQUFXOztBQUNqQixVQUFJLFVBQVU7QUFDYixrQkFBVyxPQUFYO0FBQ0Esa0JBQVcsT0FBWDtPQUZHLENBRGE7QUFLakIsU0FBRyxJQUFILENBQVEsT0FBUixFQUFpQixJQUFqQjtBQUxpQixNQUFYLENBRHFCO0tBQWpCOzs7QUFGRixTQWFWLENBQU0sT0FBTixDQUFjLElBQWQsQ0FBbUIsTUFBTSxNQUFOLEVBQWMsT0FBZCxDQUFuQixFQWJVOztBQWVWLFFBQUksUUFBUSxPQUFSLEVBQWlCO0FBQ3BCLFNBQUksSUFBSSxNQUFNLFFBQU4sSUFBa0IsQ0FBbEIsQ0FEWTtBQUVwQixTQUFJLElBQUksUUFBUSxxQkFBUixHQUFnQyxNQUFoQyxDQUZZO0FBR3BCLGFBQVEsVUFBUixDQUFtQixLQUFuQixDQUF5QixhQUF6QixHQUF5QyxDQUFDLEdBQUUsQ0FBRixHQUFPLElBQVIsQ0FIckI7QUFJcEIsMEJBQVcsT0FBWCxFQUFvQixJQUFwQixFQUpvQjtLQUFyQjtJQWZELE1Bc0JPOztBQUVOLFdBQU8sS0FBSyxRQUFMLENBQWM7QUFDcEIsY0FBUyxDQUFUO0FBQ0EsaUJBQVksT0FBTyxXQUFQLEdBQXFCLFFBQVEsWUFBUjtBQUNqQyxnQkFBVyxDQUFDO0FBQ1gsY0FBUSxJQUFSLEVBQWMsV0FBVyxPQUFYO01BREosQ0FBWDtLQUhNLENBQVAsQ0FGTTtJQXRCUDs7QUFpQ0EsVUFBTyxJQUFQLENBeENrQzs7Ozs7Ozs7Ozs2QkErQ3hCO0FBQ1YsT0FBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQ2xCLFNBQUssT0FBTCxHQUFlLElBQWYsQ0FEa0I7QUFFbEIsV0FBTyxxQkFBUCxDQUE2QixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQTdCLEVBRmtCO0FBR2xCLFNBQUssTUFBTCxHQUFjLE9BQU8sT0FBUCxDQUhJO0lBQW5COzs7Ozs7Ozs7OzZCQVdVOzs7O0FBRVYsUUFBSyxNQUFMLENBQVksT0FBWixDQUFvQixVQUFDLEtBQUQ7V0FBVyxPQUFLLFdBQUwsQ0FBaUIsS0FBakI7SUFBWCxDQUFwQixDQUZVOzs7Ozs7Ozs7NkJBUUE7Ozs7Ozs7OzsyQkFRRjs7O0FBQ1IsUUFBSyxNQUFMLENBQVksT0FBWixDQUFvQixVQUFDLEtBQUQ7V0FBVyxPQUFLLFNBQUwsQ0FBZSxLQUFmO0lBQVgsQ0FBcEIsQ0FEUTtBQUVSLFFBQUssT0FBTCxHQUFlLEtBQWYsQ0FGUTs7Ozs7Ozs7Ozs7NEJBVUMsT0FBTzs7QUFFaEIsT0FBSSxRQUFRLE1BQU0sS0FBTixDQUZJO0FBR2hCLE9BQUksV0FBVyxNQUFNLFFBQU4sQ0FIQztBQUloQixPQUFJLFNBQVMsS0FBSyxNQUFMLENBSkc7QUFLaEIsT0FBSSxXQUFXLENBQUMsU0FBUyxLQUFULENBQUQsR0FBbUIsUUFBbkI7Ozs7OztBQUxDLE9BV1osS0FBSyxPQUFMLENBQWEscUJBQWIsR0FBcUMsR0FBckMsR0FBMkMsT0FBTyxXQUFQLElBQzdDLEtBQUssT0FBTCxDQUFhLHFCQUFiLEdBQXFDLE1BQXJDLEdBQThDLENBQTlDLEVBQ0E7QUFDRCxXQURDO0lBRkY7O0FBTUEsT0FBSSxLQUFLLEtBQUwsRUFBWTtBQUNmLFlBQVEsR0FBUixDQUFZLEtBQUssS0FBTCxFQUFZLFFBQXhCLEVBRGU7SUFBaEI7Ozs7OztBQWpCZ0IsUUF5QmhCLENBQU0sT0FBTixDQUFjLE9BQWQsQ0FBc0IsVUFBQyxNQUFELEVBQVk7QUFDakMsV0FBTyxJQUFQLENBQVk7QUFDWCxpQkFBWSxRQUFaO0FBQ0EsaUJBQVksU0FBUyxLQUFUO0tBRmIsRUFEaUM7SUFBWixDQUF0QixDQXpCZ0I7Ozs7UUE5S0c7Ozs7Ozs7O0FDakJyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDU0EsU0FBUyxVQUFULENBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLE1BQUksUUFBUSxRQUFRLEtBQVIsQ0FEZTtBQUUzQixNQUFNLFFBQVEsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixVQUFwQixFQUFnQyxXQUFoQyxFQUE2QyxjQUE3QyxFQUE2RCxpQkFBN0QsQ0FBUixDQUZxQjs7QUFJM0IsVUFBUSxjQUFSLEdBQXlCLEVBQXpCLENBSjJCO0FBSzNCLFFBQU0sT0FBTixDQUFjLFVBQUMsR0FBRCxFQUFTO0FBQ3JCLFlBQVEsY0FBUixDQUF1QixHQUF2QixJQUE4QixNQUFNLEdBQU4sS0FBYyxFQUFkLENBRFQ7R0FBVCxDQUFkLENBTDJCO0NBQTdCOztBQVVBLFNBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QixPQUE3QixFQUFzQztBQUNwQyxNQUFJLGFBQWEsRUFBYixDQURnQztBQUVwQyxPQUFLLElBQUksSUFBSixJQUFZLE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUksUUFBUSxRQUFSLElBQW9CLFFBQVEsT0FBUixFQUFpQjtBQUFFLGVBQUY7S0FBekM7QUFDQSxZQUFRLEtBQVIsQ0FBYyxJQUFkLElBQXNCLE9BQU8sSUFBUCxJQUFlLElBQWYsQ0FGQztBQUd2QixlQUFXLElBQVgsSUFBbUIsT0FBTyxJQUFQLENBQW5CLENBSHVCO0dBQXpCOztBQUZvQyxDQUF0Qzs7Ozs7Ozs7QUFnQmUsU0FBUyxNQUFULENBQWdCLE9BQWhCLEVBQXVDO01BQWYsZ0VBQVEscUJBQU87O0FBQ3BELFlBQVMsbUJBQWtCLFdBQWxCLEdBQWdDLE9BQWhDLEdBQXlDLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUF6QyxDQUQyQztBQUVwRCxNQUFJLENBQUMsT0FBRCxFQUFTO0FBQUUsV0FBTyxLQUFQLENBQUY7R0FBYjs7QUFFQSxNQUFJLFNBQVMsUUFBTyxVQUFQOzs7O0FBR1gsaUJBQWUsR0FBZjtNQUNBLGFBSkY7TUFLRSxZQUFZO0FBQ1YsWUFBUSxrQkFBVztBQUNqQixVQUFJLGlCQUFpQixRQUFPLHFCQUFQLEVBQWpCLENBRGE7QUFFakIsVUFBSSxlQUFlLEdBQWYsR0FBcUIsQ0FBckIsRUFBd0I7QUFDMUIsb0JBQVksY0FBWixFQUE0QixPQUE1QixFQUQwQjtBQUUxQixnQkFBTyxLQUFQLENBQWEsUUFBYixHQUF3QixPQUF4QixDQUYwQjtBQUcxQixlQUFPLFNBQVMsUUFBVCxDQUFQLENBSDBCO09BQTVCO0tBRk07QUFRUixZQUFRLGtCQUFXO0FBQ2pCLFVBQUksaUJBQWlCLE9BQU8scUJBQVAsRUFBakIsQ0FEYTtBQUVqQixVQUFJLGVBQWUsR0FBZixHQUFxQixDQUFyQixFQUF3QjtBQUMxQixnQkFBTyxLQUFQLEdBQWUsRUFBZixDQUQwQjtBQUUxQixlQUFPLFNBQVMsUUFBVCxDQUFQLENBRjBCO09BQTVCO0FBSUEsVUFBSSxPQUFKLEVBQWE7QUFDWCxZQUFJLGlCQUFpQixRQUFPLHFCQUFQLEVBQWpCLENBRE87QUFFWCxZQUFJLGVBQWUsTUFBZixHQUF3QixlQUFlLE1BQWYsRUFBdUI7QUFDakQsa0JBQU8sS0FBUCxHQUFlLEVBQWYsQ0FEaUQ7QUFFakQsaUJBQU8sU0FBUyxRQUFULENBQVAsQ0FGaUQ7U0FBbkQ7T0FGRjtLQU5NO0FBY1IsWUFBUSxrQkFBVztBQUNqQixVQUFJLGlCQUFpQixRQUFPLHFCQUFQLEVBQWpCLENBRGE7QUFFakIsVUFBSSxlQUFlLEdBQWYsR0FBcUIsQ0FBckIsRUFBd0I7QUFDMUIsb0JBQVksY0FBWixFQUE0QixPQUE1QixFQUQwQjtBQUUxQixnQkFBTyxLQUFQLENBQWEsUUFBYixHQUF3QixPQUF4QixDQUYwQjtBQUcxQixlQUFPLFNBQVMsUUFBVCxDQUFQLENBSDBCO09BQTVCO0tBRk07R0F2QlYsQ0FUa0Q7O0FBMENwRCxXQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdkIsUUFBSSxpQkFBaUIsS0FBakIsRUFBd0I7QUFBRSxhQUFGO0tBQTVCO0FBQ0EsWUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFlBQXhCLEVBRnVCO0FBR3ZCLFlBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixLQUFyQixFQUh1QjtBQUl2QixtQkFBZSxLQUFmLENBSnVCO0FBS3ZCLG9CQUFnQixVQUFVLEtBQVYsQ0FBaEIsQ0FMdUI7R0FBekI7Ozs7O0FBMUNvRCxNQXFEaEQsUUFBTyxxQkFBUCxHQUErQixHQUEvQixHQUFxQyxDQUFyQyxFQUF3QztBQUMxQyxhQUFTLFFBQVQsRUFEMEM7QUFFMUM7QUFGMEMsR0FBNUMsTUFHTztBQUNMLGVBQVMsUUFBVCxFQURLO0tBSFA7OztBQXJEb0QsUUE4RHBELENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUFFLG9CQUFGO0dBQVgsQ0FBbEM7QUE5RG9ELFFBK0RwRCxDQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVc7QUFBRSxvQkFBRjtHQUFYLENBQWxDLENBL0RvRDtDQUF2Qzs7Ozs7Ozs7Ozs7Ozs7QUNuQ2YsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7a0JBT2UiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSc7XG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcInRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIE9wdGlvbnMgYXJlIGFwcGxpZWQgYXQgaW5pdGlhbGl6ZSwgYW5kIGFyZSBjdXJyaWVkIGluIHZpYSBcInRoaXNcIi5cbiAqIE5PVEU6IGRvbid0IHVzZSBhcnJvdyBmbidzIGhlcmUgYXMgdGhleSBwcm94eSBcInRoaXNcIlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuXG5cbi8qKlxuICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFlvdSBtYXkgZGVmaW5lIHBhcmFsbGF4IFwic3BlZWRcIiBvciBwYXJhbGxheCBcInJhbmdlXCIgKGluIHBpeGVscykuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyYWxsYXgoZGF0YSkge1xuXHRsZXQgb2Zmc2V0ID0gMDtcblx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG5cblx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRvZmZzZXQgPSBkYXRhLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0fSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcmFuZ2Vcblx0XHRvZmZzZXQgPSBkYXRhLnByb2dyZXNzICogKG9wdHMucmFuZ2UgfHwgMCk7ICAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdH1cblxuXHR0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcbn1cblxuLyoqXG4gKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBUaGUgXCJjbGFzc1wiIHRvIHRvZ2dsZSwgYW5kIHdoZW4gKGllLiBhdCB3aGljaCBwb2ludCBpbiB0aGUgcHJvZ3Jlc3MpXG4gKiBAdGhpczogYW4gb2JqZWN0IGNvbnRhaW5pbmcgT3B0aW9ucyArIGVsZW1lbnQgcmVmZXJlbmNlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKGRhdGEpIHtcblx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG5cdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcdFx0Ly8gdGltZXNcblx0bGV0IG5vdyA9IGRhdGEucHJvZ3Jlc3M7XG5cblx0dGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG5cdFx0bGV0IGNzcyA9IG9wdHNbdGltZV07XG5cdFx0aWYgKG5vdyA+IHRpbWUpIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWChvcHRzKSB7XG5cdGxldCBvZmZzZXQgPSB0aGlzLmFic29sdXRlO1xuXHRsZXQgb24gPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0bGV0IGRlbGF5ID0gd2luZG93LmlubmVySGVpZ2h0O1x0Ly8gc3RhcnQgdHJhbnNsYXRpbmcgYWZ0ZXIgb25lIHdpbmRvdy1oZWlnaHQgb2Ygc2Nyb2xsaW5nXG5cblx0b2Zmc2V0IC09IGRlbGF5O1xuXG5cdC8vIGlmICh0aGlzLnBlcmNlbnQgPCAwLjUpIHsgICAgLy8gdGVzdDogc3RhcnQgdHJhbnNsYXRpbmcgd2hlbiBlbGVtZW50IGlzIGNlbnRlcmVkIGluIHZpZXdwb3J0XG5cdC8vICAgb2Zmc2V0IC09IGRlbGF5O1xuXHQvLyB9IGVsc2Uge1xuXHQvLyAgIG9mZnNldCA9IDA7XG5cdC8vIH1cblxuXHQvLyAgZWFzZSA9IGVhc2VJblF1YWQoZWxhcHNlZCwgICAgIHN0YXJ0LCBlbmQsIGR1cmF0aW9uKTtcblx0bGV0IGRpc3RhbmNlID0gNTAwO1xuXHRsZXQgZWFzZSA9IGVhc2VJblF1YWQodGhpcy5wZXJjZW50ICogMTAwLCAwLCBkaXN0YW5jZSwgMTAwKTtcblxuXHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoJyArIGVhc2UgKyAncHgsIDAsIDApJztcbn1cbiIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbi8vIGltcG9ydCB7ZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vZWFzaW5ncyc7XG5pbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcbmltcG9ydCAqIGFzIGVmZmVjdExpc3QgZnJvbSAnLi9lZmZlY3RzJztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRlYnVnKSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY2VuZXMgPSBbXTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZGVidWcgPSBkZWJ1ZztcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBwYXJhbXM6IGFueSBUV08gb2Y6IHN0YXJ0IC8gc3RvcCAvIGR1cmF0aW9uLlxuXHQgKiAgICAgICAgIHN0YXJ0OiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KSBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24gKGVnIFsnI3RvZ2dsZScsIDAuM10gKVxuXHQgKiAgICAgICAgIHN0b3A6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uXG5cdCAqICAgICAgICAgZHVyYXRpb246IHRoZSBkdXJhdGlvbiBpbiBwaXhlbHNcblx0ICpcblx0ICogICAgICAgICBkZWZhdWx0IGlzIDAgLSAxMDAlIChtYWtpbmcgZHVyYXRpb24gdGhlIHdpbmRvdyBoZWlnaHQgKyBlbGVtZW50IGhlaWdodClcblx0ICpcblx0ICogICAgICAgICBleGFtcGxlczpcblx0ICogICAgICAgICAgeyBzdGFydDogMCwgc3RvcDogMC41IH1cblx0ICogICAgICAgICAgeyBzdGFydDogMC4xLCBkdXJhdGlvbjogJzQwMHB4JyB9XG5cdCAqICAgICAgICAgIHsgZHVyYXRpb246IDEwMHB4LCBzdG9wOiAxLjAgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBzdG9wOiBbJyN0b2dnbGUnLCAwLjVdIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgZHVyYXRpb246ICczMDBweCcgfVxuXHQgKlxuXHQgKiAgICAgICAgIGVhc2luZy4uLj8gc3RhcnQsIHRvLCBmcm9tLCBkdXJhdGlvblxuXHQgKlxuXHQgKi9cblx0YWRkU2NlbmUob3B0cykge1xuXHRcdGxldCBzdGFydCA9IChvcHRzLnN0YXJ0ID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiBvcHRzLnN0YXJ0O1xuXHRcdGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgbnVsbDtcblx0XHRsZXQgZWZmZWN0cyA9IG9wdHMuZWZmZWN0cyB8fCBbXTtcblx0XHRsZXQgdHJpZ2dlciA9IG9wdHMudHJpZ2dlciB8fCB0aGlzLmVsZW1lbnQ7IC8vIC5wYXJlbnROb2RlO1xuXHRcdGxldCBzY2VuZSA9IHtcblx0XHRcdCd0cmlnZ2VyJzogdHJpZ2dlcixcblx0XHRcdCdzdGFydCc6IHN0YXJ0LFxuXHRcdFx0J2R1cmF0aW9uJzogZHVyYXRpb24sXG5cdFx0XHQnZWZmZWN0cyc6IFtdXG5cdFx0fTtcblxuXHRcdGlmIChzdGFydCA9PT0gZmFsc2UpIHsgY29uc29sZS5sb2coJ1Njcm9sbGlmeSBbZXJyb3JdOiBDYW5ub3QgYWRkIFNjZW5lLiBNaXNzaW5nIFwic3RhcnRcIiBhcmd1bWVudC4nKTsgcmV0dXJuOyB9XG5cblx0XHRlZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4ge1xuXHRcdFx0dGhpcy5hZGRFZmZlY3QoZWZmZWN0Lm5hbWUsIGVmZmVjdC5vcHRpb25zLCBzY2VuZSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBUaGUgc2NlbmUgdG8gdXBkYXRlLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlU2NlbmUoc2NlbmUpIHtcblx0XHRsZXQgdHJpZ2dlciA9IHNjZW5lLnRyaWdnZXI7XG5cdFx0bGV0IEJDUiA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHdoZXJlID0gMTtcblx0XHRsZXQgdG9wID0gMDtcdC8vIHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0ZG8ge1xuXHRcdFx0dG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG5cdFx0XHR0cmlnZ2VyID0gdHJpZ2dlci5vZmZzZXRQYXJlbnQ7XG5cdFx0fSB3aGlsZSh0cmlnZ2VyKTtcblxuXHRcdHNjZW5lLnN0YXJ0ID0gdG9wIC0gKHdoZXJlICogd2luZG93LmlubmVySGVpZ2h0KTtcblxuXHRcdHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBvcHRpb25zPXt9LCBzY2VuZSkge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG5cdFx0aWYgKCFzY2VuZSAmJiB0aGlzLnNjZW5lcy5sZW5ndGggPT0gMSkge1xuXHRcdFx0c2NlbmUgPSB0aGlzLnNjZW5lc1swXTtcblx0XHR9XG5cblx0XHRpZiAoc2NlbmUpIHtcblx0XHRcdGxldCBlZmZlY3QgPSAodHlwZW9mIG5hbWUgPT0gJ2Z1bmN0aW9uJykgPyBuYW1lIDogZWZmZWN0TGlzdFtuYW1lXTtcblx0XHRcdGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgIC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0XHRsZXQgY29udGV4dCA9IHtcblx0XHRcdFx0XHRcdCdvcHRpb25zJzogb3B0aW9ucyxcblx0XHRcdFx0XHRcdCdlbGVtZW50JzogZWxlbWVudFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Zm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKGVmZmVjdCwgb3B0aW9ucyk7XG5cdFx0XHRzY2VuZS5lZmZlY3RzLnB1c2goY3VycnkoZWZmZWN0LCBvcHRpb25zKSk7XG5cblx0XHRcdGlmIChuYW1lID09ICdzdGljaycpIHtcblx0XHRcdFx0bGV0IGQgPSBzY2VuZS5kdXJhdGlvbiB8fCAwO1xuXHRcdFx0XHRsZXQgaCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRlbGVtZW50LnBhcmVudE5vZGUuc3R5bGUucGFkZGluZ0JvdHRvbSA9IChkK2gpICsgJ3B4Jztcblx0XHRcdFx0bmV3IFN0aWNreShlbGVtZW50LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBpZiBubyBzY2VuZSAoaWUgXCJlZmZlY3RcIiB3YXMgY2FsbGVkIGRpcmVjdGx5IG9uIFNjcm9sbGlmeSksIHNldCB1cCBhIGRlZmF1bHQgc2NlbmVcblx0XHRcdHJldHVybiB0aGlzLmFkZFNjZW5lKHtcblx0XHRcdFx0J3N0YXJ0JzogMCxcblx0XHRcdFx0J2R1cmF0aW9uJzogd2luZG93LmlubmVySGVpZ2h0ICsgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG5cdFx0XHRcdCdlZmZlY3RzJzogW3tcblx0XHRcdFx0XHQnbmFtZSc6IG5hbWUsICdvcHRpb25zJzogb3B0aW9uc1xuXHRcdFx0XHR9XVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogb25TY3JvbGwgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogb25SZXNpemUgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0Ly8gdGhpcy50aHJvdHRsZSh0aGlzLnVwZGF0ZVNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKChzY2VuZSkgPT4gdGhpcy51cGRhdGVTY2VuZShzY2VuZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpbWl0IGZyZXF1ZW5jeSBvZiBET00gdXBkYXRlcyBvbiByZXNpemVcblx0ICovXG5cdHRocm90dGxlKCkge1xuXG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbCBhcyB0aGUgdHJhbnNmb3JtYXRpb25zIHRvIGFwcGx5LlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0Y2FsY3VsYXRlKHNjZW5lKSB7XG5cdFx0Ly8gbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG5cdFx0bGV0IHN0YXJ0ID0gc2NlbmUuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gc2NlbmUuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcyA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0Ly8gaWYgKHByb2dyZXNzIDwgMCB8fCBwcm9ncmVzcyA+IDEpIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBVc2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YS4gQW4gZWxlbWVudCBtYXkgYmUgb25zY3JlZW4gd2hpbGUgaXRzIHJlZmVyZW5jZSAodHJpZ2dlcikgZWxlbWVudCBpcyBub3QuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcblx0XHRcdFx0dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA8IDBcblx0XHQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5kZWJ1ZywgcHJvZ3Jlc3MpO1xuXHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydCAgICAgIHRvICBmcm9tICBlbmRcblx0XHQvLyBsZXQgZWFzaW5nID0gZWFzZUluT3V0UXVhZChkYXRhLnN0YXJ0LCAxMDAsIDAsIGRhdGEuc3RhcnQrZGF0YS5kdXJhdGlvbik7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHNjZW5lLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRlZmZlY3QuY2FsbCh7XG5cdFx0XHRcdCdwcm9ncmVzcyc6IHByb2dyZXNzLFxuXHRcdFx0XHQnYWJzb2x1dGUnOiBzY3JvbGwgLSBzdGFydFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iLCIvKlxuICogU3RpY2t5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljLy4uLi4/XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLCAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgSFRNTEVsZW1lbnQqL1xuXG4vLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG4vLyBjb3B5U3R5bGVzID0gYm91bmRzUGFyYW1zLmNvbmNhdChbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcInBvc2l0aW9uXCIsIFwiYm94U2l6aW5nXCIsIFwibW96Qm94U2l6aW5nXCIsIFwid2Via2l0Qm94U2l6aW5nXCJdKTtcblxuZnVuY3Rpb24gY29weVN0eWxlcyhlbGVtZW50KSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XG4gIGNvbnN0IHByb3BzID0gWyd3aWR0aCcsICdoZWlnaHQnLCAncG9zaXRpb24nLCAnYm94U2l6aW5nJywgJ21vekJveFNpemluZycsICd3ZWJraXRCb3hTaXppbmcnXTtcblxuICBlbGVtZW50Lm9yaWdpbmFsU3R5bGVzID0ge307XG4gIHByb3BzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgIGVsZW1lbnQub3JpZ2luYWxTdHlsZXNbdmFsXSA9IHN0eWxlW3ZhbF0gfHwgJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXMsIGVsZW1lbnQpIHtcbiAgbGV0IGFkZGVkUHJvcHMgPSB7fTtcbiAgZm9yIChsZXQgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICBpZiAocHJvcCA9PSAnYm90dG9tJyB8fCBwcm9wID09ICdyaWdodCcpIHsgY29udGludWU7IH1cbiAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdICsgJ3B4JztcbiAgICBhZGRlZFByb3BzW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xuICB9XG4gIC8vIGVsZW1lbnQuYWRkZWRQcm9wcyA9IGFkZGVkUHJvcHM7XG59XG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQ6IHNldHMgdXAgYSBzdGlja3kgYmFyIHdoaWNoIGF0dGFjaGVzIC8gZGV0YWNoZXMgdG8gdG9wIG9mIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGlja3k6IFRoZSBlbGVtZW50IHRvIHN0aWNreS1pZnlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYm91bmRlZDogV2hldGhlciB0byBhcHBseSBzdGlja2luZXNzIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhcmVudCBjb250YWluZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGlja3koc3RpY2t5LCBib3VuZGVkPWZhbHNlKSB7XG4gIHN0aWNreSA9IHN0aWNreSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gc3RpY2t5IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3kpO1xuICBpZiAoIXN0aWNreSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICB2YXIgcGFyZW50ID0gc3RpY2t5LnBhcmVudE5vZGUsXG4gICAgLy8gc3RpY2t5UG9zaXRpb24sXG4gICAgLy8gcGFyZW50UG9zaXRpb24sXG4gICAgY3VycmVudFN0YXRlID0gJ18nLFxuICAgIHN0YXRlU3dpdGNoZXIsXG4gICAgZGV0ZXJtaW5lID0ge1xuICAgICAgbm9ybWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoc3RpY2t5UG9zaXRpb24udG9wIDwgMSkge1xuICAgICAgICAgIGFwcGx5U3R5bGVzKHN0aWNreVBvc2l0aW9uLCBzdGlja3kpO1xuICAgICAgICAgIHN0aWNreS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0aWNreTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwYXJlbnRQb3NpdGlvbiA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLnRvcCA+IDEpIHtcbiAgICAgICAgICBzdGlja3kuc3R5bGUgPSAnJztcbiAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoJ25vcm1hbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib3VuZGVkKSB7XG4gICAgICAgICAgbGV0IHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbi5ib3R0b20gPCBzdGlja3lQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgICAgIHN0aWNreS5zdHlsZSA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHNldFN0YXRlKCdib3R0b20nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChzdGlja3lQb3NpdGlvbi50b3AgPiAxKSB7XG4gICAgICAgICAgYXBwbHlTdHlsZXMoc3RpY2t5UG9zaXRpb24sIHN0aWNreSk7XG4gICAgICAgICAgc3RpY2t5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChjdXJyZW50U3RhdGUgPT09IHN0YXRlKSB7IHJldHVybjsgfVxuICAgIHN0aWNreS5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7XG4gICAgc3RpY2t5LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgIHN0YXRlU3dpdGNoZXIgPSBkZXRlcm1pbmVbc3RhdGVdO1xuICB9XG5cbiAgLy8gc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgLy9zdGlja3kgaW5pdGlhbCBwb3NpdGlvblxuICBpZiAoc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDEpIHtcbiAgICBzZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgc3RhdGVTd2l0Y2hlcigpOyAgICAvLyBlZGdlIGNhc2U6IGNoZWNrIGlmIGJvdHRvbSBvZiBzdGlja3kgY29sbGlkZXMgdy8gYm91bmRpbmcgY29udGFpbmVyXG4gIH0gZWxzZSB7XG4gICAgc2V0U3RhdGUoJ25vcm1hbCcpO1xuICB9XG5cblxuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGVTd2l0Y2hlcik7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTsgIC8vIHN0YXRlU3dpdGNoZXIgY2hhbmdlcywgc28gY2Fubm90IHBhc3MgKGllLiBiaW5kIGRpcmVjdGx5KSBoZXJlXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTtcbn1cblxuIiwiXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtOyJdfQ==
