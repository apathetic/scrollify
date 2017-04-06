/*
 Heavily modified version of http://github.com/desandro/imagesloaded

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

export default function ImagesLoaded(callback) {
  const imgs = document.querySelectorAll('img') || [];
  const images = Array.prototype.map.call(imgs, function(img) {
    if (img.nodeName === 'IMG') {
      return new LoadingImage(img);
    }
  });
  let progressedCount = 0;

  if (!images.length) {
    return callback();
  }

  images.forEach(function(loadingImage) {
    loadingImage.progress(function() {
      progressedCount++;
      if (progressedCount === images.length) {
        return callback();
      }
    });

    loadingImage.check();
  });
};

// --------------------------  -------------------------- //

function LoadingImage(img) {
  this.img = img;
  // this.listener = function() {};
}

LoadingImage.prototype.progress = function(listener) {
  this.listener = listener;
  return this;
};

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  const isComplete = this.img.complete && this.img.naturalWidth !== undefined;

  if (isComplete) {
    this.listener && this.listener.apply(this);
    return;
  }
  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener('load', this);
  this.proxyImage.addEventListener('error', this);
  // bind to image as well for Firefox. #191
  this.img.addEventListener('load', this);
  this.img.addEventListener('error', this);

  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.onload =
LoadingImage.prototype.onerror = function() {
  this.listener.apply(this);
  this.proxyImage.removeEventListener('load', this);
  this.proxyImage.removeEventListener('error', this);
  this.img.removeEventListener('load', this);
  this.img.removeEventListener('error', this);
};
