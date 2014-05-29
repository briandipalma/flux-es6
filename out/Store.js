"use strict";
Object.defineProperties(exports, {
  Store: {get: function() {
      return Store;
    }},
  __esModule: {value: true}
});
var Emitr = $traceurRuntime.assertObject(require('emitr')).default;
var CHANGE_EVENT = 'change';
var Store = function Store() {
  $traceurRuntime.defaultSuperCall(this, $Store.prototype, arguments);
};
var $Store = Store;
($traceurRuntime.createClass)(Store, {
  emitChange: function() {
    this.trigger(CHANGE_EVENT);
  },
  addChangeListener: function(callback, context) {
    this.on(CHANGE_EVENT, callback, context);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}, {}, Emitr);
