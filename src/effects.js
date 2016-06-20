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
	let times = Object.keys(opts);
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
 * [rotate description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function rotate(data) {
	var degrees = this.options.deg * data.progress;
	this.element.style.transform = 'rotate('+ degrees +'deg)';
};

/**
 * Dummy effect for testing, at the moment
 */
export function translateX(data) {
	let offset = data.absolute;
	let progress = data.progress;
	let delay = window.innerHeight;	// start translating after one window-height of scrolling
	let distance = 500;

	offset = progress * distance;
	offset -= delay;

	this.el.style[transform] = 'translate3d(' + offset + 'px, 0, 0)';
}


/**
 * Sticky Element setsup a sticky element which toggle position fixed on / off.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
let currentState = '_';
export function stick(data) {
	let progress = data.progress;
	let element = this.element;

	if (progress <= 0) {
		setState(element, 'normal');
	} else if (progress >= 1) {
		setState(element, 'bottom');
	} else {
		setState(element, 'sticky');
	}
}

function setState(element, state) {
  let BCR = element.getBoundingClientRect();

  if (currentState === state) { return; }
  if (state == 'sticky') {
    applyStyles.call(element, BCR);
  } else {
    applyStyles.call(element, BCR, false);
  }

  element.classList.remove(currentState);
  element.classList.add(state);
  currentState = state;
}

function applyStyles(styles, on=true) {
  for (let prop in styles) {
    if (prop == 'bottom' || prop == 'right') { continue; }
    this.style[prop] = (on) ? styles[prop] + 'px' : '';
  }
  this.style.position = (on) ? 'fixed' : '';  // OR, deal with this via CSS...?
}
