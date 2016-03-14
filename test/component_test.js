var assert = require('assert');
var jsdom = require('jsdom');
var fs = require('fs');

var component = null;

var modalFile = fs.readFileSync('examples/modal.html').toString('utf8');

before(function (done) {
  jsdom.env(modalFile, [], function (err, window) {
    global.window = window;
    global.document = window.document;
    component = require('../component')
    done();
  });
});

describe('component', function () {
  describe('modal example', function () {
    beforeEach(function () {
      delete document.querySelector('[data-component=modal]').components;
    });
    
    it('returns components', function () {
      var el = document.querySelector('[data-component=modal]');
      component('modal', {})
      assert(el.components[0].constructor.name === 'Component');
    });
  });
});
