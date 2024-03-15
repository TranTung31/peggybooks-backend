import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API get user!' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'API create user!' })
  })

export const userRoute = Router
