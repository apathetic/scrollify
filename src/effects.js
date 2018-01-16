/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize and are curried in via "this".
 *
 * NOTE: for all functions herein, "this" contains effect options, a
 * transformation Object, and also a reference to the element.
 */

/*global console*/
/*eslint no-invalid-this: "error"*/

import { transform } from './utils';


// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
[translateX, translateY, rotate, scale, parallax].forEach((fn) => {
  fn._applyTransform = true;
});


/**
 * Translate an element along the X-axis.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function translateX(progress) {
  const to = (this.options.to !== undefined) ? this.options.to : 0;
  const from = (this.options.from !== undefined) ? this.options.from : 0;
  const offset = (to - from) * progress + from;

  this.transforms.position[0] = offset;
}

/**
 * Translate an element vertically.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function translateY(progress) {
  const to = (this.options.to !== undefined) ? this.options.to : 0;
  const from = (this.options.from !== undefined) ? this.options.from : 0;// this.transforms.position[1];
  const offset = (to - from) * progress + from;

  this.transforms.position[1] = offset;
}

// export function translate(progress) {
//   const to = this.options.to;
//   const from = this.options.from;
//   const offsetX = (to[0] - from[0]) * progress + from[0];
//   const offsetY = (to[1] - from[1]) * progress + from[1];
//
//   this.transforms.position[0] = offsetX;
//   this.transforms.position[1] = offsetY;
// }

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function rotate(progress) {
  const radians = this.options.rad * progress;

  this.transforms.rotation[2] = radians;
};

/**
 * Uniformly scale an element along both axis'.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function scale(progress) {
  const to = (this.options.to !== undefined) ? this.options.to : 1;
  const from = (this.options.from !== undefined) ? this.options.from : this.transforms.scale[0];
  const scale = (to - from) * progress + from;

  this.transforms.scale[0] = scale;
  this.transforms.scale[1] = scale;
};

/**
 * Update an element's opacity.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function fade(progress) {
  const to = (this.options.to !== undefined) ? this.options.to : 0;
  const from = (this.options.from !== undefined) ? this.options.from : 1;
  const opacity = (to - from) * progress + from;

  this.element.style.opacity = opacity;
};

/**
 * Update an element's blur.
 * @param {Float} progress  Current progress of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function blur(progress) {
  const to = (this.options.to !== undefined) ? this.options.to : 0;
  const from = (this.options.from !== undefined) ? this.options.from : 0;
  const amount = (to - from) * progress + from;

  this.element.style.filter = 'blur(' + amount + 'px)';
};

/**
 * Parallax an element.
 * @param {Float} progress  Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function parallax(progress) {
  const range = this.options.range || 0;
  const offset = progress * range;        // TODO add provision for speed as well

  this.transforms.position[1] = offset;   // just vertical for now
}

/**
 * Toggle a class on or off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function toggle(progress) {
  const opts = this.options;
  const element = this.element;
  const times = Object.keys(opts);

  times.forEach(function(time) {
    const css = opts[time];

    if (progress > time) {
      element.classList.add(css);
    } else {
      element.classList.remove(css);
    }
  });
}

/**
 * Sticky Element: sets up a sticky element which toggles position 'fixed' on / off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function stick(progress) {
  let element = this.element;
  let currentState = element._currentState || null; // store prop on element

  if (progress <= 0) {
    setState(element, 'normal');
  } else if (progress >= 1) {
    setState(element, 'bottom');
  } else {
    setState(element, 'sticky');
  }

  function setState(element, state) {
    if (currentState === state) { return; }
    if (state == 'sticky') {
      let BCR = element.getBoundingClientRect();

      element.style.top = BCR.top + 'px';
      element.style.left = BCR.left + 'px';
      element.style.width = BCR.width + 'px';
    } else {
      element.style.top = '';
      element.style.left = '';
      element.style.width = '';
    }

    element.classList.remove(currentState);
    element.classList.add(state);
    element._currentState = state;
  }
}
