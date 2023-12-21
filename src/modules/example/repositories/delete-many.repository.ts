import { IDatabase, IDeleteManyOutput } from '@/interfaces/database.interface'
import { IDeleteManyRepository } from '@/interfaces/repository/delete-many.interface'

import { collectionName } from '../entity'

export class DeleteManyRepository implements IDeleteManyRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(ids: string[]): Promise<IDeleteManyOutput> {
    return await this.database.collection(this.collection).deleteMany(ids)
  }
}
