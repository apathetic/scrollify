/*
 * Sticky
 * https://github.com/apathetic/scrollify/
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document console requestAnimationFrame HTMLElement*/

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} element: The element to sticky-ify
 * @param {Boolean} bounded: Whether the element should be bounded by its parent.
 * @return {void}
 */
export default function Sticky(element, bounded = true) {
  element = element instanceof HTMLElement ? element : document.querySelector(element);

  if (!element) { return false; }

  var parent = element.parentNode,
    elementPosition,
    parentPosition,
    currentState = '_',
    stateSwitcher,
    determine = {
      normal: function() {
        elementPosition = element.getBoundingClientRect();
        if (elementPosition.top < 1) { return setState('sticky'); }
      },
      sticky: function() {
        parentPosition = parent.getBoundingClientRect();
        if (parentPosition.top > 1) { return setState('normal'); }
        if (!bounded) { return; }   // don't worry about bottom edge
        elementPosition = element.getBoundingClientRect();
        if (parentPosition.bottom < elementPosition.bottom) {
          return setState('bottom');
        }
      },
      bottom: function() {
        elementPosition = element.getBoundingClientRect();
        if (elementPosition.top > 1) { return setState('sticky'); }
      }
    };

  function setState(state) {
    if (currentState === state) { return; }
    element.classList.remove(currentState);
    element.classList.add(state);
    currentState = state;
    stateSwitcher = determine[state];
  }

  elementPosition = element.getBoundingClientRect();

  //element initial position
  if (elementPosition.top < 1) {
    setState('sticky');
    stateSwitcher();    // edge case: check if bottom of element collides w/ bounding container
  } else {
    setState('normal');
  }


  // window.addEventListener('scroll', stateSwitcher);
  window.addEventListener('scroll', function() { stateSwitcher(); });  // stateSwitcher changes, so cannot pass (ie. bind directly) here
  window.addEventListener('resize', function() { stateSwitcher(); });
}

