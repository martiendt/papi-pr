import { IDocument, IUpdateManyOutput } from '../../../interfaces/database.interface'
import { IUpdateManyRepository } from '../../../interfaces/repository/update-many.interface'
import { IUseCase } from '../../../interfaces/use-case.interface'
import { ExampleEntity } from '../entities/example.entity'

export interface IInput {
  filter: IDocument
  document: {
    name?: string
    phone?: string
  }
}

export class UpdateManyExampleUseCase implements IUseCase<IInput, IUpdateManyOutput> {
  constructor(public repository: IUpdateManyRepository) {}

  async handle(input: IInput): Promise<IUpdateManyOutput> {
    const exampleEntity = new ExampleEntity(input.document)
    exampleEntity.generateUpdatedAt()
    return await this.repository.handle(input.filter, exampleEntity.data)
  }
}
