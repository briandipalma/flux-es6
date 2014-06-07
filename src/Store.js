import Emitr from 'emitr';

var CHANGE_EVENT = 'change';

export class Store extends Emitr {
    emitChange() {
        this.trigger(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback, context) {
        this.on(CHANGE_EVENT, callback, context);
    }

    /**
     * @param {function} callback
     */
    addChangeListenerAndNotify(callback, context) {
        this.on(CHANGE_EVENT, callback, context);
		callback.apply(context);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

	/**
	 * Abstract method to be implemented by sub-class.
	 *
	 * @param {Object} payload
	 */
	handleAction(payload) {
		console.error(new Error('Abstract method {Store.handleAction} not implemented.'));
	}
}