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
				var BCR = data.el.getBoundingClientRect();

				data.el.style.transform = ''; // remove any transformations, as we need "un-transformed"
				// data to compute the element's initial position.
				data.initial = {
					top: BCR.top + window.scrollY,
					height: BCR.height
				};

				_this2.calculate(data, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaUJBLElBQUksWUFBWSxLQUFoQjtBQUNBLElBQU0sYUFBYSxDQUFDLFdBQUQsRUFBYyxpQkFBZCxFQUFpQyxjQUFqQyxFQUFpRCxZQUFqRCxFQUErRCxhQUEvRCxDQUFuQjtBQUNBLEtBQUssSUFBSSxDQUFULElBQWMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQTVDLEVBQXVEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0Q7Ozs7Ozs7QUFRRCxJQUFJLGFBQWE7Ozs7Ozs7O0FBT2hCLFNBUGdCLG9CQU9QLElBUE8sRUFPRDtBQUNkLE1BQUksU0FBUyxDQUFiOztBQUVBLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7O0FBQzdCLFlBQVMsS0FBSyxRQUFMLEdBQWdCLEtBQUssS0FBOUI7QUFDQSxHQUZELE1BRU87O0FBQ04sWUFBUyxLQUFLLFNBQUwsSUFBa0IsS0FBSyxLQUFMLElBQWMsQ0FBaEMsQ0FBVCxDO0FBQ0E7O0FBRUQsT0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsa0JBQWlCLE1BQWpCLEdBQXlCLEtBQXBEO0FBQ0EsRUFqQmU7Ozs7Ozs7O0FBd0JoQixPQXhCZ0Isa0JBd0JULElBeEJTLEVBd0JIO0FBQ1osTUFBSSxRQUFRLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBWixDO0FBQ0EsTUFBSSxLQUFLLEtBQUssRUFBZDtBQUNBLE1BQUksTUFBTSxLQUFLLFFBQWY7O0FBRUEsUUFBTSxPQUFOLENBQWMsVUFBUyxJQUFULEVBQWU7QUFDNUIsT0FBSSxNQUFNLEtBQUssSUFBTCxDQUFWO0FBQ0EsT0FBSSxNQUFNLElBQVYsRUFBZ0I7QUFDZixPQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLEdBQWpCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sT0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixHQUFwQjtBQUNBO0FBQ0QsR0FQRDtBQVFBLEVBckNlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEVmLFdBNUVlLHNCQTRFSixJQTVFSSxFQTRFRTtBQUNmLE1BQUksU0FBUyxLQUFLLFFBQWxCO0FBQ0EsTUFBSSxLQUFLLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBVDtBQUNBLE1BQUksUUFBUSxPQUFPLFdBQW5CLEM7O0FBRUEsWUFBVSxLQUFWOzs7Ozs7Ozs7QUFTQSxNQUFJLFdBQVcsR0FBZjtBQUNBLE1BQUksT0FBTyxXQUFXLEtBQUssT0FBTCxHQUFlLEdBQTFCLEVBQStCLENBQS9CLEVBQWtDLFFBQWxDLEVBQTRDLEdBQTVDLENBQVg7O0FBRUEsT0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsaUJBQWlCLElBQWpCLEdBQXdCLFdBQW5EO0FBQ0Q7QUE5RmMsQ0FBakI7Ozs7OztJQXFHcUIsUztBQUVwQixvQkFBWSxPQUFaLEVBQStCO0FBQUE7O0FBQUEsTUFBVixLQUFVLHlEQUFKLEVBQUk7O0FBQUE7O0FBQzlCLE1BQUksV0FBWSxtQkFBbUIsV0FBcEIsR0FBbUMsQ0FBQyxPQUFELENBQW5DLEdBQStDLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBOUQ7O0FBRUEsTUFBSyxDQUFDLFNBQVMsTUFBVixJQUFvQixDQUFDLFNBQTFCLEVBQXNDO0FBQUUsVUFBTyxLQUFQO0FBQWU7O0FBRXZELE9BQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQXJCO0FBQ0EsT0FBSyxPQUFMLEdBQWUsRUFBZjtBQUNBLE9BQUssUUFBTCxHQUFnQixNQUFNLElBQU4sQ0FBVyxRQUFYLEVBQXFCLEdBQXJCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFVBQVMsRUFBRSxJQUFJLEVBQU4sRUFBVSxTQUFTLENBQW5CLEVBQXNCLFVBQVUsQ0FBaEMsRUFBVDtBQUFBLEdBQXpCLENBQWhCOztBQUVBLE9BQUssVUFBTDs7QUFFQSxTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtBQUFBLFVBQU8sTUFBSyxRQUFMLENBQWMsQ0FBZCxDQUFQO0FBQUEsR0FBbEM7QUFDQSxTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtBQUFBLFVBQU8sTUFBSyxRQUFMLENBQWMsQ0FBZCxDQUFQO0FBQUEsR0FBbEM7QUFDQTs7Ozs7Ozs7Ozs7OytCQVFZO0FBQUE7O0FBQ1osUUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixVQUFDLElBQUQsRUFBVTtBQUMzQixRQUFJLE1BQU0sS0FBSyxFQUFMLENBQVEscUJBQVIsRUFBVjs7QUFFQSxTQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsU0FBZCxHQUEwQixFQUExQixDOztBQUVBLFNBQUssT0FBTCxHQUFlO0FBQ2QsVUFBSyxJQUFJLEdBQUosR0FBVSxPQUFPLE9BRFI7QUFFZCxhQUFRLElBQUk7QUFGRSxLQUFmOztBQUtBLFdBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckI7QUFDQSxXQUFPLElBQVA7QUFDQSxJQVpEO0FBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQW9CSyxPLEVBQVM7QUFDYixVQUFPLElBQVA7OztBQUdBLE9BQUksY0FBSjtPQUFXLGlCQUFYO0FBQ0EsT0FBSSxZQUFZLENBQUMsS0FBakIsRUFBd0I7QUFBRSxZQUFRLENBQUMsTUFBTSxPQUFPLFdBQWIsR0FBMkIsUUFBNUIsSUFBd0MsT0FBTyxXQUF2RDtBQUFxRTtBQUMvRixPQUFJLFNBQVMsTUFBTSxPQUFOLENBQWMsS0FBZCxDQUFiLEVBQW1DO0FBQ2xDLFVBQU0sU0FBUyxhQUFULENBQXVCLE1BQU0sQ0FBTixDQUF2QixFQUFpQyxxQkFBakMsR0FBeUQsR0FBL0QsQztBQUNBLFlBQVEsTUFBTSxDQUFOLENBQVI7QUFDQTs7O0FBR0QsUUFBSyxLQUFMLEdBQWMsUUFBUSxPQUFPLFdBQWhCLEdBQStCLElBQUksR0FBbkMsR0FBeUMsT0FBTyxPQUE3RDtBQUNBLFFBQUssUUFBTCxHQUFnQixXQUFXLFFBQVgsR0FBc0IsQ0FBQyxPQUFLLEtBQU4sSUFBZSxPQUFPLFdBQTVEOztBQUVEOzs7Ozs7Ozs7Ozs0QkFRUyxJLEVBQU0sTSxFQUFRO0FBQ3ZCLGNBQVcsSUFBWCxJQUFtQixNQUFuQjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7OztzQkFRRSxJLEVBQU0sTyxFQUFTO0FBQ2pCLE9BQUksUUFBUSxTQUFSLEtBQVEsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFpQjtBQUM1QixXQUFPLFlBQVc7O0FBQ2IsUUFBRyxJQUFILENBQVEsSUFBUixFQUFjLE9BQWQsRTtBQUNKLEtBRkQ7QUFHQSxJQUpEOztBQU1BLFFBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBTSxXQUFXLElBQVgsQ0FBTixFQUF3QixPQUF4QixDQUFsQjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7NkJBTVU7QUFDVixPQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQ2xCLFNBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFPLHFCQUFQLENBQTZCLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBN0I7QUFDQSxTQUFLLE1BQUwsR0FBYyxPQUFPLE9BQXJCO0FBQ0E7QUFDRDs7Ozs7Ozs7OzZCQU1VO0FBQ1YsUUFBSyxVQUFMLEc7O0FBRUE7Ozs7Ozs7OzsyQkFNUTtBQUFBOztBQUNSLFNBQU0sSUFBTixDQUFXLEtBQUssUUFBaEIsRUFBMEIsVUFBQyxJQUFEO0FBQUEsV0FBVSxPQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVY7QUFBQSxJQUExQjtBQUNBLFFBQUssT0FBTCxHQUFlLEtBQWY7QUFDQTs7Ozs7Ozs7Ozs0QkFPUyxJLEVBQU07QUFDZixPQUFJLFNBQVMsT0FBTyxXQUFwQjtBQUNBLE9BQUksUUFBUSxLQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLEtBQUssTUFBcEM7QUFDQSxPQUFJLElBQUksS0FBSyxPQUFMLENBQWEsTUFBckI7O0FBRUEsT0FBSSxpQkFBSjs7OztBQUlBLE9BQUksU0FBUyxLQUFLLEVBQUwsQ0FBUSxxQkFBUixHQUFnQyxHQUF6QyxJQUFnRCxJQUFJLEtBQUssRUFBTCxDQUFRLHFCQUFSLEdBQWdDLE1BQXhGLEVBQWdHO0FBQUU7QUFBUyxJOzs7OztBQUszRyxjQUFXLElBQUssQ0FBQyxRQUFNLENBQVAsS0FBYSxTQUFPLENBQXBCLENBQWhCOzs7O0FBS0EsUUFBSyxRQUFMLEdBQWdCLFNBQVMsS0FBekI7QUFDQSxRQUFLLFFBQUwsR0FBZ0IsUUFBaEI7Ozs7OztBQU1BLFFBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsVUFBQyxNQUFELEVBQVk7QUFBRSxXQUFPLElBQVAsQ0FBWSxJQUFaO0FBQW1CLElBQXREO0FBQ0E7Ozs7OztrQkFyS21CLFM7Ozs7O0FDaklyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQLHVCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cbi8vIFRPRE8gYWRkIHdlYWttYXAgc3VwcG9ydCBmb3IgcHVibGljIC8gcHJpdmF0ZSBtZXRob2RzXG5cblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZWZmZWN0TGlzdCA9IHtcblxuXHQvKipcblx0ICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAgICogQHR5cGUge09iamVjdH0gb3B0czogWW91IG1heSBkZWZpbmUgcGFyYWxsYXggXCJzcGVlZFwiIG9yIHBhcmFsbGF4IFwicmFuZ2VcIiAoaW4gcGl4ZWxzKS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHBhcmFsbGF4KG9wdHMpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNwZWVkIGZpcnN0XG5cdFx0XHRvZmZzZXQgPSB0aGlzLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0XHR9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5wcm9ncmVzc3MgKiAob3B0cy5yYW5nZSB8fCAwKTsgIC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0fSxcblxuXHQvKipcblx0ICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICAgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBUaGUgXCJjbGFzc1wiIHRvIHRvZ2dsZSwgYW5kIHdoZW4gKGllLiBhdCB3aGljaCBwb2ludCBpbiB0aGUgcHJvZ3Jlc3MpXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR0b2dnbGUob3B0cykge1xuXHRcdGxldCB0aW1lcyA9IE9iamVjdC5rZXlzKG9wdHMpO1x0XHQvLyB0aW1lc1xuXHRcdGxldCBlbCA9IHRoaXMuZWw7XG5cdFx0bGV0IG5vdyA9IHRoaXMucHJvZ3Jlc3M7XG5cblx0XHR0aW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRcdGxldCBjc3MgPSBvcHRzW3RpbWVdO1xuXHRcdFx0aWYgKG5vdyA+IHRpbWUpIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBQaW4gYW4gZWxlbWVudCBmb3IgYSBzcGVjaWZpYyBkdXJhdGlvblxuXHQgKiAuLi4gd2hpbGUgdGhpcyB3b3JrcywgaXQgaXMgcHJldHR5IHVnbHkgYW5kIGNhbmRpZGF0ZSBmb3IgaW1wcm92ZW1lbnRcblx0ICovXG5cdFx0Ly8gcGluKG9wdHMpIHtcblx0XHQvLyAgbGV0IHdheXBvaW50cyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdC8vICBsZXQgcGVyY2VudCA9IHRoaXMucGVyY2VudCAqIDEwMDtcblxuXHRcdC8vICB3YXlwb2ludHMuZm9yRWFjaCh3aGVyZSA9PiB7XG5cdFx0Ly8gICAgaWYgKHBlcmNlbnQgPCBwYXJzZUludCh3aGVyZSkpIHtcblxuXHRcdC8vICAgICAgbGV0IGRpc3RhbmNlID0gb3B0c1t3aGVyZV07XG5cdFx0Ly8gICAgICBsZXQgYWJzb2x1dGUgPSB0aGlzLmFic29sdXRlO1xuXHRcdC8vICAgICAgdmFyIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcblx0XHQvLyAgICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudDtcblx0XHQvLyAgICAgIH0gZWxzZSB7XG5cdFx0Ly8gICAgICAgIGN1cnJlbnQgPSBhYnNvbHV0ZTtcblx0XHQvLyAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VycmVudDtcblx0XHQvLyAgICAgIH1cblxuXHRcdC8vICAgICAgbGV0IGVuZCA9IGN1cnJlbnQgKyBkaXN0YW5jZTsgLy8gKHRoaXMgYXNzdW1lcyBjdXJyZW50IHdpbGwgYmUgXCJmcm96ZW5cIiBhbmQgdW5jaGFuZ2VkIHdoaWxlIHBpbm5lZClcblx0XHQvLyAgICAgIGxldCBvZmZzZXQgPSBhYnNvbHV0ZSAtIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmIChhYnNvbHV0ZSA8IGVuZCkge1xuXHRcdC8vICAgICAgICB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdFx0Ly8gICAgICB9XG5cdFx0Ly8gICAgfSBlbHNlIHtcblx0XHQvLyAgICAgIC8vIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuXHRcdC8vICAgIH1cblx0XHQvLyAgfSk7XG5cdFx0Ly8gfSxcblxuXHQvKipcblx0ICogRHVtbXkgZWZmZWN0IGZvciB0ZXN0aW5nLCBhdCB0aGUgbW9tZW50XG5cdCAqL1xuICB0cmFuc2xhdGVYKG9wdHMpIHtcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZTtcbiAgICBsZXQgb24gPSBPYmplY3Qua2V5cyhvcHRzKTtcbiAgICBsZXQgZGVsYXkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHQvLyBzdGFydCB0cmFuc2xhdGluZyBhZnRlciBvbmUgd2luZG93LWhlaWdodCBvZiBzY3JvbGxpbmdcblxuICAgIG9mZnNldCAtPSBkZWxheTtcblxuICAgIC8vIGlmICh0aGlzLnBlcmNlbnQgPCAwLjUpIHsgICAgLy8gdGVzdDogc3RhcnQgdHJhbnNsYXRpbmcgd2hlbiBlbGVtZW50IGlzIGNlbnRlcmVkIGluIHZpZXdwb3J0XG4gICAgLy8gICBvZmZzZXQgLT0gZGVsYXk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIG9mZnNldCA9IDA7XG4gICAgLy8gfVxuXG4gICAgLy8gIGVhc2UgPSBlYXNlSW5RdWFkKGVsYXBzZWQsICAgICBzdGFydCwgZW5kLCBkdXJhdGlvbik7XG4gICAgbGV0IGRpc3RhbmNlID0gNTAwO1xuICAgIGxldCBlYXNlID0gZWFzZUluUXVhZCh0aGlzLnBlcmNlbnQgKiAxMDAsIDAsIGRpc3RhbmNlLCAxMDApO1xuXG4gICAgdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZTNkKCcgKyBlYXNlICsgJ3B4LCAwLCAwKSc7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBzY2VuZT17fSkge1xuXHRcdGxldCBlbGVtZW50cyA9IChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gW2VsZW1lbnRdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblxuXHRcdGlmICggIWVsZW1lbnRzLmxlbmd0aCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5lZmZlY3RzID0gW107XG5cdFx0dGhpcy5lbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudHMpLm1hcCgoZWwpID0+ICh7IGVsOiBlbCwgcGVyY2VudDogMCwgYWJzb2x1dGU6IDAgfSkpO1xuXG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgXCJkYXRhXCIgT2JqZWN0IGZvciBlYWNoIGVsZW1lbnQsIHdoaWNoIGNvbnRhaW5zIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFzIHdlbGxcblx0ICogYXMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBub2RlLiBUaGUgY2FsY3VsYXRhdGlvbiBuZWVkcyB0byBiZSBtYWRlIFwiYXMgaWYgZnJvbSBhbiBpbml0aWFsXG5cdCAqIHNjcm9sbCBwb3NpdGlvbiBvZiAwXCIuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRpbml0aWFsaXplKCkge1xuXHRcdHRoaXMuZWxlbWVudHMubWFwKChkYXRhKSA9PiB7XG5cdFx0XHRsZXQgQkNSID0gZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0ZGF0YS5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcdFx0Ly8gcmVtb3ZlIGFueSB0cmFuc2Zvcm1hdGlvbnMsIGFzIHdlIG5lZWQgXCJ1bi10cmFuc2Zvcm1lZFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGRhdGEgdG8gY29tcHV0ZSB0aGUgZWxlbWVudCdzIGluaXRpYWwgcG9zaXRpb24uXG5cdFx0XHRkYXRhLmluaXRpYWwgPSB7XG5cdFx0XHRcdHRvcDogQkNSLnRvcCArIHdpbmRvdy5zY3JvbGxZLFxuXHRcdFx0XHRoZWlnaHQ6IEJDUi5oZWlnaHRcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuY2FsY3VsYXRlKGRhdGEsIHRydWUpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogcGFyYW1zOiBhbnkgVFdPIG9mOiBzdGFydCAvIHN0b3AgLyBkdXJhdGlvbi5cblx0ICogICAgICAgICBzdGFydDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCAoZWcuIDAuNSkgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uIChlZyBbJyN0b2dnbGUnLCAwLjNdIClcblx0ICogICAgICAgICBzdG9wOiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvblxuXHQgKiAgICAgICAgIGR1cmF0aW9uOiB0aGUgZHVyYXRpb24gaW4gcGl4ZWxzXG5cdCAqXG5cdCAqICAgICAgICAgZGVmYXVsdCBpcyAwIC0gMTAwJSAobWFraW5nIGR1cmF0aW9uIHRoZSB3aW5kb3cgaGVpZ2h0ICsgZWxlbWVudCBoZWlnaHQpXG5cdCAqXG5cdCAqICAgICAgICAgZXhhbXBsZXM6XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IDAsIHN0b3A6IDAuNSB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IDAuMSwgZHVyYXRpb246ICc0MDBweCcgfVxuXHQgKiAgICAgICAgICB7IGR1cmF0aW9uOiAxMDBweCwgc3RvcDogMS4wIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgc3RvcDogWycjdG9nZ2xlJywgMC41XSB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIGR1cmF0aW9uOiAnMzAwcHgnIH1cblx0ICpcblx0ICogICAgICAgICBlYXNpbmcuLi4/IHN0YXJ0LCB0bywgZnJvbSwgZHVyYXRpb25cblx0ICpcblx0ICovXG5cdHNjZW5lKG9wdGlvbnMpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHQvLyBzY2VuZTpcblx0XHRcdGxldCBzdGFydCwgZHVyYXRpb247XG5cdFx0XHRpZiAoZHVyYXRpb24gJiYgIXN0YXJ0KSB7IHN0YXJ0ID0gKGVuZCAqIHdpbmRvdy5pbm5lckhlaWdodCAtIGR1cmF0aW9uKSAvIHdpbmRvdy5pbm5lckhlaWdodDsgfVxuXHRcdFx0aWYgKHN0YXJ0ICYmIEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG5cdFx0XHRcdEJDUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RhcnRbMF0pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDsgLy8gVE9ETyB1c2Ugb2Zmc2V0VG9wXG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnRbMV1cblx0XHRcdH1cblxuXHRcdFx0Ly9cblx0XHRcdGRhdGEuc3RhcnQgPSAoc3RhcnQgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgQkNSLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuXHRcdFx0ZGF0YS5kdXJhdGlvbiA9IGR1cmF0aW9uID8gZHVyYXRpb24gOiAoc3RvcC1zdGFydCkgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHQvL1xuXHR9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGN1c3RvbSBlZmZlY3QgdG8gU2Nyb2xsaWZ5LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiB0byBhZGQuXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBlZmZlY3Q6IFRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSB0cmFuZm9ybWF0aW9uLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0YWRkRWZmZWN0KG5hbWUsIGVmZmVjdCkge1xuXHRcdGVmZmVjdExpc3RbbmFtZV0gPSBlZmZlY3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogVXNlIGFuIHBhcnRpY3VsYXIgdHJhbnNmb3JtYXRpb24gb24gYW4gRWxlbWVudC5cbiAgICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgdHJhbnNmb3JtYXRpb24gT1IgYW4gYWN0dWFsIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnM6IEFueSB0cmFuc2Zvcm1hdGlvbiBvcHRpb25zLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0ZG8obmFtZSwgb3B0aW9ucykge1xuXHRcdGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyAgICAgICAvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG4gICAgICAgIGZuLmNhbGwodGhpcywgb3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3RMaXN0W25hbWVdLCBvcHRpb25zKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogb25TY3JvbGwgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuICAvKipcbiAgICogb25SZXNpemUgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKCk7ICAvLyBvci4uIHVwZGF0ZVNjZW5lLi4/XG5cdFx0Ly8gdGhpcy51cGRhdGUoKTtcblx0fVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIGV2ZXJ5IGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0QXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLCAoZGF0YSkgPT4gdGhpcy5jYWxjdWxhdGUoZGF0YSkgKTtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0fVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIGVhY2ggZWxlbWVudFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGE6IEFuIE9iamVjdCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFuZCB0aGUgZWxlbWVudCB0byB1ZHBhdGUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRjYWxjdWxhdGUoZGF0YSkge1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5pbml0aWFsLnRvcCAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBoID0gZGF0YS5pbml0aWFsLmhlaWdodDtcblx0XHQvLyBsZXQgcGVyY2VudDtcblx0XHRsZXQgcHJvZ3Jlc3M7XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdC8vIGlmIChoZWlnaHQgPCBzdGFydCB8fCAwID4gZW5kKSB7IHJldHVybjsgfSAgIC8vIG5vdGU6IHRoaXMgd29udCB3b3JrIGFzIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGVsZW1lbnQgY2hhbmdlcyBhdCBkaWZmZXJlbnQgcmF0ZXMuXG5cdFx0aWYgKGhlaWdodCA8IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIHx8IDAgPiBkYXRhLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSkgeyByZXR1cm47IH0gLy8gdXNlICphY3R1YWwqIHBvc2l0aW9uIGRhdGFcblxuXHRcdC8vIENhbGN1bGF0ZSBob3cgZmFyIGFjcm9zcyB0aGUgc2NyZWVuIHRoZSBlbGVtZW50IGlzLiBcIjFcIiBpcyB3aGVuIHRoZSB0b3AgZWRnZSBvZiB0aGUgZWxlbWVudCBmaXJzdCBwZWVrcyBvdXRcblx0XHQvLyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0LCBhbmQgXCIwXCIgaXMgd2hlbiB0aGUgYm90dG9tIGVkZ2UgZGlzYXBwZWFycyBiZXlvbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQ6XG5cdFx0Ly8gcGVyY2VudCA9IE1hdGgubWluKDEsIHN0YXJ0IC8gaGVpZ2h0KTsgICAgIC8vIDEgLS0+IDBcblx0XHRwcm9ncmVzcyA9IDEgLSAoKHN0YXJ0K2gpIC8gKGhlaWdodCtoKSk7XG5cblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdC8vIGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IGhlaWdodCAtIHN0YXJ0O1xuXHRcdGRhdGEucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydCAgICAgIHRvICBmcm9tICBlbmRcblx0XHQvLyBsZXQgZWFzaW5nID0gZWFzZUluT3V0UXVhZChkYXRhLnN0YXJ0LCAxMDAsIDAsIGRhdGEuc3RhcnQrZGF0YS5kdXJhdGlvbik7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
