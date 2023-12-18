import { IAggregateOutput, IPipeline, IQuery } from '../database.interface'

export interface IAggregateRepository {
  collection: string
  handle(pipeline: IPipeline, query: IQuery): Promise<IAggregateOutput>
}
