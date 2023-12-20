import { BaseCommand } from '@point-hub/express-cli'
import { DatabaseConnection } from '@/database/connection'
import { MongoDBConnection } from '@/database/mongodb/connection'
import mongoDBConfig from '@/config/mongodb'

export default class DbSeedCommand extends BaseCommand {
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
    const dbConnection = new DatabaseConnection(new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name))
    try {
      await dbConnection.open()
      // seed examples colllection
      const { exampleSeeds } = await import('@/modules/example/seed')
      await dbConnection.collection('examples').deleteAll()
      const exampleData = await dbConnection.collection('examples').createMany(exampleSeeds)
      console.info(`[seed] seeding examples data`, exampleData)
    } catch (error) {
      console.error(error)
    } finally {
      dbConnection.close()
    }
  }
}
