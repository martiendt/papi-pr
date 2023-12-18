import { IDeleteManyOutput } from '../../../interfaces/database.interface'
import { IDeleteManyRepository } from '../../../interfaces/repository/delete-many.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'

export interface IInput {
  _ids: string[]
}

export class DeleteManyExampleUseCase implements IUseCase<IInput, IDeleteManyOutput> {
  constructor(public repository: IDeleteManyRepository) {}

  async handle(input: IInput): Promise<IDeleteManyOutput> {
    return await this.repository.handle(input._ids)
  }
}
