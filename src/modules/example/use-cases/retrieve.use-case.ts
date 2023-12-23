import { IRetrieveOutput } from '@/interfaces/database.interface'
import { IRetrieveRepository } from '@/interfaces/repository/retrieve.interface'
import { IUseCase } from '@/interfaces/use-case.interface'

export interface IInput {
  _id: string
}
export interface IDeps {}
export interface IOptions {}

export class RetrieveExampleUseCase implements IUseCase<IInput, IDeps, IOptions, IRetrieveOutput> {
  constructor(public repository: IRetrieveRepository) {}

  async handle(input: IInput, deps: IDeps, options?: IOptions): Promise<IRetrieveOutput> {
    return await this.repository.handle(input._id, options)
  }
}
