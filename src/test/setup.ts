import { beforeAll, afterAll } from 'bun:test'
import { DatabaseTestUtil } from './utils'

beforeAll(async () => {
  console.log('initiate database')
  await DatabaseTestUtil.open()
})

afterAll(async () => {
  console.log('close database')
  await DatabaseTestUtil.close()
})
