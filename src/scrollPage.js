
import {easeInOutCubic} from './easings';


/**
 * Scroll the page to a particular page anchor
 * @param  {string} to: The id of the element to scroll to.
 * @param  {Integer} offset: A scrolling offset.
 * @param  {Function} callback: Function to apply after scrolling
 * @return {void}
 */
export default function scrollPage(to, offset = 0, callback) {
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


