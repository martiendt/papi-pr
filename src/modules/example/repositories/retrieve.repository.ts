import { IRetrieveRepository } from '../../../interfaces/repository/retrieve.interface'
import { IRetrieveOutput, IDatabase } from '../../../interfaces/database.interface'

export class RetrieveRepository implements IRetrieveRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(_id: string): Promise<IRetrieveOutput> {
    return await this.database.collection(this.collection).retrieve(_id)
  }
}
