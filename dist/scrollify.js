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

/**
 * A list of some default "Effects" or "Transformations" that may be applied
 * @type {Object}
 */
var effectList = {
	/**
  * speed, range
  * NOTE: should only use speed OR range, not both
  * NOTE: don't use arrow fn's here as they proxy "this"
  */
	// TODO: if element *begins* onscreen, the parallax algorithm will need
	// to "settle" ie. find the limit as bounding rects converge

	parallax: function parallax(opts) {
		var offset = 0;

		if (opts.speed !== undefined) {
			// check speed first
			offset = this.absolute * opts.speed; // - this.absolute;
		} else {
				// fallback to range
				offset = this.percent * (opts.range || 0); // default is "0", no effect
			}

		this.el.style[transform] = 'translate3d(0, ' + offset + 'px, 0)'; // no IE9, nor non 3d-accellerated browsers
	},


	// start pos, durations
	pin: function pin(position) {},


	// trigger, classname
	trigger: function trigger(opts) {}
};

/**
 * The Scrollify Class
 */

var Scrollify = function () {
	function Scrollify(element) {
		var _this = this;

		_classCallCheck(this, Scrollify);

		this.ticking = false;
		this.scroll = window.scrollY;
		this.effects = [];
		this.elements = [];

		var elements = element instanceof HTMLElement ? [element] : document.querySelectorAll(element);

		if (!elements.length || !transform) {
			return false;
		}

		// create a "data" Object for each element, containing position information and a shortcut to the transform fn
		Array.from(elements, function (el) {

			// let BCR = el.getBoundingClientRect(); // ***** NOTE: this calculation needs to be made "as if from an initial scroll position of 0"
			// BCR.top -= window.scrollY;
			// BCR.bottom -= window.scrollY;

			// let BCR = Object.assign({}, temp);

			var BCR = el.getBoundingClientRect();
			var ugh = {
				top: BCR.top + window.scrollY,
				bottom: BCR.bottom + window.scrollY,
				height: BCR.height
			};

			console.log(ugh.top, BCR.top, window.scrollY);

			var data = {
				_initial: ugh,
				el: el,
				position: 0, // a value transitioning from 1 to 0, starting when the element first appears at the bottom until it disappears at the top
				absolute: 0 // the absolute number of pixels the element has travelled since coming into view
			};

			_this.elements.push(data);

			// Some types of "transformations" need time to settle. For example, adjustments to an element's position and its offset may need to converge
			// while (BCR.top - temp) < 1) {
			_this.calculate(data, true);
			// temp = this.BCR.top;
			// }
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
			var start = data._initial.top - this.scroll;
			var end = data._initial.bottom - this.scroll;
			var h = data._initial.height;
			var position = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			if (height < start || 0 > end) {
				return;
			}

			// Calculate how far across the screen the element is. "1" is when the top edge of the element first peeks out
			// from the bottom of the viewport, and "0" is when the bottom edge disappears beyond the top of the viewport:
			// position = Math.min(1, start / height);			// 1 --> 0
			position = (start + h) / (height + h); // 1 --> 0

			// update data Object
			data.position = position;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQWI7QUFDTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDekIsS0FBSyxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUN0RCxjQUFZLFdBQVcsQ0FBWCxDQUFaLENBRHNEO0FBRXRELFFBRnNEO0VBQXZEO0NBREQ7Ozs7OztBQVlBLElBQUksYUFBYTs7Ozs7Ozs7O0FBUWhCLDZCQUFTLE1BQU07QUFDZCxNQUFJLFNBQVMsQ0FBVCxDQURVOztBQUdkLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDNUIsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMO0FBREcsR0FBOUIsTUFFTzs7QUFDTCxhQUFTLEtBQUssT0FBTCxJQUFnQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWhCO0FBREosSUFGUDs7QUFNQSxPQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsU0FBZCxJQUEyQixvQkFBbUIsTUFBbkIsR0FBMkIsUUFBM0I7QUFUYixFQVJDOzs7O0FBcUJoQixtQkFBSSxVQUFVLEVBckJFOzs7O0FBMEJoQiwyQkFBUSxNQUFNLEVBMUJFO0NBQWI7Ozs7OztJQW1DaUI7QUFFcEIsVUFGb0IsU0FFcEIsQ0FBWSxPQUFaLEVBQXFCOzs7d0JBRkQsV0FFQzs7QUFDcEIsT0FBSyxPQUFMLEdBQWUsS0FBZixDQURvQjtBQUVwQixPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVAsQ0FGTTtBQUdwQixPQUFLLE9BQUwsR0FBZSxFQUFmLENBSG9CO0FBSXBCLE9BQUssUUFBTCxHQUFnQixFQUFoQixDQUpvQjs7QUFNcEIsTUFBTSxXQUFXLE9BQUMsWUFBbUIsV0FBbkIsR0FBa0MsQ0FBQyxPQUFELENBQW5DLEdBQStDLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBL0MsQ0FORzs7QUFRcEIsTUFBSyxDQUFDLFNBQVMsTUFBVCxJQUFtQixDQUFDLFNBQUQsRUFBYTtBQUFFLFVBQU8sS0FBUCxDQUFGO0dBQXRDOzs7QUFSb0IsT0FXcEIsQ0FBTSxJQUFOLENBQVcsUUFBWCxFQUFxQixVQUFDLEVBQUQsRUFBUTs7Ozs7Ozs7QUFRNUIsT0FBSSxNQUFNLEdBQUcscUJBQUgsRUFBTixDQVJ3QjtBQVM1QixPQUFJLE1BQU07QUFDVCxTQUFNLElBQUksR0FBSixHQUFVLE9BQU8sT0FBUDtBQUNoQixZQUFRLElBQUksTUFBSixHQUFhLE9BQU8sT0FBUDtBQUNyQixZQUFRLElBQUksTUFBSjtJQUhMLENBVHdCOztBQWdCNUIsV0FBUSxHQUFSLENBQVksSUFBSSxHQUFKLEVBQVMsSUFBSSxHQUFKLEVBQVMsT0FBTyxPQUFQLENBQTlCLENBaEI0Qjs7QUFrQjVCLE9BQUksT0FBTztBQUNWLGNBQVUsR0FBVjtBQUNBLFFBQUksRUFBSjtBQUNBLGNBQVUsQ0FBVjtBQUNBLGNBQVUsQ0FBVjtBQUpVLElBQVAsQ0FsQndCOztBQXlCNUIsU0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQjs7OztBQXpCNEIsUUE2QjVCLENBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckI7OztHQTdCb0IsQ0FBckIsQ0FYb0I7QUFXUztBQW1DN0IsU0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFDLENBQUQ7VUFBTyxNQUFLLFFBQUwsQ0FBYyxDQUFkO0dBQVAsQ0FBbEMsQ0E5Q29CO0FBK0NwQixTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtVQUFPLE1BQUssUUFBTCxDQUFjLENBQWQ7R0FBUCxDQUFsQyxDQS9Db0I7RUFBckI7Ozs7Ozs7Y0FGb0I7OzRCQXVEVixNQUFNLFFBQVE7QUFDdkIsY0FBVyxJQUFYLElBQW1CLE1BQW5CLENBRHVCO0FBRXZCLFVBQU8sSUFBUCxDQUZ1Qjs7Ozs7Ozs7OzRCQVFkLE1BQU0sU0FBUztBQUN4QixPQUFJLFFBQVEsU0FBUixLQUFRLENBQUMsRUFBRCxFQUFLLE9BQUwsRUFBaUI7QUFDNUIsV0FBTyxZQUFXOztBQUNqQixRQUFHLElBQUgsQ0FBUSxJQUFSLEVBQWMsT0FBZCxFQURpQjtLQUFYLENBRHFCO0lBQWpCLENBRFk7O0FBT3hCLFFBQUssT0FBTCxDQUFhLElBQWIsQ0FBbUIsTUFBTSxXQUFXLElBQVgsQ0FBTixFQUF3QixPQUF4QixDQUFuQixFQVB3QjtBQVF4QixVQUFPLElBQVAsQ0FSd0I7Ozs7Ozs7Ozs2QkFjZDtBQUNWLE9BQUksQ0FBQyxLQUFLLE9BQUwsRUFBYztBQUNsQixTQUFLLE9BQUwsR0FBZSxJQUFmLENBRGtCO0FBRWxCLFdBQU8scUJBQVAsQ0FBNkIsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUE3QixFQUZrQjtBQUdsQixTQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVAsQ0FISTtJQUFuQjs7Ozs7Ozs7OzZCQVVVO0FBQ1YsUUFBSyxNQUFMLEdBQWMsT0FBTyxXQUFQLENBREo7QUFFVixRQUFLLE1BQUwsR0FGVTs7Ozs7Ozs7OzJCQVFGOzs7QUFDUixTQUFNLElBQU4sQ0FBVyxLQUFLLFFBQUwsRUFBZSxVQUFDLElBQUQ7V0FBVSxPQUFLLFNBQUwsQ0FBZSxJQUFmO0lBQVYsQ0FBMUIsQ0FEUTtBQUVSLFFBQUssT0FBTCxHQUFlLEtBQWYsQ0FGUTs7Ozs7Ozs7OzRCQVFDLE1BQU07QUFDZixPQUFJLFNBQVMsT0FBTyxXQUFQLENBREU7QUFFZixPQUFJLFFBQVEsS0FBSyxRQUFMLENBQWMsR0FBZCxHQUFvQixLQUFLLE1BQUwsQ0FGakI7QUFHZixPQUFJLE1BQU0sS0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixLQUFLLE1BQUwsQ0FIbEI7QUFJZixPQUFJLElBQUksS0FBSyxRQUFMLENBQWMsTUFBZCxDQUpPO0FBS2YsT0FBSSxpQkFBSjs7O0FBTGUsT0FRWCxTQUFTLEtBQVQsSUFBa0IsSUFBSSxHQUFKLEVBQVM7QUFBRSxXQUFGO0lBQS9COzs7OztBQVJlLFdBYWYsR0FBVyxDQUFDLFFBQU0sQ0FBTixDQUFELElBQWEsU0FBTyxDQUFQLENBQWI7OztBQWJJLE9BZ0JmLENBQUssUUFBTCxHQUFnQixRQUFoQixDQWhCZTtBQWlCZixRQUFLLFFBQUwsR0FBZ0IsU0FBUyxLQUFUOzs7QUFqQkQsT0FvQmYsQ0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFDLE1BQUQsRUFBWTtBQUFFLFdBQU8sSUFBUCxDQUFZLElBQVosRUFBRjtJQUFaLENBQXJCLENBcEJlOzs7O1FBeEdJOzs7Ozs7OztBQzNEckI7Ozs7OztBQUNBLE9BQU8sU0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uOiBDU1MgdHJhbnNmb3Jtc1xuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcbmNvbnN0IHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbmZvciAobGV0IGkgaW4gdHJhbnNmb3Jtcykge1xuXHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGVbdHJhbnNmb3Jtc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBzb21lIGRlZmF1bHQgXCJFZmZlY3RzXCIgb3IgXCJUcmFuc2Zvcm1hdGlvbnNcIiB0aGF0IG1heSBiZSBhcHBsaWVkXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZWZmZWN0TGlzdCA9IHtcblx0LyoqXG5cdCAqIHNwZWVkLCByYW5nZVxuXHQgKiBOT1RFOiBzaG91bGQgb25seSB1c2Ugc3BlZWQgT1IgcmFuZ2UsIG5vdCBib3RoXG5cdCAqIE5PVEU6IGRvbid0IHVzZSBhcnJvdyBmbidzIGhlcmUgYXMgdGhleSBwcm94eSBcInRoaXNcIlxuXHQgKi9cblx0IC8vIFRPRE86IGlmIGVsZW1lbnQgKmJlZ2lucyogb25zY3JlZW4sIHRoZSBwYXJhbGxheCBhbGdvcml0aG0gd2lsbCBuZWVkXG5cdCAvLyB0byBcInNldHRsZVwiIGllLiBmaW5kIHRoZSBsaW1pdCBhcyBib3VuZGluZyByZWN0cyBjb252ZXJnZVxuXHRwYXJhbGxheChvcHRzKSB7XG5cdFx0bGV0IG9mZnNldCA9IDA7XG5cblx0XHRpZiAob3B0cy5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHRcdC8vIGNoZWNrIHNwZWVkIGZpcnN0XG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZSAqIG9wdHMuc3BlZWQ7Ly8gLSB0aGlzLmFic29sdXRlO1xuXHRcdH0gZWxzZSB7XHRcdFx0XHQvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdCBcdG9mZnNldCA9IHRoaXMucGVyY2VudCAqIChvcHRzLnJhbmdlIHx8IDApO1x0XHQvLyBkZWZhdWx0IGlzIFwiMFwiLCBubyBlZmZlY3Rcblx0XHR9XG5cblx0XHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoMCwgJysgb2Zmc2V0ICsncHgsIDApJztcdC8vIG5vIElFOSwgbm9yIG5vbiAzZC1hY2NlbGxlcmF0ZWQgYnJvd3NlcnNcblx0fSxcblxuXHQvLyBzdGFydCBwb3MsIGR1cmF0aW9uc1xuXHRwaW4ocG9zaXRpb24pIHtcblxuXHR9LFxuXG5cdC8vIHRyaWdnZXIsIGNsYXNzbmFtZVxuXHR0cmlnZ2VyKG9wdHMpIHtcblxuXHR9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5lZmZlY3RzID0gW107XG5cdFx0dGhpcy5lbGVtZW50cyA9IFtdO1xuXG5cdFx0Y29uc3QgZWxlbWVudHMgPSAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSA/IFtlbGVtZW50XSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyBjcmVhdGUgYSBcImRhdGFcIiBPYmplY3QgZm9yIGVhY2ggZWxlbWVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhbmQgYSBzaG9ydGN1dCB0byB0aGUgdHJhbnNmb3JtIGZuXG5cdFx0QXJyYXkuZnJvbShlbGVtZW50cywgKGVsKSA9PiB7XG5cblx0XHRcdC8vIGxldCBCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy8gKioqKiogTk9URTogdGhpcyBjYWxjdWxhdGlvbiBuZWVkcyB0byBiZSBtYWRlIFwiYXMgaWYgZnJvbSBhbiBpbml0aWFsIHNjcm9sbCBwb3NpdGlvbiBvZiAwXCJcblx0XHRcdC8vIEJDUi50b3AgLT0gd2luZG93LnNjcm9sbFk7XG5cdFx0XHQvLyBCQ1IuYm90dG9tIC09IHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0XHQvLyBsZXQgQkNSID0gT2JqZWN0LmFzc2lnbih7fSwgdGVtcCk7XG5cblx0XHRcdGxldCBCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGxldCB1Z2ggPSB7XG5cdFx0XHRcdHRvcDogIEJDUi50b3AgKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0Ym90dG9tOiBCQ1IuYm90dG9tICsgd2luZG93LnNjcm9sbFksXG5cdFx0XHRcdGhlaWdodDogQkNSLmhlaWdodFxuXHRcdFx0fTtcblxuXG5cdFx0XHRjb25zb2xlLmxvZyh1Z2gudG9wLCBCQ1IudG9wLCB3aW5kb3cuc2Nyb2xsWSk7XG5cblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRfaW5pdGlhbDogdWdoLFxuXHRcdFx0XHRlbDogZWwsXG5cdFx0XHRcdHBvc2l0aW9uOiAwLFx0XHRcdFx0XHRcdC8vIGEgdmFsdWUgdHJhbnNpdGlvbmluZyBmcm9tIDEgdG8gMCwgc3RhcnRpbmcgd2hlbiB0aGUgZWxlbWVudCBmaXJzdCBhcHBlYXJzIGF0IHRoZSBib3R0b20gdW50aWwgaXQgZGlzYXBwZWFycyBhdCB0aGUgdG9wXG5cdFx0XHRcdGFic29sdXRlOiAwXHRcdFx0XHRcdFx0XHQvLyB0aGUgYWJzb2x1dGUgbnVtYmVyIG9mIHBpeGVscyB0aGUgZWxlbWVudCBoYXMgdHJhdmVsbGVkIHNpbmNlIGNvbWluZyBpbnRvIHZpZXdcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5lbGVtZW50cy5wdXNoKGRhdGEpO1xuXG5cdFx0XHQvLyBTb21lIHR5cGVzIG9mIFwidHJhbnNmb3JtYXRpb25zXCIgbmVlZCB0aW1lIHRvIHNldHRsZS4gRm9yIGV4YW1wbGUsIGFkanVzdG1lbnRzIHRvIGFuIGVsZW1lbnQncyBwb3NpdGlvbiBhbmQgaXRzIG9mZnNldCBtYXkgbmVlZCB0byBjb252ZXJnZVxuXHRcdFx0Ly8gd2hpbGUgKEJDUi50b3AgLSB0ZW1wKSA8IDEpIHtcblx0XHRcdHRoaXMuY2FsY3VsYXRlKGRhdGEsIHRydWUpO1xuXHRcdFx0Ly8gdGVtcCA9IHRoaXMuQkNSLnRvcDtcblx0XHRcdC8vIH1cblxuXHRcdH0pO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXNlRWZmZWN0KG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcdFx0XHRcdC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaCggY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMsIChkYXRhKSA9PiB0aGlzLmNhbGN1bGF0ZShkYXRhKSApO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjYWxjdWxhdGUoZGF0YSkge1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5faW5pdGlhbC50b3AgLSB0aGlzLnNjcm9sbDtcblx0XHRsZXQgZW5kID0gZGF0YS5faW5pdGlhbC5ib3R0b20gLSB0aGlzLnNjcm9sbDtcblx0XHRsZXQgaCA9IGRhdGEuX2luaXRpYWwuaGVpZ2h0O1xuXHRcdGxldCBwb3NpdGlvbjtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0aWYgKGhlaWdodCA8IHN0YXJ0IHx8IDAgPiBlbmQpIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBDYWxjdWxhdGUgaG93IGZhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGUgZWxlbWVudCBpcy4gXCIxXCIgaXMgd2hlbiB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGVsZW1lbnQgZmlyc3QgcGVla3Mgb3V0XG5cdFx0Ly8gZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCwgYW5kIFwiMFwiIGlzIHdoZW4gdGhlIGJvdHRvbSBlZGdlIGRpc2FwcGVhcnMgYmV5b25kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0OlxuXHRcdC8vIHBvc2l0aW9uID0gTWF0aC5taW4oMSwgc3RhcnQgLyBoZWlnaHQpO1x0XHRcdC8vIDEgLS0+IDBcblx0XHRwb3NpdGlvbiA9IChzdGFydCtoKSAvIChoZWlnaHQraCk7XHRcdFx0XHRcdC8vIDEgLS0+IDBcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdGRhdGEucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHRkYXRhLmFic29sdXRlID0gaGVpZ2h0IC0gc3RhcnQ7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
