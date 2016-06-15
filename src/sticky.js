/*
 * sticky nav
 * https://github.com/apathetic/stickynav
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/


import {easeInOutCubic} from './easings';


/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
export function StickyElement(sticky, bounded) {
  sticky = sticky instanceof HTMLElement ?
           sticky : document.querySelector(sticky);
  bounded = bounded || sticky.getAttribute('data-bounded') || false;

  if (!sticky) { return false; }

  var parent = sticky.parentNode,
    stickyPosition,
    parentPosition,
    currentState = '_',
    stateSwitcher,
    determine = {
      normal: function() {
        stickyPosition = sticky.getBoundingClientRect();
        if (stickyPosition.top < 1) { return setState('sticky'); }
      },
      sticky: function() {
        parentPosition = parent.getBoundingClientRect();
        if (parentPosition.top > 1) { return setState('normal'); }
        if (!bounded) { return; }   // don't worry about bottom edge
        stickyPosition = sticky.getBoundingClientRect();
        if (parentPosition.bottom < stickyPosition.bottom) {
          return setState('bottom');
        }
      },
      bottom: function() {
        stickyPosition = sticky.getBoundingClientRect();
        if (stickyPosition.top > 1) { return setState('sticky'); }
      }
    };

  function setState(state) {
    if (currentState === state) { return; }
    sticky.classList.remove(currentState);
    sticky.classList.add(state);
    currentState = state;
    stateSwitcher = determine[state];
  }

  stickyPosition = sticky.getBoundingClientRect();

  //sticky initial position
  if (stickyPosition.top < 1) {
    setState('sticky');
    stateSwitcher();    // edge case: check if bottom of sticky collides w/ bounding container
  } else {
    setState('normal');
  }

  window.console.log(this);

  // window.addEventListener('scroll', stateSwitcher);
  window.addEventListener('scroll', function() { stateSwitcher(); });  // stateSwitcher changes, so cannot pass (ie. bind directly) here
  window.addEventListener('resize', function() { stateSwitcher(); });
}

/**
 * Scroll the page to a particular page anchor
 * @param  {string} to: The id of the element to scroll to.
 * @param  {Integer} offset: A scrolling offset.
 * @param  {Function} callback: Function to apply after scrolling
 * @return {void}
 */
export function scrollPage(to, offset = 0, callback) {
  var root = document.body;
  var duration = 500;
  var startTime;
  var startPos = root.scrollTop;
  var endPos = ~~(to.getBoundingClientRect().top - offset);

  var scroll = (timestamp) => {
    var elapsed;

    startTime = startTime || timestamp;
    elapsed = timestamp - startTime;
    root.scrollTop = easeInOutCubic(elapsed, startPos, endPos, duration);

    if (elapsed < duration) {
      requestAnimationFrame(scroll);
    } else {
      callback.call(to);
    }
  };

  requestAnimationFrame(scroll);
}



/**
 * Sticky Nav: creates a sticky side navigation using data- attributes from the page
 * @return {void}
 */
export class StickyNav {


  /**
   * Update the active nav item on window.scroll
   * @return {void}
   */
  updateSelectedItem() {
    if (!this.ticking && !this.isScrolling) {
      this.ticking = true;
      window.requestAnimationFrame(this.checkSectionPosition.bind(this));
    }
  }

  /**
   * Check each section's getBoundingClientRect to determine which is active
   * @return {void}
   */
  checkSectionPosition() {
    var i = this.sections.length;

    // Find i. Start at end and work back
    for (i; i--;) {
      if (~~this.sections[i].getBoundingClientRect().top <= 0) {    // note: ~~ is Math.floor
        break;
      }
    }

    // Add active class to currentSection, or remove if nothing is currently active
    if (i !== this.currentSection) {
      this.items.forEach((item) => { item.classList.remove('active'); });
      if (i >= 0) {
        this.items[i].classList.add('active');
      }
      this.currentSection = i;
    }

    this.ticking = false;
  }



  constructor(options = {}) {
    this.items = [];
    this.ticking = false;
    this.isScrolling = false;
    this.currentSection = null;
    this.sections = options.sections ||
                    document.querySelectorAll('[data-scene]');
    this.handle = document.querySelector(options.nav);

    if (!this.sections || !this.handle) { return false; }

    var bounded = options.bounded || false;


    this.checkSectionPosition();

    new StickyElement(this.handle, bounded);

    window.addEventListener('scroll', this.updateSelectedItem.bind(this));
  }


}
