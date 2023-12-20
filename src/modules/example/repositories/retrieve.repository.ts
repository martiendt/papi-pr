import { IRetrieveRepository } from '@/interfaces/repository/retrieve.interface'
import { IRetrieveOutput, IDatabase } from '@/interfaces/database.interface'
import { collectionName } from '../entity'

export class RetrieveRepository implements IRetrieveRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(_id: string): Promise<IRetrieveOutput> {
    return await this.database.collection(this.collection).retrieve(_id)
  }
}
