import { BaseCommand } from '@point-hub/express-cli'

import mongoDBConfig from '@/config/mongodb'
import { DatabaseConnection } from '@/database/connection'
import { MongoDBConnection } from '@/database/mongodb/connection'

export default class DbSeedCommand extends BaseCommand {
  dbConnection = new DatabaseConnection(new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name))
  constructor() {
    super({
      name: 'db:seed',
      description: 'Seed database',
      summary: 'Seed database',
      arguments: [],
      options: [],
    })
  }
  async handle(): Promise<void> {
    try {
      await this.dbConnection.open()
      await this.seed('examples')
    } catch (error) {
      console.error(error)
    } finally {
      this.dbConnection.close()
    }
  }
  private async seed(collectionName: string): Promise<void> {
    console.info(`[seed] seeding ${collectionName} data`)
    // get seeder from module
    const { seeds } = await import('@/modules/example/seed')
    console.info(seeds)
    // delete all data inside collection
    await this.dbConnection.collection(collectionName).deleteAll()
    // insert new seeder data
    await this.dbConnection.collection(collectionName).createMany(seeds)
  }
}
