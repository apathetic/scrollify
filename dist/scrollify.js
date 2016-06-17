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
 * NOTE: don't use arrow fn's here as they proxy "this"
 * @type {Object}
 */
var effectList = {

	/**
  * Parallax an element.
   * @type {Object} opts: You may define parallax "speed" or parallax "range" (in pixels).
  * @return {void}
  */

	parallax: function parallax(opts) {
		var offset = 0;

		if (opts.speed !== undefined) {
			// check speed first
			offset = this.absolute * opts.speed;
		} else {
			// fallback to range
			offset = this.progresss * (opts.range || 0); // default is "0", no effect
		}

		this.el.style[transform] = 'translate(0, ' + offset + 'px)';
	},


	/**
  * Toggle a class on or off.
   * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
  * @return {void}
  */
	toggle: function toggle(opts) {
		var times = Object.keys(opts); // times
		var el = this.el;
		var now = this.progress;

		times.forEach(function (time) {
			var css = opts[time];
			if (now > time) {
				el.classList.add(css);
			} else {
				el.classList.remove(css);
			}
		});
	},


	/**
  * Pin an element for a specific duration
  * ... while this works, it is pretty ugly and candidate for improvement
  */
	// pin(opts) {
	//  let waypoints = Object.keys(opts);
	//  let percent = this.percent * 100;

	//  waypoints.forEach(where => {
	//    if (percent < parseInt(where)) {

	//      let distance = opts[where];
	//      let absolute = this.absolute;
	//      var current;

	//      if (this.current) {
	//        current = this.current;
	//      } else {
	//        current = absolute;
	//        this.current = current;
	//      }

	//      let end = current + distance; // (this assumes current will be "frozen" and unchanged while pinned)
	//      let offset = absolute - current;

	//      if (absolute < end) {
	//        this.el.style[transform] = 'translate(0, '+ offset +'px)';
	//      }
	//    } else {
	//      // this.el.style[transform] = 'translate(0, 0)';
	//    }
	//  });
	// },

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

		this.trigger = element; // by default. Update if there is a Scene with a particular trigger element
		this.ticking = false;
		this.effects = [];
		this.data = { el: element, progress: 0, absolute: 0 };
		this.scroll = window.scrollY;
		this.debug = debug;

		this.initialize();

		window.addEventListener('scroll', function (e) {
			return _this.onScroll(e);
		});
		window.addEventListener('resize', function (e) {
			return _this.onResize(e);
		});
	}

	/**
  * Initialize the "data" Object for each element, which contains position information as well
  * as a reference to the DOM node. The calculatation needs to be made "as if from an initial
  * scroll position of 0".
   * @param  {Number} where: The location to start the effect. 1 is bottom, 0 is top of viewport.
  * @return {void}
  */


	_createClass(Scrollify, [{
		key: 'initialize',
		value: function initialize() {
			var where = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			// default: start where they appear on screen, at bottom
			var BCR = this.trigger.getBoundingClientRect();

			// this.element.style.transform = '';		// remove any transformations, as we need "un-transformed"
			// data to compute the element's initial position.

			// find position in the document:
			var top = 0; // window.scrollY;
			var trigger = this.trigger;
			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);

			// Calculate how far across the screen the element is. "0" is where the top edge of the element first peeks out
			// from the bottom of the viewport, and "1" is where the bottom edge disappears beyond the top of the viewport:

			this.start = top - where * window.innerHeight;
			this.duration = window.innerHeight + this.trigger.offsetHeight;

			this.calculate();
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

	}, {
		key: 'scene',
		value: function scene(opts) {
			var start = opts.start || null;
			var duration = opts.duration || null;
			// let end = opts.end || null;
			// let top;

			if (!start) {
				conosle.log('missing start');return;
			}

			// if (duration && end && !start) {
			// 	start = (end * window.innerHeight - duration);

			if (Array.isArray(start)) {
				this.target = document.querySelector(start[0]);
				this.initialize(start[1]);
			}

			if (duration) {
				this.duration = duration;
			}

			return this;
		}

		/**
   * Add a custom effect to Scrollify.
   * @param  {String} name: The name of the transformation to add.
   * @param  {Function} effect: The function that produces the tranformation.
   * @return {void}
   */

	}, {
		key: 'addEffect',
		value: function addEffect(name, effect) {
			effectList[name] = effect;
			return this;
		}

		/**
   * Use an particular transformation on an Element.
   * @param  {String|Function} name: The name of the transformation OR an actual function to apply.
   * @param  {Object} options: Any transformation options.
   * @return {void}
   */

	}, {
		key: 'do',
		value: function _do(name, options) {
			var curry = function curry(fn, options) {
				return function () {
					// NOTE: don't use => function here as we do NOT want to bind "this"
					fn.call(this, options); // eslint-disable-line
				};
			};

			this.effects.push(curry(effectList[name], options));

			if (name == 'stick') {
				new _sticky2.default(this.element, true);
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
			this.initialize(); // or.. updateScene..?
			// this.update();
		}

		/**
   * Update the transformation of every element.
   * @return {void}
   */

	}, {
		key: 'update',
		value: function update() {
			this.calculate();
			this.ticking = false;
		}

		/**
   * Calculate the transformation of each element
   * @param  {Object} data: An Object containing position information and the element to udpate.
   * @return {void}
   */

	}, {
		key: 'calculate',
		value: function calculate() {
			var data = this.data;
			var start = this.start;
			var duration = this.duration;
			var scroll = this.scroll;
			var progress = void 0;

			progress = (scroll - start) / duration;
			if (progress < 0 || progress > 1) {
				return;
			}

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (start < scroll && scroll > start + duration) { return; }
			// progress = (scroll - start) / duration;

			// update data Object
			// data.percent = percent;
			data.absolute = scroll - start;
			data.progress = progress;

			if (this.debug) {
				console.log(this.debug, progress);
			}

			// start      to  from  end
			// let easing = easeInOutQuad(data.start, 100, 0, data.start+data.duration);

			// cycle through any registered transformations
			this.effects.forEach(function (effect) {
				effect.call(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiLCJzcmMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozs7Ozs7O0FBT0EsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7Ozs7OztBQWFBLElBQUksYUFBYTs7Ozs7Ozs7QUFPaEIsNkJBQVMsTUFBTTtBQUNkLE1BQUksU0FBUyxDQUFULENBRFU7O0FBR2QsTUFBSSxLQUFLLEtBQUwsS0FBZSxTQUFmLEVBQTBCOztBQUM3QixZQUFTLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQUwsQ0FESTtHQUE5QixNQUVPOztBQUNOLFlBQVMsS0FBSyxTQUFMLElBQWtCLEtBQUssS0FBTCxJQUFjLENBQWQsQ0FBbEI7QUFESCxHQUZQOztBQU1BLE9BQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxTQUFkLElBQTJCLGtCQUFpQixNQUFqQixHQUF5QixLQUF6QixDQVRiO0VBUEM7Ozs7Ozs7O0FBd0JoQix5QkFBTyxNQUFNO0FBQ1osTUFBSSxRQUFRLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBUjtBQURRLE1BRVIsS0FBSyxLQUFLLEVBQUwsQ0FGRztBQUdaLE1BQUksTUFBTSxLQUFLLFFBQUwsQ0FIRTs7QUFLWixRQUFNLE9BQU4sQ0FBYyxVQUFTLElBQVQsRUFBZTtB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ZUFBZSxHQUFmLEdBQXFCLENBQXJCLEVBQXdCO0FBQzFCLGFBQVMsUUFBVCxFQUQwQjtBQUUxQjtBQUYwQixHQUE1QixNQUdPO0FBQ0wsZUFBUyxRQUFULEVBREs7S0FIUDs7O0FBMUM4QyxRQW1EOUMsQ0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFXO0FBQUUsb0JBQUY7R0FBWCxDQUFsQztBQW5EOEMsUUFvRDlDLENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUFFLG9CQUFGO0dBQVgsQ0FBbEMsQ0FwRDhDO0NBQWpDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cbi8vIGltcG9ydCB7ZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vZWFzaW5ncyc7XG5pbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXG5cdC8qKlxuXHQgKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuICAgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0cGFyYWxsYXgob3B0cykge1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRcdG9mZnNldCA9IHRoaXMuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0XHRvZmZzZXQgPSB0aGlzLnByb2dyZXNzcyAqIChvcHRzLnJhbmdlIHx8IDApOyAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdFx0fVxuXG5cdFx0dGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gICAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFRoZSBcImNsYXNzXCIgdG8gdG9nZ2xlLCBhbmQgd2hlbiAoaWUuIGF0IHdoaWNoIHBvaW50IGluIHRoZSBwcm9ncmVzcylcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHRvZ2dsZShvcHRzKSB7XG5cdFx0bGV0IHRpbWVzID0gT2JqZWN0LmtleXMob3B0cyk7XHRcdC8vIHRpbWVzXG5cdFx0bGV0IGVsID0gdGhpcy5lbDtcblx0XHRsZXQgbm93ID0gdGhpcy5wcm9ncmVzcztcblxuXHRcdHRpbWVzLmZvckVhY2goZnVuY3Rpb24odGltZSkge1xuXHRcdFx0bGV0IGNzcyA9IG9wdHNbdGltZV07XG5cdFx0XHRpZiAobm93ID4gdGltZSkge1xuXHRcdFx0XHRlbC5jbGFzc0xpc3QuYWRkKGNzcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFBpbiBhbiBlbGVtZW50IGZvciBhIHNwZWNpZmljIGR1cmF0aW9uXG5cdCAqIC4uLiB3aGlsZSB0aGlzIHdvcmtzLCBpdCBpcyBwcmV0dHkgdWdseSBhbmQgY2FuZGlkYXRlIGZvciBpbXByb3ZlbWVudFxuXHQgKi9cblx0XHQvLyBwaW4ob3B0cykge1xuXHRcdC8vICBsZXQgd2F5cG9pbnRzID0gT2JqZWN0LmtleXMob3B0cyk7XG5cdFx0Ly8gIGxldCBwZXJjZW50ID0gdGhpcy5wZXJjZW50ICogMTAwO1xuXG5cdFx0Ly8gIHdheXBvaW50cy5mb3JFYWNoKHdoZXJlID0+IHtcblx0XHQvLyAgICBpZiAocGVyY2VudCA8IHBhcnNlSW50KHdoZXJlKSkge1xuXG5cdFx0Ly8gICAgICBsZXQgZGlzdGFuY2UgPSBvcHRzW3doZXJlXTtcblx0XHQvLyAgICAgIGxldCBhYnNvbHV0ZSA9IHRoaXMuYWJzb2x1dGU7XG5cdFx0Ly8gICAgICB2YXIgY3VycmVudDtcblxuXHRcdC8vICAgICAgaWYgKHRoaXMuY3VycmVudCkge1xuXHRcdC8vICAgICAgICBjdXJyZW50ID0gdGhpcy5jdXJyZW50O1xuXHRcdC8vICAgICAgfSBlbHNlIHtcblx0XHQvLyAgICAgICAgY3VycmVudCA9IGFic29sdXRlO1xuXHRcdC8vICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50O1xuXHRcdC8vICAgICAgfVxuXG5cdFx0Ly8gICAgICBsZXQgZW5kID0gY3VycmVudCArIGRpc3RhbmNlOyAvLyAodGhpcyBhc3N1bWVzIGN1cnJlbnQgd2lsbCBiZSBcImZyb3plblwiIGFuZCB1bmNoYW5nZWQgd2hpbGUgcGlubmVkKVxuXHRcdC8vICAgICAgbGV0IG9mZnNldCA9IGFic29sdXRlIC0gY3VycmVudDtcblxuXHRcdC8vICAgICAgaWYgKGFic29sdXRlIDwgZW5kKSB7XG5cdFx0Ly8gICAgICAgIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0XHQvLyAgICAgIH1cblx0XHQvLyAgICB9IGVsc2Uge1xuXHRcdC8vICAgICAgLy8gdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG5cdFx0Ly8gICAgfVxuXHRcdC8vICB9KTtcblx0XHQvLyB9LFxuXG5cdC8qKlxuXHQgKiBEdW1teSBlZmZlY3QgZm9yIHRlc3RpbmcsIGF0IHRoZSBtb21lbnRcblx0ICovXG4gIHRyYW5zbGF0ZVgob3B0cykge1xuICAgIGxldCBvZmZzZXQgPSB0aGlzLmFic29sdXRlO1xuICAgIGxldCBvbiA9IE9iamVjdC5rZXlzKG9wdHMpO1xuICAgIGxldCBkZWxheSA9IHdpbmRvdy5pbm5lckhlaWdodDtcdC8vIHN0YXJ0IHRyYW5zbGF0aW5nIGFmdGVyIG9uZSB3aW5kb3ctaGVpZ2h0IG9mIHNjcm9sbGluZ1xuXG4gICAgb2Zmc2V0IC09IGRlbGF5O1xuXG4gICAgLy8gaWYgKHRoaXMucGVyY2VudCA8IDAuNSkgeyAgICAvLyB0ZXN0OiBzdGFydCB0cmFuc2xhdGluZyB3aGVuIGVsZW1lbnQgaXMgY2VudGVyZWQgaW4gdmlld3BvcnRcbiAgICAvLyAgIG9mZnNldCAtPSBkZWxheTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgb2Zmc2V0ID0gMDtcbiAgICAvLyB9XG5cbiAgICAvLyAgZWFzZSA9IGVhc2VJblF1YWQoZWxhcHNlZCwgICAgIHN0YXJ0LCBlbmQsIGR1cmF0aW9uKTtcbiAgICBsZXQgZGlzdGFuY2UgPSA1MDA7XG4gICAgbGV0IGVhc2UgPSBlYXNlSW5RdWFkKHRoaXMucGVyY2VudCAqIDEwMCwgMCwgZGlzdGFuY2UsIDEwMCk7XG5cbiAgICB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoJyArIGVhc2UgKyAncHgsIDAsIDApJztcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRlYnVnKSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMudHJpZ2dlciA9IGVsZW1lbnQ7XHRcdC8vIGJ5IGRlZmF1bHQuIFVwZGF0ZSBpZiB0aGVyZSBpcyBhIFNjZW5lIHdpdGggYSBwYXJ0aWN1bGFyIHRyaWdnZXIgZWxlbWVudFxuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZGF0YSA9IHsgZWw6IGVsZW1lbnQsIHByb2dyZXNzOiAwLCBhYnNvbHV0ZTogMCB9O1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5kZWJ1ZyA9IGRlYnVnO1xuXG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgXCJkYXRhXCIgT2JqZWN0IGZvciBlYWNoIGVsZW1lbnQsIHdoaWNoIGNvbnRhaW5zIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFzIHdlbGxcblx0ICogYXMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBub2RlLiBUaGUgY2FsY3VsYXRhdGlvbiBuZWVkcyB0byBiZSBtYWRlIFwiYXMgaWYgZnJvbSBhbiBpbml0aWFsXG5cdCAqIHNjcm9sbCBwb3NpdGlvbiBvZiAwXCIuXG4gICAqIEBwYXJhbSAge051bWJlcn0gd2hlcmU6IFRoZSBsb2NhdGlvbiB0byBzdGFydCB0aGUgZWZmZWN0LiAxIGlzIGJvdHRvbSwgMCBpcyB0b3Agb2Ygdmlld3BvcnQuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRpbml0aWFsaXplKHdoZXJlID0gMSkge1x0XHQvLyBkZWZhdWx0OiBzdGFydCB3aGVyZSB0aGV5IGFwcGVhciBvbiBzY3JlZW4sIGF0IGJvdHRvbVxuXHRcdGxldCBCQ1IgPSB0aGlzLnRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHQvLyB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJyc7XHRcdC8vIHJlbW92ZSBhbnkgdHJhbnNmb3JtYXRpb25zLCBhcyB3ZSBuZWVkIFwidW4tdHJhbnNmb3JtZWRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBkYXRhIHRvIGNvbXB1dGUgdGhlIGVsZW1lbnQncyBpbml0aWFsIHBvc2l0aW9uLlxuXG5cdFx0Ly8gZmluZCBwb3NpdGlvbiBpbiB0aGUgZG9jdW1lbnQ6XG4gICAgbGV0IHRvcCA9IDA7XHQvLyB3aW5kb3cuc2Nyb2xsWTtcbiAgICBsZXQgdHJpZ2dlciA9IHRoaXMudHJpZ2dlcjtcbiAgICBkbyB7XG4gICAgICAgIHRvcCArPSB0cmlnZ2VyLm9mZnNldFRvcCAgfHwgMDtcbiAgICAgICAgdHJpZ2dlciA9IHRyaWdnZXIub2Zmc2V0UGFyZW50O1xuICAgIH0gd2hpbGUodHJpZ2dlcik7XG5cblx0XHQvLyBDYWxjdWxhdGUgaG93IGZhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGUgZWxlbWVudCBpcy4gXCIwXCIgaXMgd2hlcmUgdGhlIHRvcCBlZGdlIG9mIHRoZSBlbGVtZW50IGZpcnN0IHBlZWtzIG91dFxuXHRcdC8vIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQsIGFuZCBcIjFcIiBpcyB3aGVyZSB0aGUgYm90dG9tIGVkZ2UgZGlzYXBwZWFycyBiZXlvbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQ6XG5cblx0XHR0aGlzLnN0YXJ0ID0gdG9wIC0gKHdoZXJlICogd2luZG93LmlubmVySGVpZ2h0KTtcblx0XHR0aGlzLmR1cmF0aW9uID0gd2luZG93LmlubmVySGVpZ2h0ICsgdGhpcy50cmlnZ2VyLm9mZnNldEhlaWdodDtcblxuXHRcdHRoaXMuY2FsY3VsYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogcGFyYW1zOiBhbnkgVFdPIG9mOiBzdGFydCAvIHN0b3AgLyBkdXJhdGlvbi5cblx0ICogICAgICAgICBzdGFydDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCAoZWcuIDAuNSkgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uIChlZyBbJyN0b2dnbGUnLCAwLjNdIClcblx0ICogICAgICAgICBzdG9wOiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvblxuXHQgKiAgICAgICAgIGR1cmF0aW9uOiB0aGUgZHVyYXRpb24gaW4gcGl4ZWxzXG5cdCAqXG5cdCAqICAgICAgICAgZGVmYXVsdCBpcyAwIC0gMTAwJSAobWFraW5nIGR1cmF0aW9uIHRoZSB3aW5kb3cgaGVpZ2h0ICsgZWxlbWVudCBoZWlnaHQpXG5cdCAqXG5cdCAqICAgICAgICAgZXhhbXBsZXM6XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IDAsIHN0b3A6IDAuNSB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IDAuMSwgZHVyYXRpb246ICc0MDBweCcgfVxuXHQgKiAgICAgICAgICB7IGR1cmF0aW9uOiAxMDBweCwgc3RvcDogMS4wIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgc3RvcDogWycjdG9nZ2xlJywgMC41XSB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIGR1cmF0aW9uOiAnMzAwcHgnIH1cblx0ICpcblx0ICogICAgICAgICBlYXNpbmcuLi4/IHN0YXJ0LCB0bywgZnJvbSwgZHVyYXRpb25cblx0ICpcblx0ICovXG5cdHNjZW5lKG9wdHMpIHtcblx0XHRsZXQgc3RhcnQgPSBvcHRzLnN0YXJ0IHx8IG51bGw7XG5cdFx0bGV0IGR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCBudWxsO1xuXHRcdC8vIGxldCBlbmQgPSBvcHRzLmVuZCB8fCBudWxsO1xuXHRcdC8vIGxldCB0b3A7XG5cblx0XHRpZiAoIXN0YXJ0KSB7IGNvbm9zbGUubG9nKCdtaXNzaW5nIHN0YXJ0Jyk7IHJldHVybjsgfVxuXG5cdFx0Ly8gaWYgKGR1cmF0aW9uICYmIGVuZCAmJiAhc3RhcnQpIHtcblx0XHQvLyBcdHN0YXJ0ID0gKGVuZCAqIHdpbmRvdy5pbm5lckhlaWdodCAtIGR1cmF0aW9uKTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHN0YXJ0KSkge1xuXHRcdFx0dGhpcy50YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0YXJ0WzBdKTtcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZShzdGFydFsxXSk7XG5cdFx0fVxuXG5cdFx0aWYgKGR1cmF0aW9uKSB7XG5cdFx0ICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogQWRkIGEgY3VzdG9tIGVmZmVjdCB0byBTY3JvbGxpZnkuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFkZC5cbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGVmZmVjdDogVGhlIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgdGhlIHRyYW5mb3JtYXRpb24uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBVc2UgYW4gcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiBvbiBhbiBFbGVtZW50LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8RnVuY3Rpb259IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiBPUiBhbiBhY3R1YWwgZnVuY3Rpb24gdG8gYXBwbHkuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uczogQW55IHRyYW5zZm9ybWF0aW9uIG9wdGlvbnMuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRkbyhuYW1lLCBvcHRpb25zKSB7XG5cdFx0bGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgIC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZWZmZWN0cy5wdXNoKGN1cnJ5KGVmZmVjdExpc3RbbmFtZV0sIG9wdGlvbnMpKTtcblxuXHRcdGlmIChuYW1lID09ICdzdGljaycpIHtcblx0XHRcdG5ldyBTdGlja3kodGhpcy5lbGVtZW50LCB0cnVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBvblNjcm9sbCBIYW5kbGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRvblNjcm9sbCgpIHtcblx0XHRpZiAoIXRoaXMudGlja2luZykge1xuXHRcdFx0dGhpcy50aWNraW5nID0gdHJ1ZTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdH1cblx0fVxuXG4gIC8qKlxuICAgKiBvblJlc2l6ZSBIYW5kbGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRvblJlc2l6ZSgpIHtcblx0XHR0aGlzLmluaXRpYWxpemUoKTsgIC8vIG9yLi4gdXBkYXRlU2NlbmUuLj9cblx0XHQvLyB0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdHJhbnNmb3JtYXRpb24gb2YgZXZlcnkgZWxlbWVudC5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLmNhbGN1bGF0ZSgpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb24gb2YgZWFjaCBlbGVtZW50XG4gICAqIEBwYXJhbSAge09iamVjdH0gZGF0YTogQW4gT2JqZWN0IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24gYW5kIHRoZSBlbGVtZW50IHRvIHVkcGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGNhbGN1bGF0ZSgpIHtcblx0XHRsZXQgZGF0YSA9IHRoaXMuZGF0YTtcblx0XHRsZXQgc3RhcnQgPSB0aGlzLnN0YXJ0O1xuXHRcdGxldCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb247XG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBwcm9ncmVzcztcblxuXHRcdHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuXHRcdGlmIChwcm9ncmVzcyA8IDAgfHwgcHJvZ3Jlc3MgPiAxKSB7IHJldHVybjsgfVxuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHQvLyBpZiAoc3RhcnQgPCBzY3JvbGwgJiYgc2Nyb2xsID4gc3RhcnQgKyBkdXJhdGlvbikgeyByZXR1cm47IH1cblx0XHQvLyBwcm9ncmVzcyA9IChzY3JvbGwgLSBzdGFydCkgLyBkdXJhdGlvbjtcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdC8vIGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IHNjcm9sbCAtIHN0YXJ0O1xuXHRcdGRhdGEucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmRlYnVnLCBwcm9ncmVzcyk7XG5cdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHN0YXJ0ICAgICAgdG8gIGZyb20gIGVuZFxuXHRcdC8vIGxldCBlYXNpbmcgPSBlYXNlSW5PdXRRdWFkKGRhdGEuc3RhcnQsIDEwMCwgMCwgZGF0YS5zdGFydCtkYXRhLmR1cmF0aW9uKTtcblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0dGhpcy5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4geyBlZmZlY3QuY2FsbChkYXRhKSB9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBQdXQgQ2Fyb3VzZWwgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiIsIi8qXG4gKiBTdGlja3lcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvLi4uLj9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cbi8qZ2xvYmFsIGRvY3VtZW50IHJlcXVlc3RBbmltYXRpb25GcmFtZSBIVE1MRWxlbWVudCovXG5cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBiYXIgd2hpY2ggYXR0YWNoZXMgLyBkZXRhY2hlcyB0byB0b3Agb2Ygdmlld3BvcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0aWNreTogVGhlIGVsZW1lbnQgdG8gc3RpY2t5LWlmeVxuICogQHBhcmFtIHtCb29sZWFufSBib3VuZGVkOiBXaGV0aGVyIHRvIGFwcGx5IHN0aWNraW5lc3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFyZW50IGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0aWNreShzdGlja3ksIGJvdW5kZWQpIHtcbiAgc3RpY2t5ID0gc3RpY2t5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBzdGlja3kgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreSk7XG4gIGJvdW5kZWQgPSBib3VuZGVkIHx8IHN0aWNreS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYm91bmRlZCcpIHx8IGZhbHNlO1xuXG4gIGlmICghc3RpY2t5KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHZhciBwYXJlbnQgPSBzdGlja3kucGFyZW50Tm9kZSxcbiAgICBzdGlja3lQb3NpdGlvbixcbiAgICBwYXJlbnRQb3NpdGlvbixcbiAgICBjdXJyZW50U3RhdGUgPSAnXycsXG4gICAgc3RhdGVTd2l0Y2hlcixcbiAgICBkZXRlcm1pbmUgPSB7XG4gICAgICBub3JtYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA8IDEpIHsgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTsgfVxuICAgICAgfSxcbiAgICAgIHN0aWNreTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcmVudFBvc2l0aW9uID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAocGFyZW50UG9zaXRpb24udG9wID4gMSkgeyByZXR1cm4gc2V0U3RhdGUoJ25vcm1hbCcpOyB9XG4gICAgICAgIGlmICghYm91bmRlZCkgeyByZXR1cm47IH0gICAvLyBkb24ndCB3b3JyeSBhYm91dCBib3R0b20gZWRnZVxuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLmJvdHRvbSA8IHN0aWNreVBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiBzZXRTdGF0ZSgnYm90dG9tJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA+IDEpIHsgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTsgfVxuICAgICAgfVxuICAgIH07XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgICBzdGlja3kuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50U3RhdGUpO1xuICAgIHN0aWNreS5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcbiAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICBzdGF0ZVN3aXRjaGVyID0gZGV0ZXJtaW5lW3N0YXRlXTtcbiAgfVxuXG4gIHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIC8vc3RpY2t5IGluaXRpYWwgcG9zaXRpb25cbiAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA8IDEpIHtcbiAgICBzZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgc3RhdGVTd2l0Y2hlcigpOyAgICAvLyBlZGdlIGNhc2U6IGNoZWNrIGlmIGJvdHRvbSBvZiBzdGlja3kgY29sbGlkZXMgdy8gYm91bmRpbmcgY29udGFpbmVyXG4gIH0gZWxzZSB7XG4gICAgc2V0U3RhdGUoJ25vcm1hbCcpO1xuICB9XG5cblxuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGVTd2l0Y2hlcik7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTsgIC8vIHN0YXRlU3dpdGNoZXIgY2hhbmdlcywgc28gY2Fubm90IHBhc3MgKGllLiBiaW5kIGRpcmVjdGx5KSBoZXJlXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTtcbn1cblxuIl19
