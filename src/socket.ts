/* eslint-disable @typescript-eslint/no-unused-vars */
export const makeWebSocketServer = async (port: number) => {
  const webSocketServer = Bun.serve({
    port: port,
    fetch(req, server) {
      if (server.upgrade(req)) {
        return
      }
      return new Response('Websocket Server Error', { status: 500 })
    },
    websocket: {
      // a message is received
      message(ws, message) {},
      // a socket is opened
      open(ws) {},
      // a socket is closed
      close(ws, code, message) {},
      // the socket is ready to receive more data
      drain(ws) {},
    },
  })
  console.info(`Pointhub Websocket Listening on ws://${webSocketServer.hostname}:${webSocketServer.port}`)

  return webSocketServer
}
