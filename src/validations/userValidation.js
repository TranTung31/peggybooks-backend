import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const createUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().required().email().trim().strict(),
    password: Joi.string().required().min(8).max(50).trim().strict()
  })

  try {
    // console.log('req body: ', req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    res.status(StatusCodes.CREATED).json({ message: 'API create user from validation!' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const userValidation = {
  createUser
}
