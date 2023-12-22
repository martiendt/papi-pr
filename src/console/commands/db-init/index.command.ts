import { BaseCommand } from '@point-hub/express-cli'
import { fileSearch } from '@point-hub/express-utils'
import { Querystring } from '@point-hub/papi'

import mongoDBConfig from '@/config/mongodb'
import { DatabaseConnection } from '@/database/connection'
import { MongoDBConnection } from '@/database/mongodb/connection'
import { MongoDBHelper } from '@/database/mongodb/mongodb-helper'

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
      const helper = new MongoDBHelper(dbConnection)
      const object = await fileSearch('schema.ts', './src/modules', { maxDeep: 2, regExp: true })
      for (const property in object) {
        const path = `../../../modules/${object[property].path.replace('\\', '/')}`
        const { schema } = await import(path)
        for (const iterator of schema) {
          if (!(await helper.isExists(iterator.collection))) {
            console.info(`[schema] ${iterator.collection} - create collection`)
            await dbConnection.createCollection(iterator.collection)
          }

          console.info(`[schema] ${iterator.collection} - update schema`)
          await dbConnection.updateSchema(iterator.collection, iterator.schema)

          for (const unique of iterator.unique) {
            if (unique.length) {
              console.info(`[schema] ${iterator.collection} - create unique attribute "name"`)
              await helper.createUnique(iterator.collection, Querystring.convertArrayToObject(unique, -1))
            }
          }

          for (const unique of iterator.uniqueIfExists) {
            if (unique.length) {
              console.info(`[schema] ${iterator.collection} - create unique attribute "name"`)
              await helper.createUniqueIfNotNull(iterator.collection, Querystring.convertArrayToObject(unique, -1))
            }
          }
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      dbConnection.close()
    }
  }
}
