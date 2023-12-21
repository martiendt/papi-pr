import { afterAll, beforeAll } from 'bun:test'

import { DatabaseTestUtil } from './utils'

beforeAll(async () => {
  console.info('initiate database connection')
  await DatabaseTestUtil.open()
  console.info('generate database collection schema')
  await DatabaseTestUtil.createCollections()
})

afterAll(async () => {
  console.info('close database connection')
  await DatabaseTestUtil.close()
})
