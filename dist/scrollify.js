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

// Math.easeInOutQuad = function (t, b, c, d) { t /= d/2; if (t < 1) { return c/2*t*t + b; } t--; return -c/2 * (t*(t-2) - 1) + b; };
// Math.easeOutCubic = function (t, b, c, d) { t /= d; t--; return c*(t*t*t + 1) + b; };

/**
 * A list of some default "transformations" that may be applied
 * NOTE: don't use arrow fn's here as they proxy "this"
 * @type {Object}
 */
var effectList = {

	/**
  * Parallax an element. Options include parallax speed OR parallax range
  */

	parallax: function parallax(opts) {
		var offset = 0;

		if (opts.speed !== undefined) {
			// check speed first
			offset = this.absolute * opts.speed;
		} else {
			// fallback to range
			offset = this.percent * (opts.range || 0); // default is "0", no effect
		}

		this.el.style[transform] = 'translate(0, ' + offset + 'px)';
	},


	/**
  * Pin an element for a specific duration
  * ... while this works, it is pretty ugly and candidate for improvement
  */
	// pin(opts) {
	// 	let waypoints = Object.keys(opts);
	// 	let percent = this.percent * 100;

	// 	waypoints.forEach(where => {
	// 		if (percent < parseInt(where)) {

	// 			let distance = opts[where];
	// 			let absolute = this.absolute;
	// 			var current;

	// 			if (this.current) {
	// 				current = this.current;
	// 			} else {
	// 				current = absolute;
	// 				this.current = current;
	// 			}

	// 			let end = current + distance;	// (this assumes current will be "frozen" and unchanged while pinned)
	// 			let offset = absolute - current;

	// 			if (absolute < end) {
	// 				this.el.style[transform] = 'translate(0, '+ offset +'px)';
	// 			}
	// 		} else {
	// 			// this.el.style[transform] = 'translate(0, 0)';
	// 		}
	// 	});
	// },

	/**
  * Toggle a class on or off
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
	}
};

/**
 * The Scrollify Class
 */

var Scrollify = function () {
	function Scrollify(element) {
		var _this = this;

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
				var BCR = data.el.getBoundingClientRect();

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
   *
   */

	}, {
		key: 'addEffect',
		value: function addEffect(name, effect) {
			effectList[name] = effect;
			return this;
		}

		/**
   *
   */

	}, {
		key: 'useEffect',
		value: function useEffect(name, options) {
			var curry = function curry(fn, options) {
				return function () {
					// NOTE: don't use => function here as we do NOT want to bind "this"
					fn.call(this, options);
				};
			};

			this.effects.push(curry(effectList[name], options));
			return this;
		}

		/**
   *
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
   *
   */

	}, {
		key: 'onResize',
		value: function onResize() {
			// this.initialize();
			this.update();
		}

		/**
   *
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
   *
   */

	}, {
		key: 'calculate',
		value: function calculate(data) {
			var height = window.innerHeight;
			var start = data.initial.top - this.scroll;
			var end = data.initial.bottom - this.scroll;
			var h = data.initial.height;
			var percent = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (height < start || 0 > end) { return; }		// note: this wont work as the position of each element changes at different rates.

			if (height < data.el.getBoundingClientRect().top || 0 > data.el.getBoundingClientRect().bottom) {
				return;
			} // use *actual* position data

			// Calculate how far across the screen the element is. "1" is when the top edge of the element first peeks out
			// from the bottom of the viewport, and "0" is when the bottom edge disappears beyond the top of the viewport:
			// percent = Math.min(1, start / height);			// 1 --> 0
			percent = (start + h) / (height + h); // 1 --> 0

			// update data Object
			data.percent = percent; // [TODO] should this be 0 -> 100 ...?
			data.absolute = height - start;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFoQjtBQUNBLElBQU0sYUFBYSxDQUFDLFdBQUQsRUFBYyxpQkFBZCxFQUFpQyxjQUFqQyxFQUFpRCxZQUFqRCxFQUErRCxhQUEvRCxDQUFuQjtBQUNBLEtBQUssSUFBSSxDQUFULElBQWMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQTVDLEVBQXVEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0Q7Ozs7Ozs7Ozs7QUFZRCxJQUFJLGFBQWE7Ozs7OztBQUtoQixTQUxnQixvQkFLUCxJQUxPLEVBS0Q7QUFDZCxNQUFJLFNBQVMsQ0FBYjs7QUFFQSxNQUFJLEtBQUssS0FBTCxLQUFlLFNBQW5CLEVBQThCOztBQUM1QixZQUFTLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQTlCO0FBQ0QsR0FGRCxNQUVPOztBQUNMLFlBQVMsS0FBSyxPQUFMLElBQWdCLEtBQUssS0FBTCxJQUFjLENBQTlCLENBQVQsQztBQUNEOztBQUVELE9BQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxTQUFkLElBQTJCLGtCQUFpQixNQUFqQixHQUF5QixLQUFwRDtBQUNBLEVBZmU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RGhCLE9BekRnQixrQkF5RFQsSUF6RFMsRUF5REg7QUFDWixNQUFJLFVBQVUsT0FBTyxJQUFQLENBQVksSUFBWixDQUFkO0FBQ0EsTUFBSSxLQUFLLEtBQUssRUFBZDtBQUNBLE1BQUksVUFBVSxLQUFLLE9BQUwsR0FBZSxHQUE3Qjs7QUFFQSxVQUFRLE9BQVIsQ0FBZ0IsVUFB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RUFBTTtBQUNmLE9BQUksU0FBUyxPQUFPLFdBQXBCO0FBQ0EsT0FBSSxRQUFRLEtBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsS0FBSyxNQUFwQztBQUNBLE9BQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLEtBQUssTUFBckM7QUFDQSxPQUFJLElBQUksS0FBSyxPQUFMLENBQWEsTUFBckI7QUFDQSxPQUFJLGdCQUFKOzs7OztBQUtBLE9BQUksU0FBUyxLQUFLLEVBQUwsQ0FBUSxxQkFBUixHQUFnQyxHQUF6QyxJQUFnRCxJQUFJLEtBQUssRUFBTCxDQUFRLHFCQUFSLEdBQWdDLE1BQXhGLEVBQWdHO0FBQUU7QUFBUyxJOzs7OztBQUszRyxhQUFVLENBQUMsUUFBTSxDQUFQLEtBQWEsU0FBTyxDQUFwQixDQUFWLEM7OztBQUdBLFFBQUssT0FBTCxHQUFlLE9BQWYsQztBQUNBLFFBQUssUUFBTCxHQUFnQixTQUFTLEtBQXpCOzs7QUFHQSxRQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWjtBQUFtQixJQUF0RDtBQUNBOzs7Ozs7a0JBakhtQixTOzs7OztBQzFHckI7Ozs7OztBQUNBLE9BQU8sU0FBUCx1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vLyBNYXRoLmVhc2VJbk91dFF1YWQgPSBmdW5jdGlvbiAodCwgYiwgYywgZCkgeyB0IC89IGQvMjsgaWYgKHQgPCAxKSB7IHJldHVybiBjLzIqdCp0ICsgYjsgfSB0LS07IHJldHVybiAtYy8yICogKHQqKHQtMikgLSAxKSArIGI7IH07XG4vLyBNYXRoLmVhc2VPdXRDdWJpYyA9IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7IHQgLz0gZDsgdC0tOyByZXR1cm4gYyoodCp0KnQgKyAxKSArIGI7IH07XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZWZmZWN0TGlzdCA9IHtcblxuXHQvKipcblx0ICogUGFyYWxsYXggYW4gZWxlbWVudC4gT3B0aW9ucyBpbmNsdWRlIHBhcmFsbGF4IHNwZWVkIE9SIHBhcmFsbGF4IHJhbmdlXG5cdCAqL1xuXHRwYXJhbGxheChvcHRzKSB7XG5cdFx0bGV0IG9mZnNldCA9IDA7XG5cblx0XHRpZiAob3B0cy5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHQgXHRvZmZzZXQgPSB0aGlzLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0XHR9IGVsc2Uge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdCBcdG9mZnNldCA9IHRoaXMucGVyY2VudCAqIChvcHRzLnJhbmdlIHx8IDApO1x0XHQvLyBkZWZhdWx0IGlzIFwiMFwiLCBubyBlZmZlY3Rcblx0XHR9XG5cblx0XHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdH0sXG5cblxuXHQvKipcblx0ICogUGluIGFuIGVsZW1lbnQgZm9yIGEgc3BlY2lmaWMgZHVyYXRpb25cblx0ICogLi4uIHdoaWxlIHRoaXMgd29ya3MsIGl0IGlzIHByZXR0eSB1Z2x5IGFuZCBjYW5kaWRhdGUgZm9yIGltcHJvdmVtZW50XG5cdCAqL1xuXHQvLyBwaW4ob3B0cykge1xuXHQvLyBcdGxldCB3YXlwb2ludHMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0Ly8gXHRsZXQgcGVyY2VudCA9IHRoaXMucGVyY2VudCAqIDEwMDtcblxuXHQvLyBcdHdheXBvaW50cy5mb3JFYWNoKHdoZXJlID0+IHtcblx0Ly8gXHRcdGlmIChwZXJjZW50IDwgcGFyc2VJbnQod2hlcmUpKSB7XG5cblx0Ly8gXHRcdFx0bGV0IGRpc3RhbmNlID0gb3B0c1t3aGVyZV07XG5cdC8vIFx0XHRcdGxldCBhYnNvbHV0ZSA9IHRoaXMuYWJzb2x1dGU7XG5cdC8vIFx0XHRcdHZhciBjdXJyZW50O1xuXG5cdC8vIFx0XHRcdGlmICh0aGlzLmN1cnJlbnQpIHtcblx0Ly8gXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50O1xuXHQvLyBcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdGN1cnJlbnQgPSBhYnNvbHV0ZTtcblx0Ly8gXHRcdFx0XHR0aGlzLmN1cnJlbnQgPSBjdXJyZW50O1xuXHQvLyBcdFx0XHR9XG5cblx0Ly8gXHRcdFx0bGV0IGVuZCA9IGN1cnJlbnQgKyBkaXN0YW5jZTtcdC8vICh0aGlzIGFzc3VtZXMgY3VycmVudCB3aWxsIGJlIFwiZnJvemVuXCIgYW5kIHVuY2hhbmdlZCB3aGlsZSBwaW5uZWQpXG5cdC8vIFx0XHRcdGxldCBvZmZzZXQgPSBhYnNvbHV0ZSAtIGN1cnJlbnQ7XG5cblx0Ly8gXHRcdFx0aWYgKGFic29sdXRlIDwgZW5kKSB7XG5cdC8vIFx0XHRcdFx0dGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHQvLyB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsIDApJztcblx0Ly8gXHRcdH1cblx0Ly8gXHR9KTtcblx0Ly8gfSxcblxuXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZlxuXHQgKi9cblx0dG9nZ2xlKG9wdHMpIHtcblx0XHRsZXQgY2xhc3NlcyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdGxldCBlbCA9IHRoaXMuZWw7XG5cdFx0bGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHRjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24oY3NzKSB7XG5cdFx0XHRsZXQgd2hlbiA9IHBhcnNlSW50KG9wdHNbY3NzXSk7XG5cdFx0XHRpZiAocGVyY2VudCA+IHdoZW4pIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdGxldCBlbGVtZW50cyA9IChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gW2VsZW1lbnRdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoKGVsKSA9PiAoeyBlbDogZWwsIHBlcmNlbnQ6IDAsIGFic29sdXRlOiAwIH0pKTtcblxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIFwiZGF0YVwiIE9iamVjdCBmb3IgZWFjaCBlbGVtZW50LCB3aGljaCBjb250YWlucyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhcyB3ZWxsXG5cdCAqIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gbm9kZS4gVGhlIGNhbGN1bGF0YXRpb24gbmVlZHMgdG8gYmUgbWFkZSBcImFzIGlmIGZyb20gYW4gaW5pdGlhbFxuXHQgKiBzY3JvbGwgcG9zaXRpb24gb2YgMFwiLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHR0aGlzLmVsZW1lbnRzLm1hcCgoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IEJDUiA9IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdGRhdGEuaW5pdGlhbCA9IHtcblx0XHRcdFx0dG9wOiAgQkNSLnRvcCArIHdpbmRvdy5zY3JvbGxZLFxuXHRcdFx0XHRib3R0b206IEJDUi5ib3R0b20gKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0aGVpZ2h0OiBCQ1IuaGVpZ2h0XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmNhbGN1bGF0ZShkYXRhKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuICB9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXNlRWZmZWN0KG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcdFx0XHRcdC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaCggY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdC8vIHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMsIChkYXRhKSA9PiB0aGlzLmNhbGN1bGF0ZShkYXRhKSApO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjYWxjdWxhdGUoZGF0YSkge1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5pbml0aWFsLnRvcCAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBlbmQgPSBkYXRhLmluaXRpYWwuYm90dG9tIC0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IGggPSBkYXRhLmluaXRpYWwuaGVpZ2h0O1xuXHRcdGxldCBwZXJjZW50O1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHQvLyBpZiAoaGVpZ2h0IDwgc3RhcnQgfHwgMCA+IGVuZCkgeyByZXR1cm47IH1cdFx0Ly8gbm90ZTogdGhpcyB3b250IHdvcmsgYXMgdGhlIHBvc2l0aW9uIG9mIGVhY2ggZWxlbWVudCBjaGFuZ2VzIGF0IGRpZmZlcmVudCByYXRlcy5cblxuXHRcdGlmIChoZWlnaHQgPCBkYXRhLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCB8fCAwID4gZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pIHsgcmV0dXJuOyB9XHQvLyB1c2UgKmFjdHVhbCogcG9zaXRpb24gZGF0YVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIGhvdyBmYXIgYWNyb3NzIHRoZSBzY3JlZW4gdGhlIGVsZW1lbnQgaXMuIFwiMVwiIGlzIHdoZW4gdGhlIHRvcCBlZGdlIG9mIHRoZSBlbGVtZW50IGZpcnN0IHBlZWtzIG91dFxuXHRcdC8vIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQsIGFuZCBcIjBcIiBpcyB3aGVuIHRoZSBib3R0b20gZWRnZSBkaXNhcHBlYXJzIGJleW9uZCB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydDpcblx0XHQvLyBwZXJjZW50ID0gTWF0aC5taW4oMSwgc3RhcnQgLyBoZWlnaHQpO1x0XHRcdC8vIDEgLS0+IDBcblx0XHRwZXJjZW50ID0gKHN0YXJ0K2gpIC8gKGhlaWdodCtoKTtcdFx0XHRcdFx0Ly8gMSAtLT4gMFxuXG5cdFx0Ly8gdXBkYXRlIGRhdGEgT2JqZWN0XG5cdFx0ZGF0YS5wZXJjZW50ID0gcGVyY2VudDtcdFx0XHRcdFx0XHQvLyBbVE9ET10gc2hvdWxkIHRoaXMgYmUgMCAtPiAxMDAgLi4uP1xuXHRcdGRhdGEuYWJzb2x1dGUgPSBoZWlnaHQgLSBzdGFydDtcblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0dGhpcy5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4geyBlZmZlY3QuY2FsbChkYXRhKSB9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBQdXQgQ2Fyb3VzZWwgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiJdfQ==
