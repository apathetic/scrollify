/*
 * Sticky
 * https://github.com/apathetic/....?
 *
 * Copyright (c) 2012, 2016 Wes Hatch
 * Licensed under the MIT license.
 *
 */

/*global document requestAnimationFrame HTMLElement*/

// boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
// copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);

function copyStyles(element) {
  let style = element.style;
  const props = ['width', 'height', 'position', 'boxSizing', 'mozBoxSizing', 'webkitBoxSizing'];

  element.originalStyles = {};
  props.forEach((val) => {
    element.originalStyles[val] = style[val] || '';
  });
}

function applyStyles(styles, element) {
  let addedProps = {};
  for (let prop in styles) {
    if (prop == 'bottom' || prop == 'right') { continue; }
    element.style[prop] = styles[prop] + 'px';
    addedProps[prop] = styles[prop];
  }
  // element.addedProps = addedProps;
}

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky: The element to sticky-ify
 * @param {Boolean} bounded: Whether to apply stickiness to the bottom of the parent container.
 * @return {void}
 */
export default function Sticky(sticky, bounded=false) {
  sticky = sticky instanceof HTMLElement ? sticky : document.querySelector(sticky);
  if (!sticky) { return false; }

  var parent = sticky.parentNode,
    // stickyPosition,
    // parentPosition,
    currentState = '_',
    stateSwitcher,
    determine = {
      normal: function() {
        let stickyPosition = sticky.getBoundingClientRect();
        if (stickyPosition.top < 1) {
          applyStyles(stickyPosition, sticky);
          sticky.style.position = 'fixed';
          return setState('sticky');
        }
      },
      sticky: function() {
        let parentPosition = parent.getBoundingClientRect();
        if (parentPosition.top > 1) {
          sticky.style = '';
          return setState('normal');
        }
        if (bounded) {
          let stickyPosition = sticky.getBoundingClientRect();
          if (parentPosition.bottom < stickyPosition.bottom) {
            sticky.style = '';
            return setState('bottom');
          }
        }
      },
      bottom: function() {
        let stickyPosition = sticky.getBoundingClientRect();
        if (stickyPosition.top > 1) {
          applyStyles(stickyPosition, sticky);
          sticky.style.position = 'fixed';
          return setState('sticky');
        }
      }
    };

  function setState(state) {
    if (currentState === state) { return; }
    sticky.classList.remove(currentState);
    sticky.classList.add(state);
    currentState = state;
    stateSwitcher = determine[state];
  }

  // stickyPosition = sticky.getBoundingClientRect();

  //sticky initial position
  if (sticky.getBoundingClientRect().top < 1) {
    setState('sticky');
    stateSwitcher();    // edge case: check if bottom of sticky collides w/ bounding container
  } else {
    setState('normal');
  }


  // window.addEventListener('scroll', stateSwitcher);
  window.addEventListener('scroll', function() { stateSwitcher(); });  // stateSwitcher changes, so cannot pass (ie. bind directly) here
  window.addEventListener('resize', function() { stateSwitcher(); });
}

