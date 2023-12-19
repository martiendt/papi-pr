/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDocument {
  [key: string]: any
}

export interface IQuery {
  fields?: string
  excludeFields?: string[]
  filter?: { [key: string]: unknown }
  page?: number
  pageSize?: number
  sort?: string
}

export interface IPipeline {
  [key: string]: any
}

export interface ICreateOutput {
  insertedId: string
}

export interface ICreateManyOutput {
  insertedCount: number
  insertedIds: string[]
}

export interface IRetrieveOutput {
  _id: string
  [key: string]: unknown
}

export interface IRetrieveAllOutput {
  data: IRetrieveOutput[]
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    totalDocument: number
  }
}

export interface IUpdateOutput {
  matchedCount: number
  modifiedCount: number
}

export interface IUpdateManyOutput {
  matchedCount: number
  modifiedCount: number
}

export interface IDeleteOutput {
  deletedCount: number
}

export interface IDeleteManyOutput {
  deletedCount: number
}

export interface IAggregateOutput {
  data: IRetrieveOutput[]
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    totalDocument: number
  }
}

export interface IDatabase {
  open(): Promise<void>
  close(): Promise<void>
  database(name: string): IDatabase
  collection(name: string): IDatabase
  create(document: IDocument): Promise<ICreateOutput>
  createMany(documents: IDocument[]): Promise<ICreateManyOutput>
  retrieveAll(query: IQuery): Promise<IRetrieveAllOutput>
  retrieve(_id: string): Promise<IRetrieveOutput>
  update(_id: string, document: IDocument): Promise<IUpdateOutput>
  updateMany(filter: IDocument, document: IDocument): Promise<IUpdateManyOutput>
  delete(_id: string): Promise<IDeleteOutput>
  deleteMany(_ids: string[]): Promise<IDeleteManyOutput>
  deleteAll(): Promise<IDeleteManyOutput>
  aggregate(pipeline: IPipeline, query: IQuery): Promise<IAggregateOutput>
}
