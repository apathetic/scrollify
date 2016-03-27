# Parallax

Parallax. Moves stuff on scroll.

## Introduction

There are several ways to approach building a parallax effect on a site. Paul Lewis has <a href="http://www.html5rocks.com/en/tutorials/speed/parallax/">a great overview</a> on the popular techniques and their
pros and cons. In brief:

- **absolute positioning**: parallax is achieved via positioning elements absolutely (this technique also includes
	positioning a background image attachment). In general, this is the absolute worst way to do parallax from a
	performance point of view. Everything must be recalculated and re-painted on scroll, so avoid this if possible. The
	upside: you can support IE8 this way.
- **3D transforms**: how the code herein operates. We offload elements in their own render layer to the GPU for X- or
	Y-transforms. _Almost_ the most efficient (see below), but still very flexible and easy to implement. Browsers need
	to support transforms.
- **canvas**: one fixed element background (a canvas), that animates on scroll. Elements are placed into the canvas and
	moved about on scroll -- this is the most efficient, but difficult to implement (or impossible if you wish to use
	existing DOM elements).

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://github.com/apathetic/parallax/blob/master/dist/parallax.min.js
[max]: https://github.com/apathetic/parallax/blob/master/src/parallax.js

Include the relevant scripts in your web page, and then:

```html
<script>
	window.onload = parallax.init({ el: '.parallax' });
</script>
```

### Integration into your project
You'll notice that this (by default) adds a property to the Global namespace. This isn't necessarily a bad thing;
rather, the onus is now on you to do what you wish with it.

If you're using a build script (ie. Grunt, Gulp), you can [_deglobalify_][deglobalify] and [_browserify_][browserify],
for example, and deal with the ```parallax``` object as you'd wish. See [this article][article] on Browserify for more
info.

[deglobalify]: https://www.npmjs.org/package/deglobalify
[browserify]: https://www.npmjs.org/package/grunt-browserify
[article]: http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html


## Documentation
Elements on the page can have different attributes, as referenced through particular data-atrributes. For example:

```html
<div class="parallax item" data-parallax-speed="1"></div>
```


## Support
* IE9+
* Safari / Chrome
* Firefox

## Known Issues

## Examples

Please see the _demo_ directory

## Release History


### 0.1
* initial commit
