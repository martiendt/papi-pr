import { IExampleEntity } from '../interfaces/entity.interface'

export const collection = 'examples'

export class ExampleEntity {
  constructor(public data: IExampleEntity) {}

  public generateCreatedDate() {
    this.data.created_date = new Date()
  }

  public generateUpdatedDate() {
    this.data.updated_date = new Date()
  }
}
