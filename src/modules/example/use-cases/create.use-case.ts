import { ICreateRepository } from '../../../interfaces/repository/create.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'
import { ExampleEntity } from '../entities/example.entity'

export interface IInput {
  name?: string
  phone?: string
}
export interface IOutput {
  insertedId: string
}

export class CreateExampleUseCase implements IUseCase<IInput, IOutput> {
  constructor(public repository: ICreateRepository) {}

  async handle(input: IInput): Promise<IOutput> {
    const exampleEntity = new ExampleEntity(input)

    const response = await this.repository.handle(exampleEntity.data)

    return {
      insertedId: response.insertedId,
    }
  }
}
