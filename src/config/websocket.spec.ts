import { describe, expect, it } from 'bun:test'

import serverConfig from './server'

describe('server config', () => {
  it('port should be typeof number', () => {
    expect(typeof serverConfig.port).toBe('number')
  })
})
