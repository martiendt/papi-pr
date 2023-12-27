import { Server } from 'bun'
import { createClient } from 'redis'
import { v4 as uuidv4 } from 'uuid'

import redisConfig from './config/redis'

const connections: Server[] = []

const publisher = createClient({
  url: redisConfig.url,
})
publisher.on('error', (err) => console.log('Redis Client Error', err))
await publisher.connect()

const subscriber = publisher.duplicate()
subscriber.on('error', (err) => console.log('Redis Client Error', err))
await subscriber.connect()

const listener = (message: string, channel: string) => {
  connections.forEach(async (connection) => {
    connection.publish('chat', 's')
  })
}
await subscriber.subscribe('channel', listener)

await publisher.publish('channel', 'message')

// await client.set('key', 'adsa')
// await client.hSet('user-session:123', {
//   name: 'John',
//   surname: 'Smith',
//   company: 'Redis',
//   age: 29,
// })
// console.log(await client.get('key'))

// const userSession = await client.hGetAll('user-session:123')
// console.log(JSON.stringify(userSession, null, 2))
// const value = await client.get('key')
// console.log(value)

/* eslint-disable @typescript-eslint/no-unused-vars */
export const makeWebSocketServer = async (port: number) => {
  const webSocketServer = Bun.serve({
    port: port,
    fetch(req, server) {
      console.log(req)
      const sessionId = uuidv4()
      const url = new URL(req.url)
      if (
        server.upgrade(req, {
          headers: {
            'Set-Cookie': `SessionId=${sessionId}`,
          },
        })
      ) {
        return undefined
      }
      return new Response('Websocket Server Error', { status: 500 })
    },
    websocket: {
      // a message is received
      async message(ws, message) {
        console.log(message, ws.data)
        // const a = await fetch('http://localhost:3000/v1/examples', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        // console.log(await a.json())
      },
      // a socket is opened
      open(ws) {
        console.log('open', ws.data)
        ws.subscribe('chat')
      },
      // a socket is closed
      close(ws, code, message) {
        console.log('close', code, message)
      },
      // the socket is ready to receive more data
      drain(ws) {},
    },
  })
  console.info(`Pointhub Websocket Listening on ws://${webSocketServer.hostname}:${webSocketServer.port}`)
  connections.push(webSocketServer)
  return webSocketServer
}
