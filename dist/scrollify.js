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

			var data = {
				el: el,
				initial: initial,
				position: 0, // a value transitioning from 1 to 0, starting when the element first appears at the bottom until it disappears at the top
				absolute: 0 // the absolute number of pixels the element has travelled since coming into view
			};

			_this.elements.push(data);
			_this.calculate(data, true); // set initial position
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBLElBQUksWUFBWSxLQUFaO0FBQ0osSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQWI7QUFDTixLQUFLLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDekIsS0FBSyxTQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFdBQVcsQ0FBWCxDQUFwQixNQUF1QyxTQUF2QyxFQUFrRDtBQUN0RCxjQUFZLFdBQVcsQ0FBWCxDQUFaLENBRHNEO0FBRXRELFFBRnNEO0VBQXZEO0NBREQ7Ozs7OztBQVlBLElBQUksYUFBYTs7Ozs7Ozs7O0FBUWhCLDZCQUFTLE1BQU07QUFDZCxNQUFJLFNBQVMsQ0FBVCxDQURVOztBQUdkLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBZixFQUEwQjs7QUFDNUIsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMO0FBREcsR0FBOUIsTUFFTzs7QUFDTCxhQUFTLEtBQUssT0FBTCxJQUFnQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWhCO0FBREosSUFGUDs7QUFNQSxPQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsU0FBZCxJQUEyQixvQkFBbUIsTUFBbkIsR0FBMkIsUUFBM0I7QUFUYixFQVJDOzs7O0FBcUJoQixtQkFBSSxVQUFVLEVBckJFOzs7O0FBMEJoQiwyQkFBUSxNQUFNLEVBMUJFO0NBQWI7Ozs7OztJQW1DaUI7QUFFcEIsVUFGb0IsU0FFcEIsQ0FBWSxPQUFaLEVBQXFCOzs7d0JBRkQsV0FFQzs7QUFDcEIsT0FBSyxPQUFMLEdBQWUsS0FBZixDQURvQjtBQUVwQixPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVAsQ0FGTTtBQUdw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LFNBQVMsS0FBVCxJQUFrQixJQUFJLEdBQUosRUFBUztBQUFFLFdBQUY7SUFBL0I7Ozs7O0FBUmUsV0FhZixHQUFXLENBQUMsUUFBTSxDQUFOLENBQUQsSUFBYSxTQUFPLENBQVAsQ0FBYjs7O0FBYkksT0FnQmYsQ0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBaEJlO0FBaUJmLFFBQUssUUFBTCxHQUFnQixTQUFTLEtBQVQ7OztBQWpCRCxPQW9CZixDQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWixFQUFGO0lBQVosQ0FBckIsQ0FwQmU7Ozs7UUFoR0k7Ozs7Ozs7O0FDM0RyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdGlmICggZG9jdW1lbnQuYm9keS5zdHlsZVt0cmFuc2Zvcm1zW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblx0XHRicmVhaztcblx0fVxufVxuXG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcIkVmZmVjdHNcIiBvciBcIlRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBlZmZlY3RMaXN0ID0ge1xuXHQvKipcblx0ICogc3BlZWQsIHJhbmdlXG5cdCAqIE5PVEU6IHNob3VsZCBvbmx5IHVzZSBzcGVlZCBPUiByYW5nZSwgbm90IGJvdGhcblx0ICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG5cdCAqL1xuXHQgLy8gVE9ETzogaWYgZWxlbWVudCAqYmVnaW5zKiBvbnNjcmVlbiwgdGhlIHBhcmFsbGF4IGFsZ29yaXRobSB3aWxsIG5lZWRcblx0IC8vIHRvIFwic2V0dGxlXCIgaWUuIGZpbmQgdGhlIGxpbWl0IGFzIGJvdW5kaW5nIHJlY3RzIGNvbnZlcmdlXG5cdHBhcmFsbGF4KG9wdHMpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcdFx0Ly8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHQgXHRvZmZzZXQgPSB0aGlzLmFic29sdXRlICogb3B0cy5zcGVlZDsvLyAtIHRoaXMuYWJzb2x1dGU7XG5cdFx0fSBlbHNlIHtcdFx0XHRcdC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5wZXJjZW50ICogKG9wdHMucmFuZ2UgfHwgMCk7XHRcdC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgwLCAnKyBvZmZzZXQgKydweCwgMCknO1x0Ly8gbm8gSUU5LCBub3Igbm9uIDNkLWFjY2VsbGVyYXRlZCBicm93c2Vyc1xuXHR9LFxuXG5cdC8vIHN0YXJ0IHBvcywgZHVyYXRpb25zXG5cdHBpbihwb3NpdGlvbikge1xuXG5cdH0sXG5cblx0Ly8gdHJpZ2dlciwgY2xhc3NuYW1lXG5cdHRyaWdnZXIob3B0cykge1xuXG5cdH1cbn1cblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR0aGlzLmVmZmVjdHMgPSBbXTtcblx0XHR0aGlzLmVsZW1lbnRzID0gW107XG5cblx0XHRjb25zdCBlbGVtZW50cyA9IChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gW2VsZW1lbnRdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblxuXHRcdGlmICggIWVsZW1lbnRzLmxlbmd0aCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdC8vIGNyZWF0ZSBhIFwiZGF0YVwiIE9iamVjdCBmb3IgZWFjaCBlbGVtZW50LCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFuZCBhIHNob3J0Y3V0IHRvIHRoZSB0cmFuc2Zvcm0gZm5cblx0XHRBcnJheS5mcm9tKGVsZW1lbnRzLCAoZWwpID0+IHtcblxuXHRcdFx0Ly8gKioqKiogTk9URTogdGhpcyBjYWxjdWxhdGlvbiBuZWVkcyB0byBiZSBtYWRlIFwiYXMgaWYgZnJvbSBhbiBpbml0aWFsIHNjcm9sbCBwb3NpdGlvbiBvZiAwXCJcblx0XHRcdC8vIGxldCBCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdC8vIEJDUi50b3AgLT0gd2luZG93LnNjcm9sbFk7XG5cdFx0XHQvLyBCQ1IuYm90dG9tIC09IHdpbmRvdy5zY3JvbGxZO1xuXHRcdFx0Ly8gbGV0IEJDUiA9IE9iamVjdC5hc3NpZ24oe30sIHRlbXApO1xuXG5cdFx0XHQvLyBwcm9iYWJseSBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy4uLlxuXHRcdFx0bGV0IEJDUiA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0bGV0IGluaXRpYWwgPSB7XG5cdFx0XHRcdHRvcDogIEJDUi50b3AgKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdFx0Ym90dG9tOiBCQ1IuYm90dG9tICsgd2luZG93LnNjcm9sbFksXG5cdFx0XHRcdGhlaWdodDogQkNSLmhlaWdodFxuXHRcdFx0fTtcblxuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdGVsOiBlbCxcblx0XHRcdFx0aW5pdGlhbDogaW5pdGlhbCxcblx0XHRcdFx0cG9zaXRpb246IDAsXHRcdFx0XHRcdFx0XHRcdC8vIGEgdmFsdWUgdHJhbnNpdGlvbmluZyBmcm9tIDEgdG8gMCwgc3RhcnRpbmcgd2hlbiB0aGUgZWxlbWVudCBmaXJzdCBhcHBlYXJzIGF0IHRoZSBib3R0b20gdW50aWwgaXQgZGlzYXBwZWFycyBhdCB0aGUgdG9wXG5cdFx0XHRcdGFic29sdXRlOiAwXHRcdFx0XHRcdFx0XHRcdFx0Ly8gdGhlIGFic29sdXRlIG51bWJlciBvZiBwaXhlbHMgdGhlIGVsZW1lbnQgaGFzIHRyYXZlbGxlZCBzaW5jZSBjb21pbmcgaW50byB2aWV3XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZWxlbWVudHMucHVzaChkYXRhKTtcblx0XHRcdHRoaXMuY2FsY3VsYXRlKGRhdGEsIHRydWUpO1x0XHQvLyBzZXQgaW5pdGlhbCBwb3NpdGlvblxuXHRcdH0pO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXNlRWZmZWN0KG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcdFx0XHRcdC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaCggY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMsIChkYXRhKSA9PiB0aGlzLmNhbGN1bGF0ZShkYXRhKSApO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjYWxjdWxhdGUoZGF0YSkge1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5pbml0aWFsLnRvcCAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBlbmQgPSBkYXRhLmluaXRpYWwuYm90dG9tIC0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IGggPSBkYXRhLmluaXRpYWwuaGVpZ2h0O1xuXHRcdGxldCBwb3NpdGlvbjtcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0aWYgKGhlaWdodCA8IHN0YXJ0IHx8IDAgPiBlbmQpIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBDYWxjdWxhdGUgaG93IGZhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGUgZWxlbWVudCBpcy4gXCIxXCIgaXMgd2hlbiB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGVsZW1lbnQgZmlyc3QgcGVla3Mgb3V0XG5cdFx0Ly8gZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCwgYW5kIFwiMFwiIGlzIHdoZW4gdGhlIGJvdHRvbSBlZGdlIGRpc2FwcGVhcnMgYmV5b25kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0OlxuXHRcdC8vIHBvc2l0aW9uID0gTWF0aC5taW4oMSwgc3RhcnQgLyBoZWlnaHQpO1x0XHRcdC8vIDEgLS0+IDBcblx0XHRwb3NpdGlvbiA9IChzdGFydCtoKSAvIChoZWlnaHQraCk7XHRcdFx0XHRcdC8vIDEgLS0+IDBcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdGRhdGEucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHRkYXRhLmFic29sdXRlID0gaGVpZ2h0IC0gc3RhcnQ7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
