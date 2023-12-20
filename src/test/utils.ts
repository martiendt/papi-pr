import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { MongoDBConnection } from '@/database/mongodb/connection'
import { IDatabase, IQuery } from '@/interfaces/database.interface'

const mongod = await MongoMemoryReplSet.create({ replSet: { count: 3 } })
const uri = mongod.getUri()

export class DatabaseTestUtil {
  public static dbConnection: IDatabase = new MongoDBConnection(uri, 'api_test')

  static async open() {
    await DatabaseTestUtil.dbConnection.open()
  }

  static async close() {
    await DatabaseTestUtil.dbConnection.close()
    await mongod.stop()
  }

  static async reset() {
    const collections = await DatabaseTestUtil.dbConnection.listCollections()
    for (const collection of collections) {
      await DatabaseTestUtil.dbConnection.collection(collection.name).deleteAll()
    }
  }

  static async retrieve(collection: string, _id: string) {
    return await DatabaseTestUtil.dbConnection.collection(collection).retrieve(_id)
  }

  static async retrieveAll(collection: string, query: IQuery = {}) {
    return await DatabaseTestUtil.dbConnection.collection(collection).retrieveAll(query)
  }
}
