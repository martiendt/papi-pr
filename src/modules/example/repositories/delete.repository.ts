import { IDatabase, IDeleteOutput } from '@/interfaces/database.interface'
import { IDeleteRepository } from '@/interfaces/repository/delete.interface'

import { collectionName } from '../entity'

export class DeleteRepository implements IDeleteRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(_id: string, options?: unknown): Promise<IDeleteOutput> {
    return await this.database.collection(this.collection).delete(_id, options)
  }
}
