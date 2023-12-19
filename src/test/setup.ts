import { beforeAll, afterAll } from 'bun:test'

beforeAll(() => {
  console.log('initiate global setup')
})

afterAll(() => {
  console.log('initiate global teardown')
})
