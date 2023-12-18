import { IQuery, IRetrieveAllOutput } from '../../../interfaces/database.interface'
import { IRetrieveAllRepository } from '../../../interfaces/repository/retrieve-all.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'

export class RetrieveAllExampleUseCase implements IUseCase<IQuery, IRetrieveAllOutput> {
  constructor(public repository: IRetrieveAllRepository) {}

  async handle(query: IQuery): Promise<IRetrieveAllOutput> {
    const response = await this.repository.handle(query)

    return {
      data: response.data,
      pagination: response.pagination,
    }
  }
}
