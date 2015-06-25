/**
 * Responsive tabs JavaScript
 */

(function (window) {
  // Reponsive Tabs
  function ResponsiveTabs(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    this._init();
  }

  ResponsiveTabs.prototype.options = {
    nav: 'nav',
    start: 0,
    skip: []
  };

  ResponsiveTabs.prototype._init = function () {
    // tabs elements
    this.tabs = [].slice.call(this.el.querySelectorAll(this.options.nav + ' > ul > li'));
    // [].slice.call()  --- neat shortcut for converting a DOM NodeList into a regular array

    // content items
    this.items = [].slice.call(this.el.querySelectorAll('.content > section'));

    // current index
    this.current = -1;

    // show current content item
    this._show();

    // init events
    this._initEvents();
  };

  ResponsiveTabs.prototype._initEvents = function () {
    var self = this;
    var skip = this.options.skip;
    this.tabs.forEach(function (tab, index) {
      if (skip.indexOf(index) === -1) {
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          self._show(index);
        });
      }
    });
  };

  ResponsiveTabs.prototype._show = function (index) {
    if (this.current >= 0) {
      // Remove classes
      this.tabs[this.current].className = this.tabs[this.current].className.replace(new RegExp('(^|\\s)*' + 'tab-current' + '(\\s|$)*', 'g'), '');
      this.items[this.current].className = this.items[this.current].className.replace(new RegExp('(^|\\s)*' + 'content-current' + '(\\s|$)*', 'g'), '');
    }
    // change current
    this.current = index !== undefined ? index : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
    this.tabs[this.current].className += (this.tabs[this.current].className ? ' ' : '') + 'tab-current';
    this.items[this.current].className += (this.items[this.current].className ? ' ' : '') + 'content-current';
  };

  // Helper Function
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  // Add to global namespace
  window.ResponsiveTabs = ResponsiveTabs;
})(window);