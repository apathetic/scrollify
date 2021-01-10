/**
 * A list of some default "transformations" that may be applied
 */


/**
 * Translate an element along the X-axis.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const translateX = ({ options, transforms }) => {
  const to = (options.to !== undefined) ? options.to : 0;
  const from = (options.from !== undefined) ? options.from : 0;

  return (progress) => {
    transforms.position[0] = (to - from) * progress + from;
  };
};

/**
 * Translate an element vertically.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const translateY = ({ options, transforms }) => {
  const to = (options.to !== undefined) ? options.to : 0;
  const from = (options.from !== undefined) ? options.from : 0;// this.transforms.position[1];

  return (progress) => {
    transforms.position[1] = (to - from) * progress + from;
  };
};

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const rotate = ({ options, transforms }) => {
  return (progress) => {
    transforms.rotation[2] = options.rad * progress;
  };
};

/**
 * Uniformly scale an element along both axis'.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const scale = ({ options, transforms }) => {
  const to = (options.to !== undefined) ? options.to : 1;
  const from = (options.from !== undefined) ? options.from : transforms.scale[0];

  return (progress) => {
    const scale = (to - from) * progress + from;

    transforms.scale[0] = scale;
    transforms.scale[1] = scale;
  };
};

/**
 * Update an element's opacity.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const fade = ({ options, element }) => {
  const to = (options.to !== undefined) ? options.to : 0;
  const from = (options.from !== undefined) ? options.from : 1;

  return (progress) => {
    element.style.opacity = (to - from) * progress + from;
  };
};

/**
 * Update an element's blur.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const blur = ({ options, element }) => {
  const to = (options.to !== undefined) ? options.to : 0;
  const from = (options.from !== undefined) ? options.from : 0;

  return (progress) => {
    const amount = (to - from) * progress + from;
    element.style.filter = 'blur(' + amount + 'px)';
  };
};

/**
 * Parallax an element.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {object} context.transforms An object of matrix transforms to manipulate.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const parallax = ({ options, transforms }) => {
  const range = options.range || 0;

  return (progress) => {
    transforms.position[1] = progress * range;
  };
};

/**
 * Toggle a class on or off.
 * @param {object} context Setup options
 * @param {object} context.options Options for the scale effect
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
 * @returns {Function} A function that receives a normalized progress value.
 */
export const toggle = ({ options, element }) => {
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
 * @param {object} context Setup options
 * @param {HTMLElement} context.element A reference to the element to Scrollify.
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
[translateX, translateY, rotate, scale, parallax].forEach((fn) => {
  Object.defineProperty(fn, '__applyTransform', { value: true });
});
