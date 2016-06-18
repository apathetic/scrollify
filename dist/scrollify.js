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

	parallax: function parallax(data) {
		var offset = 0;
		var opts = this.options;

		if (opts.speed !== undefined) {
			// check speed first
			offset = data.absolute * opts.speed;
		} else {
			// fallback to range
			offset = data.progress * (opts.range || 0); // default is "0", no effect
		}

		this.element.style[transform] = 'translate(0, ' + offset + 'px)';
	},


	/**
  * Toggle a class on or off.
   * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
  * @this: an object containing Options + element reference
  * @return {void}
  */
	toggle: function toggle(data) {
		var opts = this.options;
		var element = this.element;
		var times = Object.keys(opts); // times
		var now = data.progress;

		times.forEach(function (time) {
			var css = opts[time];
			if (now > time) {
				element.classList.add(css);
			} else {
				element.classList.remove(css);
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
	function Scrollify(element, debug) {
		var _this = this;

		_classCallCheck(this, Scrollify);

		if (element instanceof HTMLElement == false) {
			element = document.querySelector(element);
		}
		if (!element || !transform) {
			return false;
		}

		this.trigger = element; // by default. Update if there is a Scene with a particular trigger element
		this.element = element;
		this.ticking = false;
		this.scenes = [];
		this.effects = [];
		this.data = { el: element, progress: 0, absolute: 0 };
		this.scroll = window.scrollY;
		this.debug = debug;

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
   * @param  {Number} where: The location to start the effect. 1 is bottom, 0 is top of viewport.
  * @return {void}
  */


	_createClass(Scrollify, [{
		key: 'initializeScene',
		value: function initializeScene(trigger) {
			var where = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
			// default: start where they appear on screen, at bottom
			var BCR = this.trigger.getBoundingClientRect();
			var top = 0; // window.scrollY;
			// let trigger = this.trigger;

			// this.element.style.transform = '';		// remove any transformations, as we need "un-transformed"
			// data to compute the element's initial position.

			// find position in the document:
			do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
			} while (trigger);

			this.start = top - where * window.innerHeight;
			this.duration = window.innerHeight + this.trigger.offsetHeight;

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
			var effect = opts.with;

			if (!start) {
				conosle.log('missing start');return;
			}

			// if (duration && end && !start) {
			// 	start = (end * window.innerHeight - duration);

			if (Array.isArray(start)) {
				this.target = document.querySelector(start[0]);
				this.initialize(start[1]);
			}

			if (duration) {
				this.duration = duration;
			}

			this.scenes.push({
				'start': start,
				'duration': duration

			});

			return this;
		}

		/**
   * Add a custom effect to Scrollify.
   * @param  {String} name: The name of the transformation to add.
   * @param  {Function} effect: The function that produces the tranformation.
   * @return {void}
   */
		// TODO use 'with' and type-check arguments for Function

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
		key: 'with',
		value: function _with(name, options) {
			var element = this.element;
			var curry = function curry(fn, options) {
				return function () {
					// NOTE: don't use => function here as we do NOT want to bind "this"
					// fn.call(this, options); // eslint-disable-line
					var context = {
						'options': options,
						'element': element
					};
					fn.call(context, this); // eslint-disable-line
				};
			};

			this.effects.push(curry(effectList[name], options));

			if (name == 'stick') {
				new _sticky2.default(this.element, true);
			}

			this.initializeScene(element);

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
			// this.throttle(this.initializeScene);
			this.initializeScene(); // or.. updateScene..?
			// this.update();
		}

		/**
   * Limit frequency of DOM updates on resize
   */

	}, {
		key: 'throttle',
		value: function throttle() {}

		/**
   * Update the transformation of every element.
   * @return {void}
   */

	}, {
		key: 'update',
		value: function update() {
			// this.scenes.forEach((scene) => this.calculate(scene));
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
		value: function calculate(scene) {
			var data = this.data;
			var start = this.start;
			var duration = this.duration;
			var scroll = this.scroll;
			var progress = (scroll - start) / duration;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			// if (progress < 0 || progress > 1) { return; }

			// Use *actual* position data. An element may be onscreen while its reference (trigger) element is not.
			if (data.el.getBoundingClientRect().top > window.innerHeight || data.el.getBoundingClientRect().bottom < 0) {
				return;
			}

			// update data Object
			// data.absolute = scroll - start;
			// data.progress = progress;

			if (this.debug) {
				console.log(this.debug, progress);
			}

			// start      to  from  end
			// let easing = easeInOutQuad(data.start, 100, 0, data.start+data.duration);

			// cycle through any registered transformations
			// this.effects.forEach((effect) => { effect.call(data) });
			this.effects.forEach(function (effect) {
				effect.call({
					'progress': progress,
					'absolute': scroll - start
				});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiLCJzcmMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozs7Ozs7O0FBT0EsSUFBSSxZQUFZLEtBQVo7QUFDSixJQUFNLGFBQWEsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsY0FBakMsRUFBaUQsWUFBakQsRUFBK0QsYUFBL0QsQ0FBYjtBQUNOLEtBQUssSUFBSSxDQUFKLElBQVMsVUFBZCxFQUEwQjtBQUN6QixLQUFLLFNBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsV0FBVyxDQUFYLENBQXBCLE1BQXVDLFNBQXZDLEVBQWtEO0FBQ3RELGNBQVksV0FBVyxDQUFYLENBQVosQ0FEc0Q7QUFFdEQsUUFGc0Q7RUFBdkQ7Q0FERDs7Ozs7OztBQWFBLElBQUksYUFBYTs7Ozs7Ozs7QUFPaEIsNkJBQVMsTUFBTTtBQUNkLE1BQUksU0FBUyxDQUFULENBRFU7QUFFZCxNQUFJLE9BQU8sS0FBSyxPQUFMLENBRkc7O0FBSWQsTUFBSSxLQUFLLEtBQUwsS0FBZSxTQUFmLEVBQTBCOztBQUM3QixZQUFTLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQUwsQ0FESTtHQUE5QixNQUVPOztBQUNOLFlBQVMsS0FBSyxRQUFMLElBQWlCLEtBQUssS0FBTCxJQUFjLENBQWQsQ0FBakI7QUFESCxHQUZQOztBQU1BLE9BQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsU0FBbkIsSUFBZ0Msa0JBQWlCLE1BQWpCLEdBQXlCLEtBQXpCLENBVmxCO0VBUEM7Ozs7Ozs7OztBQTBCaEIseUJBQU8sTUFBTTtBQUNaLE1BQUksT0FBTyxLQUFLLE9BQUwsQ0FEQztBQUVaLE1BQUksVUFBVSxLQUFLLE9BQUwsQ0FGRjtBQUdaLE1BQUksUUFBUSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQVI7QUFI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QixVQUFJLGVBQWUsR0FBZixHQUFxQixDQUFyQixFQUF3QjtBQUFFLGVBQU8sU0FBUyxRQUFULENBQVAsQ0FBRjtPQUE1QjtLQUZNO0dBZFYsQ0FYNEM7O0FBK0I5QyxXQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdkIsUUFBSSxpQkFBaUIsS0FBakIsRUFBd0I7QUFBRSxhQUFGO0tBQTVCO0FBQ0EsWUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFlBQXhCLEVBRnVCO0FBR3ZCLFlBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixLQUFyQixFQUh1QjtBQUl2QixtQkFBZSxLQUFmLENBSnVCO0FBS3ZCLG9CQUFnQixVQUFVLEtBQVYsQ0FBaEIsQ0FMdUI7R0FBekI7O0FBUUEsbUJBQWlCLFFBQU8scUJBQVAsRUFBakI7OztBQXZDOEMsTUEwQzFDLGVBQWUsR0FBZixHQUFxQixDQUFyQixFQUF3QjtBQUMxQixhQUFTLFFBQVQsRUFEMEI7QUFFMUI7QUFGMEIsR0FBNUIsTUFHTztBQUNMLGVBQVMsUUFBVCxFQURLO0tBSFA7OztBQTFDOEMsUUFtRDlDLENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUFFLG9CQUFGO0dBQVgsQ0FBbEM7QUFuRDhDLFFBb0Q5QyxDQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVc7QUFBRSxvQkFBRjtHQUFYLENBQWxDLENBcEQ4QztDQUFqQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG4vLyBUT0RPIGFkZCB3ZWFrbWFwIHN1cHBvcnQgZm9yIHB1YmxpYyAvIHByaXZhdGUgbWV0aG9kc1xuXG4vLyBpbXBvcnQge2Vhc2VJbk91dEN1YmljfSBmcm9tICcuL2Vhc2luZ3MnO1xuaW1wb3J0IFN0aWNreSBmcm9tICcuL3N0aWNreSc7XG5cblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbjogQ1NTIHRyYW5zZm9ybXNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG52YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5jb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG5mb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlW3RyYW5zZm9ybXNbaV1dICE9PSB1bmRlZmluZWQpIHtcblx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Ygc29tZSBkZWZhdWx0IFwidHJhbnNmb3JtYXRpb25zXCIgdGhhdCBtYXkgYmUgYXBwbGllZFxuICogTk9URTogZG9uJ3QgdXNlIGFycm93IGZuJ3MgaGVyZSBhcyB0aGV5IHByb3h5IFwidGhpc1wiXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZWZmZWN0TGlzdCA9IHtcblxuXHQvKipcblx0ICogUGFyYWxsYXggYW4gZWxlbWVudC5cbiAgICogQHR5cGUge09iamVjdH0gb3B0czogWW91IG1heSBkZWZpbmUgcGFyYWxsYXggXCJzcGVlZFwiIG9yIHBhcmFsbGF4IFwicmFuZ2VcIiAoaW4gcGl4ZWxzKS5cblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHBhcmFsbGF4KGRhdGEpIHtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblx0XHRsZXQgb3B0cyA9IHRoaXMub3B0aW9ucztcblxuXHRcdGlmIChvcHRzLnNwZWVkICE9PSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNwZWVkIGZpcnN0XG5cdFx0XHRvZmZzZXQgPSBkYXRhLmFic29sdXRlICogb3B0cy5zcGVlZDtcblx0XHR9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byByYW5nZVxuXHRcdFx0b2Zmc2V0ID0gZGF0YS5wcm9ncmVzcyAqIChvcHRzLnJhbmdlIHx8IDApOyAgIC8vIGRlZmF1bHQgaXMgXCIwXCIsIG5vIGVmZmVjdFxuXHRcdH1cblxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZSgwLCAnKyBvZmZzZXQgKydweCknO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgYSBjbGFzcyBvbiBvciBvZmYuXG4gICAqIEB0eXBlIHtPYmplY3R9IG9wdHM6IFRoZSBcImNsYXNzXCIgdG8gdG9nZ2xlLCBhbmQgd2hlbiAoaWUuIGF0IHdoaWNoIHBvaW50IGluIHRoZSBwcm9ncmVzcylcblx0ICogQHRoaXM6IGFuIG9iamVjdCBjb250YWluaW5nIE9wdGlvbnMgKyBlbGVtZW50IHJlZmVyZW5jZVxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dG9nZ2xlKGRhdGEpIHtcblx0XHRsZXQgb3B0cyA9IHRoaXMub3B0aW9ucztcblx0XHRsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblx0XHRsZXQgdGltZXMgPSBPYmplY3Qua2V5cyhvcHRzKTtcdFx0Ly8gdGltZXNcblx0XHRsZXQgbm93ID0gZGF0YS5wcm9ncmVzcztcblxuXHRcdHRpbWVzLmZvckVhY2goZnVuY3Rpb24odGltZSkge1xuXHRcdFx0bGV0IGNzcyA9IG9wdHNbdGltZV07XG5cdFx0XHRpZiAobm93ID4gdGltZSkge1xuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBQaW4gYW4gZWxlbWVudCBmb3IgYSBzcGVjaWZpYyBkdXJhdGlvblxuXHQgKiAuLi4gd2hpbGUgdGhpcyB3b3JrcywgaXQgaXMgcHJldHR5IHVnbHkgYW5kIGNhbmRpZGF0ZSBmb3IgaW1wcm92ZW1lbnRcblx0ICovXG5cdFx0Ly8gcGluKG9wdHMpIHtcblx0XHQvLyAgbGV0IHdheXBvaW50cyA9IE9iamVjdC5rZXlzKG9wdHMpO1xuXHRcdC8vICBsZXQgcGVyY2VudCA9IHRoaXMucGVyY2VudCAqIDEwMDtcblxuXHRcdC8vICB3YXlwb2ludHMuZm9yRWFjaCh3aGVyZSA9PiB7XG5cdFx0Ly8gICAgaWYgKHBlcmNlbnQgPCBwYXJzZUludCh3aGVyZSkpIHtcblxuXHRcdC8vICAgICAgbGV0IGRpc3RhbmNlID0gb3B0c1t3aGVyZV07XG5cdFx0Ly8gICAgICBsZXQgYWJzb2x1dGUgPSB0aGlzLmFic29sdXRlO1xuXHRcdC8vICAgICAgdmFyIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcblx0XHQvLyAgICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudDtcblx0XHQvLyAgICAgIH0gZWxzZSB7XG5cdFx0Ly8gICAgICAgIGN1cnJlbnQgPSBhYnNvbHV0ZTtcblx0XHQvLyAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VycmVudDtcblx0XHQvLyAgICAgIH1cblxuXHRcdC8vICAgICAgbGV0IGVuZCA9IGN1cnJlbnQgKyBkaXN0YW5jZTsgLy8gKHRoaXMgYXNzdW1lcyBjdXJyZW50IHdpbGwgYmUgXCJmcm96ZW5cIiBhbmQgdW5jaGFuZ2VkIHdoaWxlIHBpbm5lZClcblx0XHQvLyAgICAgIGxldCBvZmZzZXQgPSBhYnNvbHV0ZSAtIGN1cnJlbnQ7XG5cblx0XHQvLyAgICAgIGlmIChhYnNvbHV0ZSA8IGVuZCkge1xuXHRcdC8vICAgICAgICB0aGlzLmVsLnN0eWxlW3RyYW5zZm9ybV0gPSAndHJhbnNsYXRlKDAsICcrIG9mZnNldCArJ3B4KSc7XG5cdFx0Ly8gICAgICB9XG5cdFx0Ly8gICAgfSBlbHNlIHtcblx0XHQvLyAgICAgIC8vIHRoaXMuZWwuc3R5bGVbdHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuXHRcdC8vICAgIH1cblx0XHQvLyAgfSk7XG5cdFx0Ly8gfSxcblxuXHQvKipcblx0ICogRHVtbXkgZWZmZWN0IGZvciB0ZXN0aW5nLCBhdCB0aGUgbW9tZW50XG5cdCAqL1xuICB0cmFuc2xhdGVYKG9wdHMpIHtcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZTtcbiAgICBsZXQgb24gPSBPYmplY3Qua2V5cyhvcHRzKTtcbiAgICBsZXQgZGVsYXkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHQvLyBzdGFydCB0cmFuc2xhdGluZyBhZnRlciBvbmUgd2luZG93LWhlaWdodCBvZiBzY3JvbGxpbmdcblxuICAgIG9mZnNldCAtPSBkZWxheTtcblxuICAgIC8vIGlmICh0aGlzLnBlcmNlbnQgPCAwLjUpIHsgICAgLy8gdGVzdDogc3RhcnQgdHJhbnNsYXRpbmcgd2hlbiBlbGVtZW50IGlzIGNlbnRlcmVkIGluIHZpZXdwb3J0XG4gICAgLy8gICBvZmZzZXQgLT0gZGVsYXk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIG9mZnNldCA9IDA7XG4gICAgLy8gfVxuXG4gICAgLy8gIGVhc2UgPSBlYXNlSW5RdWFkKGVsYXBzZWQsICAgICBzdGFydCwgZW5kLCBkdXJhdGlvbik7XG4gICAgbGV0IGRpc3RhbmNlID0gNTAwO1xuICAgIGxldCBlYXNlID0gZWFzZUluUXVhZCh0aGlzLnBlcmNlbnQgKiAxMDAsIDAsIGRpc3RhbmNlLCAxMDApO1xuXG4gICAgdGhpcy5lbC5zdHlsZVt0cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZTNkKCcgKyBlYXNlICsgJ3B4LCAwLCAwKSc7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBTY3JvbGxpZnkgQ2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBkZWJ1Zykge1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT0gZmFsc2UpIHsgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7IH1cblx0XHRpZiAoIWVsZW1lbnQgfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLnRyaWdnZXIgPSBlbGVtZW50O1x0XHQvLyBieSBkZWZhdWx0LiBVcGRhdGUgaWYgdGhlcmUgaXMgYSBTY2VuZSB3aXRoIGEgcGFydGljdWxhciB0cmlnZ2VyIGVsZW1lbnRcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2NlbmVzID0gW107XG5cdFx0dGhpcy5lZmZlY3RzID0gW107XG5cdFx0dGhpcy5kYXRhID0geyBlbDogZWxlbWVudCwgcHJvZ3Jlc3M6IDAsIGFic29sdXRlOiAwIH07XG5cdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR0aGlzLmRlYnVnID0gZGVidWc7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGUpID0+IHRoaXMub25TY3JvbGwoZSkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgXCJkYXRhXCIgT2JqZWN0IGZvciBlYWNoIGVsZW1lbnQsIHdoaWNoIGNvbnRhaW5zIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFzIHdlbGxcblx0ICogYXMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBub2RlLiBUaGUgY2FsY3VsYXRhdGlvbiBuZWVkcyB0byBiZSBtYWRlIFwiYXMgaWYgZnJvbSBhbiBpbml0aWFsXG5cdCAqIHNjcm9sbCBwb3NpdGlvbiBvZiAwXCIuXG4gICAqIEBwYXJhbSAge051bWJlcn0gd2hlcmU6IFRoZSBsb2NhdGlvbiB0byBzdGFydCB0aGUgZWZmZWN0LiAxIGlzIGJvdHRvbSwgMCBpcyB0b3Agb2Ygdmlld3BvcnQuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRpbml0aWFsaXplU2NlbmUodHJpZ2dlciwgd2hlcmUgPSAxKSB7XHRcdC8vIGRlZmF1bHQ6IHN0YXJ0IHdoZXJlIHRoZXkgYXBwZWFyIG9uIHNjcmVlbiwgYXQgYm90dG9tXG5cdFx0bGV0IEJDUiA9IHRoaXMudHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgdG9wID0gMDtcdC8vIHdpbmRvdy5zY3JvbGxZO1xuICAgIC8vIGxldCB0cmlnZ2VyID0gdGhpcy50cmlnZ2VyO1xuXG5cdFx0Ly8gdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1x0XHQvLyByZW1vdmUgYW55IHRyYW5zZm9ybWF0aW9ucywgYXMgd2UgbmVlZCBcInVuLXRyYW5zZm9ybWVkXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZGF0YSB0byBjb21wdXRlIHRoZSBlbGVtZW50J3MgaW5pdGlhbCBwb3NpdGlvbi5cblxuXHRcdC8vIGZpbmQgcG9zaXRpb24gaW4gdGhlIGRvY3VtZW50OlxuICAgIGRvIHtcbiAgICAgICAgdG9wICs9IHRyaWdnZXIub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgIHRyaWdnZXIgPSB0cmlnZ2VyLm9mZnNldFBhcmVudDtcbiAgICB9IHdoaWxlKHRyaWdnZXIpO1xuXG5cdFx0dGhpcy5zdGFydCA9IHRvcCAtICh3aGVyZSAqIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0dGhpcy5kdXJhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCArIHRoaXMudHJpZ2dlci5vZmZzZXRIZWlnaHQ7XG5cblx0XHR0aGlzLmNhbGN1bGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHBhcmFtczogYW55IFRXTyBvZjogc3RhcnQgLyBzdG9wIC8gZHVyYXRpb24uXG5cdCAqICAgICAgICAgc3RhcnQ6IGEgcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgKGVnLiAwLjUpIE9SIGEgcmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbiAoZWcgWycjdG9nZ2xlJywgMC4zXSApXG5cdCAqICAgICAgICAgc3RvcDogYSBwZXJjZW50YWdlIG9mIHRoZSB2aWV3cG9ydCBPUiBhIHJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb25cblx0ICogICAgICAgICBkdXJhdGlvbjogdGhlIGR1cmF0aW9uIGluIHBpeGVsc1xuXHQgKlxuXHQgKiAgICAgICAgIGRlZmF1bHQgaXMgMCAtIDEwMCUgKG1ha2luZyBkdXJhdGlvbiB0aGUgd2luZG93IGhlaWdodCArIGVsZW1lbnQgaGVpZ2h0KVxuXHQgKlxuXHQgKiAgICAgICAgIGV4YW1wbGVzOlxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLCBzdG9wOiAwLjUgfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiAwLjEsIGR1cmF0aW9uOiAnNDAwcHgnIH1cblx0ICogICAgICAgICAgeyBkdXJhdGlvbjogMTAwcHgsIHN0b3A6IDEuMCB9XG5cdCAqICAgICAgICAgIHsgc3RhcnQ6IFsnI3RvZ2dsZScsIDAuM10sIHN0b3A6IFsnI3RvZ2dsZScsIDAuNV0gfVxuXHQgKiAgICAgICAgICB7IHN0YXJ0OiBbJyN0b2dnbGUnLCAwLjNdLCBkdXJhdGlvbjogJzMwMHB4JyB9XG5cdCAqXG5cdCAqICAgICAgICAgZWFzaW5nLi4uPyBzdGFydCwgdG8sIGZyb20sIGR1cmF0aW9uXG5cdCAqXG5cdCAqL1xuXHRzY2VuZShvcHRzKSB7XG5cdFx0bGV0IHN0YXJ0ID0gb3B0cy5zdGFydCB8fCBudWxsO1xuXHRcdGxldCBkdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgbnVsbDtcblx0XHRsZXQgZWZmZWN0ID0gb3B0cy53aXRoO1xuXG5cdFx0aWYgKCFzdGFydCkgeyBjb25vc2xlLmxvZygnbWlzc2luZyBzdGFydCcpOyByZXR1cm47IH1cblxuXHRcdC8vIGlmIChkdXJhdGlvbiAmJiBlbmQgJiYgIXN0YXJ0KSB7XG5cdFx0Ly8gXHRzdGFydCA9IChlbmQgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBkdXJhdGlvbik7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShzdGFydCkpIHtcblx0XHRcdHRoaXMudGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFydFswXSk7XG5cdFx0XHR0aGlzLmluaXRpYWxpemUoc3RhcnRbMV0pO1xuXHRcdH1cblxuXHRcdGlmIChkdXJhdGlvbikge1xuXHRcdCAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHRoaXMuc2NlbmVzLnB1c2goe1xuXHRcdFx0J3N0YXJ0Jzogc3RhcnQsXG5cdFx0XHQnZHVyYXRpb24nOiBkdXJhdGlvblxuXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBBZGQgYSBjdXN0b20gZWZmZWN0IHRvIFNjcm9sbGlmeS5cbiAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgdHJhbnNmb3JtYXRpb24gdG8gYWRkLlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZWZmZWN0OiBUaGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyB0aGUgdHJhbmZvcm1hdGlvbi5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gICAvLyBUT0RPIHVzZSAnd2l0aCcgYW5kIHR5cGUtY2hlY2sgYXJndW1lbnRzIGZvciBGdW5jdGlvblxuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG4gIC8qKlxuICAgKiBVc2UgYW4gcGFydGljdWxhciB0cmFuc2Zvcm1hdGlvbiBvbiBhbiBFbGVtZW50LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8RnVuY3Rpb259IG5hbWU6IFRoZSBuYW1lIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiBPUiBhbiBhY3R1YWwgZnVuY3Rpb24gdG8gYXBwbHkuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uczogQW55IHRyYW5zZm9ybWF0aW9uIG9wdGlvbnMuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXHR3aXRoKG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgICAgICAgLy8gTk9URTogZG9uJ3QgdXNlID0+IGZ1bmN0aW9uIGhlcmUgYXMgd2UgZG8gTk9UIHdhbnQgdG8gYmluZCBcInRoaXNcIlxuICAgICAgICAvLyBmbi5jYWxsKHRoaXMsIG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICBcdCdvcHRpb25zJzogb3B0aW9ucyxcbiAgICAgICAgXHQnZWxlbWVudCc6IGVsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZWZmZWN0cy5wdXNoKGN1cnJ5KGVmZmVjdExpc3RbbmFtZV0sIG9wdGlvbnMpKTtcblxuXHRcdGlmIChuYW1lID09ICdzdGljaycpIHtcblx0XHRcdG5ldyBTdGlja3kodGhpcy5lbGVtZW50LCB0cnVlKTtcblx0XHR9XG5cblx0XHR0aGlzLmluaXRpYWxpemVTY2VuZShlbGVtZW50KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbiAgLyoqXG4gICAqIG9uU2Nyb2xsIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplIEhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdG9uUmVzaXplKCkge1xuXHRcdC8vIHRoaXMudGhyb3R0bGUodGhpcy5pbml0aWFsaXplU2NlbmUpO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZVNjZW5lKCk7ICAvLyBvci4uIHVwZGF0ZVNjZW5lLi4/XG5cdFx0Ly8gdGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaW1pdCBmcmVxdWVuY3kgb2YgRE9NIHVwZGF0ZXMgb24gcmVzaXplXG5cdCAqL1xuXHR0aHJvdHRsZSgpIHtcblxuXHR9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdHJhbnNmb3JtYXRpb24gb2YgZXZlcnkgZWxlbWVudC5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdHVwZGF0ZSgpIHtcblx0XHQvLyB0aGlzLnNjZW5lcy5mb3JFYWNoKChzY2VuZSkgPT4gdGhpcy5jYWxjdWxhdGUoc2NlbmUpKTtcblx0XHR0aGlzLmNhbGN1bGF0ZSgpO1xuXHRcdHRoaXMudGlja2luZyA9IGZhbHNlO1xuXHR9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgdHJhbnNmb3JtYXRpb24gb2YgZWFjaCBlbGVtZW50XG4gICAqIEBwYXJhbSAge09iamVjdH0gZGF0YTogQW4gT2JqZWN0IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24gYW5kIHRoZSBlbGVtZW50IHRvIHVkcGF0ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cdGNhbGN1bGF0ZShzY2VuZSkge1xuXHRcdGxldCBkYXRhID0gdGhpcy5kYXRhO1xuXHRcdGxldCBzdGFydCA9IHRoaXMuc3RhcnQ7XG5cdFx0bGV0IGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbjtcblx0XHRsZXQgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG5cdFx0bGV0IHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHQvLyBpZiAocHJvZ3Jlc3MgPCAwIHx8IHByb2dyZXNzID4gMSkgeyByZXR1cm47IH1cblxuXHRcdC8vIFVzZSAqYWN0dWFsKiBwb3NpdGlvbiBkYXRhLiBBbiBlbGVtZW50IG1heSBiZSBvbnNjcmVlbiB3aGlsZSBpdHMgcmVmZXJlbmNlICh0cmlnZ2VyKSBlbGVtZW50IGlzIG5vdC5cblx0XHRpZiAoZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcblx0XHRcdFx0ZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCAwXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gdXBkYXRlIGRhdGEgT2JqZWN0XG5cdFx0Ly8gZGF0YS5hYnNvbHV0ZSA9IHNjcm9sbCAtIHN0YXJ0O1xuXHRcdC8vIGRhdGEucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmRlYnVnLCBwcm9ncmVzcyk7XG5cdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHN0YXJ0ICAgICAgdG8gIGZyb20gIGVuZFxuXHRcdC8vIGxldCBlYXNpbmcgPSBlYXNlSW5PdXRRdWFkKGRhdGEuc3RhcnQsIDEwMCwgMCwgZGF0YS5zdGFydCtkYXRhLmR1cmF0aW9uKTtcblxuXHRcdC8vIGN5Y2xlIHRocm91Z2ggYW55IHJlZ2lzdGVyZWQgdHJhbnNmb3JtYXRpb25zXG5cdFx0Ly8gdGhpcy5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4geyBlZmZlY3QuY2FsbChkYXRhKSB9KTtcblx0XHR0aGlzLmVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XG5cdFx0XHRlZmZlY3QuY2FsbCh7XG5cdFx0XHRcdCdwcm9ncmVzcyc6IHByb2dyZXNzLFxuXHRcdFx0XHQnYWJzb2x1dGUnOiBzY3JvbGwgLSBzdGFydFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iLCIvKlxuICogU3RpY2t5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljLy4uLi4/XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLCAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG4vKmdsb2JhbCBkb2N1bWVudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgSFRNTEVsZW1lbnQqL1xuXG5cbi8qKlxuICogU3RpY2t5IEVsZW1lbnQ6IHNldHMgdXAgYSBzdGlja3kgYmFyIHdoaWNoIGF0dGFjaGVzIC8gZGV0YWNoZXMgdG8gdG9wIG9mIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGlja3k6IFRoZSBlbGVtZW50IHRvIHN0aWNreS1pZnlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYm91bmRlZDogV2hldGhlciB0byBhcHBseSBzdGlja2luZXNzIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhcmVudCBjb250YWluZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGlja3koc3RpY2t5LCBib3VuZGVkKSB7XG4gIHN0aWNreSA9IHN0aWNreSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gc3RpY2t5IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3kpO1xuICBib3VuZGVkID0gYm91bmRlZCB8fCBzdGlja3kuZ2V0QXR0cmlidXRlKCdkYXRhLWJvdW5kZWQnKSB8fCBmYWxzZTtcblxuICBpZiAoIXN0aWNreSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICB2YXIgcGFyZW50ID0gc3RpY2t5LnBhcmVudE5vZGUsXG4gICAgc3RpY2t5UG9zaXRpb24sXG4gICAgcGFyZW50UG9zaXRpb24sXG4gICAgY3VycmVudFN0YXRlID0gJ18nLFxuICAgIHN0YXRlU3dpdGNoZXIsXG4gICAgZGV0ZXJtaW5lID0ge1xuICAgICAgbm9ybWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChzdGlja3lQb3NpdGlvbi50b3AgPCAxKSB7IHJldHVybiBzZXRTdGF0ZSgnc3RpY2t5Jyk7IH1cbiAgICAgIH0sXG4gICAgICBzdGlja3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXJlbnRQb3NpdGlvbiA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLnRvcCA+IDEpIHsgcmV0dXJuIHNldFN0YXRlKCdub3JtYWwnKTsgfVxuICAgICAgICBpZiAoIWJvdW5kZWQpIHsgcmV0dXJuOyB9ICAgLy8gZG9uJ3Qgd29ycnkgYWJvdXQgYm90dG9tIGVkZ2VcbiAgICAgICAgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbi5ib3R0b20gPCBzdGlja3lQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoJ2JvdHRvbScpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RpY2t5UG9zaXRpb24gPSBzdGlja3kuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChzdGlja3lQb3NpdGlvbi50b3AgPiAxKSB7IHJldHVybiBzZXRTdGF0ZSgnc3RpY2t5Jyk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gc3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgc3RpY2t5LmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFN0YXRlKTtcbiAgICBzdGlja3kuY2xhc3NMaXN0LmFkZChzdGF0ZSk7XG4gICAgY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgc3RhdGVTd2l0Y2hlciA9IGRldGVybWluZVtzdGF0ZV07XG4gIH1cblxuICBzdGlja3lQb3NpdGlvbiA9IHN0aWNreS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvL3N0aWNreSBpbml0aWFsIHBvc2l0aW9uXG4gIGlmIChzdGlja3lQb3NpdGlvbi50b3AgPCAxKSB7XG4gICAgc2V0U3RhdGUoJ3N0aWNreScpO1xuICAgIHN0YXRlU3dpdGNoZXIoKTsgICAgLy8gZWRnZSBjYXNlOiBjaGVjayBpZiBib3R0b20gb2Ygc3RpY2t5IGNvbGxpZGVzIHcvIGJvdW5kaW5nIGNvbnRhaW5lclxuICB9IGVsc2Uge1xuICAgIHNldFN0YXRlKCdub3JtYWwnKTtcbiAgfVxuXG5cbiAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHN0YXRlU3dpdGNoZXIpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7IHN0YXRlU3dpdGNoZXIoKTsgfSk7ICAvLyBzdGF0ZVN3aXRjaGVyIGNoYW5nZXMsIHNvIGNhbm5vdCBwYXNzIChpZS4gYmluZCBkaXJlY3RseSkgaGVyZVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7IHN0YXRlU3dpdGNoZXIoKTsgfSk7XG59XG5cbiJdfQ==
