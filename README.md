# ComponentJS

A very simple library for connecting your HTML with your JavaScript.

When Backbone, Angular, and React are overkill, add a tad of structure to your code using components.

Features:
- Modularize your JS.
- Add structure to your code.
- Easily declare event listeners.
- Makes use of jQuery if available, but it's not required.
- No dependencies.
- Compatible with IE9+.

## Example

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
