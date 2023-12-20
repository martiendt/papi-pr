import mongoDBConfig from '@/config/mongodb'
import { BaseCommand } from '@point-hub/express-cli'
import { DatabaseConnection } from '@/database/connection'
import { MongoDBConnection } from '@/database/mongodb/connection'

export default class DbInitCommand extends BaseCommand {
  constructor() {
    super({
      name: 'db:init',
      description: 'Create database collections and schema validation',
      summary: 'Create database collections and schema validation',
      arguments: [],
      options: [],
    })
  }

  async handle(): Promise<void> {
    const dbConnection = new DatabaseConnection(new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name))
    try {
      await dbConnection.open()
      // add collections and schema validation
      await dbConnection.createCollections()
    } catch (error) {
      console.error(error)
    } finally {
      dbConnection.close()
    }
  }
}
