import { IQuery, IRetrieveAllOutput } from '@/interfaces/database.interface'
import { IRetrieveAllRepository } from '@/interfaces/repository/retrieve-all.interface'
import { IUseCase } from '@/interfaces/use-case.interface'

export interface IInput {
  query: IQuery
}

export class RetrieveAllExampleUseCase implements IUseCase<IInput, IRetrieveAllOutput> {
  constructor(public repository: IRetrieveAllRepository) {}

  async handle(input: IInput): Promise<IRetrieveAllOutput> {
    return await this.repository.handle(input.query)
  }
}
