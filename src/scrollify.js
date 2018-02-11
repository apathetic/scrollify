/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016, 2017 Wes Hatch
 * Licensed under the MIT license.
 *
 */

import { transform, getUnit } from './utils';
import createMatrix from './matrix';


/**
 * The Scrollify Class
 */
export default class Scrollify {

  /**
   * @constructor
   * @param {HTMLElement|String} element: The element to Scrollify.
   */
  constructor(element) {
    if (element instanceof HTMLElement == false) { element = document.querySelector(element); }
    if (!element || !transform) {
      console.log('Scrollify [error] ', arguments[0]);
      return this.disable();
    }

    this.element = element;
    this.ticking = false;
    this.scenes = [];
    this.scroll = window.scrollY || window.pageYOffset;
    this.active = true;
    this.matrix = createMatrix();
    this.transforms = {
      scale: [1,1],
      rotation: [0,0,0],
      position: [0,0,0],
      // transformOrigin: [0,0,0]
      // skew: [],
    };

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
   * @return {void}
   */
  addScene(opts) {
    const trigger = opts.trigger ? opts.trigger instanceof HTMLElement ? opts.trigger : document.querySelector(opts.trigger) : this.element;
    const easing = opts.easing || false;
    const effects = opts.effects || [];
    let scene = {
      _trigger: trigger,                  // keep for internal calculations
      _applyTransform: false,             // internal-use only. Whether to use matrix transforms or not. Perhaps should be moved to *effect* level
      _offset: opts.start || 0,           // store original value for later calcs
      _duration: opts.duration || 1,      // store original value for later calculations
      // start: 0,                        // absolute value in px. Some percentage of the viewport
      // duration: duration,              // absolute value in px. Some percentage of the viewport
      easing: easing,
      effects: []
    };

    effects.map((effect) => {
      this.addEffect(effect.fn, effect.options, scene);
    });

    this.calculateStart(scene);
    this.calculateDuration(scene);

    scene.state = (this.scroll > this.start) ? (this.scroll > this.start + scene.duration) ? 'after' : 'active' : 'before';

    this.calculate(scene);
    this.scenes.push(scene);

    if (opts.debug) {
      console.log('Scrollify scene: ', scene);
    }

    return this;
  }

  /**
   * Update each scene.
   * @param  {Object} scene: The scene to update.
   * @return {void}
   */
  updateScene(scene) {
    this.calculateStart(scene);
    this.calculateDuration(scene);
    this.calculate(scene);
  }

  /**
   * Add a particular transformation to a scene.
   * @param  {Function} effect: The transformation function to apply.
   * @param  {Object} options: Any transformation options.
   * @param  {Object} scene: Object containing start and duration information.
   * @return {void}
   */
  addEffect(fn, options = {}, scene) {
    const element = this.element;
    const transforms = this.transforms;
    const context = { options, element, transforms };

    if (!scene) {
      if (this.scenes.length) {
        // use the most recently added scene
        scene = this.scenes[this.scenes.length - 1];
      } else {
        // or if no scene (ie "addEffect" was called directly on Scrollify), set up a default one
        return this.addScene({
          'effects': [{'fn': fn, 'options': options}]
        });
      }
    }

    // if any effect uses a matrix tranformation, we use true for the entire scene
    scene._applyTransform = scene._applyTransform || fn._applyTransform;
    scene.effects.push(fn.bind(context));
    // scene.effects.push(() => { fn.call(context); });

    return this;
  }

  /**
   * Calculate the start point of each scene.
   * @param  {Scrollify.Scene} scene A Scrollify Scene object.
   * @return {Integer} The start position of the Scene, in pixels.
   */
  calculateStart(scene) {
    const offset = window.innerHeight - this.mapTo(scene._offset, window.innerHeight);
    let trigger = scene._trigger;
    let top = 0;

    do {
      top += trigger.offsetTop || 0;
      trigger = trigger.offsetParent;
    } while(trigger);
    // var test = trigger.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);

    scene.start = Math.max(0, top - offset);
  }

  /**
   * [mapTo description]
   * @param  {[type]} input [description]
   * @param  {[type]} scale [description]
   * @return {[type]}       [description]
   */
  mapTo(input, scale) {
    const parsed = parseFloat(input);
    const unit = getUnit(input);

    switch (unit) {
      case 'px':
        return parsed;
      case '%':
        return parsed / 100.0 * scale;
      default:
        return parsed * scale;
    }
  }

  /**
   * [calculateDuration description]
   * @param  {[type]} scene [description]
   * @return [type]         [description]
   */
  calculateDuration(scene) {
    scene.duration = (typeof scene._duration === 'function') ?
      scene._duration(scene._trigger) :
      this.mapTo(scene._duration, window.innerHeight + this.element.offsetHeight);
  }

  /**
   * onScroll Handler
   * @return {void}
   */
  onScroll() {
    if (!this.active) { return; }

    this.scroll = window.scrollY || window.pageYOffset;
    this.direction = (this.scroll > this.previousScroll) ? 'down' : 'up';
    this.previousScroll = this.scroll;

    if (!this.ticking) {
      window.requestAnimationFrame(this.update.bind(this));
      // window.requestAnimationFrame(() => { this.update(); });
      this.ticking = true;
    }
  }

  /**
   * onResize Handler
   * @return {void}
   */
  onResize() {
    this.scenes.forEach(this.updateScene, this);
  }

  /**
   * Update the transformations for every scene.
   * @return {void}
   */
  update() {
    this.scenes.forEach(this.calculate, this);
    this.ticking = false;
  }

  /**
   * Calculate the transformations for each scene.
   * @param  {Object} scene: An Object containing start and duration
   *                         information as well as an Array of
   *                         transformations to apply.
   * @return {void}
   */
  calculate(scene) {
    const start = scene.start;
    const duration = scene.duration;
    const scroll = this.scroll;
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
      if (scene.easing) { //            start, from, to, end
        progress = scene.easing(scroll - start, 0, 1, duration);
      } else {
        progress = (scroll - start) / duration;
      }
    }

    // cycle through any registered transformations
    scene.effects.forEach((effect) => {
      effect(progress);
    });

    if (scene._applyTransform) {
      // transmogrify all applied transformations into a single matrix, and apply
      let matrix = this.updateMatrix();
      this.element.style[transform] = matrix.asCSS();
    }
  }

  /**
   * Loop through all the element's transformation data and calculates a matrix representing it.
   * @return {Matrix} Ye olde Matrix
   */
  updateMatrix() {
    let t = this.transforms;
    let m = this.matrix;

    m.clear();

    // here we adjust the transformOrigin ...
    if (t.transformOrigin) {
      m.translate(-t.transformOrigin[0], -t.transformOrigin[1], -t.transformOrigin[2]);
    }

    if (t.scale) {
      m.scale(t.scale[0], t.scale[1]);
    }

    if (t.skew) {
      m.skew(t.skew[0], t.skew[1]);
    }

    if (t.rotation) {
      m.rotateX(t.rotation[0]);
      m.rotateY(t.rotation[1]);
      m.rotateZ(t.rotation[2]);
    }

    if (t.position) {
      m.translate(t.position[0], t.position[1], t.position[2]);
    }

    // ... and here we put it back. (This duplication is not a mistake).
    if (t.transformOrigin) {
      m.translate(t.transformOrigin[0], t.transformOrigin[1], t.transformOrigin[2]);
    }

    return m;
  }

  /**
   * Disable Scrollify-ing. Perhaps for performance reasons / mobile devices.
   * @return {void}
   */
  disable() {
    this.active = false;
  }
}
