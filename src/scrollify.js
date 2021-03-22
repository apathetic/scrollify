/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016, 2017 Wes Hatch
 * Licensed under the MIT license.
 *
 */

import { getRef, getPosition, parseDataAttribute, isFunc, isArray, css, min, max, lerp, interpolate } from './utils';
import * as Effects from './effects';
import * as Easings from './easings';
import createMatrix from './matrix';

// const transforms = ['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotate',
//                     'rotateX', 'rotateY', 'rotateZ', 'skew', 'skewX', 'skewY'];
const scenes = [];
let initialized = false;

const SCALE = 'scale';
const POSITION = 'position';
const ROTATION = 'rotation';
const SKEW = 'skew';
const STATE = {
  BEFORE: 'before',
  AFTER:  'after',
  ACTIVE: 'active'
};

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

  // const pageHeight = document.body.scrollHeight;
  // const pageWidth = document.body.scrollWidth;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return new Function('refs', 'el', 'css', 'min', 'max', `'use strict';return (${val
    .replace(/(\d*)vw/g, (match, v) => .01 * v * screenWidth)
    .replace(/(\d*)vh/g, (match, v) => .01 * v * screenHeight)
    .replace(/px/g, '')
  });`)(refs, el, css, max, min);
}



//



function createInterpolator(value, refs, pos) {
  let times = Object.keys(value);
  let values = Object.values(value);

  if (isArray(value)) {
    value = value.map((v) => parseValue(v, refs, pos));
    return (t) => lerp(...value, t);
  }

  if (isFunc(values[0])) { // or "isInterpolatable() ?
    // discreteMode; for strings, classnames, etc
    // TODO need a better way to trigger "discrete" / non-interpolating mode
    // currently: it checks if the `value` is a function
    return (t) => {
      let index = 0;
      times.forEach((a) => (a < t) && index++);
      return index ? values[index - 1]() : '';
    };
  }

  values = values.map((v) => parseValue(v, refs, pos));
  return (t) => interpolate(times, values, t);
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

    if (!element) {
      // throw new Error('Scrollify requires an `element`');
      return document.querySelectorAll('[data-scrollify]').forEach((el) => new Scrollify(el));
    }

    element = getRef(element);

    // initialized || (initialized = true,
      // window.addEventListener('scroll', () => this.onScroll(), { passive: true }),
      window.addEventListener('scroll', () => this.onScroll()),
      window.addEventListener('resize', () => this.onResize(), { passive: true });
    // );

    this.scenes = []; // scenes = [];
    this.element = element;
    this.active = true;
    this.matrix = createMatrix();
    this.transforms = {
      [SCALE]: [1, 1],
      [ROTATION]: [0, 0, 0],
      [POSITION]: [0, 0, 0],
      [SKEW]: [0, 0],
      // transformOrigin: [0,0,0]
    };


    if (element.dataset.scrollify) {
      const data = parseDataAttribute(element);
      this.addScene(data);
    }
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
    let {
      start = '0, el.top - 100vh',
      end = 'el.bottom',
      easing,
      refs = [],
      effects = {}
    } = data;

    const { element } = this;
    const scene = { // tween = {
      element,
      // matrix: ...

      start: 0,
      duration: 0,
      state: '',
      easing: isFunc(easing) ? easing : Easings[easing],
      effects: [],
      reset: () => {
        const scroll = window.scrollY;
        const pos = getPosition(element);
        const r = calculateRefs(refs);
        const s = parseValue(start, r, pos);
        const e = parseValue(end, r, pos);

        scene.effects = this.calculateEffects.call(this, effects, r, pos);
        scene.start = s;
        scene.duration = e - s; // dur ? parseValue(dur) : e - s;
        scene.state = (scroll > s) ? (scroll > e) ? STATE.AFTER : STATE.ACTIVE : STATE.BEFORE;
        // scene.useMatrix = useMatrix; // || data.skipMatrix // (force override?) // internal-use only. ....

        this.update(scene);
      }
    };

    scene.reset();

    if (this.useMatrix) {
      element.style.willChange = 'transform';
    }

    if (data.debug) {
      console.log('Scrollify scene: ', scene);
    }

    this.scenes.push(scene);

    return this;
  }


  /**
   * Generates the function for each `effect` in a scene taking into account
   * the element's position, the position of any refs, and any interpolation
   * of the scrolling input (ie. using multiple keyframes).
   * Also determines if the effect is a matrix transformation and sets a flag
   * if so, which enables further performance optimizations.
   * @param {Object} effects A reference to the `effects` key / values
   * @param {Array} refs An array of BCRs from the `refs` option
   * @param {Object} pos A BCR-like position object for the main `el`
   */
  calculateEffects(effects, refs, pos) {
    let { element, transforms } = this;

    return Object.keys(effects).reduce((fx, name) => {
      let value = effects[name];
      let interpolator;
      let fn;

      if (isFunc(value)) {
        fn = value({ element, transforms });
        interpolator = (v) => v;
      } else {
        fn = Effects[name]({ element, transforms });
        interpolator = createInterpolator(value, refs, pos);

        // Effects that use matrix transformations. At present, only
        // built-in effects benefit from matrix transformations.
        const m = new RegExp(`(?<${SCALE}>scale)|(?<${POSITION}>x|y|z)|(?<${ROTATION}>rotate)|(?<${SKEW}>skew)/i`).exec(name); // eslint-disable-line max-len
        const t = m && Object.keys(m.groups).filter((i) => m.groups[i]).toString();
        fn && t && (this.transforms[t].isActive = this.useMatrix = true);
      }

      fx.push((t) => fn(interpolator(t)));

      return fx;
    }, []);
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
      if (scene.state !== STATE.AFTER) {    // do one final iteration
        scene.state = STATE.AFTER;
        progress = 1;
      } else {
        return;
      }

    // before start
    } else if (scroll - start < 0) {
      if (scene.state !== STATE.BEFORE) {    // do one final iteration
        scene.state = STATE.BEFORE;
        progress = 0;
      } else {
        return;
      }

    // active
    } else {
      scene.state = STATE.ACTIVE;
      if (easing) { //            start, from, to, end
        progress = easing(scroll - start, 0, 1, duration);
      } else {
        progress = (scroll - start) / duration;
      }
    }

    // cycle through any registered transformations
    effects.forEach((effect) => effect(progress));

    if (this.useMatrix) {
      // transmogrify all applied transformations into a single matrix, and apply
      this.element.style['transform'] = this.updateMatrix().asCSS();
    }
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

    if (t.scale.isActive) {
      matrix.scale(t.scale[0], t.scale[1]);
    }

    if (t.skew.isActive) {
      matrix.skew(t.skew[0], t.skew[1]);
    }

    if (t.rotation.isActive) {
      matrix.rotateX(t.rotation[0]);
      matrix.rotateY(t.rotation[1]);
      matrix.rotateZ(t.rotation[2]);
    }

    if (t.position.isActive) {
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
