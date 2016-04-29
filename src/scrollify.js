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
const transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
for (let i in transforms) {
	if ( document.body.style[transforms[i]] !== undefined) {
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
	parallax(opts) {
		let offset = 0;

		if (opts.speed !== undefined) {									// check speed first
		 	offset = this.absolute * opts.speed;
		} else {																				// fallback to range
		 	offset = this.percent * (opts.range || 0);		// default is "0", no effect
		}

		this.el.style[transform] = 'translate(0, '+ offset +'px)';
	},

	// start pos, durations
	pin(position) {

	},

	// trigger, classname
	trigger(opts) {
		let classes = Object.keys(opts);
		let el = this.el;
		let percent = this.percent * 100;

		// var css = classes[0];		// just taking 1st arbitrarily for now
		// var when = parseInt(opts[css]);

		classes.forEach(function(css) {
			let when = parseInt(opts[css]);
			if (percent > when) {
				el.classList.add(css);
			} else {
				el.classList.remove(css);
			}
		});
	}
}


/**
 * The Scrollify Class
 */
export default class Scrollify {

	constructor(element) {
		this.ticking = false;
		this.scroll = window.scrollY;
		this.effects = [];
		this.elements = [];

		const elements = (element instanceof HTMLElement) ? [element] : document.querySelectorAll(element);

		if ( !elements.length || !transform ) { return false; }

		// create a "data" Object for each element, containing position information and a reference to the DOM node
		Array.from(elements, (el) => {

			// ***** NOTE: this calculation needs to be made "as if from an initial scroll position of 0"
			// let BCR = el.getBoundingClientRect();
			// BCR.top -= window.scrollY;
			// BCR.bottom -= window.scrollY;
			// let BCR = Object.assign({}, temp);

			// probably a better way to do this...
			let BCR = el.getBoundingClientRect();
			let initial = {
				top:  BCR.top + window.scrollY,
				bottom: BCR.bottom + window.scrollY,
				height: BCR.height
			};

			// el['transform'] = transform;		// create a consistent ref, here? somehow but not like this exactly

			let data = {
				el: el,
				initial: initial,
				percent: 0,									// a value from 1 to 0, starting when the element first appears at the bottom until it disappears at the top
				absolute: 0									// the absolute number of pixels the element has travelled since coming into view
			}

			this.elements.push(data);
			this.calculate(data, true);		// set initial details
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

		this.effects.push( curry(effectList[name], options) );
		return this;
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
		let height = window.innerHeight;
		let start = data.initial.top - this.scroll;
		let end = data.initial.bottom - this.scroll;
		let h = data.initial.height;
		let percent;

		// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
		if (height < start || 0 > end) { return; }

		// Calculate how far across the screen the element is. "1" is when the top edge of the element first peeks out
		// from the bottom of the viewport, and "0" is when the bottom edge disappears beyond the top of the viewport:
		// percent = Math.min(1, start / height);			// 1 --> 0
		percent = (start+h) / (height+h);					// 1 --> 0

		// update data Object
		data.percent = percent;
		data.absolute = height - start;

		// cycle through any registered transformations
		this.effects.forEach((effect) => { effect.call(data) });
	}
}
