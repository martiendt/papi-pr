import { ICreateOutput, IDocument } from '../database.interface'

export interface ICreateRepository {
  collection: string
  handle(document: IDocument): Promise<ICreateOutput>
}
