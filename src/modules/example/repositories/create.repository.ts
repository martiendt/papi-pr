import { ICreateRepository } from '@/interfaces/repository/create.interface'
import { ICreateOutput, IDatabase, IDocument } from '@/interfaces/database.interface'

export class CreateRepository implements ICreateRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(document: IDocument): Promise<ICreateOutput> {
    return await this.database.collection(this.collection).create(document)
  }
}
