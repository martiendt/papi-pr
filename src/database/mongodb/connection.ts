import { MongoClient } from 'mongodb'
import { fields, limit, page, skip, sort } from './mongodb-querystring'
import { replaceObjectIdToString, replaceStringToObjectId } from './mongodb-helper'
import type {
  ClientSession,
  Collection,
  CollectionOptions,
  CreateIndexesOptions,
  Db,
  DbOptions,
  FindOptions,
  IndexSpecification,
} from 'mongodb'
import {
  ICreateManyOutput,
  ICreateOutput,
  IDatabase,
  IDocument,
  IQuery,
  IRetrieveAllOutput,
  IRetrieveOutput,
} from '../../interfaces/database.interface'

export class MongoDBConnection implements IDatabase {
  public client: MongoClient
  public _database: Db | undefined
  public _collection: Collection | undefined
  public session: ClientSession | undefined

  constructor(
    connectionString: string,
    public databaseName: string,
  ) {
    this.client = new MongoClient(connectionString)
    this.database(databaseName)
  }

  public async open() {
    await this.client.connect()
  }

  public async close() {
    await this.client.close()
  }

  public database(name: string, options?: DbOptions) {
    this._database = this.client.db(name, options)
    return this
  }

  public collection(name: string, options?: CollectionOptions) {
    if (!this._database) {
      throw new Error('Database not found')
    }

    this._collection = this._database.collection(name, options)
    return this
  }

  public async listCollections(): Promise<Array<{ name: string }>> {
    if (!this._database) {
      throw new Error('Database not found')
    }

    return await this._database.listCollections().toArray()
  }

  public async createIndex(name: string, spec: IndexSpecification, options: CreateIndexesOptions): Promise<void> {
    if (!this._database) {
      throw new Error('Database not found')
    }

    await this._database.createIndex(name, spec, options)
  }

  public startSession() {
    this.session = this.client.startSession()
    return this.session
  }

  public async endSession(): Promise<this> {
    await this.session?.endSession()
    return this
  }

  public startTransaction() {
    this.session?.startTransaction()
    return this
  }

  public async commitTransaction() {
    await this.session?.commitTransaction()
    return this
  }

  public async abortTransaction() {
    await this.session?.abortTransaction()
    return this
  }

  public async create(document: IDocument): Promise<ICreateOutput> {
    if (!this._collection) {
      throw new Error()
    }

    const response = await this._collection.insertOne(document)

    return {
      insertedId: response.insertedId.toString(),
    }
  }
  public async createMany(documents: IDocument[]): Promise<ICreateManyOutput> {
    if (!this._collection) {
      throw new Error()
    }
    const response = await this._collection.insertMany(documents)

    // convert array of object to array of string
    const insertedIds: Array<string> = []
    Object.values(response.insertedIds).forEach((val) => {
      insertedIds.push(val.toString())
    })

    return {
      insertedIds: insertedIds,
      insertedCount: response.insertedCount,
    }
  }
  public async retrieveAll(query: IQuery, options?: any): Promise<IRetrieveAllOutput> {
    if (!this._collection) {
      throw new Error()
    }

    const retrieveOptions = options as FindOptions
    const cursor = this._collection
      .find(query.filter ?? {}, retrieveOptions)
      .limit(limit(query.pageSize))
      .skip(skip(page(query.page), limit(query.pageSize)))

    if (query.sort && sort(query.sort)) {
      cursor.sort(sort(query.sort))
    }

    if (fields(query.fields, query.excludeFields)) {
      cursor.project(fields(query.fields, query.excludeFields))
    }

    const result = await cursor.toArray()

    const totalDocument = await this._collection.countDocuments(query.filter ?? {}, retrieveOptions)

    return {
      data: replaceObjectIdToString(result) as Array<unknown> as Array<IRetrieveOutput>,
      pagination: {
        page: page(query.page),
        pageCount: Math.ceil(totalDocument / limit(query.pageSize)),
        pageSize: limit(query.pageSize),
        totalDocument,
      },
    }
  }
  public async retrieve(_id: string): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  public async update(document: IDocument): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  public async updateMany(documents: IDocument[]): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  public async delete(_id: string): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  public async deleteMany(_ids: string[]): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  public async aggregate(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
