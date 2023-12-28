import { type RedisClientType } from 'redis'
import { v4 as uuidv4 } from 'uuid'

/* eslint-disable @typescript-eslint/no-unused-vars */
export const makeWebSocketServer = async (port: number, publisher: RedisClientType, subscriber: RedisClientType) => {
  await subscriber.subscribe('cluster', (message: string, channel: string) => {
    webSocketServer.publish('topic', message)
  })

  const webSocketServer = Bun.serve({
    port: port,
    fetch(req, server) {
      const sessionId = uuidv4()
      const url = new URL(req.url)
      if (
        server.upgrade(req, {
          headers: {
            'Set-Cookie': `WS_SID=${sessionId};SameSite=None;Secure`,
          },
        })
      ) {
        return undefined
      }
      return new Response('Websocket Server Error', { status: 500 })
    },
    websocket: {
      // a message is received
      message(ws, message) {
        console.log('a message is received', message)
        // publish to redis, so it can distributed to other server in the cluster
        publisher.publish('cluster', message)
      },
      // a socket is opened
      open(ws) {
        console.info('socket is open')
        // subscribe
        ws.subscribe('topic')
      },
      // a socket is closed
      close(ws, code, message) {
        console.info('socket is close')
      },
      // the socket is ready to receive more data
      drain(ws) {},
    },
  })
  console.info(`Pointhub Websocket Listening on ws://${webSocketServer.hostname}:${webSocketServer.port}`)

  return webSocketServer
}
