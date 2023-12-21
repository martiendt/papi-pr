import { afterAll, beforeAll } from 'bun:test'

import { DatabaseTestUtil } from './utils'

beforeAll(async () => {
  console.log('initiate database connection')
  await DatabaseTestUtil.open()
  console.log('generate database collection schema')
  await DatabaseTestUtil.createCollections()
})

afterAll(async () => {
  console.log('close database connection')
  await DatabaseTestUtil.close()
})
