import { IRetrieveOutput } from '@/interfaces/database.interface'
import { IRetrieveRepository } from '@/interfaces/repository/retrieve.interface'
import { IUseCase } from '@/interfaces/use-case.interface'

export interface IInput {
  _id: string
}

export class RetrieveExampleUseCase implements IUseCase<IInput, IRetrieveOutput> {
  constructor(public repository: IRetrieveRepository) {}

  async handle(input: IInput): Promise<IRetrieveOutput> {
    return await this.repository.handle(input._id)
  }
}
