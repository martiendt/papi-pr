import { IDatabase, IDocument, IUpdateManyOutput } from '@/interfaces/database.interface'
import { IUpdateManyRepository } from '@/interfaces/repository/update-many.interface'

import { collectionName } from '../entity'

export class UpdateManyRepository implements IUpdateManyRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(filter: IDocument, document: IDocument, options?: unknown): Promise<IUpdateManyOutput> {
    return await this.database.collection(this.collection).updateMany(filter, document, options)
  }
}
