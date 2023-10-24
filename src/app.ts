import express from 'express'

export const createApp = () => {
  const app = express()

  /**
   * Static Assets
   *
   * All files must be placed in the src/assets folder, to be publicly accessible in the /assets path.
   */
  app.use('/assets', express.static('src/assets'))

  /**
   * API Routes
   *
   * Here is where you can register API routes for your application.
   *
   * @example
   *
   */
  app.get('/', (req, res) => {
    res.json({ msg: 'Hello World!!!' })
  })

  return app
}
