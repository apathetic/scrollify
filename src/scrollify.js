/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016, 2017 Wes Hatch
 * Licensed under the MIT license.
 *
 */

import { mapTo } from './utils';
import createMatrix from './matrix';
const transform = 'transform';


/**
 * Calculate the start point of each scene.
 * @param  {HTMLElement} trigger ....
 * @return {number} The start position of the Scene, in pixels.
 */
function calculateStart(trigger, offset = 0) {
  const c = window.innerHeight - (offset * window.innerHeight);
  const top = trigger ? trigger.getBoundingClientRect().top + window.pageYOffset : 0;

  return Math.max(0, top - c);
}

/**
 * [calculateDuration description]
 * @param  {number|string|Function} d The duration, as a fixed px value, a % of the element, or a custom function
 * @param  {HTMLElement} el The element to Scrollify
 * @return [type]         [description]
 */
function calculateDuration(d = 1, el) {
  return (typeof d === 'function') ?
    d(el) :
    mapTo(d, window.innerHeight + el.offsetHeight);
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
    if (element instanceof HTMLElement === false) {
      element = document.querySelector(element);
    }

    if (!element) {
      throw new Error('Scrollify requires an `element`');
    }

    this.element = element;
    this.ticking = false;
    this.scenes = [];
    this.active = true;
    this.matrix = createMatrix();
    this.transforms = {
      scale: [1,1],
      rotation: [0,0,0],
      position: [0,0,0],
      // transformOrigin: [0,0,0]
      // skew: [],
    };

    element.style.willChange = transform;

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => this.onResize(), { passive: true });
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
  addScene(opts) {
    let { trigger, easing, effects, start, duration } = opts;
    let { element, transforms } = this;

    effects = effects || [];
    trigger = trigger ?
      trigger instanceof HTMLElement ?
        trigger :
        document.querySelector(trigger) :
      element;

    let scene = {
      start: 0,
      duration: 0,
      state: '',
      easing: easing,
      effects: effects.map(({ fn, options }) => fn({ options, element, transforms })),
      reset: () => {
        const scroll = window.scrollY;
        scene.start = calculateStart(trigger, start);
        scene.duration = calculateDuration(duration, element);
        scene.state = (scroll > scene.start) ? (scroll > scene.start + scene.duration) ? 'after' : 'active' : 'before';
        this.update(scene);
      }
    };

    // internal-use only. Whether to use matrix transforms or not.
    // Perhaps should be moved to *effect* level
    scene.__applyTransform = effects.some(({ fn }) => fn.__applyTransform);
    scene.reset();

    this.scenes.push(scene);

    if (opts.debug) {
      console.log('Scrollify scene: ', scene);
    }

    return this;
  }

  /**
   * Convenience method to add an effect directly to a scrollify'd element.
   * i.e. "addEffect" was called directly on Scrollify
   * @param  {Function} fn The transformation function to apply.
   * @param  {object} options Any transformation options.
   * @param  {object} scene Object containing scene data.
   */
  addEffect(fn, options = {}, scene) {
    const { element, transforms } = this;

    if (!scene) {
      if (!this.scenes.length) this.addScene({});
      scene = this.scenes[this.scenes.length - 1];
    }

    scene.effects.push( fn({ options, element, transforms }) );
    scene.__applyTransform = scene.__applyTransform || fn.__applyTransform;
  }

  /**
   * onScroll Handler
   * TODO: debounce?
   */
  onScroll() {
    if (!this.active) { return; }

    window.requestAnimationFrame(() => {
      this.scenes.forEach((s) => this.update(s), this);
    });
  }

  /**
   * onResize handler
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
        if (scene.start === 3050) console.log('setting to before', progress);
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

    if (scene.__applyTransform) {
      // transmogrify all applied transformations into a single matrix, and apply
      this.element.style[transform] = this.updateMatrix().asCSS();
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

    // ... and here we put it back. (This duplication is not a mistake).
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
