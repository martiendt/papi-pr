import { IRetrieveAllRepository } from '@/interfaces/repository/retrieve-all.interface'
import { IRetrieveAllOutput, IDatabase, IQuery } from '@/interfaces/database.interface'

export class RetrieveAllRepository implements IRetrieveAllRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(query: IQuery): Promise<IRetrieveAllOutput> {
    return await this.database.collection(this.collection).retrieveAll(query)
  }
}
