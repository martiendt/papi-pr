import { IDeleteOutput } from '../database.interface'

export interface IDeleteRepository {
  collection: string
  handle(_id: string): Promise<IDeleteOutput>
}
