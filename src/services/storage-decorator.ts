import { CosmosDbPartitionedStorage } from "botbuilder-azure";

export class storageDecorator {

	constructor(private storage: CosmosDbPartitionedStorage) {
		storage.initialize
	}

	public async initialize() {
		console.log('STORAGE.INITIALIZE')
		return await this.storage.initialize()
	}

	public async read(keys) {
		const items = await this.storage.read(keys)
		console.groupCollapsed('STORAGE.READ');
		console.log('keys', keys);
		console.log('items', items);
		console.groupEnd();
	
		return items
	}

	public async write(items) {
		console.groupCollapsed('STORAGE.WRITE');
		console.log(items);
		console.groupEnd();
		return await this.storage.write(items)
	}

	public async delete(keys) {
		console.groupCollapsed('STORAGE.DELETE');
		console.log(keys);
		console.groupEnd();
		return await this.storage.delete(keys)
	}

}