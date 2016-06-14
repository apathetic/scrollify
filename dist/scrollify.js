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
	pin: function pin(opts) {
		var _this = this;

		var waypoints = Object.keys(opts);
		var percent = this.percent * 100;

		waypoints.forEach(function (where) {
			if (percent < parseInt(where)) {

				var distance = opts[where];
				var absolute = _this.absolute;
				var current;

				if (_this.current) {
					current = _this.current;
				} else {
					current = absolute;
					_this.current = current;
				}

				var end = current + distance; // (this assumes current will be "frozen" and unchanged while pinned)
				var offset = absolute - current;

				if (absolute < end) {
					_this.el.style[transform] = 'translate(0, ' + offset + 'px)';
				}
			} else {
				// this.el.style[transform] = 'translate(0, 0)';
			}
		});
	},

	// initial
	// percent
	// absolute

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
		var _this2 = this;

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

		console.log(this.elements);

		this.initialize();

		window.addEventListener('scroll', function (e) {
			return _this2.onScroll(e);
		});
		window.addEventListener('resize', function (e) {
			return _this2.onResize(e);
		});
	}

	/**
  * Create a "data" Object for each element, containing position information as well
  * as a reference to the DOM node. The calculate needs to be made "as if from an initial
  * scroll position of 0".
  * @return {void}
  */


	_createClass(Scrollify, [{
		key: 'initialize',
		value: function initialize() {
			var _this3 = this;

			console.log(this.elements);
			this.elements.map(function (data) {
				var BCR = data.el.getBoundingClientRect();

				data.initial = {
					top: BCR.top + window.scrollY,
					bottom: BCR.bottom + window.scrollY,
					height: BCR.height
				};

				_this3.calculate(data);

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
			// TODO may have to also recalculate each elements' new dimensions, if changed
			// this.update();
			this.initialize();
		}

		/**
   *
   */

	}, {
		key: 'update',
		value: function update() {
			var _this4 = this;

			Array.from(this.elements, function (data) {
				return _this4.calculate(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFoQjtBQUNBLElBQU0sYUFBYSxDQUFDLFdBQUQsRUFBYyxpQkFBZCxFQUFpQyxjQUFqQyxFQUFpRCxZQUFqRCxFQUErRCxhQUEvRCxDQUFuQjtBQUNBLEtBQUssSUFBSSxDQUFULElBQWMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQTVDLEVBQXVEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0Q7Ozs7Ozs7Ozs7QUFZRCxJQUFJLGFBQWE7Ozs7OztBQUtoQixTQUxnQixvQkFLUCxJQUxPLEVBS0Q7QUFDZCxNQUFJLFNBQVMsQ0FBYjs7QUFFQSxNQUFJLEtBQUssS0FBTCxLQUFlLFNBQW5CLEVBQThCOztBQUM1QixZQUFTLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQTlCO0FBQ0QsR0FGRCxNQUVPOztBQUNMLFlBQVMsS0FBSyxPQUFMLElBQWdCLEtBQUssS0FBTCxJQUFjLENBQTlCLENBQVQsQztBQUNEOztBQUVELE9BQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxTQUFkLElBQTJCLGtCQUFpQixNQUFqQixHQUF5QixLQUFwRDtBQUNBLEVBZmU7Ozs7Ozs7QUFzQmhCLElBdEJnQixlQXNCWixJQXRCWSxFQXNCTjtBQUFBOztBQUNULE1BQUksWUFBWSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQWhCO0FBQ0EsTUFBSSxVQUFVLEtBQUssT0FBTCxHQUFlLEdBQTdCOztBQUVBLFlBQVUsT0FBVixDQUFrQixpQkFBUztBQUMxQixPQUFJLFVBQVUsU0FBUyxLQUFULENBQWQsRUFBK0I7O0FBRTlCLFFBQUks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STs7Ozs7QUFLM0csYUFBVSxDQUFDLFFBQU0sQ0FBUCxLQUFhLFNBQU8sQ0FBcEIsQ0FBVixDOzs7QUFHQSxRQUFLLE9BQUwsR0FBZSxPQUFmLEM7QUFDQSxRQUFLLFFBQUwsR0FBZ0IsU0FBUyxLQUF6Qjs7O0FBR0EsUUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFDLE1BQUQsRUFBWTtBQUFFLFdBQU8sSUFBUCxDQUFZLElBQVo7QUFBbUIsSUFBdEQ7QUFDQTs7Ozs7O2tCQXRIbUIsUzs7Ozs7QUM1R3JCOzs7Ozs7QUFDQSxPQUFPLFNBQVAsdUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIHNjcm9sbGlmeVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FwYXRoZXRpYy9zY3JvbGxpZnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cblxuLy8gTWF0aC5lYXNlSW5PdXRRdWFkID0gZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHsgdCAvPSBkLzI7IGlmICh0IDwgMSkgeyByZXR1cm4gYy8yKnQqdCArIGI7IH0gdC0tOyByZXR1cm4gLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiOyB9O1xuLy8gTWF0aC5lYXNlT3V0Q3ViaWMgPSBmdW5jdGlvbiAodCwgYiwgYywgZCkgeyB0IC89IGQ7IHQtLTsgcmV0dXJuIGMqKHQqdCp0ICsgMSkgKyBiOyB9O1xuXG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcInRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIE5PVEU6IGRvbid0IHVzZSBhcnJvdyBmbidzIGhlcmUgYXMgdGhleSBwcm94eSBcInRoaXNcIlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGVmZmVjdExpc3QgPSB7XG5cblx0LyoqXG5cdCAqIFBhcmFsbGF4IGFuIGVsZW1lbnQuIE9wdGlvbnMgaW5jbHVkZSBwYXJhbGxheCBzcGVlZCBPUiBwYXJhbGxheCByYW5nZVxuXHQgKi9cblx0cGFyYWxsYXgob3B0cykge1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQgIT09IHVuZGVmaW5lZCkge1x0XHRcdFx0XHRcdFx0XHRcdC8vIGNoZWNrIHNwZWVkIGZpcnN0XG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZSAqIG9wdHMuc3BlZWQ7XG5cdFx0fSBlbHNlIHtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZmFsbGJhY2sgdG8gcmFuZ2Vcblx0XHQgXHRvZmZzZXQgPSB0aGlzLnBlcmNlbnQgKiAob3B0cy5yYW5nZSB8fCAwKTtcdFx0Ly8gZGVmYXVsdCBpcyBcIjBcIiwgbm8gZWZmZWN0XG5cdFx0fVxuXG5cdFx0dGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHR9LFxuXG5cblx0LyoqXG5cdCAqIFBpbiBhbiBlbGVtZW50IGZvciBhIHNwZWNpZmljIGR1cmF0aW9uXG5cdCAqIC4uLiB3aGlsZSB0aGlzIHdvcmtzLCBpdCBpcyBwcmV0dHkgdWdseSBhbmQgY2FuZGlkYXRlIGZvciBpbXByb3ZlbWVudFxuXHQgKi9cblx0cGluKG9wdHMpIHtcblx0XHRsZXQgd2F5cG9pbnRzID0gT2JqZWN0LmtleXMob3B0cyk7XG5cdFx0bGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHR3YXlwb2ludHMuZm9yRWFjaCh3aGVyZSA9PiB7XG5cdFx0XHRpZiAocGVyY2VudCA8IHBhcnNlSW50KHdoZXJlKSkge1xuXG5cdFx0XHRcdGxldCBkaXN0YW5jZSA9IG9wdHNbd2hlcmVdO1xuXHRcdFx0XHRsZXQgYWJzb2x1dGUgPSB0aGlzLmFic29sdXRlO1xuXHRcdFx0XHR2YXIgY3VycmVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5jdXJyZW50KSB7XG5cdFx0XHRcdFx0Y3VycmVudCA9IHRoaXMuY3VycmVudDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdXJyZW50ID0gYWJzb2x1dGU7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50ID0gY3VycmVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBlbmQgPSBjdXJyZW50ICsgZGlzdGFuY2U7XHQvLyAodGhpcyBhc3N1bWVzIGN1cnJlbnQgd2lsbCBiZSBcImZyb3plblwiIGFuZCB1bmNoYW5nZWQgd2hpbGUgcGlubmVkKVxuXHRcdFx0XHRsZXQgb2Zmc2V0ID0gYWJzb2x1dGUgLSBjdXJyZW50O1xuXG5cdFx0XHRcdGlmIChhYnNvbHV0ZSA8IGVuZCkge1xuXHRcdFx0XHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG4gIC8vIGluaXRpYWxcbiAgLy8gcGVyY2VudFxuICAvLyBhYnNvbHV0ZVxuXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZlxuXHQgKi9cblx0dG9nZ2xlKG9wdHMpIHtcblx0XHRsZXQgY2xhc3NlcyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdGxldCBlbCA9IHRoaXMuZWw7XG5cdFx0bGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHRjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24oY3NzKSB7XG5cdFx0XHRsZXQgd2hlbiA9IHBhcnNlSW50KG9wdHNbY3NzXSk7XG5cdFx0XHRpZiAocGVyY2VudCA+IHdoZW4pIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdGxldCBlbGVtZW50cyA9IChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gW2VsZW1lbnRdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoKGVsKSA9PiAoeyBlbDogZWwsIHBlcmNlbnQ6IDAsIGFic29sdXRlOiAwIH0pKTtcblxuXHRcdGNvbnNvbGUubG9nKHRoaXMuZWxlbWVudHMpO1xuXG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgXCJkYXRhXCIgT2JqZWN0IGZvciBlYWNoIGVsZW1lbnQsIGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbFxuXHQgKiBhcyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIG5vZGUuIFRoZSBjYWxjdWxhdGUgbmVlZHMgdG8gYmUgbWFkZSBcImFzIGlmIGZyb20gYW4gaW5pdGlhbFxuXHQgKiBzY3JvbGwgcG9zaXRpb24gb2YgMFwiLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRzKTtcblx0XHR0aGlzLmVsZW1lbnRzLm1hcCgoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IEJDUiA9IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdGRhdGEuaW5pdGlhbCA9IHtcblx0XHRcdFx0dG9wOiAgQkNSLnRvcCArIHdpbmRvdy5zY3JvbGxZLFxuXHRcdFx0XHRib3R0b206IEJDUi5ib3R0b20gKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0aGVpZ2h0OiBCQ1IuaGVpZ2h0XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmNhbGN1bGF0ZShkYXRhKTtcblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG4gIH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGFkZEVmZmVjdChuYW1lLCBlZmZlY3QpIHtcblx0XHRlZmZlY3RMaXN0W25hbWVdID0gZWZmZWN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHR1c2VFZmZlY3QobmFtZSwgb3B0aW9ucykge1xuXHRcdGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1x0XHRcdFx0Ly8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuXHRcdFx0XHRmbi5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZWZmZWN0cy5wdXNoKCBjdXJyeShlZmZlY3RMaXN0W25hbWVdLCBvcHRpb25zKSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRvblNjcm9sbCgpIHtcblx0XHRpZiAoIXRoaXMudGlja2luZykge1xuXHRcdFx0dGhpcy50aWNraW5nID0gdHJ1ZTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0Ly8gVE9ETyBtYXkgaGF2ZSB0byBhbHNvIHJlY2FsY3VsYXRlIGVhY2ggZWxlbWVudHMnIG5ldyBkaW1lbnNpb25zLCBpZiBjaGFuZ2VkXG5cdFx0Ly8gdGhpcy51cGRhdGUoKTtcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdEFycmF5LmZyb20odGhpcy5lbGVtZW50cywgKGRhdGEpID0+IHRoaXMuY2FsY3VsYXRlKGRhdGEpICk7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNhbGN1bGF0ZShkYXRhKSB7XG5cdFx0bGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRsZXQgc3RhcnQgPSBkYXRhLmluaXRpYWwudG9wIC0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IGVuZCA9IGRhdGEuaW5pdGlhbC5ib3R0b20gLSB0aGlzLnNjcm9sbDtcblx0XHRsZXQgaCA9IGRhdGEuaW5pdGlhbC5oZWlnaHQ7XG5cdFx0bGV0IHBlcmNlbnQ7XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdC8vIGlmIChoZWlnaHQgPCBzdGFydCB8fCAwID4gZW5kKSB7IHJldHVybjsgfVx0XHQvLyBub3RlOiB0aGlzIHdvbnQgd29yayBhcyB0aGUgcG9zaXRpb24gb2YgZWFjaCBlbGVtZW50IGNoYW5nZXMgYXQgZGlmZmVyZW50IHJhdGVzLlxuXG5cdFx0aWYgKGhlaWdodCA8IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIHx8IDAgPiBkYXRhLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSkgeyByZXR1cm47IH1cdC8vIHVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhXG5cblx0XHQvLyBDYWxjdWxhdGUgaG93IGZhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGUgZWxlbWVudCBpcy4gXCIxXCIgaXMgd2hlbiB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGVsZW1lbnQgZmlyc3QgcGVla3Mgb3V0XG5cdFx0Ly8gZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCwgYW5kIFwiMFwiIGlzIHdoZW4gdGhlIGJvdHRvbSBlZGdlIGRpc2FwcGVhcnMgYmV5b25kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0OlxuXHRcdC8vIHBlcmNlbnQgPSBNYXRoLm1pbigxLCBzdGFydCAvIGhlaWdodCk7XHRcdFx0Ly8gMSAtLT4gMFxuXHRcdHBlcmNlbnQgPSAoc3RhcnQraCkgLyAoaGVpZ2h0K2gpO1x0XHRcdFx0XHQvLyAxIC0tPiAwXG5cblx0XHQvLyB1cGRhdGUgZGF0YSBPYmplY3Rcblx0XHRkYXRhLnBlcmNlbnQgPSBwZXJjZW50O1x0XHRcdFx0XHRcdC8vIFtUT0RPXSBzaG91bGQgdGhpcyBiZSAwIC0+IDEwMCAuLi4/XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IGhlaWdodCAtIHN0YXJ0O1xuXG5cdFx0Ly8gY3ljbGUgdGhyb3VnaCBhbnkgcmVnaXN0ZXJlZCB0cmFuc2Zvcm1hdGlvbnNcblx0XHR0aGlzLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7IGVmZmVjdC5jYWxsKGRhdGEpIH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIFB1dCBDYXJvdXNlbCBpbnRvIHRoZSBHbG9iYWwgc2NvcGUuXG4gKiBVc2VmdWwgZm9yIGV4aXN0aW5nIGRlbW9zIG9yIGlmIHlvdSB3aXNoIHRvIGluY2x1ZGUgbWFudWFsbHlcbiAqL1xuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG53aW5kb3cuU2Nyb2xsaWZ5ID0gc2Nyb2xsaWZ5O1xuIl19
