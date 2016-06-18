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
	parallax(data) {
		let offset = 0;
		let opts = this.options;

		if (opts.speed !== undefined) {                 // check speed first
			offset = data.absolute * opts.speed;
		} else {                                        // fallback to range
			offset = data.progress * (opts.range || 0);   // default is "0", no effect
		}

		this.element.style[transform] = 'translate(0, '+ offset +'px)';
	},

	/**
	 * Toggle a class on or off.
	 * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
	 * @this: an object containing Options + element reference
	 * @return {void}
	 */
	toggle(data) {
		let opts = this.options;
		let element = this.element;
		let times = Object.keys(opts);		// times
		let now = data.progress;

		times.forEach(function(time) {
			let css = opts[time];
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
	translateX(opts) {
		let offset = this.absolute;
		let on = Object.keys(opts);
		let delay = window.innerHeight;	// start translating after one window-height of scrolling

		offset -= delay;

		// if (this.percent < 0.5) {    // test: start translating when element is centered in viewport
		//   offset -= delay;
		// } else {
		//   offset = 0;
		// }

		//  ease = easeInQuad(elapsed,     start, end, duration);
		let distance = 500;
		let ease = easeInQuad(this.percent * 100, 0, distance, 100);

		this.el.style[transform] = 'translate3d(' + ease + 'px, 0, 0)';
	}
}


/**
 * The Scrollify Class
 */
export default class Scrollify {

	constructor(element, debug) {
		if (element instanceof HTMLElement == false) { element = document.querySelector(element); }
		if (!element || !transform ) { return false; }

		this.trigger = element;		// by default. Update if there is a Scene with a particular trigger element
		this.element = element;
		this.ticking = false;
		this.scenes = [];
		// this.effects = [];
		this.data = { el: element, progress: 0, absolute: 0 };
		this.scroll = window.scrollY;
		this.debug = debug;

		window.addEventListener('scroll', (e) => this.onScroll(e));
		window.addEventListener('resize', (e) => this.onResize(e));
	}

	/**
	 * Initialize the "data" Object for each element, which contains position information as well
	 * as a reference to the DOM node. The calculatation needs to be made "as if from an initial
	 * scroll position of 0".
	 * @param  {Number} where: The location to start the effect. 1 is bottom, 0 is top of viewport.
	 * @return {void}
	 */
	initializeScene(scene) {
		let trigger = scene.trigger;
		let BCR = trigger.getBoundingClientRect();
		let where = 1;
		let top = 0;	// window.scrollY;

		// find position in the document:
		do {
				top += trigger.offsetTop || 0;
				trigger = trigger.offsetParent;
		} while(trigger);

		scene.start = top - (where * window.innerHeight);
		scene.duration = window.innerHeight + trigger.offsetHeight;

		this.calculate(scene);
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
		let start = opts.start || null;
		let duration = opts.duration || null;
		let effects = opts.effects;
		// let curry = (fn, options) => {
		// 	return function() {       // NOTE: don't use => function here as we do NOT want to bind "this"
	//       let context = {
	//       	'options': options,
	//       	'element': element
	//       };
	//       fn.call(context, this); // eslint-disable-line
		// 	}
		// };

		let scene = {
			'start': start,
			'duration': duration,
			// 'effect': curry(effectList[effectName], effectOptions)
			'effects': []
		};

		if (!start) { console.log('Scrollify [error]: Cannot add Scene. Missing "start" argument.'); return; }

		this.effects.forEach((effect) => {
			let effectName = opts.effects[0];
			let effectOptions = options.effects[1] || null;
			this.addEffect(effectName, effectOptions, scene);
		});

		// if (duration && end && !start) {
		// 	start = (end * window.innerHeight - duration);

		if (Array.isArray(start)) {
			this.target = document.querySelector(start[0]);
			this.initializeScene(start[1]);
		}

		if (duration) {
			this.duration = duration;
		}

		// scene.effects.push(curry(effectList[effectName], effectOptions));

		this.scenes.push(scene);

		return this;
	}

	/**
	 * Add a custom effect to Scrollify.
	 * @param  {String} name: The name of the transformation to add.
	 * @param  {Function} effect: The function that produces the tranformation.
	 * @return {void}
	 */
	 // TODO use 'effect' and type-check arguments for Function
	// addEffect(name, effect) {
	// 	effectList[name] = effect;
	// 	return this;
	// }

	/**
	 * Use an particular transformation on an Element.
	 * @param  {String|Function} name: The name of the transformation OR an actual function to apply.
	 * @param  {Object} options: Any transformation options.
	 * @return {void}
	 */
	addEffect(name, options, scene) {
		let element = this.element;

		// if no scene (ie "effect" was called directly on Scrollify), set up a default scene
		if (!scene) {
			let sceneOpts = {
				'start': 0,		// 		scene.start = top - (where * window.innerHeight);
				'duration': window.innerHeight + element.offsetHeight,
				'effects': [name, options]
			};
			return this.addScene(sceneOpts);
		} else {

			let curry = (fn, options) => {
				return function() {       // NOTE: don't use => function here as we do NOT want to bind "this"
					let context = {
						'options': options,
						'element': element
					};
					fn.call(context, this); // eslint-disable-line
				}
			}

			scene.effects.push(curry(effectList[name], options));

			if (name == 'stick') {
				new Sticky(element, true);
			}
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
		// this.throttle(this.initializeScene);
		this.scenes.forEach((scene) => this.initializeScene(scene));
		// this.initializeScene();  // or.. updateScene..?
		// this.update();
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
