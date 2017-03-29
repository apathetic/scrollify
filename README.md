# Scrollify

Scrollify. Do things on scroll.

## What sorts of things?

Well, whatever you want. Common effects such as parallax or toggling a class on/off are possible and bundled within. However, you may also easily create your own custom scroll function, and pass it in to Scrollify. The built-in effects include:

- **Stick**: sticks an element to a particular point and holds in there for a pre-defined number of pixels.
- **Parallax**: move stuff on scroll. A subtle effect that transitions elements more slowly (or perhaps quickly) than the speed of the user-scroll.
- **Toggle**: turn a CSS class on or off if the element crosses a particular threshold on the page.
- **Translate**: translate an element along the X- or Y- axis.
- **Rotate**: rotate an element via scroll.
- **Scale**: scale an element.
- **Fade**: change an element's opacity.


### Notes
Scrollify works by first calculating an element's position in the page so that it may be manipulated on scroll. It is important to note that as the page loads, this position may jump around as the DOM is constructed and images are loaded, etc.  Therefore, it is important that Scrollify'd elements are not initialized until the page has finished loading all images and the DOM is stable.

If you're trying to _Scrollify_ an element whose position on the page is dependant on assets loading above of it, you may wish to use ```window.addEventListener('load'...``` rather than the more common ```'DOMContentLoaded'```; or, check out the lovely [imagesloaded.js](https://github.com/desandro/imagesloaded) plugin.

## API
Coming soon. Please see the demo/index.html page for now.

## Examples

First, spin up a webserver via ```npm i && npm start```. Navigate to ```localhost:8080/demo``` to check out the demos. Code samples are therein.

## Getting Started

Either:
* ```npm install @hugeinc/scrollify```
* Download it from [Github](https://github.com/apathetic/scrollify).

## Support
* IE9+
* Safari / Chrome
* Firefox

## Todo
* add weakmap support for public / private methods

## Release History

### 0.2
* quick scrolling bug fixing
* better IE support

### 0.1
* initial commit
