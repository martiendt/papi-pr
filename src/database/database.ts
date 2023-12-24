import { BaseDatabaseConnection, BaseMongoDBConnection } from '@point-hub/papi'

import mongoDBConfig from '../config/mongodb'

const mongoDBConnection = new BaseMongoDBConnection(mongoDBConfig.url, mongoDBConfig.name)
const databaseConnection = new BaseDatabaseConnection(mongoDBConnection)

export const dbConnection = databaseConnection
