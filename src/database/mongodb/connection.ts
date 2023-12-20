/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ObjectId } from 'mongodb'
import { fields, limit, page, skip, sort } from './mongodb-querystring'
import { replaceObjectIdToString, replaceStringToObjectId } from './mongodb-helper'
import type {
  AggregateOptions,
  ClientSession,
  Collection,
  CollectionOptions,
  CreateIndexesOptions,
  Db,
  DbOptions,
  DeleteOptions,
  FindOptions,
  IndexSpecification,
  MongoClientOptions,
  UpdateOptions,
} from 'mongodb'
import {
  IAggregateOutput,
  ICreateManyOutput,
  ICreateOutput,
  IDatabase,
  IDeleteManyOutput,
  IDeleteOutput,
  IDocument,
  IPipeline,
  IQuery,
  IRetrieveAllOutput,
  IRetrieveOutput,
  IUpdateManyOutput,
  IUpdateOutput,
} from '@/interfaces/database.interface'
import { fileSearch } from '@point-hub/express-utils'

export class MongoDBConnection implements IDatabase {
  public client: MongoClient
  public _database: Db | undefined
  public _collection: Collection | undefined
  public session: ClientSession | undefined

  constructor(
    connectionString: string,
    public databaseName: string,
  ) {
    const options: MongoClientOptions = {}

    this.client = new MongoClient(connectionString, options)
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

  public async listCollections(): Promise<{ name: string }[]> {
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

  public async updateSchema(name: string, schema: unknown): Promise<void> {
    if (!this._database) {
      throw new Error('Database not found')
    }

    await this._database.command({
      collMod: name,
      validator: {
        $jsonSchema: schema,
      },
    })
  }

  public async createCollections(): Promise<void> {
    const object = await fileSearch('/schema.ts', './src/modules', { maxDeep: 2, regExp: true })
    for (const property in object) {
      const path = `../../modules/${object[property].path.replace('\\', '/').replace('.ts', '.js')}`
      const { createCollection } = await import(path)
      await createCollection(this)
    }
  }

  public async dropCollections(): Promise<void> {
    const object = await fileSearch('/schema.ts', './src/modules', { maxDeep: 2, regExp: true })
    for (const property in object) {
      const path = `../../modules/${object[property].path.replace('\\', '/').replace('.ts', '.js')}`
      const { dropCollection } = await import(path)
      await dropCollection(this)
    }
  }

  public async createCollection(name: string, options: any): Promise<void> {
    if (!this._database) {
      throw new Error('Database not found')
    }

    await this._database.createCollection(name, options)
  }

  public async dropCollection(name: string, options: any): Promise<void> {
    if (!this._database) {
      throw new Error('Database not found')
    }

    await this._database.dropCollection(name, options)
  }

  public startSession() {
    this.session = this.client.startSession()
    return this.session
  }

  public async endSession() {
    await this.session?.endSession()
  }

  public startTransaction() {
    this.session?.startTransaction()
  }

  public async commitTransaction() {
    await this.session?.commitTransaction()
  }

  public async abortTransaction() {
    await this.session?.abortTransaction()
  }

  public async create(document: IDocument): Promise<ICreateOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const response = await this._collection.insertOne(document)

    return {
      insertedId: response.insertedId.toString(),
    }
  }

  public async createMany(documents: IDocument[]): Promise<ICreateManyOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const response = await this._collection.insertMany(documents)

    // convert array of object to array of string
    const insertedIds: string[] = []
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
      throw new Error('Collection not found')
    }

    const retrieveOptions = options as FindOptions

    const cursor = this._collection
      .find(replaceStringToObjectId(query.filter) ?? {}, retrieveOptions)
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
      data: replaceObjectIdToString(result) as unknown[] as IRetrieveOutput[],
      pagination: {
        page: page(query.page),
        pageCount: Math.ceil(totalDocument / limit(query.pageSize)),
        pageSize: limit(query.pageSize),
        totalDocument,
      },
    }
  }

  public async retrieve(_id: string, options?: any): Promise<IRetrieveOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const retrieveOptions = options as FindOptions
    const result = await this._collection.findOne(
      {
        _id: new ObjectId(_id),
      },
      retrieveOptions,
    )

    return replaceObjectIdToString(result)
  }

  public async update(_id: string, document: IDocument, options?: any): Promise<IUpdateOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const updateOptions = options as UpdateOptions

    const result = await this._collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: replaceStringToObjectId(document) },
      updateOptions,
    )

    return {
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    }
  }

  public async updateMany(filter: IDocument[], document: IDocument[], options?: any): Promise<IUpdateManyOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const updateManyOptions = options as UpdateOptions

    const result = await this._collection.updateMany(
      filter,
      { $set: replaceStringToObjectId(document) },
      updateManyOptions,
    )

    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    }
  }

  public async delete(_id: string, options?: any): Promise<IDeleteOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const deleteOptions = options as DeleteOptions

    const result = await this._collection.deleteOne(
      {
        _id: new ObjectId(_id),
      },
      deleteOptions,
    )

    return { deletedCount: result.deletedCount }
  }

  public async deleteMany(_ids: string[], options?: any): Promise<IDeleteManyOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const deleteOptions = options as DeleteOptions

    const result = await this._collection.deleteMany(
      {
        _id: {
          $in: replaceStringToObjectId(_ids),
        },
      },
      deleteOptions,
    )

    return { deletedCount: result.deletedCount }
  }

  public async deleteAll(options?: any): Promise<IDeleteManyOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const deleteOptions = options as DeleteOptions

    const result = await this._collection.deleteMany({}, deleteOptions)

    return { deletedCount: result.deletedCount }
  }

  public async aggregate(pipeline: IPipeline[], query: IQuery, options?: any): Promise<IAggregateOutput> {
    if (!this._collection) {
      throw new Error('Collection not found')
    }

    const aggregateOptions = options as AggregateOptions

    const cursor = this._collection.aggregate(
      [...pipeline, { $skip: (page(query.page) - 1) * limit(query.pageSize) }, { $limit: limit(query.pageSize) }],
      aggregateOptions,
    )

    if (query.sort && sort(query.sort)) {
      cursor.sort(sort(query.sort))
    }

    if (fields(query.fields, query.excludeFields)) {
      cursor.project(fields(query.fields, query.excludeFields))
    }

    const result = await cursor.toArray()

    const cursorPagination = this._collection.aggregate([...pipeline, { $count: 'totalDocument' }], aggregateOptions)
    const resultPagination = await cursorPagination.toArray()

    const totalDocument = resultPagination.length ? resultPagination[0].totalDocument : 0
    return {
      data: replaceObjectIdToString(result) as IRetrieveOutput[],
      pagination: {
        page: page(query.page),
        pageCount: Math.ceil(totalDocument / limit(query.pageSize)),
        pageSize: limit(query.pageSize),
        totalDocument,
      },
    }
  }
}
