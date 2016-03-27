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
	parallax: (opts) => {
		console.log(this);
		let position = this.fromStart * (opts.speed || 1);		// if speed
		// let position = this.percent * (opts.range || 200);;	// if range was used

		this.style[this.transform] = 'translate3d(0, '+ position +'px, 0)';	// no IE9, nor non 3d-accellerated browsers
	},

	// start pos, durations
	pin: (position) => {

	},

	// trigger, classname
	toggle: (position) => {

	}

}


export default class Scrollify {

	constructor(element) {
		this.ticking = false;
		this.scroll = window.scrollY;
		// this.height = window.innerHeight;
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
				transform: el.style[transform],		// shortcut
				percent: 0,
				fromStart: 0
			}
			this.elements.push(data);
			this.calculate(data);
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
	calculate(data) {
		let start = data.el.getBoundingClientRect().top;
		let end = data.el.getBoundingClientRect().bottom;
		let height = window.innerHeight;
		let position;

		// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
		if (height < start) { return; }
		// if (this.height < start) { return; }
		// if (0 > end) { return; }

		position = Math.min(1, -start / height);	// 0 --> 1

		// update data Object
		data.percent = position;
		data.fromStart = height - start;

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
