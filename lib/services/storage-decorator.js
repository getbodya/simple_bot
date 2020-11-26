"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageDecorator = void 0;
class storageDecorator {
    constructor(storage) {
        this.storage = storage;
        storage.initialize;
    }
    async initialize() {
        console.log('STORAGE.INITIALIZE');
        return await this.storage.initialize();
    }
    async read(keys) {
        const items = await this.storage.read(keys);
        console.groupCollapsed('STORAGE.READ');
        console.log('keys', keys);
        console.log('items', items);
        console.groupEnd();
        return items;
    }
    async write(items) {
        console.groupCollapsed('STORAGE.WRITE');
        console.log(items);
        console.groupEnd();
        return await this.storage.write(items);
    }
    async delete(keys) {
        console.groupCollapsed('STORAGE.DELETE');
        console.log(keys);
        console.groupEnd();
        return await this.storage.delete(keys);
    }
}
exports.storageDecorator = storageDecorator;
