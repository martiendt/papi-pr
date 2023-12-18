import mongoDBConfig from '../config/mongodb'
import { DatabaseConnection } from './connection'
import { MongoDBConnection } from './mongodb/connection'

const databaseConnection = new DatabaseConnection(new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name))
await databaseConnection.open()

export const dbConnection = databaseConnection
