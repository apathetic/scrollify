/*
 * Sticky
 * https://github.com/apathetic/....?
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/


/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
export function sticky(sticky, bounded) {
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


  // window.addEventListener('scroll', stateSwitcher);
  window.addEventListener('scroll', function() { stateSwitcher(); });  // stateSwitcher changes, so cannot pass (ie. bind directly) here
  window.addEventListener('resize', function() { stateSwitcher(); });
}

