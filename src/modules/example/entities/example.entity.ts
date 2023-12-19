import { IExampleEntity } from '../interfaces/entity.interface'

export const collection = 'examples'

export class ExampleEntity {
  constructor(public data: IExampleEntity) {}

  public generateCreatedAt() {
    this.data.createdAt = new Date()
  }

  public generateUpdatedAt() {
    this.data.updatedAt = new Date()
  }
}
