import { IQuery, IRetrieveAllOutput } from '../database.interface'

export interface IRetrieveAllRepository {
  collection: string
  handle(query: IQuery): Promise<IRetrieveAllOutput>
}
