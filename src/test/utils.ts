import { MongoClient, ObjectId } from 'mongodb'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import mongoDBConfig from '@/config/mongodb'
import { IDocument } from '@/interfaces/database.interface'
import { replaceObjectIdToString, replaceStringToObjectId } from '@/database/mongodb/mongodb-helper'

const mongod = await MongoMemoryReplSet.create({ replSet: { count: 3 } })
const uri = mongod.getUri()

export class DatabaseTestUtil {
  constructor(public client: MongoClient = new MongoClient(mongoDBConfig.url)) {}

  async open() {
    this.client = new MongoClient(mongoDBConfig.url)
    await this.client.connect()
  }

  async close() {
    await this.client.close()
    await mongod.stop()
  }

  async reset() {
    const db = this.client.db(mongoDBConfig.name)
    const collections = await db.listCollections().toArray()
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({})
    }
  }

  async retrieve(collection: string, _id: string) {
    const db = this.client.db(mongoDBConfig.name)
    const response = (await db.collection(collection).findOne({
      _id: new ObjectId(_id),
    })) as IDocument
    return replaceObjectIdToString(response)
  }

  async retrieveAll(collection: string, filter: object = {}) {
    const db = this.client.db(mongoDBConfig.name)
    const response = await db.collection(collection).find(replaceStringToObjectId(filter)).toArray()
    return replaceObjectIdToString(response)
  }
}
