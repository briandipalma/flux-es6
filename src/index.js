import {Dispatcher} from './Dispatcher';

export function createStoreAndActions(storeConstructor, actionsConstructor) {
	var dispatcher = new Dispatcher();
	var store = new storeConstructor();
	var actions = new actionsConstructor(dispatcher);

	dispatcher.register((payload) => store.handleAction(payload));

	return [store, actions];
}

export {Store} from "./Store";
export {Dispatcher} from "./Dispatcher";