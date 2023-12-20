import { ICreateRepository } from '@/interfaces/repository/create.interface'
import { ICreateOutput, IDatabase, IDocument } from '@/interfaces/database.interface'
import { collectionName } from '../entity'

export class CreateRepository implements ICreateRepository {
  public collection = collectionName

  constructor(public database: IDatabase) {}

  async handle(document: IDocument): Promise<ICreateOutput> {
    return await this.database.collection(this.collection).create(document)
  }
}
