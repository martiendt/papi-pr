import { IUpdateManyRepository } from '@/interfaces/repository/update-many.interface'
import { IUpdateManyOutput, IDatabase, IDocument } from '@/interfaces/database.interface'

export class UpdateManyRepository implements IUpdateManyRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(filter: IDocument, document: IDocument): Promise<IUpdateManyOutput> {
    return await this.database.collection(this.collection).updateMany(filter, document)
  }
}
