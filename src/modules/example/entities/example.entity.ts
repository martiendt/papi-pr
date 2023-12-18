import { IExampleEntity } from '../interfaces/entity.interface'

export const collection = 'examples'

export class ExampleEntity {
  constructor(public data: IExampleEntity) {}

  generateCreatedAt() {
    this.data.createdAt = new Date()
  }

  generateUpdatedAt() {
    this.data.updatedAt = new Date()
  }
}
