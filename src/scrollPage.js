/*global document requestAnimationFrame*/

import { easeInOutCubic } from './easings';


/**
 * Scroll the page to a particular page anchor
 * @param  {String} to: The id of the element to scroll to.
 * @param  {Integer} offset: A scrolling offset.
 * @param  {Function} callback: Function to apply after scrolling
 * @return {void}
 */
export default function scrollPage(to, offset = 0, callback) {
  let startTime;
  const duration = 500;
  const startPos = window.pageYOffset;
  const endPos = ~~(to.getBoundingClientRect().top - offset);
  const scroll = (timestamp) => {
    let elapsed;

    startTime = startTime || timestamp;
    elapsed = timestamp - startTime;

    document.body.scrollTop = document.documentElement.scrollTop = easeInOutCubic(elapsed, startPos, endPos, duration);

    if (elapsed < duration) {
      requestAnimationFrame(scroll);
    } else if (callback) {
      callback.call(to);
    }
  };

  requestAnimationFrame(scroll);
}
