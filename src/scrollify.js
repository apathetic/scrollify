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
	parallax(opts) {
		// console.log(this.fromStart);
		// console.log(this.position);
		let offset = 0;

		if (opts.speed) {		// check speed first
		 	offset = this.fromStart * (opts.speed || 1) - this.fromStart;
		} else {				// fallback to range
		 	offset = this.percent * (opts.range || 200);
		}

		console.log(this.fromStart, offset);

		this.el.style[this.transform] = 'translate3d(0, '+ offset +'px, 0)';	// no IE9, nor non 3d-accellerated browsers
	},

	// start pos, durations
	pin(position) {

	},

	// trigger, classname
	toggle(position) {

	}

}


export default class Scrollify {

	constructor(element) {
		this.ticking = false;
		this.scroll = window.scrollY;
		this.effects = [];
		this.elements = [];

		var transform = false;
		const elements = (element instanceof HTMLElement) ? [element] : document.querySelectorAll(element);
		const transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform'];
		const style = document.body.style;
		// note: we don't test "ms" prefix, (as that gives us IE9 which doesn't support transforms3d anyway. IE10 test will work with "transform")
		for (let i in transforms) {
			if ( style[ transforms[i] ] !== undefined) {
				transform = transforms[i];
				break;
			}
		}

		if ( !elements.length || !transform ) { return false; }

		// create a "data" Object for each element, containing position information and a shortcut to the transform fn
		Array.from(elements, (el) => {
			let data = {
				el: el,
				// transform: el.style[transform],		// shortcut... except no "pointer" in JS
				transform: transform,
				position: 0,
				fromStart: 0							// NOTE: this is from that "starting point" of the effect: namely, when the top edge of the element comes on to the _bottom_ of the screen
			}
			this.elements.push(data);
			this.calculate(data, true);
		});

		window.addEventListener('scroll', (e) => this.onScroll(e));
		window.addEventListener('resize', (e) => this.onResize(e));
	}

	/**
	 *
	 */
	addEffect(name, effect) {
		effectList[name] = effect;
		return this;
	}

	/**
	 *
	 */
	useEffect(name, options) {
		let curry = (fn, options) => {
			return function() {				// NOTE: don't use => function here as we do NOT want to bind "this"
				fn.call(this, options);
			}
		}

		return this.effects.push( curry(effectList[name], options) );
	}

	/**
	 *
	 */
	onScroll() {
		if (!this.ticking) {
			this.ticking = true;
			window.requestAnimationFrame(this.update.bind(this));
			this.scroll = window.scrollY;
		}
	}

	/**
	 *
	 */
	onResize() {
		this.height = window.innerHeight;
		this.update();
	}

	/**
	 *
	 */
	update() {
		Array.from(this.elements, (data) => this.calculate(data) );
		this.ticking = false;
	}

	/**
	 *
	 */
	calculate(data, force) {
		let BCR = data.el.getBoundingClientRect();
		let start = BCR.top;
		let end = BCR.bottom;
		let h = BCR.height;
		let height = window.innerHeight;
		let position;

		// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
		// if (!force) {
			if (height < start || 0 > end) { return; }
		// }

		// position = Math.min(1, start / height);			// 1 --> 0
		position = (start+h) / (height+h);					// 1 --> 0

		// update data Object
		data.position = position;
		data.fromStart = height - start;
		// data.absolute = height - start;

		this.effects.forEach((effect) => { effect.call(data) });
	}


	/**
	 *
	 */
	// destroy() {
	// 	window.removeEventListener('scroll', this.onScroll);
	// 	window.removeEventListener('resize', this.onResize);
	// 	// delete root.parallax;	// no amd provision
	// }
}
