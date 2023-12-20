import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { MongoDBConnection } from '@/database/mongodb/connection'
import { IDatabase, IQuery } from '@/interfaces/database.interface'

const mongod = await MongoMemoryReplSet.create({ replSet: { count: 3 } })
const uri = mongod.getUri()

export class DatabaseTestUtil {
  public dbConnection: IDatabase

  constructor() {
    this.dbConnection = new MongoDBConnection(uri, 'api_test')
  }

  async open() {
    await this.dbConnection.open()
  }

  async close() {
    await this.dbConnection.close()
    await mongod.stop()
  }

  async reset() {
    const collections = await this.dbConnection.listCollections()
    for (const collection of collections) {
      await this.dbConnection.collection(collection.name).deleteAll()
    }
  }

  async retrieve(collection: string, _id: string) {
    return await this.dbConnection.collection(collection).retrieve(_id)
  }

  async retrieveAll(collection: string, query: IQuery = {}) {
    return await this.dbConnection.collection(collection).retrieveAll(query)
  }
}
