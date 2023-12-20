import { IUpdateManyRepository } from '@/interfaces/repository/update-many.interface'
import { IUpdateManyOutput, IDatabase, IDocument } from '@/interfaces/database.interface'
import { collectionName } from '../entity'

export class UpdateManyRepository implements IUpdateManyRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(filter: IDocument, document: IDocument): Promise<IUpdateManyOutput> {
    return await this.database.collection(this.collection).updateMany(filter, document)
  }
}
