/* eslint-disable no-useless-catch */
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email().trim().strict(),
  password: Joi.string().required().min(8).max(50).trim().strict(),
  confirmPassword: Joi.ref('password'),
  avatar: Joi.string().default(''),
  name: Joi.string().min(3).max(50).default(''),
  phone: Joi.string().min(10).max(11).default(''),
  address: Joi.string().max(50).default(''),
  gender: Joi.string().valid('Nam', 'Nữ').default(''),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createUser = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return createdUser
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  createUser,
  findOneById
}