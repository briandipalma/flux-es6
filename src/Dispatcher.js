export class Dispatcher {
	constructor() {
		this.promises = [];
		this.callbacks = [];
	}

	/**
	 * Register a Store's callback so that it may be invoked by an action.
	 * @param {function} callback The callback to be registered.
	 * @return {number} The index of the callback within the _callbacks array.
	 */
	register(callback) {
		return this.callbacks.push(callback) - 1;
	}

	/**
	 * dispatch
	 * @param {object} payload The data from the action.
	 */
	dispatch(payload) {
		var rejects = [];
		var resolves = [];

		function createPromiseForCallback(_, i) {
			return new Promise((resolve, reject) => {
				rejects[i] = reject;
				resolves[i] = resolve;
			});
		}

		function dispatchPayload(callback, i) {
			// Callback can return an obj, to resolve, or a promise, to chain.
			Promise
				.resolve(callback(payload))
				.then(
					() => { resolves[i](payload); },
					() => { rejects[i](new Error('Dispatcher callback unsuccessful')); }
				);
		}

		this.promises = this.callbacks.map(createPromiseForCallback);

		// Dispatch to callbacks and resolve/reject promises.
		this.callbacks.forEach(dispatchPayload);

		this.promises = [];
	}

	/**
	* Allows a store to wait for the registered callbacks of other stores
	* to get invoked before its own does.
	*/
	waitFor(promiseIndexes, callback) {
		var selectedPromises = promiseIndexes.map(index => this.promises[index]);

		return Promise.all(selectedPromises).then(callback);
	}

	/**
	 * A bridge function between the views and the dispatcher, marking the action
	 * as a view action.
	 * @param {object} action The data coming from the view.
	 */
	handleViewAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}

	handleServerAction(action) {
		this.dispatch({
			source: 'SERVER_ACTION',
			action: action
		});
	}
}