var assert = require('assert');
var jsdom = require('jsdom');
var fs = require('fs');
var $ = null;

var component = null;

var modalFile = fs.readFileSync('examples/modal.html', { encoding: 'utf8' });

describe('with jquery', function () {
  beforeEach(function (done) {
    jsdom.env(modalFile, ['node_modules/jquery/dist/jquery.js'], function (err, window) {
      global.window = window;
      global.document = window.document;
      $ = window.$;
      component = require('../pieceful');
      done();
    });
  });

  describe('component', function () {
    describe('modal example', function () {
      beforeEach(function (done) {
        initModal(function (component) {
          this.component = component;
          done();
        }.bind(this));
      });

      it('returns components', function () {
        var el = document.querySelector('[data-component=modal]');
        assert(el.components[0].constructor.name === 'Component');
        assert($(el).data('components') === el.components);
      });

      describe('element assignment', function () {

        it('assigns root', function () {
          var root = document.querySelector('[data-component=modal]');
          assert(this.component.root === root);
          assert(this.component.$root[0] === root);
        });

        it('assigns modalButton', function () {
          var button = document.querySelector('[data-piece=modalButton]');
          assert(this.component.modalButton === button);
          assert(this.component.$modalButton[0] === button);
        });

        it('assigns modal close', function () {
          var close = document.querySelector('[data-piece=modalClose]');
          assert(this.component.modalClose === close);
          assert(this.component.$modalClose[0] === close);
        });

        it('assigns modal container', function () {
          var container = document.querySelector('[data-piece=modalContainer]');
          assert(this.component.modalContainer === container);
          assert(typeof this.component.$modalContainer === 'object');
        });
      });

      describe('clicking show modal', function () {
        it('shows the modal', function () {
          var button = $('[data-piece=modalButton]');
          var modal = $('[data-piece=modalContainer]');

          assert(modal.css('display') === 'none');
          button.click();
          assert(modal.css('display') === 'block');
        });
      });

      describe('clicking hide modal', function () {
        it('hides the modal', function () {
          var button = $('[data-piece=modalButton]');
          var close = $('[data-piece=modalClose]');
          var modal = $('[data-piece=modalContainer]');

          button.click();
          assert(modal.css('display') === 'block');
          close.click();
          assert(modal.css('display') === 'none');
        })
      })
    });
  });

  function initModal(cb) {
    component('modal', {
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
        this.$modalContainer.hide();
      },
      showModal: function (e) {
        this.$modalContainer.show();
      },
      hideModal: function (e) {
        this.$modalContainer.hide();
      }
    }, cb);
  }

});
