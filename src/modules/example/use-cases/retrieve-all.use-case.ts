import { IQuery, IRetrieveAllOutput } from '@/interfaces/database.interface'
import { IRetrieveAllRepository } from '@/interfaces/repository/retrieve-all.interface'
import { IUseCase } from '@/interfaces/use-case.interface'

export interface IInput {
  query: IQuery
}
export interface IDeps {}
export interface IOptions {}

export class RetrieveAllExampleUseCase implements IUseCase<IInput, IDeps, IOptions, IRetrieveAllOutput> {
  constructor(public repository: IRetrieveAllRepository) {}

  async handle(input: IInput, deps: IDeps, options?: IOptions): Promise<IRetrieveAllOutput> {
    return await this.repository.handle(input.query, options)
  }
}
