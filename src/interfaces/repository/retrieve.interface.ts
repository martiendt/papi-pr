import { IRetrieveOutput } from '../database.interface'

export interface IRetrieveRepository {
  collection: string
  handle(_id: string): Promise<IRetrieveOutput>
}
