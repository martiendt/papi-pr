import { IDeleteRepository } from '@/interfaces/repository/delete.interface'
import { IDeleteOutput, IDatabase } from '@/interfaces/database.interface'

export class DeleteRepository implements IDeleteRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(_id: string): Promise<IDeleteOutput> {
    return await this.database.collection(this.collection).delete(_id)
  }
}
