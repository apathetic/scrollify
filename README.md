# Scrollify

Scrollify. Do things on scroll.

## What sorts of things?

Well, whatever you want. Common effects such as parallax or toggling a class on/off are possible and bundled within. However, you may also easily create your own custom scroll function, and pass it in to Scrollify. The built-in effects include:

- *Stick*: sticks an element to a particular point and holds in there for a
						pre-defined number of pixels.
- *Parallax*: move stuff on scroll. A subtle effect that transistions elements
						more slowly (or perhaps quickly) than the speed of the user-scroll.
- *Toggle*: turn a CSS class on or off if the element crosses a particular
						threshold on the page.
- *Translate*: translate an element along the X- or Y- axis.
- *Rotate*: rotate an element via scroll.
- *Scale*: scale an element.
- *Fade*: change an element's opacity.


###Notes
Scrollify works by first calculating an element's position in the page so that it may be manipulated on scroll. It is important to note that as the page loads, this position may jump around as the DOM is constructed and images are loaded, etc.  Therefore, it is important that Scrollify'd elements are not initialized until the page has finished loading all images and the DOM is stable.
If you're trying to Scrollify an element whose position on the page is dependant on assets loading above of it, you may wish to use __window.addEventListener('load'__ rather than the more common __window.addEventListener('DOMContentLoaded'__, OR check out the lovely <a href="https://github.com/desandro/imagesloaded">imagesloaded.js</a> plugin.

## Getting Started
Download it from [Github](https://github.com/apathetic/scrollify).

## Support
* IE9+
* Safari / Chrome
* Firefox

## Examples

Please see the _demo_ directory

## Release History

### 0.2
* quick scrolling bug fixing
* better IE support

### 0.1
* initial commit
