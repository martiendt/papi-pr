import mongoDBConfig from '../config/mongodb'
import { DatabaseConnection } from './connection'
import { MongoDBConnection } from './mongodb/connection'

const mongoDBConnection = new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name)
const databaseConnection = new DatabaseConnection(mongoDBConnection)

export const dbConnection = databaseConnection
