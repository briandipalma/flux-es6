"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var promises = [];
var callbacks = [];
var $__default = {
  register: function(callback) {
    return callbacks.push(callback) - 1;
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
        rejects[i](new Error("Dispatcher callback unsuccessful"));
      }));
    }
    promises = callbacks.map(createPromiseForCallback);
    callbacks.forEach(dispatchPayload);
    promises = [];
  },
  waitFor: function(promiseIndexes, callback) {
    var selectedPromises = promiseIndexes.map((function(index) {
      return promises[index];
    }));
    return Promise.all(selectedPromises).then(callback);
  },
  handleViewAction: function(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  },
  handleServerAction: function(action) {
    this.dispatch({
      source: "SERVER_ACTION",
      action: action
    });
  }
};
