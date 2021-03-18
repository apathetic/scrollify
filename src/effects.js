/**
 * A list of default transformations that may be applied. Each transformation
 * effect will receive three arguments, `transforms`, `element`, and `options`,
 * and must return a function that receives a progress argument.
 *
 * @example sampleEffect({ transforms, element, options }) => (p) => {...}
 *
 *  transforms: A (CSS) transformation matrix that is applied to the
 *              scrollif'ed element. Represents all CSS transforms (translate,
 *              skew, rotate, etc) in a matrix format.
 *
 *     element: A reference to the scrollify'd DOM node.
 *
 *     options: An options object, `to`, `from`, etc.
 */


/**
 * Translate an element along the X-axis / vertically.
 * @param {object} transforms An object of matrix transforms
 * @param {number} val The distance, in px, to translate the element.
 * @returns {Function} A function that receives an keyframe-interpolated value.
 */
export const translateX = ({ transforms }) => (val) => transforms.position[0] = val;
export const translateY = ({ transforms }) => (val) => transforms.position[1] = val;
export const parallax = translateY;


/**
 * Rotate an element along a specific axis, using radians
 * @param {object} transforms An object of matrix transforms
 * @param {number} val Rotation in radians. TODO degrees?
 * @returns {Function} A function that receives a keyframe-interpolated value.
 */
export const rotateX = ({ transforms }) => (val) => transforms.rotation[0] = val;
export const rotateY = ({ transforms }) => (val) => transforms.rotation[1] = val;
export const rotateZ = ({ transforms }) => (val) => transforms.rotation[2] = val;
export const rotate = rotateZ;


/**
 * Uniformly scale an element along an axis
 * @param {object} transforms An object of matrix transforms
 * @param {number} val The value for the scale
 * @returns {Function} A function that receives a keyframe-interpolated value.
 */
export const scaleX = ({ transforms }) => (val) => transforms.scale[0] = val;
export const scaleY = ({ transforms }) => (val) => transforms.scale[1] = val;
export const scale = ({ transforms }) => (val) => transforms.scale[0] = transforms.scale[1] = val;


/**
 * Skew an element along an axis
 * @param {object} transforms An object of matrix transforms
 * @param {number} val The value ...
 * ....
 */
export const skewX = ({ transforms }) => (val) => transforms.skew[0] = val;
export const skewY = ({ transforms }) => (val) => transforms.skew[1] = val;
export const skew = ({ transforms }) => (val) => transforms.skew[0] = transforms.skew[1] = val;


/**
 * Update an element's opacity.
 * @param {HTMLElement} element The element to fade
 * @param {number} val The fade value
 * @returns {Function} A function that receives a keyframe-interpolated value.
 */
export const fade = ({ element }) => (val) => {
  element.style.opacity = val;
};


/**
 * Update an element's blur.
 * NOTE: this is a relatively CPU-heavy operation
 * @param {HTMLElement} element The element to blur
 * @param {object} options Options for the effect
 * @returns {Function} A function that receives a normalized progress value.
 */
export const blur = ({ element }) => (val) => {
  element.style.filter = 'blur(' + val + 'px)';
};


/**
 * Toggles a class on or off.
 * NOTE: blows away all other classes at present...
 * @param {HTMLElement} element A element to toggle class(es) on
 * @param {string} name The `classname` to be added.
 * @returns {Function} A function that receives xxxxx from a discrete set of options.
 */
export const toggle = ({ element }) => (name) => {
  element.className = name;
};


/**
 * Sticky Element: sets up a sticky element which toggles position 'fixed' on / off.
 * NOTE: this is a POC, a little CSS is also required
 * @param {HTMLElement} element The element to stick
 * @returns {Function} A function that receives a normalized progress value.
 */
export const stick = ({ element }) => {
  function setState(state) {
    let currentState = element.__currentState; // store state on element

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
    element.__currentState = state;
  }

  return (progress) => {
    if (progress <= 0) {
      setState('normal');
    } else if (progress >= 1) {
      setState('bottom');
    } else {
      setState('sticky');
    }
  };
};



// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
[translateX, translateY, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, skew, skewX, skewY].forEach((fn) => {
  Object.defineProperty(fn, 'useMatrix', { value: true });
});
