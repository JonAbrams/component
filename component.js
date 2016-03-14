(function (jQuery) {
  function Component (name, el, options) {
    var self = this;
    this.name = name;
    this.el = el;

    /* copy options' stuff to the new component */
    Object.keys(options).forEach(function (key) {
      self[key] = options[key];
    });

    /* Schedule init to run, if it exists */
    if (typeof options.init === 'function') {
      setTimeout(options.init.bind(options), 0);
    }

    /* Register pieces */
    if (Array.isArray(options.pieces)) {
      options.pieces.forEach(addPiece.bind(this, el));
    }

    /* Add event listeners */
    if (typeof options.events === 'object') {
      Object.keys(options.events).forEach(function (piece) {
        Object.keys(options.events[piece]).forEach(function (event) {
          var eventHandler = self.events[piece][event];
          self[piece].addEventListener(event, self[eventHandler].bind(self));
        });
      });
    }
  }

  function addPiece (el, piece) {
    this[piece] = el.querySelector('[data-piece=' + piece + ']');
    if (jQuery) this['$' + piece] = jQuery(this[piece]);
  }

  function component (name, options) {
    var elements = document.querySelectorAll('[data-component=' + name + ']');
    /* For each element requesting this component */
    return [].slice.call(elements).map(function (el) {
      /* Create component */
      var component = new Component(name, el, options);

      /* Add component to the element's list of components */
      if (el.components == null) el.components = [];
      el.components.push(component);

      return component;
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = component;
  } else {
    this.component = component;
  }
})((typeof jQuery !== 'undefined') ? jQuery : null);
