(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize, and are curried in via "this".
 * NOTE: don't use arrow fn's here as they proxy "this"
 * @type {Object}
 */
var effectList = {

	/**
  * Parallax an element.
  * @type {Object} opts: You may define parallax "speed" or parallax "range" (in pixels).
  * @return {void}
  */

	parallax: function parallax(data) {
		var offset = 0;
		var opts = this.options;

		if (opts.speed !== undefined) {
			// check speed first
			offset = data.absolute * opts.speed;
		} else {
			// fallback to range
			offset = data.progress * (opts.range || 0); // default is "0", no effect
		}

		this.element.style[transform] = 'translate(0, ' + offset + 'px)';
	},


	/**
  * Toggle a class on or off.
  * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
  * @this: an object containing Options + element reference
  * @return {void}
  */
	toggle: function toggle(data) {
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
	},


	/**
  * Dummy effect for testing, at the moment
  */
	translateX: function translateX(opts) {
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

		this.el.style[transform] = 'translate3d(' + ease + 'px, 0, 0)';
	}
};

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
		if (!element || !transform) {
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
			var effects = opts.effects;
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
				var effectName = opts.effects[0];
				var effectOptions = opts.effects[1] || null;
				_this2.addEffect(effectName, effectOptions, scene);
			});

			// if (duration && end && !start) {
			// 	start = (end * window.innerHeight - duration);

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

			// find position in the document:
			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);

			scene.start = top - where * window.innerHeight;
			// scene.duration = window.innerHeight + trigger.offsetHeight;

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
		value: function addEffect(name, options, scene) {
			var element = this.element;

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

				if (name == 'stick') {
					new _sticky2.default(element, true);
				}
			} else {
				// if no scene (ie "effect" was called directly on Scrollify), set up a default scene
				var sceneOpts = {
					'start': 0, // 		scene.start = top - (where * window.innerHeight);
					'duration': window.innerHeight + element.offsetHeight,
					'effects': [name, options]
				};
				return this.addScene(sceneOpts);
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

},{"./sticky":3}],2:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Scrollify = _scrollify2.default; /**
                                         * Put Carousel into the Global scope.
                                         * Useful for existing demos or if you wish to include manually
                                         */

},{"./scrollify.js":1}],3:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiLCJzcmMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozs7Ozs7O0FBT0EsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7Ozs7Ozs7QUFjQSxJQUFJLGFBQWE7Ozs7Ozs7O0FBT2hCLDZCQUFTLE1BQU07QUFDZCxNQUFJLFNBQVMsQ0FBVCxDQURVO0FBRWQsTUFBSSxPQUFPLEtBQUssT0FBTCxDQUZHOztBQUlkLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDN0IsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBREk7R0FBOUIsTUFFTzs7QUFDTixZQUFTLEtBQUssUUFBTCxJQUFpQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWpCO0FBREgsR0FGUDs7QUFNQSxPQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFNBQW5CLElBQWdDLGtCQUFpQixNQUFqQixHQUF5QixLQUF6QixDQVZsQjtFQVBDOzs7Ozs7Ozs7QUEwQmhCLHlCQUFPLE1BQU07QUFDWixNQUFJLE9BQU8sS0FBSyxPQUFMLENBREM7QUFFWixNQUFJLFVBQVUsS0FBSyxPQUFMLENBRkY7QUFHWixNQUFJLFFBQVEsT0FBTyxJQUFQLENBQVksSUFBWixDQUFSO0FB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QU8scUJBQVAsRUFBakIsQ0FEYTtBQUVqQixVQUFJLGVBQWUsR0FBZixHQUFxQixDQUFyQixFQUF3QjtBQUMxQixvQkFBWSxjQUFaLEVBQTRCLE9BQTVCLEVBRDBCO0FBRTFCLGdCQUFPLEtBQVAsQ0FBYSxRQUFiLEdBQXdCLE9BQXhCLENBRjBCO0FBRzFCLGVBQU8sU0FBUyxRQUFULENBQVAsQ0FIMEI7T0FBNUI7S0FGTTtHQXZCVixDQVRrRDs7QUEwQ3BELFdBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUN2QixRQUFJLGlCQUFpQixLQUFqQixFQUF3QjtBQUFFLGFBQUY7S0FBNUI7QUFDQSxZQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsWUFBeEIsRUFGdUI7QUFHdkIsWUFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLEtBQXJCLEVBSHVCO0FBSXZCLG1CQUFlLEtBQWYsQ0FKdUI7QUFLdkIsb0JBQWdCLFVBQVUsS0FBVixDQUFoQixDQUx1QjtHQUF6Qjs7Ozs7QUExQ29ELE1BcURoRCxRQUFPLHFCQUFQLEdBQStCLEdBQS9CLEdBQXFDLENBQXJDLEVBQXdDO0FBQzFDLGFBQVMsUUFBVCxFQUQwQztBQUUxQztBQUYwQyxHQUE1QyxNQUdPO0FBQ0wsZUFBUyxRQUFULEVBREs7S0FIUDs7O0FBckRvRCxRQThEcEQsQ0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFXO0FBQUUsb0JBQUY7R0FBWCxDQUFsQztBQTlEb0QsUUErRHBELENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUFFLG9CQUFGO0dBQVgsQ0FBbEMsQ0EvRG9EO0NBQXZDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbi8vIGltcG9ydCB7ZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vZWFzaW5ncyc7XG5pbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUsIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXG5cdC8qKlxuXHQgKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuXHQgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0cGFyYWxsYXgoZGF0YSkge1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRcdG9mZnNldCA9IGRhdGEuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0XHRvZmZzZXQgPSBkYXRhLnByb2dyZXNzICogKG9wdHMucmFuZ2UgfHwgMCk7ICAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZi5cblx0ICogQHR5cGUge09iamVjdH0gb3B0czogVGhlIFwiY2xhc3NcIiB0byB0b2dnbGUsIGFuZCB3aGVuIChpZS4gYXQgd2hpY2ggcG9pbnQgaW4gdGhlIHByb2dyZXNzKVxuXHQgKiBAdGhpczogYW4gb2JqZWN0IGNvbnRhaW5pbmcgT3B0aW9ucyArIGVsZW1lbnQgcmVmZXJlbmNlXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR0b2dnbGUoZGF0YSkge1xuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRcdGxldCB0aW1lcyA9IE9iamVjdC5rZXlzKG9wdHMpO1x0XHQvLyB0aW1lc1xuXHRcdGxldCBub3cgPSBkYXRhLnByb2dyZXNzO1xuXG5cdFx0dGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG5cdFx0XHRsZXQgY3NzID0gb3B0c1t0aW1lXTtcblx0XHRcdGlmIChub3cgPiB0aW1lKSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuXHQgKi9cblx0dHJhbnNsYXRlWChvcHRzKSB7XG5cdFx0bGV0IG9mZnNldCA9IHRoaXMuYWJzb2x1dGU7XG5cdFx0bGV0IG9uID0gT2JqZWN0LmtleXMob3B0cyk7XG5cdFx0bGV0IGRlbGF5ID0gd2luZG93LmlubmVySGVpZ2h0O1x0Ly8gc3RhcnQgdHJhbnNsYXRpbmcgYWZ0ZXIgb25lIHdpbmRvdy1oZWlnaHQgb2Ygc2Nyb2xsaW5nXG5cblx0XHRvZmZzZXQgLT0gZGVsYXk7XG5cblx0XHQvLyBpZiAodGhpcy5wZXJjZW50IDwgMC41KSB7ICAgIC8vIHRlc3Q6IHN0YXJ0IHRyYW5zbGF0aW5nIHdoZW4gZWxlbWVudCBpcyBjZW50ZXJlZCBpbiB2aWV3cG9ydFxuXHRcdC8vICAgb2Zmc2V0IC09IGRlbGF5O1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gICBvZmZzZXQgPSAwO1xuXHRcdC8vIH1cblxuXHRcdC8vICBlYXNlID0gZWFzZUluUXVhZChlbGFwc2VkLCAgICAgc3RhcnQsIGVuZCwgZHVyYXRpb24pO1xuXHRcdGxldCBkaXN0YW5jZSA9IDUwMDtcblx0XHRsZXQgZWFzZSA9IGVhc2VJblF1YWQodGhpcy5wZXJjZW50ICogMTAwLCAwLCBkaXN0YW5jZSwgMTAwKTtcblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgZWFzZSArICdweCwgMCwgMCknO1xuXHR9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCwgZGVidWcpIHtcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID09IGZhbHNlKSB7IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpOyB9XG5cdFx0aWYgKCFlbGVtZW50IHx8ICF0cmFuc2Zvcm0gKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjZW5lcyA9IFtdO1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5kZWJ1ZyA9IGRlYnVnO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHBhcmFtczogYW55IFRXTyBvZjogc3RhcnQgLyBzdG9wIC8gZHVyYXRpb24uXG5cdCAqICAgICAgICAgc3RhcnQ6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpIE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbiAoZWcgWycjdG9nZ2xlJywgMC4zXSApXG5cdCAqICAgICAgICAgc3RvcDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb25cblx0ICogICAgICAgICBkdXJhdGlvbjogdGhlIGR1cmF0aW9uIGluIHBpeGVsc1xuXHQgKlxuXHQgKiAgICAgICAgIGRlZmF1bHQgaXMgMCAtIDEwMCUgKG1ha2luZyBkdXJhdGlvbiB0aGUgd2luZG93IGhlaWdodCArIGVsZW1lbnQgaGVpZ2h0KVxuXHQgKlxuXHQgKiAgICAgICAgIGV4YW1wbGVzOlxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLCBzdG9wOiAwLjUgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLjEsIGR1cmF0aW9uOiAnNDAwcHgnIH1cblx0ICogICAgICAgICAgeyBkdXJhdGlvbjogMTAwcHgsIHN0b3A6IDEuMCB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIHN0b3A6IFsnI3RvZ2dsZScsIDAuNV0gfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBkdXJhdGlvbjogJzMwMHB4JyB9XG5cdCAqXG5cdCAqICAgICAgICAgZWFzaW5nLi4uPyBzdGFydCwgdG8sIGZyb20sIGR1cmF0aW9uXG5cdCAqXG5cdCAqL1xuXHRhZGRTY2VuZShvcHRzKSB7XG5cdFx0bGV0IHN0YXJ0ID0gKG9wdHMuc3RhcnQgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6IG9wdHMuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCBudWxsO1xuXHRcdGxldCBlZmZlY3RzID0gb3B0cy5lZmZlY3RzO1xuXHRcdGxldCB0cmlnZ2VyID0gb3B0cy50cmlnZ2VyIHx8IHRoaXMuZWxlbWVudDsgLy8gLnBhcmVudE5vZGU7XG5cblx0XHRsZXQgc2NlbmUgPSB7XG5cdFx0XHQndHJpZ2dlcic6IHRyaWdnZXIsXG5cdFx0XHQnc3RhcnQnOiBzdGFydCxcblx0XHRcdCdkdXJhdGlvbic6IGR1cmF0aW9uLFxuXHRcdFx0J2VmZmVjdHMnOiBbXVxuXHRcdH07XG5cblx0XHRpZiAoc3RhcnQgPT09IGZhbHNlKSB7IGNvbnNvbGUubG9nKCdTY3JvbGxpZnkgW2Vycm9yXTogQ2Fubm90IGFkZCBTY2VuZS4gTWlzc2luZyBcInN0YXJ0XCIgYXJndW1lbnQuJyk7IHJldHVybjsgfVxuXG5cdFx0ZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHtcblx0XHRcdGxldCBlZmZlY3ROYW1lID0gb3B0cy5lZmZlY3RzWzBdO1xuXHRcdFx0bGV0IGVmZmVjdE9wdGlvbnMgPSBvcHRzLmVmZmVjdHNbMV0gfHwgbnVsbDtcblx0XHRcdHRoaXMuYWRkRWZmZWN0KGVmZmVjdE5hbWUsIGVmZmVjdE9wdGlvbnMsIHNjZW5lKTtcblx0XHR9KTtcblxuXHRcdC8vIGlmIChkdXJhdGlvbiAmJiBlbmQgJiYgIXN0YXJ0KSB7XG5cdFx0Ly8gXHRzdGFydCA9IChlbmQgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBkdXJhdGlvbik7XG5cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVNjZW5lKHNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBUaGUgc2NlbmUgdG8gdXBkYXRlLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlU2NlbmUoc2NlbmUpIHtcblx0XHRsZXQgdHJpZ2dlciA9IHNjZW5lLnRyaWdnZXI7XG5cdFx0bGV0IEJDUiA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHdoZXJlID0gMTtcblx0XHRsZXQgdG9wID0gMDtcdC8vIHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0Ly8gZmluZCBwb3NpdGlvbiBpbiB0aGUgZG9jdW1lbnQ6XG5cdFx0ZG8ge1xuXHRcdFx0XHR0b3AgKz0gdHJpZ2dlci5vZmZzZXRUb3AgfHwgMDtcblx0XHRcdFx0dHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuXHRcdH0gd2hpbGUodHJpZ2dlcik7XG5cblx0XHRzY2VuZS5zdGFydCA9IHRvcCAtICh3aGVyZSAqIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0Ly8gc2NlbmUuZHVyYXRpb24gPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyB0cmlnZ2VyLm9mZnNldEhlaWdodDtcblxuXHRcdHRoaXMuY2FsY3VsYXRlKHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIHRvIGEgc2NlbmUuXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBvcHRpb25zLCBzY2VuZSkge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG5cdFx0aWYgKHNjZW5lKSB7XG5cdFx0XHRsZXQgZWZmZWN0ID0gKHR5cGVvZiBuYW1lID09ICdmdW5jdGlvbicpID8gbmFtZSA6IGVmZmVjdExpc3RbbmFtZV07XG5cdFx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyAgICAgICAvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG5cdFx0XHRcdFx0bGV0IGNvbnRleHQgPSB7XG5cdFx0XHRcdFx0XHQnb3B0aW9ucyc6IG9wdGlvbnMsXG5cdFx0XHRcdFx0XHQnZWxlbWVudCc6IGVsZW1lbnRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGZuLmNhbGwoY29udGV4dCwgdGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzY2VuZS5lZmZlY3RzLnB1c2goY3VycnkoZWZmZWN0LCBvcHRpb25zKSk7XG5cblx0XHRcdGlmIChuYW1lID09ICdzdGljaycpIHtcblx0XHRcdFx0bmV3IFN0aWNreShlbGVtZW50LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBpZiBubyBzY2VuZSAoaWUgXCJlZmZlY3RcIiB3YXMgY2FsbGVkIGRpcmVjdGx5IG9uIFNjcm9sbGlmeSksIHNldCB1cCBhIGRlZmF1bHQgc2NlbmVcblx0XHRcdGxldCBzY2VuZU9wdHMgPSB7XG5cdFx0XHRcdCdzdGFydCc6IDAsXHRcdC8vIFx0XHRzY2VuZS5zdGFydCA9IHRvcCAtICh3aGVyZSAqIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHRcdCdkdXJhdGlvbic6IHdpbmRvdy5pbm5lckhlaWdodCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuXHRcdFx0XHQnZWZmZWN0cyc6IFtuYW1lLCBvcHRpb25zXVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiB0aGlzLmFkZFNjZW5lKHNjZW5lT3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogb25TY3JvbGwgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogb25SZXNpemUgSGFuZGxlclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0Ly8gdGhpcy50aHJvdHRsZSh0aGlzLnVwZGF0ZVNjZW5lKTtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKChzY2VuZSkgPT4gdGhpcy51cGRhdGVTY2VuZShzY2VuZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpbWl0IGZyZXF1ZW5jeSBvZiBET00gdXBkYXRlcyBvbiByZXNpemVcblx0ICovXG5cdHRocm90dGxlKCkge1xuXG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbnMgZm9yIGV2ZXJ5IHNjZW5lLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lKSA9PiB0aGlzLmNhbGN1bGF0ZShzY2VuZSkpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBlYWNoIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNjZW5lOiBBbiBPYmplY3QgY29udGFpbmluZyBzdGFydCBhbmQgZHVyYXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbCBhcyB0aGUgdHJhbnNmb3JtYXRpb25zIHRvIGFwcGx5LlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0Y2FsY3VsYXRlKHNjZW5lKSB7XG5cdFx0Ly8gbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG5cdFx0bGV0IHN0YXJ0ID0gc2NlbmUuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gc2NlbmUuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcyA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0Ly8gaWYgKHByb2dyZXNzIDwgMCB8fCBwcm9ncmVzcyA+IDEpIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBVc2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YS4gQW4gZWxlbWVudCBtYXkgYmUgb25zY3JlZW4gd2hpbGUgaXRzIHJlZmVyZW5jZSAodHJpZ2dlcikgZWxlbWVudCBpcyBub3QuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcblx0XHRcdFx0dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA8IDBcblx0XHQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5kZWJ1ZywgcHJvZ3Jlc3MpO1xuXHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydCAgICAgIHRvICBmcm9tICBlbmRcblx0XHQvLyBsZXQgZWFzaW5nID0gZWFzZUluT3V0UXVhZChkYXRhLnN0YXJ0LCAxMDAsIDAsIGRhdGEuc3RhcnQrZGF0YS5kdXJhdGlvbik7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHNjZW5lLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRlZmZlY3QuY2FsbCh7XG5cdFx0XHRcdCdwcm9ncmVzcyc6IHByb2dyZXNzLFxuXHRcdFx0XHQnYWJzb2x1dGUnOiBzY3JvbGwgLSBzdGFydFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iLCIvKlxuICogU3RpY2t5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljLy4uLi4/XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLCAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgSFRNTEVsZW1lbnQqL1xuXG4vLyBib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG4vLyBjb3B5U3R5bGVzID0gYm91bmRzUGFyYW1zLmNvbmNhdChbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcInBvc2l0aW9uXCIsIFwiYm94U2l6aW5nXCIsIFwibW96Qm94U2l6aW5nXCIsIFwid2Via2l0Qm94U2l6aW5nXCJdKTtcblxuZnVuY3Rpb24gY29weVN0eWxlcyhlbGVtZW50KSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XG4gIGNvbnN0IHByb3BzID0gWyd3aWR0aCcsICdoZWlnaHQnLCAncG9zaXRpb24nLCAnYm94U2l6aW5nJywgJ21vekJveFNpemluZycsICd3ZWJraXRCb3hTaXppbmcnXTtcblxuICBlbGVtZW50Lm9yaWdpbmFsU3R5bGVzID0ge307XG4gIHByb3BzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgIGVsZW1lbnQub3JpZ2luYWxTdHlsZXNbdmFsXSA9IHN0eWxlW3ZhbF0gfHwgJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXMsIGVsZW1lbnQpIHtcbiAgbGV0IGFkZGVkUHJvcHMgPSB7fTtcbiAgZm9yIChsZXQgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICBpZiAocHJvcCA9PSAnYm90dG9tJyB8fCBwcm9wID09ICdyaWdodCcpIHsgY29udGludWU7IH1cbiAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdICsgJ3B4JztcbiAgICBhZGRlZFByb3BzW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xuICB9XG4gIC8vIGVsZW1lbnQuYWRkZWRQcm9wcyA9IGFkZGVkUHJvcHM7XG59XG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQ6IHNldHMgdXAgYSBzdGlja3kgYmFyIHdoaWNoIGF0dGFjaGVzIC8gZGV0YWNoZXMgdG8gdG9wIG9mIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGlja3k6IFRoZSBlbGVtZW50IHRvIHN0aWNreS1pZnlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYm91bmRlZDogV2hldGhlciB0byBhcHBseSBzdGlja2luZXNzIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhcmVudCBjb250YWluZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGlja3koc3RpY2t5LCBib3VuZGVkPWZhbHNlKSB7XG4gIHN0aWNreSA9IHN0aWNreSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gc3RpY2t5IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3kpO1xuICBpZiAoIXN0aWNreSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICB2YXIgcGFyZW50ID0gc3RpY2t5LnBhcmVudE5vZGUsXG4gICAgLy8gc3RpY2t5UG9zaXRpb24sXG4gICAgLy8gcGFyZW50UG9zaXRpb24sXG4gICAgY3VycmVudFN0YXRlID0gJ18nLFxuICAgIHN0YXRlU3dpdGNoZXIsXG4gICAgZGV0ZXJtaW5lID0ge1xuICAgICAgbm9ybWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoc3RpY2t5UG9zaXRpb24udG9wIDwgMSkge1xuICAgICAgICAgIGFwcGx5U3R5bGVzKHN0aWNreVBvc2l0aW9uLCBzdGlja3kpO1xuICAgICAgICAgIHN0aWNreS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0aWNreTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwYXJlbnRQb3NpdGlvbiA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLnRvcCA+IDEpIHtcbiAgICAgICAgICBzdGlja3kuc3R5bGUgPSAnJztcbiAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoJ25vcm1hbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib3VuZGVkKSB7XG4gICAgICAgICAgbGV0IHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbi5ib3R0b20gPCBzdGlja3lQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgICAgIHN0aWNreS5zdHlsZSA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHNldFN0YXRlKCdib3R0b20nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChzdGlja3lQb3NpdGlvbi50b3AgPiAxKSB7XG4gICAgICAgICAgYXBwbHlTdHlsZXMoc3RpY2t5UG9zaXRpb24sIHN0aWNreSk7XG4gICAgICAgICAgc3RpY2t5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChjdXJyZW50U3RhdGUgPT09IHN0YXRlKSB7IHJldHVybjsgfVxuICAgIHN0aWNreS5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7XG4gICAgc3RpY2t5LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgIHN0YXRlU3dpdGNoZXIgPSBkZXRlcm1pbmVbc3RhdGVdO1xuICB9XG5cbiAgLy8gc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgLy9zdGlja3kgaW5pdGlhbCBwb3NpdGlvblxuICBpZiAoc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDEpIHtcbiAgICBzZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgc3RhdGVTd2l0Y2hlcigpOyAgICAvLyBlZGdlIGNhc2U6IGNoZWNrIGlmIGJvdHRvbSBvZiBzdGlja3kgY29sbGlkZXMgdy8gYm91bmRpbmcgY29udGFpbmVyXG4gIH0gZWxzZSB7XG4gICAgc2V0U3RhdGUoJ25vcm1hbCcpO1xuICB9XG5cblxuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGVTd2l0Y2hlcik7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTsgIC8vIHN0YXRlU3dpdGNoZXIgY2hhbmdlcywgc28gY2Fubm90IHBhc3MgKGllLiBiaW5kIGRpcmVjdGx5KSBoZXJlXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTtcbn1cblxuIl19
