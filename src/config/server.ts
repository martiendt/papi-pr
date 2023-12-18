export const port = Number(process.env.PORT || 3000)
export const host = process.env.HOST ?? ''

export default {
  port: port,
  host: host,
}
