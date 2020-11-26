"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBClient = void 0;
const cosmos_1 = require("@azure/cosmos");
class DBClient {
    constructor() {
        //for use cosmos db emulator
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.client = new cosmos_1.CosmosClient({
            endpoint: process.env.CosmosEmuUrl,
            key: process.env.CosmosEmuKey
        });
    }
    async run() {
        const { database } = await this.client.databases.createIfNotExists({ id: process.env.CosmosEmuDBid });
        this.database = database;
    }
    async readAll(containerId) {
        return this.database.container(containerId).items.readAll().fetchAll();
    }
    async readById(containerId, itemId) {
        return this.database.container(containerId).item(itemId).read();
    }
    async create(containerId, item) {
        await this.database.container(containerId).items.create(item);
    }
    async delete(containerId, itemId) {
        await this.database.container(containerId).item(itemId).delete();
    }
    async upsert(containerId, body) {
        return await this.database.container(containerId).items.upsert(body);
    }
    async query(containerId, query) {
        return await this.database.container(containerId).items
            .query(query)
            .fetchAll();
    }
}
exports.DBClient = DBClient;
