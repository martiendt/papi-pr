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
  async open(): Promise<void> {
    await this.adapter.open()
  }
  async close(): Promise<void> {
    await this.adapter.close()
  }
  database(name: string): IDatabase {
    return this.adapter.database(name)
  }
  collection(name: string): IDatabase {
    return this.adapter.collection(name)
  }
  async create(document: IDocument): Promise<ICreateOutput> {
    return await this.adapter.create(document)
  }
  async createMany(documents: IDocument[]): Promise<ICreateManyOutput> {
    return await this.adapter.createMany(documents)
  }
  async retrieveAll(query: IQuery): Promise<IRetrieveAllOutput> {
    return await this.adapter.retrieveAll(query)
  }
  async retrieve(_id: string): Promise<IRetrieveOutput> {
    return await this.adapter.retrieve(_id)
  }
  async update(_id: string, document: IDocument): Promise<IUpdateOutput> {
    return await this.adapter.update(_id, document)
  }
  async updateMany(filter: IDocument, document: IDocument): Promise<IUpdateManyOutput> {
    return await this.adapter.updateMany(filter, document)
  }
  async delete(_id: string): Promise<IDeleteOutput> {
    return await this.adapter.delete(_id)
  }
  async deleteMany(_ids: string[]): Promise<IDeleteManyOutput> {
    return await this.adapter.deleteMany(_ids)
  }
  async deleteAll(): Promise<IDeleteManyOutput> {
    return await this.adapter.deleteAll()
  }
  async aggregate(pipeline: IPipeline, query: IQuery): Promise<IAggregateOutput> {
    return await this.adapter.aggregate(pipeline, query)
  }
}
