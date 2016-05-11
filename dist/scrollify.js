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

		this.ticking = false;
		this.scroll = window.scrollY;
		this.effects = [];
		this.elements = [];

		var elements = element instanceof HTMLElement ? [element] : document.querySelectorAll(element);

		if (!elements.length || !transform) {
			return false;
		}

		// create a "data" Object for each element, containing position information and a reference to the DOM node
		Array.from(elements, function (el) {

			// ***** NOTE: this calculation needs to be made "as if from an initial scroll position of 0"
			// let BCR = el.getBoundingClientRect();
			// BCR.top -= window.scrollY;
			// BCR.bottom -= window.scrollY;
			// let BCR = Object.assign({}, temp);

			// probably a better way to do this...
			var BCR = el.getBoundingClientRect();
			var initial = {
				top: BCR.top + window.scrollY,
				bottom: BCR.bottom + window.scrollY,
				height: BCR.height
			};

			// el['transform'] = transform;		// create a consistent ref, here? somehow but not like this exactly

			var data = {
				el: el,
				initial: initial,
				percent: 0, // a value from 1 to 0, starting when the element first appears at the bottom until it disappears at the top
				absolute: 0 // the absolute number of pixels the element has travelled since coming into view
			};

			_this.elements.push(data);
			_this.calculate(data, true); // set initial details
		});

		window.addEventListener('scroll', function (e) {
			return _this.onScroll(e);
		});
		window.addEventListener('resize', function (e) {
			return _this.onResize(e);
		});
	}

	/**
  *
  */


	_createClass(Scrollify, [{
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
			this.height = window.innerHeight;
			this.update();
		}

		/**
   *
   */

	}, {
		key: 'update',
		value: function update() {
			var _this2 = this;

			Array.from(this.elements, function (data) {
				return _this2.calculate(data);
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
			if (height < start || 0 > end) {
				return;
			}

			// Calculate how far across the screen the element is. "1" is when the top edge of the element first peeks out
			// from the bottom of the viewport, and "0" is when the bottom edge disappears beyond the top of the viewport:
			// percent = Math.min(1, start / height);			// 1 --> 0
			percent = (start + h) / (height + h); // 1 --> 0

			// update data Object
			data.percent = percent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQWI7QUFDTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDekIsS0FBSyxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUN0RCxjQUFZLFdBQVcsQ0FBWCxDQUFaLENBRHNEO0FBRXRELFFBRnNEO0VBQXZEO0NBREQ7Ozs7OztBQVlBLElBQUksYUFBYTs7Ozs7Ozs7O0FBUWhCLDZCQUFTLE1BQU07QUFDZCxNQUFJLFNBQVMsQ0FBVCxDQURVOztBQUdkLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDNUIsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBREc7R0FBOUIsTUFFTzs7QUFDTCxZQUFTLEtBQUssT0FBTCxJQUFnQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWhCO0FBREosR0FGUDs7QUFNQSxPQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsU0FBZCxJQUEyQixrQkFBaUIsTUFBakIsR0FBeUIsS0FBekIsQ0FUYjtFQVJDOzs7O0FBcUJoQixtQkFBSSxVQUFVLEVBckJFOzs7O0FBMEJoQiwyQkFBUSxNQUFNO0FBQ2IsTUFBSSxVQUFVLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBVixDQURTO0FBRWIsTUFBSSxLQUFLLEtBQUssRUFBTCxDQUZJO0FBR2IsTUFBSSxVQUFVLEtBQUssT0FBTCxHQUFlLEdBQWY7Ozs7O0FBSEQsU0FRYixDQUFRLE9BQVIsQ0FBZ0IsVUFB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Q1IsU0FBTSxJQUFOLENBQVcsS0FBSyxRQUFMLEVBQWUsVUFBQyxJQUFEO1dBQVUsT0FBSyxTQUFMLENBQWUsSUFBZjtJQUFWLENBQTFCLENBRFE7QUFFUixRQUFLLE9BQUwsR0FBZSxLQUFmLENBRlE7Ozs7Ozs7Ozs0QkFRQyxNQUFNO0FBQ2YsT0FBSSxTQUFTLE9BQU8sV0FBUCxDQURFO0FBRWYsT0FBSSxRQUFRLEtBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsS0FBSyxNQUFMLENBRmhCO0FBR2YsT0FBSSxNQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsS0FBSyxNQUFMLENBSGpCO0FBSWYsT0FBSSxJQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FKTztBQUtmLE9BQUksZ0JBQUo7OztBQUxlLE9BUVgsU0FBUyxLQUFULElBQWtCLElBQUksR0FBSixFQUFTO0FBQUUsV0FBRjtJQUEvQjs7Ozs7QUFSZSxVQWFmLEdBQVUsQ0FBQyxRQUFNLENBQU4sQ0FBRCxJQUFhLFNBQU8sQ0FBUCxDQUFiOzs7QUFiSyxPQWdCZixDQUFLLE9BQUwsR0FBZSxPQUFmLENBaEJlO0FBaUJmLFFBQUssUUFBTCxHQUFnQixTQUFTLEtBQVQ7OztBQWpCRCxPQW9CZixDQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWixFQUFGO0lBQVosQ0FBckIsQ0FwQmU7Ozs7UUFsR0k7Ozs7Ozs7O0FDekVyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdGlmICggZG9jdW1lbnQuYm9keS5zdHlsZVt0cmFuc2Zvcm1zW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblx0XHRicmVhaztcblx0fVxufVxuXG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcIkVmZmVjdHNcIiBvciBcIlRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXHQvKipcblx0ICogc3BlZWQsIHJhbmdlXG5cdCAqIE5PVEU6IHNob3VsZCBvbmx5IHVzZSBzcGVlZCBPUiByYW5nZSwgbm90IGJvdGhcblx0ICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG5cdCAqL1xuXHQgLy8gVE9ETzogaWYgZWxlbWVudCAqYmVnaW5zKiBvbnNjcmVlbiwgdGhlIHBhcmFsbGF4IGFsZ29yaXRobSB3aWxsIG5lZWRcblx0IC8vIHRvIFwic2V0dGxlXCIgaWUuIGZpbmQgdGhlIGxpbWl0IGFzIGJvdW5kaW5nIHJlY3RzIGNvbnZlcmdlXG5cdHBhcmFsbGF4KG9wdHMpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcdFx0XHRcdFx0XHRcdFx0XHQvLyBjaGVjayBzcGVlZCBmaXJzdFxuXHRcdCBcdG9mZnNldCA9IHRoaXMuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5wZXJjZW50ICogKG9wdHMucmFuZ2UgfHwgMCk7XHRcdC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0fSxcblxuXHQvLyBzdGFydCBwb3MsIGR1cmF0aW9uc1xuXHRwaW4ocG9zaXRpb24pIHtcblxuXHR9LFxuXG5cdC8vIHRyaWdnZXIsIGNsYXNzbmFtZVxuXHR0cmlnZ2VyKG9wdHMpIHtcblx0XHRsZXQgY2xhc3NlcyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdGxldCBlbCA9IHRoaXMuZWw7XG5cdFx0bGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHQvLyB2YXIgY3NzID0gY2xhc3Nlc1swXTtcdFx0Ly8ganVzdCB0YWtpbmcgMXN0IGFyYml0cmFyaWx5IGZvciBub3dcblx0XHQvLyB2YXIgd2hlbiA9IHBhcnNlSW50KG9wdHNbY3NzXSk7XG5cblx0XHRjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24oY3NzKSB7XG5cdFx0XHRsZXQgd2hlbiA9IHBhcnNlSW50KG9wdHNbY3NzXSk7XG5cdFx0XHRpZiAocGVyY2VudCA+IHdoZW4pIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5lZmZlY3RzID0gW107XG5cdFx0dGhpcy5lbGVtZW50cyA9IFtdO1xuXG5cdFx0Y29uc3QgZWxlbWVudHMgPSAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSA/IFtlbGVtZW50XSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyBjcmVhdGUgYSBcImRhdGFcIiBPYmplY3QgZm9yIGVhY2ggZWxlbWVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhbmQgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBub2RlXG5cdFx0QXJyYXkuZnJvbShlbGVtZW50cywgKGVsKSA9PiB7XG5cblx0XHRcdC8vICoqKioqIE5PVEU6IHRoaXMgY2FsY3VsYXRpb24gbmVlZHMgdG8gYmUgbWFkZSBcImFzIGlmIGZyb20gYW4gaW5pdGlhbCBzY3JvbGwgcG9zaXRpb24gb2YgMFwiXG5cdFx0XHQvLyBsZXQgQkNSID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHQvLyBCQ1IudG9wIC09IHdpbmRvdy5zY3JvbGxZO1xuXHRcdFx0Ly8gQkNSLmJvdHRvbSAtPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHRcdC8vIGxldCBCQ1IgPSBPYmplY3QuYXNzaWduKHt9LCB0ZW1wKTtcblxuXHRcdFx0Ly8gcHJvYmFibHkgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuLi5cblx0XHRcdGxldCBCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGxldCBpbml0aWFsID0ge1xuXHRcdFx0XHR0b3A6ICBCQ1IudG9wICsgd2luZG93LnNjcm9sbFksXG5cdFx0XHRcdGJvdHRvbTogQkNSLmJvdHRvbSArIHdpbmRvdy5zY3JvbGxZLFxuXHRcdFx0XHRoZWlnaHQ6IEJDUi5oZWlnaHRcblx0XHRcdH07XG5cblx0XHRcdC8vIGVsWyd0cmFuc2Zvcm0nXSA9IHRyYW5zZm9ybTtcdFx0Ly8gY3JlYXRlIGEgY29uc2lzdGVudCByZWYsIGhlcmU/IHNvbWVob3cgYnV0IG5vdCBsaWtlIHRoaXMgZXhhY3RseVxuXG5cdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0ZWw6IGVsLFxuXHRcdFx0XHRpbml0aWFsOiBpbml0aWFsLFxuXHRcdFx0XHRwZXJjZW50OiAwLFx0XHRcdFx0XHRcdFx0XHRcdC8vIGEgdmFsdWUgZnJvbSAxIHRvIDAsIHN0YXJ0aW5nIHdoZW4gdGhlIGVsZW1lbnQgZmlyc3QgYXBwZWFycyBhdCB0aGUgYm90dG9tIHVudGlsIGl0IGRpc2FwcGVhcnMgYXQgdGhlIHRvcFxuXHRcdFx0XHRhYnNvbHV0ZTogMFx0XHRcdFx0XHRcdFx0XHRcdC8vIHRoZSBhYnNvbHV0ZSBudW1iZXIgb2YgcGl4ZWxzIHRoZSBlbGVtZW50IGhhcyB0cmF2ZWxsZWQgc2luY2UgY29taW5nIGludG8gdmlld1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmVsZW1lbnRzLnB1c2goZGF0YSk7XG5cdFx0XHR0aGlzLmNhbGN1bGF0ZShkYXRhLCB0cnVlKTtcdFx0Ly8gc2V0IGluaXRpYWwgZGV0YWlsc1xuXHRcdH0pO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXNlRWZmZWN0KG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcdFx0XHRcdC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaCggY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMsIChkYXRhKSA9PiB0aGlzLmNhbGN1bGF0ZShkYXRhKSApO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjYWxjdWxhdGUoZGF0YSkge1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5pbml0aWFsLnRvcCAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBlbmQgPSBkYXRhLmluaXRpYWwuYm90dG9tIC0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IGggPSBkYXRhLmluaXRpYWwuaGVpZ2h0O1xuXHRcdGxldCBwZXJjZW50O1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHRpZiAoaGVpZ2h0IDwgc3RhcnQgfHwgMCA+IGVuZCkgeyByZXR1cm47IH1cblxuXHRcdC8vIENhbGN1bGF0ZSBob3cgZmFyIGFjcm9zcyB0aGUgc2NyZWVuIHRoZSBlbGVtZW50IGlzLiBcIjFcIiBpcyB3aGVuIHRoZSB0b3AgZWRnZSBvZiB0aGUgZWxlbWVudCBmaXJzdCBwZWVrcyBvdXRcblx0XHQvLyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0LCBhbmQgXCIwXCIgaXMgd2hlbiB0aGUgYm90dG9tIGVkZ2UgZGlzYXBwZWFycyBiZXlvbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQ6XG5cdFx0Ly8gcGVyY2VudCA9IE1hdGgubWluKDEsIHN0YXJ0IC8gaGVpZ2h0KTtcdFx0XHQvLyAxIC0tPiAwXG5cdFx0cGVyY2VudCA9IChzdGFydCtoKSAvIChoZWlnaHQraCk7XHRcdFx0XHRcdC8vIDEgLS0+IDBcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IGhlaWdodCAtIHN0YXJ0O1xuXG5cdFx0Ly8gY3ljbGUgdGhyb3VnaCBhbnkgcmVnaXN0ZXJlZCB0cmFuc2Zvcm1hdGlvbnNcblx0XHR0aGlzLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7IGVmZmVjdC5jYWxsKGRhdGEpIH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIFB1dCBDYXJvdXNlbCBpbnRvIHRoZSBHbG9iYWwgc2NvcGUuXG4gKiBVc2VmdWwgZm9yIGV4aXN0aW5nIGRlbW9zIG9yIGlmIHlvdSB3aXNoIHRvIGluY2x1ZGUgbWFudWFsbHlcbiAqL1xuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG53aW5kb3cuU2Nyb2xsaWZ5ID0gc2Nyb2xsaWZ5O1xuIl19
