import transform from './transform';

/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize, and are curried in via "this".
 * NOTE: don't use arrow fn's here as they proxy "this"
 * @type {Object}
 */


/**
 * Parallax an element.
 * @type {Object} opts: You may define parallax "speed" or parallax "range" (in pixels).
 * @return {void}
 */
export function parallax(data) {
	let offset = 0;
	let opts = this.options;

	if (opts.speed !== undefined) {                 // check speed first
		offset = data.absolute * opts.speed;
	} else {                                        // fallback to range
		offset = data.progress * (opts.range || 0);   // default is "0", no effect
	}

	this.element.style[transform] = 'translate(0, '+ offset +'px)';
}

/**
 * Toggle a class on or off.
 * @type {Object} opts: The "class" to toggle, and when (ie. at which point in the progress)
 * @this: an object containing Options + element reference
 * @return {void}
 */
export function toggle(data) {
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
}

/**
 * Dummy effect for testing, at the moment
 */
export function translateX(opts) {
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
