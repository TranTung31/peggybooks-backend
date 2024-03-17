import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().required().email().trim().strict(),
    password: Joi.string().required().min(8).max(50).trim().strict(),
    confirmPassword: Joi.ref('password')
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customMessage = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customMessage)
  }
}

export const userValidation = {
  createUser
}
