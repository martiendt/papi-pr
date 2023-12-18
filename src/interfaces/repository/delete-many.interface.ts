import { IDeleteManyOutput } from '../database.interface'

export interface IDeleteManyRepository {
  collection: string
  handle(_ids: string[]): Promise<IDeleteManyOutput>
}
