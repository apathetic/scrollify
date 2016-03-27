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
  * NOTE: don't use arrow fn's here as they proxy "this"
  */
	// parallax: function(opts) {
	parallax: function parallax(opts) {
		// console.log(this.fromStart);
		// console.log(this.position);
		var offset = 0;

		if (opts.speed) {
			// check speed first
			offset = this.fromStart * (opts.speed || 1) - this.fromStart;
		} else {
			// fallback to range
			offset = this.percent * (opts.range || 200);
		}

		console.log(this.fromStart, offset);

		this.el.style[this.transform] = 'translate3d(0, ' + offset + 'px, 0)'; // no IE9, nor non 3d-accellerated browsers
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
				// transform: el.style[transform],		// shortcut... except no "pointer" in JS
				transform: transform,
				position: 0,
				fromStart: 0 // NOTE: this is from that "starting point" of the effect: namely, when the top edge of the element comes on to the _bottom_ of the screen
			};
			_this.elements.push(data);
			_this.calculate(data, true);
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
		value: function calculate(data, force) {
			var BCR = data.el.getBoundingClientRect();
			var start = BCR.top;
			var end = BCR.bottom;
			var h = BCR.height;
			var height = window.innerHeight;
			var position = void 0;

			// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
			if (!force) {
				if (height < start || 0 > end) {
					return;
				}
			}

			// position = Math.min(1, start / height);			// 1 --> 0
			position = (start + h) / (height + h); // 1 --> 0

			// update data Object
			data.position = position;
			data.fromStart = height - start;
			// data.absolute = height - start;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2Nyb2xsaWZ5LmpzIiwic3JjL3NoaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDV0EsSUFBSSxhQUFhOzs7Ozs7O0FBT2hCLDZCQUFTLE1BQU07OztBQUdkLE1BQUksU0FBUyxDQUFULENBSFU7O0FBS2QsTUFBSSxLQUFLLEtBQUwsRUFBWTs7QUFDZCxZQUFTLEtBQUssU0FBTCxJQUFrQixLQUFLLEtBQUwsSUFBYyxDQUFkLENBQWxCLEdBQXFDLEtBQUssU0FBTCxDQURoQztHQUFoQixNQUVPOztBQUNMLFlBQVMsS0FBSyxPQUFMLElBQWdCLEtBQUssS0FBTCxJQUFjLEdBQWQsQ0FBaEIsQ0FESjtHQUZQOztBQU1BLFVBQVEsR0FBUixDQUFZLEtBQUssU0FBTCxFQUFnQixNQUE1QixFQVhjOztBQWFkLE9BQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxLQUFLLFNBQUwsQ0FBZCxHQUFnQyxvQkFBbUIsTUFBbkIsR0FBMkIsUUFBM0I7QUFibEIsRUFQQzs7OztBQXdCaEIsbUJBQUksVUFBVSxFQXhCRTs7OztBQTZCaEIseUJBQU8sVUFBVSxFQTdCRDtDQUFiOztJQW9DaUI7QUFFcEIsVUFGb0IsU0FFcEIsQ0FBWSxPQUFaLEVBQXFCOzs7d0JBRkQsV0FFQzs7QUFDcEIsT0FBSyxPQUFMLEdBQWUsS0FBZixDQURvQjtBQUVwQixPQUFLLE1BQUwsR0FBYyxPQUFPLE9BQVAsQ0FGTTtBQUdwQixPQUFLLE9BQUwsR0FBZSxFQUFmLENBSG9CO0FBSXBCLE9BQUssUUFBTCxHQUFnQixFQUFoQixDQUpvQjs7QUFNcEIsTUFBSSxZQUFZLEtBQVosQ0FOZ0I7QUFPcEIsTUFBTSxXQUFXLE9BQUMsWUFBbUIsV0FBbkIsR0FBa0MsQ0FBQyxPQUFELENBQW5DLEdBQStDLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBL0MsQ0FQRztBQVFwQixN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UUFBTSxDQUFOLENBQUQsSUFBYSxTQUFPLENBQVAsQ0FBYjs7O0FBZFcsT0FpQnRCLENBQUssUUFBTCxHQUFnQixRQUFoQixDQWpCc0I7QUFrQnRCLFFBQUssU0FBTCxHQUFpQixTQUFTLEtBQVQ7OztBQWxCSyxPQXFCdEIsQ0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFDLE1BQUQsRUFBWTtBQUFFLFdBQU8sSUFBUCxDQUFZLElBQVosRUFBRjtJQUFaLENBQXJCLENBckJzQjs7Ozs7Ozs7Ozs7Ozs7UUExRkg7Ozs7Ozs7O0FDM0NyQjs7Ozs7O0FBQ0EsT0FBTyxTQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBzY3JvbGxpZnlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGF0aGV0aWMvc2Nyb2xsaWZ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IFdlcyBIYXRjaFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqL1xuXG5cblxudmFyIGVmZmVjdExpc3QgPSB7XG5cdC8qKlxuXHQgKiBzcGVlZCwgcmFuZ2Vcblx0ICogTk9URTogc2hvdWxkIG9ubHkgdXNlIHNwZWVkIE9SIHJhbmdlLCBub3QgYm90aFxuXHQgKiBOT1RFOiBkb24ndCB1c2UgYXJyb3cgZm4ncyBoZXJlIGFzIHRoZXkgcHJveHkgXCJ0aGlzXCJcblx0ICovXG5cdCAvLyBwYXJhbGxheDogZnVuY3Rpb24ob3B0cykge1xuXHRwYXJhbGxheChvcHRzKSB7XG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5mcm9tU3RhcnQpO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb24pO1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXG5cdFx0aWYgKG9wdHMuc3BlZWQpIHtcdFx0Ly8gY2hlY2sgc3BlZWQgZmlyc3Rcblx0XHQgXHRvZmZzZXQgPSB0aGlzLmZyb21TdGFydCAqIChvcHRzLnNwZWVkIHx8IDEpIC0gdGhpcy5mcm9tU3RhcnQ7XG5cdFx0fSBlbHNlIHtcdFx0XHRcdC8vIGZhbGxiYWNrIHRvIHJhbmdlXG5cdFx0IFx0b2Zmc2V0ID0gdGhpcy5wZXJjZW50ICogKG9wdHMucmFuZ2UgfHwgMjAwKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyh0aGlzLmZyb21TdGFydCwgb2Zmc2V0KTtcblxuXHRcdHRoaXMuZWwuc3R5bGVbdGhpcy50cmFuc2Zvcm1dID0gJ3RyYW5zbGF0ZTNkKDAsICcrIG9mZnNldCArJ3B4LCAwKSc7XHQvLyBubyBJRTksIG5vciBub24gM2QtYWNjZWxsZXJhdGVkIGJyb3dzZXJzXG5cdH0sXG5cblx0Ly8gc3RhcnQgcG9zLCBkdXJhdGlvbnNcblx0cGluKHBvc2l0aW9uKSB7XG5cblx0fSxcblxuXHQvLyB0cmlnZ2VyLCBjbGFzc25hbWVcblx0dG9nZ2xlKHBvc2l0aW9uKSB7XG5cblx0fVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaWZ5IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dGhpcy50aWNraW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHR0aGlzLmVmZmVjdHMgPSBbXTtcblx0XHR0aGlzLmVsZW1lbnRzID0gW107XG5cblx0XHR2YXIgdHJhbnNmb3JtID0gZmFsc2U7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSA/IFtlbGVtZW50XSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cdFx0Y29uc3QgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ3dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybSddO1xuXHRcdGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcblx0XHQvLyBub3RlOiB3ZSBkb24ndCB0ZXN0IFwibXNcIiBwcmVmaXgsIChhcyB0aGF0IGdpdmVzIHVzIElFOSB3aGljaCBkb2Vzbid0IHN1cHBvcnQgdHJhbnNmb3JtczNkIGFueXdheS4gSUUxMCB0ZXN0IHdpbGwgd29yayB3aXRoIFwidHJhbnNmb3JtXCIpXG5cdFx0Zm9yIChsZXQgaSBpbiB0cmFuc2Zvcm1zKSB7XG5cdFx0XHRpZiAoIHN0eWxlWyB0cmFuc2Zvcm1zW2ldIF0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFlbGVtZW50cy5sZW5ndGggfHwgIXRyYW5zZm9ybSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyBjcmVhdGUgYSBcImRhdGFcIiBPYmplY3QgZm9yIGVhY2ggZWxlbWVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbiBhbmQgYSBzaG9ydGN1dCB0byB0aGUgdHJhbnNmb3JtIGZuXG5cdFx0QXJyYXkuZnJvbShlbGVtZW50cywgKGVsKSA9PiB7XG5cdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0ZWw6IGVsLFxuXHRcdFx0XHQvLyB0cmFuc2Zvcm06IGVsLnN0eWxlW3RyYW5zZm9ybV0sXHRcdC8vIHNob3J0Y3V0Li4uIGV4Y2VwdCBubyBcInBvaW50ZXJcIiBpbiBKU1xuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zZm9ybSxcblx0XHRcdFx0cG9zaXRpb246IDAsXG5cdFx0XHRcdGZyb21TdGFydDogMFx0XHRcdFx0XHRcdFx0Ly8gTk9URTogdGhpcyBpcyBmcm9tIHRoYXQgXCJzdGFydGluZyBwb2ludFwiIG9mIHRoZSBlZmZlY3Q6IG5hbWVseSwgd2hlbiB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGVsZW1lbnQgY29tZXMgb24gdG8gdGhlIF9ib3R0b21fIG9mIHRoZSBzY3JlZW5cblx0XHRcdH1cblx0XHRcdHRoaXMuZWxlbWVudHMucHVzaChkYXRhKTtcblx0XHRcdHRoaXMuY2FsY3VsYXRlKGRhdGEsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB0aGlzLm9uU2Nyb2xsKGUpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRhZGRFZmZlY3QobmFtZSwgZWZmZWN0KSB7XG5cdFx0ZWZmZWN0TGlzdFtuYW1lXSA9IGVmZmVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0dXNlRWZmZWN0KG5hbWUsIG9wdGlvbnMpIHtcblx0XHRsZXQgY3VycnkgPSAoZm4sIG9wdGlvbnMpID0+IHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcdFx0XHRcdC8vIE5PVEU6IGRvbid0IHVzZSA9PiBmdW5jdGlvbiBoZXJlIGFzIHdlIGRvIE5PVCB3YW50IHRvIGJpbmQgXCJ0aGlzXCJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lZmZlY3RzLnB1c2goIGN1cnJ5KGVmZmVjdExpc3RbbmFtZV0sIG9wdGlvbnMpICk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICghdGhpcy50aWNraW5nKSB7XG5cdFx0XHR0aGlzLnRpY2tpbmcgPSB0cnVlO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRvblJlc2l6ZSgpIHtcblx0XHR0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0QXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLCAoZGF0YSkgPT4gdGhpcy5jYWxjdWxhdGUoZGF0YSkgKTtcblx0XHR0aGlzLnRpY2tpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y2FsY3VsYXRlKGRhdGEsIGZvcmNlKSB7XG5cdFx0bGV0IEJDUiA9IGRhdGEuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHN0YXJ0ID0gQkNSLnRvcDtcblx0XHRsZXQgZW5kID0gQkNSLmJvdHRvbTtcblx0XHRsZXQgaCA9IEJDUi5oZWlnaHQ7XG5cdFx0bGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRsZXQgcG9zaXRpb247XG5cblx0XHQvLyBkb250IGRvIG51dGhpbiB1bnRpbCB0aGlzIGhlcmUgdGhpbmcgaXMgd2l0aGluIHJhbmdlIChpZS4gdG9wIGVkZ2UgcGVla3Mgb3V0IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuKVxuXHRcdGlmICghZm9yY2UpIHtcblx0XHRcdGlmIChoZWlnaHQgPCBzdGFydCB8fCAwID4gZW5kKSB7IHJldHVybjsgfVxuXHRcdH1cblxuXHRcdC8vIHBvc2l0aW9uID0gTWF0aC5taW4oMSwgc3RhcnQgLyBoZWlnaHQpO1x0XHRcdC8vIDEgLS0+IDBcblx0XHRwb3NpdGlvbiA9IChzdGFydCtoKSAvIChoZWlnaHQraCk7XHRcdFx0XHRcdC8vIDEgLS0+IDBcblxuXHRcdC8vIHVwZGF0ZSBkYXRhIE9iamVjdFxuXHRcdGRhdGEucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHRkYXRhLmZyb21TdGFydCA9IGhlaWdodCAtIHN0YXJ0O1xuXHRcdC8vIGRhdGEuYWJzb2x1dGUgPSBoZWlnaHQgLSBzdGFydDtcblxuXHRcdHRoaXMuZWZmZWN0cy5mb3JFYWNoKChlZmZlY3QpID0+IHsgZWZmZWN0LmNhbGwoZGF0YSkgfSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Ly8gZGVzdHJveSgpIHtcblx0Ly8gXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG5cdC8vIFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuXHQvLyBcdC8vIGRlbGV0ZSByb290LnBhcmFsbGF4O1x0Ly8gbm8gYW1kIHByb3Zpc2lvblxuXHQvLyB9XG59XG4iLCIvKipcbiAqIFB1dCBDYXJvdXNlbCBpbnRvIHRoZSBHbG9iYWwgc2NvcGUuXG4gKiBVc2VmdWwgZm9yIGV4aXN0aW5nIGRlbW9zIG9yIGlmIHlvdSB3aXNoIHRvIGluY2x1ZGUgbWFudWFsbHlcbiAqL1xuaW1wb3J0IHNjcm9sbGlmeSBmcm9tICcuL3Njcm9sbGlmeS5qcyc7XG53aW5kb3cuU2Nyb2xsaWZ5ID0gc2Nyb2xsaWZ5O1xuIl19
