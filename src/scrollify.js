/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016, 2017 Wes Hatch
 * Licensed under the MIT license.
 *
 */

import { getRef, getPosition, isFunc, isArray } from './utils';
import * as Effects from './effects';
import * as Easings from './easings';
import createMatrix from './matrix';

const transform = 'transform';
const scrollifys = [];
let initialized = false;



const calculateRefs = (refs) => refs.map(getRef).map(getPosition);


/**
 * Converts a `value` string into its pixel-equivalent using data from the
 * `refs` array and a mix of custom CSS and JS syntax.
 * @param {string} value The string to dynamically interpret.
 * @param {DOMRect[]} refs An array of BCRs from the `refs` option.
 * @param {...} el A reference to the Scrollify'd element
 *
 * CSS units such as `vh` and `vw` are converted, while the following functions
 * are also supported:
 *
 *  max(): returns the maximum value from a list of inputs
 *  css(): fetches the current CSS property value of an element
 *
 * @example "refs[3].bottom"
 * @example "refs[4].top - 100vh"
 * @example "refs[3].bottom - css(padding-top, refs[0]) - css(top, refs[0])",
 * @example "max((100vh / refs[2].height), (100vw / refs[2].width)) + 0.02"
 */
function parseValue(val, refs = [], el) {
  if (typeof val === 'number') {
    return val;
  }

  // /** var(--top-spacing) **/
  // function var(str) {
  //   // ... returns a CSS var ie --top-padding
  // }

  // helper parsing functions
  const css = (prop, el) => parseFloat(window.getComputedStyle(el)[prop]) || 0;
  const max = (...args) => Math.max(...args);
  const min = (...args) => Math.min(...args);

  const pageHeight = document.body.scrollHeight;
  const pageWidth = document.body.scrollWidth;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return new Function('refs', 'el', `'use strict';return (${val
    .replace(/(\d*)vw/g, (match, v) => .01 * v * screenWidth)
    .replace(/(\d*)vh/g, (match, v) => .01 * v * screenHeight)
    .replace(/px/g, '')
  });`)(refs, el);
}



/**
 * The Scrollify Class
 */
export default class Scrollify {

  /**
   * @constructor
   * @param {HTMLElement} element: The element to Scrollify.
   */
  constructor(element) {
    element = getRef(element);

    if (!element) {
      // throw new Error('Scrollify requires an `element`');
      document.querySelectorAll('[data-scrollify]').forEach((el) => new Scrollify(el));
      return;
    }

    if (element.dataset.scrollify) {
      // ... parseDataAttribute(element)
      // .. addScene()
    }


    this.scenes = []; // scenes = [];

    this.element = element;
    this.ticking = false;
    this.active = true;
    this.matrix = createMatrix();
    this.transforms = {
      scale: [1, 1],
      rotation: [0, 0, 0],
      position: [0, 0, 0],
      // skew: [],
      // transformOrigin: [0,0,0]
    };

    element.style.willChange = transform;

    // scrollifys.push(this);
    if (!initialized) {
      initialized = true;
    }
    // else {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    // }



  }

  parseDataAttribute(el) {
    const parser = (str) => Function(`'use strict';return (${str})`)();

    return parser(el.dataset.scrollify);
  }

  /**
   * Add a new Scene to the Scrollify object. Scene information includes when
   * to start applying an effect and for how long.
   * @param  {Object} opts: Various options to apply to the new Scene:
   *
   *     start: (required) When to start the effect. It is a 0 - 1 value
   *            representing the percentage of the viewport (eg. 0.5).
   *            Any effects in the Scene will begin when the trigger element
   *            crosses this threshold.
   *
   *  duration: The length of the effect, in pixels. Scrollify will
   *            interpolate that into value into a "progress" variable, bounded
   *            by 0 - 1. If not supplied, the default value is the height of
   *            the viewport + element height, meaning the effect will last for
   *            as long as the element is visible.
   *
   *   trigger: If supplied, Scrollify will use this element's position to
   *            start any Scene effects. If not supplied, the default is to use
   *            the element itself as a trigger.
   *
   *    easing: Ease in/out of any effects in the Scene.
   *
   */
  addScene(data) {
    let { element, transforms } = this;
    let {
      start = 'el.top - 100vh',
      end = 'el.bottom',
      easing,
      refs = [],
      effects = {}
    } = data;

    // const calculateEffects = (r, el) => Object.keys(effects).reduce(this.addEffect, []);
    const calculateEffects = (r, el) => Object.keys(effects).reduce((fx, name) => {
      let value = effects[name];
      let fn;
      let options;

      if (isFunc(value)) {
        fn = value;
      } else {
        fn = Effects[name];
        options = isArray(value) ? value.map((v) => parseValue(v, r, el)) : value;
      }

      fx.push(fn({ element, transforms, options }));

      return fx;
    }, []);

    let scene = {
      start: 0,
      duration: 0,
      state: '',
      easing: isFunc(easing) ? easing : Easings[easing],
      effects: [],
      reset: () => {
        const scroll = window.scrollY;
        const el = getPosition(element);
        const r = calculateRefs(refs);
        const s = parseValue(start, r, el);
        const e = parseValue(end, r, el);
        const fx = calculateEffects(r, el);

        scene.effects = fx;
        scene.start = s;
        scene.duration = e - s;
        scene.state = (scroll > s) ? (scroll > e) ? 'after' : 'active' : 'before';

        this.update(scene);
      }
    };

    if (data.skipMatrix) {
      // scene.skipMatrix = scene.effects.every((fn) => fn.skipMatrix);
      // internal-use only. Whether to use matrix transforms or not.
      scene.skipMatrix = true;
    }

    scene.reset();

    if (data.debug) {
      console.log('Scrollify scene: ', scene);
    }

    this.scenes.push(scene);

    return this;
  }


  /**
   * Adds an effect to a scene.
   * @param  {array} fx A reference to the `effects` array
   * @param  {string} name The name of the effect to add
   * @param  {number} i ignore for now
   * @param  {object} effects A reference to ... .
   * /
  addEffect(fx, name, i, effects) {
    let value = effects[name];
    let options;
    let fn;

    if (typeof value == 'function') {
      fn = value;
    } else {
      fn = Effects[name];
      // if (!fn) { throw Error(`${name} not recognized`); }
      options = value.map((val) => parseValue(val, r, el));
    }

    fx.push(fn({ element, transforms, options }));

    return fx;
  }


  /**
   * onScroll Handler
   */
  onScroll() {
    if (!this.active) { return; }

    window.requestAnimationFrame(() => {
      this.scenes.forEach((s) => this.update(s), this);
    });
  }


  /**
   * onResize handler
   * TODO: debounce?
   * @return {void}
   */
  onResize() {
    this.scenes.forEach((s) => s.reset());
  }


  /**
   * Update the transformation effects for each scene.
   * @param  {object} scene The `scene` object.
   * @param  {number} scene.start When the `scene` is active and effects calculated.
   * @param  {number} scene.duration How long the scene is "active" for, in px.
   * @param  {array} scene.effects An array of effects to apply to the `element`.
   * @param  {string} scene.state A label for the scene's running state.
   * @param  {function} scene.easing Custom easing for the progress value.
   */
  update(scene) {
    const { start, duration, easing, effects } = scene;
    const scroll = window.scrollY;
    let progress;

    // after end
    if (scroll - start > duration) {
      if (scene.state !== 'after') {    // do one final iteration
        scene.state = 'after';
        progress = 1;
      } else {
        return;
      }

    // before start
    } else if (scroll - start < 0) {
      if (scene.state !== 'before') {    // do one final iteration
        scene.state = 'before';
        progress = 0;
      } else {
        return;
      }

    // active
    } else {
      scene.state = 'active';
      if (easing) { //            start, from, to, end
        progress = easing(scroll - start, 0, 1, duration);
      } else {
        progress = (scroll - start) / duration;
      }
    }

    // cycle through any registered transformations
    effects.forEach((effect) => effect(progress));

    if (scene.skipMatrix) { return; }

    // transmogrify all applied transformations into a single matrix, and apply
    this.element.style[transform] = this.updateMatrix().asCSS();
  }


  /**
   * Loop through all the element's transformation data and calculates a matrix representing it.
   * @return {object} Ye olde Matrix
   */
  updateMatrix() {
    let { matrix, transforms: t } = this;

    matrix.clear();

    // here we adjust the transformOrigin ...
    if (t.transformOrigin) {
      matrix.translate(-t.transformOrigin[0], -t.transformOrigin[1], -t.transformOrigin[2]);
    }

    if (t.scale) {
      matrix.scale(t.scale[0], t.scale[1]);
    }

    if (t.skew) {
      matrix.skew(t.skew[0], t.skew[1]);
    }

    if (t.rotation) {
      matrix.rotateX(t.rotation[0]);
      matrix.rotateY(t.rotation[1]);
      matrix.rotateZ(t.rotation[2]);
    }

    if (t.position) {
      matrix.translate(t.position[0], t.position[1], t.position[2]);
    }

    // ...and here we put it back.
    if (t.transformOrigin) {
      matrix.translate(t.transformOrigin[0], t.transformOrigin[1], t.transformOrigin[2]);
    }

    return matrix;
  }


  /**
   * Disable Scrollify-ing. Perhaps for performance reasons / mobile devices.
   * @return {void}
   */
  disable() {
    this.active = false;
  }
}
