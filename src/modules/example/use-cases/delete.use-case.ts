import { IDeleteOutput } from '@/interfaces/database.interface'
import { IDeleteRepository } from '@/interfaces/repository/delete.interface'
import { IUseCase } from '@/interfaces/use-case.interface'

export interface IInput {
  _id: string
}

export class DeleteExampleUseCase implements IUseCase<IInput, IDeleteOutput> {
  constructor(public repository: IDeleteRepository) {}

  async handle(input: IInput): Promise<IDeleteOutput> {
    return await this.repository.handle(input._id)
  }
}
