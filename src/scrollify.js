/*
 * scrollify
 * https://github.com/apathetic/scrollify
 *
 * Copyright (c) 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*eslint max-len: ["error", 120]*/
/*global document requestAnimationFrame console HTMLElement*/

// TODO add weakmap support for public / private methods

import transform from './transform';
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
    // if (!element || !transform) { return this.active = false; }
    if (!transform) { throw 'Scrollify [error]: transforms not supported'; }
    if (!element) { throw 'Scrollify [error]: could not find element'; }

    this.element = element;
    this.ticking = false;
    this.scenes = [];
    this.scroll = window.scrollY;
    this.active = true;
    this.matrix = createMatrix();
    this.transforms = {
      scale: [1,1],
      rotation: [0,0,0],
      position: [0,0,0]
      // transformOrigin: [],
      // skew: [],
    };

    window.addEventListener('scroll', (e) => this.onScroll(e));
    window.addEventListener('resize', (e) => this.onResize(e));
  }

  /**
   * Add a new Scene to the Scrollify object. Scene information includes when
   * to start applying an effect and for how long.
   * @param  {Object} opts: Various options to apply to the new Scene:
   *
   *   start: (required) When to start the effect. It is a 0 - 1 value
   *          representing the percentage of the viewport (eg. 0.5).
   *          Any effects in the Scene will begin when the trigger element
   *          crosses this threshold.
   *
   *   duration: The length of the effect, in pixels. Scrollify will
   *          interpolate that into value into a "progress" variable, bounded
   *          by 0 - 1. If not supplied, the default value is the height of the
   *          viewport + element height, meaning the effect will last for as
   *          long as the element is visible.
   *
   *   trigger: If supplied, Scrollify will use this element's position to
   *          start any Scene effects. If not supplied, the default is to use
   *          the element itself as a trigger.
   *
   *   easing: Ease in/out of an effect. Any value from Robert Penner's easing
   *          functions is valid.
   *
   * @return {void}
   */
  addScene(opts) {
    let triggerPos = opts.start || 0;
    let duration = opts.duration || window.innerHeight + this.element.offsetHeight;
    let easing = opts.easing || false;
    let effects = opts.effects || [];
    // let trigger = document.querySelector(opts.trigger) || this.element;
    let trigger = opts.trigger ? opts.trigger instanceof HTMLElement ? opts.trigger : document.querySelector(opts.trigger) : this.element;
    let applyTransform = opts.applyTransform !== undefined ? opts.applyTransform : true;   // opt out rather than opt in
    let scene = {
      // active: false,
      trigger: trigger,
      triggerPos: 1 - triggerPos,
      duration: duration,
      easing: easing,
      applyTransform: applyTransform,
      effects: []
    };

    scene.active = this.scroll > this.calculateStart(scene); // calculate any transformations if the scene has already passed.

    effects.map((effect) => {
      this.addEffect(effect.name, effect.options, scene);
    });

    this.updateScene(scene);
    this.scenes.push(scene);

    return this;
  }

  /**
   * Update each scene.
   * @param  {Object} scene: The scene to update.
   * @return {void}
   */
  updateScene(scene) {
    scene.start = this.calculateStart(scene);
    this.calculate(scene);
  }

  /**
   * Add a particular transformation to a scene.
   * @param  {Function} effect: The transformation function to apply.
   * @param  {Object} options: Any transformation options.
   * @param  {Object} scene: Object containing start and duration information.
   * @return {void}
   */
  addEffect(effect, options = {}, scene) {
    let element = this.element;
    let transforms = this.transforms;

    if (!scene) {
      if (this.scenes.length) {
        // use the most recently added scene
        scene = this.scenes[this.scenes.length - 1];
      } else {
        // or if no scene (ie "addEffect" was called directly on Scrollify), set up a default one
        return this.addScene({
          'effects': [{'name': effect, 'options': options}]
        });
      }
    }

    let curry = (fn, options) => {
      return function() {       // NOTE: don't use => function here as we do NOT want to bind "this"
        let context = {
          'options': options,
          'element': element,
          'transforms': transforms
        };

        fn.call(context, this); // eslint-disable-line
      };
    };

    scene.effects.push(curry(effect, options));

    return this;
  }

  /**
   * Calculate the start point of each scene.
   * @param  {[type]} scene A Scrollify Scene object.
   * @return {Integer} The start position of the Scene, in pixels.
   */
  calculateStart(scene) {
    let trigger = scene.trigger;
    let triggerPos = scene.triggerPos;
    let top = 0;

    do {
      top += trigger.offsetTop || 0;
      trigger = trigger.offsetParent;
    } while(trigger);
    // top = trigger.getBoundingClientRect().top + window.scrollY;

    return Math.max(0, top - triggerPos * window.innerHeight); // (can be negative...?)
  }

  /**
   * onScroll Handler
   * @return {void}
   */
  onScroll() {
    if (!this.active) { return; }
    this.scroll = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(this.update.bind(this));
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
    let start = scene.start;
    let duration = scene.duration;
    let scroll = this.scroll;
    let progress;
    let matrix;

    if (scroll - start > duration) {
      if (scene.active) {    // do one final iteration
        scene.active = false;
        progress = 1;
      } else {
        return;
      }
    } else if (scroll - start < 0) {
      if (scene.active) {    // do one final iteration
        scene.active = false;
        progress = 0;
      } else {
        return;
      }
    } else {
      scene.active = true;
      if (scene.easing) { //            start, from, to, end
        progress = scene.easing(scroll - start, 0, 1, duration);
      } else {
        progress = (scroll - start) / duration;
      }
    }

    // cycle through any registered transformations
    scene.effects.forEach((effect) => {
      effect.call(progress);
    });

    if (scene.applyTransform) {
      // transmogrify all applied transformations into a single matrix, and apply
      matrix = this.updateMatrix();
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

    // -----------------------------------------------------
    // IF we wished to perform rotation AFTER skew / position / etc, we could do it here.
    // The ordering is important, and has an effect.

    // if (t.rotationPost) {
    //   m.rotateX(t.rotationPost[0]);
    //   m.rotateY(t.rotationPost[1]);
    //   m.rotateZ(t.rotationPost[2]);
    // }

    // if (t.scalePost) {
    //   m.scale(t.scalePost[0], t.scalePost[1]);
    // }
    // -----------------------------------------------------


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

