/**
 * Put Scrollify into the Global scope.
 * Useful for existing demos or if you wish to include manually
 */

import scrollify from './scrollify.js';
import Sticky from './sticky';
import * as fx from './effects';
import {easeOutQuad} from './easings';

scrollify.fx = fx;
// scrollify.easings = {};

window.Scrollify = scrollify;
// window.Sticky = Sticky;

