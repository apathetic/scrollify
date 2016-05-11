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

			_this2.elements.push(data);
			_this2.calculate(data, true); // set initial details
		});

		window.addEventListener('scroll', function (e) {
			return _this2.onScroll(e);
		});
		window.addEventListener('resize', function (e) {
			return _this2.onResize(e);
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
			// this.height = window.innerHeight;
			// TODO may have to also recalculate each elements' new dimensions, if changed
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQWI7QUFDTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDekIsS0FBSyxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUN0RCxjQUFZLFdBQVcsQ0FBWCxDQUFaLENBRHNEO0FBRXRELFFBRnNEO0VBQXZEO0NBREQ7Ozs7Ozs7Ozs7QUFpQkEsSUFBSSxhQUFhOzs7Ozs7QUFLaEIsNkJBQVMsTUFBTTtBQUNkLE1BQUksU0FBUyxDQUFULENBRFU7O0FBR2QsTUFBSSxLQUFLLEtBQUwsS0FBZSxTQUFmLEVBQTBCOztBQUM1QixZQUFTLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQUwsQ0FERztHQUE5QixNQUVPOztBQUNMLFlBQVMsS0FBSyxPQUFMLElBQWdCLEtBQUssS0FBTCxJQUFjLENBQWQsQ0FBaEI7QUFESixHQUZQOztBQU1BLE9BQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxTQUFkLElBQTJCLGtCQUFpQixNQUFqQixHQUF5QixLQUF6QixDQVRiO0VBTEM7Ozs7Ozs7QUFzQmhCLG1CQUFJLE1BQU07OztBQUNULE1BQUksWUFBWSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQVosQ0FESztBQUVULE1BQUksVUFBVSxLQUFLLE9BQUwsR0FBZSxHQUFmLENBRkw7O0FBSVQsWUFBVSxPQUFWLENBQWtCLGlCQUFTO0FBQzFCLE9BQUksVUFBVSxTQUFTLEtBQVQsQ0FBVixFQUEyQjs7QUFFOUIsUUFBSSxXQUFXLEtBQUssS0FBTCxDQUFYLENBRjBCO0FBRzlCLFFBQUksV0FBVyxNQUFLLFFBQUwsQ0FIZTtBQUk5QixRQUFJLE9BQUosQ0FKOEI7O0FBTTlCLFFBQUksTUFBSyxPQUFMLEVBQWM7QUFDakIsZUFBVSxNQUFLLE9BQUwsQ0FETztLQUFsQixNQUVPO0FBQ04sZUFBVSxRQUFWLENBRE07QUFFTixXQUFLLE9BQUwsR0FBZSxPQUFmLENBRk07S0FGUDs7QUFPQSxRQUFJLE1BQU0sVUFBVSxRQUFWO0FBYm9CLFFBYzFCLFNBQVMsV0FBVyxPQUFYLENBZGlCOztBQWdCOUIsUUFBSSxXQUFXLEdBQVgsRUFBZ0I7QUFDbkIsV0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsa0JBQWlCLE1BQWpCLEdBQXlCLEtBQXpCLENBRFI7S0FBcEI7SUFoQkQsTUFtQk87O0lBbkJQO0dBRGlCLENBQWxCLENBSlM7RUF0Qk07Ozs7Ozs7OztBQTJEaEIseUJBQU8sTUFBTTtBQUNaLE1BQUksVUFBVSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQVYsQ0FEUTtBQUVaLE1BQUksS0FBSyxLQUFLLEVBQUwsQ0FGRztBQUdaLE1BQUksVUFBVSxLQUFLLE9BQUwsR0FBZSxHQUFmLENBSEY7O0FBS1osVUFBUSxPQUFSLENBQWdCLFVBQVMsR0FBVCxFQUFjO0FBQzdCLE9BQUksT0FBTyxTQUFTLEtBQUssR0FBTCxDQUFULENBQVAsQ0FEeUI7QUFFN0IsT0FBSSxVQUFVLElBQVYsRUFBZ0I7QUFDbkIsT0FBRyxTQUFILENBQWEsR0FBYixDQUFpQixHQUFqQixFQURtQjtJQUFwQixNQUVPO0FBQ04sT0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixHQUFwQixFQURNO0lBRlA7R0FGZSxDQUFoQixDQUxZO0VBM0RHO0NBQWI7Ozs7OztJQStFaUI7QUFFcEIsVUFGb0IsU0FFcEIsQ0FBWSxPQUFaLEVBQXFCOzs7d0JBRkQsV0FFQzs7QUFDcEIsT0FBSyxPQUFMLEdBQWUsS0FBZixDQURvQjtBQUVwQixPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVAsQ0FGTTtBQUdwQixPQUFLLE9BQUwsR0FBZSxFQUFmLENBSG9CO0FBSXBCLE9BQUssUUFBTCxHQUFnQixFQUFoQixDQUpvQjs7QUFNcEIsTUFBTSxXQUFXLE9BQUMsWUFBbUIsV0FBbkIsR0FBa0MsQ0FBQyxPQUFELENBQW5DLEdBQStDLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBL0MsQ0FORzs7QUFRcEIsTUFBSyxDQUFDLFNBQVMsTUFBVCxJQUFtQixDQUFDLFNBQUQsRUFBYTtBQUFFLFVBQU8sS0FBUCxDQUFGO0dBQXRDOzs7QUFSb0IsT0FXcEIsQ0FBTSxJQUFOLENBQVcsUUFBWCxFQUFxQixVQUFDLEVBQUQsRUFBUTs7Ozs7Ozs7O0FBUzVCLE9BQUksTUFBTSxHQUFHLHFCQUFILEVBQU4sQ0FUd0I7QUFVNUIsT0FBSSxVQUFVO0FBQ2IsU0FBTSxJQUFJLEdBQUosR0FBVSxPQUFPLE9BQVA7QUFDaEIsWUFBUSxJQUFJLE1BQUosR0FBYSxPQUFPLE9BQVA7QUFDckIsWUFBUSxJQUFJLE1BQUo7SUFITDs7OztBQVZ3QixPQWtCeEIsT0FBTztBQUNWLFFBQUksRUFBSjtBQUNBLGFBQVMsT0FBVDtBQUNBLGFBQVMsQ0FBVDtBQUNBLGNBQVUsQ0FBVjtBQUpVLElBQVAsQ0FsQndCOztBQXlCNUIsVUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixFQXpCNEI7QUEwQjVCLFVBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckI7QUExQjRCLEdBQVIsQ0FBckIsQ0FYb0I7O0FBd0NwQixTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtVQUFPLE9BQUssUUFBTCxDQUFjLENBQWQ7R0FBUCxDQUFsQyxDQXhDb0I7QUF5Q3BCLFNBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO1VBQU8sT0FBSyxRQUFMLENBQWMsQ0FBZDtHQUFQLENBQWxDLENBekNvQjtFQUFyQjs7Ozs7OztjQUZvQjs7NEJBaURWLE1BQU0sUUFBUTtBQUN2QixjQUFXLElBQVgsSUFBbUIsTUFBbkIsQ0FEdUI7QUFFdkIsVUFBTyxJQUFQLENBRnVCOzs7Ozs7Ozs7NEJBUWQsTUFBTSxTQUFTO0FBQ3hCLE9BQUksUUFBUSxTQUFSLEtBQVEsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFpQjtBQUM1QixXQUFPLFlBQVc7O0FBQ2pCLFFBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxPQUFkLEVBRGlCO0tBQVgsQ0FEcUI7SUFBakIsQ0FEWTs7QUFPeEIsUUFBSyxPQUFMLENBQWEsSUFBYixDQUFtQixNQUFNLFdBQVcsSUFBWCxDQUFOLEVBQXdCLE9BQXhCLENBQW5CLEVBUHdCO0FBUXhCLFVBQU8sSUFBUCxDQVJ3Qjs7Ozs7Ozs7OzZCQWNkO0FBQ1YsT0FBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQ2xCLFNBQUssT0FBTCxHQUFlLElBQWYsQ0FEa0I7QUFFbEIsV0FBTyxxQkFBUCxDQUE2QixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQTdCLEVBRmtCO0FBR2xCLFNBQUssTUFBTCxHQUFjLE9BQU8sT0FBUCxDQUhJO0lBQW5COzs7Ozs7Ozs7NkJBVVU7OztBQUdWLFFBQUssTUFBTCxHQUhVOzs7Ozs7Ozs7MkJBU0Y7OztBQUNSLFNBQU0sSUFBTixDQUFXLEtBQUssUUFBTCxFQUFlLFVBQUMsSUFBRDtXQUFVLE9BQUssU0FBTCxDQUFlLElBQWY7SUFBVixDQUExQixDQURRO0FBRVIsUUFBSyxPQUFMLEdBQWUsS0FBZixDQUZROzs7Ozs7Ozs7NEJBUUMsTUFBTTtBQUNmLE9BQUksU0FBUyxPQUFPLFdBQVAsQ0FERTtBQUVmLE9BQUksUUFBUSxLQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLEtBQUssTUFBTCxDQUZoQjtBQUdmLE9BQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLEtBQUssTUFBTCxDQUhqQjtBQUlmLE9BQUksSUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBSk87QUFLZixPQUFJLGdCQUFKOzs7OztBQUxlLE9BVVgsU0FBUyxLQUFLLEVBQUwsQ0FBUSxxQkFBUixHQUFnQyxHQUFoQyxJQUF1QyxJQUFJLEtBQUssRUFBTCxDQUFRLHFCQUFSLEdBQWdDLE1BQWhDLEVBQXdDO0FBQUUsV0FBRjtJQUFoRzs7Ozs7QUFWZSxVQWVmLEdBQVUsQ0FBQyxRQUFNLENBQU4sQ0FBRCxJQUFhLFNBQU8sQ0FBUCxDQUFiOzs7QUFmSyxPQWtCZixDQUFLLE9BQUwsR0FBZSxPQUFmO0FBbEJlLE9BbUJmLENBQUssUUFBTCxHQUFnQixTQUFTLEtBQVQ7OztBQW5CRCxPQXNCZixDQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWixFQUFGO0lBQVosQ0FBckIsQ0F0QmU7Ozs7UUFuR0k7Ozs7Ozs7O0FDNUdyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdGlmICggZG9jdW1lbnQuYm9keS5zdHlsZVt0cmFuc2Zvcm1zW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblx0XHRicmVhaztcblx0fVxufVxuXG5cbi8vIE1hdGguZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7IHQgLz0gZC8yOyBpZiAodCA8IDEpIHsgcmV0dXJuIGMvMip0KnQgKyBiOyB9IHQtLTsgcmV0dXJuIC1jLzIgKiAodCoodC0yKSAtIDEpICsgYjsgfTtcbi8vIE1hdGguZWFzZU91dEN1YmljID0gZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHsgdCAvPSBkOyB0LS07IHJldHVybiBjKih0KnQqdCArIDEpICsgYjsgfTtcblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJ0cmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXG5cdC8qKlxuXHQgKiBQYXJhbGxheCBhbiBlbGVtZW50LiBPcHRpb25zIGluY2x1ZGUgcGFyYWxsYXggc3BlZWQgT1IgcGFyYWxsYXggcmFuZ2Vcblx0ICovXG5cdHBhcmFsbGF4KG9wdHMpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcdFx0XHRcdFx0XHRcdFx0XHQvLyBjaGVjayBzcGVlZCBmaXJzdFxuXHRcdCBcdG9mZnNldCA9IHRoaXMuYWJzb2x1dGUgKiBvcHRzLnNwZWVkO1xuXHRcdH0gZWxzZSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5wZXJjZW50ICogKG9wdHMucmFuZ2UgfHwgMCk7XHRcdC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBQaW4gYW4gZWxlbWVudCBmb3IgYSBzcGVjaWZpYyBkdXJhdGlvblxuXHQgKiAuLi4gd2hpbGUgdGhpcyB3b3JrcywgaXQgaXMgcHJldHR5IHVnbHkgYW5kIGNhbmRpZGF0ZSBmb3IgaW1wcm92ZW1lbnRcblx0ICovXG5cdHBpbihvcHRzKSB7XG5cdFx0bGV0IHdheXBvaW50cyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdGxldCBwZXJjZW50ID0gdGhpcy5wZXJjZW50ICogMTAwO1xuXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2hlcmUgPT4ge1xuXHRcdFx0aWYgKHBlcmNlbnQgPCBwYXJzZUludCh3aGVyZSkpIHtcblxuXHRcdFx0XHRsZXQgZGlzdGFuY2UgPSBvcHRzW3doZXJlXTtcblx0XHRcdFx0bGV0IGFic29sdXRlID0gdGhpcy5hYnNvbHV0ZTtcblx0XHRcdFx0dmFyIGN1cnJlbnQ7XG5cblx0XHRcdFx0aWYgKHRoaXMuY3VycmVudCkge1xuXHRcdFx0XHRcdGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3VycmVudCA9IGFic29sdXRlO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgZW5kID0gY3VycmVudCArIGRpc3RhbmNlO1x0Ly8gKHRoaXMgYXNzdW1lcyBjdXJyZW50IHdpbGwgYmUgXCJmcm96ZW5cIiBhbmQgdW5jaGFuZ2VkIHdoaWxlIHBpbm5lZClcblx0XHRcdFx0bGV0IG9mZnNldCA9IGFic29sdXRlIC0gY3VycmVudDtcblxuXHRcdFx0XHRpZiAoYWJzb2x1dGUgPCBlbmQpIHtcblx0XHRcdFx0XHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuICAvLyBpbml0aWFsXG4gIC8vIHBlcmNlbnRcbiAgLy8gYWJzb2x1dGVcblxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmZcblx0ICovXG5cdHRvZ2dsZShvcHRzKSB7XG5cdFx0bGV0IGNsYXNzZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0XHRsZXQgZWwgPSB0aGlzLmVsO1xuXHRcdGxldCBwZXJjZW50ID0gdGhpcy5wZXJjZW50ICogMTAwO1xuXG5cdFx0Y2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uKGNzcykge1xuXHRcdFx0bGV0IHdoZW4gPSBwYXJzZUludChvcHRzW2Nzc10pO1xuXHRcdFx0aWYgKHBlcmNlbnQgPiB3aGVuKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY3NzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5cbi8qKlxuICogVGhlIFNjcm9sbGlmeSBDbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBbXTtcblxuXHRcdGNvbnN0IGVsZW1lbnRzID0gKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgPyBbZWxlbWVudF0gOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCAhZWxlbWVudHMubGVuZ3RoIHx8ICF0cmFuc2Zvcm0gKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0Ly8gY3JlYXRlIGEgXCJkYXRhXCIgT2JqZWN0IGZvciBlYWNoIGVsZW1lbnQsIGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24gYW5kIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gbm9kZVxuXHRcdEFycmF5LmZyb20oZWxlbWVudHMsIChlbCkgPT4ge1xuXG5cdFx0XHQvLyAqKioqKiBOT1RFOiB0aGlzIGNhbGN1bGF0aW9uIG5lZWRzIHRvIGJlIG1hZGUgXCJhcyBpZiBmcm9tIGFuIGluaXRpYWwgc2Nyb2xsIHBvc2l0aW9uIG9mIDBcIlxuXHRcdFx0Ly8gbGV0IEJDUiA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Ly8gQkNSLnRvcCAtPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHRcdC8vIEJDUi5ib3R0b20gLT0gd2luZG93LnNjcm9sbFk7XG5cdFx0XHQvLyBsZXQgQkNSID0gT2JqZWN0LmFzc2lnbih7fSwgdGVtcCk7XG5cblx0XHRcdC8vIHByb2JhYmx5IGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLi4uXG5cdFx0XHRsZXQgQkNSID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRsZXQgaW5pdGlhbCA9IHtcblx0XHRcdFx0dG9wOiAgQkNSLnRvcCArIHdpbmRvdy5zY3JvbGxZLFxuXHRcdFx0XHRib3R0b206IEJDUi5ib3R0b20gKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0aGVpZ2h0OiBCQ1IuaGVpZ2h0XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBlbFsndHJhbnNmb3JtJ10gPSB0cmFuc2Zvcm07XHRcdC8vIGNyZWF0ZSBhIGNvbnNpc3RlbnQgcmVmLCBoZXJlPyBzb21laG93IGJ1dCBub3QgbGlrZSB0aGlzIGV4YWN0bHlcblxuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdGVsOiBlbCxcblx0XHRcdFx0aW5pdGlhbDogaW5pdGlhbCxcblx0XHRcdFx0cGVyY2VudDogMCxcdFx0XHRcdFx0XHRcdFx0XHQvLyBhIHZhbHVlIGZyb20gMSB0byAwLCBzdGFydGluZyB3aGVuIHRoZSBlbGVtZW50IGZpcnN0IGFwcGVhcnMgYXQgdGhlIGJvdHRvbSB1bnRpbCBpdCBkaXNhcHBlYXJzIGF0IHRoZSB0b3Bcblx0XHRcdFx0YWJzb2x1dGU6IDBcdFx0XHRcdFx0XHRcdFx0XHQvLyB0aGUgYWJzb2x1dGUgbnVtYmVyIG9mIHBpeGVscyB0aGUgZWxlbWVudCBoYXMgdHJhdmVsbGVkIHNpbmNlIGNvbWluZyBpbnRvIHZpZXdcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5lbGVtZW50cy5wdXNoKGRhdGEpO1xuXHRcdFx0dGhpcy5jYWxjdWxhdGUoZGF0YSwgdHJ1ZSk7XHRcdC8vIHNldCBpbml0aWFsIGRldGFpbHNcblx0XHR9KTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0YWRkRWZmZWN0KG5hbWUsIGVmZmVjdCkge1xuXHRcdGVmZmVjdExpc3RbbmFtZV0gPSBlZmZlY3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVzZUVmZmVjdChuYW1lLCBvcHRpb25zKSB7XG5cdFx0bGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHRcdFx0XHQvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG5cdFx0XHRcdGZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5lZmZlY3RzLnB1c2goIGN1cnJ5KGVmZmVjdExpc3RbbmFtZV0sIG9wdGlvbnMpICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRvblJlc2l6ZSgpIHtcblx0XHQvLyB0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHQvLyBUT0RPIG1heSBoYXZlIHRvIGFsc28gcmVjYWxjdWxhdGUgZWFjaCBlbGVtZW50cycgbmV3IGRpbWVuc2lvbnMsIGlmIGNoYW5nZWRcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0QXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLCAoZGF0YSkgPT4gdGhpcy5jYWxjdWxhdGUoZGF0YSkgKTtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y2FsY3VsYXRlKGRhdGEpIHtcblx0XHRsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdGxldCBzdGFydCA9IGRhdGEuaW5pdGlhbC50b3AgLSB0aGlzLnNjcm9sbDtcblx0XHRsZXQgZW5kID0gZGF0YS5pbml0aWFsLmJvdHRvbSAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBoID0gZGF0YS5pbml0aWFsLmhlaWdodDtcblx0XHRsZXQgcGVyY2VudDtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0Ly8gaWYgKGhlaWdodCA8IHN0YXJ0IHx8IDAgPiBlbmQpIHsgcmV0dXJuOyB9XHRcdC8vIG5vdGU6IHRoaXMgd29udCB3b3JrIGFzIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGVsZW1lbnQgY2hhbmdlcyBhdCBkaWZmZXJlbnQgcmF0ZXMuXG5cblx0XHRpZiAoaGVpZ2h0IDwgZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgfHwgMCA+IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tKSB7IHJldHVybjsgfVx0Ly8gdXNlICphY3R1YWwqIHBvc2l0aW9uIGRhdGFcblxuXHRcdC8vIENhbGN1bGF0ZSBob3cgZmFyIGFjcm9zcyB0aGUgc2NyZWVuIHRoZSBlbGVtZW50IGlzLiBcIjFcIiBpcyB3aGVuIHRoZSB0b3AgZWRnZSBvZiB0aGUgZWxlbWVudCBmaXJzdCBwZWVrcyBvdXRcblx0XHQvLyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0LCBhbmQgXCIwXCIgaXMgd2hlbiB0aGUgYm90dG9tIGVkZ2UgZGlzYXBwZWFycyBiZXlvbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQ6XG5cdFx0Ly8gcGVyY2VudCA9IE1hdGgubWluKDEsIHN0YXJ0IC8gaGVpZ2h0KTtcdFx0XHQvLyAxIC0tPiAwXG5cdFx0cGVyY2VudCA9IChzdGFydCtoKSAvIChoZWlnaHQraCk7XHRcdFx0XHRcdC8vIDEgLS0+IDBcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XHRcdFx0XHRcdFx0Ly8gW1RPRE9dIHNob3VsZCB0aGlzIGJlIDAgLT4gMTAwIC4uLj9cblx0XHRkYXRhLmFic29sdXRlID0gaGVpZ2h0IC0gc3RhcnQ7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
