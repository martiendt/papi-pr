import { describe, expect, test } from 'bun:test'
import serverConfig from './server'

describe('server config', () => {
  test('host should be typeof string', () => {
    expect(typeof serverConfig.host).toBe('string')
  })

  test('port should be typeof number', () => {
    expect(typeof serverConfig.port).toBe('number')
  })
})
