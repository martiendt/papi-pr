import { IDatabase, IQuery, IRetrieveAllOutput } from '@/interfaces/database.interface'
import { IRetrieveAllRepository } from '@/interfaces/repository/retrieve-all.interface'

import { collectionName } from '../entity'

export class RetrieveAllRepository implements IRetrieveAllRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(query: IQuery, options?: unknown): Promise<IRetrieveAllOutput> {
    return await this.database.collection(this.collection).retrieveAll(query, options)
  }
}
