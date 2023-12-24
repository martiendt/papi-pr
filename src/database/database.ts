import { DatabaseConnection, MongoDBConnection } from '@point-hub/papi'

import mongoDBConfig from '../config/mongodb'

const mongoDBConnection = new MongoDBConnection(mongoDBConfig.url, mongoDBConfig.name)
const databaseConnection = new DatabaseConnection(mongoDBConnection)

export const dbConnection = databaseConnection
