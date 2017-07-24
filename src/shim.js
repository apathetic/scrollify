/**
 * Put Scrollify into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */

import Scrollify from './scrollify.js';
import * as fx from './effects';
import * as easings from './easings';

window.Scrollify = Scrollify;
window.Scrollify.fx = fx;
window.Scrollify.easings = easings;
