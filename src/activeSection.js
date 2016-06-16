
/**
 * Sticky Nav: creates a sticky side navigation using data- attributes from the page
 * @return {void}
 */
export class StickyNav {


  /**
   * Update the active nav item on window.scroll
   * @return {void}
   */
  updateSelectedItem() {
    if (!this.ticking && !this.isScrolling) {
      this.ticking = true;
      window.requestAnimationFrame(this.checkSectionPosition.bind(this));
    }
  }

  /**
   * Check each section's getBoundingClientRect to determine which is active
   * @return {void}
   */
  checkSectionPosition() {
    var i = this.sections.length;

    // Find i. Start at end and work back
    for (i; i--;) {
      if (~~this.sections[i].getBoundingClientRect().top <= 0) {    // note: ~~ is Math.floor
        break;
      }
    }

    // Add active class to currentSection, or remove if nothing is currently active
    if (i !== this.currentSection) {
      this.items.forEach((item) => { item.classList.remove('active'); });
      if (i >= 0) {
        this.items[i].classList.add('active');
      }
      this.currentSection = i;
    }

    this.ticking = false;
  }



  constructor(options = {}) {
    this.items = [];
    this.ticking = false;
    this.isScrolling = false;
    this.currentSection = null;
    this.sections = options.sections ||
                    document.querySelectorAll('[data-scene]');
    this.handle = document.querySelector(options.nav);

    if (!this.sections || !this.handle) { return false; }

    var bounded = options.bounded || false;


    this.checkSectionPosition();

    new StickyElement(this.handle, bounded);

    window.addEventListener('scroll', this.updateSelectedItem.bind(this));
  }

}