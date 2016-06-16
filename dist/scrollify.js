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

		_classCallCheck(this, Scrollify);

		if (element instanceof HTMLElement == false) {
			element = document.querySelector(element);
		}
		if (!element || !transform) {
			return false;
		}

		this.element = element;
		this.ticking = false;
		this.effects = [];
		this.data = { el: element, progress: 0, absolute: 0 };
		this.scroll = window.scrollY;

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
			var BCR = this.element.getBoundingClientRect();

			this.element.style.transform = ''; // remove any transformations, as we need "un-transformed"
			// data to compute the element's initial position.
			this.data.initial = {
				top: BCR.top + window.scrollY,
				height: BCR.height
			};

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
			var end = opts.end || null;
			var top = void 0;

			if (duration && !start) {
				start = (end * window.innerHeight - duration) / window.innerHeight;
			}
			if (start && Array.isArray(start)) {
				top = document.querySelector(start[0]).getBoundingClientRect().top;
				start = start[1];
			} else {
				top = this.element.getBoundingClientRect().top;
			}

			// if (start) {
			// 	if (Array.isArray(start)) {
			// 		top = document.querySelector(start[0]).getBoundingClientRect().top;
			// 		start = start[1];
			// 	} else {
			// 	top =	data.el.getBoundingClientRect().top;
			// 	}
			// } else {
			// 	if (duration) {
			// 		start = (end * window.innerHeight - duration) / window.innerHeight;
			// 	}
			// }

			//
			this.start = start * window.innerHeight + top + window.scrollY;
			this.duration = duration ? duration : (stop - start) * window.innerHeight;
			//

			console.log(this);
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
			var winHeight = window.innerHeight;
			var start = data.initial.top - this.scroll;
			var height = data.initial.height;
			var progress = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			if (winHeight < this.element.getBoundingClientRect().top || 0 > this.element.getBoundingClientRect().bottom) {
				return;
			} // use *actual* position data

			// Calculate how far across the screen the element is. "0" is when the top edge of the element first peeks out
			// from the bottom of the viewport, and "1" is when the bottom edge disappears beyond the top of the viewport:
			// percent = Math.min(1, start / winHeight);     // 1 --> 0
			progress = 1 - (start + height) / (winHeight + height);

			// update data Object
			// data.percent = percent;
			data.absolute = winHeight - start;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaUJBLElBQUksWUFBWSxLQUFoQjtBQUNBLElBQU0sYUFBYSxDQUFDLFdBQUQsRUFBYyxpQkFBZCxFQUFpQyxjQUFqQyxFQUFpRCxZQUFqRCxFQUErRCxhQUEvRCxDQUFuQjtBQUNBLEtBQUssSUFBSSxDQUFULElBQWMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQTVDLEVBQXVEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0Q7Ozs7Ozs7QUFRRCxJQUFJLGFBQWE7Ozs7Ozs7O0FBT2hCLFNBUGdCLG9CQU9QLElBUE8sRUFPRDtBQUNkLE1BQUksU0FBUyxDQUFiOztBQUVBLE1BQUksS0FBSyxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7O0FBQzdCLFlBQVMsS0FBSyxRQUFMLEdBQWdCLEtBQUssS0FBOUI7QUFDQSxHQUZELE1BRU87O0FBQ04sWUFBUyxLQUFLLFNBQUwsSUFBa0IsS0FBSyxLQUFMLElBQWMsQ0FBaEMsQ0FBVCxDO0FBQ0E7O0FBRUQsT0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsa0JBQWlCLE1BQWpCLEdBQXlCLEtBQXBEO0FBQ0EsRUFqQmU7Ozs7Ozs7O0FBd0JoQixPQXhCZ0Isa0JBd0JULElBeEJTLEVBd0JIO0FBQ1osTUFBSSxRQUFRLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBWixDO0FBQ0EsTUFBSSxLQUFLLEtBQUssRUFBZDtBQUNBLE1BQUksTUFBTSxLQUFLLFFBQWY7O0FBRUEsUUFBTSxPQUFOLENBQWMsVUFBUyxJQUFULEVBQWU7QUFDNUIsT0FBSSxNQUFNLEtBQUssSUFBTCxDQUFWO0FBQ0EsT0FBSSxNQUFNLElBQVYsRUFBZ0I7QUFDZixPQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLEdBQWpCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sT0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixHQUFwQjtBQUNBO0FBQ0QsR0FQRDtBQVFBLEVBckNlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEVmLFdBNUVlLHNCQTRFSixJQTVFSSxFQTRFRTtBQUNmLE1BQUksU0FBUyxLQUFLLFFBQWxCO0FBQ0EsTUFBSSxLQUFLLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBVDtBQUNBLE1BQUksUUFBUSxPQUFPLFdBQW5CLEM7O0FBRUEsWUFBVSxLQUFWOzs7Ozs7Ozs7QUFTQSxNQUFJLFdBQVcsR0FBZjtBQUNBLE1BQUksT0FBTyxXQUFXLEtBQUssT0FBTCxHQUFlLEdBQTFCLEVBQStCLENBQS9CLEVBQWtDLFFBQWxDLEVBQTRDLEdBQTVDLENBQVg7O0FBRUEsT0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLFNBQWQsSUFBMkIsaUJBQWlCLElBQWpCLEdBQXdCLFdBQW5EO0FBQ0Q7QUE5RmMsQ0FBakI7Ozs7OztJQXFHcUIsUztBQUVwQixvQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ3BCLE1BQUksbUJBQW1CLFdBQW5CLElBQWtDLEtBQXRDLEVBQTZDO0FBQUUsYUFBVSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUE0QztBQUMzRixNQUFJLENBQUMsT0FBRCxJQUFZLENBQUMsU0FBakIsRUFBNkI7QUFBRSxVQUFPLEtBQVA7QUFBZTs7QUFFOUMsT0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLE9BQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxPQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsT0FBSyxJQUFMLEdBQVksRUFBRSxJQUFJLE9BQU4sRUFBZSxVQUFVLENBQXpCLEVBQTRCLFVBQVUsQ0FBdEMsRUFBWjtBQUNBLE9BQUssTUFBTCxHQUFjLE9BQU8sT0FBckI7O0FBRUEsT0FBSyxVQUFMOztBQUVBLFNBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO0FBQUEsVUFBTyxNQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVA7QUFBQSxHQUFsQztBQUNBLFNBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBQyxDQUFEO0FBQUEsVUFBTyxNQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVA7QUFBQSxHQUFsQztBQUNBOzs7Ozs7Ozs7Ozs7K0JBUVk7QUFDWixPQUFJLE1BQU0sS0FBSyxPQUFMLENBQWEscUJBQWIsRUFBVjs7QUFFQSxRQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFNBQW5CLEdBQStCLEVBQS9CLEM7O0FBRUEsUUFBSyxJQUFMLENBQVUsT0FBVixHQUFvQjtBQUNuQixTQUFLLElBQUksR0FBSixHQUFVLE9BQU8sT0FESDtBQUVuQixZQUFRLElBQUk7QUFGTyxJQUFwQjs7QUFLQSxRQUFLLFNBQUw7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBb0JLLEksRUFBTTtBQUNYLE9BQUksUUFBUSxLQUFLLEtBQUwsSUFBYyxJQUExQjtBQUNBLE9BQUksV0FBVyxLQUFLLFFBQUwsSUFBaUIsSUFBaEM7QUFDQSxPQUFJLE1BQU0sS0FBSyxHQUFMLElBQVksSUFBdEI7QUFDQSxPQUFJLFlBQUo7O0FBRUEsT0FBSSxZQUFZLENBQUMsS0FBakIsRUFBd0I7QUFBRSxZQUFRLENBQUMsTUFBTSxPQUFPLFdBQWIsR0FBMkIsUUFBNUIsSUFBd0MsT0FBTyxXQUF2RDtBQUFxRTtBQUMvRixPQUFJLFNBQVMsTUFBTSxPQUFOLENBQWMsS0FBZCxDQUFiLEVBQW1DO0FBQ2xDLFVBQU0sU0FBUyxhQUFULENBQXVCLE1BQU0sQ0FBTixDQUF2QixFQUFpQyxxQkFBakMsR0FBeUQsR0FBL0Q7QUFDQSxZQUFRLE1BQU0sQ0FBTixDQUFSO0FBQ0EsSUFIRCxNQUdPO0FBQ04sVUFBTSxLQUFLLE9BQUwsQ0FBYSxxQkFBYixHQUFxQyxHQUEzQztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELFFBQUssS0FBTCxHQUFjLFFBQVEsT0FBTyxXQUFoQixHQUErQixHQUEvQixHQUFxQyxPQUFPLE9BQXpEO0FBQ0EsUUFBSyxRQUFMLEdBQWdCLFdBQVcsUUFBWCxHQUFzQixDQUFDLE9BQUssS0FBTixJQUFlLE9BQU8sV0FBNUQ7OztBQUdBLFdBQVEsR0FBUixDQUFZLElBQVo7QUFDQSxVQUFPLElBQVA7QUFDQTs7Ozs7Ozs7Ozs7NEJBUVMsSSxFQUFNLE0sRUFBUTtBQUN2QixjQUFXLElBQVgsSUFBbUIsTUFBbkI7QUFDQSxVQUFPLElBQVA7QUFDQTs7Ozs7Ozs7Ozs7c0JBUUUsSSxFQUFNLE8sRUFBUztBQUNqQixPQUFJLFFBQVEsU0FBUixLQUFRLENBQUMsRUFBRCxFQUFLLE9BQUwsRUFBaUI7QUFDNUIsV0FBTyxZQUFXOztBQUNiLFFBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxPQUFkLEU7QUFDSixLQUZEO0FBR0EsSUFKRDs7QUFNQSxRQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLE1BQU0sV0FBVyxJQUFYLENBQU4sRUFBd0IsT0FBeEIsQ0FBbEI7QUFDQSxVQUFPLElBQVA7QUFDQTs7Ozs7Ozs7OzZCQU1VO0FBQ1YsT0FBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNsQixTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBTyxxQkFBUCxDQUE2QixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQTdCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsT0FBTyxPQUFyQjtBQUNBO0FBQ0Q7Ozs7Ozs7Ozs2QkFNVTtBQUNWLFFBQUssVUFBTCxHOztBQUVBOzs7Ozs7Ozs7MkJBTVE7QUFDUixRQUFLLFNBQUw7QUFDQSxRQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0E7Ozs7Ozs7Ozs7OEJBT1c7QUFDWCxPQUFJLE9BQU8sS0FBSyxJQUFoQjtBQUNBLE9BQUksWUFBWSxPQUFPLFdBQXZCO0FBQ0EsT0FBSSxRQUFRLEtBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsS0FBSyxNQUFwQztBQUNBLE9BQUksU0FBUyxLQUFLLE9BQUwsQ0FBYSxNQUExQjtBQUNBLE9BQUksaUJBQUo7OztBQUdBLE9BQUksWUFBWSxLQUFLLE9BQUwsQ0FBYSxxQkFBYixHQUFxQyxHQUFqRCxJQUF3RCxJQUFJLEtBQUssT0FBTCxDQUFhLHFCQUFiLEdBQXFDLE1BQXJHLEVBQTZHO0FBQUU7QUFBUyxJOzs7OztBQUt4SCxjQUFXLElBQUssQ0FBQyxRQUFRLE1BQVQsS0FBb0IsWUFBWSxNQUFoQyxDQUFoQjs7OztBQUtBLFFBQUssUUFBTCxHQUFnQixZQUFZLEtBQTVCO0FBQ0EsUUFBSyxRQUFMLEdBQWdCLFFBQWhCOzs7Ozs7QUFNQSxRQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWjtBQUFtQixJQUF0RDtBQUNBOzs7Ozs7a0JBcExtQixTOzs7OztBQ2pJckI7Ozs7OztBQUNBLE9BQU8sU0FBUCx1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb246IENTUyB0cmFuc2Zvcm1zXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHRyYW5zZm9ybSA9IGZhbHNlO1xuY29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuZm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdGlmICggZG9jdW1lbnQuYm9keS5zdHlsZVt0cmFuc2Zvcm1zW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblx0XHRicmVhaztcblx0fVxufVxuXG5cbi8qKlxuICogQSBsaXN0IG9mIHNvbWUgZGVmYXVsdCBcInRyYW5zZm9ybWF0aW9uc1wiIHRoYXQgbWF5IGJlIGFwcGxpZWRcbiAqIE5PVEU6IGRvbid0IHVzZSBhcnJvdyBmbidzIGhlcmUgYXMgdGhleSBwcm94eSBcInRoaXNcIlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGVmZmVjdExpc3QgPSB7XG5cblx0LyoqXG5cdCAqIFBhcmFsbGF4IGFuIGVsZW1lbnQuXG4gICAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFlvdSBtYXkgZGVmaW5lIHBhcmFsbGF4IFwic3BlZWRcIiBvciBwYXJhbGxheCBcInJhbmdlXCIgKGluIHBpeGVscykuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRwYXJhbGxheChvcHRzKSB7XG5cdFx0bGV0IG9mZnNldCA9IDA7XG5cblx0XHRpZiAob3B0cy5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7ICAgICAgICAgICAgICAgICAvLyBjaGVjayBzcGVlZCBmaXJzdFxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZSAqIG9wdHMuc3BlZWQ7XG5cdFx0fSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcmFuZ2Vcblx0XHRcdG9mZnNldCA9IHRoaXMucHJvZ3Jlc3NzICogKG9wdHMucmFuZ2UgfHwgMCk7ICAvLyBkZWZhdWx0IGlzIFwiMFwiLCBubyBlZmZlY3Rcblx0XHR9XG5cblx0XHR0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBhIGNsYXNzIG9uIG9yIG9mZi5cbiAgICogQHR5cGUge09iamVjdH0gb3B0czogVGhlIFwiY2xhc3NcIiB0byB0b2dnbGUsIGFuZCB3aGVuIChpZS4gYXQgd2hpY2ggcG9pbnQgaW4gdGhlIHByb2dyZXNzKVxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dG9nZ2xlKG9wdHMpIHtcblx0XHRsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcdFx0Ly8gdGltZXNcblx0XHRsZXQgZWwgPSB0aGlzLmVsO1xuXHRcdGxldCBub3cgPSB0aGlzLnByb2dyZXNzO1xuXG5cdFx0dGltZXMuZm9yRWFjaChmdW5jdGlvbih0aW1lKSB7XG5cdFx0XHRsZXQgY3NzID0gb3B0c1t0aW1lXTtcblx0XHRcdGlmIChub3cgPiB0aW1lKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY3NzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvKipcblx0ICogUGluIGFuIGVsZW1lbnQgZm9yIGEgc3BlY2lmaWMgZHVyYXRpb25cblx0ICogLi4uIHdoaWxlIHRoaXMgd29ya3MsIGl0IGlzIHByZXR0eSB1Z2x5IGFuZCBjYW5kaWRhdGUgZm9yIGltcHJvdmVtZW50XG5cdCAqL1xuXHRcdC8vIHBpbihvcHRzKSB7XG5cdFx0Ly8gIGxldCB3YXlwb2ludHMgPSBPYmplY3Qua2V5cyhvcHRzKTtcblx0XHQvLyAgbGV0IHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQgKiAxMDA7XG5cblx0XHQvLyAgd2F5cG9pbnRzLmZvckVhY2god2hlcmUgPT4ge1xuXHRcdC8vICAgIGlmIChwZXJjZW50IDwgcGFyc2VJbnQod2hlcmUpKSB7XG5cblx0XHQvLyAgICAgIGxldCBkaXN0YW5jZSA9IG9wdHNbd2hlcmVdO1xuXHRcdC8vICAgICAgbGV0IGFic29sdXRlID0gdGhpcy5hYnNvbHV0ZTtcblx0XHQvLyAgICAgIHZhciBjdXJyZW50O1xuXG5cdFx0Ly8gICAgICBpZiAodGhpcy5jdXJyZW50KSB7XG5cdFx0Ly8gICAgICAgIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQ7XG5cdFx0Ly8gICAgICB9IGVsc2Uge1xuXHRcdC8vICAgICAgICBjdXJyZW50ID0gYWJzb2x1dGU7XG5cdFx0Ly8gICAgICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XG5cdFx0Ly8gICAgICB9XG5cblx0XHQvLyAgICAgIGxldCBlbmQgPSBjdXJyZW50ICsgZGlzdGFuY2U7IC8vICh0aGlzIGFzc3VtZXMgY3VycmVudCB3aWxsIGJlIFwiZnJvemVuXCIgYW5kIHVuY2hhbmdlZCB3aGlsZSBwaW5uZWQpXG5cdFx0Ly8gICAgICBsZXQgb2Zmc2V0ID0gYWJzb2x1dGUgLSBjdXJyZW50O1xuXG5cdFx0Ly8gICAgICBpZiAoYWJzb2x1dGUgPCBlbmQpIHtcblx0XHQvLyAgICAgICAgdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHRcdC8vICAgICAgfVxuXHRcdC8vICAgIH0gZWxzZSB7XG5cdFx0Ly8gICAgICAvLyB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsIDApJztcblx0XHQvLyAgICB9XG5cdFx0Ly8gIH0pO1xuXHRcdC8vIH0sXG5cblx0LyoqXG5cdCAqIER1bW15IGVmZmVjdCBmb3IgdGVzdGluZywgYXQgdGhlIG1vbWVudFxuXHQgKi9cbiAgdHJhbnNsYXRlWChvcHRzKSB7XG4gICAgbGV0IG9mZnNldCA9IHRoaXMuYWJzb2x1dGU7XG4gICAgbGV0IG9uID0gT2JqZWN0LmtleXMob3B0cyk7XG4gICAgbGV0IGRlbGF5ID0gd2luZG93LmlubmVySGVpZ2h0O1x0Ly8gc3RhcnQgdHJhbnNsYXRpbmcgYWZ0ZXIgb25lIHdpbmRvdy1oZWlnaHQgb2Ygc2Nyb2xsaW5nXG5cbiAgICBvZmZzZXQgLT0gZGVsYXk7XG5cbiAgICAvLyBpZiAodGhpcy5wZXJjZW50IDwgMC41KSB7ICAgIC8vIHRlc3Q6IHN0YXJ0IHRyYW5zbGF0aW5nIHdoZW4gZWxlbWVudCBpcyBjZW50ZXJlZCBpbiB2aWV3cG9ydFxuICAgIC8vICAgb2Zmc2V0IC09IGRlbGF5O1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBvZmZzZXQgPSAwO1xuICAgIC8vIH1cblxuICAgIC8vICBlYXNlID0gZWFzZUluUXVhZChlbGFwc2VkLCAgICAgc3RhcnQsIGVuZCwgZHVyYXRpb24pO1xuICAgIGxldCBkaXN0YW5jZSA9IDUwMDtcbiAgICBsZXQgZWFzZSA9IGVhc2VJblF1YWQodGhpcy5wZXJjZW50ICogMTAwLCAwLCBkaXN0YW5jZSwgMTAwKTtcblxuICAgIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUzZCgnICsgZWFzZSArICdweCwgMCwgMCknO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgU2Nyb2xsaWZ5IENsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGlmeSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cblx0XHRpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZGF0YSA9IHsgZWw6IGVsZW1lbnQsIHByb2dyZXNzOiAwLCBhYnNvbHV0ZTogMCB9O1xuXHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cblx0XHR0aGlzLmluaXRpYWxpemUoKTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBcImRhdGFcIiBPYmplY3QgZm9yIGVhY2ggZWxlbWVudCwgd2hpY2ggY29udGFpbnMgcG9zaXRpb24gaW5mb3JtYXRpb24gYXMgd2VsbFxuXHQgKiBhcyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIG5vZGUuIFRoZSBjYWxjdWxhdGF0aW9uIG5lZWRzIHRvIGJlIG1hZGUgXCJhcyBpZiBmcm9tIGFuIGluaXRpYWxcblx0ICogc2Nyb2xsIHBvc2l0aW9uIG9mIDBcIi5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0bGV0IEJDUiA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcdFx0Ly8gcmVtb3ZlIGFueSB0cmFuc2Zvcm1hdGlvbnMsIGFzIHdlIG5lZWQgXCJ1bi10cmFuc2Zvcm1lZFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBkYXRhIHRvIGNvbXB1dGUgdGhlIGVsZW1lbnQncyBpbml0aWFsIHBvc2l0aW9uLlxuXHRcdHRoaXMuZGF0YS5pbml0aWFsID0ge1xuXHRcdFx0dG9wOiBCQ1IudG9wICsgd2luZG93LnNjcm9sbFksXG5cdFx0XHRoZWlnaHQ6IEJDUi5oZWlnaHRcblx0XHR9O1xuXG5cdFx0dGhpcy5jYWxjdWxhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBwYXJhbXM6IGFueSBUV08gb2Y6IHN0YXJ0IC8gc3RvcCAvIGR1cmF0aW9uLlxuXHQgKiAgICAgICAgIHN0YXJ0OiBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IChlZy4gMC41KSBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24gKGVnIFsnI3RvZ2dsZScsIDAuM10gKVxuXHQgKiAgICAgICAgIHN0b3A6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgT1IgYSByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uXG5cdCAqICAgICAgICAgZHVyYXRpb246IHRoZSBkdXJhdGlvbiBpbiBwaXhlbHNcblx0ICpcblx0ICogICAgICAgICBkZWZhdWx0IGlzIDAgLSAxMDAlIChtYWtpbmcgZHVyYXRpb24gdGhlIHdpbmRvdyBoZWlnaHQgKyBlbGVtZW50IGhlaWdodClcblx0ICpcblx0ICogICAgICAgICBleGFtcGxlczpcblx0ICogICAgICAgICAgeyBzdGFydDogMCwgc3RvcDogMC41IH1cblx0ICogICAgICAgICAgeyBzdGFydDogMC4xLCBkdXJhdGlvbjogJzQwMHB4JyB9XG5cdCAqICAgICAgICAgIHsgZHVyYXRpb246IDEwMHB4LCBzdG9wOiAxLjAgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBzdG9wOiBbJyN0b2dnbGUnLCAwLjVdIH1cblx0ICogICAgICAgICAgeyBzdGFydDogWycjdG9nZ2xlJywgMC4zXSwgZHVyYXRpb246ICczMDBweCcgfVxuXHQgKlxuXHQgKiAgICAgICAgIGVhc2luZy4uLj8gc3RhcnQsIHRvLCBmcm9tLCBkdXJhdGlvblxuXHQgKlxuXHQgKi9cblx0c2NlbmUob3B0cykge1xuXHRcdGxldCBzdGFydCA9IG9wdHMuc3RhcnQgfHwgbnVsbDtcblx0XHRsZXQgZHVyYXRpb24gPSBvcHRzLmR1cmF0aW9uIHx8IG51bGw7XG5cdFx0bGV0IGVuZCA9IG9wdHMuZW5kIHx8IG51bGw7XG5cdFx0bGV0IHRvcDtcblxuXHRcdGlmIChkdXJhdGlvbiAmJiAhc3RhcnQpIHsgc3RhcnQgPSAoZW5kICogd2luZG93LmlubmVySGVpZ2h0IC0gZHVyYXRpb24pIC8gd2luZG93LmlubmVySGVpZ2h0OyB9XG5cdFx0aWYgKHN0YXJ0ICYmIEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG5cdFx0XHR0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0YXJ0WzBdKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdFx0XHRzdGFydCA9IHN0YXJ0WzFdXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvcCA9XHR0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXHRcdH1cblxuXHRcdC8vIGlmIChzdGFydCkge1xuXHRcdC8vIFx0aWYgKEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG5cdFx0Ly8gXHRcdHRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RhcnRbMF0pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0XHQvLyBcdFx0c3RhcnQgPSBzdGFydFsxXTtcblx0XHQvLyBcdH0gZWxzZSB7XG5cdFx0Ly8gXHR0b3AgPVx0ZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdGlmIChkdXJhdGlvbikge1xuXHRcdC8vIFx0XHRzdGFydCA9IChlbmQgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBkdXJhdGlvbikgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXG5cdFx0Ly9cblx0XHR0aGlzLnN0YXJ0ID0gKHN0YXJ0ICogd2luZG93LmlubmVySGVpZ2h0KSArIHRvcCArIHdpbmRvdy5zY3JvbGxZO1xuXHRcdHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbiA/IGR1cmF0aW9uIDogKHN0b3Atc3RhcnQpICogd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdC8vXG5cblx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBBZGQgYSBjdXN0b20gZWZmZWN0IHRvIFNjcm9sbGlmeS5cbiAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgdHJhbnNmb3JtYXRpb24gdG8gYWRkLlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZWZmZWN0OiBUaGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyB0aGUgdHJhbmZvcm1hdGlvbi5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGFkZEVmZmVjdChuYW1lLCBlZmZlY3QpIHtcblx0XHRlZmZlY3RMaXN0W25hbWVdID0gZWZmZWN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIFVzZSBhbiBwYXJ0aWN1bGFyIHRyYW5zZm9ybWF0aW9uIG9uIGFuIEVsZW1lbnQuXG4gICAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gbmFtZTogVGhlIG5hbWUgb2YgdGhlIHRyYW5zZm9ybWF0aW9uIE9SIGFuIGFjdHVhbCBmdW5jdGlvbiB0byBhcHBseS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zOiBBbnkgdHJhbnNmb3JtYXRpb24gb3B0aW9ucy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGRvKG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICBmbi5jYWxsKHRoaXMsIG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5lZmZlY3RzLnB1c2goY3VycnkoZWZmZWN0TGlzdFtuYW1lXSwgb3B0aW9ucykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uUmVzaXplKCkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpOyAgLy8gb3IuLiB1cGRhdGVTY2VuZS4uP1xuXHRcdC8vIHRoaXMudXBkYXRlKCk7XG5cdH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbiBvZiBldmVyeSBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuY2FsY3VsYXRlKCk7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB0cmFuc2Zvcm1hdGlvbiBvZiBlYWNoIGVsZW1lbnRcbiAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhOiBBbiBPYmplY3QgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhbmQgdGhlIGVsZW1lbnQgdG8gdWRwYXRlLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0Y2FsY3VsYXRlKCkge1xuXHRcdGxldCBkYXRhID0gdGhpcy5kYXRhO1xuXHRcdGxldCB3aW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5pbml0aWFsLnRvcCAtIHRoaXMuc2Nyb2xsO1xuXHRcdGxldCBoZWlnaHQgPSBkYXRhLmluaXRpYWwuaGVpZ2h0O1xuXHRcdGxldCBwcm9ncmVzcztcblxuXHRcdC8vIGRvbnQgZG8gbnV0aGluIHVudGlsIHRoaXMgaGVyZSB0aGluZyBpcyB3aXRoaW4gcmFuZ2UgKGllLiB0b3AgZWRnZSBwZWVrcyBvdXQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4pXG5cdFx0aWYgKHdpbkhlaWdodCA8IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgfHwgMCA+IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pIHsgcmV0dXJuOyB9IC8vIHVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhXG5cblx0XHQvLyBDYWxjdWxhdGUgaG93IGZhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGUgZWxlbWVudCBpcy4gXCIwXCIgaXMgd2hlbiB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGVsZW1lbnQgZmlyc3QgcGVla3Mgb3V0XG5cdFx0Ly8gZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCwgYW5kIFwiMVwiIGlzIHdoZW4gdGhlIGJvdHRvbSBlZGdlIGRpc2FwcGVhcnMgYmV5b25kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0OlxuXHRcdC8vIHBlcmNlbnQgPSBNYXRoLm1pbigxLCBzdGFydCAvIHdpbkhlaWdodCk7ICAgICAvLyAxIC0tPiAwXG5cdFx0cHJvZ3Jlc3MgPSAxIC0gKChzdGFydCArIGhlaWdodCkgLyAod2luSGVpZ2h0ICsgaGVpZ2h0KSk7XG5cblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdC8vIGRhdGEucGVyY2VudCA9IHBlcmNlbnQ7XG5cdFx0ZGF0YS5hYnNvbHV0ZSA9IHdpbkhlaWdodCAtIHN0YXJ0O1xuXHRcdGRhdGEucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydCAgICAgIHRvICBmcm9tICBlbmRcblx0XHQvLyBsZXQgZWFzaW5nID0gZWFzZUluT3V0UXVhZChkYXRhLnN0YXJ0LCAxMDAsIDAsIGRhdGEuc3RhcnQrZGF0YS5kdXJhdGlvbik7XG5cblx0XHQvLyBjeWNsZSB0aHJvdWdoIGFueSByZWdpc3RlcmVkIHRyYW5zZm9ybWF0aW9uc1xuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
