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
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}