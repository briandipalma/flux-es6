"use strict";
Object.defineProperties(exports, {
  Dispatcher: {get: function() {
      return Dispatcher;
    }},
  __esModule: {value: true}
});
var Dispatcher = function Dispatcher() {
  this.promises = [];
  this.callbacks = [];
};
($traceurRuntime.createClass)(Dispatcher, {
  register: function(callback) {
    return this.callbacks.push(callback) - 1;
  },
  dispatch: function(payload) {
    var rejects = [];
    var resolves = [];
    function createPromiseForCallback(_, i) {
      return new Promise((function(resolve, reject) {
        rejects[i] = reject;
        resolves[i] = resolve;
      }));
    }
    function dispatchPayload(callback, i) {
      Promise.resolve(callback(payload)).then((function() {
        resolves[i](payload);
      }), (function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      }));
    }
    this.promises = this.callbacks.map(createPromiseForCallback);
    this.callbacks.forEach(dispatchPayload);
    this.promises = [];
  },
  waitFor: function(promiseIndexes, callback) {
    var $__0 = this;
    var selectedPromises = promiseIndexes.map((function(index) {
      return $__0.promises[index];
    }));
    return Promise.all(selectedPromises).then(callback);
  },
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }
}, {});
