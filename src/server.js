/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1>')
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

