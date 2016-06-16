(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

// TODO add weakmap support for public / private methods

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
		var classes = Object.keys(opts);
		var el = this.el;
		var percent = this.percent * 100;

		classes.forEach(function (css) {
			var when = parseInt(opts[css]);
			if (percent > when) {
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
	function Scrollify(element) {
		var _this = this;

		var scene = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Scrollify);

		var elements = element instanceof HTMLElement ? [element] : document.querySelectorAll(element);

		if (!elements.length || !transform) {
			return false;
		}

		this.ticking = false;
		this.scroll = window.scrollY;
		this.effects = [];
		this.elements = Array.from(elements).map(function (el) {
			return { el: el, percent: 0, absolute: 0 };
		});

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
  * @return {void}
  */


	_createClass(Scrollify, [{
		key: 'initialize',
		value: function initialize() {
			var _this2 = this;

			this.elements.map(function (data) {
				var BCR = data.el.getBoundingClientRect(); // TODO use offsetTop
				// let off = data.el;
				// let y = window.scrollY;
				// while (off) {
				// 	y += off.offsetTop;
				// 	off = off.offsetParent;
				// }

				data.initial = {
					top: BCR.top + window.scrollY,
					bottom: BCR.bottom + window.scrollY,
					height: BCR.height
				};

				_this2.calculate(data);
				return data;
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

	}, {
		key: 'scene',
		value: function scene(options) {
			return this;

			// scene:
			var start = void 0,
			    duration = void 0;
			if (duration && !start) {
				start = (end * window.innerHeight - duration) / window.innerHeight;
			}
			if (start && Array.isArray(start)) {
				BCR = document.querySelector(start[0]).getBoundingClientRect().top; // TODO use offsetTop
				start = start[1];
			}

			//
			data.start = start * window.innerHeight + BCR.top + window.scrollY;
			data.duration = duration ? duration : (stop - start) * window.innerHeight;
			//
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
   * @param  {String} name: The name of the transformation.
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
			// this.initialize();  or.. updateScene..?
			this.update();
		}

		/**
   * Update the transformation of every element.
   * @return {void}
   */

	}, {
		key: 'update',
		value: function update() {
			var _this3 = this;

			Array.from(this.elements, function (data) {
				return _this3.calculate(data);
			});
			this.ticking = false;
		}

		/**
   * Calculate the transformation of each element
   * @param  {Object} data: An Object containing position information and the element to udpate.
   * @return {void}
   */

	}, {
		key: 'calculate',
		value: function calculate(data) {
			var height = window.innerHeight;
			var start = data.initial.top - this.scroll;
			// let end = data.initial.bottom - this.scroll;
			var h = data.initial.height;
			// let percent;
			var progress = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (height < start || 0 > end) { return; }   // note: this wont work as the position of each element changes at different rates.

			if (height < data.el.getBoundingClientRect().top || 0 > data.el.getBoundingClientRect().bottom) {
				return;
			} // use *actual* position data

			// Calculate how far across the screen the element is. "1" is when the top edge of the element first peeks out
			// from the bottom of the viewport, and "0" is when the bottom edge disappears beyond the top of the viewport:
			// percent = Math.min(1, start / height);     // 1 --> 0
			// percent = (start+h) / (height+h);         // 1 --> 0
			progress = 1 - (start + h) / (height + h);

			// update data Object
			// data.percent = percent;
			data.absolute = height - start;
			data.progress = progress;

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

},{}],2:[function(require,module,exports){
'use strict';

var _scrollify = require('./scrollify.js');

var _scrollify2 = _interopRequireDefault(_scrollify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Scrollify = _scrollify2.default; /**
                                         * Put Carousel into the Global scope.
                                         * Useful for existing demos or if you wish to include manually
                                         */

},{"./scrollify.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaUJBLElBQUksWUFBWSxLQUFoQjtBQUNBLElBQU0sYUFBYSxDQUFDLFdBQUQsRUFBYyxpQkFBZCxFQUFpQyxjQUFqQyxFQUFpRCxZQUFqRCxFQUErRCxhQUEvRCxDQUFuQjtBQUNBLEtBQUssSUFBSSxDQUFULElBQWMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQTVDLEVBQXVEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0Q7Ozs7Ozs7QUFRRCxJQUFJLGFBQWE7Ozs7Ozs7O0FBT2hCLFNBUGdCLG9CQU9QLElBUE8sRUFPRDtBQUNkLE1BQUksU0FBUyxDQUFiOztBQUVBLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7O0FBQzdCLFlBQVMsS0FBSyxRQUFMLEdBQWdCLEtBQUssS0FBOUI7QUFDQSxHQUZELE1BRU87O0FBQ04sWUFBUyxLQUFLLFNBQUwsSUFBa0IsS0FBSyxLQUFMLElBQWMsQ0FBaEMsQ0FBVCxDO0FBQ0E7O0FBRUQsT0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsa0JBQWlCLE1BQWpCLEdBQXlCLEtBQXBEO0FBQ0EsRUFqQmU7Ozs7Ozs7O0FBd0JoQixPQXhCZ0Isa0JBd0JULElBeEJTLEVBd0JIO0FBQ1osTUFBSSxVQUFVLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBZDtBQUNBLE1BQUksS0FBSyxLQUFLLEVBQWQ7QUFDQSxNQUFJLFVBQVUsS0FBSyxPQUFMLEdBQWUsR0FBN0I7O0FBRUEsVUFBUSxPQUFSLENBQWdCLFVBQVMsR0FBVCxFQUFjO0FBQzdCLE9BQUksT0FBTyxT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QUFRLEtBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsS0FBSyxNQUFwQzs7QUFFQSxPQUFJLElBQUksS0FBSyxPQUFMLENBQWEsTUFBckI7O0FBRUEsT0FBSSxpQkFBSjs7Ozs7QUFLQSxPQUFJLFNBQVMsS0FBSyxFQUFMLENBQVEscUJBQVIsR0FBZ0MsR0FBekMsSUFBZ0QsSUFBSSxLQUFLLEVBQUwsQ0FBUSxxQkFBUixHQUFnQyxNQUF4RixFQUFnRztBQUFFO0FBQVMsSTs7Ozs7O0FBTTNHLGNBQVcsSUFBSyxDQUFDLFFBQU0sQ0FBUCxLQUFhLFNBQU8sQ0FBcEIsQ0FBaEI7Ozs7QUFLQSxRQUFLLFFBQUwsR0FBZ0IsU0FBUyxLQUF6QjtBQUNBLFFBQUssUUFBTCxHQUFnQixRQUFoQjs7Ozs7O0FBTUEsUUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFDLE1BQUQsRUFBWTtBQUFFLFdBQU8sSUFBUCxDQUFZLElBQVo7QUFBbUIsSUFBdEQ7QUFDQTs7Ozs7O2tCQTdLbUIsUzs7Ozs7QUNqSXJCOzs7Ozs7QUFDQSxPQUFPLFNBQVAsdUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cblxuLy8gVE9ETyBhZGQgd2Vha21hcCBzdXBwb3J0IGZvciBwdWJsaWMgLyBwcml2YXRlIG1ldGhvZHNcblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXG5cdC8qKlxuXHQgKiBQYXJhbGxheCBhbiBlbGVtZW50LlxuICAgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBZb3UgbWF5IGRlZmluZSBwYXJhbGxheCBcInNwZWVkXCIgb3IgcGFyYWxsYXggXCJyYW5nZVwiIChpbiBwaXhlbHMpLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0cGFyYWxsYXgob3B0cykge1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgLy8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHRcdG9mZnNldCA9IHRoaXMuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0XHRvZmZzZXQgPSB0aGlzLnByb2dyZXNzcyAqIChvcHRzLnJhbmdlIHx8IDApOyAgLy8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdFx0fVxuXG5cdFx0dGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gICAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFRoZSBcImNsYXNzXCIgdG8gdG9nZ2xlLCBhbmQgd2hlbiAoaWUuIGF0IHdoaWNoIHBvaW50IGluIHRoZSBwcm9ncmVzcylcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHRvZ2dsZShvcHRzKSB7XG5cdFx0bGV0IGNsYXNzZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0XHRsZXQgZWwgPSB0aGlzLmVsO1xuXHRcdGxldCBwZXJjZW50ID0gdGhpcy5wZXJjZW50ICogMTAwO1xuXG5cdFx0Y2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uKGNzcykge1xuXHRcdFx0bGV0IHdoZW4gPSBwYXJzZUludChvcHRzW2Nzc10pO1xuXHRcdFx0aWYgKHBlcmNlbnQgPiB3aGVuKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY3NzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvKipcblx0ICogUGluIGFuIGVsZW1lbnQgZm9yIGEgc3BlY2lmaWMgZHVyYXRpb25cblx0ICogLi4uIHdoaWxlIHRoaXMgd29ya3MsIGl0IGlzIHByZXR0eSB1Z2x5IGFuZCBjYW5kaWRhdGUgZm9yIGltcHJvdmVtZW50XG5cdCAqL1xuXHRcdC8vIHBpbihvcHRzKSB7XG5cdFx0Ly8gIGxldCB3YXlwb2ludHMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0XHQvLyAgbGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHQvLyAgd2F5cG9pbnRzLmZvckVhY2god2hlcmUgPT4ge1xuXHRcdC8vICAgIGlmIChwZXJjZW50IDwgcGFyc2VJbnQod2hlcmUpKSB7XG5cblx0XHQvLyAgICAgIGxldCBkaXN0YW5jZSA9IG9wdHNbd2hlcmVdO1xuXHRcdC8vICAgICAgbGV0IGFic29sdXRlID0gdGhpcy5hYnNvbHV0ZTtcblx0XHQvLyAgICAgIHZhciBjdXJyZW50O1xuXG5cdFx0Ly8gICAgICBpZiAodGhpcy5jdXJyZW50KSB7XG5cdFx0Ly8gICAgICAgIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQ7XG5cdFx0Ly8gICAgICB9IGVsc2Uge1xuXHRcdC8vICAgICAgICBjdXJyZW50ID0gYWJzb2x1dGU7XG5cdFx0Ly8gICAgICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XG5cdFx0Ly8gICAgICB9XG5cblx0XHQvLyAgICAgIGxldCBlbmQgPSBjdXJyZW50ICsgZGlzdGFuY2U7IC8vICh0aGlzIGFzc3VtZXMgY3VycmVudCB3aWxsIGJlIFwiZnJvemVuXCIgYW5kIHVuY2hhbmdlZCB3aGlsZSBwaW5uZWQpXG5cdFx0Ly8gICAgICBsZXQgb2Zmc2V0ID0gYWJzb2x1dGUgLSBjdXJyZW50O1xuXG5cdFx0Ly8gICAgICBpZiAoYWJzb2x1dGUgPCBlbmQpIHtcblx0XHQvLyAgICAgICAgdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHRcdC8vICAgICAgfVxuXHRcdC8vICAgIH0gZWxzZSB7XG5cdFx0Ly8gICAgICAvLyB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsIDApJztcblx0XHQvLyAgICB9XG5cdFx0Ly8gIH0pO1xuXHRcdC8vIH0sXG5cblx0LyoqXG5cdCAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuXHQgKi9cbiAgdHJhbnNsYXRlWChvcHRzKSB7XG4gICAgbGV0IG9mZnNldCA9IHRoaXMuYWJzb2x1dGU7XG4gICAgbGV0IG9uID0gT2JqZWN0LmtleXMob3B0cyk7XG4gICAgbGV0IGRlbGF5ID0gd2luZG93LmlubmVySGVpZ2h0O1x0Ly8gc3RhcnQgdHJhbnNsYXRpbmcgYWZ0ZXIgb25lIHdpbmRvdy1oZWlnaHQgb2Ygc2Nyb2xsaW5nXG5cbiAgICBvZmZzZXQgLT0gZGVsYXk7XG5cbiAgICAvLyBpZiAodGhpcy5wZXJjZW50IDwgMC41KSB7ICAgIC8vIHRlc3Q6IHN0YXJ0IHRyYW5zbGF0aW5nIHdoZW4gZWxlbWVudCBpcyBjZW50ZXJlZCBpbiB2aWV3cG9ydFxuICAgIC8vICAgb2Zmc2V0IC09IGRlbGF5O1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBvZmZzZXQgPSAwO1xuICAgIC8vIH1cblxuICAgIC8vICBlYXNlID0gZWFzZUluUXVhZChlbGFwc2VkLCAgICAgc3RhcnQsIGVuZCwgZHVyYXRpb24pO1xuICAgIGxldCBkaXN0YW5jZSA9IDUwMDtcbiAgICBsZXQgZWFzZSA9IGVhc2VJblF1YWQodGhpcy5wZXJjZW50ICogMTAwLCAwLCBkaXN0YW5jZSwgMTAwKTtcblxuICAgIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgZWFzZSArICdweCwgMCwgMCknO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCwgc2NlbmU9e30pIHtcblx0XHRsZXQgZWxlbWVudHMgPSAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSA/IFtlbGVtZW50XSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoKGVsKSA9PiAoeyBlbDogZWwsIHBlcmNlbnQ6IDAsIGFic29sdXRlOiAwIH0pKTtcblxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIFwiZGF0YVwiIE9iamVjdCBmb3IgZWFjaCBlbGVtZW50LCB3aGljaCBjb250YWlucyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhcyB3ZWxsXG5cdCAqIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gbm9kZS4gVGhlIGNhbGN1bGF0YXRpb24gbmVlZHMgdG8gYmUgbWFkZSBcImFzIGlmIGZyb20gYW4gaW5pdGlhbFxuXHQgKiBzY3JvbGwgcG9zaXRpb24gb2YgMFwiLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHR0aGlzLmVsZW1lbnRzLm1hcCgoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IEJDUiA9IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7ICAvLyBUT0RPIHVzZSBvZmZzZXRUb3Bcblx0XHRcdC8vIGxldCBvZmYgPSBkYXRhLmVsO1xuXHRcdFx0Ly8gbGV0IHkgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHRcdC8vIHdoaWxlIChvZmYpIHtcblx0XHRcdC8vIFx0eSArPSBvZmYub2Zmc2V0VG9wO1xuXHRcdFx0Ly8gXHRvZmYgPSBvZmYub2Zmc2V0UGFyZW50O1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHRkYXRhLmluaXRpYWwgPSB7XG5cdFx0XHRcdHRvcDogIEJDUi50b3AgKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0Ym90dG9tOiBCQ1IuYm90dG9tICsgd2luZG93LnNjcm9sbFksXG5cdFx0XHRcdGhlaWdodDogQkNSLmhlaWdodFxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5jYWxjdWxhdGUoZGF0YSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBwYXJhbXM6IGFueSBUV08gb2Y6IHN0YXJ0IC8gc3RvcCAvIGR1cmF0aW9uLlxuXHQgKiAgICAgICAgIHN0YXJ0OiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KSBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24gKGVnIFsnI3RvZ2dsZScsIDAuM10gKVxuXHQgKiAgICAgICAgIHN0b3A6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uXG5cdCAqICAgICAgICAgZHVyYXRpb246IHRoZSBkdXJhdGlvbiBpbiBwaXhlbHNcblx0ICpcblx0ICogICAgICAgICBkZWZhdWx0IGlzIDAgLSAxMDAlIChtYWtpbmcgZHVyYXRpb24gdGhlIHdpbmRvdyBoZWlnaHQgKyBlbGVtZW50IGhlaWdodClcblx0ICpcblx0ICogICAgICAgICBleGFtcGxlczpcblx0ICogICAgICAgICAgeyBzdGFydDogMCwgc3RvcDogMC41IH1cblx0ICogICAgICAgICAgeyBzdGFydDogMC4xLCBkdXJhdGlvbjogJzQwMHB4JyB9XG5cdCAqICAgICAgICAgIHsgZHVyYXRpb246IDEwMHB4LCBzdG9wOiAxLjAgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBzdG9wOiBbJyN0b2dnbGUnLCAwLjVdIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgZHVyYXRpb246ICczMDBweCcgfVxuXHQgKlxuXHQgKiAgICAgICAgIGVhc2luZy4uLj8gc3RhcnQsIHRvLCBmcm9tLCBkdXJhdGlvblxuXHQgKlxuXHQgKi9cblx0c2NlbmUob3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdC8vIHNjZW5lOlxuXHRcdFx0bGV0IHN0YXJ0LCBkdXJhdGlvbjtcblx0XHRcdGlmIChkdXJhdGlvbiAmJiAhc3RhcnQpIHsgc3RhcnQgPSAoZW5kICogd2luZG93LmlubmVySGVpZ2h0IC0gZHVyYXRpb24pIC8gd2luZG93LmlubmVySGVpZ2h0OyB9XG5cdFx0XHRpZiAoc3RhcnQgJiYgQXJyYXkuaXNBcnJheShzdGFydCkpIHtcblx0XHRcdFx0QkNSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFydFswXSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wOyAvLyBUT0RPIHVzZSBvZmZzZXRUb3Bcblx0XHRcdFx0c3RhcnQgPSBzdGFydFsxXVxuXHRcdFx0fVxuXG5cdFx0XHQvL1xuXHRcdFx0ZGF0YS5zdGFydCA9IChzdGFydCAqIHdpbmRvdy5pbm5lckhlaWdodCkgKyBCQ1IudG9wICsgd2luZG93LnNjcm9sbFk7XG5cdFx0XHRkYXRhLmR1cmF0aW9uID0gZHVyYXRpb24gPyBkdXJhdGlvbiA6IChzdG9wLXN0YXJ0KSAqIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdC8vXG5cdH1cblxuICAvKipcbiAgICogQWRkIGEgY3VzdG9tIGVmZmVjdCB0byBTY3JvbGxpZnkuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFkZC5cbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGVmZmVjdDogVGhlIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgdGhlIHRyYW5mb3JtYXRpb24uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBVc2UgYW4gcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiBvbiBhbiBFbGVtZW50LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGRvKG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICBmbi5jYWxsKHRoaXMsIG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5lZmZlY3RzLnB1c2goY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uUmVzaXplKCkge1xuXHRcdC8vIHRoaXMuaW5pdGlhbGl6ZSgpOyAgb3IuLiB1cGRhdGVTY2VuZS4uP1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbiBvZiBldmVyeSBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0dXBkYXRlKCkge1xuXHRcdEFycmF5LmZyb20odGhpcy5lbGVtZW50cywgKGRhdGEpID0+IHRoaXMuY2FsY3VsYXRlKGRhdGEpICk7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbiBvZiBlYWNoIGVsZW1lbnRcbiAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhOiBBbiBPYmplY3QgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhbmQgdGhlIGVsZW1lbnQgdG8gdWRwYXRlLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0Y2FsY3VsYXRlKGRhdGEpIHtcblx0XHRsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdGxldCBzdGFydCA9IGRhdGEuaW5pdGlhbC50b3AgLSB0aGlzLnNjcm9sbDtcblx0XHQvLyBsZXQgZW5kID0gZGF0YS5pbml0aWFsLmJvdHRvbSAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBoID0gZGF0YS5pbml0aWFsLmhlaWdodDtcblx0XHQvLyBsZXQgcGVyY2VudDtcblx0XHRsZXQgcHJvZ3Jlc3M7XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdC8vIGlmIChoZWlnaHQgPCBzdGFydCB8fCAwID4gZW5kKSB7IHJldHVybjsgfSAgIC8vIG5vdGU6IHRoaXMgd29udCB3b3JrIGFzIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGVsZW1lbnQgY2hhbmdlcyBhdCBkaWZmZXJlbnQgcmF0ZXMuXG5cblx0XHRpZiAoaGVpZ2h0IDwgZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgfHwgMCA+IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tKSB7IHJldHVybjsgfSAvLyB1c2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIGhvdyBmYXIgYWNyb3NzIHRoZSBzY3JlZW4gdGhlIGVsZW1lbnQgaXMuIFwiMVwiIGlzIHdoZW4gdGhlIHRvcCBlZGdlIG9mIHRoZSBlbGVtZW50IGZpcnN0IHBlZWtzIG91dFxuXHRcdC8vIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQsIGFuZCBcIjBcIiBpcyB3aGVuIHRoZSBib3R0b20gZWRnZSBkaXNhcHBlYXJzIGJleW9uZCB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydDpcblx0XHQvLyBwZXJjZW50ID0gTWF0aC5taW4oMSwgc3RhcnQgLyBoZWlnaHQpOyAgICAgLy8gMSAtLT4gMFxuXHRcdC8vIHBlcmNlbnQgPSAoc3RhcnQraCkgLyAoaGVpZ2h0K2gpOyAgICAgICAgIC8vIDEgLS0+IDBcblx0XHRwcm9ncmVzcyA9IDEgLSAoKHN0YXJ0K2gpIC8gKGhlaWdodCtoKSk7XG5cblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdC8vIGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IGhlaWdodCAtIHN0YXJ0O1xuXHRcdGRhdGEucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydCAgICAgIHRvICBmcm9tICBlbmRcblx0XHQvLyBsZXQgZWFzaW5nID0gZWFzZUluT3V0UXVhZChkYXRhLnN0YXJ0LCAxMDAsIDAsIGRhdGEuc3RhcnQrZGF0YS5kdXJhdGlvbik7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
