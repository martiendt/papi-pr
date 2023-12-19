import { ICreateOutput } from '../../../interfaces/database.interface'
import { ICreateRepository } from '../../../interfaces/repository/create.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'
import { ExampleEntity } from '../entities/example.entity'

export interface IInput {
  document: {
    name?: string
    phone?: string
  }
}

export class CreateExampleUseCase implements IUseCase<IInput, ICreateOutput> {
  constructor(public repository: ICreateRepository) {}

  async handle(input: IInput): Promise<ICreateOutput> {
    const exampleEntity = new ExampleEntity(input.document)
    exampleEntity.generateCreatedAt()
    return await this.repository.handle(exampleEntity.data)
  }
}
