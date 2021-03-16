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


import { lerp } from './utils';


/**
 * Translate an element along the X-axis.
 * @param {object} transforms An object of matrix transforms
 * @param {object} options Options for the effect
 * @param {object} options.from Initial value for the translateX
 * @param {object} options.to Destination value for the translateX
 * @returns {Function} A function that receives a normalized progress value.
 */
export const translateX = ({ transforms, options }) => (progress) => {
  transforms.position[0] = lerp(...options, progress);
};

/**
 * Translate an element vertically.
 * @param {object} transforms An object of matrix transforms
 * @param {object} options Options for the effect
 * @param {object} options.from Initial value for the translateY
 * @param {object} options.to Destination value for the translateY
 * @returns {Function} A function that receives a normalized progress value.
 */
export const translateY = ({ transforms, options }) => (progress) => {
  transforms.position[1] = lerp(...options, progress);
};
export const parallax = translateY;


/**
 * Rotate an element along a specific axis, using radians
 * @param {object} transforms An object of matrix transforms
 * @param {object} options Options for the effect
 * @param {object} options.rad Rotation in radians. TODO degrees?
 * @returns {Function} A function that receives a normalized progress value.
 */
export const rotateX = ({ transforms, options }) => (progress) => {
  transforms.rotation[0] = lerp(...options, progress);
};

export const rotateY = ({ transforms, options }) => (progress) => {
  transforms.rotation[1] = lerp(...options, progress);
};

export const rotateZ = ({ transforms, options }) => (progress) => {
  transforms.rotation[2] = lerp(...options, progress);
};
export const rotate = rotateZ;


/**
 * Uniformly scale an element along an axis
 * @param {object} transforms An object of matrix transforms
 * @param {object} options Options for the effect
 * @param {object} options.from Initial value for the scale
 * @param {object} options.to Destination value for the scale
 * @returns {Function} A function that receives a normalized progress value.
 */
export const scaleX = ({ transforms, options }) => (progress) => {
  transforms.scale[0] = lerp(...options, progress);
};

// note: these default params won't ever be used....
export const scaleY = ({ transforms, options = [transforms.scale[1], 1] }) => (progress) => {
  transforms.scale[1] = lerp(...options, progress);
};

export const scale = ({ transforms, options }) => (progress) => {
  transforms.scale[0] = transforms.scale[1] = lerp(...options, progress);
};



export const skewX = ({ transforms, options }) => (t) => {
  transforms.skew[0] = lerp(...options, t);
};

export const skewY = ({ transforms, options }) => (t) => {
  transforms.skew[1] = lerp(...options, t);
};

export const skew = ({ transforms, options }) => (t) => {
  transforms.skew[0] = transforms.skew[1] = lerp(...options, t);
};


/**
 * Update an element's opacity.
 * @param {HTMLElement} element The element to fade
 * @param {object} options Options for the effect
 * @param {object} options.from Initial fade value
 * @param {object} options.to Destination fade value
 * @returns {Function} A function that receives a normalized progress value.
 */
export const fade = ({ element, options }) => (progress) => {
  element.style.opacity = lerp(...options, progress);
};


/**
 * Update an element's blur.
 * NOTE: this is a relatively CPU-heavy operation
 * @param {HTMLElement} element The element to blur
 * @param {object} options Options for the effect
 * @param {object} options.from Initial fade value
 * @param {object} options.to Destination fade value
 * @returns {Function} A function that receives a normalized progress value.
 */
export const blur = ({ element, options }) => (progress) => {
  element.style.filter = 'blur(' + lerp(...options, progress) + 'px)';
};


/**
 * Toggles a class on or off.
 * @param {HTMLElement} element A element to toggle class(es) on
 * @param {object} options Options for the effect
 * @returns {Function} A function that receives a normalized progress value.
 */
export const toggle = ({ element, options }) => {
  const times = Object.keys(options);

  return (progress) => {
    times.forEach((time) => {
      const css = options[time];
      element.classList.toggle(css, progress > +time);
    });
  };
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



// Effects that do _not_ use matrix transformations.
// [stick, toggle, blur, fade].forEach((fn) => {
//   Object.defineProperty(fn, 'skipMatrix', { value: true });
// });

// Effects that use matrix transformations. At present, only
// built-in effects benefit from matrix transformations.
[translateX, translateY, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, skew, skewX, skewY].forEach((fn) => {
  // Object.defineProperty(fn, '__applyTransform', { value: true });
  Object.defineProperty(fn, 'useMatrix', { value: true });
});
