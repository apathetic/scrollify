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

var effectList = {
	/**
  * speed, range
  * NOTE: should only use speed OR range, not both
  */
	parallax: function parallax(opts) {
		console.log(undefined);
		var position = undefined.fromStart * (opts.speed || 1); // if speed
		// let position = this.percent * (opts.range || 200);;	// if range was used

		undefined.style[undefined.transform] = 'translate3d(0, ' + position + 'px, 0)'; // no IE9, nor non 3d-accellerated browsers
	},

	// start pos, durations
	pin: function pin(position) {},

	// trigger, classname
	toggle: function toggle(position) {}

};

var Scrollify = function () {
	function Scrollify(element) {
		var _this = this;

		_classCallCheck(this, Scrollify);

		this.ticking = false;
		this.scroll = window.scrollY;
		// this.height = window.innerHeight;
		this.effects = [];
		this.elements = [];

		var transform = false;
		var elements = element instanceof HTMLElement ? [element] : document.querySelectorAll(element);
		var transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform'];
		var style = document.body.style;
		// note: we don't test "ms" prefix, (as that gives us IE9 which doesn't support transforms3d anyway. IE10 test will work with "transform")
		for (var i in transforms) {
			if (style[transforms[i]] !== undefined) {
				transform = transforms[i];
				break;
			}
		}

		if (!elements.length || !transform) {
			return false;
		}

		// create a "data" Object for each element, containing position information and a shortcut to the transform fn
		Array.from(elements, function (el) {
			var data = {
				el: el,
				transform: el.style[transform], // shortcut
				percent: 0,
				fromStart: 0
			};
			_this.elements.push(data);
			_this.calculate(data);
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

			return this.effects.push(curry(effectList[name], options));
		}

		/**
   *
   */

	}, {
		key: 'onScroll',
		value: function onScroll() {
			if (!this instanceof Scrollify) {
				console.log('RED ALERT');
			}

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
			var start = data.el.getBoundingClientRect().top;
			var end = data.el.getBoundingClientRect().bottom;
			var height = window.innerHeight;
			var position = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			if (height < start) {
				return;
			}
			// if (this.height < start) { return; }
			// if (0 > end) { return; }

			position = Math.min(1, -start / height); // 0 --> 1

			// update data Object
			data.percent = position;
			data.fromStart = height - start;

			this.effects.forEach(function (effect) {
				effect.call(data);
			});
		}

		/**
   *
   */
		// destroy() {
		// 	window.removeEventListener('scroll', this.onScroll);
		// 	window.removeEventListener('resize', this.onResize);
		// 	// delete root.parallax;	// no amd provision
		// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDV0EsSUFBSSxhQUFhOzs7OztBQUtoQixXQUFVLGtCQUFDLElBQUQsRUFBVTtBQUNuQixVQUFRLEdBQVIsWUFEbUI7QUFFbkIsTUFBSSxXQUFXLFVBQUssU0FBTCxJQUFrQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWxCOzs7QUFGSSxXQUtuQixDQUFLLEtBQUwsQ0FBVyxVQUFLLFNBQUwsQ0FBWCxHQUE2QixvQkFBbUIsUUFBbkIsR0FBNkIsUUFBN0I7QUFMVixFQUFWOzs7QUFTVixNQUFLLGFBQUMsUUFBRCxFQUFjLEVBQWQ7OztBQUtMLFNBQVEsZ0JBQUMsUUFBRCxFQUFjLEVBQWQ7O0NBbkJMOztJQTBCaUI7QUFFcEIsVUFGb0IsU0FFcEIsQ0FBWSxPQUFaLEVBQXFCOzs7d0JBRkQsV0FFQzs7QUFDcEIsT0FBSyxPQUFMLEdBQWUsS0FBZixDQURvQjtBQUVwQixPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVA7O0FBRk0sTUFJcEIsQ0FBSyxPQUFMLEdBQWUsRUFBZixDQUpvQjtBQUtwQixPQUFLLFFBQUwsR0FBZ0IsRUFBaEIsQ0FMb0I7O0FBT3BCLE1BQUksWUFBWSxLQUFaLENBUGdCO0FBUXBCLE1BQU0sV0FBVyxPQUFDLFlBQW1CLFdBQW5CLEdBQWtDLENBQUMsT0FBRCxDQUFuQyxHQUErQyxTQUFTLGdCQUFULENBQTBCLE9BQTFCLENBQS9DLENBUkc7QUFTcEIsTUFBTSxhQUFhLENBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLGNBQWpDLEVBQWlELFlBQWpELENBQWIsQ0FUYztBQVVwQixNQUFNLFFBQVEsU0FBUyxJQUFULENBQWMsS0FBZDs7QUFWTSxPQVlmLElBQUksQ0FBSixJQUFTLFVBQWQsRUFBMEI7QUFDekIsT0FBSyxNQUFP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QUFZO0FBQUUsV0FBTyxJQUFQLENBQVksSUFBWixFQUFGO0lBQVosQ0FBckIsQ0FqQmU7Ozs7Ozs7Ozs7Ozs7O1FBOUZJOzs7Ozs7OztBQ2pDckI7Ozs7OztBQUNBLE9BQU8sU0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogc2Nyb2xsaWZ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXBhdGhldGljL3Njcm9sbGlmeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBXZXMgSGF0Y2hcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuXG5cbnZhciBlZmZlY3RMaXN0ID0ge1xuXHQvKipcblx0ICogc3BlZWQsIHJhbmdlXG5cdCAqIE5PVEU6IHNob3VsZCBvbmx5IHVzZSBzcGVlZCBPUiByYW5nZSwgbm90IGJvdGhcblx0ICovXG5cdHBhcmFsbGF4OiAob3B0cykgPT4ge1xuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdGxldCBwb3NpdGlvbiA9IHRoaXMuZnJvbVN0YXJ0ICogKG9wdHMuc3BlZWQgfHwgMSk7XHRcdC8vIGlmIHNwZWVkXG5cdFx0Ly8gbGV0IHBvc2l0aW9uID0gdGhpcy5wZXJjZW50ICogKG9wdHMucmFuZ2UgfHwgMjAwKTs7XHQvLyBpZiByYW5nZSB3YXMgdXNlZFxuXG5cdFx0dGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybV0gPSAndHJhbnNsYXRlM2QoMCwgJysgcG9zaXRpb24gKydweCwgMCknO1x0Ly8gbm8gSUU5LCBub3Igbm9uIDNkLWFjY2VsbGVyYXRlZCBicm93c2Vyc1xuXHR9LFxuXG5cdC8vIHN0YXJ0IHBvcywgZHVyYXRpb25zXG5cdHBpbjogKHBvc2l0aW9uKSA9PiB7XG5cblx0fSxcblxuXHQvLyB0cmlnZ2VyLCBjbGFzc25hbWVcblx0dG9nZ2xlOiAocG9zaXRpb24pID0+IHtcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpZnkge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdC8vIHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMuZWZmZWN0cyA9IFtdO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBbXTtcblxuXHRcdHZhciB0cmFuc2Zvcm0gPSBmYWxzZTtcblx0XHRjb25zdCBlbGVtZW50cyA9IChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gW2VsZW1lbnRdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblx0XHRjb25zdCB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJ107XG5cdFx0Y29uc3Qgc3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuXHRcdC8vIG5vdGU6IHdlIGRvbid0IHRlc3QgXCJtc1wiIHByZWZpeCwgKGFzIHRoYXQgZ2l2ZXMgdXMgSUU5IHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0cmFuc2Zvcm1zM2QgYW55d2F5LiBJRTEwIHRlc3Qgd2lsbCB3b3JrIHdpdGggXCJ0cmFuc2Zvcm1cIilcblx0XHRmb3IgKGxldCBpIGluIHRyYW5zZm9ybXMpIHtcblx0XHRcdGlmICggc3R5bGVbIHRyYW5zZm9ybXNbaV0gXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIWVsZW1lbnRzLmxlbmd0aCB8fCAhdHJhbnNmb3JtICkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdC8vIGNyZWF0ZSBhIFwiZGF0YVwiIE9iamVjdCBmb3IgZWFjaCBlbGVtZW50LCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uIGFuZCBhIHNob3J0Y3V0IHRvIHRoZSB0cmFuc2Zvcm0gZm5cblx0XHRBcnJheS5mcm9tKGVsZW1lbnRzLCAoZWwpID0+IHtcblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRlbDogZWwsXG5cdFx0XHRcdHRyYW5zZm9ybTogZWwuc3R5bGVbdHJhbnNmb3JtXSxcdFx0Ly8gc2hvcnRjdXRcblx0XHRcdFx0cGVyY2VudDogMCxcblx0XHRcdFx0ZnJvbVN0YXJ0OiAwXG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVsZW1lbnRzLnB1c2goZGF0YSk7XG5cdFx0XHR0aGlzLmNhbGN1bGF0ZShkYXRhKTtcblx0XHR9KTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5vblNjcm9sbChlKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLm9uUmVzaXplKGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0YWRkRWZmZWN0KG5hbWUsIGVmZmVjdCkge1xuXHRcdGVmZmVjdExpc3RbbmFtZV0gPSBlZmZlY3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVzZUVmZmVjdChuYW1lLCBvcHRpb25zKSB7XG5cdFx0bGV0IGN1cnJ5ID0gKGZuLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHRcdFx0XHQvLyBOT1RFOiBkb24ndCB1c2UgPT4gZnVuY3Rpb24gaGVyZSBhcyB3ZSBkbyBOT1Qgd2FudCB0byBiaW5kIFwidGhpc1wiXG5cdFx0XHRcdGZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWZmZWN0cy5wdXNoKCBjdXJyeShlZmZlY3RMaXN0W25hbWVdLCBvcHRpb25zKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRvblNjcm9sbCgpIHtcblx0XHRpZiAoIXRoaXMgaW5zdGFuY2VvZiBTY3JvbGxpZnkpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdSRUQgQUxFUlQnKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMudGlja2luZykge1xuXHRcdFx0dGhpcy50aWNraW5nID0gdHJ1ZTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0b25SZXNpemUoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdEFycmF5LmZyb20odGhpcy5lbGVtZW50cywgKGRhdGEpID0+IHRoaXMuY2FsY3VsYXRlKGRhdGEpICk7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNhbGN1bGF0ZShkYXRhKSB7XG5cdFx0bGV0IHN0YXJ0ID0gZGF0YS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdFx0bGV0IGVuZCA9IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuXHRcdGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0bGV0IHBvc2l0aW9uO1xuXG5cdFx0Ly8gZG9udCBkbyBudXRoaW4gdW50aWwgdGhpcyBoZXJlIHRoaW5nIGlzIHdpdGhpbiByYW5nZSAoaWUuIHRvcCBlZGdlIHBlZWtzIG91dCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbilcblx0XHRpZiAoaGVpZ2h0IDwgc3RhcnQpIHsgcmV0dXJuOyB9XG5cdFx0Ly8gaWYgKHRoaXMuaGVpZ2h0IDwgc3RhcnQpIHsgcmV0dXJuOyB9XG5cdFx0Ly8gaWYgKDAgPiBlbmQpIHsgcmV0dXJuOyB9XG5cblx0XHRwb3NpdGlvbiA9IE1hdGgubWluKDEsIC1zdGFydCAvIGhlaWdodCk7XHQvLyAwIC0tPiAxXG5cblx0XHQvLyB1cGRhdGUgZGF0YSBPYmplY3Rcblx0XHRkYXRhLnBlcmNlbnQgPSBwb3NpdGlvbjtcblx0XHRkYXRhLmZyb21TdGFydCA9IGhlaWdodCAtIHN0YXJ0O1xuXG5cdFx0dGhpcy5lZmZlY3RzLmZvckVhY2goKGVmZmVjdCkgPT4geyBlZmZlY3QuY2FsbChkYXRhKSB9KTtcblx0fVxuXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHQvLyBkZXN0cm95KCkge1xuXHQvLyBcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcblx0Ly8gXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZSk7XG5cdC8vIFx0Ly8gZGVsZXRlIHJvb3QucGFyYWxsYXg7XHQvLyBubyBhbWQgcHJvdmlzaW9uXG5cdC8vIH1cbn1cbiIsIi8qKlxuICogUHV0IENhcm91c2VsIGludG8gdGhlIEdsb2JhbCBzY29wZS5cbiAqIFVzZWZ1bCBmb3IgZXhpc3RpbmcgZGVtb3Mgb3IgaWYgeW91IHdpc2ggdG8gaW5jbHVkZSBtYW51YWxseVxuICovXG5pbXBvcnQgc2Nyb2xsaWZ5IGZyb20gJy4vc2Nyb2xsaWZ5LmpzJztcbndpbmRvdy5TY3JvbGxpZnkgPSBzY3JvbGxpZnk7XG4iXX0=
