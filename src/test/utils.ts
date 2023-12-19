import { MongoClient, ObjectId } from 'mongodb'
import mongoDBConfig from '@/config/mongodb'
import { IDocument } from '@/interfaces/database.interface'
import { replaceObjectIdToString, replaceStringToObjectId } from '@/database/mongodb/mongodb-helper'

export const resetDatabase = async () => {
  const client = await MongoClient.connect(mongoDBConfig.url)
  const db = client.db(mongoDBConfig.name)
  const collections = await db.listCollections().toArray()
  for (const collection of collections) {
    await db.collection(collection.name).deleteMany({})
  }
  client.close()
}

export const retrieve = async (collection: string, _id: string): Promise<IDocument> => {
  const client = await MongoClient.connect(mongoDBConfig.url)
  const db = client.db(mongoDBConfig.name)
  const response = (await db.collection(collection).findOne({
    _id: new ObjectId(_id),
  })) as IDocument
  client.close()
  return replaceObjectIdToString(response)
}

export const retrieveAll = async (collection: string, filter: object = {}): Promise<Array<IDocument>> => {
  const client = await MongoClient.connect(mongoDBConfig.url)
  const db = client.db(mongoDBConfig.name)
  const response = await db.collection(collection).find(replaceStringToObjectId(filter)).toArray()
  client.close()
  return replaceObjectIdToString(response)
}
