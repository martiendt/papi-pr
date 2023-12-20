import { IDeleteManyRepository } from '@/interfaces/repository/delete-many.interface'
import { IDeleteManyOutput, IDatabase } from '@/interfaces/database.interface'

export class DeleteManyRepository implements IDeleteManyRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(ids: string[]): Promise<IDeleteManyOutput> {
    return await this.database.collection(this.collection).deleteMany(ids)
  }
}
