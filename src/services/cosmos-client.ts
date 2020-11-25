import {CosmosClient, Database, SqlQuerySpec} from '@azure/cosmos';

export class DBClient{
	private client: CosmosClient;
	private database: Database;

	constructor() {
		//for use cosmos db emulator
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		this.client = new CosmosClient({
			endpoint: process.env.CosmosEmuUrl,
			key: process.env.CosmosEmuKey
		})
	}

	public async run(): Promise<void> {
		const { database } = await this.client.databases.createIfNotExists({ id: process.env.CosmosEmuDBid });
		this.database = database;
	}
	
	public async readAll(containerId: string) {
		return this.database.container(containerId).items.readAll().fetchAll();
	}

	public async readById(containerId: string, itemId: string) {
		return this.database.container(containerId).item(itemId).read()
	}

	public async create(containerId: string, item) {
		await this.database.container(containerId).items.create(item)
	}

	public async delete(containerId: string, itemId: string) {
		await this.database.container(containerId).item(itemId).delete();
	}
	
	public async upsert(containerId: string, body: any) {
		return await this.database.container(containerId).items.upsert(body)
	}
	
	public async query(containerId: string, query: SqlQuerySpec | string) {
		return await this.database.container(containerId).items
			.query(query)
			.fetchAll();
		
	}
}