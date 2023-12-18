import { ICreateManyOutput, IDocument } from '../database.interface'

export interface IRepository {
  collection: string
  handle(documents: IDocument[]): Promise<ICreateManyOutput>
}
