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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiLCJzcmMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozs7Ozs7O0FBT0EsSUFBSSxZQUFZLEtBQWhCO0FBQ0EsSUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELEVBQStELGFBQS9ELENBQW5CO0FBQ0EsS0FBSyxJQUFJLENBQVQsSUFBYyxVQUFkLEVBQTBCO0FBQ3pCLEtBQUssU0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixXQUFXLENBQVgsQ0FBcEIsTUFBdUMsU0FBNUMsRUFBdUQ7QUFDdEQsY0FBWSxXQUFXLENBQVgsQ0FBWjtBQUNBO0FBQ0E7QUFDRDs7Ozs7OztBQVFELElBQUksYUFBYTs7Ozs7Ozs7QUFPaEIsU0FQZ0Isb0JBT1AsSUFQTyxFQU9EO0FBQ2QsTUFBSSxTQUFTLENBQWI7O0FBRUEsTUFBSSxLQUFLLEtBQUwsS0FBZSxTQUFuQixFQUE4Qjs7QUFDN0IsWUFBUyxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUE5QjtBQUNBLEdBRkQsTUFFTzs7QUFDTixZQUFTLEtBQUssU0FBTCxJQUFrQixLQUFLLEtBQUwsSUFBYyxDQUFoQyxDQUFULEM7QUFDQTs7QUFFRCxPQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsU0FBZCxJQUEyQixrQkFBaUIsTUFBakIsR0FBeUIsS0FBcEQ7QUFDQSxFQWpCZTs7Ozs7Ozs7QUF3QmhCLE9BeEJnQixrQkF3QlQsSUF4QlMsRUF3Qkg7QUFDWixNQUFJLFFBQVEsT0FBTyxJQUFQLENBQVksSUFBWixDQUFaLEM7QUFDQSxNQUFJLEtBQUssS0FBSyxFQUFkO0FBQ0EsTUFBSSxNQUFNLEtBQUssUUFBZjs7QUFFQSxRQUFNLE9BQU4sQ0FBYyxVQUFTLElBQVQsRUFBZTtB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QUFBa0IsR0FBakU7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG4vLyBpbXBvcnQge2Vhc2VJbk91dEN1YmljfSBmcm9tICcuL2Vhc2luZ3MnO1xuaW1wb3J0IFN0aWNreSBmcm9tICcuL3N0aWNreSc7XG5cblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZWZmZWN0TGlzdCA9IHtcblxuXHQvKipcblx0ICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAgICogQHR5cGUge09iamVjdH0gb3B0czogWW91IG1heSBkZWZpbmUgcGFyYWxsYXggXCJzcGVlZFwiIG9yIHBhcmFsbGF4IFwicmFuZ2VcIiAoaW4gcGl4ZWxzKS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHBhcmFsbGF4KG9wdHMpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNwZWVkIGZpcnN0XG5cdFx0XHRvZmZzZXQgPSB0aGlzLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0XHR9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5wcm9ncmVzc3MgKiAob3B0cy5yYW5nZSB8fCAwKTsgIC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgJysgb2Zmc2V0ICsncHgpJztcblx0fSxcblxuXHQvKipcblx0ICogVG9nZ2xlIGEgY2xhc3Mgb24gb3Igb2ZmLlxuICAgKiBAdHlwZSB7T2JqZWN0fSBvcHRzOiBUaGUgXCJjbGFzc1wiIHRvIHRvZ2dsZSwgYW5kIHdoZW4gKGllLiBhdCB3aGljaCBwb2ludCBpbiB0aGUgcHJvZ3Jlc3MpXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR0b2dnbGUob3B0cykge1xuXHRcdGxldCB0aW1lcyA9IE9iamVjdC5rZXlzKG9wdHMpO1x0XHQvLyB0aW1lc1xuXHRcdGxldCBlbCA9IHRoaXMuZWw7XG5cdFx0bGV0IG5vdyA9IHRoaXMucHJvZ3Jlc3M7XG5cblx0XHR0aW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRcdGxldCBjc3MgPSBvcHRzW3RpbWVdO1xuXHRcdFx0aWYgKG5vdyA+IHRpbWUpIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBQaW4gYW4gZWxlbWVudCBmb3IgYSBzcGVjaWZpYyBkdXJhdGlvblxuXHQgKiAuLi4gd2hpbGUgdGhpcyB3b3JrcywgaXQgaXMgcHJldHR5IHVnbHkgYW5kIGNhbmRpZGF0ZSBmb3IgaW1wcm92ZW1lbnRcblx0ICovXG5cdFx0Ly8gcGluKG9wdHMpIHtcblx0XHQvLyAgbGV0IHdheXBvaW50cyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdC8vICBsZXQgcGVyY2VudCA9IHRoaXMucGVyY2VudCAqIDEwMDtcblxuXHRcdC8vICB3YXlwb2ludHMuZm9yRWFjaCh3aGVyZSA9PiB7XG5cdFx0Ly8gICAgaWYgKHBlcmNlbnQgPCBwYXJzZUludCh3aGVyZSkpIHtcblxuXHRcdC8vICAgICAgbGV0IGRpc3RhbmNlID0gb3B0c1t3aGVyZV07XG5cdFx0Ly8gICAgICBsZXQgYWJzb2x1dGUgPSB0aGlzLmFic29sdXRlO1xuXHRcdC8vICAgICAgdmFyIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcblx0XHQvLyAgICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudDtcblx0XHQvLyAgICAgIH0gZWxzZSB7XG5cdFx0Ly8gICAgICAgIGN1cnJlbnQgPSBhYnNvbHV0ZTtcblx0XHQvLyAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VycmVudDtcblx0XHQvLyAgICAgIH1cblxuXHRcdC8vICAgICAgbGV0IGVuZCA9IGN1cnJlbnQgKyBkaXN0YW5jZTsgLy8gKHRoaXMgYXNzdW1lcyBjdXJyZW50IHdpbGwgYmUgXCJmcm96ZW5cIiBhbmQgdW5jaGFuZ2VkIHdoaWxlIHBpbm5lZClcblx0XHQvLyAgICAgIGxldCBvZmZzZXQgPSBhYnNvbHV0ZSAtIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmIChhYnNvbHV0ZSA8IGVuZCkge1xuXHRcdC8vICAgICAgICB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdFx0Ly8gICAgICB9XG5cdFx0Ly8gICAgfSBlbHNlIHtcblx0XHQvLyAgICAgIC8vIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuXHRcdC8vICAgIH1cblx0XHQvLyAgfSk7XG5cdFx0Ly8gfSxcblxuXHQvKipcblx0ICogRHVtbXkgZWZmZWN0IGZvciB0ZXN0aW5nLCBhdCB0aGUgbW9tZW50XG5cdCAqL1xuICB0cmFuc2xhdGVYKG9wdHMpIHtcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZTtcbiAgICBsZXQgb24gPSBPYmplY3Qua2V5cyhvcHRzKTtcbiAgICBsZXQgZGVsYXkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHQvLyBzdGFydCB0cmFuc2xhdGluZyBhZnRlciBvbmUgd2luZG93LWhlaWdodCBvZiBzY3JvbGxpbmdcblxuICAgIG9mZnNldCAtPSBkZWxheTtcblxuICAgIC8vIGlmICh0aGlzLnBlcmNlbnQgPCAwLjUpIHsgICAgLy8gdGVzdDogc3RhcnQgdHJhbnNsYXRpbmcgd2hlbiBlbGVtZW50IGlzIGNlbnRlcmVkIGluIHZpZXdwb3J0XG4gICAgLy8gICBvZmZzZXQgLT0gZGVsYXk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIG9mZnNldCA9IDA7XG4gICAgLy8gfVxuXG4gICAgLy8gIGVhc2UgPSBlYXNlSW5RdWFkKGVsYXBzZWQsICAgICBzdGFydCwgZW5kLCBkdXJhdGlvbik7XG4gICAgbGV0IGRpc3RhbmNlID0gNTAwO1xuICAgIGxldCBlYXNlID0gZWFzZUluUXVhZCh0aGlzLnBlcmNlbnQgKiAxMDAsIDAsIGRpc3RhbmNlLCAxMDApO1xuXG4gICAgdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZTNkKCcgKyBlYXNlICsgJ3B4LCAwLCAwKSc7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PSBmYWxzZSkgeyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTsgfVxuXHRcdGlmICghZWxlbWVudCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5lZmZlY3RzID0gW107XG5cdFx0dGhpcy5kYXRhID0geyBlbDogZWxlbWVudCwgcHJvZ3Jlc3M6IDAsIGFic29sdXRlOiAwIH07XG5cdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIFwiZGF0YVwiIE9iamVjdCBmb3IgZWFjaCBlbGVtZW50LCB3aGljaCBjb250YWlucyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhcyB3ZWxsXG5cdCAqIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gbm9kZS4gVGhlIGNhbGN1bGF0YXRpb24gbmVlZHMgdG8gYmUgbWFkZSBcImFzIGlmIGZyb20gYW4gaW5pdGlhbFxuXHQgKiBzY3JvbGwgcG9zaXRpb24gb2YgMFwiLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHRsZXQgQkNSID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1x0XHQvLyByZW1vdmUgYW55IHRyYW5zZm9ybWF0aW9ucywgYXMgd2UgbmVlZCBcInVuLXRyYW5zZm9ybWVkXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGRhdGEgdG8gY29tcHV0ZSB0aGUgZWxlbWVudCdzIGluaXRpYWwgcG9zaXRpb24uXG5cdFx0dGhpcy5kYXRhLmluaXRpYWwgPSB7XG5cdFx0XHR0b3A6IEJDUi50b3AgKyB3aW5kb3cuc2Nyb2xsWSxcblx0XHRcdGhlaWdodDogQkNSLmhlaWdodFxuXHRcdH07XG5cblx0XHR0aGlzLmNhbGN1bGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHBhcmFtczogYW55IFRXTyBvZjogc3RhcnQgLyBzdG9wIC8gZHVyYXRpb24uXG5cdCAqICAgICAgICAgc3RhcnQ6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpIE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbiAoZWcgWycjdG9nZ2xlJywgMC4zXSApXG5cdCAqICAgICAgICAgc3RvcDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb25cblx0ICogICAgICAgICBkdXJhdGlvbjogdGhlIGR1cmF0aW9uIGluIHBpeGVsc1xuXHQgKlxuXHQgKiAgICAgICAgIGRlZmF1bHQgaXMgMCAtIDEwMCUgKG1ha2luZyBkdXJhdGlvbiB0aGUgd2luZG93IGhlaWdodCArIGVsZW1lbnQgaGVpZ2h0KVxuXHQgKlxuXHQgKiAgICAgICAgIGV4YW1wbGVzOlxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLCBzdG9wOiAwLjUgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLjEsIGR1cmF0aW9uOiAnNDAwcHgnIH1cblx0ICogICAgICAgICAgeyBkdXJhdGlvbjogMTAwcHgsIHN0b3A6IDEuMCB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIHN0b3A6IFsnI3RvZ2dsZScsIDAuNV0gfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBkdXJhdGlvbjogJzMwMHB4JyB9XG5cdCAqXG5cdCAqICAgICAgICAgZWFzaW5nLi4uPyBzdGFydCwgdG8sIGZyb20sIGR1cmF0aW9uXG5cdCAqXG5cdCAqL1xuXHRzY2VuZShvcHRzKSB7XG5cdFx0bGV0IHN0YXJ0ID0gb3B0cy5zdGFydCB8fCBudWxsO1xuXHRcdGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgbnVsbDtcblx0XHRsZXQgZW5kID0gb3B0cy5lbmQgfHwgbnVsbDtcblx0XHRsZXQgdG9wO1xuXG5cdFx0aWYgKGR1cmF0aW9uICYmICFzdGFydCkgeyBzdGFydCA9IChlbmQgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBkdXJhdGlvbikgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cblx0XHRpZiAoc3RhcnQgJiYgQXJyYXkuaXNBcnJheShzdGFydCkpIHtcblx0XHRcdHRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RhcnRbMF0pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0XHRcdHN0YXJ0ID0gc3RhcnRbMV1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9wID1cdHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgKHN0YXJ0KSB7XG5cdFx0Ly8gXHRpZiAoQXJyYXkuaXNBcnJheShzdGFydCkpIHtcblx0XHQvLyBcdFx0dG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFydFswXSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXHRcdC8vIFx0XHRzdGFydCA9IHN0YXJ0WzFdO1xuXHRcdC8vIFx0fSBlbHNlIHtcblx0XHQvLyBcdHRvcCA9XHRkYXRhLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0XHQvLyBcdH1cblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0aWYgKGR1cmF0aW9uKSB7XG5cdFx0Ly8gXHRcdHN0YXJ0ID0gKGVuZCAqIHdpbmRvdy5pbm5lckhlaWdodCAtIGR1cmF0aW9uKSAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cblx0XHQvL1xuXHRcdHRoaXMuc3RhcnQgPSAoc3RhcnQgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgdG9wICsgd2luZG93LnNjcm9sbFk7XG5cdFx0dGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uID8gZHVyYXRpb24gOiAoc3RvcC1zdGFydCkgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0Ly9cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGN1c3RvbSBlZmZlY3QgdG8gU2Nyb2xsaWZ5LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiB0byBhZGQuXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBlZmZlY3Q6IFRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSB0cmFuZm9ybWF0aW9uLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0YWRkRWZmZWN0KG5hbWUsIGVmZmVjdCkge1xuXHRcdGVmZmVjdExpc3RbbmFtZV0gPSBlZmZlY3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogVXNlIGFuIHBhcnRpY3VsYXIgdHJhbnNmb3JtYXRpb24gb24gYW4gRWxlbWVudC5cbiAgICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgdHJhbnNmb3JtYXRpb24gT1IgYW4gYWN0dWFsIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnM6IEFueSB0cmFuc2Zvcm1hdGlvbiBvcHRpb25zLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0ZG8obmFtZSwgb3B0aW9ucykge1xuXHRcdGxldCBjdXJyeSA9IChmbiwgb3B0aW9ucykgPT4ge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyAgICAgICAvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG4gICAgICAgIGZuLmNhbGwodGhpcywgb3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVmZmVjdHMucHVzaChjdXJyeShlZmZlY3RMaXN0W25hbWVdLCBvcHRpb25zKSk7XG5cblx0XHRpZiAobmFtZSA9PSAnc3RpY2snKSB7XG5cdFx0XHRuZXcgU3RpY2t5KHRoaXMuZWxlbWVudCwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuICAvKipcbiAgICogb25TY3JvbGwgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0b25TY3JvbGwoKSB7XG5cdFx0aWYgKCF0aGlzLnRpY2tpbmcpIHtcblx0XHRcdHRoaXMudGlja2luZyA9IHRydWU7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR9XG5cdH1cblxuICAvKipcbiAgICogb25SZXNpemUgSGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKCk7ICAvLyBvci4uIHVwZGF0ZVNjZW5lLi4/XG5cdFx0Ly8gdGhpcy51cGRhdGUoKTtcblx0fVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIGV2ZXJ5IGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5jYWxjdWxhdGUoKTtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0fVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIGVhY2ggZWxlbWVudFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGE6IEFuIE9iamVjdCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFuZCB0aGUgZWxlbWVudCB0byB1ZHBhdGUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHRjYWxjdWxhdGUoKSB7XG5cdFx0bGV0IGRhdGEgPSB0aGlzLmRhdGE7XG5cdFx0bGV0IHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRsZXQgc3RhcnQgPSBkYXRhLmluaXRpYWwudG9wIC0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IGhlaWdodCA9IGRhdGEuaW5pdGlhbC5oZWlnaHQ7XG5cdFx0bGV0IHByb2dyZXNzO1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHRpZiAod2luSGVpZ2h0IDwgdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCB8fCAwID4gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSkgeyByZXR1cm47IH0gLy8gdXNlICphY3R1YWwqIHBvc2l0aW9uIGRhdGFcblxuXHRcdC8vIENhbGN1bGF0ZSBob3cgZmFyIGFjcm9zcyB0aGUgc2NyZWVuIHRoZSBlbGVtZW50IGlzLiBcIjBcIiBpcyB3aGVuIHRoZSB0b3AgZWRnZSBvZiB0aGUgZWxlbWVudCBmaXJzdCBwZWVrcyBvdXRcblx0XHQvLyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0LCBhbmQgXCIxXCIgaXMgd2hlbiB0aGUgYm90dG9tIGVkZ2UgZGlzYXBwZWFycyBiZXlvbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQ6XG5cdFx0Ly8gcGVyY2VudCA9IE1hdGgubWluKDEsIHN0YXJ0IC8gd2luSGVpZ2h0KTsgICAgIC8vIDEgLS0+IDBcblx0XHRwcm9ncmVzcyA9IDEgLSAoKHN0YXJ0ICsgaGVpZ2h0KSAvICh3aW5IZWlnaHQgKyBoZWlnaHQpKTtcblxuXG5cdFx0Ly8gdXBkYXRlIGRhdGEgT2JqZWN0XG5cdFx0Ly8gZGF0YS5wZXJjZW50ID0gcGVyY2VudDtcblx0XHRkYXRhLmFic29sdXRlID0gd2luSGVpZ2h0IC0gc3RhcnQ7XG5cdFx0ZGF0YS5wcm9ncmVzcyA9IHByb2dyZXNzO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHN0YXJ0ICAgICAgdG8gIGZyb20gIGVuZFxuXHRcdC8vIGxldCBlYXNpbmcgPSBlYXNlSW5PdXRRdWFkKGRhdGEuc3RhcnQsIDEwMCwgMCwgZGF0YS5zdGFydCtkYXRhLmR1cmF0aW9uKTtcblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0dGhpcy5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4geyBlZmZlY3QuY2FsbChkYXRhKSB9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBQdXQgQ2Fyb3VzZWwgaW50byB0aGUgR2xvYmFsIHNjb3BlLlxuICogVXNlZnVsIGZvciBleGlzdGluZyBkZW1vcyBvciBpZiB5b3Ugd2lzaCB0byBpbmNsdWRlIG1hbnVhbGx5XG4gKi9cbmltcG9ydCBzY3JvbGxpZnkgZnJvbSAnLi9zY3JvbGxpZnkuanMnO1xud2luZG93LlNjcm9sbGlmeSA9IHNjcm9sbGlmeTtcbiIsIi8qXG4gKiBTdGlja3lcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvLi4uLj9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIDIwMTYgV2VzIEhhdGNoXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKlxuICovXG5cbi8qZ2xvYmFsIGRvY3VtZW50IHJlcXVlc3RBbmltYXRpb25GcmFtZSBIVE1MRWxlbWVudCovXG5cblxuLyoqXG4gKiBTdGlja3kgRWxlbWVudDogc2V0cyB1cCBhIHN0aWNreSBiYXIgd2hpY2ggYXR0YWNoZXMgLyBkZXRhY2hlcyB0byB0b3Agb2Ygdmlld3BvcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0aWNreTogVGhlIGVsZW1lbnQgdG8gc3RpY2t5LWlmeVxuICogQHBhcmFtIHtCb29sZWFufSBib3VuZGVkOiBXaGV0aGVyIHRvIGFwcGx5IHN0aWNraW5lc3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFyZW50IGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0aWNreShzdGlja3ksIGJvdW5kZWQpIHtcbiAgc3RpY2t5ID0gc3RpY2t5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBzdGlja3kgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreSk7XG4gIGJvdW5kZWQgPSBib3VuZGVkIHx8IHN0aWNreS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYm91bmRlZCcpIHx8IGZhbHNlO1xuXG4gIGlmICghc3RpY2t5KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHZhciBwYXJlbnQgPSBzdGlja3kucGFyZW50Tm9kZSxcbiAgICBzdGlja3lQb3NpdGlvbixcbiAgICBwYXJlbnRQb3NpdGlvbixcbiAgICBjdXJyZW50U3RhdGUgPSAnXycsXG4gICAgc3RhdGVTd2l0Y2hlcixcbiAgICBkZXRlcm1pbmUgPSB7XG4gICAgICBub3JtYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA8IDEpIHsgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTsgfVxuICAgICAgfSxcbiAgICAgIHN0aWNreTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcmVudFBvc2l0aW9uID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAocGFyZW50UG9zaXRpb24udG9wID4gMSkgeyByZXR1cm4gc2V0U3RhdGUoJ25vcm1hbCcpOyB9XG4gICAgICAgIGlmICghYm91bmRlZCkgeyByZXR1cm47IH0gICAvLyBkb24ndCB3b3JyeSBhYm91dCBib3R0b20gZWRnZVxuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLmJvdHRvbSA8IHN0aWNreVBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiBzZXRTdGF0ZSgnYm90dG9tJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA+IDEpIHsgcmV0dXJuIHNldFN0YXRlKCdzdGlja3knKTsgfVxuICAgICAgfVxuICAgIH07XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBzdGF0ZSkgeyByZXR1cm47IH1cbiAgICBzdGlja3kuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50U3RhdGUpO1xuICAgIHN0aWNreS5jbGFzc0xpc3QuYWRkKHN0YXRlKTtcbiAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICBzdGF0ZVN3aXRjaGVyID0gZGV0ZXJtaW5lW3N0YXRlXTtcbiAgfVxuXG4gIHN0aWNreVBvc2l0aW9uID0gc3RpY2t5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIC8vc3RpY2t5IGluaXRpYWwgcG9zaXRpb25cbiAgaWYgKHN0aWNreVBvc2l0aW9uLnRvcCA8IDEpIHtcbiAgICBzZXRTdGF0ZSgnc3RpY2t5Jyk7XG4gICAgc3RhdGVTd2l0Y2hlcigpOyAgICAvLyBlZGdlIGNhc2U6IGNoZWNrIGlmIGJvdHRvbSBvZiBzdGlja3kgY29sbGlkZXMgdy8gYm91bmRpbmcgY29udGFpbmVyXG4gIH0gZWxzZSB7XG4gICAgc2V0U3RhdGUoJ25vcm1hbCcpO1xuICB9XG5cblxuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGVTd2l0Y2hlcik7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTsgIC8vIHN0YXRlU3dpdGNoZXIgY2hhbmdlcywgc28gY2Fubm90IHBhc3MgKGllLiBiaW5kIGRpcmVjdGx5KSBoZXJlXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHsgc3RhdGVTd2l0Y2hlcigpOyB9KTtcbn1cblxuIl19
