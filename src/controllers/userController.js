import { StatusCodes } from 'http-status-codes'

const createUser = (req, res) => {
  try {
    // console.log('req body: ', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'API create user!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const userController = {
  createUser
}
