import { IDocument, IUpdateManyOutput } from '../database.interface'

export interface IUpdateManyRepository {
  collection: string
  handle(filter: IDocument, document: IDocument, options?: unknown): Promise<IUpdateManyOutput>
}
