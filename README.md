# Scrollify
[![NPM Version](https://img.shields.io/npm/v/@hugeinc/scrollify.svg?style=flat-square)](https://www.npmjs.com/package/@hugeinc/scrollify)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/apathetic/scrollify/master/LICENSE)

> Scrollify. Do things on scroll. 4KB minified and gzipped. There are no dependencies; you do not need jQuery; you do not need TweenMax.

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
Scrollify works by first calculating an element's position in the page so that it may be manipulated on scroll. It is important to note that as the page loads, this position may jump around as the DOM is constructed and images are loaded, etc.  Therefore, it is recommended that Scrollify'd elements are not initialized until the page has finished loading all images and the DOM is stable. For example, if you're trying to _Scrollify_ an element whose position on the page is dependent on assets loading above of it, you may wish to use ```window.addEventListener('load'...``` rather than the more common ```'DOMContentLoaded'```.

## Demo

[Showcase](http://apathetic.github.io/showcase/components/scrollify/).

First, install dependencies and spin up a webserver via ```npm i && npm start```. Navigate to ```localhost:8080/demo``` to check out the demos. Code samples are therein.

## Getting Started

Either:
* npm: ```npm i @hugeinc/scrollify```
* github: download it from [Github](https://github.com/apathetic/scrollify).

## Support
* IE9+
* Safari / Chrome
* Firefox

## TODO
* sticky effect glitchy on resize
* relative units "+=", "-=", etc
* getComputedStyle to avoid defining default vals
* simplify API for effects / options definition

## Release History

### 1.0
* DOM helpers added; no longer req'd to use JS API to add effects and scenes

### 0.6
* modifying included helpers; now values are curried in vs. previous reliance on `this` for context

### 0.5
* duration may be a function, a string, or a float

### 0.4
* further bug fixing and optimizations

### 0.3
* start and duration can accept various parameter types: float, 'px', '%'
* internalized applyTransform check

### 0.2
* quick scrolling bug fixing
* better IE support

### 0.1
* initial commit
