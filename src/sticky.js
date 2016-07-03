/*
 * Sticky
 * https://github.com/apathetic/scrollify/
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} element: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
export default class Sticky {

  constructor(element, bounded=true) {
    this.element = element instanceof HTMLElement ? element : document.querySelector(element);
    if (!this.element) { return false; }

    this.bounded = !!bounded;
    this.parent = this.element.parentNode;
    this.currentState = '_';
    this.stateSwitcher;
    this.determine = 'normal';

    // determine initial state
    if (this.element.getBoundingClientRect().top < 1) {
      this.setState('sticky');
      this.stateSwitcher();
    } else {
      this.setState('normal');
    }

    // window.addEventListener('scroll', this.stateSwitcher);    // stateSwitcher changes, so cannot pass (ie. bind directly) like this
    window.addEventListener('scroll', () => { this.stateSwitcher(); });
    window.addEventListener('resize', () => { this.stateSwitcher(); });
  }

  normal() {
    let elementPosition = this.element.getBoundingClientRect();
    if (elementPosition.top < 1) {
      return this.setState('sticky');
    }
  }

  sticky() {
    let parentPosition = this.parent.getBoundingClientRect();
    if (parentPosition.top > 1) {
      return this.setState('normal');
    }
    if (this.bounded) {
      let elementPosition = this.element.getBoundingClientRect();
      if (parentPosition.bottom < elementPosition.bottom) {
        return this.setState('bottom');
      }
    }
  }

  bottom() {
    let elementPosition = this.element.getBoundingClientRect();
    if (elementPosition.top > 1) {
      return this.setState('sticky');
    }
  }

  setState(state) {
    if (this.currentState === state) { return; }
    this.element.classList.remove(this.currentState);
    this.element.classList.add(state);
    this.currentState = state;
    this.stateSwitcher = this[state];   // stateSwitcher will point at an internal fn
  }
}

