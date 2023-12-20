import { IUpdateRepository } from '@/interfaces/repository/update.interface'
import { IUpdateOutput, IDatabase, IDocument } from '@/interfaces/database.interface'

export class UpdateRepository implements IUpdateRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(_id: string, document: IDocument): Promise<IUpdateOutput> {
    return await this.database.collection(this.collection).update(_id, document)
  }
}
