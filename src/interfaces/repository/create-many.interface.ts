import { ICreateManyOutput, IDocument } from '../database.interface'

export interface ICreateManyRepository {
  collection: string
  handle(documents: IDocument[], options?: unknown): Promise<ICreateManyOutput>
}
