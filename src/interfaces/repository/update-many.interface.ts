import { IDocument, IUpdateManyOutput } from '../database.interface'

export interface IUpdateManyRepository {
  collection: string
  handle(filter: IDocument, documents: IDocument[]): Promise<IUpdateManyOutput>
}
