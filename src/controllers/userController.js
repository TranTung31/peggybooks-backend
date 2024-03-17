import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createUser = async (req, res, next) => {
  try {
    const response = await userService.createUser(req.body)
    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser
}
