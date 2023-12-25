import { DatabaseTestUtil } from '@point-hub/papi'
import { afterAll, beforeAll } from 'bun:test'
import { MongoMemoryReplSet } from 'mongodb-memory-server'

import { TestUtil } from './utils'

const mongodbServer = await MongoMemoryReplSet.create({ replSet: { count: 3 } })
const uri = mongodbServer.getUri()

beforeAll(async () => {
  console.info('initiate database connection')
  await DatabaseTestUtil.open(uri)
  console.info('generate database collection schema')
  await DatabaseTestUtil.createCollections(await TestUtil.getSchema())
})

afterAll(async () => {
  console.info('close database connection')
  await DatabaseTestUtil.close()
  await mongodbServer.stop()
})
