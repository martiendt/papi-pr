import { IDeleteOutput } from '../database.interface'

export interface IDeleteRepository {
  collection: string
  handle(_id: string, options?: unknown): Promise<IDeleteOutput>
}
