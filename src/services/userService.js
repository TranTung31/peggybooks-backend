/* eslint-disable no-useless-catch */
import { userModel } from '~/models/userModel'

const createUser = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }
    delete newUser.confirmPassword
    const createdUser = await userModel.createUser(newUser)
    return await userModel.findOneById(createdUser.insertedId)
  } catch (error) {
    throw error
  }
}

export const userService = {
  createUser
}