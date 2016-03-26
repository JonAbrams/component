# PiecefulJS

[![Build Status](https://travis-ci.org/JonAbrams/pieceful.svg?branch=master)](https://travis-ci.org/JonAbrams/pieceful)

A very simple library for connecting your HTML with your JavaScript.

When Backbone, Angular, and React are overkill, add a tad of structure to your code using components, made up of pieces.

Features:
- Modularize your JS into components.
- Add structure by breaking components into "pieces".
- Easily declare event listeners.
- Makes use of jQuery if available, but it's not required.
- No external dependencies.
- Compatible with IE9+ and all other modern browsers.

## Usage Example

```html
<form data-component="terms">
  Do you agree to the terms and conditions?
  <input type="checkbox" data-piece="termCheckbox">
  <button type="submit" data-piece="termSubmit">Sign Up</button>
</form>

<script>
  component('terms', {
    pieces: ['termCheckbox', 'termSubmit'],
    events: {
      termCheckbox: {
        click: 'toggleSubmit'
      }
    },
    init: function () {
      this.termSubmit.disabled = true;
      /* or with jQuery available: */
      this.$termSubmit.attr('disabled', true);
    },
    toggleSubmit: function (event) {
      this.termSubmit.disabled = !event.target.checked;
    }
  });
</script>
```

## Installation

`npm install pieceful`

Then load `peaceful.js` onto your web site however you like. It provides a single global function: `component`.

## Credits

Created by [Jon Abrams](https://twitter.com/JonathanAbrams)
