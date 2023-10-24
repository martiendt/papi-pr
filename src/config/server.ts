export const port = Number(Bun.env.PORT || 3000)
export const host = Bun.env.HOST ?? 'localhost'

export default {
  port: port,
  host: host,
}
