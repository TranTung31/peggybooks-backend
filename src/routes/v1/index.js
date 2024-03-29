import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from '~/routes/v1/userRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Check status successfully!'
  })
})

Router.use('/user', userRoute)

export const APIs_V1 = Router
