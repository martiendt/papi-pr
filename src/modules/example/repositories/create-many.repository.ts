import { ICreateManyOutput, IDatabase, IDocument } from '@/interfaces/database.interface'
import { ICreateManyRepository } from '@/interfaces/repository/create-many.interface'

import { collectionName } from '../entity'

export class CreateManyRepository implements ICreateManyRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(documents: IDocument[]): Promise<ICreateManyOutput> {
    return await this.database.collection(this.collection).createMany(documents)
  }
}
