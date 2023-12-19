import { IUpdateOutput } from '../../../interfaces/database.interface'
import { IUpdateRepository } from '../../../interfaces/repository/update.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'
import { ExampleEntity } from '../entities/example.entity'

export interface IInput {
  _id: string
  document: {
    name?: string
    phone?: string
  }
}

export class UpdateExampleUseCase implements IUseCase<IInput, IUpdateOutput> {
  constructor(public repository: IUpdateRepository) {}

  async handle(input: IInput): Promise<IUpdateOutput> {
    const exampleEntity = new ExampleEntity(input.document)
    exampleEntity.generateUpdatedAt()
    return await this.repository.handle(input._id, exampleEntity.data)
  }
}
