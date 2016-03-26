var assert = require('assert');
var jsdom = require('jsdom');
var fs = require('fs');

var component = null;

var modalFile = fs.readFileSync('examples/modal.html', { encoding: 'utf8' });

beforeEach(function (done) {
  jsdom.env(modalFile, [], function (err, window) {
    global.window = window;
    global.document = window.document;
    component = require('../pieceful')
    done();
  });
});

describe('component', function () {
  describe('modal example', function () {
    beforeEach(function () {
      this.component = initModal()[0];
    });

    it('returns components', function () {
      var el = document.querySelector('[data-component=modal]');
      assert(el.components[0].constructor.name === 'Component');
    });

    describe('element assignment', function () {

      it('assigns root', function () {
        var root = document.querySelector('[data-component=modal]');
        assert(this.component.root === root);
      });

      it('assigns modalButton', function () {
        var button = document.querySelector('[data-piece=modalButton]');
        assert(this.component.modalButton === button);
      });

      it('assigns modal close', function () {
        var close = document.querySelector('[data-piece=modalClose]');
        assert(this.component.modalClose === close);
      });

      it('assigns modal container', function () {
        var container = document.querySelector('[data-piece=modalContainer]');
        assert(this.component.modalContainer === container);
      });
    });

    describe('clicking show modal', function () {
      it('shows the modal', function () {
        var button = document.querySelector('[data-piece=modalButton]');
        var modal = document.querySelector('[data-piece=modalContainer]');

        assert(modal.style.display === 'none');
        triggerEvent(button, 'click', {});
        assert(modal.style.display === 'block');
      });
    });

    describe('clicking hide modal', function () {
      it('hides the modal', function () {
        var button = document.querySelector('[data-piece=modalButton]');
        var close = document.querySelector('[data-piece=modalClose]');
        var modal = document.querySelector('[data-piece=modalContainer]');

        triggerEvent(button, 'click', {});
        assert(modal.style.display === 'block');
        triggerEvent(close, 'click', {});
        assert(modal.style.display === 'none');
      })
    })
  });
});

function triggerEvent(el, eventName, options) {
  var event;
  event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, true, true, options);
  el.dispatchEvent(event);
}

function initModal() {
  return component('modal', {
    pieces: ['modalContainer', 'modalButton', 'modalClose'],
    events: {
      modalButton: {
        click: 'showModal'
      },
      modalClose: {
        click: 'hideModal'
      }
    },
    init: function () {
      this.modalContainer.style.display = 'none';
    },
    showModal: function (e) {
      this.modalContainer.style.display = 'block';
    },
    hideModal: function (e) {
      this.modalContainer.style.display = 'none';
    }
  });
}
