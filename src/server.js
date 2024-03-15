/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.get('/', (req, res) => {
    res.end('Hello World!')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Back-end Server is running at http://${env.APP_HOST}:${env.APP_PORT}`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    console.log('1. Connect to Database!')
    await CONNECT_DB()
    console.log('2. Connect to Database successfully!')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

