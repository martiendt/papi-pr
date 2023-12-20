import { beforeAll, afterAll, beforeEach } from 'bun:test'
import { DatabaseTestUtil } from './utils'

const db = new DatabaseTestUtil()

beforeAll(async () => {
  console.log('initiate database')
  await db.open()
})

beforeEach(() => {})

afterAll(async () => {
  console.log('close database')
  await db.close()
})
