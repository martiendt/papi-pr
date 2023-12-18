import { IDocument, IUpdateOutput } from '../database.interface'

export interface IUpdateRepository {
  collection: string
  handle(_id: string, document: IDocument): Promise<IUpdateOutput>
}
