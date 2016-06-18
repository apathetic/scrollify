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

		// console.log(opts, now);

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

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
function Sticky(_sticky, bounded) {
  _sticky = _sticky instanceof HTMLElement ? _sticky : document.querySelector(_sticky);
  bounded = bounded || _sticky.getAttribute('data-bounded') || false;

  if (!_sticky) {
    return false;
  }

  var parent = _sticky.parentNode,
      stickyPosition,
      parentPosition,
      currentState = '_',
      stateSwitcher,
      determine = {
    normal: function normal() {
      stickyPosition = _sticky.getBoundingClientRect();
      if (stickyPosition.top < 1) {
        return setState('sticky');
      }
    },
    sticky: function sticky() {
      parentPosition = parent.getBoundingClientRect();
      if (parentPosition.top > 1) {
        return setState('normal');
      }
      if (!bounded) {
        return;
      } // don't worry about bottom edge
      stickyPosition = _sticky.getBoundingClientRect();
      if (parentPosition.bottom < stickyPosition.bottom) {
        return setState('bottom');
      }
    },
    bottom: function bottom() {
      stickyPosition = _sticky.getBoundingClientRect();
      if (stickyPosition.top > 1) {
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

  stickyPosition = _sticky.getBoundingClientRect();

  //sticky initial position
  if (stickyPosition.top < 1) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiLCJzcmMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozs7Ozs7O0FBT0EsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7Ozs7Ozs7QUFjQSxJQUFJLGFBQWE7Ozs7Ozs7O0FBT2hCLDZCQUFTLE1BQU07QUFDZCxNQUFJLFNBQVMsQ0FBVCxDQURVO0FBRWQsTUFBSSxPQUFPLEtBQUssT0FBTCxDQUZHOztBQUlkLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDN0IsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBREk7R0FBOUIsTUFFTzs7QUFDTixZQUFTLEtBQUssUUFBTCxJQUFpQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWpCO0FBREgsR0FGUDs7QUFNQSxPQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFNBQW5CLElBQWdDLGtCQUFpQixNQUFqQixHQUF5QixLQUF6QixDQVZsQjtFQVBDOzs7Ozs7Ozs7QUEwQmhCLHlCQUFPLE1BQU07QUFDWixNQUFJLE9BQU8sS0FBSyxPQUFMLENBREM7QUFFWixNQUFJLFVBQVUsS0FBSyxPQUFMLENBRkY7QUFHWixNQUFJLFFBQVEsT0FBTyxJQUFQLENBQVksSUFBWixDQUFSO0FB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ZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbi8vIGltcG9ydCB7ZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vZWFzaW5ncyc7XG5pbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBPcHRpb25zIGFyZSBhcHBsaWVkIGF0IGluaXRpYWxpemUsIGFuZCBhcmUgY3VycmllZCBpbiB2aWEgXCJ0aGlzXCIuXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXG5cdC8qKlxuXHQgKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuXHQgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0cGFyYWxsYXgoZGF0YSkge1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRcdG9mZnNldCA9IGRhdGEuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0XHRvZmZzZXQgPSBkYXRhLnByb2dyZXNzICogKG9wdHMucmFuZ2UgfHwgMCk7ICAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZi5cblx0ICogQHR5cGUge09iamVjdH0gb3B0czogVGhlIFwiY2xhc3NcIiB0byB0b2dnbGUsIGFuZCB3aGVuIChpZS4gYXQgd2hpY2ggcG9pbnQgaW4gdGhlIHByb2dyZXNzKVxuXHQgKiBAdGhpczogYW4gb2JqZWN0IGNvbnRhaW5pbmcgT3B0aW9ucyArIGVsZW1lbnQgcmVmZXJlbmNlXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR0b2dnbGUoZGF0YSkge1xuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRcdGxldCB0aW1lcyA9IE9iamVjdC5rZXlzKG9wdHMpO1x0XHQvLyB0aW1lc1xuXHRcdGxldCBub3cgPSBkYXRhLnByb2dyZXNzO1xuXG5cdFx0Ly8gY29uc29sZS5sb2cob3B0cywgbm93KTtcblxuXHRcdHRpbWVzLmZvckVhY2goZnVuY3Rpb24odGltZSkge1xuXHRcdFx0bGV0IGNzcyA9IG9wdHNbdGltZV07XG5cdFx0XHRpZiAobm93ID4gdGltZSkge1xuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBEdW1teSBlZmZlY3QgZm9yIHRlc3RpbmcsIGF0IHRoZSBtb21lbnRcblx0ICovXG5cdHRyYW5zbGF0ZVgob3B0cykge1xuXHRcdGxldCBvZmZzZXQgPSB0aGlzLmFic29sdXRlO1xuXHRcdGxldCBvbiA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdGxldCBkZWxheSA9IHdpbmRvdy5pbm5lckhlaWdodDtcdC8vIHN0YXJ0IHRyYW5zbGF0aW5nIGFmdGVyIG9uZSB3aW5kb3ctaGVpZ2h0IG9mIHNjcm9sbGluZ1xuXG5cdFx0b2Zmc2V0IC09IGRlbGF5O1xuXG5cdFx0Ly8gaWYgKHRoaXMucGVyY2VudCA8IDAuNSkgeyAgICAvLyB0ZXN0OiBzdGFydCB0cmFuc2xhdGluZyB3aGVuIGVsZW1lbnQgaXMgY2VudGVyZWQgaW4gdmlld3BvcnRcblx0XHQvLyAgIG9mZnNldCAtPSBkZWxheTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vICAgb2Zmc2V0ID0gMDtcblx0XHQvLyB9XG5cblx0XHQvLyAgZWFzZSA9IGVhc2VJblF1YWQoZWxhcHNlZCwgICAgIHN0YXJ0LCBlbmQsIGR1cmF0aW9uKTtcblx0XHRsZXQgZGlzdGFuY2UgPSA1MDA7XG5cdFx0bGV0IGVhc2UgPSBlYXNlSW5RdWFkKHRoaXMucGVyY2VudCAqIDEwMCwgMCwgZGlzdGFuY2UsIDEwMCk7XG5cblx0XHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoJyArIGVhc2UgKyAncHgsIDAsIDApJztcblx0fVxufVxuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRlYnVnKSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY2VuZXMgPSBbXTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZGVidWcgPSBkZWJ1ZztcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBwYXJhbXM6IGFueSBUV08gb2Y6IHN0YXJ0IC8gc3RvcCAvIGR1cmF0aW9uLlxuXHQgKiAgICAgICAgIHN0YXJ0OiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KSBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24gKGVnIFsnI3RvZ2dsZScsIDAuM10gKVxuXHQgKiAgICAgICAgIHN0b3A6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uXG5cdCAqICAgICAgICAgZHVyYXRpb246IHRoZSBkdXJhdGlvbiBpbiBwaXhlbHNcblx0ICpcblx0ICogICAgICAgICBkZWZhdWx0IGlzIDAgLSAxMDAlIChtYWtpbmcgZHVyYXRpb24gdGhlIHdpbmRvdyBoZWlnaHQgKyBlbGVtZW50IGhlaWdodClcblx0ICpcblx0ICogICAgICAgICBleGFtcGxlczpcblx0ICogICAgICAgICAgeyBzdGFydDogMCwgc3RvcDogMC41IH1cblx0ICogICAgICAgICAgeyBzdGFydDogMC4xLCBkdXJhdGlvbjogJzQwMHB4JyB9XG5cdCAqICAgICAgICAgIHsgZHVyYXRpb246IDEwMHB4LCBzdG9wOiAxLjAgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBzdG9wOiBbJyN0b2dnbGUnLCAwLjVdIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgZHVyYXRpb246ICczMDBweCcgfVxuXHQgKlxuXHQgKiAgICAgICAgIGVhc2luZy4uLj8gc3RhcnQsIHRvLCBmcm9tLCBkdXJhdGlvblxuXHQgKlxuXHQgKi9cblx0YWRkU2NlbmUob3B0cykge1xuXHRcdGxldCBzdGFydCA9IChvcHRzLnN0YXJ0ID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiBvcHRzLnN0YXJ0O1xuXHRcdGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgbnVsbDtcblx0XHRsZXQgZWZmZWN0cyA9IG9wdHMuZWZmZWN0cztcblx0XHRsZXQgdHJpZ2dlciA9IG9wdHMudHJpZ2dlciB8fCB0aGlzLmVsZW1lbnQ7IC8vIC5wYXJlbnROb2RlO1xuXG5cdFx0bGV0IHNjZW5lID0ge1xuXHRcdFx0J3RyaWdnZXInOiB0cmlnZ2VyLFxuXHRcdFx0J3N0YXJ0Jzogc3RhcnQsXG5cdFx0XHQnZHVyYXRpb24nOiBkdXJhdGlvbixcblx0XHRcdCdlZmZlY3RzJzogW11cblx0XHR9O1xuXG5cdFx0aWYgKHN0YXJ0ID09PSBmYWxzZSkgeyBjb25zb2xlLmxvZygnU2Nyb2xsaWZ5IFtlcnJvcl06IENhbm5vdCBhZGQgU2NlbmUuIE1pc3NpbmcgXCJzdGFydFwiIGFyZ3VtZW50LicpOyByZXR1cm47IH1cblxuXHRcdGVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRsZXQgZWZmZWN0TmFtZSA9IG9wdHMuZWZmZWN0c1swXTtcblx0XHRcdGxldCBlZmZlY3RPcHRpb25zID0gb3B0cy5lZmZlY3RzWzFdIHx8IG51bGw7XG5cdFx0XHR0aGlzLmFkZEVmZmVjdChlZmZlY3ROYW1lLCBlZmZlY3RPcHRpb25zLCBzY2VuZSk7XG5cdFx0fSk7XG5cblx0XHQvLyBpZiAoZHVyYXRpb24gJiYgZW5kICYmICFzdGFydCkge1xuXHRcdC8vIFx0c3RhcnQgPSAoZW5kICogd2luZG93LmlubmVySGVpZ2h0IC0gZHVyYXRpb24pO1xuXG5cdFx0aWYgKGR1cmF0aW9uKSB7XG5cdFx0XHR0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVTY2VuZShzY2VuZSk7XG5cdFx0dGhpcy5zY2VuZXMucHVzaChzY2VuZSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgZWFjaCBzY2VuZS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogVGhlIHNjZW5lIHRvIHVwZGF0ZS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHVwZGF0ZVNjZW5lKHNjZW5lKSB7XG5cdFx0bGV0IHRyaWdnZXIgPSBzY2VuZS50cmlnZ2VyO1xuXHRcdGxldCBCQ1IgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGxldCB3aGVyZSA9IDE7XG5cdFx0bGV0IHRvcCA9IDA7XHQvLyB3aW5kb3cuc2Nyb2xsWTtcblxuXHRcdC8vIGZpbmQgcG9zaXRpb24gaW4gdGhlIGRvY3VtZW50OlxuXHRcdGRvIHtcblx0XHRcdFx0dG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG5cdFx0XHRcdHRyaWdnZXIgPSB0cmlnZ2VyLm9mZnNldFBhcmVudDtcblx0XHR9IHdoaWxlKHRyaWdnZXIpO1xuXG5cdFx0c2NlbmUuc3RhcnQgPSB0b3AgLSAod2hlcmUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHRcdC8vIHNjZW5lLmR1cmF0aW9uID0gd2luZG93LmlubmVySGVpZ2h0ICsgdHJpZ2dlci5vZmZzZXRIZWlnaHQ7XG5cblx0XHR0aGlzLmNhbGN1bGF0ZShzY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiB0byBhIHNjZW5lLlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd8RnVuY3Rpb259IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiBPUiBhbiBhY3R1YWwgZnVuY3Rpb24gdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uczogQW55IHRyYW5zZm9ybWF0aW9uIG9wdGlvbnMuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgb3B0aW9ucywgc2NlbmUpIHtcblx0XHRsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuXHRcdGlmIChzY2VuZSkge1xuXHRcdFx0bGV0IGVmZmVjdCA9ICh0eXBlb2YgbmFtZSA9PSAnZnVuY3Rpb24nKSA/IG5hbWUgOiBlZmZlY3RMaXN0W25hbWVdO1xuXHRcdFx0bGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuXHRcdFx0XHRcdGxldCBjb250ZXh0ID0ge1xuXHRcdFx0XHRcdFx0J29wdGlvbnMnOiBvcHRpb25zLFxuXHRcdFx0XHRcdFx0J2VsZW1lbnQnOiBlbGVtZW50XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRmbi5jYWxsKGNvbnRleHQsIHRoaXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUuZWZmZWN0cy5wdXNoKGN1cnJ5KGVmZmVjdCwgb3B0aW9ucykpO1xuXG5cdFx0XHRpZiAobmFtZSA9PSAnc3RpY2snKSB7XG5cdFx0XHRcdG5ldyBTdGlja3koZWxlbWVudCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gaWYgbm8gc2NlbmUgKGllIFwiZWZmZWN0XCIgd2FzIGNhbGxlZCBkaXJlY3RseSBvbiBTY3JvbGxpZnkpLCBzZXQgdXAgYSBkZWZhdWx0IHNjZW5lXG5cdFx0XHRsZXQgc2NlbmVPcHRzID0ge1xuXHRcdFx0XHQnc3RhcnQnOiAwLFx0XHQvLyBcdFx0c2NlbmUuc3RhcnQgPSB0b3AgLSAod2hlcmUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHRcdFx0XHQnZHVyYXRpb24nOiB3aW5kb3cuaW5uZXJIZWlnaHQgKyBlbGVtZW50Lm9mZnNldEhlaWdodCxcblx0XHRcdFx0J2VmZmVjdHMnOiBbbmFtZSwgb3B0aW9uc11cblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRTY2VuZShzY2VuZU9wdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIG9uU2Nyb2xsIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIG9uUmVzaXplIEhhbmRsZXJcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdC8vIHRoaXMudGhyb3R0bGUodGhpcy51cGRhdGVTY2VuZSk7XG5cdFx0dGhpcy5zY2VuZXMuZm9yRWFjaCgoc2NlbmUpID0+IHRoaXMudXBkYXRlU2NlbmUoc2NlbmUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaW1pdCBmcmVxdWVuY3kgb2YgRE9NIHVwZGF0ZXMgb24gcmVzaXplXG5cdCAqL1xuXHR0aHJvdHRsZSgpIHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgdHJhbnNmb3JtYXRpb25zIGZvciBldmVyeSBzY2VuZS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKChzY2VuZSkgPT4gdGhpcy5jYWxjdWxhdGUoc2NlbmUpKTtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGUgdGhlIHRyYW5zZm9ybWF0aW9ucyBmb3IgZWFjaCBzY2VuZS5cblx0ICogQHBhcmFtICB7T2JqZWN0fSBzY2VuZTogQW4gT2JqZWN0IGNvbnRhaW5pbmcgc3RhcnQgYW5kIGR1cmF0aW9uIGluZm9ybWF0aW9uIGFzIHdlbGwgYXMgdGhlIHRyYW5zZm9ybWF0aW9ucyB0byBhcHBseS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGNhbGN1bGF0ZShzY2VuZSkge1xuXHRcdC8vIGxldCBkYXRhID0gdGhpcy5kYXRhO1xuXHRcdGxldCBzdGFydCA9IHNjZW5lLnN0YXJ0O1xuXHRcdGxldCBkdXJhdGlvbiA9IHNjZW5lLmR1cmF0aW9uO1xuXHRcdGxldCBzY3JvbGwgPSB0aGlzLnNjcm9sbDtcblx0XHRsZXQgcHJvZ3Jlc3MgPSAoc2Nyb2xsIC0gc3RhcnQpIC8gZHVyYXRpb247XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdC8vIGlmIChwcm9ncmVzcyA8IDAgfHwgcHJvZ3Jlc3MgPiAxKSB7IHJldHVybjsgfVxuXG5cdFx0Ly8gVXNlICphY3R1YWwqIHBvc2l0aW9uIGRhdGEuIEFuIGVsZW1lbnQgbWF5IGJlIG9uc2NyZWVuIHdoaWxlIGl0cyByZWZlcmVuY2UgKHRyaWdnZXIpIGVsZW1lbnQgaXMgbm90LlxuXHRcdGlmICh0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gd2luZG93LmlubmVySGVpZ2h0IHx8XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuZGVidWcsIHByb2dyZXNzKTtcblx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc3RhcnQgICAgICB0byAgZnJvbSAgZW5kXG5cdFx0Ly8gbGV0IGVhc2luZyA9IGVhc2VJbk91dFF1YWQoZGF0YS5zdGFydCwgMTAwLCAwLCBkYXRhLnN0YXJ0K2RhdGEuZHVyYXRpb24pO1xuXG5cdFx0Ly8gY3ljbGUgdGhyb3VnaCBhbnkgcmVnaXN0ZXJlZCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRzY2VuZS5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4ge1xuXHRcdFx0ZWZmZWN0LmNhbGwoe1xuXHRcdFx0XHQncHJvZ3Jlc3MnOiBwcm9ncmVzcyxcblx0XHRcdFx0J2Fic29sdXRlJzogc2Nyb2xsIC0gc3RhcnRcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIFB1dCBDYXJvdXNlbCBpbnRvIHRoZSBHbG9iYWwgc2NvcGUuXG4gKiBVc2VmdWwgZm9yIGV4aXN0aW5nIGRlbW9zIG9yIGlmIHlvdSB3aXNoIHRvIGluY2x1ZGUgbWFudWFsbHlcbiAqL1xuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG53aW5kb3cuU2Nyb2xsaWZ5ID0gc2Nyb2xsaWZ5O1xuIiwiLypcbiAqIFN0aWNreVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy8uLi4uP1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiwgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLypnbG9iYWwgZG9jdW1lbnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEhUTUxFbGVtZW50Ki9cblxuXG4vKipcbiAqIFN0aWNreSBFbGVtZW50OiBzZXRzIHVwIGEgc3RpY2t5IGJhciB3aGljaCBhdHRhY2hlcyAvIGRldGFjaGVzIHRvIHRvcCBvZiB2aWV3cG9ydFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RpY2t5OiBUaGUgZWxlbWVudCB0byBzdGlja3ktaWZ5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGJvdW5kZWQ6IFdoZXRoZXIgdG8gYXBwbHkgc3RpY2tpbmVzcyB0byB0aGUgYm90dG9tIG9mIHRoZSBwYXJlbnQgY29udGFpbmVyLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RpY2t5KHN0aWNreSwgYm91bmRlZCkge1xuICBzdGlja3kgPSBzdGlja3kgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IHN0aWNreSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RpY2t5KTtcbiAgYm91bmRlZCA9IGJvdW5kZWQgfHwgc3RpY2t5LmdldEF0dHJpYnV0ZSgnZGF0YS1ib3VuZGVkJykgfHwgZmFsc2U7XG5cbiAgaWYgKCFzdGlja3kpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgdmFyIHBhcmVudCA9IHN0aWNreS5wYXJlbnROb2RlLFxuICAgIHN0aWNreVBvc2l0aW9uLFxuICAgIHBhcmVudFBvc2l0aW9uLFxuICAgIGN1cnJlbnRTdGF0ZSA9ICdfJyxcbiAgICBzdGF0ZVN3aXRjaGVyLFxuICAgIGRldGVybWluZSA9IHtcbiAgICAgIG5vcm1hbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoc3RpY2t5UG9zaXRpb24udG9wIDwgMSkgeyByZXR1cm4gc2V0U3RhdGUoJ3N0aWNreScpOyB9XG4gICAgICB9LFxuICAgICAgc3RpY2t5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyZW50UG9zaXRpb24gPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbi50b3AgPiAxKSB7IHJldHVybiBzZXRTdGF0ZSgnbm9ybWFsJyk7IH1cbiAgICAgICAgaWYgKCFib3VuZGVkKSB7IHJldHVybjsgfSAgIC8vIGRvbid0IHdvcnJ5IGFib3V0IGJvdHRvbSBlZGdlXG4gICAgICAgIHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAocGFyZW50UG9zaXRpb24uYm90dG9tIDwgc3RpY2t5UG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgICAgcmV0dXJuIHNldFN0YXRlKCdib3R0b20nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJvdHRvbTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoc3RpY2t5UG9zaXRpb24udG9wID4gMSkgeyByZXR1cm4gc2V0U3RhdGUoJ3N0aWNreScpOyB9XG4gICAgICB9XG4gICAgfTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChjdXJyZW50U3RhdGUgPT09IHN0YXRlKSB7IHJldHVybjsgfVxuICAgIHN0aWNreS5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRTdGF0ZSk7XG4gICAgc3RpY2t5LmNsYXNzTGlzdC5hZGQoc3RhdGUpO1xuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgIHN0YXRlU3dpdGNoZXIgPSBkZXRlcm1pbmVbc3RhdGVdO1xuICB9XG5cbiAgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgLy9zdGlja3kgaW5pdGlhbCBwb3NpdGlvblxuICBpZiAoc3RpY2t5UG9zaXRpb24udG9wIDwgMSkge1xuICAgIHNldFN0YXRlKCdzdGlja3knKTtcbiAgICBzdGF0ZVN3aXRjaGVyKCk7ICAgIC8vIGVkZ2UgY2FzZTogY2hlY2sgaWYgYm90dG9tIG9mIHN0aWNreSBjb2xsaWRlcyB3LyBib3VuZGluZyBjb250YWluZXJcbiAgfSBlbHNlIHtcbiAgICBzZXRTdGF0ZSgnbm9ybWFsJyk7XG4gIH1cblxuXG4gIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzdGF0ZVN3aXRjaGVyKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkgeyBzdGF0ZVN3aXRjaGVyKCk7IH0pOyAgLy8gc3RhdGVTd2l0Y2hlciBjaGFuZ2VzLCBzbyBjYW5ub3QgcGFzcyAoaWUuIGJpbmQgZGlyZWN0bHkpIGhlcmVcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkgeyBzdGF0ZVN3aXRjaGVyKCk7IH0pO1xufVxuXG4iXX0=
