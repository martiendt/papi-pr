import { beforeAll, afterAll } from 'bun:test'
import { DatabaseTestUtil } from './utils'

beforeAll(async () => {
  console.log('initiate database connection')
  await DatabaseTestUtil.open()
})

afterAll(async () => {
  console.log('close database connection')
  await DatabaseTestUtil.close()
})
