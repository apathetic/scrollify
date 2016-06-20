/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */


// TODO add weakmap support for public / private methods

// import {easeInOutCubic} from './easings';
import Sticky from './sticky';
import * as effectList from './effects';
import transform from './transform';


/**
 * The Scrollify Class
 */
export default class Scrollify {

	constructor(element, debug) {
		if (element instanceof HTMLElement == false) { element = document.querySelector(element); }
		if (!element || !transform ) { return false; }

		this.element = element;
		this.ticking = false;
		this.scenes = [];
		this.scroll = window.scrollY;
		this.debug = debug;

		window.addEventListener('scroll', (e) => this.onScroll(e));
		window.addEventListener('resize', (e) => this.onResize(e));
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
	addScene(opts) {
		let start = (opts.start === undefined) ? false : opts.start;
		let duration = opts.duration || null;
		let effects = opts.effects || [];
		let trigger = opts.trigger || this.element; // .parentNode;
		let scene = {
			'trigger': trigger,
			'start': start,
			'duration': duration,
			'effects': []
		};

		if (start === false) { console.log('Scrollify [error]: Cannot add Scene. Missing "start" argument.'); return; }

		effects.forEach((effect) => {
			this.addEffect(effect.name, effect.options, scene);
		});

		if (duration) {
			this.duration = duration;
		}

		this.updateScene(scene);
		this.scenes.push(scene);

		return this;
	}

	/**
	 * Update each scene.
	 * @param  {Object} scene: The scene to update.
	 * @return {void}
	 */
	updateScene(scene) {
		let trigger = scene.trigger;
		let BCR = trigger.getBoundingClientRect();
		let where = 1;
		let top = 0;	// window.scrollY;

		do {
			top += trigger.offsetTop || 0;
			trigger = trigger.offsetParent;
		} while(trigger);

		scene.start = top - (where * window.innerHeight);

		this.calculate(scene);
	}

	/**
	 * Add a particular transformation to a scene.
	 * @param  {String|Function} name: The name of the transformation OR an actual function to apply.
	 * @param  {Object} options: Any transformation options.
	 * @return {void}
	 */
	addEffect(name, options={}, scene) {
		let element = this.element;

		if (!scene && this.scenes.length == 1) {
			scene = this.scenes[0];
		}

		if (scene) {
			let effect = (typeof name == 'function') ? name : effectList[name];
			let curry = (fn, options) => {
				return function() {       // NOTE: don't use => function here as we do NOT want to bind "this"
					let context = {
						'options': options,
						'element': element
					};
					fn.call(context, this); // eslint-disable-line
				}
			}

			// console.log(effect, options);
			scene.effects.push(curry(effect, options));

			if (name == 'stick') {
				let d = scene.duration || 0;
				let h = element.getBoundingClientRect().height;
				element.parentNode.style.paddingBottom = (d+h) + 'px';
				new Sticky(element, true);
			}

		} else {
			// if no scene (ie "effect" was called directly on Scrollify), set up a default scene
			return this.addScene({
				'start': 0,
				'duration': window.innerHeight + element.offsetHeight,
				'effects': [{
					'name': name, 'options': options
				}]
			});
		}

		return this;
	}

	/**
	 * onScroll Handler
	 * @return {void}
	 */
	onScroll() {
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
	onResize() {
		// this.throttle(this.updateScene);
		this.scenes.forEach((scene) => this.updateScene(scene));
	}

	/**
	 * Limit frequency of DOM updates on resize
	 */
	throttle() {

	}

	/**
	 * Update the transformations for every scene.
	 * @return {void}
	 */
	update() {
		this.scenes.forEach((scene) => this.calculate(scene));
		this.ticking = false;
	}

	/**
	 * Calculate the transformations for each scene.
	 * @param  {Object} scene: An Object containing start and duration information as well as the transformations to apply.
	 * @return {void}
	 */
	calculate(scene) {
		// let data = this.data;
		let start = scene.start;
		let duration = scene.duration;
		let scroll = this.scroll;
		let progress = (scroll - start) / duration;

		// dont do nuthin until this here thing is within range (ie. top edge peeks out from the bottom of the screen)
		// if (progress < 0 || progress > 1) { return; }

		// Use *actual* position data. An element may be onscreen while its reference (trigger) element is not.
		if (this.element.getBoundingClientRect().top > window.innerHeight ||
				this.element.getBoundingClientRect().bottom < 0
		) {
			return;
		}

		if (this.debug) {
			console.log(this.debug, progress);
		}

																// start      to  from  end
		// let easing = easeInOutQuad(data.start, 100, 0, data.start+data.duration);

		// cycle through any registered transformations
		scene.effects.forEach((effect) => {
			effect.call({
				'progress': progress,
				'absolute': scroll - start
			});
		});
	}
}
