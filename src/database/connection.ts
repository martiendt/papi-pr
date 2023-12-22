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
} from '../interfaces/database.interface'

export class DatabaseConnection implements IDatabase {
  constructor(public adapter: IDatabase) {}
  public async open(): Promise<void> {
    await this.adapter.open()
  }
  public async close(): Promise<void> {
    await this.adapter.close()
  }
  public database(name: string): this {
    this.adapter.database(name)
    return this
  }
  public collection(name: string): this {
    this.adapter.collection(name)
    return this
  }
  public async listCollections(): Promise<{ name: string }[]> {
    return this.adapter.listCollections()
  }
  public startSession() {
    return this.adapter.startSession()
  }
  public async endSession() {
    await this.adapter.endSession()
  }
  public startTransaction() {
    this.adapter.startTransaction()
  }
  public async commitTransaction() {
    await this.adapter.commitTransaction()
  }
  public async abortTransaction() {
    await this.adapter.abortTransaction()
  }
  public async createIndex(name: string, spec: unknown, options?: unknown) {
    await this.adapter.createIndex(name, spec, options)
  }
  public async createCollection(name: string, options?: unknown) {
    await this.adapter.createCollection(name, options)
  }
  public async dropCollection(name: string, options?: unknown) {
    await this.adapter.dropCollection(name, options)
  }
  public async updateSchema(name: string, schema: unknown) {
    await this.adapter.updateSchema(name, schema)
  }
  public async create(document: IDocument): Promise<ICreateOutput> {
    return await this.adapter.create(document)
  }
  public async createMany(documents: IDocument[]): Promise<ICreateManyOutput> {
    return await this.adapter.createMany(documents)
  }
  public async retrieveAll(query: IQuery): Promise<IRetrieveAllOutput> {
    return await this.adapter.retrieveAll(query)
  }
  public async retrieve(_id: string): Promise<IRetrieveOutput> {
    return await this.adapter.retrieve(_id)
  }
  public async update(_id: string, document: IDocument): Promise<IUpdateOutput> {
    return await this.adapter.update(_id, document)
  }
  public async updateMany(filter: IDocument, document: IDocument): Promise<IUpdateManyOutput> {
    return await this.adapter.updateMany(filter, document)
  }
  public async delete(_id: string): Promise<IDeleteOutput> {
    return await this.adapter.delete(_id)
  }
  public async deleteMany(_ids: string[]): Promise<IDeleteManyOutput> {
    return await this.adapter.deleteMany(_ids)
  }
  public async deleteAll(): Promise<IDeleteManyOutput> {
    return await this.adapter.deleteAll()
  }
  public async aggregate(pipeline: IPipeline[], query: IQuery): Promise<IAggregateOutput> {
    return await this.adapter.aggregate(pipeline, query)
  }
}
