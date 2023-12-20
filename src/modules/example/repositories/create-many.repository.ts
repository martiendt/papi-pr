import { ICreateManyRepository } from '@/interfaces/repository/create-many.interface'
import { ICreateManyOutput, IDatabase, IDocument } from '@/interfaces/database.interface'

export class CreateManyRepository implements ICreateManyRepository {
  public collection = 'examples'

  constructor(public database: IDatabase) {}

  async handle(documents: IDocument[]): Promise<ICreateManyOutput> {
    return await this.database.collection(this.collection).createMany(documents)
  }
}
